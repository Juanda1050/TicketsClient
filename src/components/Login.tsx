import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "./context/AuthProvider";
import { ILogin } from "../model/User";
import { loginUser } from "../api/user";
import { useNavigate } from "react-router-dom";

const { Text, Title, Link } = Typography;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: ILogin) => {
    try {
      const response = await loginUser(values);
      if (response.token !== "") {
        login(response.token, response.usuarioId);
        navigate("/home");
      } else {
        message.error("El usuario no existe.");
      }
    } catch (error) {
      message.error(
        "Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Card style={{ width: "90%", maxWidth: "400px" }}>
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <Title>Iniciar sesión</Title>
          <Text>
            ¡Bienvenido de nuevo a Tickets API! Por favor, ingresa los detalles
            a continuación para iniciar sesión.
          </Text>
        </div>
        <Form<ILogin>
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
          autoComplete="off"
        >
          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu usuario!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Usuario" />
          </Form.Item>
          <Form.Item
            name="contraseña"
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu contraseña!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button block type="primary" htmlType="submit">
              Acceder
            </Button>
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <Text>¿Aún no tienes cuenta?</Text>{" "}
              <Button type="link" onClick={() => navigate("/register")}>
                Registrarse
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

export default Login;
