// utils/relatorioGeral.ts
"use server";

import dadosCompletos from "@/data/dados_relatorio_geral_completo.json";
import dadosSimples from "@/data/dados_relatorio_geral_simples.json";
import dadosIndices from "@/data/dados_relatorio_geral_indices.json";

// Tipos TypeScript
export interface DadosPessoais {
  codigo_cadastro: string;
  nome: string;
  tipo_cadastro: string;
  nascimento: string | null;
  endereco: {
    logradouro: string | null;
    numero: string | number | null;
    cep: string | null;
    complemento: string | null;
  };
  contato: {
    telefone_fixo: string | number | null;
    celular: string | number | null;
    email: string | null;
  };
  rede: string | null;
  status: string;
}

export interface Ocorrencia {
  data: string | null;
  descricao: string;
  data_formatada: string | null;
}

export interface Membro {
  codigo_cadastro: string;
  dados_pessoais: DadosPessoais;
  ocorrencias: Ocorrencia[];
  total_ocorrencias: number;
}

export interface MembroResumido {
  codigo_cadastro: string;
  nome: string;
  tipo_cadastro: string;
  nascimento: string | null;
  endereco: DadosPessoais["endereco"];
  contato: DadosPessoais["contato"];
  rede: string | null;
  status: string;
  total_ocorrencias: number;
}

export interface FiltrosMembros {
  tipo?: string;
  status?: string;
  rede?: string;
  cep?: string;
}

export interface Paginacao {
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  itensPorPagina: number;
  temProxima: boolean;
  temAnterior: boolean;
}

export interface DadosPaginados {
  dados: MembroResumido[];
  paginacao: Paginacao;
}

export interface Estatisticas {
  totalPessoas: number;
  totalRegistros: number;
  porTipoCadastro: Record<string, number>;
  porStatus: Record<string, number>;
  porRede: Record<string, number>;
  dataGeracao: string;
}

/**
 * Busca todos os membros do relatório geral
 * @returns {Promise<Record<string, Membro>>} Objeto com todos os membros
 */
export async function getAllMembers(): Promise<Record<string, Membro>> {
  return dadosSimples.pessoas as Record<string, Membro>;
}

/**
 * Busca todos os membros do relatório geral como array
 * @returns {Promise<Membro[]>} Array com todos os membros
 */
export async function getAllMembersAsArray(): Promise<Membro[]> {
  return Object.values(dadosSimples.pessoas as Record<string, Membro>);
}

/**
 * Busca um membro específico por código de cadastro
 * @param {string} codigo - Código de cadastro
 * @returns {Promise<Membro | null>} Dados do membro ou null se não encontrado
 */
export async function getMemberByCode(codigo: string): Promise<Membro | null> {
  if (!codigo) return null;

  const codigoStr = codigo.toString();
  return (dadosSimples.pessoas as Record<string, Membro>)[codigoStr] || null;
}

/**
 * Busca um membro específico por nome
 * @param {string} nome - Nome do membro (case insensitive)
 * @returns {Promise<Membro | null>} Dados do membro ou null se não encontrado
 */
export async function getMemberByName(nome: string): Promise<Membro | null> {
  if (!nome) return null;

  const nomeNormalizado = nome.toLowerCase().trim();

  // Buscar por correspondência exata primeiro
  for (const [codigo, dados] of Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  )) {
    if (dados.dados_pessoais.nome.toLowerCase() === nomeNormalizado) {
      return dados;
    }
  }

  // Buscar por correspondência parcial
  for (const [codigo, dados] of Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  )) {
    if (dados.dados_pessoais.nome.toLowerCase().includes(nomeNormalizado)) {
      return dados;
    }
  }

  return null;
}

/**
 * Busca membros por tipo de cadastro
 * @param {string} tipo - Tipo de cadastro (Ohikari, Shoko, Komyo, Daikomyo)
 * @returns {Promise<MembroResumido[]>} Array com os membros do tipo especificado
 */
