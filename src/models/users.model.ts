import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { UserGender, UserOrTeacher } from '@/shared/user_gender';

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: UserGender,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: UserOrTeacher,
      default: UserOrTeacher.USER,
    },
    come_date: {
      type: String,
      required: true,
    },
    left_date: {
      type: String,
      required: true,
    },
    groupID: {
      type: String,
      required: true,
      ref: 'Group',
    },
    positionID: {
      type: String,
      required: true,
      ref: 'Position',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = model<User & Document>('User', UserSchema);
