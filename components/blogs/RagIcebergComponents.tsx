"use client";

// ─── Basic RAG Pipeline SVG Flowchart ───────────────────────────────────────
export function RagBasicPipeline() {
  const steps = [
    { label: "Docs In", sub: "raw text" },
    { label: "Chunk", sub: "512 tokens" },
    { label: "Embed", sub: "dense vector" },
    { label: "Store", sub: "vector DB" },
    { label: "Retrieve", sub: "top-k ANN" },
    { label: "Generate", sub: "LLM + context" },
  ];
  return (
    <div className="my-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 overflow-x-auto">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-5">
        Basic RAG Pipeline — the beginner&apos;s version
      </p>
      <div className="flex items-center gap-0 min-w-[640px]">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl border text-center
              ${i === steps.length - 1
                ? "bg-blue-50 border-blue-200"
                : "bg-white border-gray-200"}`}
              style={{ minWidth: 88 }}
            >
              <span className="text-xs font-bold text-gray-800">{s.label}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{s.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center">
                <div className="h-px w-5 bg-gray-300" />
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="shrink-0">
                  <path d="M1 1l6 4-6 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Iceberg Concept Divider ─────────────────────────────────────────────────
export function RagIcebergDivider() {
  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-gray-200">
      {/* Above waterline */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-4 flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">
          Above Water
        </span>
        <span className="text-sm text-blue-800">
          RAG for Beginners — the 7 concepts every tutorial covers. Fast to understand, fast to break in production.
        </span>
      </div>
      {/* Waterline gradient */}
      <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #1d4ed8, #60a5fa, #1d4ed8)" }} />
      {/* Below waterline */}
      <div className="bg-[#0f172a] px-6 py-4 flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 bg-blue-900/30 border border-blue-700/40 px-3 py-1 rounded-full">
          Below Water
        </span>
        <span className="text-sm text-gray-400">
          RAG for Builders — the 15+ concepts tutorials skip. This is where production systems live or die.
        </span>
      </div>
    </div>
  );
}

// ─── Beginner Cards Grid ─────────────────────────────────────────────────────
export function RagBeginnerCards() {
  const cards = [
    { num: "01 · Framework",   name: "LangChain / LlamaIndex",   desc: "The orchestration layer that stitches retrieval to generation. Both abstract the boilerplate so you focus on logic." },
    { num: "02 · Architecture", name: "Basic Retrieval Pipeline", desc: "The core loop: ingest → chunk → embed → index → retrieve → generate. Every optimization builds on this." },
    { num: "03 · Ingestion",   name: "Data Loaders (PDFs, CSVs)", desc: "PDF extraction fails on scanned images, tables, and multi-column layouts. Data loading is where hidden quality problems begin." },
    { num: "04 · Representation", name: "Chunking & Embeddings", desc: "Chunk size directly determines retrieval quality — too small loses context, too large drowns the LLM." },
    { num: "05 · Storage",     name: "Vector Databases",          desc: "Pinecone, FAISS, Chroma, Qdrant — stores that support ANN search over high-dimensional vectors." },
    { num: "06 · Interface",   name: "Prompt Templates",          desc: "A poorly designed prompt causes the LLM to ignore retrieved context and answer from training knowledge." },
    { num: "07 · Generation",  name: "LLMs + Retrieval",          desc: "A well-designed retrieval pipeline with an average model outperforms a top model with poor retrieval." },
  ];
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 border-t-[3px] border-t-blue-500">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600 mb-2">{c.num}</div>
          <div className="text-sm font-bold text-gray-900 mb-2">{c.name}</div>
          <div className="text-xs text-gray-500 leading-relaxed">{c.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ─── TL;DR Block ─────────────────────────────────────────────────────────────
export function RagTldr() {
  const items = [
    "The beginner RAG stack (LangChain, embeddings, vector DB, prompt templates) is real and necessary. It is not wrong — it is just incomplete for production.",
    "Poorly evaluated RAG systems hallucinate in up to 40% of responses even when the correct source document was retrieved. The problem is not always retrieval — it is generation quality on noisy context.",
    "70% of RAG systems in production still lack systematic evaluation frameworks, making it impossible to detect quality regressions.",
    "The builder's layer — reranking, query reformulation, PII masking, hallucination detection — adds significant engineering effort but prevents the silent failures that break production systems.",
  ];
  return (
    <div className="my-8 border-l-4 border-red-500 bg-red-50 rounded-r-2xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-600 mb-4">TL;DR — the 4 things to know first</div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="text-red-500 font-bold mt-0.5 shrink-0">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Depth Cards Grid (builder layer) ────────────────────────────────────────
type DCard = { badge: string; name: string; desc: string; tier: 1 | 2 | 3 };

const TIER_STYLES: Record<number, { border: string; badge: string; label: string }> = {
  1: { border: "border-l-blue-500",  badge: "bg-blue-50 text-blue-600 border-blue-200",  label: "Tier 1" },
  2: { border: "border-l-amber-500", badge: "bg-amber-50 text-amber-600 border-amber-200", label: "Tier 2" },
  3: { border: "border-l-red-500",   badge: "bg-red-50 text-red-600 border-red-200",    label: "Tier 3" },
};

function DepthCard({ card }: { card: DCard }) {
  const s = TIER_STYLES[card.tier];
  return (
    <div className={`bg-white border border-gray-100 shadow-sm border-l-4 ${s.border} rounded-xl p-5`}>
      <div className={`text-[9px] font-bold uppercase tracking-[0.12em] border px-2 py-0.5 rounded inline-block mb-3 ${s.badge}`}>
        {card.badge}
      </div>
      <div className="text-sm font-bold text-gray-900 mb-2">{card.name}</div>
      <div className="text-xs text-gray-600 leading-relaxed">{card.desc}</div>
    </div>
  );
}

export function RagTier1Cards() {
  const cards: DCard[] = [
    { tier: 1, badge: "Pre-processing", name: "Preprocessing & Cleaning",  desc: "Raw PDF extraction is messy. Tables extract as random character sequences. Preprocessing normalizes encoding, removes boilerplate, and fixes extraction artifacts before any chunk reaches the embedding model." },
    { tier: 1, badge: "PII Masking",    name: "PII Masking",               desc: "Production documents contain names, emails, SSNs, credit cards. If indexed, they will be retrieved and surfaced to users who should never see them. PII detection must run before indexing — not after." },
    { tier: 1, badge: "Query Layer",    name: "Query Reformulation",        desc: "Users ask vague questions that vector search handles poorly. HyDE, query expansion via LLM, and multi-query retrieval bridge the gap between user language and domain vocabulary in your documents." },
  ];
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c, i) => <DepthCard key={i} card={c} />)}
    </div>
  );
}

export function RagTier2Cards() {
  const cards: DCard[] = [
    { tier: 2, badge: "Post-Retrieval", name: "Reranking (Cross-Encoders)",         desc: "Your bi-encoder retrieves top-50 candidates fast but imprecisely. A cross-encoder reranker scores each (query, doc) pair jointly — far more accurate. Reranking is the single highest-ROI improvement for most RAG systems." },
    { tier: 2, badge: "Evaluation",     name: "Evaluation Metrics & Testing",       desc: "Context Precision, Context Recall, Faithfulness, Answer Relevancy. 70% of production RAG systems lack systematic evaluation — making it impossible to know when a code change breaks retrieval quality." },
    { tier: 2, badge: "Operations",     name: "Latency vs Accuracy Tradeoff",       desc: "Every added layer adds latency. LiveRAG 2025 showed reranking improved MAP by 52% but increased query time from 1.74s to 84s. Production systems need an explicit latency budget." },
  ];
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c, i) => <DepthCard key={i} card={c} />)}
    </div>
  );
}

export function RagTier3Cards() {
  const cards: DCard[] = [
    { tier: 3, badge: "Safety",       name: "Hallucination Detection & Control", desc: "Even with correct documents retrieved, LLMs hallucinate in up to 40% of responses on noisy context. RAGAS decomposes answers into atomic claims and checks each against retrieved context." },
    { tier: 3, badge: "Reliability",  name: "Error Analysis & Feedback Loops",   desc: "Every hallucination, every mis-retrieved chunk should become a test case. Without this loop the same failures recur. With it, your system improves continuously from real-world usage." },
    { tier: 3, badge: "Architecture", name: "Custom Retriever Architectures",    desc: "Hybrid (BM25 + dense), multi-hop, self-RAG, GraphRAG — different architectures solve different failure modes. Choosing the right one requires knowing which failure mode is actually hurting your system." },
  ];
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c, i) => <DepthCard key={i} card={c} />)}
    </div>
  );
}

export function RagDeepLayerCards() {
  const cards: DCard[] = [
    { tier: 1, badge: "Efficiency",         name: "Retrieval Cache Management",         desc: "Semantic caching stores query embeddings and results, returning cached answers for semantically similar queries. Cuts latency from 500ms to under 10ms for cache hits." },
    { tier: 1, badge: "Scale",              name: "Knowledge Distillation",              desc: "GPT-4 retrieval at GPT-3.5 cost. Distillation trains a smaller model on outputs of a larger model — preserving most accuracy at a fraction of inference cost." },
    { tier: 2, badge: "Infrastructure",     name: "Hardware Constraints",               desc: "Embedding models, rerankers, and the LLM each need GPU. Hardware budgeting directly determines whether your RAG system is economically viable at scale." },
    { tier: 2, badge: "Continuous Learning",name: "Continuous Fine-Tuning",             desc: "Collect thumbs-up/thumbs-down signal. Use that to fine-tune the embedding model or reranker on your domain. Systems that do this improve steadily; systems that don't plateau." },
    { tier: 3, badge: "Security",           name: "Secure Retrieval",                   desc: "Row-level security for vector databases. If user A should not see user B's documents, the ANN search itself must be scoped — metadata filters and tenant isolation at the vector store level." },
    { tier: 3, badge: "Reasoning",          name: "Multi-Hop Retrieval",                desc: "Some questions require chaining multiple retrievals. Multi-hop RAG agents retrieve → reason → reformulate → retrieve again — often 3-5 hops deep before generating the final answer." },
    { tier: 3, badge: "Responsibility",     name: "Ethical Bias Checks",                desc: "Embedding models encode historical biases. Retrieval can systematically surface or suppress documents along demographic lines. Bias audits are a compliance requirement for regulated industries." },
  ];
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c, i) => <DepthCard key={i} card={c} />)}
    </div>
  );
}

// ─── Evaluation Metrics Table ─────────────────────────────────────────────────
export function RagEvalMetricsTable() {
  const rows = [
    { metric: "Faithfulness",      what: "Are answer claims supported by retrieved context?",        target: "≥ 0.80 (≥0.90 regulated)", low: "LLM is hallucinating from training memory",                     status: "target" },
    { metric: "Context Precision", what: "What fraction of retrieved chunks were actually needed?",   target: "≥ 0.75",                    low: "Retrieval returning noisy irrelevant chunks → confuses LLM",    status: "target" },
    { metric: "Context Recall",    what: "Did retrieval find all relevant information?",              target: "≥ 0.80",                    low: "Important information exists in corpus but was not retrieved",  status: "target" },
    { metric: "Answer Relevancy",  what: "Does the answer directly address the question?",           target: "≥ 0.75",                    low: "Retrieval pulled adjacent-but-wrong chunks; generation is tangential", status: "target" },
    { metric: "Hallucination Rate",what: "% of responses with claims not in retrieved context",      target: "≤ 5% for most apps",        low: "5% = 1 in 20 responses contains fabricated information",       status: "good" },
  ];
  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-gray-200">
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
          The 5 Evaluation Metrics That Define Production Quality
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs bg-white">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-gray-50">Metric</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-gray-50">What it measures</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-gray-50 whitespace-nowrap">Target</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-gray-50">What low score means</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-semibold text-gray-900">{r.metric}</td>
                <td className="px-4 py-3 text-gray-600 leading-relaxed">{r.what}</td>
                <td className="px-4 py-3 font-semibold text-blue-600 whitespace-nowrap">{r.target}</td>
                <td className="px-4 py-3 text-red-500 leading-relaxed">{r.low}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── RAG Iceberg Opinion Block ────────────────────────────────────────────────
export function RagOpinion() {
  return (
    <div className="my-14 bg-blue-50/50 border border-blue-100 border-l-4 border-l-blue-500 rounded-r-2xl p-8 md:p-10">
      <p className="font-serif text-xl italic text-gray-800 leading-relaxed mb-4">
        The teams I see building reliable production RAG are the ones who set up RAGAS evaluations before they set up Pinecone. They treat evaluation as the foundation, not as the polish at the end. Every builder-layer concept in this post exists because someone eventually measured what was going wrong — and only then could they fix it.
      </p>
      <div className="text-xs text-gray-500 tracking-wide">
        — Personal take · Based on RAG system design patterns observed across production deployments, 2024–2026
      </div>
    </div>
  );
}

// ─── RAG Conclusion Callout ───────────────────────────────────────────────────
export function RagConclusion() {
  const points = [
    { head: "The beginner stack is not wrong — it is incomplete.", body: "LangChain, embeddings, vector databases, and prompt templates are the necessary foundation. Every builder-layer concept depends on having that foundation in place. The mistake is treating the foundation as the finished building." },
    { head: "Evaluation is the gateway to the builder layer.", body: "You cannot fix what you cannot measure. Context precision, context recall, faithfulness, and answer relevancy tell you specifically which part of your pipeline is failing. Without these metrics, improvements are guesswork. 70% of production RAG systems lack these — which is why 70% are stuck at demo quality." },
    { head: "The deepest layers are where competitive moats are built.", body: "Continuous fine-tuning on user feedback, semantic caching, multi-hop retrieval, secure tenant isolation — these are not features you add once. They are systems you build and maintain. The teams shipping reliable enterprise RAG at scale have invested engineering time in every layer of the iceberg, not just the visible tip." },
  ];
  return (
    <div className="my-12 border-t-4 border-red-500 rounded-b-2xl border border-gray-200 bg-white p-8">
      <h3 className="font-outfit text-2xl font-bold text-black mb-6">Three Things to Take Away</h3>
      {points.map((p, i) => (
        <p key={i} className="text-gray-700 leading-relaxed mb-5 last:mb-0">
          <strong className="text-black">{p.head}</strong>{" "}{p.body}
        </p>
      ))}
      <p className="text-gray-400 text-sm mt-6 italic">
        The iceberg image that inspired this post captures it perfectly: what you see above water is a small fraction of what keeps the whole structure stable. The stability is entirely in what you cannot see.
      </p>
    </div>
  );
}

// ─── CTA / Next Step ─────────────────────────────────────────────────────────
export function RagCta() {
  return (
    <div className="my-10 bg-gray-900 text-white rounded-2xl p-8">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300 mb-3">Your next step</div>
      <p className="text-white/70 text-sm leading-relaxed">
        Add RAGAS evaluation to your RAG pipeline this week. Run it on 50 queries from real user traffic. Check faithfulness, context precision, and answer relevancy. Post your scores — even if they are not impressive. Knowing your baseline is the first step to improving it, and most teams have no idea what their current scores are.
      </p>
    </div>
  );
}

// ─── Code Blocks ─────────────────────────────────────────────────────────────
export function RagHydeCode() {
  return (
    <div className="my-8 rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <pre className="p-6 text-sm md:text-base text-gray-300 font-mono overflow-x-auto">
        <code>{`# Query reformulation with HyDE — Hypothetical Document Embeddings
from anthropic import Anthropic

client = Anthropic()

def hyde_retrieve(user_query: str, vectorstore) -> list:
    """Generate a hypothetical answer, embed it, use that for retrieval."""
    hypothetical_response = client.messages.create(
        model="claude-sonnet-4-6", max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"""Write a 2-paragraph document that would ideally answer
this question. Be specific and use domain vocabulary.
Question: {user_query}"""
        }]
    ).content[0].text

    # The hypothetical doc uses domain vocabulary the real docs also use
    # Its embedding lands closer to relevant chunks than the sparse query
    results = vectorstore.similarity_search(hypothetical_response, k=5)
    return results

