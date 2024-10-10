import React, { useEffect, useState } from "react";
import { Table, Typography, Spin } from "antd";
import { procurarTodosCategorias } from "../../service/categoria_service";

const { Title } = Typography;

const TabelaCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const data = await procurarTodosCategorias();
        setCategorias(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

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
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Title level={2}>Categorias</Title>
      <Table dataSource={categorias} columns={columns} rowKey="id" />
    </div>
  );
};

export default TabelaCategorias;
