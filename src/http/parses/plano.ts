import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
}).array()

export type ListPlanoResponseType = z.infer<typeof listSchema>

export function listPlanoResponseParse(data: unknown): ListPlanoResponseType {
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

export type GetPlanoResponseType = z.infer<typeof getSchema>

export function getPlanoResponseParse(data: unknown): GetPlanoResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  nome: z.string(),
  valor: z.number(),
})

export type CreatePlanoRequestType = z.infer<typeof createSchema>

export function createPlanoRequestParse(data: unknown): CreatePlanoRequestType {
  return createSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
})

export type UpdatePlanoRequestType = z.infer<typeof updateSchema>

export function updatePlanoRequestParse(data: unknown): UpdatePlanoRequestType {
  return updateSchema.parse(data)
}