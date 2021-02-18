import React from "react";
import Table from 'react-bootstrap/Table'
import { Header, Button, Icon, Item, Message, Image, Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import { calculateItemTotal, calculateCartTotal } from "../../utils/calculateCartTotal"
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

function CartItemList({ user, products, handleRemoveFromCart }) {
  const quantityArray = products.map(item => item.quantity);
  const [quantity, setQuantity] = React.useState(quantityArray);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();


  function statusColor(status) {
    switch(status) {
      case "In Stock":
        return (
          <div>
            <p style={{color: "#15d1a8", fontSize: "12px"}}>In Stock & Ready to Ship</p>
          </div>
        )
        break;
      case "Out of Stock":
        return <p style={{color: "#969696", fontSize: "12px"}}>Out of Stock. Delivery times may be longer than usual.</p>
        break;
    }
  }

  React.useEffect(() => {
    let timeout;

    if (success) {
      setTimeout(function() {
        setTimeout(function() { () => setSuccess(false)}, 100)
        location.reload()
      }, 200)
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success])


  function handleChangeQuantity(item, newQuantity) {
    quantityArray[item] = newQuantity;
    setQuantity(newQuantity);
  }

  async function handleUpdate(updateQuantity, productId) {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cartUpdate`;
      const payload = { updateQuantity, productId };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token }};
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }


  function mapCartProductsToItems(products) {
    return products.map(p => (
      <tr>
        <td class="cartItemImageCell">
          <a href={`/products/product?_id=${p.product._id}`}>
            <Image className="cartItemImage" src={p.product.mediaUrl} size="small" />
          </a>
        </td>
        <td></td>

        <td class="cartItem">
          <a class="cartItemHeader" href={`/products/product?_id=${p.product._id}`}> {p.product.name} </a>
          <p class="cartItem-desc"> {p.product.shortDesc} </p>
          <p> {statusColor(p.product.status)} </p>
        </td>

        <td class="cartNumbers"> {`$${(p.price).toFixed(2)}`} </td>
        <td class="cartNumbers"> x </td>
        <td class="cartQuantity">
          <Input
            key={products.indexOf(p)}
            className="cartQuantityInput"
            size="small"
            type="number"
            min="1"
            value={quantity[products.indexOf(p)]}
            onChange={event => handleChangeQuantity(products.indexOf(p), Number(event.target.value))}
           />
           <p class="cartUpdateButtons">
             <Button
               className="clearButton"
               onClick={event => handleUpdate(quantity, p.product._id)}
               content="Update"
             />
           </p>
           <p class="cartUpdateButtons">
             <Button
               className="clearButton"
               onClick={event => handleRemoveFromCart(p.product._id)}
               content="Remove"
             />
           </p>
        </td>
        <td class="cartNumbers"> = </td>
        <td class="cartNumbers"> {`$${calculateItemTotal(p)}`} </td>
      </tr>
    ));
  }


  return (
    <Table className="styled-font-md">
      <thead>
        <tr>
          <td class="cartTableHeaderItem">Item</td>
          <td></td>
          <td class="cartTableHeaderName"></td>
          <td class="cartTableHeader">Price</td>
          <td></td>
          <td class="cartTableHeader">Quantity</td>
          <td></td>
          <td class="cartTableHeader">Total</td>
        </tr>
      </thead>
      <tbody class="table">
        {mapCartProductsToItems(products)}
      </tbody>
    </Table>
  );
}


export default CartItemList;
