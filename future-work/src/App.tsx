import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';
import logo from "./imgs/logo.png";
import menu from "./imgs/menu.svg";
import perfil from "./imgs/perfil.png";
import './App.css'
import { SugestoesPerfis } from "./components/SugestoesPerfis";
import { UserModal } from "./components/UserModal";
import { useState } from 'react';

function App() {
  const usuarios = usuariosData as IUsuario[];
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario | null>(null);

  return (
    <div className="bg-[#2A2B30] min-h-screen w-full flex">

      {/* ==== SIDEBAR PERFIL (ESQUERDA) ==== */}
      <aside className="hidden md:block w-64 bg-[#202327] fixed left-0 top-0 h-full p-4 text-white">
        <div className="flex">
          <img src={perfil} alt="perfil" className="h-16 w-16 rounded" />
          <div className="ml-3 mt-1">
            <h2 className="text-lg">Nome</h2>
            <p className="text-[#9FA2A3] text-sm">cargo</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-[#287ADF] px-3 py-1 rounded">Customizar</button>
          <button className="bg-[#287ADF] px-3 py-1 rounded">Networks</button>
          <button className="bg-[#287ADF] px-3 py-1 rounded">Certificados</button>
        </div>
      </aside>

      {/* ==== CONTEÚDO CENTRAL ==== */}
      <div className="flex-1 md:ml-64">

        {/* ==== HEADER ==== */}
                {/* ==== HEADER ==== */}
        <header className="fixed z-10 bg-[#202327] h-15 p-2 flex items-center gap-4 top-0 left-0 md:left-64 right-0">
          <img src={logo} alt="logo" className="h-10 w-37" />

          <input
            type="text"
            placeholder="Pesquisar"
            className="border-[#35393C] border-2 h-9 p-2 rounded-lg mt-1 md:ml-10 md:w-80"
          />

          <img src={menu} alt="menu" className="h-10 w-10 ml-auto mt-1" />
        </header>

        {/* Espaçamento para o header */}
        <div className="h-16"></div>

        {/* ==== PERFIL NO MOBILE ==== */}
        <div className="ml-3 md:hidden">
          <div className="flex flex-wrap">
            <img src={perfil} alt="perfil" className="h-20 w-20 ml-3" />
            <div className="mt-3 ml-3">
              <h2 className="text-xl text-white">Nome</h2>
              <p className="text-[#9FA2A3]">cargo</p>
            </div>
          </div>

          <div className="flex flex-wrap ml-4 mt-2 gap-2">
            <button className="bg-[#287ADF] px-3 py-1 rounded">Customizar</button>
            <button className="bg-[#287ADF] px-3 py-1 rounded">Networks</button>
            <button className="bg-[#287ADF] px-3 py-1 rounded">Certificados</button>
          </div>
        </div>

        {/* ==== FEED ==== */}
        <div className="px-4 mt-4">
          <SugestoesPerfis
            usuarios={usuarios}
            abrirModal={(u) => setUsuarioSelecionado(u)}
          />

          <UserModal
            usuario={usuarioSelecionado}
            onClose={() => setUsuarioSelecionado(null)}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
