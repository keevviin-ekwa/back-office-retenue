import React, { useState } from "react";
import { connect } from "react-redux";
import { searchPdvAsync } from "../../store/reducers/pdv/pdv.actions";
import { createStructuredSelector } from "reselect";

function SearchBar({ searchPdv }) {
  const [searchNumber, setSearchNumber] = useState(null);
  const handleChange = (e) => {
    console.log("setSearchNumber", e.target.value);
    setSearchNumber(e.target.value);
    //searchPdv(100,1,searchNumber)
  };

  const doSearch = () => { 

    searchPdv(100,1,searchNumber)
  }

  return (
    <div className="row">
      <div className="input-group mb-3">
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          className="form-control"
          placeholder="Expemple: 6 99 99 99 99"
          aria-label="Expemple: 6 99 99 99 99"
          aria-describedby="button-addon2"
        />
        <button onClick={doSearch} className="btn btn-primary" type="button" id="button-addon2">
          Rechercher
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  searchPdv: (max, off, phoneNumber) =>
    dispatch(searchPdvAsync(max, off, phoneNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
