import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const token = useSelector((state) => state.auth.token);

    
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
const UserLoginProtect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const token = useSelector((state) => state.auth.token);


  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export { UserProtect,UserLoginProtect}