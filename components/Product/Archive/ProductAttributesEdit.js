import React from "react";
import { Header, Button, Modal, Popup, Icon } from "semantic-ui-react";
import EditDescription from "./EditDescription";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";

function ProductAttributes({ product, name, price, mediaUrl, description, _id, user }) {
  const [descriptionModal, setDescriptionModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;


  async function handleDelete() {
    const url = `${baseUrl}/api/product`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/");
  }

  return (
    <>
    <button class="editButton" onClick={() => setDescriptionModal(true)}>
      <Header as="h3">About this product  <Icon color='blue' name='edit outline'/> </Header>
      <p>{description}</p>
    </button>

      {isRootOrAdmin && (
        <>
        <Modal open={descriptionModal} dimmer="blurring">
          <Modal.Content>
            <EditDescription
              productId={_id}
              name={name}
              price={price}
              description={description}
              mediaUrl={mediaUrl}
              setDescriptionModal={setDescriptionModal}
              />
          </Modal.Content>
        </Modal>

        <Button
          icon="trash alternate outline"
          color="red"
          content="Delete Product"
          onClick={() => setDeleteModal(true)}
        />
        <Modal open={deleteModal} dimmer="blurring">
          <Modal.Header>Confirm Delete</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this product?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setDeleteModal(false)} content="Cancel" />
            <Button
              negative
              icon="trash"
              labelPosition="right"
              content="Delete"
              onClick={handleDelete}
            />
          </Modal.Actions>
        </Modal>
        </>
      )}
    </>
  );
}

export default ProductAttributes;
