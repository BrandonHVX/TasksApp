import React from 'react';

const Searchbar = props => {
  return(
    <div className="form-group">
      <input
        type="search"
        placeholder="Search"
        autoComplete="off"
        className="form-control"
        name="term"
        id="term"
        value={props.term}
        onChange={props.handleTermChange}
      />
    </div>
  )
}

export default Searchbar;
