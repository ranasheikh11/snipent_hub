"use client";

import React, { useState } from "react";
import { GithubIcon } from "@/frontend/components/ui/GithubIcon";
import { GoogleIcon } from "@/frontend/components/ui/GoogleIcon";
import { getApiUrl } from "@/frontend/config/api";
import { useAuth } from "@/frontend/hooks/useAuth";

interface Props {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export const SocialAuthButtons: React.FC<Props> = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { loginWithFirebaseGoogle } = useAuth();

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { signInWithPopup } = await import("firebase/auth");
      const { auth, googleProvider } = await import("@/frontend/config/firebase");
      const cred = await signInWithPopup(auth, googleProvider);
      const u = cred.user;
      const res = await loginWithFirebaseGoogle({
        uid: u.uid,
        email: u.email || "",
        name: u.displayName || "Google User",
        avatar: u.photoURL || "",
      });
      if (res.success) onSuccess();
      else onError(res.message || "Google login failed");
    } catch (err: any) {
      const code = err?.code || "";
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request" ||
        code === "auth/user-cancelled"
      ) {
        return; // User intentionally cancelled; no error needed
      }
      if (code === "auth/network-request-failed") {
        onError("Network connection issue. Please try again.");
      } else if (code === "auth/unauthorized-domain") {
        onError("Domain not authorized for Google Login.");
      } else {
        onError(err?.message?.replace(/^Firebase:\s*/i, "") || "Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <a
        href={getApiUrl("/api/auth/github")}
        className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-black text-white font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#EF4444] neo-press cursor-pointer"
      >
        <GithubIcon className="w-4 h-4" />
        <span>GitHub</span>
      </a>
      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#7C3AED] neo-press cursor-pointer hover:bg-neutral-50 disabled:opacity-50"
      >
        <GoogleIcon className="w-4 h-4" />
        <span>Google</span>
      </button>
    </div>
  );
};

