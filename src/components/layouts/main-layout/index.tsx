import type { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>layout</div>
      {children}
    </>
  );
};
