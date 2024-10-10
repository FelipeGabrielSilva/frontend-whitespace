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
import { atualizarFornecedor, criarFornecedor, procurarTodosFornecedores, removerFornecedor } from "../../service/fornecedor_service";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório!"),
  cnpj: Yup.string().required("CNPJ é obrigatório!"),
  telefone: Yup.string().required("Telefone é obrigatório!"),
  email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
});

const TabelaFornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<any>(null);

  useEffect(() => {
    listarFornecedores();
  }, []);

  const listarFornecedores = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosFornecedores();
      setFornecedores(data);
    } catch (error: any) {
      console.error("Erro ao listar fornecedores:", error);
      notification.error({
        message: "Erro ao listar fornecedores",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removerFornecedor(id);
      setFornecedores(
        fornecedores.filter((fornecedor) => fornecedor.id !== id)
      );
      notification.success({
        message: "Fornecedor deletado com sucesso",
        description: "O fornecedor foi removido com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar fornecedor:", error);
      notification.error({
        message: "Erro ao deletar fornecedor",
        description: error.message,
      });
    }
  };

  const handleEdit = (fornecedor: any) => {
    setSelectedFornecedor(fornecedor);
    setModalVisible(true);
  };

  const handleNewFornecedor = () => {
    setSelectedFornecedor(null);
    setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (selectedFornecedor) {
        await atualizarFornecedor(selectedFornecedor.id, values);
        setFornecedores(
          fornecedores.map((f) =>
            f.id === selectedFornecedor.id ? { ...f, ...values } : f
          )
        );
        notification.success({
          message: "Fornecedor atualizado com sucesso",
          description: "O fornecedor foi atualizado com sucesso.",
        });
      } else {
        const newFornecedor = await criarFornecedor(values);
        setFornecedores([...fornecedores, newFornecedor]);
        notification.success({
          message: "Fornecedor criado com sucesso",
          description: "O novo fornecedor foi criado com sucesso.",
        });
      }
      setModalVisible(false);
    } catch (error: any) {
      console.error("Erro ao atualizar ou criar fornecedor:", error);
      notification.error({
        message: "Erro ao atualizar ou criar fornecedor",
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
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Criado Em",
      dataIndex: "criadoEm",
      key: "criadoEm",
    },
    {
      title: "Atualizado Em",
      dataIndex: "atualizadoEm",
      key: "atualizadoEm",
    },
    {
      title: "Criador ID",
      dataIndex: "criadorId",
      key: "criadorId",
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
        <Title level={2}>Fornecedores</Title>
        <Button type="primary" onClick={handleNewFornecedor}>
          Novo fornecedor
        </Button>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={fornecedores} columns={columns} rowKey="id" />
      </div>

      <Modal
        title={selectedFornecedor ? "Editar Fornecedor" : "Criar Fornecedor"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedFornecedor(null);
        }}
        footer={null}
      >
        <Formik
          initialValues={{
            nome: selectedFornecedor ? selectedFornecedor.nome : "",
            cnpj: selectedFornecedor ? selectedFornecedor.cnpj : "",
            telefone: selectedFornecedor ? selectedFornecedor.telefone : "",
            email: selectedFornecedor ? selectedFornecedor.email : "",
            criadorId: 1
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
              <Form.Item label="CNPJ" required>
                <Field name="cnpj">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="cnpj">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Telefone" required>
                <Field name="telefone">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="telefone">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Email" required>
                <Field name="email">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {selectedFornecedor ? "Salvar" : "Criar"}
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default TabelaFornecedores;
