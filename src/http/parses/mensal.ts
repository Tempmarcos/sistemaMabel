import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  mes: z.date(),
  alunoId: z.string(),
  aluno: z.object({
    id: z.string(),
    nome: z.string(),
    valor: z.number(),
  }),
  diarias: z.number(),
  extras: z.number(),
  atrasos: z.number(),
  valor_total: z.number(),
  pago: z.boolean(),
}).array()

export type ListMensalResponseType = z.infer<typeof listSchema>

export function listMensalResponseParse(data: unknown): ListMensalResponseType {
  return listSchema.parse(data)
}


const getSchema = z.object({
  id: z.string(),
  mes: z.date(),
  aluno: z.object({
    id: z.string(),
    nome: z.string(),
    valor: z.number(),
  }),
  diarias: z.object({
    id: z.string(),
    data: z.date(),
    turno: z.string(),
  }).array(),
  extras: z.object({
    id: z.string(),
    nome: z.string(),
    valor: z.number(),
  }).array(),
  atrasos: z.object({
    id: z.string(),
    data: z.date(),
  }).array(),
  valor_total: z.number(),
  pago: z.boolean(),
})

export type GetMensalResponseType = z.infer<typeof getSchema>

export function getMensalResponseParse(data: unknown): GetMensalResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  mes: z.date(),
  aluno: z.object({
    id: z.string(),
  }),
  valor_total: z.number(),
})

export type CreateMensalRequestType = z.infer<typeof createSchema>

export function createMensalRequestParse(data: unknown): CreateMensalRequestType {
  return createSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  diarias: z.object({
    id: z.string(),
    data: z.date(),
    turno: z.string(),
  }).array().optional(),
  extras: z.object({
    id: z.string(),
    nome: z.string(),
    valor: z.number(),
  }).array().optional(),
  atrasos: z.object({
    id: z.string(),
    data: z.date(),
  }).array().optional(),
  pago: z.boolean().optional(),
})

export type UpdateMensalRequestType = z.infer<typeof updateSchema>

export function updateMensalRequestParse(data: unknown): UpdateMensalRequestType {
  return updateSchema.parse(data)
}