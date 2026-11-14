import React from "react";
import Link from "next/link";

export const PrivacyHeader: React.FC = () => {
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
          Privacy Policy
        </h1>
        <span className="font-mono text-xs bg-[#7C3AED] text-white px-3 py-1 border border-black font-bold uppercase self-start">
          Effective: November 2026
        </span>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed font-medium">
        SnippetHub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and handling your personal data with transparency. This Privacy Policy outlines what information we collect, how we use it, our strict adherence to Google API policies, and your rights over your data.
      </p>
    </header>
  );
};

