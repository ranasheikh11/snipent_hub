import React from "react";

export const PrivacyUserRights: React.FC = () => {
  return (
    <section className="space-y-4 pt-2 border-t-2 border-black">
      <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-[#7C3AED] inline-block border border-black" />
        4. User Rights, Revocation & Deletion
      </h2>
      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <p>
          You have full control over your personal data and third-party account authorizations:
        </p>

        <div className="space-y-2">
          <div className="p-3 bg-white border border-black">
            <h3 className="font-bold uppercase text-[11px] mb-1">Revoking Google & YouTube Permissions</h3>
            <p className="text-neutral-600">
              You can revoke SnippetHub&apos;s access to your Google account at any time via the{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-[#7C3AED] hover:text-black"
              >
                Google Security Permissions Page
              </a>. Once revoked, SnippetHub immediately loses access to refresh tokens and YouTube API scopes.
            </p>
          </div>

          <div className="p-3 bg-white border border-black">
            <h3 className="font-bold uppercase text-[11px] mb-1">Data Deletion Requests</h3>
            <p className="text-neutral-600">
              To request permanent deletion of your SnippetHub account, code snippets, course notes, and all associated stored data, please email us directly at{" "}
              <a
                href="mailto:rana6424sheikh@gmail.com"
                className="font-bold underline text-[#7C3AED]"
              >
                rana6424sheikh@gmail.com
              </a>. Requests are completed within 7 business days.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="font-bold uppercase text-[11px] mb-1">5. Contact Information</h3>
          <p className="text-neutral-600">
            If you have questions or concerns regarding this Privacy Policy, please reach out to our team at{" "}
            <span className="font-mono font-bold text-black">rana6424sheikh@gmail.com</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

