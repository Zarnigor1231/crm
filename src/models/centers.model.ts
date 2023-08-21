import { Center } from '@/interfaces/centers.interface';
import { model, Schema, Document } from 'mongoose';

const CenterSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  work_date: {
    type: String,
    required: true,
  },
});

export const CenterModel = model<Center & Document>('Center', CenterSchema);
