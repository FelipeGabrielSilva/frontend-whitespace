import { Card, Col, Layout, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Conteudo } from "../components/Content";

const Home: React.FC = () => {
  return (
    <Conteudo>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=categoria">
          <Card title="CATEGORIA" bordered={false}>
            Tabela com as informações de categorias
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=cliente">
          <Card title="CLIENTE" bordered={false}>
            Tabela com as informações os clientes
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=fornecedor">
          <Card title="FORNECEDOR" bordered={false}>
            Tabela com as informações dos fornecedores
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=pedido">
          <Card title="PEDIDO" bordered={false}>
            Tabela com as informações de pedidos
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=produto">
          <Card title="PRODUTO" bordered={false}>
            Tabela com as informações de produtos
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=item&pedido">
          <Card title="ITENS DE PEDIDO" bordered={false}>
            Tabela com as informações de produtos de cada pedido
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=estoque">
          <Card title="ESTOQUE" bordered={false}>
            Tabela com as informações de estoque
          </Card>
        </Link>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Link to="tabela=usuarios">
          <Card title="USUÁRIO" bordered={false}>
            Tabela com as informações de usuários
          </Card>
        </Link>
      </Col>
    </Conteudo>
  );
};

export default Home;
