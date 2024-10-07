import React from 'react';
import { GlobeAmericasIcon } from '@heroicons/react/24/solid';
import logo  from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="bg-blue-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} className='h-5'/>
            <span className="text-xl font-semibold text-white">Interstellar Analysts</span>
          </div>
          <a href="#" className="text-white hover:text-white">About Us</a>
        </div>
      </nav>
  );
}

export default Navbar;

