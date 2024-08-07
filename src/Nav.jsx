import React from 'react';

export default function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Plifkart
        </a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success ml-2" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
