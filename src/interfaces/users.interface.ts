import { UserGender } from '@/shared/user_gender';

export interface User {
  _id?: string;
  fullName: string;
  gender: UserGender;
  contact: string;
  email: string;
  come_date: string;
  left_date: string;
  groupID: string;
  positionID: string;
  isDelete: boolean;
}
