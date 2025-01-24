import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SampleUpload from "./SampleUpload";
import { updateUserDetails } from "../features/userDetails/userDetails";
import { loginUser } from "../features/auth/reduxAuth";


const ProfileUser = ({ showUserProfile, setShowUserProfile, handleLogout }) => {
  const { userDetails, userAuthenticated } = useSelector((state) => state.user);
  const profileRef = useRef(null)
  const [openSample, setOpenSample] = useState(false)
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // console.log("userDetails", userDetails);
  
  useEffect(() => {
    if(isAuthenticated){
      dispatch(updateUserDetails())
    }else{
      dispatch(updateUserDetails())
    }
  }, [dispatch, isAuthenticated])


  const handleClickOutside = (event) => {
    if(profileRef.current && !profileRef.current.contains(event.target)){
        setShowUserProfile(false)
    }
  }

  useEffect(() => {
    if(showUserProfile){
        document.addEventListener("mousedown", handleClickOutside)
    }else{
        document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
        document.removeEventListener("mousedown",handleClickOutside)
    }
  }, [showUserProfile])

  return (
    <>
      <div
      ref={profileRef}
      className={`${
        showUserProfile ? "translate-x-0" : "translate-x-full"
      } fixed top-0 right-0 w-96 h-auto mt-20 bg-white transition-transform duration-500 z-50 rounded-lg shadow-2xl border border-gray-200`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-400 text-white px-6 py-4 rounded-t-lg border-b">
        <h2 className="text-xl font-semibold">User Profile</h2>
      </div>

      {/* User Details */}
      <div className="p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-semibold text-gray-700">
            {userDetails?.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-medium text-gray-800">
              {userDetails?.userName?.charAt(0).toUpperCase() +
                userDetails?.userName?.slice(1) || "Username"}
            </h3>
            <p className="text-sm text-gray-600">{userDetails?.role || "Role"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Email:</span> {userDetails?.email || "email@example.com"}
          </p>
          {/* <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Joined:</span> {new Date(userDetails?.createdAt).toLocaleString() || "Not available"}
          </p> */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gray-100 border-t rounded-b-lg space-y-4">
        <button
          onClick={() => {
            handleLogout();
            setShowUserProfile(false);
          }}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-md transition duration-300 transform hover:scale-105"
        >
          Log Out
        </button>

          {
            userDetails?.role === "admin" ? (
              <button 
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition duration-300 transform hover:scale-105"
              onClick={()=>{setOpenSample(true)
                setShowUserProfile(false)
              }}>
              Upload Samples
            </button>
            ) : ""
          }
       
      </div>
    </div>

    <SampleUpload openSample={openSample} setOpenSample={setOpenSample}/>
    </>
  );
};

export default ProfileUser;
