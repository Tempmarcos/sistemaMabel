import { z } from "zod";

const listSchema = z.object({
    id: z.string(),
    nome: z.string(),
    turma: z.object({
      id: z.string(),
      nome: z.string(),
      turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
      faixa: z.enum(['KIDS', 'TEENS']),
    }),
  }).array()

export type ListAlunoResponseType = z.infer<typeof listSchema>

export function listAlunoResponseParse(data: unknown): ListAlunoResponseType {
  return listSchema.parse(data)
}


const getSchema = z.object({
  id: z.string(),
  nome: z.string(),
  paiId: z.string(),
  maeId: z.string(),
  responsavelId: z.string(),

  pai: z.object({
    id: z.string(),
    nome: z.string(),
    trabalho: z.string(),
    funcao: z.string(),
    fone: z.string(),
    email: z.string(),
  }),
  mae: z.object({
    id: z.string(),
    nome: z.string(),
    trabalho: z.string(),
    funcao: z.string(),
    fone: z.string(),
    email: z.string(),
  }),
  responsavel: z.object({
    id: z.string(),
    nome: z.string(),
    rg: z.string(),
    cpf: z.string(),
    trabalho: z.string(),
    funcao: z.string(),
    fone_trabalho: z.string(),
    fone_pessoal: z.string(),
    email: z.string(),
    enderecoId: z.string(),
    endereco: z.object({
      id: z.string(),
      logradouro: z.string(),
      numero: z.string(),
      complemento: z.string(),
      cidade: z.string(),
      estado: z.string(),
      cep: z.string(),
    }),
  }),
  nacionalidade: z.string().optional(),
  nascimento: z.date(),
  religiao: z.string().optional(),
  escola: z.string(),
  serie: z.string(),
  endereco: z.object({
    id: z.string(),
    logradouro: z.string(),
    numero: z.string(),
    complemento: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string(),
  }),
  turmaId: z.string(),
  planoId: z.string(),
  valor: z.number(),
  almoco: z.boolean(),
  informacoes: z.string().optional(),
  medicamentos: z.string().optional(),
  emergenciaId: z.string(),
  emergencia: z.object({
    id: z.string(),
    nome: z.string(),
    fone: z.string(),
    local: z.string(),
    convenio: z.string(),
  }),
  nomeAutorizado1: z.string().optional(),
  rgAutorizado1: z.string().optional(),
  foneAutorizado1: z.string().optional(),
  nomeAutorizado2: z.string().optional(),
  rgAutorizado2: z.string().optional(),
  foneAutorizado2: z.string().optional(),

  dataIngresso: z.date(),

  created_at: z.date(),
})

export type GetAlunoResponseType = z.infer<typeof getSchema>

export function getAlunoResponseParse(data: unknown): GetAlunoResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  nome: z.string(),
  pai: z.object({
    nome: z.string(),
    trabalho: z.string().optional(),
    funcao: z.string().optional(),
    fone: z.string().optional(),
    email: z.string().optional(),
  }),
  mae: z.object({
    nome: z.string(),
    trabalho: z.string().optional(),
    funcao: z.string().optional(),
    fone: z.string().optional(),
    email: z.string().optional(),
  }),
  responsavel: z.object({
    nome: z.string(),
    rg: z.string(),
    cpf: z.string(),
    trabalho: z.string().optional(),
    funcao: z.string().optional(),
    fone_trabalho: z.string().optional(),
    fone_pessoal: z.string().optional(),
    email: z.string().optional(),
    endereco: z.object({
      logradouro: z.string(),
      numero: z.string(),
      complemento: z.string(),
      cidade: z.string(),
      estado: z.string(),
      cep: z.string(),
    }),
  }),
  nacionalidade: z.string().optional(),
  nascimento: z.date(),
  religiao: z.string().optional(),
  escola: z.string(),
  serie: z.string(),
  endereco: z.object({
    logradouro: z.string(),
    numero: z.string(),
    complemento: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string(),
  }),
  turma: z.object({
    id: z.string(),
  }),
  plano: z.object({
    id: z.string(),
  }),
  valor: z.number(),
  almoco: z.boolean(),
  informacoes: z.string(),
  medicamentos: z.string(),
  emergencia: z.object({
    nome: z.string(),
    fone: z.string().optional(),
    local: z.string().optional(),
    convenio: z.string().optional(),
  }),
  nomeAutorizado1: z.string().optional(),
  rgAutorizado1: z.string().optional(),
  foneAutorizado1: z.string().optional(),
  nomeAutorizado2: z.string().optional(),
  rgAutorizado2: z.string().optional(),
  foneAutorizado2: z.string().optional(),

  dataIngresso: z.date(),
})

export type CreateAlunoRequestType = z.infer<typeof createSchema>

export function createAlunoRequestParse(data: unknown): CreateAlunoRequestType {
  return createSchema.parse(data)
}


const createDBSchema = z.object({
  nome: z.string(),
})

export type CreateAlunoDBType = z.infer<typeof createDBSchema>

export function createAlunoDBParse(data: unknown): CreateAlunoDBType {
  return createDBSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  nome: z.string(),
  pai: z.object({
    nome: z.string(),
    trabalho: z.string().optional(),
    funcao: z.string().optional(),
    fone: z.string().optional(),
    email: z.string().optional(),
  }),
  mae: z.object({
    nome: z.string(),
    trabalho: z.string().optional(),
    funcao: z.string().optional(),
    fone: z.string().optional(),
    email: z.string().optional(),
  }),
  responsavel: z.object({
    nome: z.string(),
    rg: z.string(),
    cpf: z.string(),
    trabalho: z.string().optional(),
    funcao: z.string().optional(),
    fone_trabalho: z.string().optional(),
    fone_pessoal: z.string().optional(),
    email: z.string().optional(),
    endereco: z.object({
      logradouro: z.string(),
      numero: z.string(),
      complemento: z.string(),
      cidade: z.string(),
      estado: z.string(),
      cep: z.string(),
    }),
  }),
  nacionalidade: z.string().optional(),
  nascimento: z.date(),
  religiao: z.string().optional(),
  escola: z.string(),
  serie: z.string(),
  endereco: z.object({
    logradouro: z.string(),
    numero: z.string(),
    complemento: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string(),
  }),
  turma: z.object({
    id: z.string(),
  }),
  plano: z.object({
    id: z.string(),
  }),
  valor: z.number(),
  almoco: z.boolean(),
  informacoes: z.string().optional(),
  medicamentos: z.string().optional(),
  emergencia: z.object({
    nome: z.string(),
    fone: z.string().optional(),
    local: z.string().optional(),
    convenio: z.string().optional(),
  }),
  nomeAutorizado1: z.string().optional(),
  rgAutorizado1: z.string().optional(),
  foneAutorizado1: z.string().optional(),
  nomeAutorizado2: z.string().optional(),
  rgAutorizado2: z.string().optional(),
  foneAutorizado2: z.string().optional(),

  dataIngresso: z.date(),
})

export type UpdateAlunoRequestType = z.infer<typeof updateSchema>

export function updateAlunoRequestParse(data: unknown): UpdateAlunoRequestType {
  return updateSchema.parse(data)
}