import React from "react";
import Fundo from "../assets/Element.png";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

interface Props {
  altura: string;
  children: any;
}

export const Conteudo: React.FC<Props> = ({ altura, children }) => {
  return (
    <Layout style={{ height: altura }}>
      <Content
        style={{
          backgroundImage: `url(${Fundo})`,
          backgroundColor: "#043873",
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
        {children}
      </Content>
    </Layout>
  );
};
