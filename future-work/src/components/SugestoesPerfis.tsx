import type { IUsuario } from "../data/usuario.model";
import { ProfileCard } from "./ProfileCard";

interface Props {
  usuarios: IUsuario[];
}

export function SugestoesPerfis({ usuarios }: Props) {
  return (
    <section className="mt-8">
      <h2 className="text-white text-xl font-semibold mb-3">
        Sugestões de Perfis para você
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {usuarios.map((u) => (
          <ProfileCard key={u.id} usuario={u} />
        ))}
      </div>
    </section>
  );
}
