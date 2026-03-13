"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
}

export default function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current)
      return;

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
        callback: (token: string) => onVerifyRef.current(token),
        "refresh-expired": "auto",
        appearance: "interaction-only",
      });
    } catch (err) {
      console.error("Turnstile render failed:", err);
    }
  }, []);

  useEffect(() => {
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Poll for turnstile to be available (loaded via layout script)
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval);
        renderWidget();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  return <div ref={containerRef} />;
}
