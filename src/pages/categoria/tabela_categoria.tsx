import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import {
  procurarTodosCategorias,
  removerCategoria,
  atualizarCategoria,
  criarCategoria,
} from "../../service/categoria_service";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title } = Typography;

const validationSchema = Yup.object().shape({
  descricao: Yup.string().required("Descrição é obrigatória!"),
});

const TabelaCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategoria, setSelectedCategoria] = useState<any>(null);

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
    setSelectedCategoria(categoria);
    setModalVisible(true);
  };

  const handleNewCategory = () => {
    setSelectedCategoria(null);
    setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (selectedCategoria) {
        await atualizarCategoria(selectedCategoria.id, values);
        setCategorias(
          categorias.map((c) =>
            c.id === selectedCategoria.id ? { ...c, ...values } : c
          )
        );
        notification.success({
          message: "Categoria atualizada com sucesso",
          description: "A categoria foi atualizada com sucesso.",
        });
      } else {
        const newCategoria = await criarCategoria(values);
        setCategorias([...categorias, newCategoria]);
        notification.success({
          message: "Categoria criada com sucesso",
          description: "A nova categoria foi criada com sucesso.",
        });
      }
      setModalVisible(false);
    } catch (error: any) {
      console.error("Erro ao atualizar ou criar categoria:", error);
      notification.error({
        message: "Erro ao atualizar ou criar categoria",
        description: error.message,
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
        <Title level={2}>Categorias</Title>
        <Button type="primary" onClick={handleNewCategory}>
          Nova categoria
        </Button>
      </div>
      <div style={{ border: "1px solid #cdcdcd ", borderRadius: 8 }}>
        <Table dataSource={categorias} columns={columns} rowKey="id" />
      </div>

      <Modal
        title={selectedCategoria ? "Editar Categoria" : "Criar Categoria"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedCategoria(null);
        }}
        footer={null}
      >
        <Formik
          initialValues={{
            descricao: selectedCategoria ? selectedCategoria.descricao : "",
            criadorId: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleModalOk}
        >
          {({ handleSubmit }) => (
            <FormikForm onSubmit={handleSubmit}>
              <Form.Item label="Descrição" required>
                <Field name="descricao">
                  {({ field, form }: any) => <Input {...field} />}
                </Field>
                <ErrorMessage name="descricao">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {selectedCategoria ? "Salvar" : "Criar"}
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default TabelaCategorias;
