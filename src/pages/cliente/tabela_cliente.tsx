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
  procurarTodosClientes,
  removerCliente,
  atualizarCliente,
  criarCliente,
} from "../../service/cliente_service";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório!"),
  cnpjCpf: Yup.string().required("CNPJ/CPF é obrigatório!"),
  endereco: Yup.string().required("Endereço é obrigatório!"),
  telefone: Yup.string().required("Telefone é obrigatório!"),
  email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
});

const TabelaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);

  useEffect(() => {
    listarClientes();
  }, []);

  const listarClientes = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosClientes();
      setClientes(data);
    } catch (error: any) {
      console.error("Erro ao listar clientes:", error);
      notification.error({
        message: "Erro ao listar clientes",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removerCliente(id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      notification.success({
        message: "Cliente deletado com sucesso",
        description: "O cliente foi removido com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar cliente:", error);
      notification.error({
        message: "Erro ao deletar cliente",
        description: error.message,
      });
    }
  };

  const handleEdit = (cliente: any) => {
    setSelectedCliente(cliente);
    setModalVisible(true);
  };

  const handleNewCliente = () => {
    setSelectedCliente(null);
    setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (selectedCliente) {
        await atualizarCliente(selectedCliente.id, values);
        setClientes(
          clientes.map((c) =>
            c.id === selectedCliente.id ? { ...c, ...values } : c
          )
        );
        notification.success({
          message: "Cliente atualizado com sucesso",
          description: "O cliente foi atualizado com sucesso.",
        });
      } else {
        const newCliente = await criarCliente(values);
        setClientes([...clientes, newCliente]);
        notification.success({
          message: "Cliente criado com sucesso",
          description: "O novo cliente foi criado com sucesso.",
        });
      }
      setModalVisible(false);
    } catch (error: any) {
      console.error("Erro ao atualizar ou criar cliente:", error);
      notification.error({
        message: "Erro ao atualizar ou criar cliente",
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
      title: "CNPJ/CPF",
      dataIndex: "cnpjCpf",
      key: "cnpjCpf",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
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
        <Title level={2}>Clientes</Title>
        <Button type="primary" onClick={handleNewCliente}>
          Novo cliente
        </Button>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={clientes} columns={columns} rowKey="id" />
      </div>

      <Modal
        title={selectedCliente ? "Editar Cliente" : "Criar Cliente"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedCliente(null);
        }}
        footer={null}
      >
        <Formik
          initialValues={{
            nome: selectedCliente ? selectedCliente.nome : "",
            cnpjCpf: selectedCliente ? selectedCliente.cnpjCpf : "",
            endereco: selectedCliente ? selectedCliente.endereco : "",
            telefone: selectedCliente ? selectedCliente.telefone : "",
            email: selectedCliente ? selectedCliente.email : "",
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
              <Form.Item label="CNPJ/CPF" required>
                <Field name="cnpjCpf">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="cnpjCpf">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item label="Endereço" required>
                <Field name="endereco">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="endereco">
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
                  {selectedCliente ? "Salvar" : "Criar"}
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default TabelaClientes;