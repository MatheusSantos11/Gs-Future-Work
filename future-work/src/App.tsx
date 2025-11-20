import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';

import type { IProjetoFeed } from './data/projeto.model';
import projetosData from './data/projeto.json';
import { SugestoesProjetos } from './components/SugestoesProjetos';
import { ProjectModal } from './components/ProjectModal';
import CustomizarModal from './components/CustomizarModal';
import { NetworkModal } from './components/NetworkModal';
import { CertificadosModal } from './components/CertificadosModal';

import { carregarUser } from './data/storage';
import logo from "./imgs/logo.png";
import perfil from "./imgs/perfil.png";
import './App.css'
import { SugestoesPerfis } from "./components/SugestoesPerfis";
import { UserModal } from "./components/UserModal";
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, Users, Settings, Award, Search, Trophy, Globe, Code, Heart, Star } from 'lucide-react';

import { GitHubModal } from "./components/GitHubModal";

function App() {
  const usuarios = usuariosData as IUsuario[];
  const projetosTodos = projetosData as IProjetoFeed[];

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario | null>(null);
  const [projetoSelecionado, setProjetoSelecionado] = useState<IProjetoFeed | null>(null);
  const [networkModalAberto, setNetworkModalAberto] = useState(false);
  const [GitHubModalAberto, setGitHubModalAberto] = useState(false);
  const [certificadosAberto, setCertificadosAberto] = useState(false);

  const [busca, setBusca] = useState("");
  const [meusCertificados, setMeusCertificados] = useState<string[]>([]);

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.cargo.toLowerCase().includes(busca.toLowerCase()) ||
    u.habilidadesTecnicas?.some(h => h.toLowerCase().includes(busca.toLowerCase()))
  );

  const projetosFiltrados = projetosTodos.filter(p =>
    p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    p.criador.toLowerCase().includes(busca.toLowerCase()) ||
    p.descricao.toLowerCase().includes(busca.toLowerCase())
  );

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
    function carregarCertificados() {
      const salvos = localStorage.getItem('meus-certificados');
      if (salvos) {
        setMeusCertificados(JSON.parse(salvos));
      } else {
        setMeusCertificados(["AWS Certified Cloud Practitioner", "Meta Front-End Developer"]);
      }
    }
    carregarCertificados();
    window.addEventListener('certificados-updated', carregarCertificados);
    return () => window.removeEventListener('certificados-updated', carregarCertificados);
  }, []);

  useEffect(() => {
    function handleOpenCertificados() {
      setCertificadosAberto(true);
    }
    window.addEventListener('open-certificados', handleOpenCertificados);
    return () => window.removeEventListener('open-certificados', handleOpenCertificados);
  }, []);

  // === NOVO LISTENER PARA NETWORKS ===
  useEffect(() => {
    function handleOpenNetworks() {
      setNetworkModalAberto(true);
    }
    window.addEventListener('open-networks', handleOpenNetworks);
    return () => window.removeEventListener('open-networks', handleOpenNetworks);
  }, []);

  useEffect(() => {
    function handleOpenGitHub() {
      setGitHubModalAberto(true);
    }
    window.addEventListener('open-github', handleOpenGitHub);
    return () => window.removeEventListener('open-github', handleOpenGitHub);
  }, []);

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaEscuro]);

  const getList = (text: string) => {
    if (!text) return [];
    return text.split(',').map(t => t.trim()).filter(t => t);
  };

  return (
    <div className="bg-gray-100 dark:bg-[#2A2B30] min-h-screen w-full flex flex-col transition-colors duration-300 overflow-x-hidden">
      <CustomizarModal />
      <CertificadosModal isOpen={certificadosAberto} onClose={() => setCertificadosAberto(false)} />

      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#202327] h-16 px-4 flex items-center justify-between shadow-md border-b border-gray-200 dark:border-none transition-colors duration-300">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-10 w-auto object-contain invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-all duration-300" />
          <div className="relative hidden md:block">
            <input type="text" placeholder="Pesquisar perfis ou projetos..." value={busca} onChange={(e) => setBusca(e.target.value)} className="border-gray-300 dark:border-[#35393C] border-2 h-9 pl-10 pr-3 rounded-lg w-80 bg-gray-50 dark:bg-[#1A1D1F] text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors" />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
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
              {temaEscuro ? <Sun size={20} /> : <Moon size={20} />} {temaEscuro ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
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
              <button onClick={() => { setMenuAberto(false); window.dispatchEvent(new CustomEvent('open-customizar')); }} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-3 px-4"><Settings size={20} className="opacity-80" /> Customizar</button>
              <button onClick={() => { setMenuAberto(false); setNetworkModalAberto(true); }} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex justify-between px-4 items-center"><div className="flex items-center gap-3"><Users size={20} className="opacity-80" /> Networks</div>{rede.length > 0 && <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">{rede.length}</span>}</button>
              <button onClick={() => { setMenuAberto(false); setCertificadosAberto(true); }} className="bg-blue-600 dark:bg-[#287ADF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-3 px-4"><Award size={20} className="opacity-80" /> Certificados</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex pt-16 w-full relative min-h-screen">

        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#2A2B30] fixed left-0 top-16 h-[calc(100vh-4rem)] p-4 border-r border-gray-200 dark:border-[#35393C] transition-colors duration-300 z-40 overflow-y-auto custom-scrollbar">

          {/* PERFIL USUÁRIO */}
          <div className="flex items-center mb-6">
            <img
              src={userCustom?.foto ? userCustom.foto : perfil}
              alt="perfil"
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
            <div className="ml-3 overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {typeof userCustom?.nome === 'string' && userCustom.nome.trim() ? userCustom.nome : 'Nome'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-[#9FA2A3] truncate">
                {typeof userCustom?.cargo === 'string' && userCustom.cargo.trim() ? userCustom.cargo : 'Cargo'}
              </p>
            </div>
          </div>

          {/* BOTÕES AÇÃO */}
          <div className="flex flex-col gap-2.5">
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-customizar'))} className="w-full bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 group shadow-sm"><Settings size={18} className="opacity-80 group-hover:rotate-45 transition-transform" /> Customizar</button>
            <button onClick={() => setNetworkModalAberto(true)} className="w-full bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition flex justify-between items-center group shadow-sm"><div className="flex items-center gap-2"><Users size={18} className="opacity-80" /> Networks</div>{rede.length > 0 && <span className="bg-white/20 group-hover:bg-white/30 px-2 rounded-md text-xs font-bold transition-colors">{rede.length}</span>}</button>
            <button onClick={() => setCertificadosAberto(true)} className="w-full bg-blue-600 dark:bg-[#287ADF] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-between group shadow-sm"><div className="flex items-center gap-2"><Award size={18} className="opacity-80 group-hover:scale-110 transition-transform" /> Certificados</div><span className="bg-white/20 group-hover:bg-white/30 px-2 rounded-md text-xs font-bold transition-colors">{meusCertificados.length}</span></button>
          </div>

          {/* === CONQUISTAS / CERTIFICADOS === */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Trophy size={14} /> Conquistas
            </h3>
            {meusCertificados.length === 0 ? (
              <div className="text-xs text-gray-400 italic bg-gray-50 dark:bg-white/5 p-3 rounded-lg text-center">
                Nenhum certificado. Adicione no botão acima!
              </div>
            ) : (
              <div className="space-y-2">
                {meusCertificados.map((cert, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-transparent hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-default">
                    <Award size={14} className="text-yellow-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-2 leading-snug text-xs font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* === NOVAS SEÇÕES NA SIDEBAR (PREENCHIDAS DO CUSTOMIZAR) === */}

          {/* IDIOMAS */}
          {userCustom?.idiomas && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Globe size={14} className="text-teal-500" /> Idiomas
              </h3>
              <div className="flex flex-wrap gap-2">
                {getList(userCustom.idiomas).map((lang, i) => (
                  <span key={i} className="text-xs font-medium bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-2 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* HABILIDADES TÉCNICAS */}
          {userCustom?.habilidadesTecnicas && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Code size={14} className="text-blue-500" /> Habilidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {getList(userCustom.habilidadesTecnicas).map((tech, i) => (
                  <span key={i} className="text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded border border-blue-100 dark:border-blue-900/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SOFT SKILLS */}
          {userCustom?.softSkills && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Star size={14} className="text-orange-500" /> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {getList(userCustom.softSkills).map((skill, i) => (
                  <span key={i} className="text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* INTERESSES */}
          {userCustom?.interesses && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Heart size={14} className="text-pink-500" /> Interesses
              </h3>
              <div className="flex flex-wrap gap-2">
                {getList(userCustom.interesses).map((int, i) => (
                  <span key={i} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded border border-gray-200 dark:border-transparent">
                    #{int}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button onClick={() => setTemaEscuro(!temaEscuro)} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#35393C] hover:bg-gray-200 dark:hover:bg-[#40444b] text-gray-900 dark:text-white py-2.5 rounded-lg text-sm font-bold transition border border-gray-200 dark:border-transparent">
              {temaEscuro ? <Sun size={18} /> : <Moon size={18} />} {temaEscuro ? "Modo Claro" : "Modo Escuro"}
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-colors duration-300">
          <main className="flex-1 p-4 w-full max-w-full overflow-hidden">
            <div className="mb-4 md:hidden relative">
              <input type="text" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)} className="w-full border-gray-300 dark:border-[#35393C] border-2 h-10 pl-10 pr-3 rounded-lg bg-white dark:bg-[#1A1D1F] text-gray-900 dark:text-white focus:outline-none" />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {(busca && usuariosFiltrados.length === 0 && projetosFiltrados.length === 0) ? (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">Nenhum resultado encontrado para "{busca}".</p>
              </div>
            ) : (
              <>
                {usuariosFiltrados.length > 0 && <SugestoesPerfis usuarios={usuariosFiltrados} abrirModal={(u) => setUsuarioSelecionado(u)} redeIds={rede} onToggleConexao={toggleConexao} />}
                {projetosFiltrados.length > 0 && <SugestoesProjetos projetos={projetosFiltrados} abrirModal={(p) => setProjetoSelecionado(p)} />}
              </>
            )}

            <UserModal usuario={usuarioSelecionado} onClose={() => setUsuarioSelecionado(null)} isConectado={usuarioSelecionado ? rede.includes(usuarioSelecionado.id) : false} onToggleConexao={toggleConexao} />
            <ProjectModal projeto={projetoSelecionado} onClose={() => setProjetoSelecionado(null)} />
            <NetworkModal isOpen={networkModalAberto} onClose={() => setNetworkModalAberto(false)} conexoes={rede} todosUsuarios={usuarios} onDesconectar={removerConexao} />

            <div className="h-8"></div>
          </main>

          <footer className="bg-white dark:bg-[#202327] border-t border-gray-200 dark:border-none py-6 mt-auto transition-colors duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-0 w-full">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left"><h3 className="text-lg font-bold text-gray-900 dark:text-white">SkillConnect</h3><p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Todos os direitos reservados.</p></div>
              <div className="flex items-center gap-6">
                <Github
                  onClick={() => setGitHubModalAberto(true)}
                  size={20}
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                />
                <GitHubModal
                  isOpen={GitHubModalAberto}
                  onClose={() => setGitHubModalAberto(false)}
                />                
                <Linkedin size={20} className="text-gray-500 hover:text-blue-700 transition-colors" />
                <Mail size={20} className="text-gray-500 hover:text-red-500 transition-colors" /></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;