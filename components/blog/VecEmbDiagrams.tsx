// Auto-generated SVG diagrams for the Vectorization vs Embeddings blog

/* ── One-Hot Encoding Visual ─────────────────────────────────────── */
export function OneHotDiagram() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 overflow-x-auto">
      <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest mb-5">
        One-Hot Encoding — vocabulary of 6 words
      </p>
      <svg width="100%" viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg">
        {/* Vocab row labels */}
        <text fontFamily="'Fira Code',monospace" fontSize="11" fill="#6b7280" x="20" y="48">vocab:</text>
        {["the","cat","sat","on","mat","dog"].map((w, i) => (
          <text key={w} fontFamily="'Fira Code',monospace" fontSize="13" fill="#111827" fontWeight="500" x={68 + i*100} y="48">{w}</text>
        ))}
        <line x1="20" y1="58" x2="640" y2="58" stroke="#e5e7eb" strokeWidth="0.5"/>

        {/* "cat" row */}
        <text fontFamily="'Fira Code',monospace" fontSize="11" fill="#ea580c" x="20" y="90" fontWeight="500">&quot;cat&quot;:</text>
        {[false,true,false,false,false,false].map((active, i) => (
          <g key={i}>
            <rect x={60+i*100} y="72" width="80" height="30" rx="3"
              fill={active ? "#fef3c7" : "#f3f4f6"}
              stroke={active ? "#ea580c" : "#e5e7eb"}
              strokeWidth={active ? 1 : 0.5}/>
            <text fontFamily="'Fira Code',monospace" fontSize="14"
              fill={active ? "#ea580c" : "#9ca3af"}
              x={100+i*100} y="92" textAnchor="middle"
              fontWeight={active ? "600" : "400"}>
              {active ? "1" : "0"}
            </text>
          </g>
        ))}

        {/* "dog" row */}
        <text fontFamily="'Fira Code',monospace" fontSize="11" fill="#ea580c" x="20" y="148" fontWeight="500">&quot;dog&quot;:</text>
        {[false,false,false,false,false,true].map((active, i) => (
          <g key={i}>
            <rect x={60+i*100} y="130" width="80" height="30" rx="3"
              fill={active ? "#fef3c7" : "#f3f4f6"}
              stroke={active ? "#ea580c" : "#e5e7eb"}
              strokeWidth={active ? 1 : 0.5}/>
            <text fontFamily="'Fira Code',monospace" fontSize="14"
              fill={active ? "#ea580c" : "#9ca3af"}
              x={100+i*100} y="150" textAnchor="middle"
              fontWeight={active ? "600" : "400"}>
              {active ? "1" : "0"}
            </text>
          </g>
        ))}

        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#6b7280"
          x="340" y="195" textAnchor="middle">
          cosine(&quot;cat&quot;, &quot;dog&quot;) = 0.0 — same as cosine(&quot;cat&quot;, &quot;sat&quot;). Meaningless.
        </text>
      </svg>
    </div>
  );
}

