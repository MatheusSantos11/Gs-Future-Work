import type { IUsuario } from "../data/usuario.model";
import { ProfileCard } from "./ProfileCard";
import { Users } from "lucide-react"; 

interface Props {
  usuarios: IUsuario[];
  abrirModal: (usuario: IUsuario) => void;
}

export function SugestoesPerfis({ usuarios, abrirModal }: Props) {
  return (
    <div className="w-full"> {/* Adicionado w-full */}
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors flex items-center gap-2">
        <Users className="text-blue-500" size={20} /> Sugestões de Perfis para você
      </h2>
      
      {/* Adicionado w-full e max-w-full */}
      <div className="flex gap-4 overflow-x-auto pb-4 w-full max-w-full custom-scrollbar">
        {usuarios.map((usuario) => (
          <ProfileCard 
            key={usuario.id} 
            usuario={usuario} 
            onOpen={() => abrirModal(usuario)} 
          />
        ))}
      </div>
    </div>
  );
}