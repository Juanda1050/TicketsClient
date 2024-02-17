import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../model/User";
import { registerUser } from "../api/user";

const { Text, Title, Link } = Typography;

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  //   const navigate = useNavigate();
  const errRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

  const handleSubmit = async (values: IRegister) => {
    const v1 = USER_REGEX.test(values.nombre);
    const v2 = PWD_REGEX.test(values.contraseña);

    if (!v1 || !v2) {
      message.error("Verifica las reglas de los campos.");
      return;
    }
    const response = await registerUser(values);

    if (!response.isError) {
      setUser("");
      setPassword("");
      setMatchPassword("");

      message.success(response.message);
    } else {
      message.error(response.message);
      errRef.current?.focus && errRef.current.focus();
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
          <Title>Registrarse</Title>
          <Text>
            ¡Bienvenido a Tickets API! Por favor, ingresa los detalles a
            continuación para su registro.
          </Text>
        </div>
        <Form<IRegister>
          name="normal_login"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu usuario!",
              },
              {
                pattern: USER_REGEX,
                message:
                  "El usuario debe comenzar con una letra y tener entre 4 y 24 caracteres. Solo se permiten letras, números, guiones bajos y guiones.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="contraseña"
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu contraseña!",
              },
              {
                pattern: PWD_REGEX,
                message:
                  "La contraseña debe tener entre 8 y 24 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="confirmar_contraseña"
            dependencies={["contraseña"]}
            rules={[
              {
                required: true,
                message: "¡Por favor confirma tu contraseña!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("contraseña") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas no coinciden")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirmar Contraseña"
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
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
