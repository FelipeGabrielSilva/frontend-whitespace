import React from "react";

interface PrivateRouteProps {
  roles: string[];
  children: React.ReactNode;
}

const PrivateButton: React.FC<PrivateRouteProps> = ({ roles, children }) => {
  const localRole = localStorage.getItem("role");

  const temPermissao = roles.some((role) => localRole === role);

  if (!localRole || !temPermissao) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateButton;
