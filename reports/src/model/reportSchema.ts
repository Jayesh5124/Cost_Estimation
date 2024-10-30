import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
    report_id: number;
    report_name: string;
    report_description: string;
    estimation_id: number;
    reports: string;
}

const ReportSchema: Schema = new Schema({
    report_id: { type: Number, required: true },
    report_name: { type: String, required: true },
    report_description: { type: String, required: true },
    estimation_id: { type: Number, required: true },
    reports: { type: String, required: false }, // Changed File to String to store file path
}); 

export default mongoose.model<IReport>('Report', ReportSchema);