export async function getMembersByType(
  tipo: string
): Promise<MembroResumido[]> {
  if (!tipo) return [];

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) => dados.dados_pessoais.tipo_cadastro === tipo)
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Busca membros por status
 * @param {string} status - Status (Ativo, Inativo)
 * @returns {Promise<MembroResumido[]>} Array com os membros do status especificado
 */
export async function getMembersByStatus(
  status: string
): Promise<MembroResumido[]> {
  if (!status) return [];

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) => dados.dados_pessoais.status === status)
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Busca membros por rede
 * @param {string} rede - Rede
 * @returns {Promise<MembroResumido[]>} Array com os membros da rede especificada
 */
export async function getMembersByRede(
  rede: string
): Promise<MembroResumido[]> {
  if (!rede) return [];

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) => dados.dados_pessoais.rede === rede)
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Busca membro por email
 * @param {string} email - Email do membro
 * @returns {Promise<Membro | null>} Dados do membro ou null se não encontrado
 */
export async function getMemberByEmail(email: string): Promise<Membro | null> {
  if (!email) return null;

  const emailNormalizado = email.toLowerCase().trim();

  for (const [codigo, dados] of Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  )) {
    if (
      dados.dados_pessoais.contato.email?.toLowerCase() === emailNormalizado
    ) {
      return dados;
    }
  }

  return null;
}

/**
 * Busca membro por telefone
 * @param {string} telefone - Telefone do membro
 * @returns {Promise<Membro | null>} Dados do membro ou null se não encontrado
 */
export async function getMemberByTelefone(
  telefone: string
): Promise<Membro | null> {
  if (!telefone) return null;

  const telefoneNormalizado = telefone.toString().trim();

  for (const [codigo, dados] of Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  )) {
    if (
      dados.dados_pessoais.contato.telefone_fixo?.toString() ===
        telefoneNormalizado ||
      dados.dados_pessoais.contato.celular?.toString() === telefoneNormalizado
    ) {
      return dados;
    }
  }

  return null;
}

/**
 * Busca membros com filtros múltiplos
 * @param {FiltrosMembros} filtros - Objeto com filtros
 * @returns {Promise<MembroResumido[]>} Array com os membros que atendem aos filtros
 */
export async function getMembersWithFilters(
  filtros: FiltrosMembros = {}
): Promise<MembroResumido[]> {
  const { tipo, status, rede, cep } = filtros;

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) => {
      // Filtro por tipo
      if (tipo && dados.dados_pessoais.tipo_cadastro !== tipo) return false;

      // Filtro por status
      if (status && dados.dados_pessoais.status !== status) return false;

      // Filtro por rede
      if (rede && dados.dados_pessoais.rede !== rede) return false;

      // Filtro por CEP
      if (cep && dados.dados_pessoais.endereco.cep !== cep) return false;

      return true;
    })
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Busca membros por termo (busca em nome, email, telefone, celular)
 * @param {string} termo - Termo de busca
 * @returns {Promise<MembroResumido[]>} Array com os membros que correspondem ao termo
 */
export async function searchMembers(termo: string): Promise<MembroResumido[]> {
  if (!termo) return [];

  const termoNormalizado = termo.toLowerCase().trim();

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) => {
      const nomeMatch = dados.dados_pessoais.nome
        ?.toLowerCase()
        .includes(termoNormalizado);
      const emailMatch = dados.dados_pessoais.contato.email
        ?.toLowerCase()
        .includes(termoNormalizado);
      const telefoneMatch = dados.dados_pessoais.contato.telefone_fixo
        ?.toString()
        .includes(termoNormalizado);
      const celularMatch = dados.dados_pessoais.contato.celular
        ?.toString()
        .includes(termoNormalizado);
      const codigoMatch = codigo.includes(termoNormalizado);

      return (
        nomeMatch || emailMatch || telefoneMatch || celularMatch || codigoMatch
      );
    })
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Obtém estatísticas gerais
 * @returns {Promise<Estatisticas>} Estatísticas dos membros
 */
