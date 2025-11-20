import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import type { IUsuario } from '../data/usuario.model';
import { carregarUser } from '../data/storage';

export default function RecomendarModal() {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<IUsuario | null>(null);
  const [text, setText] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleOpen(e: any) {
      setTarget(e?.detail?.usuario || null);
      setText('');
      setSuccess(null);
      setOpen(true);
    }
    window.addEventListener('open-recomendar', handleOpen as EventListener);
    return () => window.removeEventListener('open-recomendar', handleOpen as EventListener);
  }, []);

  if (!open) return null;

  const enviar = () => {
    if (!target) return;
    const trimmed = (text || '').trim();
    if (!trimmed) {
      setError('A mensagem não pode ficar vazia.');
      return;
    }
    setError(null);
    const recommender = carregarUser()[0];
    const payload = {
      paraId: target.id,
      paraNome: target.nome,
      deId: recommender?.id ?? null,
      deNome: recommender?.nome ?? 'Anônimo',
      texto: trimmed,
      criadoEm: new Date().toISOString(),
    };

    try {
      const key = `recomendacoes_${target.id ?? 'global'}`;
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(payload);
      localStorage.setItem(key, JSON.stringify(arr));
      setSuccess('Recomendação enviada com sucesso!');
      setText('');
      setError(null);
      window.dispatchEvent(new CustomEvent('recomendacao-enviada', { detail: payload }));
    } catch (err) {
      console.error('Falha ao salvar recomendação', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
      <div className="bg-white dark:bg-[#1F2226] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-lg">Recomendar profissional</h3>
          <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-white/5"><X size={18} /></button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">Para:</div>
            <div className="font-bold text-gray-900 dark:text-white">{target?.nome}</div>
            <div className="text-xs text-gray-500">{target?.cargo}</div>
          </div>

          <label className="text-sm font-medium mb-2 block">Mensagem de recomendação</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2.5 bg-white dark:bg-[#121315] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />

          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          {success && <div className="mt-3 text-sm text-green-600">{success}</div>}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1F2226] flex gap-3">
          <button onClick={enviar} disabled={(text || '').trim().length === 0} className={`flex-1 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${((text || '').trim().length === 0) ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}><Check size={16} /> Enviar recomendação</button>
          <button onClick={() => setOpen(false)} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-semibold">Fechar</button>
        </div>
      </div>
    </div>
  );
}
