import { Direction } from '@/interfaces/directions.interface';
import { model, Schema, Document } from 'mongoose';

const DirectionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
      ref: 'Department',
    },
    duration: {
      type: String,
      required: true,
    },
    word_date: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const DirectionModel = model<Direction & Document>('Direction', DirectionSchema);
