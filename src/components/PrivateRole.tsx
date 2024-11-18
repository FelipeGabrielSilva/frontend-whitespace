import { Content } from "antd/es/layout/layout";
import React from "react";
import Fundo from "../assets/Element.png";

interface PrivateRouteProps {
  roles: string[];
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, children }) => {
  const localRole = localStorage.getItem("role");

  const temPermissao = roles.some((role) => localRole === role);

  if (!localRole || !temPermissao) {
    return (
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
          color: "red",
          fontSize: "2rem",
          fontWeight: "500",
          fontFamily: "Arial",
        }}
      >
        Você não tem autorização para acessar esse recurso
      </Content>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
