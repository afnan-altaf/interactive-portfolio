import React from "react";
import { useOS } from "./OSProvider";

export function CRTFilter() {
  const { crtEnabled } = useOS();
  
  if (!crtEnabled) return null;

  return <div className="scanlines pointer-events-none fixed inset-0 z-[9999]" />;
}