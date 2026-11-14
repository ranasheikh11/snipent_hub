import React from "react";
import { PrivacyHeader } from "@/frontend/components/legal/PrivacyHeader";
import { PrivacyDataCollection } from "@/frontend/components/legal/PrivacyDataCollection";
import { PrivacyGooglePolicy } from "@/frontend/components/legal/PrivacyGooglePolicy";
import { PrivacyDataUsage } from "@/frontend/components/legal/PrivacyDataUsage";
import { PrivacyUserRights } from "@/frontend/components/legal/PrivacyUserRights";

export const metadata = {
  title: "Privacy Policy | SnippetHub",
  description: "SnippetHub Privacy Policy and Google API Services User Data Policy Compliance Statement",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F3FF] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 space-y-8">
        <PrivacyHeader />
        <PrivacyDataCollection />
        <PrivacyGooglePolicy />
        <PrivacyDataUsage />
        <PrivacyUserRights />
      </div>
    </main>
  );
}