export async function getStatistics(): Promise<Estatisticas> {
  return {
    totalPessoas: dadosIndices.metadata.total_pessoas,
    totalRegistros: dadosIndices.metadata.total_registros,
    porTipoCadastro: dadosIndices.estatisticas.por_tipo_cadastro,
    porStatus: dadosIndices.estatisticas.por_status,
    porRede: dadosIndices.estatisticas.por_rede,
    dataGeracao: dadosIndices.metadata.data_geracao,
  };
}

/**
 * Obtém ocorrências de um membro específico
 * @param {string} codigo - Código de cadastro do membro
 * @returns {Promise<Ocorrencia[] | null>} Array com as ocorrências ou null se não encontrado
 */
export async function getMemberOccurrences(
  codigo: string
): Promise<Ocorrencia[] | null> {
  const membro = await getMemberByCode(codigo);
  return membro ? membro.ocorrencias : null;
}

/**
 * Obtém ocorrências de um membro por período
 * @param {string} codigo - Código de cadastro do membro
 * @param {string} dataInicio - Data de início (DD/MM/YYYY)
 * @param {string} dataFim - Data de fim (DD/MM/YYYY)
 * @returns {Promise<Ocorrencia[] | null>} Array com as ocorrências filtradas ou null se não encontrado
 */
export async function getMemberOccurrencesByPeriod(
  codigo: string,
  dataInicio: string,
  dataFim: string
): Promise<Ocorrencia[] | null> {
  const ocorrencias = await getMemberOccurrences(codigo);
  if (!ocorrencias) return null;

  return ocorrencias.filter((ocorrencia) => {
    if (!ocorrencia.data) return false;

    const dataOcorrencia = new Date(
      ocorrencia.data.split("/").reverse().join("-")
    );
    const inicio = new Date(dataInicio.split("/").reverse().join("-"));
    const fim = new Date(dataFim.split("/").reverse().join("-"));

    return dataOcorrencia >= inicio && dataOcorrencia <= fim;
  });
}

/**
 * Obtém membros com mais ocorrências
 * @param {number} limite - Número máximo de membros a retornar (padrão: 10)
 * @returns {Promise<MembroResumido[]>} Array com os membros ordenados por quantidade de ocorrências
 */
export async function getMembersWithMostOccurrences(
  limite: number = 10
): Promise<MembroResumido[]> {
  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }))
    .sort((a, b) => b.total_ocorrencias - a.total_ocorrencias)
    .slice(0, limite);
}

/**
 * Obtém tipos de cadastro disponíveis
 * @returns {Promise<string[]>} Array com os tipos de cadastro únicos
 */
export async function getAvailableTypes(): Promise<string[]> {
  return Object.keys(dadosIndices.estatisticas.por_tipo_cadastro);
}

/**
 * Obtém status disponíveis
 * @returns {Promise<string[]>} Array com os status únicos
 */
export async function getAvailableStatus(): Promise<string[]> {
  return Object.keys(dadosIndices.estatisticas.por_status);
}

/**
 * Obtém redes disponíveis
 * @returns {Promise<string[]>} Array com as redes únicas
 */
export async function getAvailableRedes(): Promise<string[]> {
  return Object.keys(dadosIndices.estatisticas.por_rede);
}

/**
 * Obtém dados paginados
 * @param {number} pagina - Número da página (começando em 1)
 * @param {number} itensPorPagina - Itens por página (padrão: 20)
 * @returns {Promise<DadosPaginados>} Objeto com dados paginados
 */
