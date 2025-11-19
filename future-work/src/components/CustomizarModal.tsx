import React, { useEffect, useState } from 'react';
import { X, MapPin,   FolderGit2,   Hash } from 'lucide-react';

// --- Tipos e funções de storage (mantive compatível com seu User) ---
export interface User {
  id: number;
  nome: string;
  foto: string; // base64 ou url
  cargo: string;
  resumo: string;
  localizacao: string;
  area: string;
  habilidadesTecnicas: string; // vírgula separados
  softSkills: string; // vírgula separados
  curso: string;
  instituicao: string;
  ano: string;
}

export function salvarUser(users: User[]) {
  localStorage.setItem('user', JSON.stringify(users));
}

export function carregarUser(): User[] {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : [];
}

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
    curso: '',
    instituicao: '',
    ano: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // escuta evento global para abrir o modal
  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener('open-customizar', handleOpenEvent);
    return () => window.removeEventListener('open-customizar', handleOpenEvent);
  }, []);

  useEffect(() => {
    setUsers(carregarUser());
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, foto: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

  function validate(f: User) {
    if (!f.nome.trim()) return 'Preencha o nome.';
    if (!f.cargo.trim()) return 'Preencha o cargo.';
    return null;
  }

  function handleSubmit(e?: React.FormEvent) {
    e && e.preventDefault();
    const v = validate(form);
    if (v) {
      setError(v);
      setSuccess(null);
      return;
    }

    setUsers((prev) => {
      const exists = prev.find((u) => u.id === form.id);
      let next: User[];
      if (exists) {
        next = prev.map((u) => (u.id === form.id ? form : u));
      } else {
        next = [form, ...prev];
      }
      salvarUser(next);
      setSuccess('Dados salvos com sucesso!');
      setError(null);
      return next;
    });
  }

  function handleEdit(id: number) {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    setForm(u);
    setError(null);
    setSuccess(null);
    setOpen(true);
    // scroll to top of modal content if needed
    const el = document.getElementById('customizar-modal-scroll');
    if (el) el.scrollTop = 0;
  }

  function handleDelete(id: number) {
    const next = users.filter((u) => u.id !== id);
    setUsers(next);
    salvarUser(next);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200 mt-15 pt-10">
      <div className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F2226] text-gray-900 dark:text-white">

        <button
          onClick={() => { setOpen(false); setError(null); setSuccess(null); }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10"
          aria-label="Fechar" 
        >
          <X size={20} className="text-gray-500 dark:text-gray-300" />
        </button>

        <div id="customizar-modal-scroll" className="p-6 max-h-[80vh] overflow-y-auto">

          {/* CABEÇALHO */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 shadow-sm">
              {form.foto ? (
                <img src={form.foto} alt={form.nome || 'foto'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">Sem foto</div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold leading-tight mb-1">Customizar perfil</h2>
              <p className="text-gray-500 dark:text-gray-400">Salve seus dados para usar em templates e formulários.</p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{form.localizacao || 'Localização'}</span>
                </div>
                {form.area && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold uppercase tracking-wide">
                    <Hash size={12} />
                    <span>{form.area}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2 mt-4 sm:mt-0">
              <label className="block text-xs text-gray-500 dark:text-gray-400">Foto (PNG/JPG)</label>
              <input type="file" accept="image/*" onChange={handleImage} className="mt-1 text-sm" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                <input name="nome" value={form.nome} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cargo</label>
                <input name="cargo" value={form.cargo} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resumo</label>
                <textarea name="resumo" value={form.resumo} onChange={handleChange} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Localização</label>
                <input name="localizacao" value={form.localizacao} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Área</label>
                <input name="area" value={form.area} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Habilidades Técnicas</label>
                <input name="habilidadesTecnicas" value={form.habilidadesTecnicas} onChange={handleChange} placeholder="ex: React,Node,SQL" className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Soft Skills</label>
                <input name="softSkills" value={form.softSkills} onChange={handleChange} placeholder="ex: Comunicação,Trabalho em equipe" className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Curso</label>
                <input name="curso" value={form.curso} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instituição</label>
                <input name="instituicao" value={form.instituicao} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ano</label>
                <input name="ano" value={form.ano} onChange={handleChange} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white dark:bg-[#121315]" />
              </div>
            </div>

            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}

            <div className="flex items-center gap-3">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors shadow">Salvar</button>
            </div>
          </form>

          {/* PERFIS SALVOS */}
          <section className="mt-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center gap-2">
              <FolderGit2 className="text-purple-500" size={18} /> Perfis salvos
            </h3>

            <div className="grid gap-3">
              {users.length === 0 && <div className="text-sm text-gray-500">Nenhum usuário salvo.</div>}
              {users.map((u) => (
                <div key={u.id} className="flex items-center gap-3 border rounded-lg p-3 bg-gray-50 dark:bg-white/5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border">
                    {u.foto ? <img src={u.foto} alt={u.nome} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs">Sem foto</div>}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{u.nome}</div>
                    <div className="text-xs text-gray-500">{u.cargo} • {u.localizacao}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(u.id)} className="px-3 py-1 text-xs rounded-lg border">Editar</button>
                    <button onClick={() => handleDelete(u.id)} className="px-3 py-1 text-xs rounded-lg border">Deletar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#131416] sticky bottom-0">
          <div className="p-4 max-w-3xl mx-auto">
            <button onClick={() => setOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg transition-colors shadow">Fechar</button>
          </div>
        </div>

      </div>
    </div>
  );
}
