import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Header } = Layout;

export const Navbar: React.FC = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="/categoria">Categoria</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/page2">Cliente</Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/fornecedor">Fornecedor</Link>
        </Menu.Item>

        <Menu.Item key="5">
          <Link to="/pedido">Pedido</Link>
        </Menu.Item>

        <Menu.Item key="6">
          <Link to="/produto">Produto</Link>
        </Menu.Item>

        <Menu.Item key="7">
          <Link to="/produtos&fornecedores">Produto e Fornecedores</Link>
        </Menu.Item>

        <Menu.Item key="8">
          <Link to="/movimentacao">Movimentação</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};