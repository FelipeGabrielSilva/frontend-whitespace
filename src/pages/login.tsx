import { Button, Form, Input, Layout } from "antd";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import Fundo from '../assets/Element.png';
import { InterfaceLogin } from "../interface/interfaceLogin";
import { login } from "../service/auth_service";

const { Content } = Layout;

const validationLogin = yup.object().shape({
  email: yup.string().email().required("O e-mail é obrigatório"),
  senha: yup.string().required("A senha é obrigatória"),
});

export const Login: React.FC = () => {

  const handleSubmit = async (values: InterfaceLogin) => {
    await login(values);

    window.location.href = "/menu";
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
      <Content style={{ display: "flex", width: "40%", height: "100%", padding: "2.5%", alignItems: "center", justifyContent: "center", }}>
        <Formik
          initialValues={{
            email: "",
            senha: "",
          }}
          validationSchema={validationLogin}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched, values, handleChange, handleBlur }) => (
            <Form onFinish={handleSubmit} style={{ width: "100%", backgroundColor: "white", borderRadius: 12, padding: '24px' }}>

              <Form.Item
                label="E-mail"
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

              <Form.Item
                label="Senha"
                validateStatus={touched.senha && errors.senha ? "error" : ""}
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  margin: '0',
                }}
              >
                <p style={{
                  marginBottom: '16px',
                  color: 'black'
                }}>
                  Não tem conta?{" "}
                  <a
                    href="/cadastro"
                    style={{ color: "blue" }}
                  >
                    Registre-se
                  </a>
                </p>

                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Content>
    </Layout>
  );
};