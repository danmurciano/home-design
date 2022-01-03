import axios from "axios";
import AddProductToCart from "../../components/Product/AddProductToCart";
import { Image, Label, Breadcrumb } from "semantic-ui-react";
import productStatusMessage from "../../utils/productStatusMessage";
import baseUrl from "../../utils/baseUrl";


export default function Product({ product, user }) {

  const sections = [
    { key: 'Products', content: 'Products', href: "/products" },
    { key: 'Product', content: `${product.name}` },
  ]

  return (
    <div class="container-fluid page-product">
      <div class="breadcrumb-div">
        <Breadcrumb className="breadcrumb" size="small" icon='right angle' sections={sections} />
      </div>

      <div class="row product-content">
        <div class="col-md-5 col-sm-12 image-col">
          <Image className="product-image" size="big" src={product.mediaUrl} />
        </div>

        <div class="col-md-7 col-sm-12 image-col">
          <div class="product-section">
            <h2 class="styled-font-tn">{product.name}</h2>
            <p class="styled-font-tn">{product.shortDesc}</p>
          </div>

          <div class="product-section">
            <p class="article-number">ARTICLE NUMBER</p>
            <Label className="styled-font-tn" color="black"> {product.sku} </Label>
          </div>

          <hr></hr>

          <div class="product-section">
            <h4 class="styled-font-md">Product Description</h4>
            <p class="styled-font-tn">{product.description}</p>
          </div>

          <hr></hr>

          <div class="product-section">
            {productStatusMessage(product.status)}
            <br></br>
            <h2 class="styled-font-md"> {`$${(product.price).toFixed(2)}`} </h2>
            <p class="styled-font-tn"> & Free Shipping </p>
          </div>

          <div class="product-section">
            {(product.status !== "Discontinued") ? (
              <AddProductToCart user={user} productId={product._id} productPrice={product.price} />
            ) : (
              <> </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/product`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { product: response.data };
};
