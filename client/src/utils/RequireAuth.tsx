import { Navigate } from "react-router-dom";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}): any => {
  const newUser = localStorage.getItem("accessToken");

  if (newUser) return children;
  return <Navigate to="/signup" />;
};

export default RequireAuth;
