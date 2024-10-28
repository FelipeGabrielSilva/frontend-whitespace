import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Button,
  Typography,
  Input,
  message,
  Divider,
  Card,
} from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { criarPedido } from "../../service/pedido_service";
import { procurarTodosClientes } from "../../service/cliente_service";
import { procurarTodosProdutos } from "../../service/produto_service";

const { Title } = Typography;
const { Option } = Select;

interface Produto {
  produtoId: number;
  quantidade: number;
  valorTotal: number;
}

interface CreatePedidoDto {
  clienteId: number;
  produtos: Produto[];
}

const CadastroPedido: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    fetchClientes();
    fetchProdutos();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await procurarTodosClientes();
      setClientes(response);
    } catch (error: any) {
      console.error("Erro ao buscar clientes:", error);
      message.error("Erro ao buscar clientes");
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await procurarTodosProdutos();
      setProdutos(response);
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
      message.error("Erro ao buscar produtos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CreatePedidoDto) => {
    

    try {
      await criarPedido(values);
      message.success("Pedido criado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao criar pedido:", error);
      message.error("Erro ao criar pedido");
    }
  };


  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Cadastro de Pedido</Title>

      {loading ? (
        <p>Carregando clientes e produtos...</p>
      ) : (
        <Formik
          initialValues={{
            clienteId: 0,
            produtos: [] as Produto[],
          }}
          validationSchema={Yup.object().shape({
            clienteId: Yup.number().required("Cliente é obrigatório"),
            produtos: Yup.array()
              .of(
                Yup.object().shape({
                  produtoId: Yup.number().required(
                    "ID do produto é obrigatório"
                  ),
                  quantidade: Yup.number()
                    .required("Quantidade é obrigatória")
                    .min(1, "Deve ser pelo menos 1"),
                  valorTotal: Yup.number()
                    .required("Valor total é obrigatório")
                    .min(0, "Valor total deve ser maior ou igual a zero"),
                })
              )
              .min(1, "Deve haver pelo menos um produto"),
          })}
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
                label="Cliente"
                validateStatus={
                  touched.clienteId && errors.clienteId ? "error" : ""
                }
                help={
                  touched.clienteId && errors.clienteId ? errors.clienteId : ""
                }
              >
                <Select
                  value={values.clienteId}
                  onChange={(value) => setFieldValue("clienteId", value)}
                  onBlur={handleBlur}
                  placeholder="Selecione um cliente"
                >
                  {clientes.map((cliente) => (
                    <Option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Produto"
                validateStatus={
                  touched.produtos && errors.produtos ? "error" : ""
                }
              >
                <Select
                  style={{ width: "30%", marginRight: "8px" }}
                  placeholder="Selecione um produto"
                  onChange={(value) => {
                    const produtoSelecionado = produtos.find(
                      (produto) => produto.id === value
                    );
                    if (produtoSelecionado) {
                      const newProduto: Produto = {
                        produtoId: produtoSelecionado.id,
                        quantidade: 1,
                        valorTotal: produtoSelecionado.preco,
                      };
                      setFieldValue("produtos", [
                        ...values.produtos,
                        newProduto,
                      ]);
                    }
                  }}
                >
                  {produtos.map((produto) => (
                    <Option key={produto.id} value={produto.id}>
                      {produto.descricao}
                    </Option>
                  ))}
                </Select>
                <Input
                  style={{ width: "30%", marginRight: "8px" }}
                  placeholder="Quantidade"
                  type="number"
                  min={1}
                  onChange={(e) => {
                    const quantidade = Number(e.target.value);
                    if (quantidade >= 1 && values.produtos.length > 0) {
                      const lastIndex = values.produtos.length - 1;
                      const updatedProdutos = [...values.produtos];
                      if (lastIndex >= 0) {
                        const produtoAtual = updatedProdutos[lastIndex];

                        produtoAtual.quantidade = quantidade;
                        produtoAtual.valorTotal =
                          quantidade *
                          (produtos.find((p) => p.id === produtoAtual.produtoId)
                            ?.preco || 0);

                        setFieldValue("produtos", updatedProdutos);
                      }
                    }
                  }}
                />
              </Form.Item>

              <Divider orientation="left">Produtos Selecionados</Divider>
              {values.produtos.length === 0 ? (
                <p>Nenhum produto selecionado.</p>
              ) : (
                <Card>
                  <ul>
                    {values.produtos.map((produto, index) => (
                      <li key={index}>
                        {produtos.find((p) => p.id === produto.produtoId)
                          ?.descricao || ""}{" "}
                        - Quantidade: {produto.quantidade}- Valor:{" R$"}
                        {
                          produtos.find((p) => p.id === produto.produtoId)
                            ?.valorUn
                        }{" "}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cadastrar Pedido
                </Button>

                <Button onClick={() => console.log(values.produtos)}>ON CLICK</Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CadastroPedido;
