import type { Accent } from "./systems";

export type Lane = { id: string; label: string; accent: Accent; col: number };

// Lanes are columns in the graph, like branches in `git log --graph`.
export const lanes: Lane[] = [
  { id: "main", label: "main", accent: "violet", col: 0 },
  { id: "study", label: "study", accent: "teal", col: 1 },
  { id: "myganji", label: "myganji", accent: "amber", col: 2 },
  { id: "metacap", label: "metacap", accent: "rose", col: 3 },
];

export type Commit = {
  hash: string;
  year: string;
  lane: string;
  /** "branch" opens a lane from main, "merge" brings a lane back. */
  type?: "branch" | "merge" | "head";
  title: string;
  body: string;
  added: string[];
  ref?: string;
};

// Newest first, the way git log prints it.
export const commits: Commit[] = [
  {
    hash: "a7f3e21",
    year: "Now",
    lane: "main",
    type: "head",
    ref: "HEAD",
    title: "Taking on client projects and senior roles",
    body: "Running MyGanji and MetaCap AI, and building for a small number of clients who need payments, agents or a platform that has to hold up on launch day.",
    added: ["Open to client projects", "Open to senior engineering roles"],
  },
  {
    hash: "5c1d9b0",
    year: "2026",
    lane: "metacap",
    type: "branch",
    ref: "metacap",
    title: "CTO, MetaCap AI",
    body: "Leading the engineering behind voice agents, messaging agents and platform builds for clients.",
    added: ["Sales Crew: voice agents on real phone lines", "Marketing Crew: one brief, every channel", "Digital Starter Pack and Hack-a-Milli"],
  },
  {
    hash: "e42b7aa",
    year: "2024",
    lane: "study",
    type: "merge",
    title: "Graduated, Kenyatta University",
    body: "Finished the degree while shipping production code the whole way through.",
    added: ["Degree, Kenyatta University", "Shipped work throughout"],
  },
  {
    hash: "91ad04c",
    year: "2022",
    lane: "main",
    title: "Digital Systems Manager, AIFML",
    body: "Automated support and sales workflows, and ran the ERP the business depended on every morning.",
    added: ["Support and sales automation", "ERP ownership"],
  },
  {
    hash: "3be8f17",
    year: "2021",
    lane: "myganji",
    type: "branch",
    ref: "myganji",
    title: "Founded MyGanji",
    body: "Built PayHub: collections, disbursements and business payments through one integration.",
    added: ["C2B collections", "B2C disbursements", "B2B payments", "Ledger and reconciliation"],
  },
  {
    hash: "0d4a6c2",
    year: "2019",
    lane: "main",
    title: "Wrote my first production code",
    body: "Self-taught. Small client sites, paid in KES and lessons.",
    added: ["First paying clients", "Self-taught, no bootcamp"],
  },
];