# Example: query "what happens if I miss a payment"
# HyDE generates: "If a customer fails to make a scheduled payment, the
# contract specifies a grace period of 5 business days after which..."
# That document embeds near the actual contract terms — better retrieval`}</code>
      </pre>
    </div>
  );
}

export function RagRerankCode() {
  return (
    <div className="my-8 rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <pre className="p-6 text-sm md:text-base text-gray-300 font-mono overflow-x-auto">
        <code>{`# Cross-encoder reranking — the accuracy boost that costs latency
from sentence_transformers import CrossEncoder

# Stage 1: Bi-encoder retrieves candidates fast (millions of docs, <50ms)
candidates = vectorstore.similarity_search(query, k=50)

# Stage 2: Cross-encoder re-scores top-50 candidates slowly but accurately
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

pairs = [[query, doc.page_content] for doc in candidates]
scores = reranker.predict(pairs)  # (query, doc) processed together

# Sort by reranker score, take top-5 for LLM context
ranked = sorted(zip(scores, candidates), reverse=True)
top_docs = [doc for _, doc in ranked[:5]]

# Why this matters:
# Bi-encoder: "cat" and "dog" have similar embeddings -> both retrieved
# Cross-encoder: sees full (query + doc) pair -> scores by actual relevance
# Cost: 50 cross-encoder inference calls vs 1 ANN search`}</code>
      </pre>
    </div>
  );
}

