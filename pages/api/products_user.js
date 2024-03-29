import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";
import baseUrl from "../../utils/baseUrl";

connectDb();

export default async (req, res) => {

  let { search, minValue, maxValue, sortBy, category, page } = req.query;
  let minValueAdjust;
  let maxValueAdjust;

  if (!search) {
    search = "";
  }

  if (!minValue) {
    minValueAdjust = 0;
  } else {
    minValueAdjust = minValue;
  }

  if (!maxValue) {
    maxValueAdjust = 100000;
  } else {
    maxValueAdjust = maxValue;
  }

  if (!sortBy) {
    sortBy = "0";
  }

  if (!category) {
    category = "0";
  }

  if (!page) {
    page = "1";
  }

  const regExp = new RegExp(".*" + search + ".*", "i")


  let categoryInclude;
  switch(category) {
    case "0":
    categoryInclude = ["Living Room", "Bedroom", "Lighting", "Textiles & Rugs", "Other"];
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


  let sortMethod;
  switch(sortBy) {
    case "0":
      sortMethod = { name: 1 };
      break;
    case "1":
      sortMethod = { price: 1 };
      break;
    case "2":
      sortMethod = { price: -1 };
      break;
  }


  let products = [];
  products = await Product.find({
    $or: [ {name: { $regex: regExp}}, {shortDesc: { $regex: regExp}} ],
    price: { $gte: minValueAdjust , $lte: maxValueAdjust },
    status: { $not: { $in: "Discontinued" } },
    category: { $in: categoryInclude }
  }).sort( sortMethod );

  const pageNum = Number(page);
  const pageSize = 16
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (pageNum === 1) {
    products = products.slice(0, pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = products.slice(skips, skips + pageSize);;
  };

  res.status(200).json({ products, totalPages, search, minValue, maxValue, sortBy, category, page });
};
