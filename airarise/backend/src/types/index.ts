// src/types/index.ts
// Shared TypeScript types for AiraRise backend

/** User roles in the system */
export type UserRole = 'ward_officer' | 'housing_admin' | 'school_admin' | 'field_team';

/** User status */
export type UserStatus = 'active' | 'inactive' | 'suspended';

/** Dataset input methods */
export type InputMethod = 'file_upload' | 'paste' | 'api';

/** Parsing status for datasets */
export type ParsingStatus = 'pending' | 'parsing' | 'parsed' | 'failed';

/** Validation flags for readings */
export type ValidationFlag =
  | 'MISSING_VALUE'
  | 'INVALID_NUMBER'
  | 'UNKNOWN_UNIT'
  | 'AMBIGUOUS_COLUMN'
  | 'DUPLICATE_ROW'
  | 'SUSPICIOUS_VALUE'
  | 'INVALID_TIMESTAMP'
  | 'NORMALIZED_UNIT';

/** Supported pollutant types */
export type Pollutant = 'PM2.5' | 'PM10' | 'NO2' | 'SO2' | 'CO' | 'O3' | 'AQI' | 'OTHER';

/** Normalized unit types */
export type NormalizedUnit = 'µg/m³' | 'mg/m³' | 'ppm' | 'ppb' | 'index' | 'unknown';

/** Report types */
export type ReportType = 'internal' | 'citizen';

/** Supported languages */
export type SupportedLanguage = 'en' | 'hi';

/** Recommendation priority */
export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low';

/** Recommendation status */
export type RecommendationStatus = 'pending' | 'in_progress' | 'completed' | 'dismissed';

/** Canonical reading — the normalized form of a single data point */
export interface CanonicalReading {
  datasetId: string;
  sourceRow: number;
  location: string | null;
  timestamp: Date | null;
  pollutant: Pollutant;
  rawValue: string;
  value: number | null;
  rawUnit: string;
  normalizedValue: number | null;
  normalizedUnit: NormalizedUnit;
  flags: ValidationFlag[];
}

/** Column mapping detected from uploaded data */
export interface ColumnMapping {
  originalHeader: string;
  mappedTo: 'location' | 'timestamp' | 'pollutant' | 'value' | 'unit' | 'ignored';
  confidence: number;
}

/** Validation summary for a dataset */
export interface ValidationSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  flagCounts: Partial<Record<ValidationFlag, number>>;
  warnings: string[];
}

/** Deterministic metrics computed from readings */
export interface DeterministicMetrics {
  totalReadings: number;
  validReadings: number;
  invalidReadings: number;
  completeness: number;
  byPollutant: Record<string, PollutantStats>;
  byLocation: Record<string, LocationStats>;
  hotspots: HotspotEntry[];
  timeSeriesSummary: TimeSeriesPoint[];
}

/** Stats for a single pollutant */
export interface PollutantStats {
  count: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  stdDev: number;
  unit: NormalizedUnit;
}

/** Stats for a single location */
export interface LocationStats {
  readingCount: number;
  pollutants: Record<string, PollutantStats>;
  averageAqi: number | null;
}

/** Hotspot ranking entry */
export interface HotspotEntry {
  location: string;
  pollutant: string;
  averageValue: number;
  maxValue: number;
  unit: NormalizedUnit;
  rank: number;
}

/** Time series data point */
export interface TimeSeriesPoint {
  timestamp: string;
  location: string;
  pollutant: string;
  value: number;
  unit: NormalizedUnit;
}

/** AI analysis response — validated via Zod */
export interface AIAnalysis {
  summary: string;
  keyFindings: AIFinding[];
  riskAssessment: {
    overallLevel: 'low' | 'moderate' | 'high' | 'severe';
    explanation: string;
    confidence: number;
  };
  dataQualityNotes: string[];
  limitations: string[];
  uncertainties: string[];
}

/** Single AI finding */
export interface AIFinding {
  title: string;
  description: string;
  evidenceRef: string;
  severity: 'info' | 'warning' | 'critical';
  isObservation: boolean;
}

/** Model metadata recorded with each AI call */
export interface ModelMetadata {
  modelId: string;
  promptVersion: string;
  tokensUsed: number | null;
  latencyMs: number;
  timestamp: Date;
}

/** Standard API response envelope */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/** JWT payload */
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  organizationId: string;
  iat?: number;
  exp?: number;
}

/** Recommendation type */
export interface RecommendationData {
  title: string;
  description: string;
  priority: RecommendationPriority;
  rationale: string;
  intendedRole: UserRole;
  location: string | null;
  evidenceRefs: string[];
  suggestedDueDate: Date | null;
}

/** Report generation request */
export interface ReportGenerationRequest {
  analysisId: string;
  reportType: ReportType;
  language: SupportedLanguage;
  readingLevel: 'simple' | 'technical';
  audience: string;
}

/** Report comparison result */
export interface ReportComparison {
  reportAId: string;
  reportBId: string;
  changes: ComparisonChange[];
  summary: string;
}

/** Single change in report comparison */
export interface ComparisonChange {
  field: string;
  direction: 'improved' | 'worsened' | 'unchanged' | 'new';
  description: string;
  previousValue: string | number | null;
  currentValue: string | number | null;
}
