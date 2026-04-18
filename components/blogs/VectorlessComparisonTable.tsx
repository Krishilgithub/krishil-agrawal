import React from "react";

export const VectorlessComparisonTable = () => {
  const rows = [
    { dim: "Retrieval signal", vec: "Semantic meaning", kw: "Exact term matches", hyb: "Both", winner: "hyb" },
    { dim: "Query type strength", vec: "Conceptual, paraphrased, natural language", kw: "Exact IDs, codes, proper nouns, rare terms", hyb: "All query types", winner: "hyb" },
    { dim: "Infrastructure needed", vec: "Embedding model + vector DB + GPU (for large batches)", kw: "Inverted index only (Elasticsearch, OpenSearch)", hyb: "Both (but worth it)", winner: "none" },
    { dim: "Index build cost", vec: "High (embed every chunk)", kw: "Very low (tokenize + count)", hyb: "Medium-high", winner: "kw" },
    { dim: "Query latency", vec: "Medium (embed query → ANN search)", kw: "Very low (inverted index lookup)", hyb: "Medium (parallel)", winner: "kw" },
    { dim: "Explainability", vec: "Opaque — 'nearest neighbors' is not auditable", kw: "Transparent — every match traces to a term", hyb: "Partial (BM25 leg is transparent)", winner: "kw" },
    { dim: "Domain specialization", vec: "May need fine-tuning on rare vocabulary", kw: "Works immediately on any domain vocabulary", hyb: "Best of both", winner: "hyb" },
    { dim: "Vocabulary mismatch", vec: "Handles gracefully (semantics bridge the gap)", kw: "Fails when query words ≠ document words", hyb: "Hybrid compensates", winner: "vec" },
    { dim: "Multilingual", vec: "Works with multilingual embeddings", kw: "Requires per-language tokenization", hyb: "Depends on implementation", winner: "vec" },
    { dim: "Best enterprise use cases", vec: "Customer support, knowledge bases, general Q&A", kw: "Legal, finance, medical codes, product search", hyb: "All enterprise RAG at scale", winner: "hyb" },
  ];

  return (
    <div className="overflow-x-auto my-12 rounded-xl border border-[#252a38] bg-[#13161e] shadow-2xl">
      <table className="w-full text-sm font-outfit border-collapse text-left">
        <thead>
          <tr className="border-b border-[#252a38] bg-[#0d0f14]">
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#8e94a5]">Dimension</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#3b82f6]">Vector RAG</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#f97316]">Vectorless RAG (BM25)</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.1em] text-[#4fffb0]">Hybrid</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#252a38]/50">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-[#1a1e2a] transition-colors">
              <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{r.dim}</td>
              <td className={`px-6 py-4 leading-relaxed ${r.winner === 'vec' ? 'text-[#3b82f6] font-bold' : 'text-[#c8ccda]'}`}>{r.vec}</td>
              <td className={`px-6 py-4 leading-relaxed ${r.winner === 'kw' ? 'text-[#f97316] font-bold' : 'text-[#c8ccda]'}`}>{r.kw}</td>
              <td className={`px-6 py-4 leading-relaxed ${r.winner === 'hyb' ? 'text-[#4fffb0] font-bold' : 'text-[#c8ccda]'}`}>{r.hyb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
