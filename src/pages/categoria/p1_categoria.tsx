import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { criarCategoria } from "../../service/categoria_service";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  descricao: Yup.string().required("Descrição é obrigatória"),
  criadorId: Yup.number().required("Criador ID é obrigatório"),
});

const CadastroCategoria: React.FC = () => {
  const handleSubmit = async (values: any) => {
    try {
      await criarCategoria(values);
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default CadastroCategoria;
