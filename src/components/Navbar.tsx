import React from "react";
import { Dropdown, Button, message, MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const handleMenuClick = (e: any) => {
    message.info("Cerrando sesión");
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Cerrar sesión",
      key: "1",
      icon: <LogoutOutlined />,
      onClick: handleMenuClick,
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
    </div>
  );
};

export default Navbar;
