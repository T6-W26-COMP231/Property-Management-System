import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["Landlord", "Resident", "Contractor"],
      default: "Landlord",
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    profileImg: {
      type: String, // Cloudinary URL
      default: null,
    },
    addressInfo: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    profileDetails: {
      // Resident specific
      assignedProperty: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        default: null,
      },

      // Contractor specific
      jobType: {
        type: String,
        enum: [
          "Plumber",
          "Electrician",
          "HVAC Technician",
          "Carpenter",
          "Painter",
          "Roofer",
          "Landscaper",
          "General Handyman",
          "Pest Control",
          "Cleaner",
        ],
        default: null,
      },
      avgRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      jobHistory: [
        {
          type: Schema.Types.ObjectId,
          ref: "Maintenance",
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await hash(this.passwordHash, 10);
  next();
});

// Helper method to compare passwords at login
userSchema.methods.comparePassword = async function (plainPassword) {
  return compare(plainPassword, this.passwordHash);
};

export default model("User", userSchema);