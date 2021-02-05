import React from "react";
import Table from 'react-bootstrap/Table';
import { Button } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import EditOrder from "./EditOrder";
import { formatDate, formatTime } from "../../utils/formatDate";

export default function OrderTable({ orders, sortByState, ascendingState, handleSortTable, handleEdit }) {
  const [statusModal, setStatusModal] = React.useState(false);


  function mapOrdersToItems(orders) {
    return orders.map(order => (
      <>
      <tr class="product-row">
        <td>
          <Button className="edit-product-button" onClick={() => setStatusModal(order._id)}>
            Edit
          </Button>
        </td>
        <td> {order._id} </td>
        <td> {order.email} </td>
        <td> {order.status} </td>
        <td>
          <p style={{ margin: "2px" }}>{formatDate(order.datePlaced)}</p>
          <p style={{ fontSize: "10px", margin: 0 }}>{formatTime(order.datePlaced)}</p>
        </td>
        <td>
          <p style={{ margin: "2px" }}>{formatDate(order.dateShipped)}</p>
          <p style={{ fontSize: "10px", margin: 0 }}>{formatTime(order.dateShipped)}</p>
        </td>
        <td>
          <p style={{ margin: "2px" }}>{formatDate(order.dateDelivered)}</p>
          <p style={{ fontSize: "10px", margin: 0 }}>{formatTime(order.dateDelivered)}</p>
        </td>
      </tr>
      <Modal show={statusModal === order._id} onHide={() => setStatusModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title as="h4" className="edit-product-title"> EDIT ORDER STATUS </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditOrder
            order={order}
            setStatusModal={setStatusModal}
            handleEdit={handleEdit}
          />
        </Modal.Body>
      </Modal>
      </>
    ));
  }

  return (
    <Table striped bordered hover >
      <thead>
        <tr>
          <th class="table-col-sm"></th>
          <th>Order #</th>
          <th>Customer</th>
          <th>Status</th>
          <th class="table-col-md"> <button button class="table-col-header" onClick={() => handleSortTable("datePlaced")}> Date Placed </button> </th>
          <th class="table-col-md"> <button button class="table-col-header" onClick={() => handleSortTable("dateShipped")}> Date Shipped </button> </th>
          <th class="table-col-md"> <button button class="table-col-header" onClick={() => handleSortTable("dateDelivered")}> Date Delivered </button> </th>
        </tr>
      </thead>
      <tbody class="table">
        {mapOrdersToItems(orders)}
      </tbody>
    </Table>
  );
}
