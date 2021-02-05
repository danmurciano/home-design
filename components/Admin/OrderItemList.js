import { Image } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function OrderItemList({ products }) {
  const router = useRouter();


  function mapOrderProductsToItems(products) {
    return products.map(p => (
      <div class="row order-modal-item-list">
        <div class="order-modal-image-col">
          <Image size="tiny" src={p.product.mediaUrl} />
        </div>
        <div class="order-modal-item-col">
          <div class="row">
            <div class="col-6">
              <p class="order-item-header"> {p.product.name} </p>
            </div>
            <div class="col-6">
              <p class="order-modal-sku"> {`sku: ${p.product.sku}`} </p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <p> {`Price: $${(p.price).toFixed(2)}`} </p>
            </div>
            <div class="col-6">
              <p> {`Qty: ${p.quantity}`} </p>
            </div>

          </div>
        </div>
      </div>
    ));
  }

  return (
    mapOrderProductsToItems(products)
  )
}
