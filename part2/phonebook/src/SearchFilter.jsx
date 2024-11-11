const SearchFilter = ({ searchName, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        value={searchName}
        onChange={handleSearch}
        placeholder="Search by name"
      />
    </div>
  );
};

export default SearchFilter;
