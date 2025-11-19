import type { IUsuario } from "../data/usuario.model";
import { ProfileCard } from "./ProfileCard";

interface Props {
  usuarios: IUsuario[];
  abrirModal: (usuario: IUsuario) => void;
}

export function SugestoesPerfis({ usuarios, abrirModal }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
        Sugestões de Perfis para você
      </h2>
      
      {/* Lista de Cards com scroll horizontal */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
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