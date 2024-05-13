import { createContract } from "@/lib/fetcher/contract";
import { contractFecter } from "@/lib/fetcher/contract/contract-fetcher";
import { z } from "zod";
import { postSchema } from "../schemas";

export const deletePostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts/{id}",
  method: "DELETE",
  params: z.object({
    id: postSchema.shape.id,
  }),
  response: z.null(),
});

export const deletePost = contractFecter(deletePostContract);
