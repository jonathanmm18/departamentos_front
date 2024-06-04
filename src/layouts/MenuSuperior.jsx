import React from 'react';
import { Layout, Menu, Dropdown, Space, Badge } from 'antd';
import { UserOutlined, BellOutlined, QuestionCircleOutlined, GiftOutlined, DownOutlined } from '@ant-design/icons';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Header } = Layout;

const UserMenu = (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Logout</Menu.Item>
  </Menu>
);

const MenuSuperior = () => {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' ,backgroundColor:'#1890FF',}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 0 }}>
          <img src="./img/logo.jpg" alt="Logo" style={{ height: 100, margin: 0 , padding:0 }} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} style={{ flex: 1, display: 'flex', justifyContent: 'center' , backgroundColor:'#1890FF', color:'#ffffff' }}>
          <Menu.Item key="1" style={{ color: '#ffffff', ':hover': { color: '#002766' } }}>Dashboard</Menu.Item>
          <Menu.Item key="2" style={{ color: '#ffffff', ':hover': { color: '#002766' } }}>Organizacion</Menu.Item>
          <Menu.Item key="3" style={{ color: '#ffffff', ':hover': { color: '#002766' } }}>Modelos</Menu.Item>
          <Menu.Item key="4" style={{ color: '#ffffff', ':hover': { color: '#002766' } }}>Seguimiento</Menu.Item>
        </Menu>

      </div>
      <Space size="large">
       
        <GiftOutlined style={{ fontSize: '24px', color: '#fff' }} />
        
       
        <QuestionCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
       
        <Badge count={0} showZero>
          <BellOutlined style={{ fontSize: '24px', color: '#fff' }} />
        </Badge>
        <Dropdown overlay={UserMenu}>
          <Space style={{ cursor: 'pointer', color: '#fff' }}>
            <UserOutlined style={{ fontSize: '24px' }} />
            <span>Juan Perez</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default MenuSuperior;
