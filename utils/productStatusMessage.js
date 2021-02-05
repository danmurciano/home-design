export default function statusColor(status) {
  switch(status) {
    case "In Stock":
      return (
        <div>
          <h5 style={{color: "#15d1a8"}}>In Stock & Ready to Ship</h5>
          <p class="product-small">Most orders placed before noon ET ship same day (except weekends and holidays).</p>
        </div>
      )
      break;
    case "Out of Stock":
      return (
        <div>
          <h5 style={{color: "#969696"}}>Currently Out of Stock</h5>
          <p class="product-small">Delivery times may be longer than usual.</p>
        </div>
      )
      break;
    case "Discontinued":
      return <h5 style={{color: "#969696"}}>Product is no longer available</h5>
      break;
  }
}
