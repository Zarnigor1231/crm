import { Income } from '@/interfaces/incomes.interface';
import { model, Schema, Document } from 'mongoose';

const IncomesSchema: Schema = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const IncomesModel = model<Income & Document>('Incomes', IncomesSchema);
