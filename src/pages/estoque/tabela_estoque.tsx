import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, notification } from "antd";
import { procurarTodosEstoque } from "../../service/movimentacao_estoque_service";

const { Title } = Typography;

const TabelaEstoque: React.FC = () => {
  const [estoques, setEstoques] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listarEstoque();
  }, []);

  const listarEstoque = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosEstoque();
      setEstoques(data);
    } catch (error: any) {
      console.error("Erro ao listar estoque:", error);
      notification.error({
        message: "Erro ao listar estoque",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Produto Id",
      dataIndex: "produtoId",
      key: "produtoId",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Data de Movimentação",
      dataIndex: "dataMovimentacao",
      key: "dataMovimentacao",
    },
    {
      title: "Observação",
      dataIndex: "observacao",
      key: "observacao",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 10%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Estoque</Title>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={estoques} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default TabelaEstoque;
