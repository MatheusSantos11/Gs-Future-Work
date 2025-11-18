
export interface IExperiencia {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string; 
  descricao: string;
}


export interface IFormacao {
  curso: string;
  instituicao: string;
  ano: number;
}


export interface IProjeto {
  titulo: string;
  link: string;
}


export interface IIdioma {
  idioma: string;
  nivel: string;
}


export interface IUsuario {
  id: number;
  nome: string;
  foto: string;
  cargo: string;
  resumo: string;
  localizacao: string;
  area: string;
  habilidadesTecnicas: string[];
  softSkills: string[];
  experiencias: IExperiencia[];
  formacao: IFormacao[];
  projetos: IProjeto[];
  certificacoes: string[];
  idiomas: IIdioma[];
  areainteresses: string[];
}

