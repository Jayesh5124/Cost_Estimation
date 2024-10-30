import mongoose, { Document, Schema } from 'mongoose';

export interface IConstructor extends Document {
  consid: number;
  name: string;
  email: string;
  password: string;
  estimations: Array<{
    value: number;
    description: string;
  }>;
}

const ConstSchema = new Schema({
  consid: { type: Number, required: false, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  estimations: [{
    value: { type: Number, required: true },
    description: { type: String, required: true }
  }]

});

export default mongoose.model<IConstructor>('Constructor', ConstSchema);
