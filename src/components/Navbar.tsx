import React from "react";
import { Menu, Dropdown, Button, message } from "antd";
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

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

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
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="text" style={{ color: "#fff" }}>
          <UserOutlined /> Usuario
        </Button>
      </Dropdown>
    </div>
  );
};

export default Navbar;
