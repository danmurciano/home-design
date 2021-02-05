import Product from "../../models/Product";
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
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);
    const sortMethod = { name: 1 };
    let products = [];

    products = await Product.find({ status: { $not: { $in: "Discontinued" } } })
    .sort(sortMethod)
    .limit(pageSize);

    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting products");
  }
};
