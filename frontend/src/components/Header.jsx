import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = ({ search, onSearchChange }) => {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          NoteNest
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Fast notes with search, pinned items, and dark mode.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-72 rounded-xl border border-gray-300 bg-white dark:bg-[#161b22] dark:border-gray-700 dark:text-gray-100 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
        />

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
