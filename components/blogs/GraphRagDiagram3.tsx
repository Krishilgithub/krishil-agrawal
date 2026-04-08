import React from "react";

export const GraphRagDiagram3 = () => (
  <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-10 my-10 shadow-sm overflow-x-auto">
    <div className="font-outfit text-xs font-bold tracking-[0.15em] text-[#7a8099] uppercase mb-8 text-center">Figure 3 — Hybrid RAG: Query Router Architecture</div>
    <div className="min-w-[700px] flex justify-center">
        <svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style={{width:"100%", maxWidth:"700px", display:"block", margin:"0 auto"}}>
    <defs>
      <marker id="harr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#c8ccda" opacity="0.6"/>
      </marker>
      <marker id="harr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#4fffb0" opacity="0.8"/>
      </marker>
      <marker id="harr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#7c6fff" opacity="0.8"/>
      </marker>
    </defs>

    {/* User Query */}
    <rect x="30" y="96" width="100" height="48" rx="5" fill="#1a1e2a" stroke="#252a38"/>
    <text x="80" y="116" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">User</text>
    <text x="80" y="132" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">Query</text>
    <line x1="130" y1="120" x2="176" y2="120" stroke="#c8ccda" strokeWidth="1.5" opacity="0.4" markerEnd="url(#harr)"/>

    {/* Router */}
    <rect x="178" y="84" width="110" height="72" rx="5" fill="#13161e" stroke="#ffd66b" strokeWidth="1.5"/>
    <text x="233" y="110" textAnchor="middle" fill="#ffd66b" fontSize="10" fontWeight="700" letterSpacing="1" fontFamily="'Outfit', sans-serif">QUERY</text>
    <text x="233" y="126" textAnchor="middle" fill="#ffd66b" fontSize="10" fontWeight="700" letterSpacing="1" fontFamily="'Outfit', sans-serif">ROUTER</text>
    <text x="233" y="146" textAnchor="middle" fill="#7a8099" fontSize="8.5" fontFamily="'Outfit', sans-serif">LLM classifier</text>

    {/* Arrow to Vector RAG */}
    <line x1="288" y1="104" x2="356" y2="72" stroke="#4fffb0" strokeWidth="1.5" opacity="0.7" markerEnd="url(#harr2)"/>
    <text x="316" y="80" fill="#4fffb0" fontSize="8.5" fontFamily="'Outfit', sans-serif">semantic</text>

    {/* Arrow to GraphRAG */}
    <line x1="288" y1="136" x2="356" y2="170" stroke="#7c6fff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#harr3)"/>
    <text x="312" y="162" fill="#7c6fff" fontSize="8.5" fontFamily="'Outfit', sans-serif">relationship</text>

    {/* Vector RAG Box */}
    <rect x="358" y="40" width="120" height="55" rx="5" fill="rgba(76,255,176,0.07)" stroke="rgba(76,255,176,0.4)"/>
    <text x="418" y="63" textAnchor="middle" fill="#4fffb0" fontSize="11" fontWeight="700" fontFamily="'Outfit', sans-serif">Vector RAG</text>
    <text x="418" y="82" textAnchor="middle" fill="#7a8099" fontSize="8.5" fontFamily="'Outfit', sans-serif">Qdrant · semantic sim</text>

    {/* GraphRAG Box */}
    <rect x="358" y="148" width="120" height="55" rx="5" fill="rgba(124,111,255,0.07)" stroke="rgba(124,111,255,0.4)"/>
    <text x="418" y="171" textAnchor="middle" fill="#7c6fff" fontSize="11" fontWeight="700" fontFamily="'Outfit', sans-serif">GraphRAG</text>
    <text x="418" y="190" textAnchor="middle" fill="#7a8099" fontSize="8.5" fontFamily="'Outfit', sans-serif">Neo4j · entity paths</text>

    {/* Merge */}
    <rect x="510" y="96" width="80" height="48" rx="5" fill="#1a1e2a" stroke="#252a38"/>
    <text x="550" y="116" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">Context</text>
    <text x="550" y="132" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">Merge</text>

    {/* Arrows to merge */}
    <line x1="478" y1="72" x2="508" y2="108" stroke="#4fffb0" strokeWidth="1" opacity="0.4" markerEnd="url(#harr2)"/>
    <line x1="478" y1="172" x2="508" y2="136" stroke="#7c6fff" strokeWidth="1" opacity="0.4" markerEnd="url(#harr3)"/>

    {/* LLM */}
    <rect x="614" y="96" width="72" height="48" rx="5" fill="#1a1e2a" stroke="#ffd66b" strokeWidth="1"/>
    <text x="650" y="116" textAnchor="middle" fill="#ffd66b" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="600">LLM</text>
    <text x="650" y="132" textAnchor="middle" fill="#7a8099" fontSize="8.5" fontFamily="'Outfit', sans-serif">GPT-4o</text>
    <line x1="590" y1="120" x2="612" y2="120" stroke="#c8ccda" strokeWidth="1.5" opacity="0.4" markerEnd="url(#harr)"/>
  </svg>
    </div>
  </div>
);
