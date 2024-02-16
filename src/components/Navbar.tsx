import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu mode="horizontal" theme="dark" style={{ backgroundColor: '#001529', borderBottom: 'none' }}>
      <Menu.Item key="appname" style={{ color: '#fff', fontSize: '1.2rem', flex: 1 }}>
        CRUD Recibos
      </Menu.Item>
      <Menu.Item key="user" style={{ flex: 0 }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="text" style={{ color: '#fff' }}>
            <UserOutlined /> Usuario
          </Button>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
