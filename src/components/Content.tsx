import { Content } from "antd/es/layout/layout";
import React from "react";
import Fundo from "../assets/Element.png";

interface Props {
  children: any;
}

export const Conteudo: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ width: "100%" }}>
      <Content
        style={{
          backgroundImage: `url(${Fundo})`,
          backgroundColor: "#043873",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          height: "100vh",
          gap: "36px",
        }}
      >
        {children}
      </Content>
    </div>
  );
};
