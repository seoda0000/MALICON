export type UserType = {
  id: number | null;
  userId: string;
  nickName: string;
  email: string;
  phoneNumber: string | null;
  avatar: string | null;
  lightStick: string | null;
  aboutMe?: string;
  // accessToken: string;
  // refreshToken: string;
  isLoggedIn: boolean;
};

