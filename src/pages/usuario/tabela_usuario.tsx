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
import {
  atualizarUsuario,
  buscarTodosUsuarios,
  removerUsuario,
} from "../../service/usuario_service";

const { Title } = Typography;

const TabelaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentUsuario, setCurrentUsuario] = useState<any>(null);

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await buscarTodosUsuarios();
      setUsuarios(data);
    } catch (error: any) {
      console.error("Erro ao listar usuários:", error);
      notification.error({
        message: "Erro ao listar usuários",
        description: "Alguma coisa deu errado, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removerUsuario(id);

      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));

      notification.success({
        message: "Usuário",
        description: "O usuário foi removida com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao deletar usuário:", error);

      notification.error({
        message: "Erro ao deletar usuário",
        description: error.message,
      });
    }
  };

  const handleEdit = (usuario: any) => {
    setCurrentUsuario(usuario);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values: any) => {
    try {
      const updatedUsuario = await atualizarUsuario(currentUsuario.id, values);

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === updatedUsuario.id ? updatedUsuario : usuario
        )
      );

      setIsModalVisible(false);
      setCurrentUsuario(null);

      notification.success({
        message: "Usuário atualizada com sucesso",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);

      notification.error({
        message: "Erro ao atualizar usuário",
        description: "Não foi possível atualizar a usuário.",
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
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
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

          <Button
            onClick={() => handleDelete(record.id)}
            style={{ background: "red", color: "white" }}
          >
            Deletar
          </Button>
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
        <Title level={2}>Usuarios</Title>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={usuarios} columns={columns} rowKey="id" />
      </div>

      {/* Modal para editar a categoria */}
      <Modal
        title="Editar usuário"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form initialValues={currentUsuario} onFinish={handleUpdate}>
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

export default TabelaUsuarios;
