import React, { Component } from "react";

const Select = ({ label, name, items, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        {...rest}
        name={name}
        className="custom-select"
        aria-label="Default select example"
      >
        <option key={`${name}${label}`} value=""></option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Select;
