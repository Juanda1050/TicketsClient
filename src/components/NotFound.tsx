import { Result, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const NotFound = () => {
  const { token } = useAuth();

  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="No tienes permiso para acceder a esta página."
      extra={
        token ? (
          <Link to="/home">
            <Button type="primary">Volver al inicio</Button>
          </Link>
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default NotFound;
