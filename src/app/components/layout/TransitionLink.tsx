"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Don't intercept if:
    // - Command/Ctrl key is pressed (user wants to open in new tab)
    // - It's an external link
    // - Browser doesn't support View Transitions
    const isExternalLink = href.startsWith("http");
    const isModifiedClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

    if (isExternalLink || isModifiedClick) {
      return;
    }

    e.preventDefault();

    // Call any additional onClick handler
    if (onClick) {
      onClick();
    }

    // Check if View Transitions API is supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => {
        router.push(href);
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      router.push(href);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

