import { Position } from '@/interfaces/positions.interface';
import { model, Schema, Document } from 'mongoose';

const PositionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    departmentID: {
      type: String,
      required: true,
      ref: 'Department',
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

export const PositionModel = model<Position & Document>('Position', PositionSchema);
