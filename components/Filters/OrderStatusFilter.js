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

function ProductSort({ value, onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};

  return (
    <div>
      <FormControl >
        <InputLabel id="include-label">INCLUDE</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          name="statusFilter"
          value={value}
          onChange={onChange}
          menuProps
        >
          <option value={0}>All</option>
          <option value={1}>BEING PROCESSED</option>
          <option value={2}>IN TRANSIT</option>
          <option value={3}>DELIVERED</option>
          <option value={4}>CANCELED</option>
        </Select>
      </FormControl>
    </div>
  );
}

export default ProductSort;
