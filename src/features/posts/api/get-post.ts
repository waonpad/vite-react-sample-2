import { createContract } from "@/lib/fetcher/contract";
import { contractFecter } from "@/lib/fetcher/contract/contract-fetcher";
import { z } from "zod";
import { postSchema } from "../schemas";

export const getPostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "GET",
  params: z.object({
    id: postSchema.shape.id,
  }),
  response: postSchema,
});

export const getPost = contractFecter(getPostContract);
