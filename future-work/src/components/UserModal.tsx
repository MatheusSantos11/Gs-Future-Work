import type { IUsuario, IFormacao } from "../data/usuario.model";
import { X } from "lucide-react"; 

interface Props {
  usuario: IUsuario | null;
  onClose: () => void;
}

export function UserModal({ usuario, onClose }: Props) {
  if (!usuario) return null;

  const nome = usuario.nome || "Usuário";
  const primeiroNome = nome.split(' ')?.[0] || nome;
  const habilidades = (usuario as any).habilidades || []; 

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
          w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative
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
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={usuario.foto || "https://via.placeholder.com/150"} 
              alt={nome} 
              className="w-20 h-20 rounded-xl object-cover bg-gray-200 dark:bg-gray-700 shrink-0"
            />
            <div>
              <h2 className="text-2xl font-bold leading-tight">{nome}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                {usuario.cargo || "Sem cargo"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {usuario.resumo && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {usuario.resumo}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm uppercase tracking-wide opacity-80">
                  Localização
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {usuario.localizacao || "Não informada"}
                </p>
              </div>
              
              {usuario.formacao && (
                 <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide opacity-80">
                    Formação
                  </h3>
                  {renderFormacao()}
                </div>
              )}
            </div>

            {habilidades.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide opacity-80">
                  Habilidades Técnicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {habilidades.map((tech: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 mt-2 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-600/20">
                    Conectar com {primeiroNome}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}