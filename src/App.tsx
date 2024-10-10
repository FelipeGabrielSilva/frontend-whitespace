import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Navbar } from "./components/Navbar";
import CadastroCategoria from "./pages/categoria/p1_categoria";
import TabelaCategorias from "./pages/categoria/tabela_categoria";
import TabelaClientes from "./pages/cliente/tabela_cliente";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<CadastroCategoria />} />
        <Route path="/tabela=categoria" element={<TabelaCategorias />} />

        <Route path="/tabela=cliente" element={<TabelaClientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
