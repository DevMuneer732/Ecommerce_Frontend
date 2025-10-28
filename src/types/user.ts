export type TUserStore = {
  isLoggedIn: boolean;
  token?: string;
  user: TUser | null;
  setUser: (user: TUser) => void;
  setIsLoggedIn: (status: boolean) => void;
};

export type TUser = {
  name: string;
  email: string;
  token: string;
};
