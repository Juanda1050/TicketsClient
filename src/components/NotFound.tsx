import { Result, Button } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const NotFound = () => {
  const { token } = useAuth();

  return (
    <Result
      status="403"
      title="403 Forbidden"
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
