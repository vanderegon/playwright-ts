import { z } from 'zod';

export const getCreateBody = () => {
  return {
    "id": Date.now(),
    "category": {
      "id": 1,
      "name": "gato"
    },
    "name": "piti",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 1,
        "name": "verde"
      }
    ],
    "status": "available"
  }
}

export const getUpdateBody = (id) => {
  return {
    "id": id,
    "category": {
      "id": 2,
      "name": "cachorro"
    },
    "name": "cachorrinho"
  }
}

const Category = z.object({ id: z.number().int(), name: z.string() }).partial();

const Tag = z.object({ id: z.number().int(), name: z.string() }).partial();

export const getPetSchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),
    category: Category.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(Tag).optional(),
    status: z.enum(["available", "pending", "sold"]).optional(),
});
