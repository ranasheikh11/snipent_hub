"use client";

import { useEffect } from "react";
import { API_BASE_URL } from "@/frontend/config/api";

export function ApiInterceptor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const oauthToken = searchParams.get("token");
    if (oauthToken) {
      localStorage.setItem("devvault_token", oauthToken);
      searchParams.delete("token");
      searchParams.delete("auth");
      const newQuery = searchParams.toString();
      const newPath = window.location.pathname + (newQuery ? `?${newQuery}` : "");
      window.history.replaceState({}, "", newPath);
    }

    const originalFetch = window.fetch;

    window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
      const isApi =
        (typeof input === "string" && (input.startsWith("/api/") || input.startsWith("/api?"))) ||
        (input instanceof URL && input.pathname.startsWith("/api"));

      if (!isApi) return originalFetch(input, init);

      const token = typeof localStorage !== "undefined" ? localStorage.getItem("devvault_token") : null;
      const baseUrl = API_BASE_URL.replace(/\/+$/, "");
      let url = input;

      if (typeof input === "string") {
        const cleanPath = input.startsWith("/") ? input : `/${input}`;
        url = `${baseUrl}${cleanPath}`;
      } else {
        const cleanPath = input.pathname.startsWith("/") ? input.pathname : `/${input.pathname}`;
        url = new URL(`${baseUrl}${cleanPath}${input.search}`);
      }

      const headers = new Headers(init?.headers || {});
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const newInit: RequestInit = {
        ...init,
        headers,
        credentials: init?.credentials || "include",
      };

      return originalFetch(url, newInit);
    };
  }, []);

  return null;
}
