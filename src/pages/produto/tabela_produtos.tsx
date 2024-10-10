import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import {
  procurarTodosProdutos,
  removerProduto,
  atualizarProduto,
  criarProduto,
} from "../../service/produto_service";
import { procurarTodosCategorias } from "../../service/categoria_service";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;
const { Option } = Select; // Adicione o Option do Select

const validationSchema = Yup.object().shape({
  unMedida: Yup.string().required("Unidade de medida é obrigatória!"),
  valorUn: Yup.number()
    .required("Valor unitário é obrigatório!")
    .positive("O valor deve ser positivo!"),
  categoriaId: Yup.number()
    .required("ID da categoria é obrigatório!")
    .positive("O ID da categoria deve ser positivo!"),
  quantidade: Yup.number()
    .required("Quantidade é obrigatória!")
    .min(0, "A quantidade não pode ser negativa!"),
  criadorId: Yup.number()
    .required("ID do criador é obrigatório!")
    .positive("O ID do criador deve ser positivo!"),
});

const TabelaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]); // Estado para categorias
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProduto, setSelectedProduto] = useState<any>(null);

  useEffect(() => {
    listarProdutos();
    listarCategorias(); // Chamada para listar categorias
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

  const listarCategorias = async () => {
    try {
      const data = await procurarTodosCategorias();
      setCategorias(data);
    } catch (error: any) {
      console.error("Erro ao listar categorias:", error);
      notification.error({
        message: "Erro ao listar categorias",
        description: "Alguma coisa deu errado, tente novamente.",
      });
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
    const data = {
      descricao: values.descricao,
      quantidade: values.quantidade,
      unMedida: values.unMedida,
      valorUn: values.valorUn,
      criadorId: values.criadorId,
      categoriaId: parseInt(values.categoriaId),
    };

    try {
      if (selectedProduto) {
        await atualizarProduto(selectedProduto.id, data);
        setProdutos(
          produtos.map((p) =>
            p.id === selectedProduto.id ? { ...p, ...data } : p
          )
        );
        notification.success({
          message: "Produto atualizado com sucesso",
          description: "O produto foi atualizado com sucesso.",
        });
      } else {
        const newProduto = await criarProduto(data);
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
      title: "Unidade de Medida",
      dataIndex: "unMedida",
      key: "unMedida",
    },
    {
      title: "Valor Unitário",
      dataIndex: "valorUn",
      key: "valorUn",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Categoria",
      dataIndex: "categoriaId",
      key: "categoriaId",
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
            descricao: selectedProduto ? selectedProduto.descricao : "",
            unMedida: selectedProduto ? selectedProduto.unMedida : "",
            valorUn: selectedProduto ? selectedProduto.valorUn : "",
            quantidade: selectedProduto ? selectedProduto.quantidade : "",
            categoriaId: selectedProduto ? selectedProduto.categoriaId : "",
            criadorId: 1, // Adicione este campo conforme necessário
          }}
          validationSchema={validationSchema}
          onSubmit={handleModalOk}
        >
          {({ handleSubmit }) => (
            <FormikForm onSubmit={handleSubmit}>
              <Form.Item label="Descrição">
                <Field name="descricao">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="descricao">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Unidade de Medida" required>
                <Field name="unMedida">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="unMedida">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Valor Unitário" required>
                <Field name="valorUn">
                  {({ field, form }: any) => (
                    <Input type="number" step="0.01" {...field} />
                  )}
                </Field>
                <ErrorMessage name="valorUn">
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
              <Form.Item label="Categoria" required>
                <Field name="categoriaId">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      placeholder="Selecione uma categoria"
                      onChange={(value) =>
                        form.setFieldValue("categoriaId", value)
                      }
                    >
                      {categorias.map((categoria) => (
                        <Option key={categoria.id} value={categoria.descricao}>
                          {categoria.descricao}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage name="categoriaId">
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
