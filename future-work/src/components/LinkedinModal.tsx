import { X, Linkedin } from "lucide-react";


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function LinkedinModal({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1F2226] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200"><Linkedin size={14} className="text-blue-600" />Integrantes</h2>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto">
                    <a
                        href="https://www.linkedin.com/in/henrique-de-oliveira-gomes-a34891300?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                        target="_blank"
                        className="block p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                    >
                        Henrique de Oliveira Gomes
                    </a>

                    <a
                        href="https://www.linkedin.com/in/henrique-kolomyes-silveira-263018368?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        className="block p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                    >
                        Henrique Kolomyes Silveira
                    </a>

                    <a
                        href="https://www.linkedin.com/in/matheus-santos-809a43225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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
