import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';


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

export default function ProductSort({ value, onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};

  return (
    <div>
      <FormControl >
        <InputLabel id="sort-by-label">SORT BY</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          name="sortBy"
          value={value}
          onChange={onChange}
          menuProps
        >
          <option value={0}>DEFAULT</option>
          <option value={1}>PRICE - LOW TO HIGH</option>
          <option value={2}>PRICE - HIGH TO LOW</option>
        </Select>
      </FormControl>
    </div>
  );
}
