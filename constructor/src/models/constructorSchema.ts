import mongoose, { Document, Schema } from 'mongoose';

export interface IEstimation {
  id: string;
  value: number;
  description: string;
  createdAt: Date;
}

export interface IConstructor extends Document {
  name: string;
  email: string;
  password: string;
  estimations: IEstimation[]; // Use an array of IEstimation
  createdAt: Date;
}

const estimationSchema: Schema<IEstimation> = new Schema(
  {
    id: { type: String, required: true },
    value: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ConstSchema: Schema<IConstructor> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estimations: {
      type: [estimationSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Constructor = mongoose.model<IConstructor>('Constructor', ConstSchema);

export default Constructor;
