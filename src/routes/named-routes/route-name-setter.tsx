import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNamedRoutes } from "./use-named-routes";

type Props = {
  routeName: Parameters<ReturnType<typeof useNamedRoutes>["setRoute"]>[0];
};

export const RouteNameSetter = ({ routeName }: Props) => {
  const { setRoute } = useNamedRoutes();

  const { pathname } = useLocation();

  // これだとSuspenseが解除されてからしかできない
  // useMemoにするとreactが壊れる
  useEffect(() => {
    setRoute(routeName);
  }, [pathname]);

  return null;
};
