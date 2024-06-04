import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>layout</div>
      <div className="flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/posts/optimistic">Optimistic</Link>
        <Link to="/posts/infinite">Infinite</Link>
        <Link to="/posts/infinite/auto">Infinite Auto Load</Link>
        <Link to="/posts/create">Create Post</Link>
      </div>
      <main className="mt-3">{children}</main>
    </>
  );
};
