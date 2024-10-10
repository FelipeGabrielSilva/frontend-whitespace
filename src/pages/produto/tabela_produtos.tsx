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
  procurarTodosProdutos,
  removerProduto,
  atualizarProduto,
  criarProduto,
} from "../../service/produto_service";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  descricao: Yup.string().required("Descrição é obrigatória!"),
  preco: Yup.number()
    .positive("Preço deve ser um número positivo!")
    .required("Preço é obrigatório!"),
  quantidade: Yup.number()
    .integer("Quantidade deve ser um número inteiro!")
    .min(0, "Quantidade não pode ser negativa!")
    .required("Quantidade é obrigatória!"),
});

const TabelaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProduto, setSelectedProduto] = useState<any>(null);

  useEffect(() => {
    listarProdutos();
  }, []);

  const listarProdutos = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosProdutos();
      setProdutos(data);
    } catch (error: any) {
      console.error("Erro ao listar produtos:", error);
      notification.error({
        message: "Erro ao listar produtos",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removerProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
      notification.success({
        message: "Produto deletado com sucesso",
        description: "O produto foi removido com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);
      notification.error({
        message: "Erro ao deletar produto",
        description: error.message,
      });
    }
  };

  const handleEdit = (produto: any) => {
    setSelectedProduto(produto);
    setModalVisible(true);
  };

  const handleNewProduto = () => {
    setSelectedProduto(null);
    setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (selectedProduto) {
        await atualizarProduto(selectedProduto.id, values);
        setProdutos(
          produtos.map((p) =>
            p.id === selectedProduto.id ? { ...p, ...values } : p
          )
        );
        notification.success({
          message: "Produto atualizado com sucesso",
          description: "O produto foi atualizado com sucesso.",
        });
      } else {
        const newProduto = await criarProduto(values);
        setProdutos([...produtos, newProduto]);
        notification.success({
          message: "Produto criado com sucesso",
          description: "O novo produto foi criado com sucesso.",
        });
      }
      setModalVisible(false);
    } catch (error: any) {
      console.error("Erro ao atualizar ou criar produto:", error);
      notification.error({
        message: "Erro ao atualizar ou criar produto",
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
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Preço",
      dataIndex: "preco",
      key: "preco",
      render: (preco: number) => `R$ ${preco.toFixed(2)}`,
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
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
        <Title level={2}>Produtos</Title>
        <Button type="primary" onClick={handleNewProduto}>
          Novo Produto
        </Button>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={produtos} columns={columns} rowKey="id" />
      </div>

      <Modal
        title={selectedProduto ? "Editar Produto" : "Criar Produto"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedProduto(null);
        }}
        footer={null}
      >
        <Formik
          initialValues={{
            nome: selectedProduto ? selectedProduto.nome : "",
            descricao: selectedProduto ? selectedProduto.descricao : "",
            preco: selectedProduto ? selectedProduto.preco : "",
            quantidade: selectedProduto ? selectedProduto.quantidade : "",
            criadorId: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleModalOk}
        >
          {({ handleSubmit }) => (
            <FormikForm onSubmit={handleSubmit}>
              <Form.Item label="Nome" required>
                <Field name="nome">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="nome">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Descrição" required>
                <Field name="descricao">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="descricao">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Preço" required>
                <Field name="preco">
                  {({ field, form }: any) => <Input type="number" {...field} />}
                </Field>
                <ErrorMessage name="preco">
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
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {selectedProduto ? "Salvar" : "Criar"}
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default TabelaProdutos;
