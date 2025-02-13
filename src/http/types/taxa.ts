import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
}).array()

export type ListTaxaResponseType = z.infer<typeof listSchema>

export function listTaxaResponseParse(data: unknown): ListTaxaResponseType {
  return listSchema.parse(data)
}


const getSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
})

export type GetTaxaResponseType = z.infer<typeof getSchema>

export function getTaxaResponseParse(data: unknown): GetTaxaResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  nome: z.string(),
  valor: z.number(),
})

export type CreateTaxaRequestType = z.infer<typeof createSchema>

export function createTaxaRequestParse(data: unknown): CreateTaxaRequestType {
  return createSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  nome: z.string(),
  valor: z.number(),
})

export type UpdateTaxaRequestType = z.infer<typeof updateSchema>

export function updateTaxaRequestParse(data: unknown): UpdateTaxaRequestType {
  return updateSchema.parse(data)
}