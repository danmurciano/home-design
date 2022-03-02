import { Icon, Segment, Header, Label } from "semantic-ui-react";
import { formatDate } from "../../utils/formatDate";
import AccountOrdersItems from "./AccountOrdersItems"

export default function AccountOrders({ orders }) {

  function mapOrdersToPanels(orders) {
    return orders.map(order => (
      <div class="order-segment">
        <div class="order-header row">
          <div class="col-2">
            <p class="order-header-top"> ORDER PLACED </p>
            <p class="order-header-bottom"> {formatDate(order.createdAt)} </p>
          </div>
          <div class="col-2">
            <p class="order-header-top"> TOTAL </p>
            <p class="order-header-bottom"> {order.total.toFixed(2)} </p>
          </div>
          <div class="col-5">
            <p class="order-header-top"> SHIP TO </p>
            <p class="order-header-bottom"> {order.shipTo} </p>
          </div>
          <div class="col-3">
            <p class="order-header-id"> {`ORDER # ${order._id}`} </p>
            <p class="order-header-details"> <a href={`/account/order?_id=${order._id}`}> Order Details </a> </p>
          </div>
        </div>

        <div class="order-main">
          <AccountOrdersItems products={order.products} />
        </div>
      </div>
    ));
  }


  return (
    <>
      <div class="accountSectionHeader">
        <p> ORDER HISTORY </p>
      </div>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No past orders
          </Header>
        </Segment>
      ) : (
        <div>
          {mapOrdersToPanels(orders)}
        </div>
      )}
    </>
  );
}
