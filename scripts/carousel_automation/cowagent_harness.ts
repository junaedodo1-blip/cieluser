import fs from 'node:fs';
import path from 'node:path';

export interface CowBranchInfo {
  branchId: string;
  label: string;
  basePath: string;
  branchPath: string;
  createdAt: string;
  checkpoints: Array<{ label: string; timestamp: string }>;
  isPromoted?: boolean;
  status: 'active' | 'promoted' | 'discarded';
  metadata?: Record<string, any>;
}

export interface CowLineageManifest {
  version: string;
  masterBasePath: string;
  branches: Record<string, CowBranchInfo>;
  activeBranchId: string | null;
  history: Array<{ action: string; branchId: string; timestamp: string; details?: any }>;
}

export interface CowCandidate {
  label: string;
  branchId?: string;
  payload: any;
  score?: number;
}

const DEFAULT_MEMORY_DIR = 'data/memory';
const MANIFEST_FILE = '.agenticow.json';

/**
 * CowAgent Harness: Copy-On-Write Memory, Checkpointing, and Speculative Branching
 * for Distributed Subagents across the entire Open Design Carousel Engine.
 */
export class CowAgentHarness {
  private memoryDir: string;
  private manifestPath: string;
  private manifest: CowLineageManifest;

  constructor(memoryDir = DEFAULT_MEMORY_DIR) {
    this.memoryDir = path.resolve(process.cwd(), memoryDir);
    if (!fs.existsSync(this.memoryDir)) {
      fs.mkdirSync(this.memoryDir, { recursive: true });
    }
    this.manifestPath = path.join(this.memoryDir, MANIFEST_FILE);
    this.manifest = this.loadManifest();
  }

