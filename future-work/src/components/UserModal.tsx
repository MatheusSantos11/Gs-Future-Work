import type { IUsuario, IFormacao } from "../data/usuario.model";
// ADICIONEI "GraduationCap" AQUI NA LISTA DE IMPORTS 👇
import { X, MapPin, Briefcase, FolderGit2, Award, Globe, Star, Heart, Hash, GraduationCap } from "lucide-react"; 

interface Props {
  usuario: IUsuario | null;
  onClose: () => void;
}

export function UserModal({ usuario, onClose }: Props) {
  if (!usuario) return null;

  const nome = usuario.nome || "Usuário";
  const primeiroNome = nome.split(' ')?.[0] || nome;
  
  const habilidades = (usuario as any).habilidadesTecnicas || (usuario as any).habilidades || [];
  
  const softSkills = (usuario as any).softSkills || [];
  const experiencias = (usuario as any).experiencias || [];
  const projetos = (usuario as any).projetos || [];
  const certificacoes = (usuario as any).certificacoes || [];
  const idiomas = (usuario as any).idiomas || [];
  const areasInteresse = (usuario as any).areainteresses || [];
  const areaAtuacao = (usuario as any).area || "";

  const renderFormacao = () => {
    if (!usuario.formacao) return "Não informada";

    if (typeof usuario.formacao === 'string') {
      return <p className="text-gray-600 dark:text-gray-400">{usuario.formacao}</p>;
    }

    if (Array.isArray(usuario.formacao)) {
      return (usuario.formacao as IFormacao[]).map((item, index) => (
        <div key={index} className="mb-2">
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            {item.curso}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {item.instituicao} • {item.ano}
          </p>
        </div>
      ));
    }
    
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="
          bg-white dark:bg-[#1F2226] 
          text-gray-900 dark:text-white
          w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative
          border border-gray-200 dark:border-gray-700
          flex flex-col max-h-[90vh]
      ">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10"
        >
          <X size={24} className="text-gray-500 dark:text-gray-300" />
        </button>

        <div className="p-6 overflow-y-auto">
          
          {/* === CABEÇALHO === */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
            <img 
              src={usuario.foto || "https://via.placeholder.com/150"} 
              alt={nome} 
              className="w-24 h-24 rounded-2xl object-cover bg-gray-200 dark:bg-gray-700 shrink-0 shadow-sm"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold leading-tight">{nome}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mt-1">
                {usuario.cargo || "Sem cargo"}
              </p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                   <MapPin size={14} />
                   <span>{usuario.localizacao || "Localização não informada"}</span>
                </div>
                {areaAtuacao && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold uppercase tracking-wide">
                    <Hash size={12} />
                    <span>{areaAtuacao}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* === RESUMO === */}
            {usuario.resumo && (
              <div>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {usuario.resumo}
                </p>
              </div>
            )}

            {/* === EXPERIÊNCIAS === */}
            {experiencias.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                  <Briefcase className="text-blue-500" size={20} /> Experiência Profissional
                </h3>
                <div className="space-y-4 border-l-2 border-gray-200 dark:border-gray-700 ml-2 pl-4">
                  {experiencias.map((exp: any, index: number) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#1F2226]"></div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-md">{exp.cargo}</h4>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{exp.empresa}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({exp.inicio} - {exp.fim})
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {exp.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* === FORMAÇÃO === */}
                {usuario.formacao && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg flex items-center gap-2">
                      <GraduationCap className="text-green-500" size={20} /> Formação
                    </h3>
                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg">
                      {renderFormacao()}
                    </div>
                  </div>
                )}

                {/* === PROJETOS === */}
                {projetos.length > 0 && (
                   <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg flex items-center gap-2">
                      <FolderGit2 className="text-purple-500" size={20} /> Projetos
                    </h3>
                    <div className="space-y-2">
                      {projetos.map((proj: any, index: number) => (
                        <a 
                          key={index} 
                          href={proj.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors group"
                        >
                          <p className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                            {proj.titulo}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{proj.link}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* === IDIOMAS === */}
                {idiomas.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-md flex items-center gap-2">
                      <Globe className="text-teal-500" size={18} /> Idiomas
                    </h3>
                    <ul className="space-y-2">
                      {idiomas.map((lang: any, index: number) => (
                        <li key={index} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-800 pb-1 last:border-0">
                          <span className="text-gray-700 dark:text-gray-300">{lang.idioma}</span>
                          <span className="text-xs font-semibold px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded">
                            {lang.nivel}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* === CERTIFICAÇÕES === */}
                {certificacoes.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-md flex items-center gap-2">
                      <Award className="text-yellow-500" size={18} /> Certificações
                    </h3>
                    <ul className="space-y-2">
                      {certificacoes.map((cert: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0"></span>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* === ÁREA DE SKILLS === */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                
                {/* Habilidades Técnicas */}
                {habilidades.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide opacity-80">
                      Habilidades Técnicas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {habilidades.map((tech: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-200 dark:border-transparent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soft Skills */}
                {softSkills.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide opacity-80 flex items-center gap-1">
                       <Star size={14} /> Soft Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Áreas de Interesse */}
                {areasInteresse.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide opacity-80 flex items-center gap-1">
                       <Heart size={14} /> Interesses
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {areasInteresse.map((interesse: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
                        >
                          #{interesse}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* === RODAPÉ === */}
            <div className="pt-6 mt-2 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-[#1F2226] pb-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-600/20">
                    Conectar com {primeiroNome}
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}