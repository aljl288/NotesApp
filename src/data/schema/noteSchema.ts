import { z } from 'zod'

export const noteSchema = z.object({
  id: z.string(),
  createdAt: z.string(), // Adding createdAt as a string (ISO format)
  category: z.string(),
  noteContent: z.string(),
})

export type Note = z.infer<typeof noteSchema>
