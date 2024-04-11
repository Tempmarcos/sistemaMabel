import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  data: z.string(),
  turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
  alunoId: z.string(),
}).array()

export type ListDiariaResponseType = z.infer<typeof listSchema>

export function listDiariaResponseParse(data: unknown): ListDiariaResponseType {
  return listSchema.parse(data)
}


const createSchema = z.object({
  alunoId: z.string(),
  data: z.string(),
  turno: z.enum(['MANHA', 'TARDE', 'NOITE']),
})

export type CreateDiariaRequestType = z.infer<typeof createSchema>

export function createDiariaRequestParse(data: unknown): CreateDiariaRequestType {
  return createSchema.parse(data)
}