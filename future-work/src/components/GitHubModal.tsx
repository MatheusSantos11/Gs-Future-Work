import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function GitHubModal({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1F2226] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">

                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Integrantes</h2>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto">
                    <a
                        href="https://github.com/MatheusSantos11/Gs-Future-Work"
                        target="_blank"
                        className="text-blue-600 block p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                    >
                        Repositório do Projeto
                    </a>
                    <a
                        href="https://github.com/herqoliveira"
                        target="_blank"
                        className="block p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                    >
                        Henrique de Oliveira Gomes
                    </a>

                    <a
                        href="https://github.com/Kolomyess"
                        target="_blank"
                        className="block p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                    >
                        Henrique Kolomyes Silveira
                    </a>

                    <a
                        href="https://github.com/MatheusSantos11"
                        target="_blank"
                        className="block p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                    >
                        Matheus Santos de Oliveira
                    </a>
                </div>
            </div>
        </div>
    );
}
