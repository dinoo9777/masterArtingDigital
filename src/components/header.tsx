import React from "react";
import logo from "../assets/connect-desktop-header-bi.svg"; // ✅ Use import for Vite

const Header = () => {
  return (
    <header className="bg-black shadow-xl" style={{ height: "64px" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-baseline">
        <h1 className="text-2xl font-bold text-green-600 mt-2">
            <img src={logo} alt="Logo" className="h-4" />
        </h1>
      </div>
    </header>
  );
};

export default Header;