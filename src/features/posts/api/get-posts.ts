import { createContract } from "@/lib/fetcher/contract";
import { contractFecter } from "@/lib/fetcher/contract/contract-fetcher";
import { z } from "zod";
import { postSchema } from "../schemas";

export const getPostsContract = createContract({
  path: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  response: z.array(postSchema),
});

export const getPosts = contractFecter(getPostsContract);
