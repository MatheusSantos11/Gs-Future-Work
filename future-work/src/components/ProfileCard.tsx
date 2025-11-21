import type { IUsuario } from "../data/usuario.model";
import { Check, UserPlus } from "lucide-react";

interface Props {
    usuario: IUsuario;
    onOpen: () => void;

    isConectado: boolean;
    onToggleConexao: (usuario: IUsuario) => void;
}

export function ProfileCard({ usuario, onOpen, isConectado, onToggleConexao }: Props) {
    const handleConectar = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        onToggleConexao(usuario);
    };

    const handleMensagem = (e: React.MouseEvent) => {
        e.stopPropagation();

        window.dispatchEvent(new CustomEvent('open-chat', { detail: { usuario } }));
    };

    return (
        <div 
            className="
                bg-white dark:bg-[#202327] 
                border border-gray-200 dark:border-[#2a2d33] 
                rounded-xl p-4 w-72 shrink-0 flex flex-col 
                gap-3 cursor-pointer transition-colors duration-200 
                hover:border-blue-400 dark:hover:border-blue-400
                shadow-sm dark:shadow-none group
            "
            onClick={onOpen}
        >
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                    <img
                        src={usuario.foto}
                        alt={usuario.nome}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                        {usuario.nome}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 truncate">
                        {usuario.cargo}
                    </p>
                </div>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 h-[3.6em]">
                {usuario.resumo}
            </p>
            
            <div className="flex gap-2 mt-auto pt-2">

                <button 
                    className={`
                        flex-1 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1
                        ${isConectado 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-blue-600 hover:bg-blue-700 dark:bg-[#0A66C2] dark:hover:bg-[#0b5ab0] text-white"}
                    `}
                    onClick={handleConectar}
                >
                    {isConectado ? (
                        <> <Check size={14} /> Conectado </>
                    ) : (
                        <> <UserPlus size={14} /> Conectar </>
                    )}
                </button>
                
                <button 
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-[#2f3338] dark:hover:bg-[#3a3f47] dark:text-white py-1.5 rounded-md text-sm font-medium transition-colors"
                    onClick={handleMensagem}
                >
                    Mensagem
                </button>
            </div>
        </div>
    );
}