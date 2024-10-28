import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Navbar } from "./components/Navbar";
import CadastroCategoria from "./pages/categoria/p1_categoria";
import TabelaCategorias from "./pages/categoria/tabela_categoria";
import TabelaClientes from "./pages/cliente/tabela_cliente";
import CadastroFornecedor from "./pages/fornecedor/p3_fornecedor";
import TabelaFornecedores from "./pages/fornecedor/tabela_fornecedor";
import TabelaPedidos from "./pages/pedido/tabela_pedidos";
import TabelaProdutos from "./pages/produto/tabela_produtos";
import CadastroCliente from "./pages/cliente/p2_cliente";
import CadastroPedido from "./pages/pedido/p4_pedido";
import CadastroProduto from "./pages/produto/p5_produto";
import TabelaItemPedidos from "./pages/item_pedido/tabela_item_pedido";
import TabelaEstoque from "./pages/estoque/tabela_estoque";
import { Login } from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Home />} />
        <Route path="/categoria" element={<CadastroCategoria />} />
        <Route path="/cliente" element={<CadastroCliente />} />
        <Route path="/fornecedor" element={<CadastroFornecedor />} />
        <Route path="/pedido" element={<CadastroPedido />} />
        <Route path="/produto" element={<CadastroProduto />} />
        <Route path="/tabela=categoria" element={<TabelaCategorias />} />
        <Route path="/tabela=cliente" element={<TabelaClientes />} />
        <Route path="/tabela=fornecedor" element={<TabelaFornecedores />} />
        <Route path="/tabela=pedido" element={<TabelaPedidos />} />
        <Route path="/tabela=produto" element={<TabelaProdutos />} />
        <Route path="/tabela=item&pedido" element={<TabelaItemPedidos />} />
        <Route path="/tabela=estoque" element={<TabelaEstoque />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
