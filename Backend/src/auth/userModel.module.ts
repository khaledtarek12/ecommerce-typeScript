import mongoose from "mongoose";
import { User } from "./user.interface";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, "the name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "the email is required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: { type: String },
    password: {
      type: String,
      required: [true, "the password is required"],
      trim: true,
      minlength: [6, "too short password"],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const setImageUrl = (doc: mongoose.Document & User) => {
  if (doc.profileImg) {
    const imageUrl = `${process.env.BASE_URL}/images/users/${doc.profileImg}`;
    doc.profileImg = imageUrl;
  }
};

userSchema.post("save", (doc) => setImageUrl(doc));
userSchema.post("init", (doc) => setImageUrl(doc));

const UserModel = mongoose.model<User>("user", userSchema);

export default UserModel;
