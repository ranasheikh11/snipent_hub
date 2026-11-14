import React from "react";

export const TermsAcceptanceAndContent: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-[#7C3AED] inline-block border border-black" />
        1. Acceptance of Terms & User Responsibilities
      </h2>
      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <p>
          By creating an account or using SnippetHub, you affirm that you are at least 13 years of age and agree to these Terms. If you do not agree, you must not use our service.
        </p>
        <div className="space-y-2 pt-1">
          <div className="p-3 bg-[#F5F3FF] border border-black">
            <h3 className="font-bold uppercase text-[11px] mb-1">Code & Content Ownership</h3>
            <p className="text-neutral-600">
              You retain all ownership rights to the code snippets, documentation, comments, and notes you author. By publishing public snippets or courses, you grant SnippetHub a non-exclusive license to display, index, and share this content with the developer community.
            </p>
          </div>
          <div className="p-3 bg-[#F5F3FF] border border-black">
            <h3 className="font-bold uppercase text-[11px] mb-1">Acceptable Use & Prohibited Conduct</h3>
            <p className="text-neutral-600">
              You agree not to upload malicious code, malware, exploits, copyrighted material without permission, or sensitive production secrets (such as unencrypted API keys or private certificates).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

