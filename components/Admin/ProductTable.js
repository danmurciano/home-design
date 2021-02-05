import React from "react";
import Table from 'react-bootstrap/Table';
import { Image, Button } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import EditProduct from "./EditProduct";


function ProductTable({ products, sortByState, ascendingState, handleSortTable, handleEdit }) {
  const [editModal, setEditModal] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);

  function statusColor(p) {
    switch(p.status) {
      case "In Stock":
        return <p style={{color: "#15d1a8"}}>In Stock</p>
        break;
      case "Out of Stock":
        return <p style={{color: "red"}}>Out of Stock</p>
        break;
      case "Discontinued":
        return <p style={{color: "Black"}}>Discontinued</p>
        break;
    }
  }


  function mapProductsToItems(products) {
    return products.map(product => (
      <>
      <tr class="product-row">
        <td>
          <Button className="edit-product-button" onClick={() => setEditModal(product._id)}> Edit </Button>
        </td>
        <td> <a href={`/admin/product?_id=${product._id}`} target="_blank" rel="noopener noreferrer">
          <Image src={product.mediaUrl} size="mini" className="mini-image" />
        </a> </td>
        <td> <a href={`/admin/product?_id=${product._id}`} target="_blank" rel="noopener noreferrer">
          <p style={{ margin: "2px" }}> {product.name} </p>
          <p class="shortDesc"> {product.shortDesc} </p>
        </a> </td>
        <td> {product.sku} </td>
        <td> {`$${(product.price).toFixed(2)}`} </td>
        <td> {product.category} </td>
        <td> {statusColor(product)} </td>
      </tr>
      <Modal size="lg" show={editModal === product._id} onHide={() => setEditModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title as="h4" className="edit-product-title"> EDIT PRODUCT </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct
            existingProduct={product}
            setConfirmModal={setConfirmModal}
            confirmModal={confirmModal}
            setEditModal={setEditModal}
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
          <th class="table-col-sm">Image</th>
          <th class="table-col-lg"> <button class="table-col-header" onClick={() => handleSortTable("name")}> Product Name </button> </th>
          <th class="table-col-md">SKU</th>
          <th class="table-col-md"> <button button class="table-col-header" onClick={() => handleSortTable("price")}> Price </button> </th>
          <th class="table-col-md"> <button button class="table-col-header" onClick={() => handleSortTable("category")}> Category </button> </th>
          <th class="table-col-md">Status</th>
        </tr>
      </thead>
      <tbody class="admin-table">
        {mapProductsToItems(products)}
      </tbody>
    </Table>
  );
}

export default ProductTable;
