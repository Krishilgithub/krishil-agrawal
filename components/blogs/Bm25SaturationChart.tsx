import React from "react";

export const Bm25SaturationChart = () => {
  return (
    <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-8 my-10 overflow-x-auto shadow-2xl">
      <div className="font-outfit text-[10px] text-[#7a8099] tracking-[0.1em] uppercase mb-6">
        BM25 term frequency saturation — k₁ effect (typical k₁ = 1.2 to 2.0)
      </div>
      <svg width="100%" viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" className="min-w-[600px]">
        {/* Axes */}
        <line x1="60" y1="160" x2="640" y2="160" stroke="#252a38" strokeWidth="1"/>
        <line x1="60" y1="20" x2="60" y2="160" stroke="#252a38" strokeWidth="1"/>
        
        {/* Axis labels */}
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="340" y="180" textAnchor="middle">Term Frequency (how many times the word appears)</text>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="20" y="90" textAnchor="middle" transform="rotate(-90 20 90)">Score contribution</text>
        
        {/* TF-IDF line (linear) */}
        <line x1="60" y1="160" x2="640" y2="20" stroke="#7a8099" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="640" y="16" textAnchor="end">TF-IDF (linear)</text>
        
        {/* BM25 curve */}
        <polyline points="60,160 110,110 160,86 220,72 290,62 380,54 480,49 580,46 640,44" fill="none" stroke="#f97316" strokeWidth="2.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#f97316" x="640" y="42" textAnchor="end">BM25 (saturates)</text>
        
        {/* Annotation */}
        <line x1="220" y1="72" x2="220" y2="160" stroke="#f97316" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#f97316" x="228" y="145">saturation</text>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#f97316" x="228" y="155">begins</text>
        
        {/* X axis ticks */}
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="60" y="174" textAnchor="middle">0</text>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="220" y="174" textAnchor="middle">5</text>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="450" y="174" textAnchor="middle">20</text>
        <text fontFamily="'Roboto Mono',monospace" fontSize="10" fill="#7a8099" x="640" y="174" textAnchor="middle">50+</text>
      </svg>
    </div>
  );
};
