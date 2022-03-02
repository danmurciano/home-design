import axios from "axios";
import OrderItemList from "../../components/Account/OrderItemList";
import OrderSteps from "../../components/Account/OrderSteps";
import { Icon, Label, Button, Breadcrumb, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/formatDate";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";

export default function Order({ order }) {

  const sections = [
    { key: 'Account', content: 'Account', href: "/account" },
    { key: 'Order', content: 'Order' },
  ]


  return (
    <div class="container-fluid pageOrder">
      <div class="breadcrumb-div">
        <Breadcrumb className="breadcrumb" size="small" icon='right angle' sections={sections} />
      </div>

      <div class="order-content">
        <h3 class="styled-font-bd"> {`ORDER # ${order._id}`} </h3>
        <p class="styled-font-tn"> {`Ordered on ${formatDate(order.datePlaced)}`} </p>
        <p class="styled-font-md"> <Icon name="truck" color="grey"/> {`Ship to ${order.shipTo}`} </p>

        <div class="order-steps">
          {order.status === "Canceled" ? (
            <Label className="cancel-label"> <h4 class="styled-font-md"> Canceled </h4> </Label>
          ) : (
            <OrderSteps orderStatus={order.status} />
          )}
        </div>

        <div class="order-summary">
          <h4 class="styled-font-tn"> Order Summary </h4>
          <OrderItemList products={order.products} />
          <Divider />
          <div class="row cartTotal styled-font-md">
            <div class="col"></div>
            <div class="col-5"> Order Total </div>
            <div class="col-3 total-col"> ${order.total.toFixed(2)} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Order.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/order`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { order: response.data };
};
