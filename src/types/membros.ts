// Tipos para os dados de membros da igreja

/**
 * Metadados dos dados
 */
export interface Metadata {
  total_pessoas: number;
  total_registros: number;
  data_geracao: string;
  versao: string;
}

/**
 * Dados pessoais de um membro
 */
export interface DadosPessoais {
  nome: string;
  tipo_pessoa: string;
  email: string | null;
  telefone: number | null;
  nascimento: string;
  idade: number;
  lgpd_aceito_em: string | null;
  estado_civil: string | null;
  setorizacao: string | null;
}

/**
 * Registro do histórico de um membro
 */
export interface RegistroHistorico {
  data: string;
  horario: string;
  ata: string | null;
  ocorrencia: string;
  tipo: string;
  anotacao: string | null;
  responsavel: string | null;
  origem_ocorrencia: string;
}

/**
 * Dados completos de um membro
 */
export interface MembroCompleto {
  dados_pessoais: DadosPessoais;
  historico: RegistroHistorico[];
}

/**
 * Dados simples de um membro (apenas dados pessoais)
 */
export interface MembroSimples {
  dados_pessoais: DadosPessoais;
  historico: RegistroHistorico[];
}

/**
 * Índices para busca rápida
 */
export interface Indices {
  por_nome: Record<string, string>;
  por_email: Record<string, string>;
  por_telefone: Record<string, string>;
  por_tipo_pessoa: Record<string, string[]>;
  por_setorizacao: Record<string, string[]>;
  por_estado_civil: Record<string, string[]>;
}

/**
 * Estatísticas dos dados
 */
export interface Estatisticas {
  por_tipo_pessoa: Record<string, number>;
  por_setorizacao: Record<string, number>;
  por_estado_civil: Record<string, number>;
}

/**
 * Estrutura completa dos dados de membros
 */
export interface DadosMembrosCompleto {
  metadata: Metadata;
  pessoas: Record<string, MembroCompleto>;
}

/**
 * Estrutura simples dos dados de membros
 */
export interface DadosMembrosSimples {
  metadata: Metadata;
  pessoas: Record<string, MembroSimples>;
}

/**
 * Estrutura dos índices dos dados
 */
export interface DadosMembrosIndices {
  metadata: Metadata;
  indices: Indices;
  estatisticas: Estatisticas;
}

/**
 * Filtros para busca de membros
 */
export interface FiltrosMembros {
  tipo?: string;
  setorizacao?: string;
  estadoCivil?: string;
  idadeMin?: number;
  idadeMax?: number;
}

/**
 * Resultado de busca de membro
 */
export interface ResultadoBuscaMembro {
  nome: string;
  tipo_pessoa: string;
  email: string | null;
  telefone: number | null;
  nascimento: string;
  idade: number;
  lgpd_aceito_em: string | null;
  estado_civil: string | null;
  setorizacao: string | null;
  totalRegistros: number;
}

/**
 * Dados paginados
 */
export interface DadosPaginados<T> {
  dados: T[];
  paginacao: {
    paginaAtual: number;
    totalPaginas: number;
    totalItens: number;
    itensPorPagina: number;
    temProxima: boolean;
    temAnterior: boolean;
  };
}

/**
 * Estatísticas gerais
 */
export interface EstatisticasGerais {
  totalPessoas: number;
  totalRegistros: number;
  porTipoPessoa: Record<string, number>;
  porSetorizacao: Record<string, number>;
  porEstadoCivil: Record<string, number>;
  dataGeracao: string;
}

/**
 * Tipos de pessoa possíveis
 */
export type TipoPessoa =
  | "Daikomyo"
  | "Komyo"
  | "Ohikari"
  | "Membro"
  | "Visitante"
  | "Sacerdote"
  | "Sacerdotisa";

/**
 * Estados civis possíveis
 */
export type EstadoCivil =
  | "Solteiro(a)"
  | "Casado(a)"
  | "Divorciado(a)"
  | "Viúvo(a)"
  | "União Estável";

/**
 * Setorizações possíveis
 */
export type Setorizacao =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J";

/**
 * Tipos de ocorrência no histórico
 */
export type TipoOcorrencia =
  | "OUTORGA DAIKOMYO"
  | "OUTORGA KOMYO"
  | "TRANSFERÊNCIA PARA OUTRA IGREJA"
  | "TRANSFERÊNCIA DE OUTRA IGREJA"
  | "BATISMO"
  | "CONFIRMAÇÃO"
  | "MATRIMÔNIO"
  | "FALECIMENTO"
  | "OUTRO";

/**
 * Tipos de registro no histórico
 */
export type TipoRegistro = "Normal" | "Especial" | "Urgente";
