import React from "react";

export const PrivacyGooglePolicy: React.FC = () => {
  return (
    <section className="space-y-4 p-4 bg-[#FDFBF7] border-2 border-black shadow-[3px_3px_0px_#000]">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-red-500 inline-block border border-black" />
        <h2 className="text-base font-black uppercase tracking-tight text-black">
          2. Google API Services & Limited Use Disclosure
        </h2>
      </div>

      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <div className="p-3 bg-white border border-black font-medium text-black">
          <strong>Google API Services User Data Policy Compliance:</strong><br />
          SnippetHub&apos;s use and transfer of information received from Google APIs to any other app will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-[#7C3AED] hover:text-black"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </div>

        <p>
          SnippetHub integrates with Google OAuth and YouTube Data API v3 to enable seamless authentication and course creation from public or unlisted playlists.
        </p>

        <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
          <li>
            <strong>YouTube API Services:</strong> By using our YouTube-connected course creation features, you agree to be bound by the{" "}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-[#7C3AED]"
            >
              YouTube Terms of Service
            </a>
            {" "}and the{" "}
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
            <strong>No Data Transfer or Sale:</strong> We strictly do not sell, rent, or transfer Google user data or YouTube metadata to third parties, data brokers, or advertising networks.
          </li>
          <li>
            <strong>No AI Model Training:</strong> Information received from Google APIs is never used to train or fine-tune generalized artificial intelligence or machine learning models.
          </li>
          <li>
            <strong>Scope of Access:</strong> We only request read-only access (<code className="bg-neutral-150 px-1 font-mono text-[11px]">youtube.readonly</code>) solely when you explicitly choose to import a playlist as an educational course module.
          </li>
        </ul>
      </div>
    </section>
  );
};

