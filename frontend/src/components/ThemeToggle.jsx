import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white dark:bg-[#161b22] border border-gray-300 dark:border-gray-700 shadow hover:shadow-md transition"
    >
      <span
        className={`h-3 w-3 rounded-full ${
          theme === "dark" ? "bg-gray-400" : "bg-yellow-400"
        }`}
      ></span>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
