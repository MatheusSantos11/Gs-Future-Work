import type { IUsuario } from "../data/usuario.model";


interface Props {
    usuario: IUsuario;
    onOpen: () => void;
}

export function ProfileCard({ usuario, onOpen }: Props) {
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 

    };
    return (
        <div 
            className="
                bg-[#1c1f24] border border-[#2a2d33] rounded-xl p-4 w-72 shrink-0 flex flex-col 
                gap-3 text-white cursor-pointer transition-colors duration-200 hover:border-blue-400
            "
            onClick={onOpen}
        >
            <img
                src={usuario.foto}
                alt={usuario.nome}
                className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
                <h3 className="text-lg font-semibold">{usuario.nome}</h3>
                <p className="text-sm text-blue-400">{usuario.cargo}</p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-3">{usuario.resumo}</p>
            </div>
            <div className="flex gap-2 mt-2">
                <button 
                    className="flex-1 bg-[#0A66C2] hover:bg-[#0b5ab0] text-white py-1.5 rounded-md text-sm font-medium"

                    onClick={handleButtonClick}
                >
                    Conectar
                </button>
                <button 
                    className="flex-1 bg-[#2f3338] hover:bg-[#3a3f47] text-white py-1.5 rounded-md text-sm font-medium"

                    onClick={handleButtonClick}
                >
                    Mensagem
                </button>
            </div>
        </div>
    );
}