import Product from "../../models/Product";
import Cart from "../../models/Cart";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
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
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}


async function handlePostRequest(req, res) {
  if (!req.body.headers.Authorization) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.body.headers.Authorization,
      process.env.JWT_SECRET_ADMIN
    );

    const { name, price, category, shortDesc, description, status, mediaUrl } = req.body.params;

    if (!name || !price || !category || !shortDesc || !description || !status || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }

    const product = await new Product({
      name, price, category, shortDesc, description, status, mediaUrl
    }).save();
    res.status(203).send("product created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
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

    let { _id, name, price, category, shortDesc, description, status, mediaUrl } = req.body.params;

    if (!name || !price || !category || !shortDesc || !description || !status || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }

    const product = await Product.findOneAndUpdate({ _id: _id }, { name, price, category, shortDesc, description, status, mediaUrl });
    await Cart.updateMany({ "products.product": _id }, { $set: { "products.$.price": price } });
    res.status(203).send("product updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in updating product");
  }
}