  private loadManifest(): CowLineageManifest {
    if (fs.existsSync(this.manifestPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.manifestPath, 'utf8'));
      } catch {
        // Fallback to default
      }
    }
    return {
      version: '0.2.3',
      masterBasePath: path.join(this.memoryDir, 'ciel_master.rvf'),
      branches: {},
      activeBranchId: null,
      history: [],
    };
  }

  private saveManifest(): void {
    fs.writeFileSync(this.manifestPath, JSON.stringify(this.manifest, null, 2), 'utf8');
  }

  /**
   * Forks an isolated Copy-On-Write branch for a specific subagent.
   */
  public branch(params: {
    label: string;
    subagentName: string;
    metadata?: Record<string, any>;
  }): CowBranchInfo {
    const { label, subagentName, metadata = {} } = params;
    const branchId = `cow_${subagentName}_${Date.now()}`;
    const branchPath = path.join(this.memoryDir, `${branchId}.rvf`);

    // Write initial COW branch snapshot (162-byte header with parent link)
    const cowHeader = JSON.stringify({
      parent: this.manifest.masterBasePath,
      subagent: subagentName,
      label,
      createdAt: new Date().toISOString(),
      entries: [],
    });
    fs.writeFileSync(branchPath, cowHeader, 'utf8');

    const branchInfo: CowBranchInfo = {
      branchId,
      label: `${subagentName}:${label}`,
      basePath: this.manifest.masterBasePath,
      branchPath,
      createdAt: new Date().toISOString(),
      checkpoints: [{ label: 'initial', timestamp: new Date().toISOString() }],
      status: 'active',
      metadata,
    };

    this.manifest.branches[branchId] = branchInfo;
    this.manifest.activeBranchId = branchId;
    this.manifest.history.push({
      action: 'branch',
      branchId,
      timestamp: new Date().toISOString(),
      details: { subagentName, label },
    });
    this.saveManifest();

    console.log(`🐮 [CowAgent] Forked COW branch "${branchInfo.label}" -> ${branchId}`);
    return branchInfo;
  }

  /**
   * Freezes a labelled checkpoint on the current COW branch.
   */
  public checkpoint(branchId: string, label: string): void {
    const branch = this.manifest.branches[branchId];
    if (!branch) {
      throw new Error(`Branch ID "${branchId}" not found in CowAgent manifest.`);
    }

    branch.checkpoints.push({
      label,
      timestamp: new Date().toISOString(),
    });

    this.manifest.history.push({
      action: 'checkpoint',
      branchId,
      timestamp: new Date().toISOString(),
      details: { label },
    });
    this.saveManifest();

    console.log(`🐮 [CowAgent] Created checkpoint "${label}" on branch ${branchId}`);
  }

  /**
   * Ingests memory/vectors/data into an active COW branch.
   */
  public ingest(branchId: string, data: { key: string; value: any }): void {
    const branch = this.manifest.branches[branchId];
    if (!branch || branch.status !== 'active') {
      throw new Error(`Cannot ingest into inactive branch "${branchId}".`);
    }

    let content: any = { entries: [] };
    if (fs.existsSync(branch.branchPath)) {
      try {
        content = JSON.parse(fs.readFileSync(branch.branchPath, 'utf8'));
      } catch {
        content = { entries: [] };
      }
    }

    content.entries = content.entries || [];
    content.entries.push({
      key: data.key,
      value: data.value,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(branch.branchPath, JSON.stringify(content, null, 2), 'utf8');
  }

  /**
   * Promotes a winning COW branch's edits into the master base and closes the branch.
   */
  public promote(branchId: string): void {
    const branch = this.manifest.branches[branchId];
    if (!branch) return;

    // Merge branch entries into master base
    let masterEntries: any[] = [];
    if (fs.existsSync(this.manifest.masterBasePath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(this.manifest.masterBasePath, 'utf8'));
        masterEntries = raw.entries || [];
      } catch {
        masterEntries = [];
      }
    }

    if (fs.existsSync(branch.branchPath)) {
      try {
        const branchRaw = JSON.parse(fs.readFileSync(branch.branchPath, 'utf8'));
        masterEntries.push(...(branchRaw.entries || []));
      } catch {
        // Ignored
      }
    }

    fs.writeFileSync(
      this.manifest.masterBasePath,
      JSON.stringify(
        {
          version: '0.2.3',
          updatedAt: new Date().toISOString(),
          entries: masterEntries,
        },
        null,
        2
      ),
      'utf8'
    );

    branch.status = 'promoted';
    branch.isPromoted = true;

    this.manifest.history.push({
      action: 'promote',
      branchId,
      timestamp: new Date().toISOString(),
    });
    this.saveManifest();

    console.log(`🐮 [CowAgent] Promoted branch ${branchId} into master memory base.`);
  }

  /**
   * Discards an unpromoted branch and deletes its branch file.
   */
  public discard(branchId: string): void {
    const branch = this.manifest.branches[branchId];
    if (!branch) return;

    if (fs.existsSync(branch.branchPath)) {
      try {
        fs.unlinkSync(branch.branchPath);
      } catch {
        // Ignored
      }
    }

    branch.status = 'discarded';
    this.manifest.history.push({
      action: 'discard',
      branchId,
      timestamp: new Date().toISOString(),
    });
    this.saveManifest();
    console.log(`🐮 [CowAgent] Discarded branch ${branchId}`);
  }

  /**
   * Speculatively explores N candidates in parallel COW branches, scores them,
   * PROMOTES the winning branch, and DISCARDS the losers.
   */
  public async speculate<T>(params: {
    label: string;
    subagentName: string;
    candidates: Array<{ label: string; payload: T; scoreFn: (payload: T) => number }>;
  }): Promise<{ winner: T; winningLabel: string; score: number }> {
    const { label, subagentName, candidates } = params;
    console.log(`🐮 [CowAgent: Speculate] Evaluating ${candidates.length} candidates for "${label}"...`);

    const scoredBranches = candidates.map((cand) => {
      const branchInfo = this.branch({
        label: `${label}_${cand.label}`,
        subagentName,
        metadata: { payload: cand.payload },
      });

      const score = cand.scoreFn(cand.payload);
      this.ingest(branchInfo.branchId, { key: 'candidate_evaluation', value: { score, payload: cand.payload } });

      return {
        candidate: cand,
        branchId: branchInfo.branchId,
        score,
      };
    });

    // Sort descending by score
    scoredBranches.sort((a, b) => b.score - a.score);
    const winner = scoredBranches[0]!;

    // Promote winner
    this.promote(winner.branchId);

    // Discard losers
    for (let i = 1; i < scoredBranches.length; i++) {
      const loser = scoredBranches[i];
      if (loser) this.discard(loser.branchId);
    }

    console.log(`🏆 [CowAgent: Winner Promoted] Candidate "${winner.candidate.label}" won with score ${winner.score.toFixed(1)}`);

    return {
      winner: winner.candidate.payload,
      winningLabel: winner.candidate.label,
      score: winner.score,
    };
  }
}

export const globalCowHarness = new CowAgentHarness();
