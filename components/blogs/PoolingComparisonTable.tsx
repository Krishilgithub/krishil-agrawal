import React from "react";

export const PoolingComparisonTable = () => {
  const rows = [
    { strategy: "[CLS] token", works: "Take the first token's final vector", perf: "Moderate on STS benchmarks", when: "BERT fine-tuned on classification; tasks matching pre-training", badge: "Moderate", badgeColor: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
    { strategy: "Mean pooling", works: "Average all non-padding token vectors", perf: "Best on general semantic similarity", when: "Sentence-level similarity, RAG, semantic search — general default", badge: "Best", badgeColor: "text-[#4fffb0] bg-[#4fffb0]/10 border-[#4fffb0]/20" },
    { strategy: "Max pooling", works: "Max value per dimension across all tokens", perf: "Inconsistent — sensitive to outliers", when: "Rare — occasionally better for specific domain tasks", badge: "Inconsistent", badgeColor: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
    { strategy: "Weighted mean", works: "Mean weighted by attention mask + optional IDF", perf: "Good — suppresses common/stop words", when: "Keyword-heavy retrieval where rare terms matter more", badge: "Good", badgeColor: "text-[#4fffb0] bg-[#4fffb0]/10 border-[#4fffb0]/20" },
  ];

  return (
    <div className="overflow-x-auto my-12 rounded-xl border border-[#252a38] bg-[#13161e] shadow-2xl">
      <table className="w-full text-sm font-outfit border-collapse text-left">
        <thead>
          <tr className="border-b border-[#252a38] bg-[#0d0f14]">
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Strategy</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">How it works</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Performance</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Best used when</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#252a38]/50">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-[#1a1e2a] transition-colors">
              <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{r.strategy}</td>
              <td className="px-6 py-4 text-[#c8ccda] leading-relaxed">{r.works}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-[4px] text-[11px] uppercase tracking-widest font-bold border ${r.badgeColor}`}>
                  {r.badge}
                </span>
                <p className="text-[#8e94a5] mt-2 text-xs">{r.perf}</p>
              </td>
              <td className="px-6 py-4 text-[#c8ccda] leading-relaxed">{r.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
