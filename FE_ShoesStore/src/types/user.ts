export type user = {
  id?: string;
  email: string;
  isGoogle?: boolean;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  birthday?: string;
  gender?: string;
  avatarUrl?: string;
};

export type userPassword = {
  oldPassword: string;
  newPassword: string;
};

export type IUserState = {
  isLoading: boolean;
  error: Error | string | null;
  userProfile?: user | null;
};
