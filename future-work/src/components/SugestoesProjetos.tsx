import type { IProjetoFeed } from "../data/projeto.model";
import { ProjectCard } from "./ProjectCard";
import { Sparkles } from "lucide-react";

interface Props {
  projetos: IProjetoFeed[];
  abrirModal: (projeto: IProjetoFeed) => void;
}

export function SugestoesProjetos({ projetos, abrirModal }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors flex items-center gap-2">
        <Sparkles className="text-yellow-500" size={20} /> Projetos em Alta
      </h2>
      
      {/* REMOVIDO 'scrollbar-hide' DAQUI: A barra vai voltar a aparecer */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {projetos.map((projeto) => (
          <ProjectCard 
            key={projeto.id} 
            projeto={projeto} 
            onOpen={() => abrirModal(projeto)} 
          />
        ))}
      </div>
    </div>
  );
}