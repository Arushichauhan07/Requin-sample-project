import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from './SideNav';
import Register from './Register';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from "../features/userDetails/userDetails";
import { login, logout } from '../features/auth/reduxAuth';
import ProfileUser from './ProfileUser';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState("")
  const { userDetails } = useSelector((state) => state.user);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const token = localStorage.getItem('token');
  const User = JSON.parse(sessionStorage.getItem('user'))

  // console.log("User from header", User);
  

  useEffect(() => {
    if (User) {
      setLoggedInUser(User?.userName); 
    } else {
      setLoggedInUser(''); 
    }
  }, [User]);

  // Logout function
  const handleLogout = () => {
    dispatch(logout()); 
    setLoggedInUser(''); 
  };

 
  
  return (
    <header className="bg-primaryColor text-primaryText shadow-lg overflow-hidden">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        
        {/* Logo Section - Left Aligned */}
        <a href='home' className="flex items-center space-x-4 min-w-[100px]">
          <img
            src="logo.png"
            alt="Requin Logo"
            className="h-20 xl:h-24 transition-all duration-500 ease-in-out"
          />
        </a>

        {/* Centered Search Bar for Medium Screens */}
        <div className="relative hidden md:flex md:flex-grow md:justify-center max-w-[300px] transition-all duration-500 ease-in-out">
          <input
            type="text"
            className="hidden md:flex w-full px-4 py-2 rounded-lg bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Menu Button for Smaller Screens */}
        <button
          className="md:hidden text-accent focus:outline-none"
          onClick={() => setShowNav(!showNav)}
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
          {['Sample'].map(
            (item, index) => (
              <NavLink
                key={index}
                exact
                to={`/${item.toLowerCase().replace(/ /g, '')}`}
                className="text-primaryText hover:text-accent py-2 px-3 text-lg xl:text-xl font-medium transition-all ease-in-out duration-300"
                activeClassName="text-accent font-semibold"
              >
                {item}
              </NavLink>
            )
          )}
          {loggedInUser ? <h1 className='text-accent py-2 px-3 text-lg xl:text-xl font-bold transition-all ease-in-out duration-300 cursor-pointer' onClick={()=>setShowUserProfile(true)}>
            {loggedInUser && loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1)}
            </h1> : (
            <ul className="hidden md:flex text-primaryText py-2 text-lg font-medium transition-all ease-in-out duration-300 flex-row gap-6">
            <li 
            className='cursor-pointer hover:text-accent hover:underline hover:underline-offset-1' 
            onClick={()=> setLogin(true)}>
              log in
            </li>
            <li 
            className='cursor-pointer hover:text-accent hover:underline hover:underline-offset-1' 
            onClick={()=>setRegister(true)}>
              Sign Up
            </li>
          </ul>
          )}
          
        </nav>

        {/* Mobile Side Navigation */}
        <SideNav isOpen={showNav} onClose={() => setShowNav(false)} />
        <Register register={register} setRegister={setRegister} setLogin={setLogin}/>
        <Login login={login} setLogin={setLogin} setRegister={setRegister}/>
        <ProfileUser showUserProfile = {showUserProfile} setShowUserProfile={setShowUserProfile} handleLogout={handleLogout}/>
      </div>
    </header>
  );
};

export default Header;
