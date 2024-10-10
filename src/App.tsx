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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<CadastroCategoria />} />
        <Route path="/fornecedor" element={<CadastroFornecedor />} />
        <Route path="/tabela=categoria" element={<TabelaCategorias />} />
        <Route path="/tabela=cliente" element={<TabelaClientes />} />
        <Route path="/tabela=fornecedor" element={<TabelaFornecedores />} />
        <Route path="/tabela=pedido" element={<TabelaPedidos />} />
        <Route path="/tabela=produto" element={<TabelaProdutos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