/* ── Embedding Space Visual ──────────────────────────────────────── */
export function EmbeddingSpaceDiagram() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 overflow-x-auto">
      <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest mb-5">
        Embedding space — semantic clustering (2D projection of high-dimensional vectors)
      </p>
      <svg width="100%" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">
        {/* Quadrant backgrounds */}
        <rect x="40" y="20" width="280" height="120" rx="6" fill="rgba(124,58,237,0.04)" stroke="rgba(124,58,237,0.1)" strokeWidth="0.5"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="rgba(124,58,237,0.5)" x="52" y="38">Royalty cluster</text>
        <rect x="360" y="20" width="280" height="120" rx="6" fill="rgba(8,145,178,0.04)" stroke="rgba(8,145,178,0.1)" strokeWidth="0.5"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="rgba(8,145,178,0.5)" x="372" y="38">Animals cluster</text>
        <rect x="40" y="155" width="280" height="110" rx="6" fill="rgba(234,88,12,0.04)" stroke="rgba(234,88,12,0.1)" strokeWidth="0.5"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="rgba(234,88,12,0.5)" x="52" y="173">Geography cluster</text>
        <rect x="360" y="155" width="280" height="110" rx="6" fill="rgba(22,163,74,0.04)" stroke="rgba(22,163,74,0.1)" strokeWidth="0.5"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="rgba(22,163,74,0.5)" x="372" y="173">Tech cluster</text>

        {/* Royalty */}
        <circle cx="120" cy="80" r="5" fill="#7c3aed"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#7c3aed" fontWeight="600" x="128" y="84">king</text>
        <circle cx="200" cy="65" r="5" fill="#7c3aed"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#7c3aed" fontWeight="600" x="208" y="69">queen</text>
        <circle cx="90" cy="110" r="5" fill="#7c3aed" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#7c3aed" opacity={0.7} x="98" y="114">prince</text>
        <circle cx="240" cy="100" r="5" fill="#7c3aed" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#7c3aed" opacity={0.7} x="248" y="104">princess</text>

        {/* Animals */}
        <circle cx="430" cy="70" r="5" fill="#0891b2"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#0891b2" fontWeight="600" x="438" y="74">cat</text>
        <circle cx="510" cy="58" r="5" fill="#0891b2"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#0891b2" fontWeight="600" x="518" y="62">dog</text>
        <circle cx="470" cy="100" r="5" fill="#0891b2" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#0891b2" opacity={0.7} x="478" y="104">wolf</text>
        <circle cx="580" cy="90" r="5" fill="#0891b2" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#0891b2" opacity={0.7} x="588" y="94">tiger</text>

        {/* Geography */}
        <circle cx="100" cy="195" r="5" fill="#ea580c"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#ea580c" fontWeight="600" x="108" y="199">Paris</text>
        <circle cx="200" cy="210" r="5" fill="#ea580c"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#ea580c" fontWeight="600" x="208" y="214">London</text>
        <circle cx="130" cy="235" r="5" fill="#ea580c" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#ea580c" opacity={0.7} x="138" y="239">Berlin</text>
        <circle cx="255" cy="228" r="5" fill="#ea580c" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#ea580c" opacity={0.7} x="263" y="232">Tokyo</text>

        {/* Tech */}
        <circle cx="430" cy="190" r="5" fill="#16a34a"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#16a34a" fontWeight="600" x="438" y="194">Python</text>
        <circle cx="530" cy="205" r="5" fill="#16a34a"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#16a34a" fontWeight="600" x="538" y="209">neural</text>
        <circle cx="470" cy="235" r="5" fill="#16a34a" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#16a34a" opacity={0.7} x="478" y="239">vector</text>
        <circle cx="590" cy="225" r="5" fill="#16a34a" opacity="0.6"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#16a34a" opacity={0.7} x="598" y="229">model</text>

        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#9ca3af" x="340" y="272" textAnchor="middle">
          Distance = semantic dissimilarity. Clusters emerge from training, not hand-coded rules.
        </text>
      </svg>
    </div>
  );
}

/* ── Decision Flowchart ──────────────────────────────────────────── */
export function DecisionFlowchart() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 overflow-x-auto">
      <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest mb-5">
        Decision flowchart — vectorization or embeddings?
      </p>
      <svg width="100%" viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr-vec" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* Start */}
        <rect x="265" y="20" width="150" height="40" rx="20" fill="#1f2937"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#fff" x="340" y="45" textAnchor="middle" fontWeight="500">New NLP task</text>
        <line x1="340" y1="60" x2="340" y2="82" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arr-vec)"/>

        {/* Q1 */}
        <polygon points="340,84 430,114 340,144 250,114" fill="rgba(8,145,178,0.08)" stroke="rgba(8,145,178,0.5)" strokeWidth="1"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#0891b2" x="340" y="110" textAnchor="middle">Does meaning/context</text>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#0891b2" x="340" y="125" textAnchor="middle">matter?</text>

        {/* Yes → Embeddings */}
        <line x1="432" y1="114" x2="530" y2="114" stroke="#7c3aed" strokeWidth="1" markerEnd="url(#arr-vec)"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#7c3aed" x="480" y="108">Yes</text>
        <rect x="532" y="88" width="128" height="52" rx="6" fill="rgba(124,58,237,0.08)" stroke="#7c3aed" strokeWidth="1"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#7c3aed" x="596" y="110" textAnchor="middle" fontWeight="600">Use Embeddings</text>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#7c3aed" x="596" y="128" textAnchor="middle" opacity="0.7">BERT, OpenAI, SBERT</text>

        {/* No → Q2 */}
        <line x1="340" y1="144" x2="340" y2="170" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arr-vec)"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#6b7280" x="350" y="160">No</text>
        <polygon points="340,172 430,202 340,232 250,202" fill="rgba(234,88,12,0.06)" stroke="rgba(234,88,12,0.4)" strokeWidth="1"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#ea580c" x="340" y="198" textAnchor="middle">Need word</text>
        <text fontFamily="'Outfit',sans-serif" fontSize="12" fill="#ea580c" x="340" y="213" textAnchor="middle">importance?</text>

        {/* Yes → TF-IDF */}
        <line x1="432" y1="202" x2="530" y2="202" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arr-vec)"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#ea580c" x="480" y="196">Yes</text>
        <rect x="532" y="176" width="128" height="52" rx="6" fill="rgba(234,88,12,0.07)" stroke="#ea580c" strokeWidth="1"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#ea580c" x="596" y="198" textAnchor="middle" fontWeight="600">Use TF-IDF</text>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#ea580c" x="596" y="216" textAnchor="middle" opacity="0.7">sklearn TfidfVectorizer</text>

        {/* No → BoW */}
        <line x1="340" y1="232" x2="340" y2="258" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arr-vec)"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#6b7280" x="350" y="248">No</text>
        <rect x="265" y="260" width="150" height="44" rx="6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1"/>
        <text fontFamily="'Outfit',sans-serif" fontSize="13" fill="#374151" x="340" y="282" textAnchor="middle" fontWeight="600">Use Bag of Words</text>
        <text fontFamily="'Outfit',sans-serif" fontSize="11" fill="#6b7280" x="340" y="298" textAnchor="middle">CountVectorizer</text>
      </svg>
    </div>
  );
}

