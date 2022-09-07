export interface IUser {
  username: string;
  email: string;
  bio: string;
  image: string;
}

export type UserContextType = {
  user: IUser | null;
  isAuth: boolean;
  setUser: (user: IUser) => void;
  setIsAuth: (isAuth: boolean) => void;
  //   updateTodo: (id: number) => void;
};
