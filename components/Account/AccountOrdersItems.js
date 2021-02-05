import { Image } from "semantic-ui-react";
import Table from 'react-bootstrap/Table'
import { calculateItemTotal, calculateCartTotal } from "../../utils/calculateCartTotal"

export default function AccountOrdersItems({ products }) {

  function mapCartProductsToItems(products) {
    return products.map(p => (
      <tr>
        <td class="orderItemImageCell">
          <a href={`/products/product?_id=${p.product._id}`}>
            <Image className="order-item-image" src={p.product.mediaUrl} size="small" />
          </a>
        </td>
        <td></td>

        <td class="orderItem">
          <a class="cartItemHeader" href={`/products/product?_id=${p.product._id}`}> {p.product.name} </a>
          <p class="cartItem-desc"> {p.product.shortDesc} </p>
        </td>

        <td class="orderNumbers"> {`$${(p.price).toFixed(2)}`} </td>
        <td class="orderNumbers"> x </td>
        <td class="orderNumbers"> {p.quantity} </td>
        <td class="orderNumbers"> = </td>
        <td class="orderNumbers"> {`$${calculateItemTotal(p)}`} </td>
      </tr>
    ));
  }


  return (
    <Table borderless className="styled-font-md">
      <thead>
        <tr>
          <td class="orderTableHeaderItem"></td>
          <td></td>
          <td class="orderTableHeaderName"></td>
          <td class="orderTableHeader"></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="orderTableHeader"></td>
        </tr>
      </thead>
      <tbody >
        {mapCartProductsToItems(products)}
      </tbody>
    </Table>
  );
}
