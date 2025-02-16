import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  wallet: string;
  profileUrl: string;
  email: string;
  firstname: string;
  lastname: string
}

const userSchema: Schema<IUser> = new Schema({
  wallet: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
  email: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  }
}, { timestamps: true });

const Nft: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default Nft;
