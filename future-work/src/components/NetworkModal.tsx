import type { IUsuario } from "../data/usuario.model";
import { X, UserMinus, MessageCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  conexoes: number[]; // IDs dos usuários conectados
  todosUsuarios: IUsuario[]; // Lista completa para buscar os dados pelo ID
  onDesconectar: (id: number) => void;
}

export function NetworkModal({ isOpen, onClose, conexoes, todosUsuarios, onDesconectar }: Props) {
  if (!isOpen) return null;

  // Filtra apenas os usuários que estão na lista de conexões
  const meusContatos = todosUsuarios.filter(u => conexoes.includes(u.id));

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1F2226] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">
        
        {/* Cabeçalho */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Minha Rede ({conexoes.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {meusContatos.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <p>Você ainda não se conectou com ninguém.</p>
              <p className="text-sm mt-1">Explore os perfis e clique em "Conectar"!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {meusContatos.map(user => (
                <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-transparent">
                  <img src={user.foto} alt={user.nome} className="w-10 h-10 rounded-full object-cover" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{user.nome}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.cargo}</p>
                  </div>

                  <div className="flex items-center gap-2">
                     {/* Botão Mensagem (Fictício) */}
                    <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors" title="Enviar Mensagem">
                       <MessageCircle size={18} />
                    </button>
                    {/* Botão Desconectar */}
                    <button 
                      onClick={() => onDesconectar(user.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                      title="Remover conexão"
                    >
                      <UserMinus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}