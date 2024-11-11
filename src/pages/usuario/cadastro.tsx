import { Button, Form, Input, Layout, message } from "antd";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import Fundo from '../../assets/Element.png';
import { criarUsuario } from "../../service/usuario_service";

const { Content } = Layout;

// Schema de validação atualizado
const validationSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup.string().email().required("O e-mail é obrigatório"),
  senha: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
  confirmarSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem ser iguais').required('Confirme a senha'),
});



export const Cadastro: React.FC = () => {

  const handleSubmit = async (values: any) => {
    try {
      const { confirmarSenha, ...dadosParaAPI } = values;

      const res = await criarUsuario(dadosParaAPI);

      if (res) {
        message.success("Conta criada com sucesso!");

        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);

      } else {
        message.error("Erro ao criar conta. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <Layout
      style={{
        backgroundImage: `url(${Fundo})`,
        backgroundColor: '#043873',
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content style={{ display: "flex", width: "40%", height: "100%", padding: "2.5%", alignItems: "center", justifyContent: "center" }}>
        <Formik
          initialValues={{ nome: "", email: "", senha: "", confirmarSenha: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched, values, handleChange, handleBlur }) => (
            <Form onFinish={handleSubmit} style={{ width: "100%", backgroundColor: "white", borderRadius: 12, padding: '24px' }}>

              <Form.Item
                label="Nome completo:" validateStatus={touched.nome && errors.nome ? "error" : ""}
                help={touched.nome && errors.nome ? errors.nome : ""}
                name="nome"
              >
                <Input
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="E-mail:" validateStatus={touched.email && errors.email ? "error" : ""}
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

              <Form.Item
                label="Senha:" validateStatus={touched.senha && errors.senha ? "error" : ""}
                help={touched.senha && errors.senha ? errors.senha : ""}
              >
                <Input.Password
                  name="senha"
                  type="password"
                  value={values.senha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Confirmar senha:" validateStatus={touched.confirmarSenha && errors.confirmarSenha ? "error" : ""}
                help={touched.confirmarSenha && errors.confirmarSenha ? errors.confirmarSenha : ""}
              >
                <Input.Password
                  name="confirmarSenha"
                  type="password"
                  value={values.confirmarSenha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Content>
    </Layout>
  );
};