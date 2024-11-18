import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Spin,
  Table,
  Typography,
} from "antd";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  atualizarCliente,
  procurarTodosClientes,
  removerCliente,
} from "../../service/cliente_service";
import aplicarMascaraTelefone from "../../mask/maskTelefone";
import PrivateButton from "../../components/PrivateButton";

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

  // Filtros de buscas
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [cnpjCpfFiltro, setCnpjCpfFiltro] = useState("");
  const [telefoneFiltro, setTelefoneFiltro] = useState("");
  const [emailFiltro, setEmailFiltro] = useState("");

  useEffect(() => {
    listarClientes();
  }, []);

  const listarClientes = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosClientes();
      // Aplicar filtros
      const filteredClientes = data.filter((cliente: any) => {
        return (
          (nomeFiltro === "" ||
            cliente.nome.toLowerCase().includes(nomeFiltro.toLowerCase())) &&
          (cnpjCpfFiltro === "" ||
            cliente.cnpjCpf
              .toLowerCase()
              .includes(cnpjCpfFiltro.toLowerCase())) &&
          (telefoneFiltro === "" ||
            cliente.telefone
              .toLowerCase()
              .includes(telefoneFiltro.toLowerCase())) &&
          (emailFiltro === "" ||
            cliente.email.toLowerCase().includes(emailFiltro.toLowerCase()))
        );
      });
      setClientes(filteredClientes);
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

  const handleUpdate = async (values: any) => {
    const data = {
      nome: values.nome,
      cnpjCpf: values.cnpjCpf,
      endereco: values.endereco,
      telefone: values.telefone,
      email: values.email,
    };

    try {
      await atualizarCliente(selectedCliente.id, data);

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === selectedCliente.id
            ? { ...cliente, ...values }
            : cliente
        )
      );

      setModalVisible(false);
      setSelectedCliente(null);

      notification.success({
        message: "Cliente atualizado com sucesso",
        description: "As informações do cliente foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      notification.error({
        message: "Erro ao atualizar cliente",
        description: "Não foi possível atualizar o cliente.",
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
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
      render: (telefone: string) => aplicarMascaraTelefone(telefone),
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
        <Title level={2}>Cliente</Title>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexDirection: "row",
          width: "100%",
          marginBottom: "16px",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <label htmlFor="Nome">Nome:</label>
        <Input
          placeholder="Nome"
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
        />

        <label htmlFor="CNPJ/CPF">CNPJ/CPF:</label>
        <Input
          placeholder="CNPJ/CPF com pontuação"
          value={cnpjCpfFiltro}
          onChange={(e) => setCnpjCpfFiltro(e.target.value)}
        />

        <label htmlFor="Telefone">Telefone:</label>
        <Input
          placeholder="Telefone"
          value={telefoneFiltro}
          onChange={(e) => setTelefoneFiltro(e.target.value)}
        />

        <label htmlFor="Email">Email:</label>
        <Input
          placeholder="Email"
          value={emailFiltro}
          onChange={(e) => setEmailFiltro(e.target.value)}
        />
        <Button type="primary" onClick={listarClientes}>
          Filtrar
        </Button>
      </div>

      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={clientes} columns={columns} rowKey="id" />
      </div>

      <Modal
        title="Editar cliente"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedCliente && (
          <Formik
            initialValues={selectedCliente}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                <Form.Item label="Nome">
                  <Field name="nome" as={Input} />
                  <ErrorMessage name="nome" />
                </Form.Item>

                <Form.Item label="CNPJ/CPF">
                  <Field name="cnpjCpf" as={Input} />
                  <ErrorMessage name="cnpjCpf" />
                </Form.Item>

                <Form.Item label="Endereço">
                  <Field name="endereco" as={Input} />
                  <ErrorMessage name="endereco" />
                </Form.Item>

                <Form.Item label="Telefone">
                  <Field name="telefone" as={Input} />
                  <ErrorMessage name="telefone" />
                </Form.Item>

                <Form.Item label="E-mail">
                  <Field name="email" as={Input} />
                  <ErrorMessage name="email" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  style={{ marginTop: "10px" }}
                >
                  Salvar
                </Button>
              </FormikForm>
            )}
          </Formik>
        )}
      </Modal>
    </div>
  );
};

export default TabelaClientes;
