import { useState, useEffect } from 'react';
import { X, Award, Plus, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CertificadosModal({ isOpen, onClose }: Props) {
  const [certificados, setCertificados] = useState<string[]>([]);
  const [novoCertificado, setNovoCertificado] = useState("");

  // Carregar do localStorage
  useEffect(() => {
    if (isOpen) {
      const salvos = localStorage.getItem('meus-certificados');
      if (salvos) {
        setCertificados(JSON.parse(salvos));
      } else {
        setCertificados(["AWS Certified Cloud Practitioner", "Meta Front-End Developer"]);
      }
    }
  }, [isOpen]);

  const atualizarTudo = (novaLista: string[]) => {
    setCertificados(novaLista);
    localStorage.setItem('meus-certificados', JSON.stringify(novaLista));
    // Avisa a sidebar para atualizar o número
    window.dispatchEvent(new CustomEvent('certificados-updated'));
  };

  const adicionar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCertificado.trim()) return;
    
    const novaLista = [novoCertificado, ...certificados];
    atualizarTudo(novaLista);
    setNovoCertificado("");
  };

  const remover = (index: number) => {
    const novaLista = certificados.filter((_, i) => i !== index);
    atualizarTudo(novaLista);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1F2226] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">
        
        {/* === CABEÇALHO (AGORA PRETO/PADRÃO) === */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-[#1F2226]">
          <div className="flex items-center gap-2">
            {/* Ícone Azul para destacar */}
            <Award size={24} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Meus Certificados</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Corpo */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          
          {/* Formulário */}
          <form onSubmit={adicionar} className="flex gap-2 mb-6">
            <input 
                type="text" 
                value={novoCertificado}
                onChange={(e) => setNovoCertificado(e.target.value)}
                placeholder="Adicionar novo certificado..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-gray-50 dark:bg-[#121315] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-400"
                autoFocus
            />
            <button 
                type="submit"
                disabled={!novoCertificado.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors"
            >
                <Plus size={20} />
            </button>
          </form>

          {/* Lista */}
          <div className="space-y-3">
            {certificados.length === 0 ? (
                <div className="text-center py-8 text-gray-400 flex flex-col items-center">
                    <Award size={40} className="mb-3 opacity-20" />
                    <p className="text-sm">Sua lista está vazia.</p>
                </div>
            ) : (
                certificados.map((cert, index) => (
                    <div key={index} className="group flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-md shrink-0">
                                <Award size={16} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-200 truncate text-sm">{cert}</span>
                        </div>
                        <button 
                            onClick={() => remover(index)}
                            className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                            title="Remover"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))
            )}
          </div>

        </div>
        
        {/* Footerzinho com contador */}
        <div className="p-3 bg-gray-50 dark:bg-[#181a1d] border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total: {certificados.length} certificados</p>
        </div>

      </div>
    </div>
  );
}