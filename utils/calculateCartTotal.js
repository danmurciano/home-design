export function calculateCartTotal(products) {
  const total = products.reduce((acc, el) => {
    acc += el.quantity * el.price;
    return acc;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
}


export function calculateItemTotal(product) {
  const total =  product.quantity * product.price;
  const itemTotal = ((total * 100) / 100).toFixed(2)

  return itemTotal;
}


export function calculateCartItems(products) {
  const cartItems = products.reduce((acc, el) => {
    acc += el.quantity;
    return acc;
  }, 0);

  return cartItems;
}
