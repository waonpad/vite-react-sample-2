import type { ReactNode } from "react";
import { SetNamedRoutesProvider, useNamedRoutesCtx } from "./use-named-routes";

export const NamedRoutesProvider = ({ children }: { children: ReactNode }) => {
  const namedRoutes = useNamedRoutesCtx();

  return <SetNamedRoutesProvider value={namedRoutes}>{children}</SetNamedRoutesProvider>;
};
