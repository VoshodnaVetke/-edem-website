"use client";

import type { ReactNode } from "react";
import {
  articleListParam,
  followWithReturnPosition,
  useRestoreScrollPosition,
} from "../../article-list-state";

export function WorldArticleList({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  useRestoreScrollPosition();

  return (
    <ul
      className={className}
      role="list"
      onClick={(event) => followWithReturnPosition(event, articleListParam)}
    >
      {children}
    </ul>
  );
}
