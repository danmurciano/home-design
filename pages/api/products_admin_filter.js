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

    let { search, minValue, maxValue, statusFilter, category, sortBy, ascending, page } = req.query;
    const regExp = new RegExp(".*" + search + ".*", "i")

    let statusInclude;
    switch(statusFilter) {
      case "0":
      statusInclude = ["In Stock", "Out of Stock"];
      break;
      case "1":
      statusInclude = ["In Stock"];
      break;
      case "2":
      statusInclude = ["Out of Stock"];
      break;
      case "3":
      statusInclude = ["Discontinued"];
      break;
      case "4":
      statusInclude = ["In Stock", "Out of Stock", "Discontinued"];
      break;
    }


    let categoryInclude;
    switch(category) {
      case "0":
      categoryInclude = ["Living Room", "Bedroom", "Lighting", "Textiles & Rugs",  "Other"];
      break;
      case "1":
      categoryInclude = ["Living Room"];
      break;
      case "2":
      categoryInclude = ["Bedroom"];
      break;
      case "3":
      categoryInclude = ["Lighting"];
      break;
      case "4":
      categoryInclude = ["Textiles & Rugs"];
      break;
    }


    const sortKey = sortBy + ascending.toString();
    let sortMethod;
    switch(sortKey) {
      case "nametrue":
        sortMethod = { name: 1 };
        break;
      case "namefalse":
        sortMethod = { name: -1 };
        break;
      case "pricetrue":
        sortMethod = { price: 1 };
        break;
      case "pricefalse":
        sortMethod = { price: -1 };
        break;
      case "categorytrue":
        sortMethod = { category: 1 };
        break;
      case "categoryfalse":
        sortMethod = { category: -1 };
        break;
    }

    if (minValue === "") {
      minValue = 0;
    }
    if (maxValue === "") {
      maxValue = 100000;
    }


    let products = [];
    products = await Product.find({
      $or: [ {name: { $regex: regExp}}, {shortDesc: { $regex: regExp}}, {sku: { $regex: regExp}} ],
      price: { $gte: minValue , $lte: maxValue },
      status: { $in: statusInclude },
      category: { $in: categoryInclude }
    }).sort( sortMethod );

    const pageNum = Number(page);
    const pageSize = 15
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / pageSize);
    const skips = pageSize * (pageNum - 1);

    if (pageNum === 1) {
      products = products.slice(0, pageSize);
    } else {
      products = products.slice(skips, skips + pageSize);;
    };

    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting products");
  }
};
