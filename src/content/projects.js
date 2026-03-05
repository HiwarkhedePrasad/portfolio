// ============================================
// CENTRALIZED PROJECT DATA — Single source of truth
// ============================================

export const projects = [
  {
    slug: 'heimdall',
    title: 'Heimdall',
    tagline: 'Hybrid DDoS Defense System',
    problem: 'Origin servers are vulnerable to complex L4/L7 DDoS attacks',
    approach: 'Hybrid defense using Deterministic Rules (L7) and Isolation Forest ML (L4)',
    challenge: 'Distinguishing flash crowds from malicious traffic in real-time',
    impact: 'Adaptive, self-healing shield against multi-vector attacks',
    description:
      'A hybrid DDoS prevention architecture combining deterministic L7 rules with Isolation Forest ML for L4 anomaly detection. Features real-time traffic classification and adaptive rate-limiting.',
    tags: ['Python', 'Isolation Forest', 'Scapy', 'Networking', 'ML'],
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    accentColor: 'text-emerald-400',
    github: 'https://github.com/HiwarkhedePrasad/Heimdall',
    live: null,
    focal: true,
    hasArchitectureDiagram: true,
  },
  {
    slug: 'chat-secure',
    title: 'Chat-Secure',
    tagline: 'Zero-Trace Messaging',
    problem: 'Messaging apps leave traces on servers',
    approach: 'RAM-only architecture, Signal Protocol',
    challenge: 'Zero-persistence key management',
    impact: 'True zero-trace messaging',
    description:
      'A "Zero-Trace" messaging app where data never touches a hard drive. Runs entirely in volatile memory (RAM) with a "Panic Button" that instantly wipes encryption keys.',
    tags: ['Node.js', 'Redis', 'Signal Protocol', 'E2EE'],
    gradient: 'from-red-500/20 to-rose-500/20',
    accentColor: 'text-red-400',
    github: null, // Private / NDA
    live: null,
    focal: false,
  },
  {
    slug: 'bytewise',
    title: 'ByteWise',
    tagline: 'C Struct Memory Optimizer',
    problem: 'C structs waste memory due to padding',
    approach: 'VS Code extension with AST parsing',
    challenge: 'Real-time analysis without compilation',
    impact: 'Visualizes invisible memory waste',
    description:
      'VS Code extension that visualizes invisible "wasted bytes" in C/C++ structs due to padding and alignment. Features a visual heatmap and one-click struct reordering.',
    tags: ['VS Code API', 'TypeScript', 'C/C++', 'AST'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: 'text-cyan-400',
    github: null, // Private / NDA
    live: null,
    focal: false,
  },
  {
    slug: 'self-correcting-rag-agent',
    title: 'Self-Correcting RAG',
    tagline: 'AI Agent with Feedback Loops',
    problem: 'LLMs hallucinate when retrieval fails',
    approach: 'LangGraph with feedback loops',
    challenge: 'Grading retrieval before generation',
    impact: '~40% reduction in hallucinations',
    description:
      'A LangGraph-powered PDF chatbot that fact-checks itself. Uses a corrective pattern to grade retrieved chunks and rewrite queries if data is irrelevant.',
    tags: ['LangGraph', 'Python', 'RAG', 'LLM'],
    gradient: 'from-violet-500/20 to-purple-500/20',
    accentColor: 'text-violet-400',
    github: 'https://github.com/HiwarkhedePrasad',
    live: null,
    focal: false,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
