"use client";

import React, { useEffect, useState } from "react";
import { PackageItem } from "@/frontend/types/discovery";
import { Package, Star, ArrowRight, Layers } from "lucide-react";

export const PackagesView: React.FC = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((d) => d.success && setPackages(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-12 text-center font-mono font-bold border-2 border-black bg-white">Loading Packages...</div>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border-3 border-black bg-white p-6 shadow-[5px_5px_0px_#000] flex flex-col justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase bg-[#7C3AED] text-white px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000]">
                  {pkg.technology}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {pkg.starsCount}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase text-black leading-tight mb-2">
                {pkg.title}
              </h3>
              <p className="text-xs font-mono text-neutral-600 line-clamp-3 mb-4">
                {pkg.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pkg.tags.map((t, idx) => (
                  <span key={`${t}-${idx}`} className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-black/20">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-500">By {pkg.author}</span>
              <button
                type="button"
                onClick={() => alert(`Package "${pkg.title}" ready to download or explore.`)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-black text-white text-xs font-mono font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#7C3AED] hover:bg-[#7C3AED] transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Get Kit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

