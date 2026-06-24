import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [showAdmins, setShowAdmins] = useState(false);
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8 relative">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Meet Our Creators
          </h1>


          <div className="flex gap-3">
            <button
              onClick={() => setShowAdmins(!showAdmins)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              👨‍💼 Admins ({creators.length})
            </button>
            {showAdmins && (
              <div
                className="
      absolute
      right:10
      sm:right-80
      top-14
      w-72
      bg-white
      rounded-xl
      shadow-2xl
      border
      z-50
      animate-fadeIn
    "
              >
                <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
                  Admins List
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {creators.map((admin) => (
                    <div
                      key={admin._id}
                      className="px-4 py-3 border-b hover:bg-gray-100"
                    >
                      <p>{admin.name}</p>
                      <p className="text-xs text-gray-500">
                        {admin.email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowUsers(!showUsers)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              👥 Users ({users.length})
            </button>
          </div>

          {showUsers && (
            <div
              className="
        absolute
        right-6
        top-14
        w-72
        bg-white
        rounded-xl
        shadow-2xl
        border
        z-50
        animate-fadeIn
      "
            >

              <div className="bg-green-600 text-white px-4 py-3 font-semibold">
                Users List
              </div>

              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="px-4 py-3 border-b hover:bg-gray-100"
                  >
                    <p>{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full"
            >
              <div className="relative">
                <img
                  src={creator.photo.url}
                  alt="avatar"
                  className="w-full h-40 object-cover"
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
    </div>
  );
}

export default Creators;