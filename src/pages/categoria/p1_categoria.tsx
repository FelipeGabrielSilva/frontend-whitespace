import React from "react";
import { Form, Input, Button, Typography, Flex, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { criarCategoria } from "../../service/categoria_service";
import { Conteudo } from "../../components/Content";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  descricao: Yup.string().required("Descrição é obrigatória"),
  criadorId: Yup.number().required("Criador ID é obrigatório"),
});

const CadastroCategoria: React.FC = () => {
  const handleSubmit = async (values: any) => {
    try {
      await criarCategoria(values);

      message.success("Categoria criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  return (
    <Conteudo>
      <Flex
        style={{
          width: "30%",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 12,
          padding: "24px",
        }}
      >
        <Title level={2}>Cadastro de Categoria</Title>

        <Formik
          initialValues={{ descricao: "", criadorId: 1 }}
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
                label="Descrição"
                style={{ color: "white" }}
                validateStatus={
                  touched.descricao && errors.descricao ? "error" : ""
                }
                help={
                  touched.descricao && errors.descricao ? errors.descricao : ""
                }
              >
                <Input
                  name="descricao"
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

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

export default CadastroCategoria;
