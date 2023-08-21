import { Group } from '@/interfaces/groups.interface';
import { model, Schema, Document } from 'mongoose';

const GroupSchema: Schema = new Schema(
  {
    direction: {
      type: String,
      required: true,
      ref: 'Direction',
    },
    group_number: {
      type: String,
      required: true,
    },
    begin_end_date: {
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

export const GroupModel = model<Group & Document>('Group', GroupSchema);
