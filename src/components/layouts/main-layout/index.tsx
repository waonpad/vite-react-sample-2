import type { ReactNode } from "react";
import type { To } from "react-router-dom";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/elements/mode-toggle";
import Typography from "@/components/ui/typography";
import { env } from "@/constants/env";
import { appRoutes, type RouteName } from "@/routes/named-routes/routes";
import { useNamedRoutes } from "@/routes/named-routes/use-named-routes";

const navLinks = [
  { to: "/", label: "Home", routeName: appRoutes.index().fullPath },
  { to: "/posts", label: "Posts", routeName: appRoutes.postsIndex().fullPath },
  { to: "/posts/optimistic", label: "Optimistic", routeName: appRoutes.postsOptimistic().fullPath },
  { to: "/posts/infinite", label: "Infinite", routeName: appRoutes.postsInfinite().fullPath },
  { to: "/posts/infinite/auto", label: "Infinite Auto Load", routeName: appRoutes.postsInfiniteAuto().fullPath },
  { to: "/posts/create", label: "Create Post", routeName: appRoutes.postsCreate().fullPath },
] as const satisfies {
  to: To;
  label: string;
  routeName: RouteName;
}[];

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { route } = useNamedRoutes();

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background p-2">
        <div>
          <Typography affects="large">{env.VITE_APP_NAME}</Typography>
        </div>
        <div className="flex gap-3">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Typography affects="muted" className={route === link.routeName ? "text-primary" : ""}>
                {link.label}
              </Typography>
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </header>
      <main className="m-3">{children}</main>
    </>
  );
};
