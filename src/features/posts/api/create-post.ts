import { createContract } from "@/lib/fetcher/contract";
import { contractFecter } from "@/lib/fetcher/contract/contract-fetcher";
import { createPostInputSchema, postSchema } from "../schemas";

export const createPostContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  body: createPostInputSchema,
  response: postSchema,
});

export const createPost = contractFecter(createPostContract);
