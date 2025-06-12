import { useState, useEffect, useId } from 'react';
import axios from 'axios';
const useCommonApi = (Api) => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");
  const useId1 = useId()
  console.log(useId1,"useId")
  const fetch = async () => {
    try {
      const response = await axios.get(Api);

      // Check if the response data is an array
      if (!Array.isArray(response.data)) {
        throw new Error("Unexpected data format");
      }

      setdata(response.data);
      seterror("");
    } catch (e) {
      setdata([]);
      seterror("Something went wrong");
      console.error("Caught error:", e.message);
    }
  };

  useEffect(() => {
    fetch();
  }, [Api]); 
  return [data, error];
};

export default useCommonApi;
