import Order from "../../models/Order";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};


async function handleGetRequest(req, res) {
  try {
    const { _id } = req.query;
    const order = await Order.findOne({ _id })
    .populate({
      path: "products.product",
      model: "Product"
    });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
}


async function handlePutRequest(req, res) {
  if (!req.body.headers.Authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.body.headers.Authorization,
      process.env.JWT_SECRET_ADMIN
    );

    const { orderId, status } = req.body.params;
    const date = new Date();

    switch (status) {
      case "Being Processed":
        await Order.findOneAndUpdate({ _id: orderId }, { status: status, dateShipped: null, dateDelivered: null });
        break;
      case "In Transit":
        await Order.findOneAndUpdate({ _id: orderId }, { status: status, dateShipped: date, dateDelivered: null });
        break;
      case "Delivered":
        await Order.findOneAndUpdate({ _id: orderId }, { status: status, dateDelivered: date });
        break;
      case "Canceled":
        await Order.findOneAndUpdate({ _id: orderId }, { status: status });
        break;
    }
    res.status(203).send("Status updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in updating Order");
  }
}
