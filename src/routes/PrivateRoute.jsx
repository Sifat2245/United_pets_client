import { use, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../context/ModalProvider";
import { Navigate, useLocation } from "react-router";
import Lottie from "lottie-react";
import loader from '../../public/loader.json'

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { openLoginModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      openLoginModal();
    }
  }, [loading, user, openLoginModal]);

   if(loading){
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <div className='w-52'>
                    <Lottie animationData={loader} loop={true}></Lottie>
                </div>
            </div>
        )
    }

  if (!user) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;
