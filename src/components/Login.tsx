import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TitleCard from "./TitleCard";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    setLoading(true);
    // Aquí puedes manejar la lógica de inicio de sesión, como enviar una solicitud al servidor
    // Una vez que el inicio de sesión sea exitoso, puedes redirigir al usuario a otra página
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Solo una carga falsa, reemplaza esto con tu lógica de inicio de sesión real
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "50vh", minWidth: "45vh" }}
    >
      <Col span={6}>
        <Card title={<TitleCard />} style={{ textAlign: "center" }}>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              label="Usuario"
              name="username"
              rules={[
                { required: true, message: "Por favor ingresa tu usuario" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Usuario" />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Contraseña"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Acceder
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
