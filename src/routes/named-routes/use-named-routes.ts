import { useState } from "react";
import { appRoutes } from "./routes";
import type { RouteName } from "./routes";
import { createCtx } from "@/utils/create-ctx";

const [createdUseNamedRoutes, SetNamedRoutesProvider] = createCtx<ReturnType<typeof useNamedRoutesCtx>>();

export { SetNamedRoutesProvider };

export const useNamedRoutes = createdUseNamedRoutes;

export const useNamedRoutesCtx = () => {
  const [route, setRoute] = useState<RouteName>(appRoutes.index().fullPath);

  return {
    route,
    setRoute,
  };
};
