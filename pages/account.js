import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

export default function Account({ user, orders }) {
  return (
    <div class="container-fluid accountPage">

      <div class="row account-header-row">
        <div class="cartHeaderTag">
          My Account
        </div>
      </div>

      <div class="accountMain">
        <AccountHeader {...user} />
        <AccountOrders orders={orders} />
      </div>
    </div>
  );
}

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const url = `${baseUrl}/api/orders_user`;
  const payload = { headers: { Authorization: token }};
  const response = await axios.get(url, payload);
  return response.data;
}
