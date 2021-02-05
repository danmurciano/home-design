import mongoose from "mongoose";
const { ObjectId, String, Number, Date } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true
    },
    user: {
      type: ObjectId,
      ref: "User"
    },
    email: {
      type: String,
      required: true
    },
    shipTo: {
      type: String,
      required: true
    },

    products: [
      {
        quantity: {
          type: Number,
          default: 1
        },
        price: {
          type: Number,
          ref: "Product"
        },
        product: {
          type: ObjectId,
          ref: "Product"
        }
      }
    ],

    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "Being Processed",
      enum: ["Being Processed", "In Transit", "Delivered"]
    },
    datePlaced: {
      type: Date,
      required: true,
    },
    dateShipped: {
      type: Date,
    },
    dateDelivered: {
      type: Date,
    },
  },
  {
    timestamps:true
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
