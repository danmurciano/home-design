import React from "react";
import { Header, Form, Input, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function PriceFilter({ minValue, maxValue, onChange, handleClearPrice, onSubmit }) {

  return (
    <>
      <button class="clear-button" onClick={handleClearPrice}> CLEAR </button>
      <label style={{fontSize: "11px"}} class="MuiFormLabel-root"> PRICE </label>
      <Form>
        <Form.Group>
          <Form.Field
            className="price-filter"
            control={Input}
            name="minPrice"
            placeholder='min'
            value={minValue}
            width="6"
            type="number"
            min="0"
            onChange={onChange}
          />
          <Form.Field
            className="price-filter"
            control={Input}
            name="maxPrice"
            placeholder='max'
            value={maxValue}
            width="6"
            type="number"
            min="0"
            onChange={onChange}
          />
          <Form.Field>
            <Button
              color="instagram"
              content="Go"
              onClick={onSubmit}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
}

export default PriceFilter;
