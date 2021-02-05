import React from "react";
import { Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function ProductSearch({ value, onChange, onSubmit, success, loading, disabled, error }) {

  return (
    <>
      <Form
        error={Boolean(error)}
        success={success}
      >
        <Form.Input
          transparent
          size="huge"
          width="10"
          className="searchBarInput"
          name="search"
          placeholder="Search"
          onChange={onChange}
          disabled={success}
        />
        <Button
          size="small"
          className="searchBarButton"
          disabled={disabled || loading}
          icon="delete"
        />
        <Button
          size="small"
          className="searchBarButton"
          disabled={disabled || loading}
          type="submit"
          icon="search"
        />
      </Form>
    </>
  );
}

export default ProductSearch;
