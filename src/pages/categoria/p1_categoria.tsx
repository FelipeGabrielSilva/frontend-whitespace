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
    console.log("Valores enviados:", values); // Verifique os dados aqui
    try {
      await criarCategoria(values);
      alert("Categoria criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar categoria:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <Title level={2}>Cadastro de Categoria</Title>

      <Formik
        initialValues={{ descricao: "", criadorId: 1 }} // Valor inicial do criadorId
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
    </div>
  );
};

export default CadastroCategoria;
