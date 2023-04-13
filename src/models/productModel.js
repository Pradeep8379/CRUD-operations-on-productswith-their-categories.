const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: ObjectId, ref: 'category' },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
