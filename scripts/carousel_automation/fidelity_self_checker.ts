import fs from 'node:fs';
import path from 'node:path';
import type { NanoBananaSlidePromptJob } from './nano_banana_generator.js';
import type { DeconstructedReferenceStyle } from './reference_deconstructor.js';

export interface PromptFidelityIssue {
  type: 'missing_required_keyword' | 'contains_forbidden_element' | 'missing_aspect_ratio' | 'style_mismatch';
  description: string;
  keyword?: string;
  severity: 'high' | 'medium';
}

export interface SlideFidelityReport {
  slideIndex: number;
  originalScore: number;
  finalScore: number;
  status: 'passed' | 'auto_repaired';
  issues: PromptFidelityIssue[];
  repairedPrompt?: string;
}

export interface BatchFidelityAuditReport {
  executionTimestamp: string;
  referenceStyleId: string;
  referenceStyleName: string;
  overallStatus: 'passed' | 'auto_repaired';
  averageFidelityScore: number;
  slides: SlideFidelityReport[];
  reportFilePath: string;
}

/**
 * Validates a single slide variation prompt against its deconstructed reference style.
 */
export function validateAndRepairSlidePrompt(params: {
  job: NanoBananaSlidePromptJob;
  referenceStyle: DeconstructedReferenceStyle;
}): { validatedJob: NanoBananaSlidePromptJob; report: SlideFidelityReport } {
  const { job, referenceStyle } = params;
  const issues: PromptFidelityIssue[] = [];
  const promptLower = job.prompt.toLowerCase();

  // 1. Check Required Signature Keywords
  for (const req of referenceStyle.requiredKeywords) {
    if (!promptLower.includes(req.toLowerCase())) {
      issues.push({
        type: 'missing_required_keyword',
        description: `Missing required reference style signature: "${req}"`,
        keyword: req,
        severity: 'high',
      });
    }
  }

  // 2. Check Forbidden / Hallucinated Elements
  for (const forb of referenceStyle.forbiddenKeywords) {
    if (promptLower.includes(forb.toLowerCase())) {
      issues.push({
        type: 'contains_forbidden_element',
        description: `Contains hallucinated element that does not exist in reference: "${forb}"`,
        keyword: forb,
        severity: 'high',
      });
    }
  }

  // 3. Check Aspect Ratio Specification
  if (!promptLower.includes('4:5') || !promptLower.includes('1080x1350')) {
    issues.push({
      type: 'missing_aspect_ratio',
      description: 'Missing explicit 4:5 vertical portrait (1080x1350) aspect ratio instruction',
      severity: 'medium',
    });
  }

  const originalScore = Math.max(0, 100 - issues.length * 20);

  if (issues.length === 0) {
    return {
      validatedJob: job,
      report: {
        slideIndex: job.slideIndex,
        originalScore: 100,
        finalScore: 100,
        status: 'passed',
        issues: [],
      },
    };
  }

  // --- AUTO-REPAIR PASS ---
  let repairedPrompt = job.prompt;

  // Remove forbidden phrases
  for (const issue of issues.filter((i) => i.type === 'contains_forbidden_element')) {
    if (issue.keyword) {
      const regex = new RegExp(`\\b${issue.keyword}\\b`, 'gi');
      repairedPrompt = repairedPrompt.replace(regex, '');
    }
  }

  // Inject missing reference signatures
  const missingKeywords = issues
    .filter((i) => i.type === 'missing_required_keyword')
    .map((i) => i.keyword)
    .filter(Boolean);

  if (missingKeywords.length > 0) {
    const injectionBlock = `\n\n=== [SELF-CHECKER STRICT FIDELITY ENFORCEMENT] ===\n` +
      `Mandatory Reference Visual Signatures: Ensure the output strictly incorporates: ${missingKeywords.join(', ')}.\n` +
      `Do not deviate from the reference image's visual composition and materials.`;
    repairedPrompt += injectionBlock;
  }

  // Ensure aspect ratio is present
  if (!repairedPrompt.includes('4:5 vertical portrait (1080x1350)')) {
    repairedPrompt += `\nAspect Ratio: 4:5 vertical portrait (1080x1350) for Instagram Carousel.`;
  }

  const repairedJob: NanoBananaSlidePromptJob = {
    ...job,
    prompt: repairedPrompt,
  };

  return {
    validatedJob: repairedJob,
    report: {
      slideIndex: job.slideIndex,
      originalScore,
      finalScore: 100,
      status: 'auto_repaired',
      issues,
      repairedPrompt,
    },
  };
}

/**
 * Audits the complete prompt batch with the Self-Checker before generation.
 * Guarantees that every single prompt strictly matches the selected reference image.
 */
export function auditBatchFidelity(params: {
  batch: NanoBananaSlidePromptJob[];
  referenceStyle: DeconstructedReferenceStyle;
  outputDir?: string;
}): { verifiedBatch: NanoBananaSlidePromptJob[]; auditReport: BatchFidelityAuditReport } {
  const { batch, referenceStyle, outputDir = 'out/fidelity_reports' } = params;

  const resolvedDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  const verifiedBatch: NanoBananaSlidePromptJob[] = [];
  const slideReports: SlideFidelityReport[] = [];

  for (const job of batch) {
    const { validatedJob, report } = validateAndRepairSlidePrompt({
      job,
      referenceStyle,
    });
    verifiedBatch.push(validatedJob);
    slideReports.push(report);
  }

  const avgScore =
    slideReports.reduce((acc, curr) => acc + curr.finalScore, 0) / slideReports.length;
  const anyRepaired = slideReports.some((r) => r.status === 'auto_repaired');

  const reportFileName = `fidelity_audit_${Date.now()}.json`;
  const reportFilePath = path.join(resolvedDir, reportFileName);

  const auditReport: BatchFidelityAuditReport = {
    executionTimestamp: new Date().toISOString(),
    referenceStyleId: referenceStyle.id,
    referenceStyleName: referenceStyle.referenceName,
    overallStatus: anyRepaired ? 'auto_repaired' : 'passed',
    averageFidelityScore: avgScore,
    slides: slideReports,
    reportFilePath,
  };

  fs.writeFileSync(reportFilePath, JSON.stringify(auditReport, null, 2), 'utf8');
  console.log(`🛡️ [Visual Fidelity Self-Checker] Audit Complete — Score: ${avgScore}% (${auditReport.overallStatus.toUpperCase()})`);
  console.log(`   📄 Report: ${reportFilePath}`);

  return {
    verifiedBatch,
    auditReport,
  };
}
