import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtect({ children }) {
  const isAdminLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);
  // const token = useSelector((state)=> state.admin.token)



  if (!isAdminLoggedIn ) {
    return <Navigate to="/admin/login" replace />;
  }
  

  return children;
}

 


function AdminLoginProtect({ children }) {
  const isAdminLoggedIn = useSelector((state) => state.admin.AdminLoggedIn);
  // const token = useSelector((state)=> state.admin.token)




  if (isAdminLoggedIn ) {
    return <Navigate to="/admin/home" replace />;
  }
  

  return children;
}

export {AdminProtect,AdminLoginProtect} 
