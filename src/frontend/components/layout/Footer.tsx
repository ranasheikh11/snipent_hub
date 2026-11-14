import React from "react";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../../public/logo-full.png";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F5F3FF] border-t-2 border-black mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-300">
          <div className="sm:col-span-2">
            <div className="flex items-center mb-3">
              <Image src={logoImg} alt="SnippetHub" className="h-11 sm:h-12 w-auto object-contain" />
            </div>
            <p className="text-xs text-neutral-600 max-w-sm pl-3 border-l-2 border-[#7C3AED]">
              Save • Organize • Reuse • Share. Developer knowledge vault, YouTube-connected courses & open-source snippet hub.
            </p>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black mb-3">Explore</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700">
              <li><Link href="/" className="hover:text-[#7C3AED] underline-offset-2 hover:underline">Code Vault</Link></li>
              <li><Link href="/courses" className="hover:text-[#7C3AED] underline-offset-2 hover:underline">Developer Courses</Link></li>
              <li><Link href="/communities" className="hover:text-[#7C3AED] underline-offset-2 hover:underline">Developer Spaces</Link></li>
              <li><Link href="/blogs" className="hover:text-[#7C3AED] underline-offset-2 hover:underline">Articles & Notes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black mb-3">Legal & Safety</h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700">
              <li>
                <Link href="/privacy" className="hover:text-[#7C3AED] underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#7C3AED] underline-offset-2 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7C3AED] underline-offset-2 hover:underline"
                >
                  Google API Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7C3AED] underline-offset-2 hover:underline"
                >
                  YouTube Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div className="flex items-center gap-3">
            <span>&copy; 2026 SNIPPETHUB. ALL RIGHTS RESERVED.</span>
            <span>•</span>
            <Link href="/privacy" className="underline hover:text-[#7C3AED]">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="underline hover:text-[#7C3AED]">Terms</Link>
          </div>
          <span className="bg-[#7C3AED] text-white font-black px-3 py-1 border border-black uppercase text-[10px]">
            BUILT FOR LIFELONG DEVELOPERS
          </span>
        </div>
      </div>
    </footer>
  );
};
