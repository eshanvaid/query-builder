import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white flex items-center h-16">
        <div className="flex items-center justify-center">
            <img src="./Enterpret.png" alt="Enterpret logo" className=" mx-6" />
            <h1 className="text-white text-lg leading-7 font-medium mx-auto">Query Builder</h1>
        </div>    
    </nav>
  );
};

export default Navbar;
