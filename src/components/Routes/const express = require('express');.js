const express = require('express');
import moment from "moment";
const app = express();
import _ from 'lodash';
const { MongoClient, ObjectId } = require('mongodb');
app.use(express.json());

const userDetails = async (userId) => {
  let client;
  try {
    client = new MongoClient(`${process.env.MONGO_URI}`);
    await client.connect();
    const db = client.db(`${process.env.MONGO_PROJECT_KEY}`);
    const collection = db.collection('users');
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    const user_name = _.get(user, "name", "");
    const user_email = _.get(user, "email", "");
    const user_orgId = _.get(user, "organization_id", "").toString();
    return { "name": user_name, "email": user_email, "orgId": user_orgId };

  } catch (err) {
    return (err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

const getStartAndEndDate = (num_day) => {
  const yesterday = moment().subtract(num_day, 'days');
  const beginningOfYesterday = yesterday.startOf('day');
  const endOfYesterday = yesterday.clone().endOf('day');
  return {
    startDateTime: beginningOfYesterday.format('YYYY-MM-DD HH:mm:ss'),
    endDateTime: endOfYesterday.format('YYYY-MM-DD HH:mm:ss')
  }
}

const mailerBuilder = async (orgId, userId, num_day) => {
  let client;
  try {
    client = new MongoClient(`${process.env.MONGO_URI}`);
    await client.connect();
    const db = client.db(`${process.env.MONGO_PROJECT_KEY}`);
    const limit = parseInt(process.env.MONGO_PROJECT_LIMIT, 10) || 5;
    const datetime = getStartAndEndDate(num_day);
    const partyMappingQuery = {
      'organization_id': new ObjectId(orgId),
      'member_ids': { $in: [new ObjectId(userId)] },
    };

    const partyMappingResult = await db.collection('party_mappings')
      .find(partyMappingQuery)
      .toArray();

    const uniquePartyIds = [...new Set(partyMappingResult.map(mapping => mapping.party_id))];
    console.log(uniquePartyIds, "uniquepartyid")


    // console.log(uniquePartyIds, "unique")
    const signalTimelinesQuery = {
      'organization_id': new ObjectId("5e5363db88aab328930163f0"),
      'ews_party_id': { $in: uniquePartyIds },
      // 'created_at': {
      //   '$gte': new Date(datetime.startDateTime),
      //   '$lte': new Date(datetime.endDateTime)
      // },
      // 'date_of_event': {
      //   '$gte': new Date(moment().subtract(3, 'months').format('YYYY-MM-DD HH:mm:ss'))
      // }
    };

    const signalPipeline = [
      {
        $match: signalTimelinesQuery,
      },
      {
        $group: {
          _id: '$ews_party_id',
          party_id: { $first: '$ews_party_id' },
          signal_count: { $sum: 1 },
          signals: {
            $push: {
              _id: '$_id',
              organization_id: '$organization_id',
              case_id: '$case_id',
              signal_codes: '$signal_codes',
              ews_party_id: '$ews_party_id',
              alert_type: '$alert_type',
              company_name: '$company_name',
              date_of_event: '$date_of_event',
              alert_category: '$alert_category',
              alert_summary: '$alert_summary',
              date_of_alert: '$created_at',
              customer_number: '$parties.ref'
            },
          },
        },
      },
      {
        $sort: {
          created_at: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          party_id: 1,
          signal_count: 1,
          signals: { $slice: ['$signals', 20] },
        },
      },
    ];

    const signalResult = await db.collection('ews_signal_timelines').aggregate(signalPipeline).toArray();
    const documents = signalResult.map(signal => {
      const partyMapping = partyMappingResult.find(mapping => mapping.party_id.toString() === signal.party_id.toString());
      return {
        ...signal,
        party_name: partyMapping ? partyMapping.name : null,
      };
    });
    console.log(documents, "documents")
    const transformedDocuments = [];
    documents.forEach((each) => {
      const partyId = _.get(each, '_id', "").toString();
      const alertsummarys = [];
      each.signals.forEach((alerts) => {
        const alert_code = _.get(alerts, 'signal_codes[0]', "").toString();
        const alert_summary = _.get(alerts, 'alert_summary', "").toString();
        const alert_category = _.get(alerts, 'alert_category', "").toString();
        const alert_type = _.get(alerts, 'alert_type', "").toString();
        const event_date = _.get(alerts, 'date_of_event');
        const alert_date = _.get(alerts, 'date_of_alert');
        let formatted_event_date = "";
        let formatted_alert_date = "";
        if (event_date !== null) {
          formatted_event_date = new Date(event_date).toISOString().slice(0, 10).split('-').reverse().join('-');
        }
        if (alert_date !== null) {
          formatted_alert_date = new Date(alert_date).toISOString().slice(0, 10).split('-').reverse().join('-');
        }
        const customer_number = _.get(alerts, 'customer_number', "").toString();
        const party_id = _.get(alerts, 'ews_party_id', "").toString();
        alertsummarys.push({
          alert_code,
          party_id,
          alert_summary,
          alert_category,
          alert_type,
          risk_Severity: "",
          date_of_event: formatted_event_date,
          alert_creation_date: formatted_alert_date,
          case_id: "",
          case_status: "",
          customer_number,
          alert_id_link: `${process.env.CMM_APP_LINK}/alerts`
        })
      })
      transformedDocuments.push({
        company_name: each.party_name,
        alert_page: `${process.env.APP_LINK}/party/${partyId}/alerts`,
        alert_Summary: alertsummarys
      })
    });
    return (transformedDocuments);
  } catch (error) {
    return error;
  } finally {
    if (client) {
      client.close(); // Close the MongoDB connection in the finally block
    }
  }
}

const getEwsFortNightlyResp = async (ewsBlobId) => {
  let client;
  try {
    client = new MongoClient(`${process.env.MONGO_URI}`);
    await client.connect();
    const db = client.db(`${process.env.MONGO_PROJECT_KEY}`);
    const collection = db.collection('ews_alert_blobs');
    const blobResp = await collection.findOne({ _id: new ObjectId(ewsBlobId) });
    return blobResp;
  } catch (err) {
    return (err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

const getPublicDataRiskScoreData = async (ews_alert_blobs) => {
  let client;
  try {
    client = new MongoClient(`${process.env.MONGO_URI}`);
    await client.connect();
    const db = client.db(`${process.env.MONGO_PROJECT_KEY}`);
    const collection = db.collection('portfolios');
    const portfolio = await collection.findOne({ _id: new ObjectId(ews_alert_blobs.ews_portfolio_id) })
    if (!portfolio) return { status: false, message: "portfolio not eixst" };
    const has_private_data = portfolio.has_private_data || false;
    const heading = ews_alert_blobs.blob.find(e => e.type === 'risk_summary').heading;
    const created_date = new Date(portfolio.created_at).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/,/g, '');
    const subject = `${heading}ly Updates for ${portfolio.name}, on ${created_date}`;
    const scorecard = await scorecardData({ portfolio });
    return { scorecard: scorecard, subject: subject, emails: portfolio.emails }
  } catch (err) {
    return (err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

async function scorecardData({ portfolio, args = {} }) {
  let filter;
  if (Object.keys(args).length === 0 && args.constructor === Object) {
    filter = {};
  } else {
    filter = _version(portfolio) === '1_0' && is_weighted(portfolio) ?
      { [`score_details.portfolio_${portfolio._id}_weightes.risk_type`]: args.risk_type || '' } :
      { 'score_details.risk_type': args.risk_type || '' };
  }
  const client = new MongoClient(`${process.env.MONGO_URI}`);
  await client.connect();
  const db = client.db(`${process.env.MONGO_PROJECT_KEY}`);
  const collection = db.collection('party_mappings');
  const pipeline = [
    {
      $match: {
        'portfolio_ids': portfolio._id,
        ...filter
      }
    },
    {
      $project: {
        score_details: 1,
        party_id: 1,
        name: 1
      }
    }
  ]
  const scoreResp = await collection.aggregate(pipeline).toArray();
  const transformScoreData = scoreResp.map(e => {
    const details = e.score_details[`portfolio_${portfolio._id}_weightes`] || {};
    let item = { ...e.score_details, party_id: e.party_id, party_name: e.name };
    if (details.total && details.risk_type && args.only_weighted) {
      item = { ...item, total: details.total, risk_type: details.risk_type, ...details };
    }
    return item;
  });
  return transformScoreData;
}


function _version(portfolio) {
  try {
    return (portfolio.configs.scorecard_version || '1.0').replace('.', '_');
  } catch (error) {
    return '1_0';
  }
}

function is_weighted(portfolio) {
  try {
    return portfolio.configs.is_weighted || false;
  } catch (error) {
    return false;
  }
}

module.exports = {
  userDetails,
  mailerBuilder,
  getEwsFortNightlyResp,
  getPublicDataRiskScoreData
};


