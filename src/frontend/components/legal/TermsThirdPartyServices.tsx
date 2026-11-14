import React from "react";

export const TermsThirdPartyServices: React.FC = () => {
  return (
    <section className="space-y-4 p-4 bg-[#FDFBF7] border-2 border-black shadow-[3px_3px_0px_#000]">
      <h2 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-red-500 inline-block border border-black" />
        2. Third-Party Integrations & YouTube API
      </h2>
      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <p>
          SnippetHub integrates with external third-party developer platforms. By using these features, you agree to comply with their respective service terms:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-neutral-700">
          <li>
            <strong>YouTube API Services:</strong> When you connect YouTube to create developer courses, your access is governed by the{" "}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-[#7C3AED]"
            >
              YouTube Terms of Service
            </a>
            {" "}and{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-[#7C3AED]"
            >
              Google Privacy Policy
            </a>.
          </li>
          <li>
            <strong>GitHub API & Gists:</strong> When exporting snippets to GitHub Gists, you are subject to the GitHub Terms of Service and developer API policies.
          </li>
          <li>
            <strong>Availability:</strong> We are not responsible for downtimes, outages, or API deprecations caused by third-party providers.
          </li>
        </ul>
      </div>
    </section>
  );
};

