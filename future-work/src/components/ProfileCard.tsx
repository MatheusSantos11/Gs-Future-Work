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
                bg-white dark:bg-[#202327] 
                border border-gray-200 dark:border-[#2a2d33] 
                rounded-xl p-4 w-72 shrink-0 flex flex-col 
                gap-3 cursor-pointer transition-colors duration-200 
                hover:border-blue-400 dark:hover:border-blue-400
                shadow-sm dark:shadow-none
            "
            onClick={onOpen}
        >
            <img
                src={usuario.foto}
                alt={usuario.nome}
                className="w-14 h-14 rounded-lg object-cover bg-gray-200 dark:bg-gray-700"
            />
            <div>
                {/* Nome: Preto no Claro, Branco no Escuro */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {usuario.nome}
                </h3>
                
                {/* Cargo: Azul mais forte no claro, Azul mais claro no escuro */}
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    {usuario.cargo}
                </p>
                
                {/* Resumo: Cinza médio no claro, Cinza claro no escuro */}
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
                    {usuario.resumo}
                </p>
            </div>
            
            <div className="flex gap-2 mt-2">
                <button 
                    className="
                        flex-1 
                        bg-blue-600 hover:bg-blue-700 
                        dark:bg-[#0A66C2] dark:hover:bg-[#0b5ab0] 
                        text-white py-1.5 rounded-md text-sm font-medium transition-colors
                    "
                    onClick={handleButtonClick}
                >
                    Conectar
                </button>
                
                {/* Botão Mensagem: Cinza claro no modo Light, Escuro no modo Dark */}
                <button 
                    className="
                        flex-1 
                        bg-gray-200 hover:bg-gray-300 text-gray-700
                        dark:bg-[#2f3338] dark:hover:bg-[#3a3f47] dark:text-white 
                        py-1.5 rounded-md text-sm font-medium transition-colors
                    "
                    onClick={handleButtonClick}
                >
                    Mensagem
                </button>
            </div>
        </div>
    );
}