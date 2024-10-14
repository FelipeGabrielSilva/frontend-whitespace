import React, { useEffect, useState } from "react";
import { Form, Select, Button, Typography, Input } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { criarProduto } from "../../service/produto_service";
import { procurarTodosCategorias } from "../../service/categoria_service";

const { Title } = Typography;
const { Option } = Select;

const validationSchema = Yup.object().shape({
  descricao: Yup.string().required("Descrição é obrigatória"),
  unMedida: Yup.string().required("Unidade de medida é obrigatória"),
  valorUn: Yup.number()
    .required("Valor unitário é obrigatório")
    .min(0, "Valor unitário deve ser maior ou igual a zero"),
  categoriaId: Yup.number().required("Categoria é obrigatória"),
  criadorId: Yup.number().required("Criador é obrigatório"),
  quantidade: Yup.number()
    .required("Quantidade é obrigatória")
    .min(0, "Quantidade deve ser maior ou igual a zero"),
});

const CadastroProduto: React.FC = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategorias();
    setLoading(false);
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await procurarTodosCategorias();
      setCategorias(response);
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await criarProduto(values);
      alert("Produto criado com sucesso!"); // Mensagem de sucesso
    } catch (error: any) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div>
      <Title level={2}>Cadastro de Produto</Title>

      {loading ? (
        <p>Carregando categorias...</p>
      ) : (
        <Formik
          initialValues={{
            descricao: "",
            unMedida: "",
            valorUn: "",
            categoriaId: "",
            criadorId: 1, // Substitua pelo ID real do criador, se necessário
            quantidade: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            setFieldValue,
            handleSubmit,
          }) => (
            <Form onFinish={handleSubmit} style={{ width: "100%" }}>
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
                  value={values.descricao}
                  onChange={(e) => setFieldValue("descricao", e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Descrição do produto"
                />
              </Form.Item>

              <Form.Item
                label="Unidade de Medida"
                validateStatus={
                  touched.unMedida && errors.unMedida ? "error" : ""
                }
                help={
                  touched.unMedida && errors.unMedida ? errors.unMedida : ""
                }
              >
                <Input
                  value={values.unMedida}
                  onChange={(e) => setFieldValue("unMedida", e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Unidade de medida"
                />
              </Form.Item>

              <Form.Item
                label="Valor Unitário"
                validateStatus={
                  touched.valorUn && errors.valorUn ? "error" : ""
                }
                help={touched.valorUn && errors.valorUn ? errors.valorUn : ""}
              >
                <Input
                  type="number"
                  value={values.valorUn}
                  onChange={(e) =>
                    setFieldValue("valorUn", parseFloat(e.target.value))
                  }
                  onBlur={handleBlur}
                  placeholder="Valor unitário"
                />
              </Form.Item>

              <Form.Item
                label="Categoria"
                validateStatus={
                  touched.categoriaId && errors.categoriaId ? "error" : ""
                }
                help={
                  touched.categoriaId && errors.categoriaId
                    ? errors.categoriaId
                    : ""
                }
              >
                <Select
                  value={values.categoriaId}
                  onChange={(value) => setFieldValue("categoriaId", value)}
                  onBlur={handleBlur}
                  placeholder="Selecione uma categoria"
                >
                  {categorias.map((categoria) => (
                    <Option key={categoria.id} value={categoria.id}>
                      {categoria.descricao}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Quantidade"
                validateStatus={
                  touched.quantidade && errors.quantidade ? "error" : ""
                }
                help={
                  touched.quantidade && errors.quantidade
                    ? errors.quantidade
                    : ""
                }
              >
                <Input
                  type="number"
                  value={values.quantidade}
                  onChange={(e) =>
                    setFieldValue("quantidade", parseInt(e.target.value))
                  }
                  onBlur={handleBlur}
                  placeholder="Quantidade"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cadastrar Produto
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CadastroProduto;
