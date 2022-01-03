import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";


export default function ProductList({ user, products }) {
  const [hover, setHover] = React.useState("none");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const quantity = 1


  let customer = false;
  if (user) {
    if (user.role === "user") {
      customer = true;
    }
  }

  let isTouchDevice;
  if (typeof window !== "undefined") {
    isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  };


  async function handleAddProductToCart(productId, productPrice) {
    try {
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId, productPrice };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token }};
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      router.reload();
    }
  }


  function mapProductsToItems(products) {
    return products.map(product => (
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 productCard"
        onMouseEnter={() => setHover(product._id)}
        onMouseLeave={() => setHover("none")}
      >
        <div class="card-content">
          <a class="productLink" href={`/products/product?_id=${product._id}`}>
            <img src={product.mediaUrl} class="card-img-top indexProductImage" alt="..."/>
            <div class="card-body">
              <h5 class="card-name styled-font-md">{product.name}</h5>
              <p class="card-desc styled-font-tn">{product.shortDesc}</p>
              <p class="card-price styled-font-md">{`$${(product.price).toFixed(2)}`}</p>
            </div>
          </a>
          {customer ? (
            <Button circular size="small" color="instagram" icon="cart"
              className={hover === product._id || isTouchDevice ? "add-to-cart" : "add-to-cart-hidden"}
              onClick={() => handleAddProductToCart(product._id, product.price)}
            >
              <Icon name="cart" /> Add to Cart
            </Button>
          ) : (
            <> </>
          )}
        </div>
      </div>
    ));
  }


  return (
    <div class="row">
      {mapProductsToItems(products)}
    </div>
  );
}
