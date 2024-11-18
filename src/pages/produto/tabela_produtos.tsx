import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { procurarTodosCategorias } from "../../service/categoria_service";
import {
  atualizarProduto,
  procurarTodosProdutos,
  removerProduto,
} from "../../service/produto_service";
import PrivateButton from "../../components/PrivateButton";

const { Title } = Typography;
const { Option } = Select;

const TabelaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [form] = Form.useForm();

  // Filtros de buscas
  const [descricaoFiltro, setDescricaoFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);
  const [medidaFiltro, setMedidaFiltro] = useState("");
  const [precoCompraFiltro, setPrecoCompraFiltro] = useState("");
  const [valorUnFiltro, setValorUnFiltro] = useState("");
  const [quantidadeFiltro, setQuantidadeFiltro] = useState("");

  useEffect(() => {
    listarProdutos();
    listarCategorias();
  }, []);

  const listarProdutos = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosProdutos();
      const filteredData = data.filter((produto: any) => {
        const descricaoMatch =
          descricaoFiltro === "" ||
          produto.descricao
            .toLowerCase()
            .includes(descricaoFiltro.toLowerCase());
        const categoriaMatch =
          categoriaFiltro === null || produto.categoria.id === categoriaFiltro;
        const medidaMatch =
          medidaFiltro === "" ||
          produto.medida.descricao
            .toLowerCase()
            .includes(medidaFiltro.toLowerCase());
        const precoCompraMatch =
          precoCompraFiltro === "" ||
          produto.precoCompra.toString().includes(precoCompraFiltro);
        const valorUnMatch =
          valorUnFiltro === "" ||
          produto.valorUn.toString().includes(valorUnFiltro);
        const quantidadeMatch =
          quantidadeFiltro === "" ||
          produto.quantidade.toString().includes(quantidadeFiltro);

        return (
          descricaoMatch &&
          categoriaMatch &&
          medidaMatch &&
          precoCompraMatch &&
          valorUnMatch &&
          quantidadeMatch
        );
      });
      setProdutos(filteredData);
    } catch (error: any) {
      console.error("Erro ao listar produtos:", error);

      notification.error({
        message: "Erro ao listar produtos",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const listarCategorias = async () => {
    try {
      const data = await procurarTodosCategorias();
      setCategorias(data);
    } catch (error: any) {
      console.error("Erro ao listar categorias:", error);
      notification.error({
        message: "Erro ao listar categorias",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removerProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
      notification.success({
        message: "Produto deletado com sucesso",
        description: "O produto foi removido com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);
      notification.error({
        message: "Erro ao deletar produto",
        description: error.message,
      });
    }
  };

  const handleEdit = (produto: any) => {
    setSelectedProduto(produto);
    form.setFieldsValue(produto);
    setModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    const data = {
      nome: values.nome,
      cnpj: values.cnpj,
      telefone: values.telefone,
      email: values.email,
      quantidade: Number(values.quantidade),
    };

    try {
      await atualizarProduto(selectedProduto.id, data);
      setProdutos(
        produtos.map((produto) =>
          produto.id === selectedProduto.id
            ? { ...produto, ...values }
            : produto
        )
      );
      notification.success({
        message: "Produto atualizado com sucesso",
        description: "O produto foi atualizado com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      notification.error({
        message: "Erro ao atualizar produto",
        description: error.message,
      });
    } finally {
      setModalVisible(false);
      setSelectedProduto(null);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Unidade de Medida",
      dataIndex: ["medida", "descricao"],
      key: "descricao",
    },
    {
      title: "Preço de Compra",
      dataIndex: "precoCompra",
      key: "precoCompra",
    },
    {
      title: "Valor Unitário",
      dataIndex: "valorUn",
      key: "valorUn",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Categoria",
      dataIndex: ["categoria", "descricao"],
      key: "categoria",
      render: (text: string) => text || "Sem categoria",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (record: any) => (
        <span>
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>

          <PrivateButton roles={["Admin"]}>
            <Button
              onClick={() => handleDelete(record.id)}
              style={{ background: "red", color: "white" }}
            >
              Deletar
            </Button>
          </PrivateButton>
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 10%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Produtos</Title>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexDirection: "row",
          width: "100%",
          marginBottom: "16px",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <div>
          <label htmlFor="descricaoFiltro">Descrição:</label>
          <Input
            id="descricaoFiltro"
            value={descricaoFiltro}
            onChange={(e) => setDescricaoFiltro(e.target.value)}
            placeholder="Filtro por descrição"
          />
        </div>

        <div>
          <label htmlFor="medidaFiltro">Medida:</label>
          <Input
            id="medidaFiltro"
            value={medidaFiltro}
            onChange={(e) => setMedidaFiltro(e.target.value)}
            placeholder="Filtro por medida"
          />
        </div>

        <div>
          <label htmlFor="precoCompraFiltro">Preço de Compra:</label>
          <Input
            id="precoCompraFiltro"
            value={precoCompraFiltro}
            onChange={(e) => setPrecoCompraFiltro(e.target.value)}
            placeholder="Filtro por preço de compra"
          />
        </div>

        <div>
          <label htmlFor="valorUnFiltro">Valor Unitário:</label>
          <Input
            id="valorUnFiltro"
            value={valorUnFiltro}
            onChange={(e) => setValorUnFiltro(e.target.value)}
            placeholder="Filtro por valor unitário"
          />
        </div>

        <div>
          <label htmlFor="quantidadeFiltro">Quantidade:</label>
          <Input
            id="quantidadeFiltro"
            value={quantidadeFiltro}
            onChange={(e) => setQuantidadeFiltro(e.target.value)}
            placeholder="Filtro por quantidade"
          />
        </div>

        <div>
          <label htmlFor="categoriaFiltro">Categoria:</label>
          <Select
            id="categoriaFiltro"
            value={categoriaFiltro}
            onChange={(value) => setCategoriaFiltro(value)}
            style={{ width: 200 }}
          >
            <Option value={null}>Todas</Option>
            {categorias.map((categoria) => (
              <Option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </Option>
            ))}
          </Select>
        </div>

        <Button
          type="primary"
          onClick={listarProdutos}
          style={{ marginLeft: 16, marginTop: 16 }}
        >
          Filtrar
        </Button>
      </div>

      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={produtos} columns={columns} rowKey="id" />
      </div>

      <Modal
        title="Editar Produto"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[{ required: true, message: "Descrição é obrigatória!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Unidade de Medida"
            name="unMedida"
            rules={[
              { required: true, message: "Unidade de medida é obrigatória!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Valor Unitário"
            name="valorUn"
            rules={[
              { required: true, message: "Valor unitário é obrigatório!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Quantidade"
            name="quantidade"
            rules={[{ required: true, message: "Quantidade é obrigatória!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Categoria"
            name="categoriaId"
            rules={[
              { required: true, message: "ID da categoria é obrigatório!" },
            ]}
          >
            <Select>
              {categorias.map((categoria) => (
                <Option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Atualizar
            </Button>
            <Button
              onClick={() => setModalVisible(false)}
              style={{ marginLeft: 8 }}
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TabelaProdutos;
