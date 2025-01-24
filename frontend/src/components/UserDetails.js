import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../features/userDetails/userDetails';
import { AiOutlineMail } from 'react-icons/ai';

const UserDetails = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part[0]).join('').toUpperCase();
  };

  const filteredUsers = users?.data.filter(user => 
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  const displayedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Details</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search user by name"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedUsers && displayedUsers.map((user) => (
          <div key={user.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 flex items-center">
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold mr-4"
              >
                {getInitials(user.userName)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">Role: {user.role}</p>
              </div>
            </div>
            <div className="flex justify-center mt-2 mb-3">
              <a
                href={`mailto:${user.email}`}
                className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
              >
                <AiOutlineMail className="mr-2" /> Email User
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300'
            } rounded`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
