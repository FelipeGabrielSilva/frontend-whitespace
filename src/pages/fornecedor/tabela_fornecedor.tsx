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
  atualizarFornecedor,
  procurarTodosFornecedores,
  removerFornecedor,
} from "../../service/fornecedor_service";
import aplicarMascaraTelefone from "../../mask/maskTelefone";
import PrivateButton from "../../components/PrivateButton";

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

  // Filtros de buscas
  const [nomeFiltro, setNomeFiltro] = useState("");
  const [cnpjFiltro, setCnpjFiltro] = useState("");
  const [telefoneFiltro, setTelefoneFiltro] = useState("");
  const [emailFiltro, setEmailFiltro] = useState("");

  useEffect(() => {
    listarFornecedores();
  }, []);

  const listarFornecedores = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosFornecedores();
      const filteredData = data.filter((fornecedor: any) => {
        const nomeMatch =
          nomeFiltro === "" ||
          fornecedor.nome.toLowerCase().includes(nomeFiltro.toLowerCase());
        const cnpjMatch =
          cnpjFiltro === "" ||
          fornecedor.cnpj.toLowerCase().includes(cnpjFiltro.toLowerCase());
        const telefoneMatch =
          telefoneFiltro === "" ||
          fornecedor.telefone
            .toLowerCase()
            .includes(telefoneFiltro.toLowerCase());
        const emailMatch =
          emailFiltro === "" ||
          fornecedor.email.toLowerCase().includes(emailFiltro.toLowerCase());
        return nomeMatch && cnpjMatch && telefoneMatch && emailMatch;
      });
      setFornecedores(filteredData);
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

  const handleUpdate = async (values: any) => {
    const data = {
      nome: values.nome,
      cnpj: values.cnpj,
      telefone: values.telefone,
      email: values.email,
    };

    try {
      await atualizarFornecedor(selectedFornecedor.id, data);
      setFornecedores((prevFornecedores) =>
        prevFornecedores.map((fornecedor) =>
          fornecedor.id === selectedFornecedor.id
            ? { ...fornecedor, ...values }
            : fornecedor
        )
      );

      notification.success({
        message: "Fornecedor atualizado com sucesso",
        description:
          "As informações do fornecedor foram atualizadas com sucesso.",
      });

      setModalVisible(false);
      setSelectedFornecedor(null);
    } catch (error: any) {
      console.error("Erro ao atualizar fornecedor:", error);
      notification.error({
        message: "Erro ao atualizar fornecedor",
        description: "Não foi possível atualizar o fornecedor.",
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
      <div>
        <Title level={2}>Fornecedores</Title>
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
        <label htmlFor="nomeFiltro">Nome:</label>
        <Input
          id="nomeFiltro"
          value={nomeFiltro}
          onChange={(e) => setNomeFiltro(e.target.value)}
          placeholder="Filtro por nome"
        />

        <label htmlFor="cnpjFiltro">CNPJ:</label>
        <Input
          id="cnpjFiltro"
          value={cnpjFiltro}
          onChange={(e) => setCnpjFiltro(e.target.value)}
          placeholder="Filtro por CNPJ"
        />

        <label htmlFor="telefoneFiltro">Telefone:</label>
        <Input
          id="telefoneFiltro"
          value={telefoneFiltro}
          onChange={(e) => setTelefoneFiltro(e.target.value)}
          placeholder="Filtro por telefone"
        />

        <label htmlFor="emailFiltro">Email:</label>
        <Input
          id="emailFiltro"
          value={emailFiltro}
          onChange={(e) => setEmailFiltro(e.target.value)}
          placeholder="Filtro por email"
        />

        <Button type="primary" onClick={listarFornecedores}>
          Filtrar
        </Button>
      </div>

      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={fornecedores} columns={columns} rowKey="id" />
      </div>

      <Modal
        title="Editar Fornecedor"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedFornecedor && (
          <Formik
            initialValues={selectedFornecedor}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                <Form.Item label="Nome">
                  <Field name="nome" as={Input} />
                  <ErrorMessage name="nome" component="div" />
                </Form.Item>

                <Form.Item label="CNPJ">
                  <Field name="cnpj" as={Input} />
                  <ErrorMessage name="cnpj" component="div" />
                </Form.Item>

                <Form.Item label="Telefone">
                  <Field name="telefone" as={Input} />
                  <ErrorMessage name="telefone" component="div" />
                </Form.Item>

                <Form.Item label="E-mail">
                  <Field name="email" as={Input} />
                  <ErrorMessage name="email" component="div" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
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

export default TabelaFornecedores;
