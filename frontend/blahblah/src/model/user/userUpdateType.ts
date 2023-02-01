export type UserUpdateType = {
  id: number | null;
  userId: string;
  password?: string;
  nickName?: string;
  email?: string;
  phoneNumber?: string | null;
  avatar?: string | null;
  lightStick?: string | null;
};

