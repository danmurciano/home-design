import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, FormGroup, TextField, Input } from '@material-ui/core';
import { Button } from "semantic-ui-react";


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function PriceFilter({ minValue, maxValue, onChange, handleClearPrice, onSubmit }) {
  const classes = useStyles();

  return (
    <div>
      <div>
        <button class="clear-button" onClick={handleClearPrice}> CLEAR </button>
        <label style={{fontSize: "11px"}} class="MuiFormLabel-root"> PRICE </label>
      </div>
      <FormGroup>
        <div class="filter-div row">
          <Input
            className="price-input"
            disableUnderline
            labelId="sort-by-label"
            id="minValue"
            type="number"
            name="minPrice"
            placeholder="min"
            value={minValue}
            min={0}
            startegy="ignore"
            onChange={onChange}
            inputProps
          >
          </Input>
          <Input
            className="price-input"
            disableUnderline
            labelId="sort-by-label"
            id="maxValue"
            type="number"
            name="maxPrice"
            placeholder="max"
            value={maxValue}
            onChange={onChange}
            inputProps
          >
          </Input>
          <Button
            className="price-filter-button"
            circular
            color="instagram"
            content="Go"
            onClick={onSubmit}
          />
        </div>
      </FormGroup>
    </div>
  );
}
