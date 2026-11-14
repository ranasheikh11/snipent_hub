import React from "react";

export const TermsLiabilityAndTermination: React.FC = () => {
  return (
    <section className="space-y-4 pt-2 border-t-2 border-black">
      <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-[#7C3AED] inline-block border border-black" />
        3. Disclaimer, Limitation of Liability & Termination
      </h2>
      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <div className="p-3 bg-white border border-black">
          <h3 className="font-bold uppercase text-[11px] mb-1">&quot;As Is&quot; Disclaimer</h3>
          <p className="text-neutral-600">
            SnippetHub is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that snippets or community tutorials will execute without bugs or runtime errors in your local environment.
          </p>
        </div>
        <div className="p-3 bg-white border border-black">
          <h3 className="font-bold uppercase text-[11px] mb-1">Account Termination</h3>
          <p className="text-neutral-600">
            We reserve the right to suspend or terminate accounts that violate our terms, perform scraping or automated abuse, or publish malicious code payloads.
          </p>
        </div>
        <div className="pt-2">
          <h3 className="font-bold uppercase text-[11px] mb-1">4. Contact & Inquiries</h3>
          <p className="text-neutral-600">
            For questions regarding these Terms of Service, contact us at{" "}
            <span className="font-mono font-bold text-black">rana6424sheikh@gmail.com</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

