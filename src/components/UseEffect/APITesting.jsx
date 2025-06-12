import { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios"

const Header = () => {
  const [user, setUser] = useState([]);

  async function Json() {
    try {
      //debugger; // <-- Pause here before fetching data
      const ApiResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const Data = ApiResponse.data;
      setUser(Data);
      //debugger; // <-- Pause here to inspect fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    Json();
  }, []);

  const updateApi = async (Id) => {
    try {
      //debugger; // <-- Pause before making DELETE call
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${Id}`);
      //debugger; // <-- Inspect response from DELETE

      const updatedPost = response.data;
      setUser((prev) => prev.filter(each => each.id !== Id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const update = (Id) => {
    //debugger; // <-- Pause when delete button is clicked
    updateApi(Id);
  }

  return (
    <>
      {user.length > 0 ?
        <>
          <p className="text-red-500 ml-8 text-lg font-serif underline">Posts Data</p>
          <ul className="list-disc list-inside">
            {user.map((each) => (
              <li key={each.id} className="flex justify-between my-2">
                <p>{each.body}</p>
                <button
                  onClick={() => update(each.id)}
                  className="w-24 border-2 text-amber-100 hover:text-amber-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
        :
        <Skeleton count={10} />
      }
    </>
  );
};

export default Header;
