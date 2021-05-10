import { createContext, useState } from "react";
import localStorageService from "../services/localStorageService";

export const Context = createContext();

function ContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(localStorageService.getToken());
  const [user, setUser] = useState({});
  const [zone, setZone] = useState([]);
  const [zid, setZid] = useState(null);
  return (
    <Context.Provider
      value={{ isAuth, setIsAuth, user, setUser, zone, setZone, zid, setZid }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
