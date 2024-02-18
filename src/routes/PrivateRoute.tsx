import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthProvider";
import Tickets from "../components/Tickets";

const PrivateRoute = () => {
  const { token } = useAuth();

  return token ? <Tickets /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
