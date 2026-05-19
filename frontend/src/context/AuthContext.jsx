import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfoState] = useState(() => {
    const data = localStorage.getItem("userInfo");
    return data ? JSON.parse(data) : null;
  });

  // FIXED setter
  const setUserInfo = (data) => {
    setUserInfoState(data);

    if (data) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
    } else {
      localStorage.removeItem("userInfo");
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);