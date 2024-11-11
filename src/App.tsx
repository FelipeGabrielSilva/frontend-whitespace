import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/auth.context";
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
import { Navbar } from "./components/Navbar";

const Layout = () => {
  const auth = useAuth();

  if (auth?.autenticado) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Outlet /> {/* Renderiza as rotas filhas */}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/menu" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="categoria" element={<CadastroCategoria />} />
            <Route path="cliente" element={<CadastroCliente />} />
            <Route path="fornecedor" element={<CadastroFornecedor />} />
            <Route path="pedido" element={<CadastroPedido />} />
            <Route path="produto" element={<CadastroProduto />} />
            <Route path="tabela=categoria" element={<TabelaCategorias />} />
            <Route path="tabela=cliente" element={<TabelaClientes />} />
            <Route path="tabela=fornecedor" element={<TabelaFornecedores />} />
            <Route path="tabela=pedido" element={<TabelaPedidos />} />
            <Route path="tabela=produto" element={<TabelaProdutos />} />
            <Route path="tabela=item&pedido" element={<TabelaItemPedidos />} />
            <Route path="tabela=estoque" element={<TabelaEstoque />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
