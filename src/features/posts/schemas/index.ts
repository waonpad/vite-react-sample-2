import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

export type Post = typeof postSchema._type;

export const createPostInputSchema = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

export type CreatePostInput = typeof createPostInputSchema._type;
