import type { IUsuario } from "../data/usuario.model";
import { ProfileCard } from "./ProfileCard";

interface Props {
    usuarios: IUsuario[];
    abrirModal: (u: IUsuario) => void;
}

export function SugestoesPerfis({ usuarios, abrirModal }: Props) {
    return (
        <section className="mt-8">
            <h2 className="text-white text-xl font-semibold mb-3 ">
                Sugestões de Perfis para você
            </h2>
            <div className="overflow-x-scroll w-md">
                <div className="flex gap-4">
                    {usuarios.map((u) => (
                        <div key={u.id} className="snap-start shrink-0">
                            <ProfileCard usuario={u} onOpen={() => abrirModal(u)} />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}