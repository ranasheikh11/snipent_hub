import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white border-3 border-black shadow-[6px_6px_0px_#000] p-6 md:p-10 space-y-6">
        <Link href="/" className="inline-block text-xs font-mono font-bold uppercase underline text-[#7C3AED]">
          ← Back to Vault
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-neutral-700 leading-relaxed">
          SnippetHub values your privacy. We only collect basic profile details (name, email, and avatar) provided by
          Google or GitHub OAuth solely to authenticate your account and persist your snippets and notes safely.
        </p>
        <div className="border-t-2 border-black pt-4">
          <h2 className="text-base font-bold uppercase mb-2">Data Protection</h2>
          <p className="text-xs text-neutral-600">
            We do not share, sell, or rent your personal data with any third parties. All access tokens and sensitive
            records are encrypted.
          </p>
        </div>
      </div>
    </main>
  );
}

