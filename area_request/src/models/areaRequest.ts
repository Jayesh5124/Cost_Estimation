// models/areaRequest.ts

import { Schema, model } from 'mongoose';


export interface IAreaRequest extends Document {
    user_id: number;
    city: string;
    state: string;
    builtup_area: number; 
    property_name: string; 
}
const AreaRequestSchema: Schema = new Schema({
    user_id: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    builtup_area: { type: Number, required: true },
    property_name: { type: String, required: true },
}, { timestamps: true }); // This will automatically create createdAt and updatedAt fields

export default model<IAreaRequest>('AreaRequest', AreaRequestSchema);
