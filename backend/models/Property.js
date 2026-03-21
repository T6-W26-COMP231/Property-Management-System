import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    landlordId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Landlord ID is required"],
    },
    residentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    leaseDocumentUrl: {
      type: String,
      default: null,
    },
    leaseDocumentExpireDate: {
      type: Date,
      default: null,
    },
    rentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Overdue"],
      default: "Pending",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export default model("Property", propertySchema);