import { Button, Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../service/auth_service";

const { Header } = Layout;

export const Navbar: React.FC = () => {
  
  const sair = () => {
    logout();
  };

  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Menu.Item
          key="1"
          style={{ display: "flex", alignItems: "center", height: "64px" }}
        >
          <Link to="/menu" style={{ display: "flex", height: "100%" }}>
            <img
              src="/img/white-space-logo.svg"
              alt="Logo"
              style={{ width: " 180px" }}
            />
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="categoria">Categoria</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="cliente">Cliente</Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="fornecedor">Fornecedor</Link>
        </Menu.Item>

        <Menu.Item key="5">
          <Link to="pedido">Pedido</Link>
        </Menu.Item>

        <Menu.Item key="6">
          <Link to="produto">Produto</Link>
        </Menu.Item>

        <Button
          onClick={sair}
          style={{
            marginLeft: "16px",
            background: "transparent",
            color: "white",
          }}
        >
          Logout
        </Button>
      </Menu>
    </Header>
  );
};
