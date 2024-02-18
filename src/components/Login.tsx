import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "./context/AuthProvider";

const { Text, Title, Link } = Typography;

const Login = () => {
  const { login } = useAuth();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
        <Form
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
                type: "email",
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
              <Link href="/register">Registrarse</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

export default Login;
