import {
  Button,
  notification,
  Spin,
  Table,
  Modal,
  Form,
  Input,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  procurarTodosCategorias,
  removerCategoria,
  atualizarCategoria,
} from "../../service/categoria_service";
import PrivateButton from "../../components/PrivateButton";

const { Title } = Typography;

const TabelaCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentCategoria, setCurrentCategoria] = useState<any>(null);

  useEffect(() => {
    listarCategorias();
  }, []);

  const listarCategorias = async () => {
    setLoading(true);
    try {
      const data = await procurarTodosCategorias();
      setCategorias(data);
    } catch (error: any) {
      console.error("Erro ao listar categorias:", error);
      notification.error({
        message: "Erro ao listar categorias",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removerCategoria(id);
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
      notification.success({
        message: "Categoria deletada com sucesso",
        description: "A categoria foi removida com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar categoria:", error);
      notification.error({
        message: "Erro ao deletar categoria",
        description: error.message,
      });
    }
  };

  const handleEdit = (categoria: any) => {
    setCurrentCategoria(categoria);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    try {
      // Chama o serviço de atualização com os dados novos
      const updatedCategoria = await atualizarCategoria(
        currentCategoria.id,
        values
      );

      // Atualiza a lista local com a categoria editada
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === updatedCategoria.id ? updatedCategoria : categoria
        )
      );

      setIsModalVisible(false);
      setCurrentCategoria(null);

      notification.success({
        message: "Categoria atualizada com sucesso",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar categoria:", error);
      notification.error({
        message: "Erro ao atualizar categoria",
        description: "Não foi possível atualizar a categoria.",
      });
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
      title: "Criado Em",
      dataIndex: "criadoEm",
      key: "criadoEm",
    },
    {
      title: "Atualizado Em",
      dataIndex: "atualizadoEm",
      key: "atualizadoEm",
    },
    {
      title: "Criador ID",
      dataIndex: "criadorId",
      key: "criadorId",
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
        <Title level={2}>Categorias</Title>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={categorias} columns={columns} rowKey="id" />
      </div>

      {/* Modal para editar a categoria */}
      <Modal
        title="Editar Categoria"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form initialValues={currentCategoria} onFinish={handleUpdate}>
          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[
              { required: true, message: "Por favor, insira a descrição" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TabelaCategorias;
