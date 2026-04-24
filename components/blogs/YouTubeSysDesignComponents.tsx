"use client";
import React from 'react';

// Helpers
const Card = ({ title, desc, icon, colorClass, borderClass }: any) => (
  <div className={`bg-white border ${borderClass || 'border-gray-100 border-t-2'} shadow-sm rounded-xl p-5 hover:border-gray-300 transition-colors`}>
    <div className="text-2xl mb-3">{icon}</div>
    <div className="text-sm font-bold text-gray-900 mb-2">{title}</div>
    <div className="text-xs text-gray-600 leading-relaxed">{desc}</div>
  </div>
);

const PipelineStep = ({ num, title, desc, tags, colorClass, dotClass }: any) => (
  <div className="flex gap-4 items-start group">
    <div className="flex flex-col items-center flex-shrink-0 w-10">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 ${dotClass}`}>
        {num}
      </div>
      <div className="w-[2px] min-h-[30px] flex-1 bg-gray-200 my-2 group-last:hidden" />
    </div>
    <div className="flex-1 pb-6 group-last:pb-2 pt-2">
      <div className="font-semibold text-gray-900 mb-1">{title}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{desc}</div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((t: string, i: number) => (
            <span key={i} className={`text-[10px] font-mono font-medium px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-200`}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ─── HERO & STATS ────────────────────────────────────────────────────────────
export function YTHeroStats() {
  const stats = [
    { val: "2.5B", label: "Monthly Users" },
    { val: "500 hrs", label: "Uploaded / min" },
    { val: "1B hrs", label: "Watched Daily" },
    { val: "800M+", label: "Videos" },
    { val: "100:1", label: "Read/Write Ratio" }
  ];
  return (
    <div className="flex flex-wrap gap-6 md:gap-10 my-8 pb-8 border-b border-gray-200">
      {stats.map(s => (
        <div key={s.label} className="flex flex-col gap-1">
          <div className="font-mono text-2xl font-bold text-gray-900">{s.val}</div>
          <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function YTReqMetrics() {
  const stats = [
    { val: "99.9%", label: "Availability SLA" },
    { val: "<200ms", label: "API Response Time" },
    { val: "<2s", label: "Video Start (cached)" },
    { val: "95%+", label: "CDN Cache Hit Rate" },
    { val: "~1 EB", label: "Total Storage" },
    { val: "Millions", label: "Concurrent Streams" }
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 bg-gray-200 border border-gray-200 rounded-xl overflow-hidden my-6">
      {stats.map(s => (
        <div key={s.label} className="bg-white p-5">
          <div className="font-mono text-xl font-bold text-gray-900 mb-1">{s.val}</div>
          <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── CARDS ───────────────────────────────────────────────────────────────────
export function YTReqCards() {
  const cards = [
    { title: "Video Upload & Ingest", desc: "Accept MP4, AVI, MOV, MKV. Support files up to 256GB. Resumable uploads with chunked transfer.", icon: "📤", class: "border-t-blue-500" },
    { title: "Video Playback & Streaming", desc: "Smooth adaptive streaming across all connection speeds. Sub-2s start time for popular content. 4K/HDR.", icon: "▶", class: "border-t-teal-500" },
    { title: "Search & Discovery", desc: "Full-text search over billions of videos. Real-time indexing of new uploads. Autocomplete, filters.", icon: "🔍", class: "border-t-yellow-500" },
    { title: "Personalized Recommendations", desc: "ML-driven homepage and next-video suggestions. Must process user watch history in real-time.", icon: "🧠", class: "border-t-purple-500" },
    { title: "Engagement Features", desc: "Likes, comments, subscriptions, notifications. Must handle spikes when viral videos drop.", icon: "💬", class: "border-t-red-500" },
    { title: "Live Streaming", desc: "RTMP ingest, real-time transcoding, ultra-low latency delivery. Live chat with millions concurrent.", icon: "📡", class: "border-t-pink-500" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {cards.map((c, i) => <Card key={i} {...c} borderClass={c.class} />)}
    </div>
  );
}

export function YTStorageCards() {
  const cards = [
    { title: "Hot Tier — SSD / Edge", desc: "Top 1% of videos by views. Stored on SSDs at CDN edge nodes. Sub-50ms delivery. Handles ~80% of total traffic.", icon: "🔥", class: "border-t-red-500" },
    { title: "Warm Tier — Colossus", desc: "Videos uploaded in last 30 days or with steady views. Google's distributed file system. Petabyte scale.", icon: "☁️", class: "border-t-yellow-500" },
    { title: "Cold Tier — Archive", desc: "Old, rarely-watched videos. Stored on HDDs or tape. Access latency is seconds to minutes. Low cost per GB.", icon: "🧊", class: "border-t-blue-500" },
    { title: "Metadata — Vitess", desc: "Video titles, descriptions, thumbnails URLs, creator info. Horizontally sharded via Vitess (MySQL scaling).", icon: "📊", class: "border-t-teal-500" },
    { title: "Cache — Redis Cluster", desc: "View counts, session data, feed results, autocomplete suggestions. In-memory. 90% hit rate on hot data.", icon: "⚡", class: "border-t-purple-500" },
    { title: "Time-series — Bigtable", desc: "Watch history, engagement events, analytics. Optimized for high-volume time-series writes.", icon: "📈", class: "border-t-pink-500" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {cards.map((c, i) => <Card key={i} {...c} borderClass={c.class} />)}
    </div>
  );
}

export function YTScaleCards() {
  const cards = [
    { title: "L4 + L7 Load Balancing", desc: "Google Front End (GFE) distributes traffic at both TCP and HTTP layers globally via Anycast routing.", icon: "⚖", class: "border-t-blue-500" },
    { title: "Horizontal Scaling", desc: "All microservices are stateless. Kubernetes manages orchestration. Auto-scaling handles traffic spikes seamlessly.", icon: "↔", class: "border-t-teal-500" },
    { title: "Database Sharding", desc: "MySQL is horizontally sharded via Vitess by user_id or video_id hash. Supports live resharding without downtime.", icon: "🔧", class: "border-t-yellow-500" },
    { title: "Consistent Hashing", desc: "Redis caches use consistent hashing. When a node alters, only a fraction of keys are remapped, avoiding cache stampedes.", icon: "🎯", class: "border-t-purple-500" },
    { title: "DDoS Defense", desc: "API Gateway enforces rate limits. Google's infrastructure absorbs DDoS traffic at the edge before hitting applications.", icon: "🛡", class: "border-t-red-500" },
    { title: "Queue Buffering", desc: "Kafka absorbs write spikes. Millions of views buffer safely while downstream processors consume at a sustainable pace.", icon: "📦", class: "border-t-pink-500" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {cards.map((c, i) => <Card key={i} {...c} borderClass={c.class} />)}
    </div>
  );
}

// ─── PIPELINES ────────────────────────────────────────────────────────────────
const UPLOAD_DOT = "bg-blue-50 border-blue-300 text-blue-600";
const TRANSC_DOT = "bg-yellow-50 border-yellow-400 text-yellow-600";
const DELIV_DOT = "bg-red-50 border-red-300 text-red-600";
const SEARCH_DOT = "bg-teal-50 border-teal-300 text-teal-600";
const LIVE_DOT = "bg-purple-50 border-purple-300 text-purple-600";

export function YTUploaderPipeline() {
  const steps = [
    { title: "Client Requests a Signed Upload URL", desc: "The client sends a POST /videos/init request with metadata. The Upload Service reserves an ID and returns a pre-signed URL — a temporary link to upload directly to object storage.", tags: ["OAuth 2.0", "Pre-signed URL", "HTTPS"], dotClass: UPLOAD_DOT },
    { title: "Client Uploads Directly to Object Storage", desc: "The client splits the video into 5–10MB chunks and uploads each chunk directly to the pre-signed URL. Traffic never touches the app server.", tags: ["Chunked Transfer", "Resumable", "Parallel"], dotClass: UPLOAD_DOT },
    { title: "Object Storage Signals Completion", desc: "When chunks arrive, internal storage emits a complete event to Apache Kafka. The Upload Service logs metadata to the MySQL/Vitess database.", tags: ["Kafka Event", "Async", "MySQL Write"], dotClass: UPLOAD_DOT },
    { title: "Transcoding Pipeline Triggered", desc: "Transcoding Service consumes the Kafka event. The upload is complete from the user's perspective. Transcoding is entirely async.", tags: ["Kafka Consumer", "Async Job", "Background"], dotClass: TRANSC_DOT },
  ];
  return <div className="flex flex-col my-8">{steps.map((s, i) => <PipelineStep key={i} num={i+1} {...s} />)}</div>;
}

export function YTStreamingPipeline() {
  const steps = [
    { title: "Client Fetches Manifest File", desc: "A GET request to /watch returns a manifest URL (.m3u8 or .mpd). It indexes all available qualities and lengths. No video data yet.", tags: ["HLS Manifest", "MPEG-DASH"], dotClass: DELIV_DOT },
    { title: "Player Measures Bandwidth", desc: "The player downloads segments and measures time. The ABR algorithm selects highest sustained quality without buffering.", tags: ["ABR Algorithm", "Buffer tracking"], dotClass: DELIV_DOT },
    { title: "Segments Stream via HTTP/3", desc: "Individual segments fetched from edge node via HTTP/3 + QUIC. QUIC avoids head-of-line blocking on lossy networks.", tags: ["HTTP/3", "QUIC", "TLS 1.3"], dotClass: DELIV_DOT },
    { title: "Quality Switches Mid-Stream", desc: "If connection degrades, player switches to lower resolution seamlessly at next segment. Video never stops.", tags: ["Seamless Switch", "2s granularity"], dotClass: DELIV_DOT },
  ];
  return <div className="flex flex-col my-8">{steps.map((s, i) => <PipelineStep key={i} num={i+1} {...s} />)}</div>;
}

export function YTSearchPipeline() {
  const steps = [
    { title: "Query Processing & Intent", desc: "Query is tokenized, spell-checked, classified by intent (music, tutorial, etc.). Synonyms expand search scope.", tags: ["NLP", "Spell check", "Intent classification"], dotClass: SEARCH_DOT },
    { title: "Elasticsearch Retrieval", desc: "Elastic returns candidates via inverted indexes over metadata. BM25 scoring. Thousands returned in milliseconds.", tags: ["Inverted index", "BM25", "Shards"], dotClass: SEARCH_DOT },
    { title: "ML Ranking Layer", desc: "Model re-scores candidates via signals: view count, watch time, freshness, user history, CTR, language.", tags: ["TensorFlow", "Feature vectors", "Personalized"], dotClass: SEARCH_DOT },
    { title: "Autocomplete via Trie in Redis", desc: "Prefix searches hit a trie datastructure cached in Redis. Top completions pre-computed and updated.", tags: ["Trie", "Redis", "Kafka trending"], dotClass: SEARCH_DOT },
  ];
  return <div className="flex flex-col my-8">{steps.map((s, i) => <PipelineStep key={i} num={i+1} {...s} />)}</div>;
}

export function YTLivePipeline() {
  const steps = [
    { title: "RTMP Ingest", desc: "Streamer software (OBS) pushes live video via RTMP to ingest servers. RTMP leverages persistent TCP for low latency.", tags: ["RTMP", "TCP persistent", "OBS"], dotClass: LIVE_DOT },
    { title: "Real-Time Transcoding", desc: "Unlike VOD, live transcode requires sub-second latency. GPU-accelerated servers produce variants simultaneously.", tags: ["GPU transcoding", "Sub-2s latency"], dotClass: LIVE_DOT },
    { title: "LL-HLS Chunked Delivery", desc: "Stream chopped to 0.5-2s CMAF chunks. Pushed instantly to edge nodes. 3-5 sec glass-to-glass latency.", tags: ["LL-HLS", "CMAF chunks", "3-5s latency"], dotClass: LIVE_DOT },
    { title: "Live Chat via WebSockets", desc: "Bidirectional realtime chat via WebSockets for millions of concurrent users, using Pub-Sub fanout.", tags: ["WebSockets", "Pub/Sub", "Kafka"], dotClass: LIVE_DOT },
  ];
  return <div className="flex flex-col my-8">{steps.map((s, i) => <PipelineStep key={i} num={i+1} {...s} />)}</div>;
}

export function YTViewCountSteps() {
  const steps = [
    { title: "Layer 1: Redis Counter", desc: "Increment an in-memory counter on every view event. Extremely fast but approximate.", tags: ["In-memory", "Fast"], dotClass: DELIV_DOT },
    { title: "Layer 2: Kafka Buffer", desc: "View events published to Kafka. Durably buffers every event. The true source of truth.", tags: ["Durable", "Secure"], dotClass: TRANSC_DOT },
    { title: "Layer 3: Batch Reconciliation", desc: "Spark job consumes Kafka events occasionally, counts them accurately, and sinks to Bigtable+MySQL.", tags: ["Accurate", "Batch"], dotClass: SEARCH_DOT },
  ];
  return <div className="flex flex-col my-6">{steps.map((s, i) => <PipelineStep key={i} num={i+1} {...s} />)}</div>;
}

// ─── TABLES ──────────────────────────────────────────────────────────────────
export function YTCodecTable() {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-5 py-4 font-bold text-gray-700">Codec</th>
              <th className="text-left px-5 py-4 font-bold text-gray-700">Efficiency</th>
              <th className="text-left px-5 py-4 font-bold text-gray-700">Encoding Speed</th>
              <th className="text-left px-5 py-4 font-bold text-gray-700">Device Support</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">H.264</td>
              <td className="px-5 py-4 text-gray-600">Baseline</td>
              <td className="px-5 py-4 text-teal-600 font-medium">Fastest</td>
              <td className="px-5 py-4 text-teal-600 font-medium">Universal</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">VP9</td>
              <td className="px-5 py-4 text-gray-600">~30% better than H.264</td>
              <td className="px-5 py-4 text-gray-600">Moderate</td>
              <td className="px-5 py-4 text-blue-600 font-medium">Most Browsers</td>
            </tr>
            <tr>
              <td className="px-5 py-4 font-semibold text-gray-900">AV1</td>
              <td className="px-5 py-4 text-gray-600">~30% better than VP9</td>
              <td className="px-5 py-4 text-red-500 font-medium">Slowest</td>
              <td className="px-5 py-4 text-amber-600 font-medium">Modern Only</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function YTDatabaseTable() {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-5 py-4 font-bold text-gray-700 min-w-[150px]">Data Type</th>
              <th className="text-left px-5 py-4 font-bold text-gray-700 min-w-[150px]">Database</th>
              <th className="text-left px-5 py-4 font-bold text-gray-700">Why This Choice?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">Users, Metadata</td>
              <td className="px-5 py-4 text-blue-600 font-mono text-xs">MySQL / Vitess</td>
              <td className="px-5 py-4 text-gray-600">Relational integrity needed. Vitess handles horizontal sharding transparently at scale.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">Watch History</td>
              <td className="px-5 py-4 text-purple-600 font-mono text-xs">Google Bigtable</td>
              <td className="px-5 py-4 text-gray-600">Massive time-series writes. Optimized for row-key scans to feed ML training.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">Comments</td>
              <td className="px-5 py-4 text-amber-600 font-mono text-xs">Cassandra</td>
              <td className="px-5 py-4 text-gray-600">High write rate. Comments are write-heavy with burst spikes on viral videos.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">View Counts</td>
              <td className="px-5 py-4 text-red-500 font-mono text-xs">Redis + Bigtable</td>
              <td className="px-5 py-4 text-gray-600">Redis for real-time approximate counts. Bigtable for durable storage via batch sync.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-5 py-4 font-semibold text-gray-900">Search Index</td>
              <td className="px-5 py-4 text-teal-600 font-mono text-xs">Elasticsearch</td>
              <td className="px-5 py-4 text-gray-600">Inverted index for full-text search. Near real-time indexing of new videos.</td>
            </tr>
            <tr>
              <td className="px-5 py-4 font-semibold text-gray-900">Analytics</td>
              <td className="px-5 py-4 text-blue-600 font-mono text-xs">BigQuery</td>
              <td className="px-5 py-4 text-gray-600">OLAP queries over petabytes for ad targeting and ML generation.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function YTSummaryTable() {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-5 py-4 font-bold text-gray-700 min-w-[150px]">Layer</th>
              <th className="text-left px-5 py-4 font-bold text-gray-700 min-w-[200px]">Technology</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Frontend</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">HTML5 Video, EME</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Load Balancer</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Google Front End, Anycast</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Backend</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Go, Python, C++, Java</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Upload</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Signed URLs + Chunked</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Message Queue</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Apache Kafka</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Transcoding</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">FFmpeg + Google VCU</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Object Storage</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Google Colossus</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">CDN</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Google Media CDN</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Streaming Proto</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">HLS + MPEG-DASH (QUIC)</td></tr>
            <tr><td className="px-5 py-3 font-semibold text-gray-900">Container Orch</td><td className="px-5 py-3 text-gray-600 font-mono text-xs">Kubernetes (Borg)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MISC COMPONENTS ─────────────────────────────────────────────────────────

export function YTTranscodingLayers() {
  const layers = [
    { name: "Input Formats", items: ["MP4/H.264", "AVI", "MOV", "MKV", "WebM"], color: "bg-red-50 text-red-600 border-red-200" },
    { name: "Resolutions", items: ["144p", "240p", "360p", "480p", "720p", "1080p", "4K", "8K"], color: "bg-amber-50 text-amber-600 border-amber-200" },
    { name: "Codecs", items: ["H.264", "VP9", "AV1", "Opus Audio", "AAC"], color: "bg-blue-50 text-blue-600 border-blue-200" },
    { name: "Processing", items: ["FFmpeg", "Google VCU", "DAG Scheduler", "Parallel Workers"], color: "bg-teal-50 text-teal-600 border-teal-200" },
    { name: "Output Format", items: ["HLS (.m3u8/.ts)", "DASH (.mpd/.m4s)", "2-10s segments"], color: "bg-purple-50 text-purple-600 border-purple-200" },
  ];
  return (
    <div className="flex flex-col gap-3 my-8">
      {layers.map((l, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
          <div className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border min-w-[140px] text-center ${l.color}`}>
            {l.name}
          </div>
          <div className="flex flex-wrap gap-2">
            {l.items.map((item, j) => (
              <span key={j} className="text-xs font-mono text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function YTMlSignals() {
  const bars = [
    { label: "Watch Time Completion Rate", pct: "95%", bg: "bg-purple-500" },
    { label: "User's Topic Embedding Similarity", pct: "90%", bg: "bg-blue-500" },
    { label: "Click-Through Rate (CTR)", pct: "85%", bg: "bg-teal-500" },
    { label: "Like / Dislike Ratio", pct: "75%", bg: "bg-indigo-500" },
    { label: "Creator Subscription Signal", pct: "70%", bg: "bg-amber-500" },
    { label: "Comment + Share Rate", pct: "65%", bg: "bg-pink-500" },
    { label: "Content Freshness", pct: "55%", bg: "bg-red-500" },
  ];
  return (
    <div className="flex flex-col gap-4 my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      {bars.map((b, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="font-mono text-xs text-gray-700 sm:w-64 flex-shrink-0">{b.label}</div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex-1">
            <div className={`h-full rounded-full ${b.bg}`} style={{ width: b.pct }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function YTAnalyticsLayers() {
  const layers = [
    { name: "Event Ingest", items: ["Client beacons", "Server events", "Apache Kafka (durable log)"], class: "bg-blue-50 border-blue-200 text-blue-700" },
    { name: "Speed Layer", items: ["Apache Flink", "Real-time approx metrics", "Trending videos detection", "Live viewer counts"], class: "bg-amber-50 border-amber-200 text-amber-700" },
    { name: "Batch Layer", items: ["Apache Spark", "Nightly accurate aggregations", "ML training data", "Creator analytics"], class: "bg-teal-50 border-teal-200 text-teal-700" },
    { name: "Serving Layer", items: ["BigQuery (OLAP)", "Bigtable (metrics)", "Creator Studio", "Ad Targeting System"], class: "bg-purple-50 border-purple-200 text-purple-700" },
  ];
  return (
    <div className="flex flex-col gap-3 my-8">
      {layers.map((l, i) => (
        <div key={i} className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center border p-4 rounded-xl shadow-sm ${l.class}`}>
          <div className="font-mono text-[11px] font-bold uppercase tracking-widest min-w-[140px]">
            {l.name}
          </div>
          <div className="flex flex-wrap gap-2">
            {l.items.map((item, j) => (
              <span key={j} className="text-xs font-mono bg-white/60 border border-black/10 px-2 py-0.5 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function YTFaultAccordion() {
  const items = [
    { q: "Multi-Region Redundancy", a: "YouTube's infrastructure spans multiple GCP regions. Every critical service runs in at least 3 regions. If an entire data center fails, traffic fails over via Anycast DNS within seconds. This is tested via continuous chaos engineering." },
    { q: "Replication and Backups", a: "MySQL maintains synchronous replicas across zones. Colossus stores exact video segments using Reed-Solomon erasure coding — extra parity chunks allow reconstruction even if multiple storage nodes fail simultaneously, without 2x storage bloat." },
    { q: "Circuit Breakers & Graceful Degradation", a: "If the ML recommendation service crashes, YouTube gracefully degrades to showing generic trending videos rather than throwing a 500 Error server page. Circuit breakers prevent cascading queues when downstream systems stall." },
    { q: "Idempotent Operations", a: "Uploading relies on idempotency — if a 5MB chunk is retried due to network drops, the backend recognizes the video ID and chunk index, overwriting or ignoring it safely without duplicating data." }
  ];
  return (
    <div className="my-8 flex flex-col gap-3">
      {items.map((item, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex justify-between items-center font-bold font-sans cursor-pointer list-none p-5 text-gray-900 group-hover:bg-gray-50 transition-colors">
            {item.q}
            <span className="transition group-open:rotate-180">
              <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
          </summary>
          <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50 mt-1 pb-6">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

// ─── TRADEOFF COMPARE ────────────────────────────────────────────────────────
const TradeoffCard = ({ title, items, isPro }: any) => (
  <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <div className={`font-mono text-[10px] font-bold uppercase tracking-widest mb-4 ${isPro ? "text-teal-600" : "text-red-500"}`}>
      {title}
    </div>
    <ul className="flex flex-col gap-3">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex gap-3 text-sm text-gray-600 items-start">
          <span className={`mt-0.5 flex-shrink-0 font-bold ${isPro ? "text-teal-500" : "text-red-400"}`}>{isPro ? "✓" : "×"}</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export function YTTradeoffsConsistency() {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-8">
      <TradeoffCard isPro={true} title="Eventual Consistency (Chosen)" items={["View counts and likes can be delayed by seconds/minutes", "Massively higher write throughput (Redis + Kafka)", "No global distributed lock needed"]} />
      <TradeoffCard isPro={false} title="Strong Consistency (Not chosen)" items={["Every view would require a distributed transaction", "Impossibly high latency at billions of events/day", "Users don't care if view count is 1.2M vs 1.200001M"]} />
    </div>
  );
}
export function YTTradeoffsMicro() {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-8">
      <TradeoffCard isPro={true} title="Microservices (Chosen)" items={["Independent scaling (e.g. transcode separate from search)", "Teams deploy independently safely", "Fault isolation (subs failure doesn't break video watch)"]} />
      <TradeoffCard isPro={false} title="Monolith (Did not scale)" items={["Simpler local development and debugging", "No network overhead between service calls", "Painful to scale globally with multiple teams concurrently editing"]} />
    </div>
  );
}
export function YTTradeoffsPush() {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-8">
      <TradeoffCard isPro={true} title="Pull Model (Chosen)" items={["No need to push to 100M subscribers when a massive creator uploads", "Feed generated on-demand at read time", "No fan-out write amplification"]} />
      <TradeoffCard isPro={false} title="Push Model (Not scalable)" items={["Faster initial feed load (pre-computed)", "Used by Twitter for small followings", "Cannot handle celebrity-scale broadcast updates (e.g. MrBeast)"]} />
    </div>
  );
}

// ─── SVG ARCHITECTURE DIAGRAMS (auto-generated + light-mode adapted) ──────────

export function YTHighLevelArchSVG() {
  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white p-4 overflow-x-auto" aria-label="YouTube High Level Architecture Diagram">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4">Full System Architecture — Microservices Overview</p>
      <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minWidth: 600 }}>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af"/></marker>
          <marker id="arrow-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#059669"/></marker>
        </defs>
        <rect x="0" y="0" width="900" height="520" fill="#ffffff" rx="8"/>
        {/* Client Layer */}
        <rect x="20" y="20" width="860" height="70" fill="#fff1f2" rx="8" stroke="#fecdd3" strokeWidth="1"/>
        <text x="450" y="36" fill="#ef4444" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="2">CLIENT LAYER</text>
        <rect x="60" y="44" width="90" height="32" fill="#f9fafb" rx="5" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="105" y="65" fill="#111827" textAnchor="middle" fontSize="10">Web Browser</text>
        <rect x="180" y="44" width="90" height="32" fill="#f9fafb" rx="5" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="225" y="65" fill="#111827" textAnchor="middle" fontSize="10">Mobile App</text>
        <rect x="300" y="44" width="90" height="32" fill="#f9fafb" rx="5" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="345" y="65" fill="#111827" textAnchor="middle" fontSize="10">Smart TV</text>
        <rect x="420" y="44" width="100" height="32" fill="#f9fafb" rx="5" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="470" y="65" fill="#111827" textAnchor="middle" fontSize="10">Gaming Console</text>
        <rect x="540" y="44" width="90" height="32" fill="#f9fafb" rx="5" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="585" y="65" fill="#111827" textAnchor="middle" fontSize="10">Embedded/API</text>
        {/* CDN */}
        <rect x="580" y="105" width="300" height="60" fill="#fffbeb" rx="8" stroke="#fde68a" strokeWidth="1"/>
        <text x="730" y="122" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="2">GOOGLE MEDIA CDN</text>
        <text x="650" y="148" fill="#6b7280" textAnchor="middle" fontSize="9">3,000+ Edge Nodes · 95%+ Cache Hit</text>
        {/* LB */}
        <rect x="160" y="110" width="130" height="50" fill="#f9fafb" rx="8" stroke="#60a5fa" strokeWidth="1.5"/>
        <text x="225" y="131" fill="#2563eb" textAnchor="middle" fontSize="9" fontWeight="600">LOAD BALANCER</text>
        <text x="225" y="148" fill="#6b7280" textAnchor="middle" fontSize="9">L4 / L7 (GFE)</text>
        {/* API GW */}
        <rect x="330" y="110" width="130" height="50" fill="#f9fafb" rx="8" stroke="#a78bfa" strokeWidth="1.5"/>
        <text x="395" y="131" fill="#7c3aed" textAnchor="middle" fontSize="9" fontWeight="600">API GATEWAY</text>
        <text x="395" y="148" fill="#6b7280" textAnchor="middle" fontSize="9">Auth · Rate Limit · Route</text>
        {/* Microservices band */}
        <rect x="20" y="185" width="860" height="100" fill="#eff6ff" rx="8" stroke="#bfdbfe" strokeWidth="1"/>
        <text x="40" y="202" fill="#2563eb" fontSize="9" fontWeight="600" letterSpacing="2">MICROSERVICES</text>
        <rect x="40" y="210" width="110" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="95" y="228" fill="#2563eb" textAnchor="middle" fontSize="9" fontWeight="600">UPLOAD</text>
        <text x="95" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">Chunked</text>
        <text x="95" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">Resumable</text>
        <rect x="165" y="210" width="110" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="220" y="228" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">TRANSCODE</text>
        <text x="220" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">FFmpeg + VCU</text>
        <text x="220" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">6+ formats</text>
        <rect x="290" y="210" width="110" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="345" y="228" fill="#059669" textAnchor="middle" fontSize="9" fontWeight="600">PLAYBACK</text>
        <text x="345" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">ABR / HLS</text>
        <text x="345" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">DASH / QUIC</text>
        <rect x="415" y="210" width="110" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="470" y="228" fill="#7c3aed" textAnchor="middle" fontSize="9" fontWeight="600">RECOMMEND</text>
        <text x="470" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">TensorFlow</text>
        <text x="470" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">2-stage ML</text>
        <rect x="540" y="210" width="110" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="595" y="228" fill="#ea580c" textAnchor="middle" fontSize="9" fontWeight="600">SEARCH</text>
        <text x="595" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">Elasticsearch</text>
        <text x="595" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">Inverted Index</text>
        <rect x="665" y="210" width="110" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="720" y="228" fill="#db2777" textAnchor="middle" fontSize="9" fontWeight="600">NOTIFICATION</text>
        <text x="720" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">Kafka + Push</text>
        <text x="720" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">WebSockets</text>
        <rect x="790" y="210" width="90" height="55" fill="#ffffff" rx="6" stroke="#e5e7eb" strokeWidth="1"/>
        <text x="835" y="228" fill="#6b7280" textAnchor="middle" fontSize="9" fontWeight="600">ANALYTICS</text>
        <text x="835" y="243" fill="#6b7280" textAnchor="middle" fontSize="9">Kafka+Spark</text>
        <text x="835" y="255" fill="#6b7280" textAnchor="middle" fontSize="9">BigQuery</text>
        {/* Kafka */}
        <rect x="165" y="310" width="200" height="45" fill="#f9fafb" rx="8" stroke="#fcd34d" strokeWidth="1.5"/>
        <text x="265" y="330" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">APACHE KAFKA</text>
        <text x="265" y="346" fill="#6b7280" textAnchor="middle" fontSize="9">Event Streaming / Job Queue</text>
        {/* Storage */}
        <rect x="20" y="370" width="860" height="125" fill="#ecfdf5" rx="8" stroke="#a7f3d0" strokeWidth="1"/>
        <text x="40" y="388" fill="#059669" fontSize="9" fontWeight="600" letterSpacing="2">STORAGE LAYER</text>
        <rect x="35" y="396" width="120" height="80" fill="#ffffff" rx="6" stroke="#bfdbfe" strokeWidth="1"/>
        <text x="95" y="416" fill="#2563eb" textAnchor="middle" fontSize="9" fontWeight="600">MySQL/Vitess</text>
        <text x="95" y="432" fill="#6b7280" textAnchor="middle" fontSize="9">Users</text>
        <text x="95" y="446" fill="#6b7280" textAnchor="middle" fontSize="9">Channels</text>
        <text x="95" y="460" fill="#6b7280" textAnchor="middle" fontSize="9">Subscriptions</text>
        <rect x="170" y="396" width="120" height="80" fill="#ffffff" rx="6" stroke="#e9d5ff" strokeWidth="1"/>
        <text x="230" y="416" fill="#7c3aed" textAnchor="middle" fontSize="9" fontWeight="600">Bigtable</text>
        <text x="230" y="432" fill="#6b7280" textAnchor="middle" fontSize="9">Watch History</text>
        <text x="230" y="446" fill="#6b7280" textAnchor="middle" fontSize="9">Engagement</text>
        <text x="230" y="460" fill="#6b7280" textAnchor="middle" fontSize="9">Time-series</text>
        <rect x="305" y="396" width="120" height="80" fill="#ffffff" rx="6" stroke="#fde68a" strokeWidth="1"/>
        <text x="365" y="416" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">Cassandra</text>
        <text x="365" y="432" fill="#6b7280" textAnchor="middle" fontSize="9">Comments</text>
        <text x="365" y="446" fill="#6b7280" textAnchor="middle" fontSize="9">Notifications</text>
        <text x="365" y="460" fill="#6b7280" textAnchor="middle" fontSize="9">High write rate</text>
        <rect x="440" y="396" width="120" height="80" fill="#ffffff" rx="6" stroke="#fecdd3" strokeWidth="1"/>
        <text x="500" y="416" fill="#ea580c" textAnchor="middle" fontSize="9" fontWeight="600">Redis Cache</text>
        <text x="500" y="432" fill="#6b7280" textAnchor="middle" fontSize="9">Sessions</text>
        <text x="500" y="446" fill="#6b7280" textAnchor="middle" fontSize="9">View counts</text>
        <text x="500" y="460" fill="#6b7280" textAnchor="middle" fontSize="9">Feed cache</text>
        <rect x="575" y="396" width="140" height="80" fill="#ffffff" rx="6" stroke="#a7f3d0" strokeWidth="1"/>
        <text x="645" y="416" fill="#059669" textAnchor="middle" fontSize="9" fontWeight="600">Google Colossus</text>
        <text x="645" y="432" fill="#6b7280" textAnchor="middle" fontSize="9">Raw Videos</text>
        <text x="645" y="446" fill="#6b7280" textAnchor="middle" fontSize="9">Transcoded Segs</text>
        <text x="645" y="460" fill="#6b7280" textAnchor="middle" fontSize="9">~1 EB total</text>
        <rect x="730" y="396" width="140" height="80" fill="#ffffff" rx="6" stroke="#fbcfe8" strokeWidth="1"/>
        <text x="800" y="416" fill="#db2777" textAnchor="middle" fontSize="9" fontWeight="600">Elasticsearch</text>
        <text x="800" y="432" fill="#6b7280" textAnchor="middle" fontSize="9">Video Index</text>
        <text x="800" y="446" fill="#6b7280" textAnchor="middle" fontSize="9">Metadata</text>
        <text x="800" y="460" fill="#6b7280" textAnchor="middle" fontSize="9">Full-text search</text>
        {/* Arrows */}
        <line x1="225" y1="90" x2="225" y2="110" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrow)"/>
        <line x1="395" y1="90" x2="395" y2="110" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrow)"/>
        <line x1="585" y1="90" x2="700" y2="105" stroke="#d97706" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrow)"/>
        <line x1="290" y1="135" x2="330" y2="135" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrow)"/>
        <line x1="395" y1="160" x2="395" y2="210" stroke="#9ca3af" strokeWidth="1" markerEnd="url(#arrow)"/>
        <line x1="220" y1="265" x2="240" y2="310" stroke="#d97706" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrow)"/>
        <line x1="450" y1="285" x2="450" y2="370" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrow)"/>
        <line x1="730" y1="285" x2="800" y2="370" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrow)"/>
        <line x1="95" y1="285" x2="95" y2="370" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#arrow)"/>
        <line x1="730" y1="165" x2="645" y2="370" stroke="#059669" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrow-teal)"/>
      </svg>
    </div>
  );
}

export function YTTranscodingDAG() {
  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white p-4 overflow-x-auto" aria-label="Video Transcoding DAG">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4">Video Transcoding DAG — Parallel Execution</p>
      <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minWidth: 500 }}>
        <defs>
          <marker id="arrow-teal-t" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#059669"/></marker>
        </defs>
        <rect width="800" height="300" fill="#ffffff" rx="8"/>
        <rect x="30" y="120" width="110" height="50" fill="#f9fafb" rx="6" stroke="#93c5fd" strokeWidth="1.5"/>
        <text x="85" y="140" fill="#2563eb" textAnchor="middle" fontSize="9" fontWeight="600">RAW VIDEO</text>
        <text x="85" y="156" fill="#6b7280" textAnchor="middle" fontSize="9">video.mp4 · 4GB</text>
        <line x1="140" y1="145" x2="180" y2="60" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="140" y1="145" x2="180" y2="110" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="140" y1="145" x2="180" y2="160" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="140" y1="145" x2="180" y2="210" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="140" y1="145" x2="180" y2="255" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <rect x="180" y="40" width="120" height="38" fill="#f9fafb" rx="5" stroke="#fbbf24" strokeWidth="1"/>
        <text x="240" y="57" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">4K · AV1</text>
        <text x="240" y="70" fill="#6b7280" textAnchor="middle" fontSize="9">Worker Cluster A</text>
        <rect x="180" y="90" width="120" height="38" fill="#f9fafb" rx="5" stroke="#fbbf24" strokeWidth="1"/>
        <text x="240" y="107" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">1080p · VP9</text>
        <text x="240" y="120" fill="#6b7280" textAnchor="middle" fontSize="9">Worker Cluster B</text>
        <rect x="180" y="140" width="120" height="38" fill="#f9fafb" rx="5" stroke="#fda4af" strokeWidth="1"/>
        <text x="240" y="157" fill="#ea580c" textAnchor="middle" fontSize="9" fontWeight="600">720p · H.264</text>
        <text x="240" y="170" fill="#6b7280" textAnchor="middle" fontSize="9">Worker Cluster C</text>
        <rect x="180" y="190" width="120" height="38" fill="#f9fafb" rx="5" stroke="#6ee7b7" strokeWidth="1"/>
        <text x="240" y="207" fill="#059669" textAnchor="middle" fontSize="9" fontWeight="600">360p + 480p</text>
        <text x="240" y="220" fill="#6b7280" textAnchor="middle" fontSize="9">Worker Cluster D</text>
        <rect x="180" y="238" width="120" height="38" fill="#f9fafb" rx="5" stroke="#c4b5fd" strokeWidth="1"/>
        <text x="240" y="255" fill="#7c3aed" textAnchor="middle" fontSize="9" fontWeight="600">144p + 240p</text>
        <text x="240" y="268" fill="#6b7280" textAnchor="middle" fontSize="9">Worker Cluster E</text>
        <line x1="300" y1="59" x2="410" y2="100" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="300" y1="109" x2="410" y2="115" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="300" y1="159" x2="410" y2="130" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="300" y1="209" x2="410" y2="145" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="300" y1="257" x2="410" y2="160" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2"/>
        <rect x="410" y="88" width="130" height="100" fill="#f9fafb" rx="6" stroke="#6ee7b7" strokeWidth="1.5"/>
        <text x="475" y="110" fill="#059669" textAnchor="middle" fontSize="9" fontWeight="600">POST PROCESS</text>
        <text x="475" y="128" fill="#6b7280" textAnchor="middle" fontSize="9">Content Moderation</text>
        <text x="475" y="144" fill="#6b7280" textAnchor="middle" fontSize="9">Copyright Check (CID)</text>
        <text x="475" y="160" fill="#6b7280" textAnchor="middle" fontSize="9">Thumbnail Generate</text>
        <text x="475" y="176" fill="#6b7280" textAnchor="middle" fontSize="9">Subtitle / Chapters</text>
        <line x1="540" y1="138" x2="600" y2="138" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrow-teal-t)"/>
        <rect x="600" y="90" width="160" height="95" fill="#f9fafb" rx="6" stroke="#fbbf24" strokeWidth="1.5"/>
        <text x="680" y="112" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">DISTRIBUTE</text>
        <text x="680" y="130" fill="#6b7280" textAnchor="middle" fontSize="9">Colossus (origin store)</text>
        <text x="680" y="147" fill="#6b7280" textAnchor="middle" fontSize="9">CDN Edge (popular)</text>
        <text x="680" y="164" fill="#6b7280" textAnchor="middle" fontSize="9">Update DB → LIVE</text>
        <text x="85" y="15" fill="#9ca3af" textAnchor="middle" fontSize="8">INGEST</text>
        <text x="240" y="15" fill="#9ca3af" textAnchor="middle" fontSize="8">PARALLEL ENCODE</text>
        <text x="475" y="15" fill="#9ca3af" textAnchor="middle" fontSize="8">QA + META</text>
        <text x="680" y="15" fill="#9ca3af" textAnchor="middle" fontSize="8">PUBLISH</text>
      </svg>
    </div>
  );
}

export function YTCdnArchSVG() {
  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white p-4 overflow-x-auto" aria-label="Three-Tier CDN Architecture">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4">Three-Tier CDN Cache Hierarchy</p>
      <svg viewBox="0 0 780 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minWidth: 480 }}>
        <defs>
          <marker id="arrow-c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af"/></marker>
          <marker id="arrow-teal-c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#059669"/></marker>
        </defs>
        <rect width="780" height="200" fill="#ffffff" rx="8"/>
        <rect x="20" y="70" width="140" height="70" rx="8" fill="#f9fafb" stroke="#60a5fa" strokeWidth="1.5"/>
        <text x="90" y="92" fill="#2563eb" textAnchor="middle" fontSize="9" fontWeight="600">ORIGIN STORE</text>
        <text x="90" y="108" fill="#6b7280" textAnchor="middle" fontSize="9">Google Colossus</text>
        <text x="90" y="122" fill="#6b7280" textAnchor="middle" fontSize="9">All video segments</text>
        <text x="90" y="168" fill="#9ca3af" textAnchor="middle" fontSize="8">Cache miss: fetch here</text>
        <line x1="160" y1="105" x2="200" y2="105" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow-c)"/>
        <rect x="200" y="50" width="160" height="110" rx="8" fill="#f9fafb" stroke="#fbbf24" strokeWidth="1.5"/>
        <text x="280" y="72" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">REGIONAL POP</text>
        <text x="280" y="88" fill="#6b7280" textAnchor="middle" fontSize="9">~150 locations</text>
        <text x="280" y="104" fill="#6b7280" textAnchor="middle" fontSize="9">HDD warm cache</text>
        <text x="280" y="120" fill="#6b7280" textAnchor="middle" fontSize="9">Popular in last 7d</text>
        <text x="280" y="175" fill="#9ca3af" textAnchor="middle" fontSize="8">~70% cache hit</text>
        <line x1="360" y1="105" x2="400" y2="105" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arrow-c)"/>
        <rect x="400" y="30" width="160" height="130" rx="8" fill="#f9fafb" stroke="#6ee7b7" strokeWidth="1.5"/>
        <text x="480" y="55" fill="#059669" textAnchor="middle" fontSize="9" fontWeight="600">EDGE NODE</text>
        <text x="480" y="71" fill="#6b7280" textAnchor="middle" fontSize="9">3,000+ locations</text>
        <text x="480" y="87" fill="#6b7280" textAnchor="middle" fontSize="9">SSD fast cache</text>
        <text x="480" y="103" fill="#6b7280" textAnchor="middle" fontSize="9">Top 1% content</text>
        <text x="480" y="119" fill="#6b7280" textAnchor="middle" fontSize="9">ML pre-cached</text>
        <text x="480" y="135" fill="#6b7280" textAnchor="middle" fontSize="9">before going viral</text>
        <text x="480" y="175" fill="#9ca3af" textAnchor="middle" fontSize="8">95%+ cache hit</text>
        <line x1="560" y1="105" x2="600" y2="105" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrow-teal-c)"/>
        <rect x="600" y="70" width="140" height="70" rx="8" fill="#f9fafb" stroke="#fda4af" strokeWidth="1.5"/>
        <text x="670" y="92" fill="#ea580c" textAnchor="middle" fontSize="9" fontWeight="600">USER DEVICE</text>
        <text x="670" y="108" fill="#6b7280" textAnchor="middle" fontSize="9">Browser / App</text>
        <text x="670" y="124" fill="#059669" textAnchor="middle" fontSize="9">HLS/DASH stream</text>
        <text x="670" y="168" fill="#9ca3af" textAnchor="middle" fontSize="8">&lt;2s start (popular)</text>
      </svg>
    </div>
  );
}

export function YTMlArchSVG() {
  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white p-4 overflow-x-auto" aria-label="Two-Stage ML Recommendation Architecture">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4">Two-Stage Recommendation ML Pipeline</p>
      <svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", minWidth: 480 }}>
        <defs>
          <marker id="arrow-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af"/></marker>
          <marker id="arrow-teal-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#059669"/></marker>
        </defs>
        <rect width="760" height="230" fill="#ffffff" rx="8"/>
        <rect x="20" y="30" width="200" height="165" rx="8" fill="#f9fafb" stroke="#c4b5fd" strokeWidth="1.5"/>
        <text x="120" y="52" fill="#7c3aed" textAnchor="middle" fontSize="9" fontWeight="600">STAGE 1</text>
        <text x="120" y="67" fill="#7c3aed" textAnchor="middle" fontSize="10" fontWeight="600">Candidate Generation</text>
        <text x="120" y="88" fill="#6b7280" textAnchor="middle" fontSize="8">Input: Watch history,</text>
        <text x="120" y="103" fill="#6b7280" textAnchor="middle" fontSize="8">search history, demographics</text>
        <line x1="40" y1="112" x2="200" y2="112" stroke="#e5e7eb" strokeWidth="0.5"/>
        <text x="120" y="128" fill="#111827" textAnchor="middle" fontSize="8">Collaborative Filtering</text>
        <text x="120" y="143" fill="#111827" textAnchor="middle" fontSize="8">Matrix Factorization</text>
        <text x="120" y="158" fill="#111827" textAnchor="middle" fontSize="8">Embedding similarity</text>
        <text x="120" y="178" fill="#059669" textAnchor="middle" fontSize="8" fontWeight="600">Output: ~100s of candidates</text>
        <text x="120" y="190" fill="#9ca3af" textAnchor="middle" fontSize="7">from 800M+ videos → fast</text>
        <line x1="220" y1="113" x2="270" y2="113" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-m)"/>
        <rect x="270" y="30" width="230" height="165" rx="8" fill="#f9fafb" stroke="#6ee7b7" strokeWidth="1.5"/>
        <text x="385" y="52" fill="#059669" textAnchor="middle" fontSize="9" fontWeight="600">STAGE 2</text>
        <text x="385" y="67" fill="#059669" textAnchor="middle" fontSize="10" fontWeight="600">Deep Ranking</text>
        <text x="385" y="88" fill="#6b7280" textAnchor="middle" fontSize="8">Input: 100s candidates + rich features</text>
        <line x1="290" y1="96" x2="480" y2="96" stroke="#e5e7eb" strokeWidth="0.5"/>
        <text x="385" y="112" fill="#111827" textAnchor="middle" fontSize="8">Deep Neural Network</text>
        <text x="385" y="127" fill="#111827" textAnchor="middle" fontSize="8">Features: CTR, watch time,</text>
        <text x="385" y="142" fill="#111827" textAnchor="middle" fontSize="8">likes, shares, freshness,</text>
        <text x="385" y="157" fill="#111827" textAnchor="middle" fontSize="8">diversity, satisfaction score</text>
        <text x="385" y="178" fill="#059669" textAnchor="middle" fontSize="8" fontWeight="600">Output: Top 20–50 ranked</text>
        <text x="385" y="190" fill="#9ca3af" textAnchor="middle" fontSize="7">precise but slower</text>
        <line x1="500" y1="113" x2="540" y2="113" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrow-teal-m)"/>
        <rect x="540" y="60" width="190" height="110" rx="8" fill="#f9fafb" stroke="#fbbf24" strokeWidth="1.5"/>
        <text x="635" y="82" fill="#d97706" textAnchor="middle" fontSize="9" fontWeight="600">HOMEPAGE + UP NEXT</text>
        <text x="635" y="100" fill="#6b7280" textAnchor="middle" fontSize="8">~20 personalized videos</text>
        <text x="635" y="116" fill="#6b7280" textAnchor="middle" fontSize="8">Diversity constraint applied</text>
        <text x="635" y="132" fill="#6b7280" textAnchor="middle" fontSize="8">(avoid rabbit holes)</text>
        <text x="635" y="148" fill="#6b7280" textAnchor="middle" fontSize="8">A/B tested continuously</text>
        <text x="635" y="164" fill="#d97706" textAnchor="middle" fontSize="7" fontWeight="600">Drives 70%+ of watch time</text>
      </svg>
    </div>
  );
}