/* ── Full Comparison Table ───────────────────────────────────────── */
export function VecEmbTable() {
  const rows = [
    { dim: "Vector type",            vec: "Sparse (mostly zeros)",           emb: "Dense (all values non-zero)",           vecCls: "text-orange-600 font-medium", embCls: "text-violet-600 font-medium" },
    { dim: "Dimensionality",         vec: "= vocabulary size (10K–100K+)",   emb: "64–4,096 (fixed by model design)",      vecCls: "", embCls: "" },
    { dim: "Semantic meaning",       vec: "None — 'cat' and 'dog' equidistant", emb: "Yes — similar meanings cluster",     vecCls: "text-red-500", embCls: "text-emerald-600 font-medium" },
    { dim: "Context sensitivity",    vec: "None — 'bank' same in all contexts", emb: "Contextual models give different vectors", vecCls: "text-red-500", embCls: "text-emerald-600 font-medium" },
    { dim: "Requires training",      vec: "No — rule-based computation",     emb: "Yes — large neural network training",   vecCls: "text-emerald-600 font-medium", embCls: "text-red-500" },
    { dim: "Interpretability",       vec: "High — each dimension = a word",  emb: "Low — dimensions have no human meaning",vecCls: "text-emerald-600 font-medium", embCls: "text-red-500" },
    { dim: "Compute cost",           vec: "Extremely low — CPU, milliseconds", emb: "Medium — GPU recommended for large batches", vecCls: "text-emerald-600 font-medium", embCls: "text-amber-600 font-medium" },
    { dim: "Storage cost",           vec: "High — sparse = large matrices",  emb: "Low — dense = compact matrices",        vecCls: "text-red-500", embCls: "text-emerald-600 font-medium" },
    { dim: "Out-of-vocabulary",      vec: "Unknown word → zero vector",      emb: "Sub-word models handle most cases",     vecCls: "text-red-500", embCls: "text-amber-600 font-medium" },
    { dim: "Similarity search",      vec: "Poor — keyword matching only",    emb: "Excellent — semantic search, RAG",      vecCls: "text-red-500", embCls: "text-emerald-600 font-medium" },
    { dim: "Primary tools",          vec: "scikit-learn CountVectorizer, TfidfVectorizer", emb: "OpenAI text-embedding-3, BERT, SBERT, Word2Vec", vecCls: "", embCls: "" },
  ];

  return (
    <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
      <table className="w-full text-sm border-collapse bg-white">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Dimension</th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-orange-600 border-b-2 border-orange-500">Traditional Vectorization</th>
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-violet-600 border-b-2 border-violet-600">Embeddings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
              <td className="px-4 py-3 font-semibold text-gray-900">{r.dim}</td>
              <td className={`px-4 py-3 ${r.vecCls || "text-gray-600"}`}>{r.vec}</td>
              <td className={`px-4 py-3 ${r.embCls || "text-gray-600"}`}>{r.emb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Evolution Timeline ──────────────────────────────────────────── */
export function EvoTimeline() {
  const items = [
    { year: "1990s",     dot: "vec",  name: "One-Hot Encoding & Bag of Words", desc: "Sparse, high-dimensional, fast. No semantic understanding. Used in early spam filters, keyword search, document classification.", tags: ["Vectorization","Sparse","No semantics"] },
    { year: "2001–2010", dot: "vec",  name: "TF-IDF & N-Grams",               desc: "Better weighting — penalizes common words, rewards discriminative ones. N-grams capture some word order. Workhorse of classic information retrieval.", tags: ["Vectorization","Statistical"] },
    { year: "2013",      dot: "mid",  name: "Word2Vec (Google)",               desc: "The breakthrough. Mikolov et al. showed neural networks could learn dense word embeddings. 'king − man + woman ≈ queen.' Changed NLP permanently.", tags: ["Embedding","Dense","Static"] },
    { year: "2014",      dot: "mid",  name: "GloVe (Stanford)",                desc: "Global Vectors for Word Representation. Combined local context windows with global word co-occurrence statistics.", tags: ["Embedding","Static","Corpus-level"] },
    { year: "2018",      dot: "emb",  name: "ELMo & BERT — Contextual",       desc: "The biggest leap since Word2Vec. 'Bank' in 'river bank' vs 'bank account' now gets different vectors. Transformers make this possible at scale.", tags: ["Embedding","Contextual","Transformer-based"] },
    { year: "2022–2026", dot: "emb",  name: "Sentence Embeddings & Multimodal", desc: "OpenAI text-embedding-3, sentence-transformers (SBERT), CLIP. Entire sentences encoded into one vector. Foundation of modern RAG and semantic search.", tags: ["Embedding","Sentence-level","Multimodal"] },
  ];

  const dotColor: Record<string, string> = {
    vec: "border-orange-500",
    mid: "border-teal-500",
    emb: "border-violet-600",
  };
  const tagColor: Record<string, string> = {
    "Vectorization": "text-orange-600 border-orange-200 bg-orange-50",
    "Sparse": "text-orange-600 border-orange-200 bg-orange-50",
    "No semantics": "text-orange-600 border-orange-200 bg-orange-50",
    "Statistical": "text-orange-600 border-orange-200 bg-orange-50",
    "Embedding": "text-violet-600 border-violet-200 bg-violet-50",
    "Dense": "text-violet-600 border-violet-200 bg-violet-50",
    "Static": "text-violet-600 border-violet-200 bg-violet-50",
    "Corpus-level": "text-violet-600 border-violet-200 bg-violet-50",
    "Contextual": "text-violet-600 border-violet-200 bg-violet-50",
    "Transformer-based": "text-violet-600 border-violet-200 bg-violet-50",
    "Sentence-level": "text-teal-600 border-teal-200 bg-teal-50",
    "Multimodal": "text-teal-600 border-teal-200 bg-teal-50",
  };

  return (
    <div className="relative my-6">
      {/* vertical line */}
      <div className="absolute left-[79px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-orange-500 to-violet-600" />
      <div className="flex flex-col gap-0">
        {items.map((item) => (
          <div key={item.year} className="flex gap-6 items-start pb-7">
            <div className="w-16 shrink-0 text-right font-mono text-[11px] text-gray-400 pt-4">{item.year}</div>
            <div className="shrink-0 flex flex-col items-center pt-4 relative z-10">
              <div className={`w-3 h-3 rounded-full border-2 bg-white ${dotColor[item.dot]}`} />
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span key={t} className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${tagColor[t] ?? "text-gray-500 border-gray-200 bg-gray-50"}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Opinion Block ───────────────────────────────────────────────── */
export function VecEmbOpinion() {
  return (
    <div className="my-10 bg-[#0a0a0a] rounded-2xl p-8 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-orange-600/10 pointer-events-none" />
      <div className="relative z-10">
        <span className="text-violet-500 font-serif text-5xl leading-none opacity-40 select-none">&ldquo;</span>
        <p className="font-serif text-lg md:text-xl italic text-white/90 leading-relaxed mt-2 mb-5">
          The confusion between vectorization and embeddings is not just a terminology problem — it is a mental model problem.
          Developers who think of them as &ldquo;basically the same thing&rdquo; end up using TF-IDF for semantic search and wondering
          why recall is terrible, or using BERT embeddings for a simple keyword filter and burning 100x the compute they need.
          The taxonomy matters. Vectorization is the category. Embeddings are a specific, learned sub-type. Know the difference
          and you will make better architecture decisions in 30 seconds that would otherwise take days of debugging to discover.
        </p>
        <p className="text-xs text-white/30 font-medium">
          — Personal take · Based on ML system design patterns seen across production NLP applications
        </p>
      </div>
    </div>
  );
}
