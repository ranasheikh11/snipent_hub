import React from "react";

export const PrivacyDataUsage: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-[#7C3AED] inline-block border border-black" />
        3. How We Use and Protect Your Data
      </h2>
      <div className="space-y-3 text-xs leading-relaxed text-neutral-800">
        <p>Your information is used solely for core platform functionality:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
          <li><strong>Authentication & Security:</strong> Verifying your identity and safeguarding your workspace against unauthorized access.</li>
          <li><strong>Code Vault Operations:</strong> Saving, indexing, searching, and synchronizing your snippets, tags, and documentation notes.</li>
          <li><strong>Course Syncing:</strong> Organizing playlists into structured learning chapters with video progress tracking.</li>
          <li><strong>Security & Encryption:</strong> All sensitive tokens and data in transit are protected using industry-standard TLS/SSL encryption and secure MongoDB Atlas clusters.</li>
        </ul>
      </div>
    </section>
  );
};

