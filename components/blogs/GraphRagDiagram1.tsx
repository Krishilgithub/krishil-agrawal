import React from "react";

export const GraphRagDiagram1 = () => (
  <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-10 my-10 shadow-sm overflow-x-auto">
    <div className="font-outfit text-xs font-bold tracking-[0.15em] text-[#7a8099] uppercase mb-8 text-center">Figure 1 — Retrieval Architecture: Vector RAG vs GraphRAG</div>
    <div className="min-w-[700px] flex justify-center">
        <svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" style={{width:"100%", maxWidth:"780px", display:"block", margin:"0 auto"}}>
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#4fffb0" opacity="0.7"/>
      </marker>
      <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#7c6fff" opacity="0.7"/>
      </marker>
    </defs>

    {/* LEFT SIDE — Vector RAG */}
    <text x="190" y="26" textAnchor="middle" fill="#4fffb0" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="'Outfit', sans-serif">VECTOR RAG</text>

    {/* Docs */}
    <rect x="30" y="44" width="100" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="80" y="58" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">Raw Docs</text>
    <text x="80" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">PDF / Text</text>

    {/* Chunker */}
    <rect x="148" y="44" width="84" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="190" y="58" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">Chunker</text>
    <text x="190" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">512 tokens</text>

    {/* Embedder */}
    <rect x="250" y="44" width="84" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="292" y="58" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">Embedder</text>
    <text x="292" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">text-embed-3</text>

    {/* Vector DB */}
    <rect x="352" y="44" width="84" height="38" rx="4" fill="#1a1e2a" stroke="rgba(76,255,176,0.4)"/>
    <text x="394" y="58" textAnchor="middle" fill="#4fffb0" fontSize="11" fontFamily="'Outfit', sans-serif">Vector DB</text>
    <text x="394" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">Pinecone / Qdrant</text>

    {/* Arrows top row */}
    <line x1="130" y1="63" x2="146" y2="63" stroke="#4fffb0" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>
    <line x1="232" y1="63" x2="248" y2="63" stroke="#4fffb0" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>
    <line x1="334" y1="63" x2="350" y2="63" stroke="#4fffb0" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>

    {/* Query flow */}
    <rect x="30" y="130" width="100" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="80" y="144" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">User Query</text>
    <text x="80" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">natural language</text>

    <rect x="148" y="130" width="84" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="190" y="144" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">Embed Query</text>
    <text x="190" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">dense vector</text>

    <rect x="250" y="130" width="84" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="292" y="144" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">ANN Search</text>
    <text x="292" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">cosine sim</text>

    <rect x="352" y="130" width="84" height="38" rx="4" fill="#1a1e2a" stroke="rgba(76,255,176,0.4)"/>
    <text x="394" y="144" textAnchor="middle" fill="#4fffb0" fontSize="11" fontFamily="'Outfit', sans-serif">Top-K Chunks</text>
    <text x="394" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">→ LLM prompt</text>

    <line x1="130" y1="149" x2="146" y2="149" stroke="#4fffb0" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>
    <line x1="232" y1="149" x2="248" y2="149" stroke="#4fffb0" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>
    <line x1="334" y1="149" x2="350" y2="149" stroke="#4fffb0" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr)"/>

    {/* DIVIDER */}
    <line x1="460" y1="20" x2="460" y2="320" stroke="#252a38" strokeWidth="1" strokeDasharray="5,5"/>

    {/* RIGHT SIDE — GraphRAG */}
    <text x="622" y="26" textAnchor="middle" fill="#7c6fff" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="'Outfit', sans-serif">GRAPHRAG</text>

    {/* Entity Extraction */}
    <rect x="476" y="44" width="96" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="524" y="58" textAnchor="middle" fill="#c8ccda" fontSize="10" fontFamily="'Outfit', sans-serif">Entity Extract</text>
    <text x="524" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">LLM-powered</text>

    {/* Relationship */}
    <rect x="584" y="44" width="90" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="629" y="58" textAnchor="middle" fill="#c8ccda" fontSize="10" fontFamily="'Outfit', sans-serif">Relation Map</text>
    <text x="629" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">triplets</text>

    {/* Graph Store */}
    <rect x="686" y="44" width="80" height="38" rx="4" fill="#1a1e2a" stroke="rgba(124,111,255,0.5)"/>
    <text x="726" y="58" textAnchor="middle" fill="#7c6fff" fontSize="10" fontFamily="'Outfit', sans-serif">Graph DB</text>
    <text x="726" y="73" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">Neo4j</text>

    <line x1="572" y1="63" x2="582" y2="63" stroke="#7c6fff" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr2)"/>
    <line x1="674" y1="63" x2="684" y2="63" stroke="#7c6fff" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr2)"/>

    {/* Graph Query Flow */}
    <rect x="476" y="130" width="96" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="524" y="144" textAnchor="middle" fill="#c8ccda" fontSize="10" fontFamily="'Outfit', sans-serif">NL → Cypher</text>
    <text x="524" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">query gen</text>

    <rect x="584" y="130" width="90" height="38" rx="4" fill="#1a1e2a" stroke="#252a38"/>
    <text x="629" y="144" textAnchor="middle" fill="#c8ccda" fontSize="10" fontFamily="'Outfit', sans-serif">Graph Traverse</text>
    <text x="629" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">multi-hop</text>

    <rect x="686" y="130" width="80" height="38" rx="4" fill="#1a1e2a" stroke="rgba(124,111,255,0.5)"/>
    <text x="726" y="144" textAnchor="middle" fill="#7c6fff" fontSize="10" fontFamily="'Outfit', sans-serif">Subgraph</text>
    <text x="726" y="159" textAnchor="middle" fill="#7a8099" fontSize="9" fontFamily="'Outfit', sans-serif">→ LLM prompt</text>

    <line x1="572" y1="149" x2="582" y2="149" stroke="#7c6fff" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr2)"/>
    <line x1="674" y1="149" x2="684" y2="149" stroke="#7c6fff" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arr2)"/>

    {/* KEY DIFFERENCE note */}
    <rect x="476" y="215" width="290" height="80" rx="6" fill="rgba(124,111,255,0.06)" stroke="rgba(124,111,255,0.2)"/>
    <text x="621" y="235" textAnchor="middle" fill="#7c6fff" fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="'Outfit', sans-serif">KEY DIFFERENCE</text>
    <text x="621" y="253" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">GraphRAG traverses named entity</text>
    <text x="621" y="269" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">connections — not word vectors.</text>
    <text x="621" y="285" textAnchor="middle" fill="#7a8099" fontSize="9.5" fontFamily="'Outfit', sans-serif">A→B→C is a path, not a similarity score.</text>

    {/* KEY DIFFERENCE note left */}
    <rect x="30" y="215" width="320" height="80" rx="6" fill="rgba(76,255,176,0.04)" stroke="rgba(76,255,176,0.15)"/>
    <text x="190" y="235" textAnchor="middle" fill="#4fffb0" fontSize="9" fontWeight="700" letterSpacing="2" fontFamily="'Outfit', sans-serif">KEY DIFFERENCE</text>
    <text x="190" y="253" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">Vector RAG finds semantically</text>
    <text x="190" y="269" textAnchor="middle" fill="#c8ccda" fontSize="11" fontFamily="'Outfit', sans-serif">similar text chunks to the query.</text>
    <text x="190" y="285" textAnchor="middle" fill="#7a8099" fontSize="9.5" fontFamily="'Outfit', sans-serif">No structural knowledge. Just proximity.</text>
  </svg>
    </div>
  </div>
);
