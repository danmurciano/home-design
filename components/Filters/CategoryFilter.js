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

export default function CategoryFilter({ value, onChange }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};

  return (
    <div>
      <FormControl >
        <InputLabel id="category-label">CATEGORY</InputLabel>
        <Select
          native
          labelId="category-filter-label"
          id="category-filter"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          name="category"
          value={value}
          onChange={onChange}
          menuProps
        >
          <option value={0}>All</option>
          <option value={1}>LIVING ROOM</option>
          <option value={2}>BEDROOM</option>
          <option value={3}>LIGHTING</option>
          <option value={4}>TEXTILES & RUGS</option>
        </Select>
      </FormControl>
    </div>
  );
}
