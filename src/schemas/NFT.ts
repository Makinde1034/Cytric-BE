import mongoose, { Schema, Document, Model } from "mongoose";

interface INft extends Document {
  wallet: string;
  name: string;
  description: string;
  logoUrl: string;
  nftId: string;
}

const nftSchema: Schema<INft> = new Schema({
  wallet: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  nftId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Nft: Model<INft> = mongoose.model<INft>("Nft", nftSchema);

export default Nft;
