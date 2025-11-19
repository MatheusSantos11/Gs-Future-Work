import type { IProjetoFeed } from "../data/projeto.model";
import { X, Calendar, User, ExternalLink, Share2 } from "lucide-react";

interface Props {
  projeto: IProjetoFeed | null;
  onClose: () => void;
}

export function ProjectModal({ projeto, onClose }: Props) {
  if (!projeto) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="
          bg-white dark:bg-[#1F2226] 
          text-gray-900 dark:text-white
          w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative
          border border-gray-200 dark:border-gray-700
          flex flex-col max-h-[90vh]
      ">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto">
          
          {/* Imagem de Capa (Bem grande) */}
          <div className="h-64 sm:h-80 w-full relative">
            <img 
              src={projeto.imagem} 
              alt={projeto.titulo} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="text-white">
                     <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">{projeto.titulo}</h2>
                     <div className="flex items-center gap-4 text-sm opacity-90">
                        <span className="flex items-center gap-1"><User size={16}/> {projeto.criador}</span>
                        <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(projeto.data).toLocaleDateString('pt-BR')}</span>
                     </div>
                </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Descrição */}
            <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Sobre o Projeto</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {projeto.descricao}
                </p>
            </div>

            {/* Área de Ações */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20">
                    <ExternalLink size={20} />
                    Ver Projeto Completo
                </button>
                
                <button className="sm:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#2f3338] dark:hover:bg-[#3a3f47] text-gray-900 dark:text-white py-3.5 px-6 rounded-xl font-semibold transition-colors">
                    <Share2 size={20} />
                    Compartilhar
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}