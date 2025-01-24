import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // Array of random quotes
  const quotes = [
    "Success is not the key to happiness. Happiness is the key to success.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "The best way to predict the future is to create it.",
    "Your limitation—it’s only your imagination.",
    "Dream it. Wish it. Do it.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it."
  ];

  // State to hold the selected random quote
  const [randomQuote, setRandomQuote] = useState("");

  // Function to get a random quote
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []); // Only run once when the component mounts

  return (
    <div>
      {/* Random Quote Banner */}
      <div className="bg-gradient-to-r from-[#86B3D1] to-[#00A9FF] rounded-full text-white py-4 text-center text-xl mt-6 w-[90%] justify-center mx-auto">
        <p className='px-2'>"{randomQuote}"</p>
      </div>

      {/* Footer */}
      <footer className="bg-primaryColor text-primaryText py-2 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between text-gray-600 mt-4 border-t border-gray-300">
          {/* Left Section: Logo and Description */}
          <div className="mb-8 lg:mb-0 px-4">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Company logo with increased size */}
              <a href="home">
                <img src="logo.png" alt="Requin Logo" width={180} height={120} className="w-45 h-30" />
              </a>
              {/* Company name */}
              <h2 className="text-4xl font-semibold text-accent">Requin Solutions Pvt Ltd</h2>

              {/* Description */}
              <p className="mt-4 text-lg text-primaryText leading-relaxed max-w-md">
                Requin Solutions offers you the tools and components to create highly professional websites. Our services help businesses grow through custom software and web development solutions.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-6 mt-6">
                <a href="https://in.linkedin.com/company/requin-solutions-pvt-ltdd" className="text-primaryText hover:text-accent text-2xl">
                  <FaLinkedin />
                </a>
                <a href="https://www.instagram.com/requin_solutions/" className="text-primaryText hover:text-accent text-2xl">
                  <FaInstagram />
                </a>
                <a href="https://www.instagram.com/requin_solutions/" className="text-primaryText hover:text-accent text-2xl">
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>

          {/* Middle Section: Links */}
          <div className="flex space-x-12 px-4">
            <div>
              <h3 className="text-2xl font-semibold text-accent">Site Map</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/home" className="text-lg hover:underline text-primaryText hover:text-accent">Home</a></li>
                <li><a href="/services" className="text-lg hover:underline text-primaryText hover:text-accent">Services</a></li>
                {/* <li><a href="career" className="text-lg hover:underline text-primaryText hover:text-accent">Career</a></li> */}
                <li><a href="/aboutus" className="text-lg hover:underline text-primaryText hover:text-accent">About Us</a></li>
                <li><a href="/contact" className="text-lg hover:underline text-primaryText hover:text-accent">Contact</a></li>
                <li><a href="/termsandconditions" className="text-lg hover:underline text-primaryText hover:text-accent">Terms and Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-accent">Our Services</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/web-development" className="text-lg hover:underline text-primaryText hover:text-accent">Web Design and Development</a></li>
                <li><a href="/mobile-development" className="text-lg hover:underline text-primaryText hover:text-accent">Mobile App Development</a></li>
                <li><a href="/software-solutions" className="text-lg hover:underline text-primaryText hover:text-accent">Software Solutions</a></li>
                <li><a href="/academic-solutions" className="text-lg hover:underline text-primaryText hover:text-accent">Academic Assistance</a></li>
                <li><a href="#" className="text-lg hover:underline text-primaryText hover:text-accent">Cloud Solutions</a></li>
                <li><a href="#" className="text-lg hover:underline text-primaryText hover:text-accent">Digital Marketing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-accent">Other Links</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/blog" className="text-lg hover:underline text-primaryText hover:text-accent">Blog</a></li>
                <li><a href="/career" className="text-lg hover:underline text-primaryText hover:text-accent">Career</a></li>
                <li><a href="/faqs" className="text-lg hover:underline text-primaryText hover:text-accent">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center text-lg text-primaryText">
          <p>&copy; Copyright 2024, All Rights Reserved by Requin Solutions</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
