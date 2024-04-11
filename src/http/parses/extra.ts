import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
}).array()

export type ListExtraResponseType = z.infer<typeof listSchema>

export function listExtraResponseParse(data: unknown): ListExtraResponseType {
  return listSchema.parse(data)
}


const getSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
  alunos: z.object({
    id: z.string(),
    nome: z.string(),
  }).array(),
})

export type GetExtraResponseType = z.infer<typeof getSchema>

export function getExtraResponseParse(data: unknown): GetExtraResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  nome: z.string(),
  valor: z.number(),
})

export type CreateExtraRequestType = z.infer<typeof createSchema>

export function createExtraRequestParse(data: unknown): CreateExtraRequestType {
  return createSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
})

export type UpdateExtraRequestType = z.infer<typeof updateSchema>

export function updateExtraRequestParse(data: unknown): UpdateExtraRequestType {
  return updateSchema.parse(data)
}