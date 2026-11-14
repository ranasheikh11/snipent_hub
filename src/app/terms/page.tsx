import React from "react";
import { TermsHeader } from "@/frontend/components/legal/TermsHeader";
import { TermsAcceptanceAndContent } from "@/frontend/components/legal/TermsAcceptanceAndContent";
import { TermsThirdPartyServices } from "@/frontend/components/legal/TermsThirdPartyServices";
import { TermsLiabilityAndTermination } from "@/frontend/components/legal/TermsLiabilityAndTermination";

export const metadata = {
  title: "Terms of Service | SnippetHub",
  description: "SnippetHub Terms of Service and Conditions of Use",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F5F3FF] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 space-y-8">
        <TermsHeader />
        <TermsAcceptanceAndContent />
        <TermsThirdPartyServices />
        <TermsLiabilityAndTermination />
      </div>
    </main>
  );
}
