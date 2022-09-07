import { createContext, FC, PropsWithChildren, useState } from "react";
import { IUser, UserContextType } from "../@types/user";

export const userContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<PropsWithChildren> = (props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <userContext.Provider value={{ user, isAuth, setIsAuth, setUser }}>
      {props.children}
    </userContext.Provider>
  );
};
