import React from "react";
import Table from 'react-bootstrap/Table'
import { Header, Button, Icon, Item, Message, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { calculateItemTotal, calculateCartTotal, calculateCartItems } from "../../utils/calculateCartTotal"
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";


export default function CartPopup({ user, products, handleRemoveFromCart }) {
  const [cartProducts, setCartProducts] = React.useState(products);
  const router = useRouter();

  const cartItems = calculateCartItems(products);
  const cartAmount = calculateCartTotal(products).cartTotal;


  async function handleRemoveFromCart(productId) {
    const url = `${baseUrl}/api/cartUpdate`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    }
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
    router.reload();
  }

  function handleViewCart() {
    router.push("/cart");
  }


  function mapCartProductsToItems(products) {
    return products.map(p => (
      <tr>
        <td class="cartPopupItemImageCell">
          <a href={`/products/product?_id=${p.product._id}`}>
            <Image className="cartPopupImage" src={p.product.mediaUrl} />
          </a>
        </td>
        <td class="cartPopupItem">
          <a class="cartPopupItemHeader" href={`/product?_id=${p.product._id}`}> {p.product.name} </a>
          <p class="cartPopupDesc"> {p.product.shortDesc} </p>
          <p class="cartPopupPrice"> {`$${(p.price).toFixed(2)}`} </p>
          <p class="cartPopupQty"> {`Qty: ${p.quantity}`} </p>
          <p class="cartUpdateButtons cartPopupQty">
            <Button
              className="clearButton"
              onClick={event => handleRemoveFromCart(p.product._id)}
              content="Remove"
            />
          </p>
        </td>
      </tr>
    ));
  }


  return (
    <div class="cartPopup styled-font-md">
      <div class="cartPopupHeader">
        <h4> {`Your Cart: ${cartItems} items`} </h4>
        <p class="cartPopupPrice"> {`Total Price: $${cartAmount}`} </p>
      </div>

      <table class="table">
        <tbody>
          {mapCartProductsToItems(products)}
          <tr>
            <td style={{ padding: "6px" }}/> <td style={{ padding: "6px" }}/>
          </tr>
        </tbody>
      </table>

      <div class="cartPopup-button">
        <Button
          circular
          color="instagram"
          onClick={handleViewCart}
          content="View Cart"
          size="large"
         />
      </div>
    </div>
  );
}
