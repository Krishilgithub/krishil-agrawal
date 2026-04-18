import React from "react";

export const EmbeddingPipelineDiagram = () => {
  return (
    <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-8 my-10 overflow-x-auto shadow-2xl">
      <div className="font-outfit text-[10px] text-[#7a8099] tracking-[0.1em] uppercase mb-5">
        Complete embedding pipeline — 6 stages from raw text to final vector
      </div>
      <svg width="100%" viewBox="0 0 780 80" xmlns="http://www.w3.org/2000/svg" className="min-w-[700px]">
        <defs>
          <marker id="pa-pipe" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M1 1L6 4L1 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#4fffb0] opacity-60"/>
          </marker>
        </defs>
        {/* Stage 1: Tokenize */}
        <rect x="0" y="18" width="108" height="44" rx="6" fill="#1e222d" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#f97316" x="54" y="35" textAnchor="middle" letterSpacing="0.06">TOKENIZE</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#e8eaf0" x="54" y="52" textAnchor="middle" fontWeight="500">Text → Tokens</text>

        <line x1="110" y1="40" x2="128" y2="40" stroke="currentColor" strokeWidth="1" markerEnd="url(#pa-pipe)" className="text-white opacity-20"/>

        {/* Stage 2: Lookup */}
        <rect x="130" y="18" width="108" height="44" rx="6" fill="#1e222d" stroke="#eab308" strokeWidth="1" strokeOpacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#eab308" x="184" y="35" textAnchor="middle" letterSpacing="0.06">LOOKUP</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#e8eaf0" x="184" y="52" textAnchor="middle" fontWeight="500">IDs → Vectors</text>

        <line x1="240" y1="40" x2="258" y2="40" stroke="currentColor" strokeWidth="1" markerEnd="url(#pa-pipe)" className="text-white opacity-20"/>

        {/* Stage 3: Positional */}
        <rect x="260" y="18" width="108" height="44" rx="6" fill="#1e222d" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#22d3ee" x="314" y="35" textAnchor="middle" letterSpacing="0.06">POSITION</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#e8eaf0" x="314" y="52" textAnchor="middle" fontWeight="500">+ Order Signal</text>

        <line x1="370" y1="40" x2="388" y2="40" stroke="currentColor" strokeWidth="1" markerEnd="url(#pa-pipe)" className="text-white opacity-20"/>

        {/* Stage 4: Attention x N */}
        <rect x="390" y="14" width="120" height="52" rx="6" fill="#1e222d" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.6"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#a78bfa" x="450" y="31" textAnchor="middle" letterSpacing="0.06">ATTENTION × N</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#e8eaf0" x="450" y="46" textAnchor="middle" fontWeight="500">Transformer Blocks</text>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#a78bfa" x="450" y="60" textAnchor="middle" opacity="0.8">Q·K·V + FFN</text>

        <line x1="512" y1="40" x2="530" y2="40" stroke="currentColor" strokeWidth="1" markerEnd="url(#pa-pipe)" className="text-white opacity-20"/>

        {/* Stage 5: Pool */}
        <rect x="532" y="18" width="108" height="44" rx="6" fill="#1e222d" stroke="#f472b6" strokeWidth="1" strokeOpacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#f472b6" x="586" y="35" textAnchor="middle" letterSpacing="0.06">POOL</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#e8eaf0" x="586" y="52" textAnchor="middle" fontWeight="500">Tokens → 1 Vec</text>

        <line x1="642" y1="40" x2="660" y2="40" stroke="currentColor" strokeWidth="1" markerEnd="url(#pa-pipe)" className="text-white opacity-20"/>

        {/* Stage 6: Output */}
        <rect x="662" y="18" width="108" height="44" rx="6" fill="#1e222d" stroke="#4fffb0" strokeWidth="1" strokeOpacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="9" fill="#4fffb0" x="716" y="35" textAnchor="middle" letterSpacing="0.06">OUTPUT</text>
        <text fontFamily="Inter,sans-serif" fontSize="12" fill="#e8eaf0" x="716" y="52" textAnchor="middle" fontWeight="500">[0.3, -0.7 …]</text>
      </svg>
    </div>
  );
};
