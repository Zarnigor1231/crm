import { Check } from '@/interfaces/checks.interface';
import { model, Schema, Document } from 'mongoose';

const CheckSchema: Schema = new Schema(
  {
    groupID: {
      type: String,
      required: true,
      ref: 'Group',
    },
    userID: {
      type: String,
      required: true,
      ref: 'User',
    },
    not_in_class: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const CheckModel = model<Check & Document>('Check', CheckSchema);
