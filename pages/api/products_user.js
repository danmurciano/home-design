import Product from "../../models/Product";
import NextCors from 'nextjs-cors';
import connectDb from "../../utils/connectDb";
import baseUrl from "../../utils/baseUrl";


export default async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: "https://home-design-danmurciano.vercel.app",
    optionsSuccessStatus: 200,
   });


  connectDb();


  let { search, minValue, maxValue, sortBy, category, page } = req.query;

  if (!search) {
    search = "";
  }

  if (!minValue) {
    minValue = 0;
  }

  if (!maxValue) {
    maxValue = 100000;
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
    price: { $gte: minValue , $lte: maxValue },
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

  res.status(200).json({ products, totalPages, ju });
};
