import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white border-3 border-black shadow-[6px_6px_0px_#000] p-6 md:p-10 space-y-6">
        <Link href="/" className="inline-block text-xs font-mono font-bold uppercase underline text-[#7C3AED]">
          ← Back to Vault
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tight">Terms of Service</h1>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Welcome to SnippetHub. By using our services to save, organize, and share code snippets, you agree not to post
          harmful, malicious, or copyrighted code that infringes on others&apos; rights.
        </p>
      </div>
    </main>
  );
}

