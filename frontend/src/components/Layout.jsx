import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-gray-900 dark:bg-[#0d1117] dark:text-gray-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
