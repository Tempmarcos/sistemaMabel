import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  data: z.string(),
}).array()

export type ListAtrasoResponseType = z.infer<typeof listSchema>

export function listAtrasoResponseParse(data: unknown): ListAtrasoResponseType {
  return listSchema.parse(data)
}


const createSchema = z.object({
  alunoId: z.string(),
  data: z.string(),
})

export type CreateAtrasoRequestType = z.infer<typeof createSchema>

export function createAtrasoRequestParse(data: unknown): CreateAtrasoRequestType {
  return createSchema.parse(data)
}