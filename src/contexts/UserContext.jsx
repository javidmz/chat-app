import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState();
  // const [userInfo, setUserInfo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: "javid",
    name: "Javid",
    surname: "Mammadzada",
  });

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
