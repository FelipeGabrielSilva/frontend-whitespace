import {
  Button,
  Form,
  Modal,
  notification,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  atualizarPedido,
  procurarTodosPedidos,
  removerPedido,
} from "../../service/pedido_service";
import PrivateButton from "../../components/PrivateButton";

const { Title } = Typography;

enum StatusPedido {
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM ANDAMENTO",
  FINALIZADO = "FINALIZADO",
  CANCELADO = "CANCELADO",
}

const TabelaPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPedido, setSelectedPedido] = useState<any>(null);

  useEffect(() => {
    listarPedidos();
  }, []);

  const listarPedidos = async () => {
    setLoading(true);

    try {
      const data = await procurarTodosPedidos();
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

  const handleDelete = async (id: number) => {
    try {
      await removerPedido(id);
      setPedidos(pedidos.filter((pedido) => pedido.id !== id));
      notification.success({
        message: "Pedido deletado com sucesso",
        description: "O pedido foi removido com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar pedido:", error);
      notification.error({
        message: "Erro ao deletar pedido",
        description: error.message,
      });
    }
  };

  const handleEdit = (pedido: any) => {
    setSelectedPedido(pedido);
    setModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    try {
      await atualizarPedido(selectedPedido.id, values);
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === selectedPedido.id ? { ...pedido, ...values } : pedido
        )
      );
      notification.success({
        message: "Pedido atualizado com sucesso",
        description: "O pedido foi atualizado com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar pedido:", error);
      notification.error({
        message: "Erro ao atualizar pedido",
        description: error.message,
      });
    } finally {
      setModalVisible(false);
      setSelectedPedido(null);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Clientes",
      dataIndex: ["cliente", "nome"],
      key: "cliente",
    },
    {
      title: "Valor Total Produtos",
      dataIndex: "valorTotalPedido",
      key: "valorTotalPedido",
      render: (valorTotal: number) => {
        if (
          valorTotal === undefined ||
          valorTotal === null ||
          isNaN(valorTotal)
        ) {
          return "N/A";
        }
        return `R$ ${valorTotal.toFixed(2)}`;
      },
    },
    {
      title: "Data",
      dataIndex: "dataPedido",
      key: "dataPedido",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (record: any) => (
        <span>
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>

          <PrivateButton roles={["Admin"]}>
            <Button
              onClick={() => handleDelete(record.id)}
              style={{ background: "red", color: "white" }}
            >
              Deletar
            </Button>
          </PrivateButton>
        </span>
      ),
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
      <div style={{ border: "1px solid #cdcdcd", borderRadius: 8 }}>
        <Table dataSource={pedidos} columns={columns} rowKey="id" />
      </div>

      <Modal
        title="Editar Pedido"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{
            clienteNome: selectedPedido?.clienteNome,
            status: selectedPedido?.status,
          }}
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status é obrigatório!" }]}
          >
            <Select>
              {Object.values(StatusPedido).map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Atualizar
            </Button>
            <Button
              onClick={() => setModalVisible(false)}
              style={{ marginLeft: 8 }}
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TabelaPedidos;
