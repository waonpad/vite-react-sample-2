import type { postSchema } from "@/features/posts/schemas";

export const appRoutes = {
  index: () => ({ value: "/", fullPath: "/" }) as const,
  all: () => ({ value: "*", fullPath: "*" }) as const,
  postsBase: () => ({ value: "/posts", fullPath: "/posts" }) as const,
  postsIndex: () => ({ value: "/", fullPath: `${appRoutes.postsBase().fullPath}/` }) as const,
  postsAll: () => ({ value: "*", fullPath: `${appRoutes.postsBase().fullPath}/*` }) as const,
  postsOptimistic: () => ({ value: "/optimistic", fullPath: `${appRoutes.postsBase().fullPath}/optimistic` }) as const,
  postsInfinite: () => ({ value: "/infinite", fullPath: `${appRoutes.postsBase().fullPath}/infinite` }) as const,
  postsInfiniteAuto: () =>
    ({ value: "/infinite/auto", fullPath: `${appRoutes.postsInfinite().fullPath}/auto` }) as const,
  postsCreate: () => ({ value: "/create", fullPath: `${appRoutes.postsBase().fullPath}/create` }) as const,
  postsDetail: () =>
    ({
      value: "/:id",
      fullPath: `${appRoutes.postsBase().fullPath}/:id`,
      generate: (id: typeof postSchema._type.id) => `${appRoutes.postsBase().fullPath}/${id}` as const,
    }) as const,
  postsEdit: () =>
    ({
      value: "/:id/edit",
      fullPath: `${appRoutes.postsDetail().fullPath}/edit`,
      generate: (id: typeof postSchema._type.id) => `${appRoutes.postsDetail().generate(id)}/edit` as const,
    }) as const,
} as const;

export type RouteName = ReturnType<(typeof appRoutes)[keyof typeof appRoutes]>["fullPath"];
