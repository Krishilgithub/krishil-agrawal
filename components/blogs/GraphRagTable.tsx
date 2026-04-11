import React from "react";

export const GraphRagTable = () => {
  const rows = [
    { dim: "Setup Complexity", vec: "Low — embed and store", rag: "High — LLM extraction needed", winner: "Vector" },
    { dim: "Index Cost", vec: "~$0.002 / 1K tokens", rag: "~$2-$8 / 1M tokens (GPT-4o)", winner: "Vector" },
    { dim: "Query Latency", vec: "20-80ms (ANN search)", rag: "100-600ms (graph traverse)", winner: "Vector" },
    { dim: "Multi-hop Reasoning", vec: "Poor — loses chain logic", rag: "Excellent — native traversal", winner: "Graph" },
    { dim: "Relationship Queries", vec: "Fails on implicit links", rag: "First-class citizen", winner: "Graph" },
    { dim: "Answer Traceability", vec: "Chunk references only", rag: "Full entity path", winner: "Graph" },
    { dim: "Open-Domain QA", vec: "Excellent", rag: "Moderate", winner: "Vector" },
    { dim: "Hallucination Risk", vec: "Moderate", rag: "Lower (entity-grounded)", winner: "Graph" },
    { dim: "Incremental Updates", vec: "Easy — add chunks", rag: "Requires re-extraction", winner: "Vector" },
    { dim: "Best For", vec: "FAQ, summarization, general QA", rag: "Legal, medical, financial, org data", winner: "Depends" },
  ];

  return (
    <div className="overflow-x-auto my-12 rounded-xl border border-[#252a38] bg-[#13161e] shadow-2xl">
      <table className="w-full text-sm font-outfit border-collapse text-left">
        <thead>
          <tr className="border-b border-[#252a38] bg-[#0d0f14]">
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Dimension</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Vector RAG</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">GraphRAG</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Winner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#252a38]/50">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-[#1a1e2a] transition-colors">
              <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{r.dim}</td>
              <td className="px-6 py-4 text-[#c8ccda] whitespace-pre-wrap leading-relaxed">{r.vec}</td>
              <td className="px-6 py-4 text-[#c8ccda] whitespace-pre-wrap leading-relaxed">{r.rag}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-[4px] text-[11px] uppercase tracking-widest font-bold border ${
                  r.winner === "Vector" ? "bg-[#0f2e21] text-[#4fffb0] border-[#4fffb0]/20" :
                  r.winner === "Graph" ? "bg-[#33240b] text-[#f59e0b] border-[#f59e0b]/20" :
                  "bg-[#2d2411] text-[#eab308] border-[#eab308]/20"
                }`}>
                  {r.winner}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
