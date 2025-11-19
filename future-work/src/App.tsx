import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';

import type { IProjetoFeed } from './data/projeto.model';
// Importando o JSON de projetos
import projetosData from './data/projeto.json'; 
import { SugestoesProjetos } from './components/SugestoesProjetos';
import { ProjectModal } from './components/ProjectModal';
import CustomizarModal from './components/CustomizarModal';
import { NetworkModal } from './components/NetworkModal';

import { carregarUser } from './data/storage';
import logo from "./imgs/logo.png";
import perfil from "./imgs/perfil.png";
import './App.css'
import { SugestoesPerfis } from "./components/SugestoesPerfis";
import { UserModal } from "./components/UserModal";
import { useState, useEffect } from 'react';
// ADICIONEI Settings e Award nos imports
import { Menu, X, Sun, Moon, Github, Linkedin, Twitter, Mail, Users, Settings, Award } from 'lucide-react';

function App() {
  const usuarios = usuariosData as IUsuario[];
  const projetos = projetosData as IProjetoFeed[];

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario | null>(null);
  const [projetoSelecionado, setProjetoSelecionado] = useState<IProjetoFeed | null>(null);
  const [networkModalAberto, setNetworkModalAberto] = useState(false);
  
  const [rede, setRede] = useState<number[]>([]);

  const toggleConexao = (usuario: IUsuario) => {
    setRede(prevRede => {
      if (prevRede.includes(usuario.id)) {
        return prevRede.filter(id => id !== usuario.id);
      } else {
        return [...prevRede, usuario.id];
      }
    });
  };

  const removerConexao = (id: number) => {
     setRede(prev => prev.filter(uid => uid !== id));
  };

  const [menuAberto, setMenuAberto] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [userCustom, setUserCustom] = useState<any>(null);

  useEffect(() => {
    const data = carregarUser();
    setUserCustom(data[0] || null);
    function onUserUpdated() {
      const updated = carregarUser();
      setUserCustom(updated[0] || null);
    }
    window.addEventListener('user-updated', onUserUpdated);
    return () => window.removeEventListener('user-updated', onUserUpdated);
  }, []);

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaEscuro]);

  const handleFecharMenu = () => setMenuAberto(false);

  return (
    <div className="bg-gray-100 dark:bg-[#2A2B30] min-h-screen w-full flex flex-col transition-colors duration-300 overflow-x-hidden">
      <CustomizarModal />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#202327] h-16 px-4 flex items-center justify-between shadow-md border-b border-gray-200 dark:border-none transition-colors duration-300">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-10 w-auto object-contain invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-all duration-300" />
          <div className="relative hidden md:block">
            <input type="text" placeholder="Pesquisar..." className="border-gray-300 dark:border-[#35393C] border-2 h-9 pl-3 pr-3 rounded-lg w-80 bg-gray-50 dark:bg-[#1A1D1F] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>
        <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden p-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition">
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* MENU MOBILE */}
      {menuAberto && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-[#202327] z-50 p-4 md:hidden overflow-y-auto animate-in slide-in-from-top-2">
          <div className="flex flex-col h-full">
            <button onClick={() => setTemaEscuro(!temaEscuro)} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#35393C] text-gray-900 dark:text-white py-4 rounded-lg mb-6 font-medium transition hover:brightness-95 border border-gray-200 dark:border-transparent">
              {temaEscuro ? <Sun size={20} /> : <Moon size={20} />}
              {temaEscuro ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
            </button>
            <hr className="border-gray-200 dark:border-[#35393C] mb-6" />
            <div className="flex items-center mb-6">
              <img src={userCustom?.foto ? userCustom.foto : perfil} alt="perfil" className="h-14 w-14 rounded" />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{typeof userCustom?.nome === 'string' && userCustom.nome.trim() ? userCustom.nome : 'Nome'}</h2>
                <p className="text-gray-500 dark:text-[#9FA2A3]">{typeof userCustom?.cargo === 'string' && userCustom.cargo.trim() ? userCustom.cargo : 'Cargo'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setMenuAberto(false); window.dispatchEvent(new CustomEvent('open-customizar')); }} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-3 px-4">
                 <Settings size={20} className="opacity-80" /> Customizar
              </button>
              
              <button onClick={() => { setMenuAberto(false); setNetworkModalAberto(true); }} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex justify-between px-4 items-center">
                 <div className="flex items-center gap-3"><Users size={20} className="opacity-80"/> Networks</div>
                 {rede.length > 0 && <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">{rede.length}</span>}
              </button>

              <button onClick={handleFecharMenu} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-3 px-4">
                 <Award size={20} className="opacity-80" /> Certificados
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex pt-16 w-full relative min-h-screen">
        
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#2A2B30] fixed left-0 top-16 h-[calc(100vh-4rem)] p-4 border-r border-gray-200 dark:border-[#35393C] transition-colors duration-300 z-40">
          <div className="flex items-center">
            <img src={userCustom?.foto ? userCustom.foto : perfil} alt="perfil" className="h-16 w-16 rounded" />
            <div className="ml-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-[140px]">{userCustom?.nome || 'Nome'}</h2>
              <p className="text-gray-500 dark:text-[#9FA2A3] text-sm truncate max-w-[140px]">{userCustom?.cargo || 'Cargo'}</p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-3">
            {/* BOTÃO CUSTOMIZAR */}
            <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-customizar'))} 
                className="bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition flex items-center gap-2 group"
            >
                <Settings size={18} className="opacity-80 group-hover:rotate-45 transition-transform"/> Customizar
            </button>
            
            {/* BOTÃO NETWORKS */}
            <button 
                onClick={() => setNetworkModalAberto(true)}
                className="bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition flex justify-between items-center group"
            >
               <span className="flex items-center gap-2"><Users size={18} className="opacity-80"/> Networks</span>
               {rede.length > 0 && <span className="bg-white/20 group-hover:bg-white/30 px-2 rounded-full text-xs font-bold transition-colors">{rede.length}</span>}
            </button>

            {/* BOTÃO CERTIFICADOS */}
            <button 
                className="bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition flex items-center gap-2 group"
            >
               <Award size={18} className="opacity-80 group-hover:scale-110 transition-transform"/> Certificados
            </button>
          </div>
          
          <div className="relative h-full">
             <button onClick={() => setTemaEscuro(!temaEscuro)} className="absolute bottom-0 w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#35393C] text-gray-900 dark:text-white py-4 rounded-lg mb-6 font-medium transition hover:brightness-95 border border-gray-200 dark:border-transparent">
               {temaEscuro ? <Sun size={20} /> : <Moon size={20} />} {temaEscuro ? "Claro" : "Escuro"}
             </button>
          </div>
        </aside>

        {/* CONTEÚDO */}
        <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-colors duration-300">
          <main className="flex-1 p-4 w-full max-w-full overflow-hidden">
            <div className="mb-4 md:hidden relative">
               <input type="text" placeholder="Pesquisar..." className="w-full border-gray-300 dark:border-[#35393C] border-2 h-10 pl-3 pr-3 rounded-lg bg-white dark:bg-[#1A1D1F] text-gray-900 dark:text-white focus:outline-none" />
            </div>

            <SugestoesPerfis 
                usuarios={usuarios} 
                abrirModal={(u) => setUsuarioSelecionado(u)}
                redeIds={rede}
                onToggleConexao={toggleConexao}
            />

            <SugestoesProjetos projetos={projetos} abrirModal={(p) => setProjetoSelecionado(p)} />

            <UserModal 
              usuario={usuarioSelecionado} 
              onClose={() => setUsuarioSelecionado(null)}
              isConectado={usuarioSelecionado ? rede.includes(usuarioSelecionado.id) : false}
              onToggleConexao={toggleConexao}
            />

            <ProjectModal projeto={projetoSelecionado} onClose={() => setProjetoSelecionado(null)} />
            
            <NetworkModal 
                isOpen={networkModalAberto}
                onClose={() => setNetworkModalAberto(false)}
                conexoes={rede}
                todosUsuarios={usuarios}
                onDesconectar={removerConexao}
            />
            
            <div className="h-8"></div>
          </main>

          <footer className="bg-white dark:bg-[#202327] border-t border-gray-200 dark:border-none py-6 mt-auto transition-colors duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-0 w-full">
             <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="text-center md:text-left"><h3 className="text-lg font-bold text-gray-900 dark:text-white">SkillConnect</h3><p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Todos os direitos reservados.</p></div>
                 <div className="flex items-center gap-6"><Github size={20} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors" /><Linkedin size={20} className="text-gray-500 hover:text-blue-700 transition-colors" /><Twitter size={20} className="text-gray-500 hover:text-blue-400 transition-colors" /><Mail size={20} className="text-gray-500 hover:text-red-500 transition-colors" /></div>
             </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;