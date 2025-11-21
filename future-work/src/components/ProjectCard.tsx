import type { IProjetoFeed } from "../data/projeto.model";
import { Calendar, User } from "lucide-react";

interface Props {
    projeto: IProjetoFeed;
    onOpen: () => void; 
}

export function ProjectCard({ projeto, onOpen }: Props) {
    return (
        <div 
            onClick={onOpen} 
            className="
            bg-white dark:bg-[#202327] 
            border border-gray-200 dark:border-[#2a2d33] 
            rounded-xl p-4 w-80 shrink-0 flex flex-col 
            gap-3 cursor-pointer transition-all duration-200 
            hover:border-blue-400 dark:hover:border-blue-400
            shadow-sm hover:shadow-md group
        ">

            <div className="relative h-40 w-full overflow-hidden rounded-lg">
                <img
                    src={projeto.imagem}
                    alt={projeto.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
  
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(projeto.data).toLocaleDateString('pt-BR')}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {projeto.titulo}
                </h3>
                
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                    <User size={12} />
                    <span>por <span className="font-medium text-gray-700 dark:text-gray-300">{projeto.criador}</span></span>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {projeto.descricao}
                </p>
            </div>
            
            <div className="mt-auto pt-2">
                <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-[#2f3338] dark:hover:bg-[#3a3f47] text-gray-900 dark:text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalhes
                </button>
            </div>
        </div>
    );
}