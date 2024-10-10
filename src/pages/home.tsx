// src/pages/Home.tsx
import { Card, Col, Layout, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: "50px" }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Link to="/tabela=categoria">
              <Card title="CATEGORIA" bordered={false}>
                Conteúdo da Página 1
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/tabela=cliente">
              <Card title="CLIENTE" bordered={false}>
                Conteúdo da Página 2
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/tabela=fornecedor">
              <Card title="FORNECEDOR" bordered={false}>
                Conteúdo da Página 3
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/tabela=pedido">
              <Card title="PEDIDO" bordered={false}>
                Conteúdo da Página 4
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/tabela=produto">
              <Card title="PRODUTO" bordered={false}>
                Conteúdo da Página 5
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/tabela=produto&fornecedores">
              <Card title="PRODUTO E FORNECEDORES" bordered={false}>
                Conteúdo da Página 6
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/tabela=movimentacao">
              <Card
                title="MOVIMENTAÇÃO ENTRE PRODUTOS E PEDIDOS"
                bordered={false}
              >
                Conteúdo da Página 6
              </Card>
            </Link>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
