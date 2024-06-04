import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/styles";

export const typographyVariants = cva("text-xl", {
  variants: {
    variant: {
      h1: "lg: scroll-m-20 text-4xl font-extrabold tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      // blockquote: "mt-6 border-l-2 pl-6 italic",
      // list: "my-6 ml-6 list-disc [&>li]:mt-2",
    },
    affects: {
      default: "",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
    affects: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  removePMargin?: boolean;
}

/**
 * コピー元 \
 * https://github.com/shadcn-ui/ui/issues/315#issuecomment-1882739488
 */
const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, affects, removePMargin, ...props }, ref) => {
    const Comp = variant || "p";
    return (
      <Comp
        className={cn(
          typographyVariants({ variant, affects, className }),
          removePMargin && "[&:not(:first-child)]:mt-0",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Typography.displayName = "H1";

export default Typography;
