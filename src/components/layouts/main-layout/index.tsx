import type { ReactNode } from "react";
import type { To } from "react-router-dom";
import { Link } from "react-router-dom";
import Typography from "@/components/ui/typography";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/posts", label: "Posts" },
  { to: "/posts/optimistic", label: "Optimistic" },
  { to: "/posts/infinite", label: "Infinite" },
  { to: "/posts/infinite/auto", label: "Infinite Auto Load" },
  { to: "/posts/create", label: "Create Post" },
] as const satisfies {
  to: To;
  label: string;
}[];

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="sticky top-0 z-10 flex gap-3 border-b bg-background p-2">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            <Typography affects="large">{link.label}</Typography>
          </Link>
        ))}
      </header>
      <main className="m-3">{children}</main>
    </>
  );
};
