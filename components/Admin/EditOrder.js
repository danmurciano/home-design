import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Button, Message, Icon, Label } from "semantic-ui-react";
import { FormControl, FormControlLabel, Select } from '@material-ui/core';
import OrderItemList from "./OrderItemList"
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";
import { formatDate } from "../../utils/formatDate";


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


export default function EditOrder({ order, setStatusModal, handleEdit }) {
  const orderId = order._id;

  const [status, setStatus] = React.useState(order.status);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};


  function handleChange(event) {
    setStatus(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setError("");
      const url = `${baseUrl}/api/order`;
      const tokenAdmin = cookie.get("tokenAdmin");
      const payload = {
        params: { orderId, status },
        headers: { Authorization: tokenAdmin }
      }
      const response = await axios.put(url, payload);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      handleEdit(event);
      setStatusModal(false);
    }
  }


  return (
    <>
      <div class="order-modal">
        <h3 class="styled-font-md"> {`ORDER # ${order._id}`} </h3>
        <div class="order-modal-header row">
          <div class="col">
            <p class="order-header-top"> ORDER PLACED </p>
            <p class="order-header-bottom"> {formatDate(order.createdAt)} </p>
          </div>
          <div class="col">
            <p class="order-header-top"> TOTAL </p>
            <p class="order-header-bottom"> {order.total} </p>
          </div>
          <div class="col">
            <p class="order-header-top"> SHIP TO </p>
            <p class="order-header-bottom"> {order.shipTo} </p>
          </div>
        </div>

        <div class="order-modal-main">
          <OrderItemList products={order.products} />
        </div>
      </div>

      <Form
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error} />

        <Form.Field
          control={Input}
          name="order-status"
          disabled={success}
        >
          <FormControl className="order-status-select">
            <Select
              native
              labelId="order-status-label"
              id="order-status"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              name="status"
              value={status}
              onChange={handleChange}
              menuProps
            >
            <option value="Being Processed">Being Processed</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
            </Select>
          </FormControl>
        </Form.Field>

        <Form.Field
          control={Button}
          disabled={success}
          fluid
          size="big"
          color="instagram"
          content="Save"
          type="submit"
        />
      </Form>
    </>
  );
}
