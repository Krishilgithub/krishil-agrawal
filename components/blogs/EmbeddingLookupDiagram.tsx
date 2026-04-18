import React from "react";

export const EmbeddingLookupDiagram = () => {
  return (
    <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-8 my-10 overflow-x-auto shadow-2xl">
      <div className="font-outfit text-[10px] text-[#7a8099] tracking-[0.1em] uppercase mb-6">
        Embedding table lookup — token ID → dense vector
      </div>
      <svg width="100%" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" className="min-w-[600px]">
        <defs>
          <marker id="pa-lookup" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M1 1L6 4L1 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#eab308] opacity-60"/>
          </marker>
        </defs>
        {/* Vocab column on left */}
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="30" y="26" letterSpacing="0.06">VOCAB (30,522 rows)</text>
        <rect x="20" y="34" width="140" height="26" rx="3" fill="#1e222d" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.4"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="11" fill="#f97316" x="30" y="52">0   → [CLS]</text>
        
        <rect x="20" y="62" width="140" height="26" rx="3" fill="transparent" stroke="#252a38" strokeWidth="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="11" fill="#7a8099" x="30" y="80">…</text>
        
        <rect x="20" y="90" width="140" height="26" rx="3" fill="#1e222d" stroke="#eab308" strokeWidth="0.5" strokeOpacity="0.6"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="11" fill="#eab308" x="30" y="108">4937 → "cat"</text>
        
        <rect x="20" y="118" width="140" height="26" rx="3" fill="transparent" stroke="#252a38" strokeWidth="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="11" fill="#7a8099" x="30" y="136">…</text>
        
        <rect x="20" y="146" width="140" height="26" rx="3" fill="transparent" stroke="#252a38" strokeWidth="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="11" fill="#7a8099" x="30" y="164">30521 → …</text>

        {/* Arrow from "cat" row */}
        <line x1="162" y1="103" x2="240" y2="103" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#pa-lookup)" className="text-[#eab308] opacity-50"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="195" y="96" textAnchor="middle">row 4937</text>

        {/* Dense vector output */}
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="244" y="74" letterSpacing="0.06">TOKEN VECTOR (768 dims)</text>
        <rect x="244" y="82" width="400" height="40" rx="4" fill="#1e222d" stroke="#eab308" strokeWidth="1" strokeOpacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="11" fill="#eab308" x="258" y="106">[ 0.312, -0.871, 0.044, 0.558, -0.209, 0.731, ... ] × 768</text>

        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#7a8099" x="244" y="148">This vector is not the final embedding.</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#7a8099" x="244" y="166">It is the raw input — before context, before attention.</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#7a8099" x="244" y="184">"cat" here is identical whether followed by "food" or "nap."</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#7a8099" x="244" y="202">Context comes from the transformer layers next.</text>
      </svg>
    </div>
  );
};
