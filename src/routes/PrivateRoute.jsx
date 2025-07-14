import { use, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../context/ModalProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { openLoginModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      openLoginModal();
    }
  }, [loading, user, openLoginModal]);

  if (loading) return <span>Loading...</span>;

  if (!user) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;