export function RagRagasCode() {
  return (
    <div className="my-8 rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
      <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <pre className="p-6 text-sm md:text-base text-gray-300 font-mono overflow-x-auto">
        <code>{`# Faithfulness evaluation with RAGAS
from ragas.metrics import faithfulness, context_precision, answer_relevancy
from ragas import evaluate
from datasets import Dataset

# Your RAG pipeline output
data = {
    "question": ["What is the penalty for late payment?"],
    "answer":   ["There is a 5% late fee after 30 days."],
    "contexts": [[
        "Section 4.2: Late payment fees of 5% apply after 30 calendar days.",
        "Section 4.3: Disputed invoices are exempt from late fees."
    ]],
    "ground_truth": ["A 5% late fee applies after 30 calendar days."]
}

result = evaluate(Dataset.from_dict(data),
                  metrics=[faithfulness, context_precision, answer_relevancy])

print(result)
# faithfulness: 1.0      -> every claim is grounded in retrieved context
# context_precision: 0.8 -> 80% of retrieved chunks were actually needed
# answer_relevancy: 0.95 -> answer directly addresses the question

# Action thresholds (production):
# faithfulness < 0.8  -> investigate hallucination sources
# context_precision < 0.5 -> retrieval is surfacing too much noise
# answer_relevancy < 0.7  -> generation is going off-topic`}</code>
      </pre>
    </div>
  );
}
