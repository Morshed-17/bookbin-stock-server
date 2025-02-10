import { Schema, model } from "mongoose";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      requierd: true,
    },
    sku: {
      type: String,
      requierd: true,
    },
    quantity: {
      type: Number,
      requierd: true,
    },
    price: {
      type: Number,
      requierd: true,
    },
    lastEditedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

ItemSchema.pre("save", async function (next) {
  if (!this.sku) {
    const words = this.name.toUpperCase().split(" ");
    const firstPart = words[0]?.substring(0, 2) || "BK";
    const secondPart = words[1]?.substring(0, 2) || firstPart; // First 2 letters of second word (or repeat first)
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    this.sku = `${firstPart}${secondPart}-${randomNumber}`;
  }
  next();
});

export const Item = model("Item", ItemSchema);
