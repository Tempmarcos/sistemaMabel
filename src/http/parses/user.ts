import { z } from "zod";

const listSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
  role: z.enum(['DIRETORA', 'ADMIN', 'PROF', 'CLIENTE']),
}).array()

export type ListUserResponseType = z.infer<typeof listSchema>

export function listUserResponseParse(data: unknown): ListUserResponseType {
  return listSchema.parse(data)
}


const getSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
  role: z.enum(['DIRETORA', 'ADMIN', 'PROF', 'CLIENTE']),
  created_at: z.date(),
})

export type GetUserResponseType = z.infer<typeof getSchema>

export function getUserResponseParse(data: unknown): GetUserResponseType {
  return getSchema.parse(data)
}


const createSchema = z.object({
  nome: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['DIRETORA', 'ADMIN', 'PROF', 'CLIENTE']),
})

export type CreateUserRequestType = z.infer<typeof createSchema>

export function createUserRequestParse(data: unknown): CreateUserRequestType {
  return createSchema.parse(data)
}


const createDBSchema = z.object({
  nome: z.string(),
  email: z.string(),
  password_hash: z.string(),
  role: z.enum(['DIRETORA', 'ADMIN', 'PROF', 'CLIENTE']),
})

export type CreateUserDBType = z.infer<typeof createDBSchema>

export function createUserDBParse(data: unknown): CreateUserDBType {
  return createDBSchema.parse(data)
}


const updateSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['DIRETORA', 'ADMIN', 'PROF', 'CLIENTE']),
})

export type UpdateUserRequestType = z.infer<typeof updateSchema>

export function updateUserRequestParse(data: unknown): UpdateUserRequestType {
  return updateSchema.parse(data)
}