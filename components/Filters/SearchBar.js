import React from "react";
import { Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function SearchBar({ label, value, handleChange, handleClearSearch, handleSubmit }) {

  return (
    <>
      <button class="clear-button" onClick={handleClearSearch}> CLEAR </button>
      <label style={{fontSize: "11px"}} class="MuiFormLabel-root"> {label} </label>
      <div class="search-bar">
        <Form>
          <Form.Input
            transparent
            size="large"
            className="searchBarInput"
            name="search"
            placeholder="Search"
            value={value}
            onChange={handleChange}
          />
          <Button
            size="small"
            className="searchBarButton"
            type="submit"
            icon="search"
            onClick={handleSubmit}
          />
        </Form>

      </div>
    </>
  );
}

export default SearchBar;
