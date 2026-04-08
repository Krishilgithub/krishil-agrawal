import React from "react";

export const GraphRagDiagram2 = () => (
  <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-10 my-10 shadow-sm overflow-x-auto">
    <div className="font-outfit text-xs font-bold tracking-[0.15em] text-[#7a8099] uppercase mb-8 text-center">Figure 2 — Multi-Hop Query: "Find all companies connected to Person X within 2 hops"</div>
    <div className="min-w-[700px] flex justify-center">
        <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%", maxWidth:"700px", display:"block", margin:"0 auto"}}>
    <defs>
      <marker id="garr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#7c6fff" opacity="0.8"/>
      </marker>
    </defs>

    {/* Central node: Person X */}
    <circle cx="350" cy="150" r="40" fill="rgba(124,111,255,0.15)" stroke="#7c6fff" strokeWidth="2"/>
    <text x="350" y="146" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="'Outfit', sans-serif">Person X</text>
    <text x="350" y="162" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">START NODE</text>

    {/* Hop 1 nodes */}
    <circle cx="160" cy="80" r="34" fill="rgba(76,255,176,0.1)" stroke="rgba(76,255,176,0.5)" strokeWidth="1.5"/>
    <text x="160" y="76" textAnchor="middle" fill="#4fffb0" fontSize="10" fontWeight="700" fontFamily="'Outfit', sans-serif">Company A</text>
    <text x="160" y="90" textAnchor="middle" fill="#7a8099" fontSize="8" fontFamily="'Outfit', sans-serif">CEO of</text>

    <circle cx="540" cy="80" r="34" fill="rgba(76,255,176,0.1)" stroke="rgba(76,255,176,0.5)" strokeWidth="1.5"/>
    <text x="540" y="76" textAnchor="middle" fill="#4fffb0" fontSize="10" fontWeight="700" fontFamily="'Outfit', sans-serif">Company B</text>
    <text x="540" y="90" textAnchor="middle" fill="#7a8099" fontSize="8" fontFamily="'Outfit', sans-serif">Board member</text>

    <circle cx="160" cy="230" r="34" fill="rgba(76,255,176,0.1)" stroke="rgba(76,255,176,0.5)" strokeWidth="1.5"/>
    <text x="160" y="226" textAnchor="middle" fill="#4fffb0" fontSize="10" fontWeight="700" fontFamily="'Outfit', sans-serif">Startup C</text>
    <text x="160" y="240" textAnchor="middle" fill="#7a8099" fontSize="8" fontFamily="'Outfit', sans-serif">Founded</text>

    {/* Hop 1 arrows */}
    <line x1="316" y1="122" x2="196" y2="100" stroke="#7c6fff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#garr)"/>
    <line x1="386" y1="122" x2="510" y2="100" stroke="#7c6fff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#garr)"/>
    <line x1="318" y1="170" x2="194" y2="218" stroke="#7c6fff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#garr)"/>

    {/* Hop 2 nodes */}
    <circle cx="60" cy="150" r="28" fill="rgba(255,107,107,0.08)" stroke="rgba(255,107,107,0.35)" strokeWidth="1.5"/>
    <text x="60" y="146" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="700" fontFamily="'Outfit', sans-serif">Vendor D</text>
    <text x="60" y="160" textAnchor="middle" fill="#7a8099" fontSize="7.5" fontFamily="'Outfit', sans-serif">supplies A</text>

    <circle cx="640" cy="150" r="28" fill="rgba(255,107,107,0.08)" stroke="rgba(255,107,107,0.35)" strokeWidth="1.5"/>
    <text x="640" y="146" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="700" fontFamily="'Outfit', sans-serif">Investor E</text>
    <text x="640" y="160" textAnchor="middle" fill="#7a8099" fontSize="7.5" fontFamily="'Outfit', sans-serif">funds B</text>

    <circle cx="270" cy="268" r="28" fill="rgba(255,107,107,0.08)" stroke="rgba(255,107,107,0.35)" strokeWidth="1.5"/>
    <text x="270" y="264" textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="700" fontFamily="'Outfit', sans-serif">Product F</text>
    <text x="270" y="278" textAnchor="middle" fill="#7a8099" fontSize="7.5" fontFamily="'Outfit', sans-serif">built by C</text>

    {/* Hop 2 arrows */}
    <line x1="126" y1="102" x2="84" y2="130" stroke="rgba(255,107,107,0.5)" strokeWidth="1" strokeDasharray="4,3"/>
    <line x1="572" y1="102" x2="618" y2="130" stroke="rgba(255,107,107,0.5)" strokeWidth="1" strokeDasharray="4,3"/>
    <line x1="183" y1="252" x2="244" y2="263" stroke="rgba(255,107,107,0.5)" strokeWidth="1" strokeDasharray="4,3"/>

    {/* Legend */}
    <line x1="30" y1="290" x2="55" y2="290" stroke="#7c6fff" strokeWidth="2"/>
    <text x="60" y="294" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">Hop 1 (direct)</text>
    <line x1="160" y1="290" x2="185" y2="290" stroke="rgba(255,107,107,0.5)" strokeWidth="1.5" strokeDasharray="4,3"/>
    <text x="190" y="294" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">Hop 2 (indirect) — Vector RAG misses these entirely</text>
  </svg>
    </div>
  </div>
);
