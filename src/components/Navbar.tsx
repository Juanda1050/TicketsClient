import React, { useState } from "react";
import { Dropdown, Button, message, Modal, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    message.info("Sesión cerrada exitosamente");
  };

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleLogoutConfirmed = () => {
    handleLogout();
    setLogoutModalVisible(false);
  };

  const handleLogoutCancelled = () => {
    setLogoutModalVisible(false);
  };

  const items: MenuProps["items"] = [
    {
      label: "Cerrar sesión",
      key: "1",
      icon: <LogoutOutlined />,
      onClick: showLogoutModal,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001529",
        color: "#fff",
        padding: "10px 20px",
      }}
    >
      <div style={{ fontSize: "1.2rem" }}>CRUD Recibos</div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" style={{ color: "#fff" }}>
          <UserOutlined /> Usuario
        </Button>
      </Dropdown>
      <Modal
        title="Cerrar sesión"
        open={logoutModalVisible}
        onOk={handleLogoutConfirmed}
        onCancel={handleLogoutCancelled}
        okText="Sí"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
      </Modal>
    </div>
  );
};

export default Navbar;
