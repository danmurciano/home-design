import Product from "../../models/Product";
import Cart from "../../models/Cart";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  if (!req.body.headers.Authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.body.headers.Authorization,
      process.env.JWT_SECRET_ADMIN
    );

    const { _id } = req.body.params;

    const product = await Product.findOneAndUpdate({ _id: _id }, { status: "Discontinued" });
    await Cart.updateMany(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    );
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product");
  }
}
