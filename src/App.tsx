import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import CadastroCategoria from "./pages/categoria/p1_categoria";
import TabelaCategorias from "./pages/categoria/tabela_categoria";
import CadastroCliente from "./pages/cliente/p2_cliente";
import TabelaClientes from "./pages/cliente/tabela_cliente";
import TabelaEstoque from "./pages/estoque/tabela_estoque";
import CadastroFornecedor from "./pages/fornecedor/p3_fornecedor";
import TabelaFornecedores from "./pages/fornecedor/tabela_fornecedor";
import Home from "./pages/home";
import TabelaItemPedidos from "./pages/item_pedido/tabela_item_pedido";
import { Login } from "./pages/login";
import CadastroPedido from "./pages/pedido/p4_pedido";
import TabelaPedidos from "./pages/pedido/tabela_pedidos";
import CadastroProduto from "./pages/produto/p5_produto";
import TabelaProdutos from "./pages/produto/tabela_produtos";
import { Cadastro } from "./pages/usuario/cadastro";
import TabelaUsuarios from "./pages/usuario/tabela_usuario";
import PrivateRoute from "./components/PrivateRole";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/menu" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route
            path="categoria"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <CadastroCategoria />
              </PrivateRoute>
            }
          />
          <Route
            path="cliente"
            element={
              <PrivateRoute roles={["Admin"]}>
                <CadastroCliente />
              </PrivateRoute>
            }
          />
          <Route
            path="fornecedor"
            element={
              <PrivateRoute roles={["Admin"]}>
                <CadastroFornecedor />
              </PrivateRoute>
            }
          />
          <Route
            path="pedido"
            element={
              <PrivateRoute roles={["Admin"]}>
                <CadastroPedido />
              </PrivateRoute>
            }
          />
          <Route
            path="produto"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <CadastroProduto />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=categoria"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <TabelaCategorias />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=cliente"
            element={
              <PrivateRoute roles={["Admin"]}>
                <TabelaClientes />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=fornecedor"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <TabelaFornecedores />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=pedido"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <TabelaPedidos />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=produto"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <TabelaProdutos />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=item&pedido"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <TabelaItemPedidos />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=estoque"
            element={
              <PrivateRoute roles={["Admin", "Storage"]}>
                <TabelaEstoque />
              </PrivateRoute>
            }
          />
          <Route
            path="tabela=usuarios"
            element={
              <PrivateRoute roles={["Admin"]}>
                <TabelaUsuarios />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
