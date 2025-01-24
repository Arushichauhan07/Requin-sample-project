import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaArrowUp, FaArrowDown, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/userDetails/userDetails';
import { fetchAllFiles } from '../features/sample/sampleApis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement 
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { userDetails } = useSelector((state) => state.user);
  const { sampleFiles } = useSelector((state) => state.AllSample);

  // Ensure the data is available before proceeding
  const totalUsers = users?.data?.length || 0;
  const totalSamples = sampleFiles?.data?.length || 0;

  // Calculate Visitors
  const visitors = users?.data?.filter((u) => u.role === 'visitor') || [];

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(fetchAllFiles());
  }, [dispatch]);

  // Pie chart data
  const sampleData = {
    labels: ['PDFs', 'Images', 'Others'],
    datasets: [
      {
        data: [
          sampleFiles?.data?.filter((file) => file.sampleFileDetails.sampleFile.mimetype === 'application/pdf').length || 0,
          sampleFiles?.data?.filter((file) => file.sampleFileDetails.sampleFile.mimetype === "image/jpeg" || file.sampleFileDetails.sampleFile.mimetype === "image/png" || file.sampleFileDetails.sampleFile.mimetype === "images.jpg").length || 0,
          sampleFiles?.data?.filter((file) => !['application/pdf'].includes(file.sampleFileDetails.sampleFile.mimetype) && !file.sampleFileDetails.sampleFile.mimetype.startsWith('image')).length || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const userTypeData = {
    labels: ['Admin', 'Visitor', 'User'],
    datasets: [
      {
        data: [
          users?.data?.filter((user) => user.role === 'admin').length || 0,
          users?.data?.filter((user) => user.role === 'visitor').length || 0,
          users?.data?.filter((user) => user.role === 'user').length || 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return userDetails?.role === 'admin' ? (
    <div className="bg-gray-100 font-sans">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-gray-900 flex flex-col rounded-xl">
          <div className="px-6 py-4 flex items-center border-b border-gray-700">
            <h1 className="text-xl font-bold text-accent">Dashboard</h1>
          </div>
          <nav className="flex-1 px-4 py-2 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 text-base font-medium bg-accent opacity-80 rounded hover:bg-accent text-white">
              Overview
            </a>
            <a href="/admin-dashboard/userDetails" className="flex items-center px-4 py-2 text-base font-medium rounded hover:bg-accent hover:opacity-80 hover:text-white">
              All Users
            </a>
            <a href="/admin-dashboard/sample" className="flex items-center px-4 py-2 text-base font-medium rounded hover:bg-accent opacity-80 hover:text-white">
              Samples
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-base font-medium rounded hover:bg-accent opacity-80 hover:text-white">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 space-y-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin</h1>
            {/* <button className="px-6 py-3 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
              Download Report
            </button> */}
          </header>

          {/* Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Total Samples</h2>
                <p className="text-2xl font-bold text-gray-800">{totalSamples}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full text-white">
                <FaArrowUp />
              </div>
            </div>
            <div className="p-6 bg-white shadow rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
                <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full text-white">
                <FaUsers />
              </div>
            </div>
            <div className="p-6 bg-white shadow rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Visitors</h2>
                <p className="text-2xl font-bold text-gray-800">{visitors.length}</p>
              </div>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart for Sample Data */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Data</h3>
              <div className="w-72 h-72">
                <Pie data={sampleData} />
              </div>
            </div>
            {/* Pie Chart for User Type Distribution */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">User Type Distribution</h3>
              <div className="w-72 h-72">
                <Pie data={userTypeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AdminDashboard;
