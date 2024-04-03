import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  nome: z.string(),
  turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
  faixa: z.enum(['KIDS', 'TEENS']),
  prof: z.object({
    id: z.string(),
    nome: z.string(),
  }).array(),
}).array()

export type ListTurmaResponseType = z.infer<typeof listSchema>

export function listTurmaResponseParse(data: unknown): ListTurmaResponseType {
  return listSchema.parse(data)
}


const getSchema = z.object({
  id: z.string(),
  nome: z.string(),
  turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
  faixa: z.enum(['KIDS', 'TEENS']),
  prof: z.object({
    id: z.string(),
    nome: z.string(),
  }).array(),
  alunos: z.object({
    id: z.string(),
    nome: z.string(),
  }).array(),
})

export type GetTurmaResponseType = z.infer<typeof getSchema>

export function getTurmaResponseParse(data: unknown): GetTurmaResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  nome: z.string(),
  turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
  faixa: z.enum(['KIDS', 'TEENS']),
  prof: z.object({
    id: z.string(),
  }).array().optional(),
})

export type CreateTurmaRequestType = z.infer<typeof createSchema>

export function createTurmaRequestParse(data: unknown): CreateTurmaRequestType {
  return createSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  nome: z.string(),
  turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
  faixa: z.enum(['KIDS', 'TEENS']),
  prof: z.object({
    id: z.string(),
  }).array().optional(),
})

export type UpdateTurmaRequestType = z.infer<typeof updateSchema>

export function updateTurmaRequestParse(data: unknown): UpdateTurmaRequestType {
  return updateSchema.parse(data)
}