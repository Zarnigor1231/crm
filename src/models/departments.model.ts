import { Department } from '@/interfaces/departments.interface';
import { model, Schema, Document } from 'mongoose';

const DepartmentSchema: Schema = new Schema(
  {
    center: {
      type: String,
      required: true,
      ref: 'Center',
    },
    name: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const DepartmentModel = model<Department & Document>('Department', DepartmentSchema);
