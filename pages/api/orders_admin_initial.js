import Order from "../../models/Order";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_ADMIN
    );

    const pageSize = 15;
    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / pageSize);
    const sortMethod = { datePlaced: -1 };
    let orders = [];

    orders = await Order.find()
    .sort(sortMethod)
    .limit(pageSize)
    .populate({ path: "products.product", model: "Product" });

    res.status(200).json({ orders, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting orders");
  }
};
