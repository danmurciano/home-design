import mongoose from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    return;
  }
  // Use new database connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
