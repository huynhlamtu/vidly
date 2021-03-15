import React from "react";

const Search = ({
  placeholder = "Search...",
  type = "text",
  onChange,
  search,
}) => {
  return (
    <form className="col-8 pl-0">
      <div className="form-group">
        <input
          value={search}
          onChange={(e) => onChange(e.currentTarget.value)}
          type={type}
          className="form-control"
          id="exampleInputSearch"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
};

export default Search;
