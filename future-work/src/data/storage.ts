export interface User {
  id: number;
  nome: string;
  foto: string;
  cargo: string;
  resumo: string;
  localizacao: string;
  area: string;
  habilidadesTecnicas: string;
  softSkills: string;
  idiomas: string;
  interesses: string;
  curso: string;
  instituicao: string;
  ano: string;
}

const STORAGE_KEY = 'user';

export function salvarUser(users: User[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Falha ao salvar user no localStorage:', err);
  }
}

export function carregarUser(): User[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as User[];
  } catch (err) {
    console.error('Falha ao carregar user do localStorage:', err);
    return [];
  }
}