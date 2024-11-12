import { Card, Col, Layout, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Conteudo } from "../components/Content";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Conteudo altura="90.8%">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Link to="tabela=categoria">
            <Card title="CATEGORIA" bordered={false}>
              Conteúdo da Página 1
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=cliente">
            <Card title="CLIENTE" bordered={false}>
              Conteúdo da Página 2
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=fornecedor">
            <Card title="FORNECEDOR" bordered={false}>
              Conteúdo da Página 3
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=pedido">
            <Card title="PEDIDO" bordered={false}>
              Conteúdo da Página 4
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=produto">
            <Card title="PRODUTO" bordered={false}>
              Conteúdo da Página 5
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=item&pedido">
            <Card title="ITENS DE PEDIDO" bordered={false}>
              Conteúdo da Página 6
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=estoque">
            <Card title="ESTOQUE" bordered={false}>
              Conteúdo da Página 6
            </Card>
          </Link>
        </Col>

        <Col span={8}>
          <Link to="tabela=usuarios">
            <Card title="USUÁRIO" bordered={false}>
              Conteúdo da Página 7
            </Card>
          </Link>
        </Col>
      </Row>
    </Conteudo>
  );
};

export default Home;
