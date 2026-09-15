import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "outline-light" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs tracking-caps uppercase font-medium transition-colors duration-200 rounded-[2px] disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid: "bg-[var(--color-fg)] text-white hover:bg-black",
  outline:
    "border border-[var(--color-fg)] text-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-white",
  "outline-light":
    "border border-white/70 text-white hover:bg-white hover:text-[var(--color-fg)]",
  ghost: "text-[var(--color-fg)] hover:opacity-60",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "solid", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  void _v;
  void _c;
  void _ch;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
