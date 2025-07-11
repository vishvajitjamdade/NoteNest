function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
export default SearchBar;
