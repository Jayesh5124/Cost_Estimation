
import { Schema, model, Document } from 'mongoose';

export interface IAreaRequest extends Document {
    user_email: string;
    user_name:string;
    city: string;
    state: string;
    builtup_area: number; 
    property_name: string; 
}

const AreaRequestSchema = new Schema<IAreaRequest>({
    user_email: { type: String, required: true },
    user_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    builtup_area: { type: Number, required: true },
    property_name: { type: String, required: true },
}, { timestamps: true });

export default model<IAreaRequest>('AreaRequest', AreaRequestSchema);
