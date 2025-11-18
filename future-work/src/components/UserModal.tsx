import type { IUsuario } from "../data/usuario.model";

interface Props {
  usuario: IUsuario | null;
  onClose: () => void;
}

export function UserModal({ usuario, onClose }: Props) {
  if (!usuario) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1b1d21] text-white rounded-xl p-6 w-[90%] max-w-lg shadow-xl relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={usuario.foto}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{usuario.nome}</h2>
            <p className="text-blue-300">{usuario.cargo}</p>
          </div>
        </div>

        {/* INFO */}
        <p className="mb-4 text-gray-300">{usuario.resumo}</p>

        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold text-white">Localização</h3>
            <p className="text-gray-300">{usuario.localizacao}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Habilidades Técnicas</h3>
            <p className="text-gray-300">
              {usuario.habilidadesTecnicas.join(", ")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Soft Skills</h3>
            <p className="text-gray-300">
              {usuario.softSkills.join(", ")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Formação</h3>
            {usuario.formacao.map((f, i) => (
              <p key={i} className="text-gray-300">
                {f.curso} – {f.instituicao} ({f.ano})
              </p>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-white">Idiomas</h3>
            {usuario.idiomas.map((i, j) => (
              <p key={j} className="text-gray-300">
                {i.idioma} – {i.nivel}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
