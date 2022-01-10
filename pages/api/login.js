import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Product from "../../models/Product";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1) check to see if a user exists with the provided email
    const user = await User.findOne({ email }).select("+password");

    // 2) --if not, return error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }

    // 3) check to see if users' password matches the one in db
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // 4) --if so, generate a token. If admin, also generate admin token.
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
      let tokenAdmin;

      if (user.role === "admin") {
        tokenAdmin = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: "30d" });
      }

      // 5) send that token to the client
      const userRole = user.role;
      res.status(200).json({token, tokenAdmin, userRole});
    } else {
      res.status(401).send("Passwords do not match");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};
