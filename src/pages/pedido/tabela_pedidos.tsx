import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import {
  atualizarPedido,
  criarPedido,
  procurarTodosPedidos,
  removerPedido,
} from "../../service/pedido_service";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  produtoId: Yup.number().required("Produto é obrigatório!"),
  quantidade: Yup.number()
    .integer("Quantidade deve ser um número inteiro!")
    .min(1, "Quantidade deve ser pelo menos 1!")
    .required("Quantidade é obrigatória!"),
  clienteNome: Yup.string().required("Nome do cliente é obrigatório!"),
});

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

  const handleNewPedido = () => {
    setSelectedPedido(null);
    setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (selectedPedido) {
        await atualizarPedido(selectedPedido.id, values);
        setPedidos(
          pedidos.map((p) =>
            p.id === selectedPedido.id ? { ...p, ...values } : p
          )
        );
        notification.success({
          message: "Pedido atualizado com sucesso",
          description: "O pedido foi atualizado com sucesso.",
        });
      } else {
        const newPedido = await criarPedido(values);
        setPedidos([...pedidos, newPedido]);
        notification.success({
          message: "Pedido criado com sucesso",
          description: "O novo pedido foi criado com sucesso.",
        });
      }
      setModalVisible(false);
    } catch (error: any) {
      console.error("Erro ao atualizar ou criar pedido:", error);
      notification.error({
        message: "Erro ao atualizar ou criar pedido",
        description: error.message,
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Produto ID",
      dataIndex: "produtoId",
      key: "produtoId",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Cliente",
      dataIndex: "clienteNome",
      key: "clienteNome",
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
          <Button
            onClick={() => handleDelete(record.id)}
            style={{ background: "red", color: "white" }}
          >
            Deletar
          </Button>
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
        <Button type="primary" onClick={handleNewPedido}>
          Novo Pedido
        </Button>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={pedidos} columns={columns} rowKey="id" />
      </div>

      <Modal
        title={selectedPedido ? "Editar Pedido" : "Criar Pedido"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedPedido(null);
        }}
        footer={null}
      >
        <Formik
          initialValues={{
            produtoId: selectedPedido ? selectedPedido.produtoId : "",
            quantidade: selectedPedido ? selectedPedido.quantidade : "",
            clienteNome: selectedPedido ? selectedPedido.clienteNome : "",
            criadorId: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleModalOk}
        >
          {({ handleSubmit }) => (
            <FormikForm onSubmit={handleSubmit}>
              <Form.Item label="Produto ID" required>
                <Field name="produtoId">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="produtoId">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Quantidade" required>
                <Field name="quantidade">
                  {({ field, form }: any) => <Input type="number" {...field} />}
                </Field>
                <ErrorMessage name="quantidade">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Nome do Cliente" required>
                <Field name="clienteNome">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="clienteNome">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {selectedPedido ? "Salvar" : "Criar"}
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default TabelaPedidos;
