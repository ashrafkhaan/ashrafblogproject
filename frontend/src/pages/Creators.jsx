import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  console.log(creators);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/admins`,
          {
            withCredentials: true,
          }
        );
        setCreators(data.admins);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/users`,
          {
            withCredentials: true,
          }
        );

        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCreators();
    fetchUsers();

     
  }, []);

  return (
    <div className="my-20 bg-gray-100">
      <div className="flex justify-between items-center px-6 mb-6">
  <h1 className="text-3xl font-bold">
    Popular Creators
  </h1>

  <button
    onClick={() => setShowUsers(!showUsers)}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Total Users ({users.length})
  </button>
</div>
{showUsers && (
  <div className="mx-6 bg-white p-4 rounded-lg shadow mb-6">
    <h2 className="font-bold mb-2">Users List</h2>

    {users.map((user) => (
      <p key={user._id} className="border-b py-2">
        {user.name}
      </p>
    ))}
  </div>
)}
<div className="flex flex-wrap justify-center items-center">
      {creators.map((creator) => (
        <div
          key={creator._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
        >
          <div className="relative">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={creator.photo.url}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="px-4 py-6 mt-4">
            <h2 className="text-center text-xl font-semibold text-gray-800">
              {creator.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">{creator.email}</p>
            <p className="text-center text-gray-600 mt-2">{creator.phone}</p>
            <p className="text-center text-gray-600 mt-2">{creator.role}</p>
          </div>
        </div>
         
      ))}
    </div>
    </div>
  );
}

export default Creators;