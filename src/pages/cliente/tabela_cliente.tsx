import React, { useEffect, useState } from "react";
import { Table, Typography, Spin } from "antd";
import { procurarTodosClientes } from "../../service/cliente_service";

const { Title } = Typography;

const TabelaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const data = await procurarTodosClientes();
        setClientes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

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
      title: "CNPJ/CPF",
      dataIndex: "cnpjCpf",
      key: "cnpjCpf",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Criador ID",
      dataIndex: "criadorId",
      key: "criadorId",
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
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Title level={2}>Clientes</Title>
      <Table dataSource={clientes} columns={columns} rowKey="id" />
    </div>
  );
};

export default TabelaClientes;
