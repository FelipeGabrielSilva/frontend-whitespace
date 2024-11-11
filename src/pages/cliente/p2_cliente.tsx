import React from "react";
import { Form, Input, Button, Typography, Flex } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { criarCliente } from "../../service/cliente_service"; // Mude para o serviço correto
import { Conteudo } from "../../components/Content";

const { Title } = Typography;

// Esquema de validação com Yup para os campos do formulário
const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  cnpjCpf: Yup.string()
    .matches(/^\d{11}|\d{14}$/, "Deve ser um CPF ou CNPJ válido")
    .required("CNPJ/CPF é obrigatório"),
  endereco: Yup.string().required("Endereço é obrigatório"),
  telefone: Yup.string().required("Telefone é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  criadorId: Yup.number().required("Criador ID é obrigatório"),
});

const CadastroCliente: React.FC = () => {
  const handleSubmit = async (values: any) => {
    try {
      await criarCliente(values); // Chama a função do serviço para criar cliente
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error);
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
        <Title level={2}>Cadastro de Cliente</Title>

        <Formik
          initialValues={{
            nome: "",
            cnpjCpf: "",
            endereco: "",
            telefone: "",
            email: "",
            criadorId: 1, // Valor padrão do criadorId
          }}
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

              <Form.Item
                label="CNPJ/CPF"
                validateStatus={
                  touched.cnpjCpf && errors.cnpjCpf ? "error" : ""
                }
                help={touched.cnpjCpf && errors.cnpjCpf ? errors.cnpjCpf : ""}
              >
                <Input
                  name="cnpjCpf"
                  value={values.cnpjCpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Endereço"
                validateStatus={
                  touched.endereco && errors.endereco ? "error" : ""
                }
                help={
                  touched.endereco && errors.endereco ? errors.endereco : ""
                }
              >
                <Input
                  name="endereco"
                  value={values.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

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

              <Form.Item
                label="Email"
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              {/* Campo escondido para criadorId */}
              <Input type="hidden" name="criadorId" value={values.criadorId} />

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

export default CadastroCliente;
