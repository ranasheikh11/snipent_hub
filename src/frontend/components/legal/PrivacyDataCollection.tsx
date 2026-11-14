import React from "react";

export const PrivacyDataCollection: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-[#7C3AED] inline-block border border-black" />
        1. Information We Collect
      </h2>
      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <p>
          We collect only the minimum required information necessary to provide our developer code-snippet storage, organization, and educational course features:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-[#F5F3FF] border border-black shadow-[2px_2px_0px_#000]">
            <h3 className="font-bold uppercase text-[11px] mb-1">A. Account Information</h3>
            <p className="text-neutral-600">
              When authenticating via Google OAuth or GitHub, we receive your name, email address, and profile picture to create your profile and authenticate your sessions.
            </p>
          </div>
          <div className="p-3 bg-[#F5F3FF] border border-black shadow-[2px_2px_0px_#000]">
            <h3 className="font-bold uppercase text-[11px] mb-1">B. Code & Content</h3>
            <p className="text-neutral-600">
              Code snippets, tags, programming language settings, notes, markdown documentation, and developer space submissions created or saved by you.
            </p>
          </div>
          <div className="p-3 bg-[#F5F3FF] border border-black shadow-[2px_2px_0px_#000]">
            <h3 className="font-bold uppercase text-[11px] mb-1">C. YouTube API Metadata (Read-Only)</h3>
            <p className="text-neutral-600">
              When using the Developer Course feature, we request read-only access to your public or unlisted YouTube playlist titles, descriptions, and video IDs to generate curriculum chapters.
            </p>
          </div>
          <div className="p-3 bg-[#F5F3FF] border border-black shadow-[2px_2px_0px_#000]">
            <h3 className="font-bold uppercase text-[11px] mb-1">D. Usage & Analytics</h3>
            <p className="text-neutral-600">
              Standard technical data including device type, browser user agent, IP address, and platform usage metrics to improve service stability and prevent abuse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
