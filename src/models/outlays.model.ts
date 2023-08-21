import { Outlay } from '@/interfaces/outlays.interface';
import { model, Schema, Document } from 'mongoose';

const OutlaySchema: Schema = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const OutlayModel = model<Outlay & Document>('Outlay', OutlaySchema);
