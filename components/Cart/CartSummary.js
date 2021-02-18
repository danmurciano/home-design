import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import { calculateCartTotal } from "../../utils/calculateCartTotal"

export default function CartSummary({ products, handleCheckout, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
  }, [products]);


  return (
    <>
      <Divider />

      <div class="row cartTotal styled-font-md">
        <div class="col"></div>
        <div class="col-5"> Cart Total </div>
        <div class="col-3 total-col"> ${cartAmount} </div>
      </div>

      <div class="row cartTotal">
        <div class="col checkout-col">
          <StripeCheckout
            name="Home Design"
            amount={stripeAmount}
            image={products.length > 0 ? products[0].product.mediaUrl : ""}
            currency="USD"
            shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            stripeKey="pk_test_51H7Xj8HM0g7Jn1RdQ8DsvY0xqcv3ApRIeODnlIKQPdOxmfwwe01wap99AQSNjhoNWOJNRAQQuXzXvlhg2g4jpSaj00Gsql7Nrs"
            token={handleCheckout}
            triggerEvent="onClick"
          >
            <Button
              className="checkout-button"
              icon="cart"
              disabled={success}
              color="red"
              floated="right"
              content="Checkout"
              size="big"
            />
          </StripeCheckout>
        </div>
      </div>
    </>
  );
}
