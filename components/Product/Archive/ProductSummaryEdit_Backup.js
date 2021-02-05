import React from "react";
import { Item, Label, Icon, Header, Modal } from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";
import EditName from "./EditName";
import EditPrice from "./EditPrice";
import EditPhoto from "./EditPhoto";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";

function ProductSummary({ name, mediaUrl, _id, price, sku, product, description, user}) {
  const [nameModal, setNameModal] = React.useState(false);
  const [priceModal, setPriceModal] = React.useState(false);
  const [photoModal, setPhotoModal] = React.useState(false);
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;


  return (
    <>
    <Item.Group>
      <Item>
        <button class="editButton" onClick={() => setPhotoModal(true)}>
          <Item.Image size="medium" src={mediaUrl} />
        </button>
        <Item.Content>
          <button class="editButton" onClick={() => setNameModal(true)}>
            <Header as="h3">{name} <Icon color='blue' name='edit outline' /> </Header>
          </button>
          <Item.Description>
            <p>
              <button class="editButton" onClick={() => setPriceModal(true)}>
                {`$${(price).toFixed(2)}`} <Icon color='blue' name='edit outline' />
              </button>
            </p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>

    <Modal open={nameModal} dimmer="blurring">
      <Modal.Content>
        <EditName
          productId={_id}
          name={name}
          price={price}
          description={description}
          mediaUrl={mediaUrl}
          setNameModal={setNameModal}
          />
      </Modal.Content>
    </Modal>

    <Modal open={priceModal} dimmer="blurring" height="300px">
      <Modal.Content>
        <EditPrice
          productId={_id}
          name={name}
          price={price}
          description={description}
          mediaUrl={mediaUrl}
          setPriceModal={setPriceModal}
          />
      </Modal.Content>
    </Modal>

    <Modal open={photoModal} dimmer="blurring">
      <Modal.Content>
        <EditPhoto
          productId={_id}
          name={name}
          price={price}
          description={description}
          mediaUrl={mediaUrl}
          setPhotoModal={setPhotoModal}
          />
      </Modal.Content>
    </Modal>

    </>
  );
}

export default ProductSummary;
