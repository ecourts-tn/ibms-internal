import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    if(parseInt(user.user.user_type) === 8){
      navigate("/court/dashboard")
    }else if(parseInt(user.user.user_type) === 4){
      navigate("/prison/dashboard")
    }else if(parseInt(user.user.user_type) === 5){
      navigate("/police/dashboard")
    }else if(parseInt(user.user.user_type) === 3){
      navigate("/prosecution/dashboard")
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};