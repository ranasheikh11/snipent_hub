import React from "react";
import Link from "next/link";

export const TermsHeader: React.FC = () => {
  return (
    <header className="space-y-4 pb-6 border-b-2 border-black">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase underline text-[#7C3AED] hover:text-black transition-colors"
      >
        ← Back to Vault
      </Link>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
          Terms of Service
        </h1>
        <span className="font-mono text-xs bg-[#7C3AED] text-white px-3 py-1 border border-black font-bold uppercase self-start">
          Effective: November 2026
        </span>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed font-medium">
        Welcome to SnippetHub! By accessing or using our website, developer tools, code vault, and educational platform, you agree to comply with and be bound by the following Terms and Conditions. Please review them carefully.
      </p>
    </header>
  );
};
