import React from "react";
import { useRouter } from "next/router";
import { Segment, Header, Icon } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import cookie from "js-cookie";


export default function Cart({ user, products }) {
  const [cartProducts, setCartProducts] = React.useState(products);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();


  async function handleRemoveFromCart(productId) {
    const url = `${baseUrl}/api/cartUpdate`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    }
    const response = await axios.delete(url, payload);
    router.reload();
  }

  async function handleCheckout(paymentData) {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get("token");
      const payload = { paymentData, cartProducts };
      const headers = { headers: { Authorization: token } };
      const response = await axios.post(url, payload, headers);
      const order = response.data;
      setSuccess(true);
      router.push(`account/order_confirmation?_id=${order._id}`);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="container-fluid cartPage">
      <div class="row cartHeaderRow">
        <div class="cartHeaderTag"> Shopping Cart </div>
      </div>

      {products.length === 0 ? (

        <div class="cart-empty-div">
          <Segment inverted tertiary color="grey" textAlign="center">
            <Icon name="cart" size="big" />
            <Header size="huge">
              Your cart is empty
            </Header>
          </Segment>
        </div>

      ) : (

      <>
        <CartItemList
          handleRemoveFromCart={handleRemoveFromCart}
          user={user}
          products={cartProducts}
        />

        <CartSummary
          products={cartProducts}
          handleCheckout={handleCheckout}
          success={success}
        />
      </>
      )}

    </div>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token }};
  const response = await axios.get(url, payload);
  return { products: response.data };
}
