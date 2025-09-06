# Tipos TypeScript para Dados de Membros

Este documento explica como usar os tipos TypeScript criados para os dados JSON dos membros da igreja.

## Estrutura dos Tipos

### Arquivos Criados

1. **`src/types/membros.ts`** - Contém todas as interfaces e tipos TypeScript
2. **`src/actions/actions.ts`** - Atualizado com tipagem completa
3. **`src/examples/uso-tipos.ts`** - Exemplos de como usar os tipos

### Principais Interfaces

#### `DadosPessoais`

```typescript
interface DadosPessoais {
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
```

#### `RegistroHistorico`

```typescript
interface RegistroHistorico {
  data: string;
  horario: string;
  ata: string | null;
  ocorrencia: string;
  tipo: string;
  anotacao: string | null;
  responsavel: string | null;
  origem_ocorrencia: string;
}
```

#### `MembroSimples` e `MembroCompleto`

```typescript
interface MembroSimples {
  dados_pessoais: DadosPessoais;
  historico: RegistroHistorico[];
}

interface MembroCompleto {
  dados_pessoais: DadosPessoais;
  historico: RegistroHistorico[];
}
```

#### `ResultadoBuscaMembro`

```typescript
interface ResultadoBuscaMembro {
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
```

#### `FiltrosMembros`

```typescript
interface FiltrosMembros {
  tipo?: string;
  setorizacao?: string;
  estadoCivil?: string;
  idadeMin?: number;
  idadeMax?: number;
}
```

#### `DadosPaginados<T>`

```typescript
interface DadosPaginados<T> {
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
```

## Como Usar

### 1. Importar os Tipos

```typescript
import type {
  DadosPessoais,
  MembroSimples,
  ResultadoBuscaMembro,
  FiltrosMembros,
} from "@/types/membros";
```

### 2. Usar nas Funções

```typescript
import { getMemberByName, getMembersWithFilters } from "@/actions/actions";

// Buscar um membro específico
const membro: MembroSimples | null = await getMemberByName("Nome do Membro");

// Buscar com filtros
const filtros: FiltrosMembros = {
  tipo: "Daikomyo",
  setorizacao: "A",
  idadeMin: 30,
};

const resultados: ResultadoBuscaMembro[] = await getMembersWithFilters(filtros);
```

### 3. Verificação de Tipos

```typescript
if (membro) {
  // TypeScript sabe que membro não é null aqui
  console.log(membro.dados_pessoais.nome);

  // Verificar campos opcionais
  if (membro.dados_pessoais.email) {
    console.log(`Email: ${membro.dados_pessoais.email}`);
  }

  if (membro.dados_pessoais.setorizacao) {
    console.log(`Setorização: ${membro.dados_pessoais.setorizacao}`);
  }
}
```

## Funções Disponíveis

Todas as funções em `actions.ts` agora têm tipagem completa:

- `getAllMembers()`: `Promise<Record<string, MembroSimples>>`
- `getMemberByName(nome: string)`: `Promise<MembroSimples | null>`
- `getMembersByType(tipo: string)`: `Promise<ResultadoBuscaMembro[]>`
- `getMembersBySetorizacao(setorizacao: string)`: `Promise<ResultadoBuscaMembro[]>`
- `getMembersByEstadoCivil(estadoCivil: string)`: `Promise<ResultadoBuscaMembro[]>`
- `getMemberByEmail(email: string)`: `Promise<MembroSimples | null>`
- `getMemberByTelefone(telefone: string)`: `Promise<MembroSimples | null>`
- `getMembersWithFilters(filtros: FiltrosMembros)`: `Promise<ResultadoBuscaMembro[]>`
- `searchMembers(termo: string)`: `Promise<ResultadoBuscaMembro[]>`
- `getStatistics()`: `Promise<EstatisticasGerais>`
- `getMemberHistory(nome: string)`: `Promise<RegistroHistorico[] | null>`
- `getMemberHistoryByPeriod(nome: string, dataInicio: string, dataFim: string)`: `Promise<RegistroHistorico[] | null>`
- `getMembersWithMostRecords(limite: number)`: `Promise<ResultadoBuscaMembro[]>`
- `getAvailableTypes()`: `Promise<string[]>`
- `getAvailableSetorizacoes()`: `Promise<string[]>`
- `getAvailableEstadosCivis()`: `Promise<string[]>`
- `getPaginatedMembers(pagina: number, itensPorPagina: number)`: `Promise<DadosPaginados<ResultadoBuscaMembro>>`

## Tipos Union

Para campos que podem ter valores específicos, foram criados tipos union:

```typescript
type TipoPessoa =
  | "Daikomyo"
  | "Komyo"
  | "Ohikari"
  | "Membro"
  | "Visitante"
  | "Sacerdote"
  | "Sacerdotisa";

type EstadoCivil =
  | "Solteiro(a)"
  | "Casado(a)"
  | "Divorciado(a)"
  | "Viúvo(a)"
  | "União Estável";

type Setorizacao = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";
```

## Benefícios da Tipagem

1. **IntelliSense**: Autocompletar e sugestões de propriedades
2. **Verificação de Tipos**: Erros detectados em tempo de compilação
3. **Refatoração Segura**: Mudanças propagadas automaticamente
4. **Documentação**: Tipos servem como documentação viva
5. **Prevenção de Erros**: Evita erros comuns como acessar propriedades inexistentes

## Exemplos Práticos

Veja o arquivo `src/examples/uso-tipos.ts` para exemplos completos de como usar todos os tipos e funções.

## Campos Opcionais

Alguns campos podem ser `null` nos dados JSON:

- `email`: pode ser `null`
- `telefone`: pode ser `null`
- `lgpd_aceito_em`: pode ser `null`
- `estado_civil`: pode ser `null`
- `setorizacao`: pode ser `null`
- `ata`: pode ser `null`
- `anotacao`: pode ser `null`
- `responsavel`: pode ser `null`

Sempre verifique se esses campos não são `null` antes de usá-los:

```typescript
if (membro.dados_pessoais.email) {
  // Email existe, pode usar
  console.log(membro.dados_pessoais.email);
}
```
