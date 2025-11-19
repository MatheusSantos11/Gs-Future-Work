import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';

import type { IProjetoFeed } from './data/projeto.model';
// IMPORTANTE: Aqui estamos importando o SEU novo arquivo JSON de 60 projetos
import projetosData from './data/projeto.json';
import { SugestoesProjetos } from './components/SugestoesProjetos';
// Importando o NOVO MODAL
import { ProjectModal } from './components/ProjectModal';

import logo from "./imgs/logo.png";
import perfil from "./imgs/perfil.png";
import './App.css'
import { SugestoesPerfis } from "./components/SugestoesPerfis";
import { UserModal } from "./components/UserModal";
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

function App() {
  const usuarios = usuariosData as IUsuario[];

  // Carregando os projetos do SEU JSON novo
  const projetos = projetosData as IProjetoFeed[];

  // Estado para o Perfil Selecionado
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario | null>(null);

  // Estado para o Projeto Selecionado
  const [projetoSelecionado, setProjetoSelecionado] = useState<IProjetoFeed | null>(null);

  const [menuAberto, setMenuAberto] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(true);

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaEscuro]);

  const handleFecharMenu = () => setMenuAberto(false);

  return (
    <div className="bg-gray-100 dark:bg-[#2A2B30] min-h-screen w-full flex flex-col transition-colors duration-300">

      {/* ================= HEADER FIXO ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#202327] h-16 px-4 flex items-center justify-between shadow-md border-b border-gray-200 dark:border-none transition-colors duration-300">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-auto object-contain invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-all duration-300"
          />

          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="border-gray-300 dark:border-[#35393C] border-2 h-9 pl-3 pr-3 rounded-lg w-80 bg-gray-50 dark:bg-[#1A1D1F] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden p-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* ================= MENU MOBILE FULLSCREEN ================= */}
      {menuAberto && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-[#202327] z-50 p-4 md:hidden overflow-y-auto animate-in slide-in-from-top-2">
          <div className="flex flex-col h-full">
            <button
              onClick={() => setTemaEscuro(!temaEscuro)}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#35393C] text-gray-900 dark:text-white py-4 rounded-lg mb-6 font-medium transition hover:brightness-95 border border-gray-200 dark:border-transparent"
            >
              {temaEscuro ? <Sun size={20} /> : <Moon size={20} />}
              {temaEscuro ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
            </button>

            <hr className="border-gray-200 dark:border-[#35393C] mb-6" />

            <div className="flex items-center mb-6">
              <img src={perfil} alt="perfil" className="h-14 w-14 rounded" />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nome do Usuário</h2>
                <p className="text-gray-500 dark:text-[#9FA2A3]">Cargo / Função</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={handleFecharMenu} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">Customizar</button>
              <button onClick={handleFecharMenu} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">Networks</button>
              <button onClick={handleFecharMenu} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">Certificados</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex pt-16 w-full relative">

        {/* Sidebar Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#2A2B30] fixed left-0 top-16 h-[calc(100vh-4rem)] p-4 border-r border-gray-200 dark:border-[#35393C] transition-colors duration-300">
          <div className="flex items-center">
            <img src={perfil} alt="perfil" className="h-16 w-16 rounded" />
            <div className="ml-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Nome</h2>
              <p className="text-gray-500 dark:text-[#9FA2A3] text-sm">cargo</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button className="bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition">Customizar</button>
            <button className="bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition">Networks</button>
            <button className="bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition">Certificados</button>
          </div>
          <div className="relative h-full">
            <button
              onClick={() => setTemaEscuro(!temaEscuro)}
              className="absolute bottom-0 w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#35393C] text-gray-900 dark:text-white py-4 rounded-lg mb-6 font-medium transition hover:brightness-95 border border-gray-200 dark:border-transparent"
            >
              {temaEscuro ? <Sun size={20} /> : <Moon size={20} />}
              {temaEscuro ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
            </button>
          </div>

        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 w-full md:ml-64 p-4 transition-colors duration-300 overflow-x-hidden">

          <div className="mb-4 md:hidden relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full border-gray-300 dark:border-[#35393C] border-2 h-10 pl-3 pr-3 rounded-lg bg-white dark:bg-[#1A1D1F] text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* === SEÇÃO DE PERFIS === */}
          <SugestoesPerfis
            usuarios={usuarios}
            abrirModal={(u) => setUsuarioSelecionado(u)}
          />

          {/* === NOVA SEÇÃO DE PROJETOS === */}
          <SugestoesProjetos
            projetos={projetos}
            abrirModal={(p) => setProjetoSelecionado(p)}
          />

          <UserModal
            usuario={usuarioSelecionado}
            onClose={() => setUsuarioSelecionado(null)}
          />

          {/* Novo Modal de Projetos */}
          <ProjectModal
            projeto={projetoSelecionado}
            onClose={() => setProjetoSelecionado(null)}
          />

          <div className="h-8"></div>
        </main>

      </div>

    </div>
  );
}

export default App;