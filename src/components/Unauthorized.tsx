// Unauthorized.tsx
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Result
      status="403"
      title="401 Unauthorized"
      subTitle="Lo siento, no estás autorizado para acceder a esta página."
      extra={
        <Link to="/login">
          <Button type="primary">Iniciar sesión</Button>
        </Link>
      }
    />
  );
};

export default Unauthorized;
