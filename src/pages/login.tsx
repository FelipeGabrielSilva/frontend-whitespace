import { Button, Form, Input, Layout } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

const { Content } = Layout;

const validationLogin = yup.object().shape({
  email: yup.string().email().required("O e-mail é obrigatório"),
  senha: yup.string().required("A senha é obrigatória"),
});

interface Login {
  email: string;
  senha: string;
}

export const Login: React.FC = () => {
  const [login, setLodin] = useState<Login>({
    email: "",
    senha: "",
  });

  const handleSubmit = async () => {
    console.log(values);
  };

  return (
    <Layout
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Content style={{ width: "30%", padding: "2.5%" }}>
        <Formik
          initialValues={{
            email: "",
            senha: "",
          }}
          validationSchema={validationLogin}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Form.Item
                label="E-mail"
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input name="email" />
              </Form.Item>

              <Form.Item
                label="senha"
                validateStatus={touched.senha && errors.senha ? "error" : ""}
                help={touched.senha && errors.senha ? errors.senha : ""}
              >
                <Input.Password name="senha" />
              </Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <p>
                  Não tem conta?{" "}
                  <a
                    target="_blank"
                    href="página de cadastro"
                    style={{ color: "blue" }}
                  >
                    Registre-se
                  </a>
                </p>

                <Button type="primary">Login</Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Content>
    </Layout>
  );
};
