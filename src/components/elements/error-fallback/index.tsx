import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";

// export const とするとエラーになるので、export function としている
export function ErrorFallback({ error }: FallbackProps) {
  const handleRefresh = () => {
    window.location.assign(window.location.origin);
  };

  return (
    <div>
      <h1>Something went wrong</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <div>{error.message}</div>
      <Button onClick={handleRefresh}>Refresh</Button>
    </div>
  );
}
