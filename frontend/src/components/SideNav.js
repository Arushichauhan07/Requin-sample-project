// SideNav.js

import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
const SideNav = ({ isOpen, onClose }) => {
  const sideNavRef = useRef(null);

  const handleClose = (event) => {
    // Check if the mouse is outside the side navigation
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`} onClick={handleClose}>
      <div ref={sideNavRef} className="fixed inset-y-0 right-0 w-64 bg-[#00abe4] text-white shadow-lg flex flex-col justify-between" onMouseLeave={onClose}>
        <div className="p-4">
          <button className="text-xl hover:text-black" onClick={onClose}>×</button>
          <nav>
            <ul className="mt-10 space-y-2">
            <li><Link to="/home" className="hover:text-black">Home</Link></li>
            <li><Link to="/services" className="hover:text-black">Services</Link></li>
            <li><Link to="/career" className="hover:text-black">Career</Link></li>
            <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
            <li><Link to="/termsandconditions" className="hover:text-black">Terms and Conditions</Link></li>
            {/* <ul className="md:hidden flex text-white py-1 text-sm sm:text-xs font-light transition-all ease-in-out duration-300 flex-row gap-2 ml-28"> */}
            <li className='text-primaryText font-medium hover:cursor-pointer'>Log in</li>
            <li className='text-primaryText font-medium hover:cursor-pointer'>Sign Up</li>
            {/* </ul> */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
