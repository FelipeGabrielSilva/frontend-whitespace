import React from "react";
import { Form, Input, Button, Typography, Flex } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { criarFornecedor } from "../../service/fornecedor_service"; // Ajuste o serviço para fornecedor
import { Conteudo } from "../../components/Content";

const { Title } = Typography;

// Validação com Yup
const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  cnpj: Yup.string()
    .required("CNPJ é obrigatório")
    .matches(/^\d+$/, "CNPJ deve conter apenas números"),
  telefone: Yup.string()
    .required("Telefone é obrigatório")
    .matches(/^\d+$/, "Telefone deve conter apenas números"),
  email: Yup.string().email("E-mail inválido").required("Email é obrigatório"),
  criadorId: Yup.number().required("Criador ID é obrigatório"),
});

const CadastroFornecedor: React.FC = () => {
  const handleSubmit = async (values: any) => {
    console.log("Valores enviados:", values); // Verifique os dados aqui
    try {
      await criarFornecedor(values); // Função para criar fornecedor
      alert("Fornecedor criado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar fornecedor:", error);
      alert(error.message);
    }
  };

  return (
    <Conteudo altura="90.8%">
      <Flex
        style={{
          width: "30%",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 12,
          padding: "24px",
        }}
      >
        <Title level={2}>Cadastro de Fornecedor</Title>

        <Formik
          initialValues={{
            nome: "",
            cnpj: "",
            telefone: "",
            email: "",
            criadorId: 1,
          }} // Ajuste os valores iniciais
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onFinish={handleSubmit}>
              {/* Nome */}
              <Form.Item
                label="Nome"
                validateStatus={touched.nome && errors.nome ? "error" : ""}
                help={touched.nome && errors.nome ? errors.nome : ""}
              >
                <Input
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* CNPJ */}
              <Form.Item
                label="CNPJ"
                validateStatus={touched.cnpj && errors.cnpj ? "error" : ""}
                help={touched.cnpj && errors.cnpj ? errors.cnpj : ""}
              >
                <Input
                  name="cnpj"
                  value={values.cnpj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Telefone */}
              <Form.Item
                label="Telefone"
                validateStatus={
                  touched.telefone && errors.telefone ? "error" : ""
                }
                help={
                  touched.telefone && errors.telefone ? errors.telefone : ""
                }
              >
                <Input
                  name="telefone"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Campo oculto para criadorId (ajuste se necessário) */}
              <input type="hidden" name="criadorId" value={values.criadorId} />

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Flex>
    </Conteudo>
  );
};

export default CadastroFornecedor;