export async function getPaginatedMembers(
  pagina: number = 1,
  itensPorPagina: number = 20
): Promise<DadosPaginados> {
  const todosMembros = Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  ).map(([codigo, dados]) => ({
    ...dados.dados_pessoais,
    total_ocorrencias: dados.total_ocorrencias,
  }));

  const totalItens = todosMembros.length;
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  return {
    dados: todosMembros.slice(inicio, fim),
    paginacao: {
      paginaAtual: pagina,
      totalPaginas,
      totalItens,
      itensPorPagina,
      temProxima: pagina < totalPaginas,
      temAnterior: pagina > 1,
    },
  };
}

/**
 * Busca membros por CEP
 * @param {string} cep - CEP para busca
 * @returns {Promise<MembroResumido[]>} Array com os membros do CEP especificado
 */
export async function getMembersByCEP(cep: string): Promise<MembroResumido[]> {
  if (!cep) return [];

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) => dados.dados_pessoais.endereco.cep === cep)
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Busca membros por logradouro
 * @param {string} logradouro - Logradouro para busca
 * @returns {Promise<MembroResumido[]>} Array com os membros do logradouro especificado
 */
export async function getMembersByLogradouro(
  logradouro: string
): Promise<MembroResumido[]> {
  if (!logradouro) return [];

  const logradouroNormalizado = logradouro.toLowerCase().trim();

  return Object.entries(dadosSimples.pessoas as Record<string, Membro>)
    .filter(([codigo, dados]) =>
      dados.dados_pessoais.endereco.logradouro
        ?.toLowerCase()
        .includes(logradouroNormalizado)
    )
    .map(([codigo, dados]) => ({
      ...dados.dados_pessoais,
      total_ocorrencias: dados.total_ocorrencias,
    }));
}

/**
 * Busca membros por múltiplos códigos
 * @param {string[]} codigos - Array de códigos de cadastro
 * @returns {Promise<Membro[]>} Array com os membros encontrados
 */
export async function getMembersByCodes(codigos: string[]): Promise<Membro[]> {
  if (!codigos || codigos.length === 0) return [];

  const membros: Membro[] = [];

  for (const codigo of codigos) {
    const membro = await getMemberByCode(codigo);
    if (membro) {
      membros.push(membro);
    }
  }

  return membros;
}

/**
 * Obtém estatísticas por tipo de cadastro
 * @returns {Promise<Record<string, { total: number; ativos: number; inativos: number }>>} Estatísticas detalhadas
 */
export async function getDetailedStatisticsByType(): Promise<
  Record<string, { total: number; ativos: number; inativos: number }>
> {
  const stats: Record<
    string,
    { total: number; ativos: number; inativos: number }
  > = {};

  for (const [codigo, dados] of Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  )) {
    const tipo = dados.dados_pessoais.tipo_cadastro;
    const status = dados.dados_pessoais.status;

    if (!stats[tipo]) {
      stats[tipo] = { total: 0, ativos: 0, inativos: 0 };
    }

    stats[tipo].total++;
    if (status === "Ativo") {
      stats[tipo].ativos++;
    } else if (status === "Inativo") {
      stats[tipo].inativos++;
    }
  }

  return stats;
}

/**
 * Obtém membros por faixa etária
 * @param {number} idadeMin - Idade mínima
 * @param {number} idadeMax - Idade máxima
 * @returns {Promise<MembroResumido[]>} Array com os membros na faixa etária
 */
export async function getMembersByAgeRange(
  idadeMin: number,
  idadeMax: number
): Promise<MembroResumido[]> {
  const membros: MembroResumido[] = [];

  for (const [codigo, dados] of Object.entries(
    dadosSimples.pessoas as Record<string, Membro>
  )) {
    if (dados.dados_pessoais.nascimento) {
      // Calcular idade baseada na data de nascimento
      const nascimento = new Date(dados.dados_pessoais.nascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();

      if (idade >= idadeMin && idade <= idadeMax) {
        membros.push({
          ...dados.dados_pessoais,
          total_ocorrencias: dados.total_ocorrencias,
        });
      }
    }
  }

  return membros;
}
