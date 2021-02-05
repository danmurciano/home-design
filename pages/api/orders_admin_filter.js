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

    let { page, size, search, statusFilter, sortBy, ascending } = req.query;
    const regExp = new RegExp(".*" + search + ".*", "i")

    const sortKey = sortBy + ascending.toString();
    let sortMethod;


    let statusInclude;

    switch(statusFilter) {
      case "0":
      statusInclude = ["Being Processed", "In Transit", "Delivered", "Canceled"];
      break;
      case "1":
      statusInclude = ["Being Processed"];
      break;
      case "2":
      statusInclude = ["In Transit"];
      break;
      case "3":
      statusInclude = ["Delivered"];
      break;
      case "4":
      statusInclude = ["Canceled"];
      break;
    }

    switch(sortKey) {
      case "datePlacedtrue":
        sortMethod = { datePlaced: 1 };
        break;
      case "datePlacedfalse":
        sortMethod = { datePlaced: -1 };
        break;
      case "dateShippedtrue":
        sortMethod = { dateShipped: 1 };
        break;
      case "dateShippedfalse":
        sortMethod = { dateShipped: -1 };
        break;
      case "dateDeliveredtrue":
        sortMethod = { dateDelivered: 1 };
        break;
      case "dateDeliveredfalse":
        sortMethod = { dateDelivered: -1 };
        break;
    }


    let orders = [];
    orders = await Order.find({
      $or: [ {_id: { $regex: regExp}}, {email: { $regex: regExp}} ],
      status: { $in: statusInclude }
    }).sort(sortMethod)
    .populate({
      path: "products.product",
      model: "Product"
    });

    const pageNum = Number(page);
    const pageSize = 15
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / pageSize);
    const skips = pageSize * (pageNum - 1);

    if (pageNum === 1) {
      orders = orders.slice(0, pageSize);
    } else {
      orders = orders.slice(skips, skips + pageSize);;
    };

    res.status(200).json({ orders, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting orders");
  }
};
