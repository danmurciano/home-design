import Stripe from "stripe";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import User from "../../models/User";
import Order from "../../models/Order";
import { calculateCartTotal } from "../../utils/calculateCartTotal";
import connectDb from "../../utils/connectDb";

connectDb();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData, cartProducts } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOne({ user: userId });

    const { cartTotal, stripeTotal } = calculateCartTotal(cartProducts);

    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    });

    const isExistingCustomer = prevCustomer.data.length > 0;

    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      });
    }

    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: stripeTotal,
      receipt_email: paymentData.email,
      customer,
      description: `checkout | ${paymentData.email} | ${paymentData.id}`
    }, {
      idempotencyKey: uuidv4()
    });

    const user = await User.findOne({ _id: userId });
    const email = user.email;

    const date = new Date();
    const orderid = require('order-id')('mysecret');

    const order = await new Order({
      _id: orderid.generate(),
      user: userId,
      email: email,
      shipTo: paymentData.card.name,
      total: cartTotal,
      products: cartProducts,
      datePlaced: date
    }).save();

    await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $set: { products: [] } }
    );

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing charge")
  }
}
