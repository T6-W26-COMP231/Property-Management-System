import { Schema, model } from "mongoose";

const maintenanceSchema = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property ID is required"],
    },
    residentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Resident ID is required"],
    },
    contractorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
      default: "Low",
    },
    mediaUrls: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Submitted", "Assigned", "In Progress", "Completed", "Closed"],
      default: "Submitted",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export default model("Maintenance", maintenanceSchema);