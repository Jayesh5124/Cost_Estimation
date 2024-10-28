// models/areaRequest.ts

import { Schema, model } from 'mongoose';


export interface IAreaRequest extends Document {
    user_id: number;
    city: string;
    state: string;
    builtup_area: number; // Changed to number for better type consistency
}
const AreaRequestSchema: Schema = new Schema({
    user_id: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    builtup_area: { type: Number, required: true },
}, { timestamps: true }); // This will automatically create createdAt and updatedAt fields

export default model<IAreaRequest>('AreaRequest', AreaRequestSchema);
