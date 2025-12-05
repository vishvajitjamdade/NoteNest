

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-slate-800/80 dark:border-slate-600"
    />
  );
};

export default SearchBar;
