import axios from "axios";
import OrderItemList from "../../components/Account/OrderItemList";
import { Icon, Button, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/formatDate";
import baseUrl from "../../utils/baseUrl";

export default function Order({ order }) {

  return (
    <div class="container-fluid pageOrder">
      <div class="order-page-header">
        <h1 class="styled-font-tn"> <Icon name="check circle" className="check-icon" /> Thank you for your order </h1>
      </div>

      <div class="order-content">
        <h3 class="styled-font-bd"> {`ORDER # ${order._id}`} </h3>
        <p class="styled-font-tn"> {`Ordered on ${formatDate(order.datePlaced)}`} </p>
        <p class="styled-font-md"> <Icon name="truck" color="blue"/> {`Ship to ${order.shipTo}`} </p>

        <div class="order-summary">
          <h4 class="styled-font-tn"> Order Summary </h4>
          <OrderItemList products={order.products} />
          <Divider />
          <div class="row cartTotal styled-font-md">
            <div class="col"></div>
            <div class="col-5"> Order Total </div>
            <div class="col-3 total-col"> ${order.total} </div>
          </div>
        </div>
      </div>

      <div class="continue-button-div">
        <Button  color="instagram" size="big" href="/"> Continue Shopping </Button>
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
