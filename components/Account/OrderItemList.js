import { Header, Icon, Image } from "semantic-ui-react";
import Table from 'react-bootstrap/Table'
// import { Header, Icon, Image, Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import { calculateItemTotal, calculateCartTotal } from "../../utils/calculateCartTotal"

export default function OrderItemList({ products }) {
  const router = useRouter();

  function mapCartProductsToItems(products) {
    return products.map(p => (
      <tr>
        <td class="cartItemImageCell">
          <a href={`/products/product?_id=${p.product._id}`}>
            <Image className="order-item-image" src={p.product.mediaUrl} size="small" />
          </a>
        </td>
        <td></td>

        <td class="cartItem">
          <a class="cartItemHeader" href={`/products/product?_id=${p.product._id}`}> {p.product.name} </a>
          <p class="cartItem-desc"> {p.product.shortDesc} </p>
        </td>

        <td class="cartNumbers"> {`$${(p.price).toFixed(2)}`} </td>
        <td class="cartNumbers"> x </td>
        <td class="cartNumbers"> {p.quantity} </td>
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
      <tbody >
        {mapCartProductsToItems(products)}
      </tbody>
    </Table>
  );
}
