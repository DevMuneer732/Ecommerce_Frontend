interface User {
  id: string;
  name: string;
  email: string;
  role:string;
}

export type TUserStore = {
  isLoggedIn: boolean;
  user: User | null;

  setUser: (user: User | null) => void;
  setIsLoggedIn: (status: boolean) => void;

  register: (values: any) => Promise<any>;
  login: (values: any) => Promise<any>;
  logout:()=>void
};