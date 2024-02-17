import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title, Link } = Typography;

const Register = () => {
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
          <Title>Registrarse</Title>
          <Text>
            ¡Bienvenido a Tickets API! Por favor, ingresa los detalles
            a continuación para su registro.
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
              Registrarse
            </Button>
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <Text>¿Ya tienes cuenta?</Text>{" "}
              <Link href="">Iniciar sesión</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

export default Register;
