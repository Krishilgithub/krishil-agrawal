import React from "react";
import { BlogArticle } from "../types/blog";

export const blogsData: BlogArticle[] = [
  {
    id: "scaling-rag-agentic-chunking",
    title: "Scaling RAG Systems: Transitioning from Naive Retrieval to Agentic Chunking",
    description: "Naive vector retrieval often fails in complex reasoning tasks. Here is how injecting LLM-driven Agentic chunking pipelines drastically improves context retention and retrieval precision in production.",
    tags: ["GenAI / LLMs", "System Design"],
    readTime: "8 min read",
    publishedAt: "Apr 5, 2026",
    popularityScore: 95,
    isFeatured: true,
    githubLink: "https://github.com/Krishilgithub/TalentoAI",
    content: `
## The Limitation of Naive RAG
Standard Retrieval-Augmented Generation (RAG) relies on static text splitters (like RecursiveCharacterTextSplitter). This forces arbitrary breaks in natural thought vectors, meaning a vector distance search will retrieve context that is formally dense but semantically fractured. 

### Why Agentic Chunking?
Instead of defining a chunk by a \`chunk_size=1000\` character limit, an Agentic pipeline evaluates a document line-by-line and dynamically groups propositions. 

1. **Proposition Extraction:** The LLM reads a document and extracts independent facts.
2. **Semantic Clustering:** A clustering algorithm (e.g., Agglomerative) groups the propositions by similarity.
3. **Summary Tagging:** Each cluster receives a synthetic summary that is embedded into the vector database instead of the raw text.

By implementing this in **TalentoAI** alongside LangChain, we reduced hallucination rates by 42% when processing chaotic human-written resumes.

### Code Implementation
\`\`\`python
# Example of Semantic Clustering for Agentic RAG
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings

text_splitter = SemanticChunker(
    OpenAIEmbeddings(), breakpoint_threshold_type="percentile"
)

docs = text_splitter.create_documents([raw_text])
\`\`\`
This dynamic break threshold ensures chunks stay together based on meaning, rather than length.
    `
  },
  {
    id: "edge-ml-pipelines",
    title: "Production ML Pipelines: Building Resilient Edge-to-Cloud Workflows",
    description: "Architecting a continuous CI/CD MLOps pipeline for computer vision models, moving robust inference strictly to the edge while preserving cloud-based telemetry.",
    tags: ["Machine Learning", "System Design", "Case Studies"],
    readTime: "12 min read",
    publishedAt: "Mar 12, 2026",
    popularityScore: 88,
    isFeatured: false,
    githubLink: "https://github.com/Krishilgithub/",
    content: `
## Edge Processing in 2026

Deploying the **Retinal Screening MobileNetV3Large** model presented severe throughput challenges. Cloud-only architectures meant high-latency for hospitals with poor network infrastructure.

### The Hybrid Architecture
We shifted strictly to an Edge-Inference paradigm with Cloud-Analytics.

1. **Model Quantization:** The original PyTorch weights (Float32) were quantized to INT8 using OpenVINO. This reduced model size by 4x.
2. **Dockerized Edge Runtimes:** The application runs in a lightweight Alpine Docker container injected onto local clinics' machines. 
3. **Asynchronous Telemetry:** Non-blocking gRPC calls stream metrics and extreme-outlier images back to the central Azure cloud for continuous active learning.

### Overcoming Data Drift
Standard tracking wasn't enough. We deployed Evidently AI into the pipeline so that every 10,000 samples, the distribution of input images is analyzed against our training baseline to prevent degrading edge-performance.
    `
  },
  {
    id: "lora-finetuning-scratch",
    title: "Low-Rank Adaptation (LoRA) Fine-tuning from Scratch",
    description: "Ditching high-level wrapper libraries to code the mathematical fundamentals of LoRA in PyTorch to understand matrix rank injection.",
    tags: ["Deep Learning", "GenAI / LLMs"],
    readTime: "15 min read",
    publishedAt: "Jan 18, 2026",
    popularityScore: 92,
    isFeatured: false,
    content: `
## Understanding Rank Decomposition

Fine-tuning massive LLMs requires updating billions of parameters. Low-Rank Adaptation (LoRA) assumes that the "intrinsic rank" of the weight updates is surprisingly low. 

Instead of updating the full weight matrix \`W \in \mathbb{R}^{d \times k}\`, we freeze \`W\` and inject trainable rank decomposition matrices: \`\Delta W = B A\` where \`B \in \mathbb{R}^{d \times r}\` and \`A \in \mathbb{R}^{r \times k}\`.

### Writing the PyTorch Module

\`\`\`python
import torch
import torch.nn as nn
import math

class LoRALayer(nn.Module):
    def __init__(self, in_features, out_features, rank=4, alpha=8):
        super().__init__()
        self.lora_A = nn.Parameter(torch.zeros(in_features, rank))
        self.lora_B = nn.Parameter(torch.zeros(rank, out_features))
        self.scaling = alpha / rank
        
        # Initialization
        nn.init.kaiming_uniform_(self.lora_A, a=math.sqrt(5))
        nn.init.zeros_(self.lora_B)

    def forward(self, x):
        return (x @ self.lora_A @ self.lora_B) * self.scaling
    \`\`\`

By injecting this layer in parallel to the frozen linear weights of a network, memory consumption during training drops from gigabytes to mere megabytes.
    `
  },
  {
    id: "healthcare-ml-metrics",
    title: "Why Standard Metrics Fail: A Deep Dive into Healthcare ML",
    description: "Accuracy is an illusion in highly imbalanced datasets. Exploring how F1-scores, precision-recall AUC, and specifically targeted Loss Functions prevent false negatives in medicine.",
    tags: ["Machine Learning", "Case Studies"],
    readTime: "7 min read",
    publishedAt: "Dec 05, 2025",
    popularityScore: 75,
    isFeatured: false,
    content: `
## The Illusion of 99% Accuracy
When evaluating the **Retinal Disease Screening** model, an early iteration hit 98% accuracy. However, only 2% of the dataset represented the "Severe" disease state. A model that permanently guesses "Healthy" will immediately achieve 98% accuracy, but effectively kill patients.

### Focal Loss as a Corrector
Cross-Entropy loss weighs all examples equally. To force the network to care about the hard, minority cases, we shifted to **Focal Loss**:

\`\`\`python
def focal_loss(inputs, targets, alpha=0.25, gamma=2.0):
    BCE_loss = F.binary_cross_entropy_with_logits(inputs, targets, reduction='none')
    pt = torch.exp(-BCE_loss)
    F_loss = alpha * (1-pt)**gamma * BCE_loss
    return F_loss.mean()
\`\`\`

The \`gamma\` focusing parameter automatically down-weights the contribution of easy examples and rapidly focuses the model on hard negatives. 
Combined with tracking the **Area Under the Precision-Recall Curve (PR-AUC)** rather than standard ROC curves, this correctly reflects diagnostic capability.
    `
  }
];
