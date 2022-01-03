import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

export default function AddProductToCart({ user, productId, productPrice }) {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timeout;
    if (success) {
      setTimeout(() => setSuccess(false), 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success])

  async function handleAddProductToCart() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId, productPrice };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token }};
      await axios.put(url, payload, headers);
      setSuccess(true);
      router.reload();
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Input
      className="addProduct"
      size="big"
      width="2"
      type="number"
      min="1"
      placeholder="Quantity"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      action={
        user && success ? {
          color: "blue",
          content: "Item added!",
          icon: "cart",
          disabled: true
        } :
          user ? {
          color: "instagram",
          content: "Add to Cart",
          icon: "cart",
          loading,
          disabled: loading,
          onClick: handleAddProductToCart
        } : {
          size: "small",
          color: "instagram",
          content: "Sign up to purchase",
          icon: "signup",
          onClick: () => router.push("/login")
      }}
    />
  );
}
