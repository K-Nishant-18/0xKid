import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["learner", "parent", "mentor"],
      default: "learner",
    },
    language: { type: String, enum: ["en", "hi", "bn", "etc"], default: "en" },
    linkedParentId: { type: String, default: null },
    preferences: {
      theme: { type: String, enum: ["dark", "light"], default: "dark" },
      fontSize: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium",
      },
      notifications: { type: Boolean, default: true },
    },

    // ⬇️ Add references here
    projectIdeas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectIdeas", // must match model name
      },
    ],
    conceptExplanations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concept", // must match model name
      },
    ],
    codeReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeReview", // you should define this model
      },
    ],

    otp: { type: String },
    otpExpiry: { type: Date },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPassWordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
