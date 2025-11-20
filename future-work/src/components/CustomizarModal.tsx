import React, { useEffect, useState } from 'react';
import { X, FolderGit2, Settings, Users, Award, Check } from 'lucide-react';
import { salvarUser, carregarUser } from '../data/storage';
import type { User } from '../data/storage';

export default function CustomizarModal() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(() => carregarUser());
  
  const [form, setForm] = useState<User>({ 
    id: Date.now(), 
    nome: '', 
    foto: '', 
    cargo: '', 
    resumo: '', 
    localizacao: '', 
    area: '', 
    habilidadesTecnicas: '', 
    softSkills: '', 
    idiomas: '',
    interesses: '',
    curso: '', 
    instituicao: '', 
    ano: '' 
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    function handleOpenEvent() { setOpen(true); }
    window.addEventListener('open-customizar', handleOpenEvent);
    return () => window.removeEventListener('open-customizar', handleOpenEvent);
  }, []);

  useEffect(() => { setUsers(carregarUser()); }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setForm((prev) => ({ ...prev, foto: String(reader.result) })); };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e?: React.FormEvent) {
    e && e.preventDefault();
    if (!form.nome.trim() || !form.cargo.trim()) { setError('Preencha nome e cargo.'); return; }
    setUsers((prev) => {
      const exists = prev.find((u) => u.id === form.id);
      const next: User[] = exists ? prev.map((u) => (u.id === form.id ? form : u)) : [form, ...prev];
      salvarUser(next);
      window.dispatchEvent(new CustomEvent('user-updated'));
      setSuccess('Salvo!'); setError(null);
      return next;
    });
  }

  function handleDelete(id: number) {
    const next = users.filter((u) => u.id !== id);
    setUsers(next); salvarUser(next); window.dispatchEvent(new CustomEvent('user-updated'));
  }

  // === NAVEGAÇÃO ENTRE MODAIS ===
  const abrirCertificados = () => {
    setOpen(false); 
    window.dispatchEvent(new CustomEvent('open-certificados'));
  };

  const abrirNetworks = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('open-networks'));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-[#1F2226] text-gray-900 dark:text-white rounded-xl shadow-2xl flex max-h-[90vh] border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* MENU LATERAL */}
        <div className="w-64 bg-gray-50 dark:bg-[#181a1d] border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2 md:flex">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 px-3">Configurações</h3>
            
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium text-sm">
                <Settings size={18} />
                Editar Perfil
            </button>
            
            {/* BOTÃO NETWORKS FUNCIONAL */}
            <button 
                onClick={abrirNetworks}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 font-medium text-sm transition-colors"
            >
                <Users size={18} />
                Networks
            </button>

            <button 
                onClick={abrirCertificados}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 font-medium text-sm transition-colors"
            >
                <Award size={18} />
                Certificados
            </button>
        </div>

        {/* ÁREA PRINCIPAL */}
        <div className="flex-1 flex flex-col min-w-0">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
                <h2 className="text-lg font-bold">Editar Perfil</h2>
                <button onClick={() => setOpen(false)}><X size={24} /></button>
            </div>

            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full hidden md:block">
                <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {/* CABEÇALHO DO FORM */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 shadow-sm ring-2 ring-gray-100 dark:ring-gray-700">
                        {form.foto ? <img src={form.foto} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-sm">Sem foto</div>}
                    </div>
                    <div className="flex-1 w-full text-center sm:text-left">
                        <label className="inline-block text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-2 rounded-lg cursor-pointer hover:brightness-95 transition font-medium mb-2">
                            Alterar Foto
                            <input type="file" accept="image/*" className="hidden" onChange={handleImage}/>
                        </label>
                        <p className="text-xs text-gray-400">Recomendado: PNG ou JPG quadrado.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div><label className="text-sm font-medium mb-1 block">Nome Completo</label><input name="nome" value={form.nome} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="text-sm font-medium mb-1 block">Cargo / Profissão</label><input name="cargo" value={form.cargo} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        
                        <div className="md:col-span-2"><label className="text-sm font-medium mb-1 block">Resumo / Bio</label><textarea name="resumo" value={form.resumo} onChange={handleChange} rows={3} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>

                        <div><label className="text-sm font-medium mb-1 block">Localização</label><input name="localizacao" value={form.localizacao} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="text-sm font-medium mb-1 block">Área de Atuação</label><input name="area" value={form.area} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        
                        <div><label className="text-sm font-medium mb-1 block">Habilidades Técnicas</label><input name="habilidadesTecnicas" value={form.habilidadesTecnicas} onChange={handleChange} placeholder="React, Node, SQL" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="text-sm font-medium mb-1 block">Soft Skills</label><input name="softSkills" value={form.softSkills} onChange={handleChange} placeholder="Comunicação, Liderança" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>

                        <div><label className="text-sm font-medium mb-1 block">Idiomas</label><input name="idiomas" value={form.idiomas} onChange={handleChange} placeholder="Inglês, Espanhol" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="text-sm font-medium mb-1 block">Interesses</label><input name="interesses" value={form.interesses} onChange={handleChange} placeholder="IA, Design, Jogos" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>

                        <div className="md:col-span-2 pt-4 border-t border-gray-100 dark:border-gray-700"><h4 className="font-bold text-sm text-gray-500 dark:text-gray-400 uppercase mb-3">Formação Acadêmica</h4></div>
                        
                        <div><label className="text-sm font-medium mb-1 block">Curso</label><input name="curso" value={form.curso} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="text-sm font-medium mb-1 block">Instituição</label><input name="instituicao" value={form.instituicao} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                        <div><label className="text-sm font-medium mb-1 block">Ano de Conclusão</label><input name="ano" value={form.ano} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 bg-white dark:bg-[#121315] focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                    </div>
                    
                    {error && <p className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800 text-sm">{error}</p>}
                    {success && <p className="text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800 text-sm">{success}</p>}
                    
                    <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                        <Check size={18} /> Salvar Alterações
                    </button>
                </form>
                
                {/* LISTA DE PERFIS */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><FolderGit2 size={18} className="text-purple-500"/> Perfis salvos neste navegador</h3>
                    <div className="grid gap-3">
                        {users.map(u => (
                            <div key={u.id} className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    {u.foto ? <img src={u.foto} alt={u.nome} className="w-full h-full object-cover"/> : <span className="text-xs">Foto</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{u.nome}</div>
                                    <div className="text-xs text-gray-500 truncate">{u.cargo}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setForm(u); setSuccess(null); setError(null); }} className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1.5 rounded-md font-medium hover:bg-blue-100 transition">Editar</button>
                                    <button onClick={() => handleDelete(u.id)} className="text-xs bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300 px-3 py-1.5 rounded-md font-medium hover:bg-red-100 transition">Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#131416] shrink-0 z-10">
             <button onClick={() => setOpen(false)} className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-xl font-bold text-lg transition-colors">
                Fechar
             </button>
        </div>
      </div>
    </div>
  );
}