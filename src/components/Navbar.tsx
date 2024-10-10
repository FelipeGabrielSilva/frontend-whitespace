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
          <Link to="/page3">Fornecedor</Link>
        </Menu.Item>

        <Menu.Item key="5">
          <Link to="/page4">Pedido</Link>
        </Menu.Item>

        <Menu.Item key="6">
          <Link to="/page5">Produto</Link>
        </Menu.Item>

        <Menu.Item key="7">
          <Link to="/page6">Produto e Fornecedores</Link>
        </Menu.Item>

        <Menu.Item key="8">
          <Link to="/page7">Movimentação</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
