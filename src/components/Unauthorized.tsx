import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Result
      status="403"
      title="Error 401"
      subTitle="Lo siento, no estás autorizado para acceder a esta página."
      extra={
        <Link to="/login">
          <Button type="primary">Regresar</Button>
        </Link>
      }
    />
  );
};

export default Unauthorized;
