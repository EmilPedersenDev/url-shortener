import { Schema, model, Document } from 'mongoose';

export interface UrlKey extends Document {
  hash: string;
  used: boolean;
  createdAt: Date;
}

const KeySchema = new Schema<UrlKey>(
  {
    hash: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

export const UrlKey = model<UrlKey>('UrlKey', KeySchema);
