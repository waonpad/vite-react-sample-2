import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>layout</div>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/posts/infinite">Infinite</Link>
        <Link to="/posts/infinite/auto">Infinite Auto Load</Link>
        <Link to="/posts/create">Create Post</Link>
      </div>
      <main
        style={{
          marginTop: 12,
        }}
      >
        {children}
      </main>
    </>
  );
};
