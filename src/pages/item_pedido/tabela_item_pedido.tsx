import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Button, notification } from "antd";
import { procurarTodosItensPedidos } from "../../service/item_pedido";

const { Title } = Typography;

const TabelaPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    listarPedidos();
  }, []);

  const listarPedidos = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosItensPedidos();
      setPedidos(data);
    } catch (error: any) {
      console.error("Erro ao listar pedidos:", error);
      notification.error({
        message: "Erro ao listar pedidos",
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
      title: "Pedido ID",
      dataIndex: "pedidoId",
      key: "pedidoId",
    },
    {
      title: "Data do Pedido",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Valor Total",
      dataIndex: "valorTotal",
      key: "valorTotal",
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
        <Title level={2}>Pedidos</Title>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={pedidos} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default TabelaPedidos;
