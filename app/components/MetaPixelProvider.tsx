"use client";

import { useEffect } from "react";
import { loadMetaPixel } from "../lib/meta-pixel";

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadMetaPixel();
  }, []);

  return <>{children}</>;
}
