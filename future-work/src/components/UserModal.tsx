import type { IUsuario, IFormacao } from "../data/usuario.model";
import { 
  X, MapPin, Briefcase, Globe, 
  Star, Heart, Hash, GraduationCap as CapIcon, 
  Check, UserPlus, FolderGit2, Award, MessageCircle
} from "lucide-react"; 
import { useEffect, useState } from 'react';

interface Props {
  usuario: IUsuario | null;
  onClose: () => void;
  isConectado: boolean;
  onToggleConexao: (usuario: IUsuario) => void;
}

export function UserModal({ usuario, onClose, isConectado, onToggleConexao }: Props) {
  if (!usuario) return null;

  const nome = usuario.nome || "Usuário";
  
  const habilidades = (usuario as any).habilidadesTecnicas || (usuario as any).habilidades || [];
  const softSkills = (usuario as any).softSkills || [];
  const experiencias = (usuario as any).experiencias || [];
  const projetos = (usuario as any).projetos || [];
  const certificacoes = (usuario as any).certificacoes || [];
  const idiomas = (usuario as any).idiomas || [];
  const areasInteresse = (usuario as any).areainteresses || [];
  const areaAtuacao = (usuario as any).area || "";

  const [recomendacoes, setRecomendacoes] = useState<any[]>([]);
  const [, setRecomendCount] = useState(0);
  const [showAllRecomendacoes, setShowAllRecomendacoes] = useState(false);

  const loadRecomendacoes = (id?: number) => {
    try {
      if (id === undefined || id === null) return [];
      const raw = localStorage.getItem(`recomendacoes_${id}`);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    const id = usuario?.id;
    const items = loadRecomendacoes(id);
    setRecomendacoes(items);
    setRecomendCount(items.length);

    function onRec(e: any) {
      const payload = e?.detail;
      if (!payload) return;
      if (payload.paraId === id) {
        setRecomendacoes(prev => {
          const next = [...prev, payload];
          setRecomendCount(next.length);
          return next;
        });
      }
    }

    window.addEventListener('recomendacao-enviada', onRec as EventListener);
    return () => window.removeEventListener('recomendacao-enviada', onRec as EventListener);
  }, [usuario?.id]);

  const renderFormacao = () => {
    if (!usuario.formacao) return <span className="text-gray-500 italic">Não informada</span>;
    
    if (typeof usuario.formacao === 'string') {
      return <p className="text-gray-600 dark:text-gray-400">{usuario.formacao}</p>;
    }

    if (Array.isArray(usuario.formacao)) {
      return (usuario.formacao as IFormacao[]).map((item, index) => (
        <div key={index} className="mb-3 last:mb-0">
          <p className="text-gray-900 dark:text-gray-100 font-semibold">{item.curso}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{item.instituicao} • {item.ano}</p>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white dark:bg-[#1F2226] text-gray-900 dark:text-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative border border-gray-200 dark:border-gray-700 flex flex-col max-h-[90vh]">
        
 
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10 bg-white/80 dark:bg-black/30 backdrop-blur-sm"
        >
          <X size={24} className="text-gray-500 dark:text-gray-300" />
        </button>


        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
            <img 
              src={usuario.foto || "https://via.placeholder.com/150"} 
              alt={nome} 
              className="w-28 h-28 rounded-2xl object-cover bg-gray-200 dark:bg-gray-700 shrink-0 shadow-md ring-4 ring-gray-50 dark:ring-[#2A2B30]" 
            />
            <div className="text-center sm:text-left w-full">
              <h2 className="text-3xl font-bold leading-tight mb-1">{nome}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{usuario.cargo || "Sem cargo"}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg">
                   <MapPin size={16} className="text-gray-400" />
                   <span>{usuario.localizacao || "Localização não informada"}</span>
                </div>
                {areaAtuacao && (
                  <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg">
                    <Hash size={16} className="text-gray-400" />
                    <span>{areaAtuacao}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8 pb-4">
            

            {usuario.resumo && (
              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/20">
                 <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Sobre</h3>
                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {usuario.resumo}
                </p>
              </div>
            )}


            {experiencias.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                  <Briefcase className="text-blue-500" size={20} /> Experiência Profissional
                </h3>
                <div className="space-y-6 border-l-2 border-gray-200 dark:border-gray-700 ml-2.5 pl-6">
                  {experiencias.map((exp: any, index: number) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#1F2226]"></div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base">{exp.cargo}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{exp.empresa}</span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                          {exp.inicio} - {exp.fim}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {exp.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usuario.formacao && (
                  <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                      <CapIcon className="text-green-500" size={20} /> Formação
                    </h3>
                    <div>{renderFormacao()}</div>
                  </div>
                )}

                {projetos.length > 0 && (
                   <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                      <FolderGit2 className="text-purple-500" size={20} /> Projetos
                    </h3>
                    <div className="space-y-3">
                      {projetos.map((proj: any, index: number) => (
                        <a 
                          key={index} 
                          href={proj.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors group"
                        >
                          <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-1">
                            {proj.titulo}
                          </span>
                          <Globe size={14} className="text-gray-400 group-hover:text-purple-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {idiomas.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-md flex items-center gap-2">
                      <Globe className="text-teal-500" size={18} /> Idiomas
                    </h3>
                    <ul className="space-y-2">
                      {idiomas.map((lang: any, index: number) => (
                        <li key={index} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                          <span className="text-gray-700 dark:text-gray-300">{lang.idioma}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 rounded-full">
                            {lang.nivel}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {certificacoes.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-md flex items-center gap-2">
                      <Award className="text-yellow-500" size={18} /> Certificações
                    </h3>
                    <ul className="space-y-2">
                      {certificacoes.map((cert: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0"></span>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>


            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg flex items-center gap-2">
                <Star size={18} className="text-yellow-500" /> Recomendações
                <span className="ml-2 text-sm text-gray-500">({recomendacoes.length})</span>
              </h3>
              <div className="space-y-3">
                {recomendacoes.length === 0 && (
                  <div className="text-sm text-gray-500">Nenhuma recomendação ainda.</div>
                )}
                {recomendacoes.length > 0 && (
                  (() => {
                    const shown = showAllRecomendacoes ? recomendacoes : recomendacoes.slice(0, 3);
                    return (
                      <>
                        {shown.map((r: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{r.deNome || 'Anônimo'}</div>
                                <div className="text-xs text-gray-500">{r.deId ? `ID ${r.deId}` : ''}</div>
                              </div>
                              <div className="text-xs text-gray-400">{r.criadoEm ? new Date(r.criadoEm).toLocaleString() : ''}</div>
                            </div>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{r.texto}</p>
                          </div>
                        ))}

                        {recomendacoes.length > 3 && (
                          <div className="pt-2">
                            <button
                              onClick={() => setShowAllRecomendacoes(prev => !prev)}
                              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {showAllRecomendacoes ? 'Ver menos' : `Ver mais (${recomendacoes.length - 3})`}
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()
                )}
              </div>
            </div>


            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                {habilidades.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide opacity-80">
                      Habilidades Técnicas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {habilidades.map((tech: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {softSkills.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide opacity-80 flex items-center gap-1">
                        <Star size={14} /> Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {softSkills.map((skill: string, index: number) => (
                          <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300 border border-orange-100 dark:border-orange-900/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {areasInteresse.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide opacity-80 flex items-center gap-1">
                        <Heart size={14} /> Interesses
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {areasInteresse.map((interesse: string, index: number) => (
                          <span key={index} className="px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            #{interesse}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
            </div>

          </div>
        </div>


        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F2226] flex gap-3 shrink-0">

            <button 
                onClick={() => onToggleConexao(usuario)}
                className={`
                    flex-1 py-3 rounded-xl font-bold text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2
                    ${isConectado 
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20 ring-2 ring-green-500/50" 
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:shadow-blue-500/25"}
                `}
            >
                {isConectado ? (
                    <>
                        <Check size={20} className="animate-in zoom-in duration-300" />
                        <span>Conectado</span>
                    </>
                ) : (
                    <>
                        <UserPlus size={20} />
                        <span>Conectar</span>
                    </>
                )}
            </button>


            <button 
              onClick={() => { window.dispatchEvent(new CustomEvent('open-chat', { detail: { usuario } })); onClose(); }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-[#2f3338] dark:hover:bg-[#3a3f47] text-gray-900 dark:text-white py-3 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>Mensagem</span>
            </button>

            <button
              onClick={() => { window.dispatchEvent(new CustomEvent('open-recomendar', { detail: { usuario } })); onClose(); }}
              className="flex-1 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/10 dark:hover:bg-yellow-800/10 text-yellow-700 dark:text-yellow-300 py-3 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Recomendar</span>
            </button>
        </div>

      </div>
    </div>
  );
}