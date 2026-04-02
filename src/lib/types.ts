export type RiskLevel = "very-low" | "low" | "intermediate" | "intermediate-high" | "high" | "very-high"

export type AHACategory = "A" | "B1" | "B2" | "C1" | "C2" | "C3" | "D1" | "D2" | "E1" | "E2"

export interface ScaleResult {
  score: number | string
  label: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
}

export interface ScaleMeta {
  id: string
  name: string
  shortName: string
  description: string
  category: "probability" | "severity" | "monitoring"
  icon: string
}

export interface TreatmentRecommendation {
  category: AHACategory
  respiratoryModifier: boolean
  anticoagulation: {
    type: string
    route: string
    notes: string
  }
  advancedTherapy: {
    systemicLysis: { cor: string; loe: string } | null
    cdl: { cor: string; loe: string } | null
    mt: { cor: string; loe: string } | null
    surgery: { cor: string; loe: string } | null
  }
  monitoring: string
  pertIndicated: boolean
  outpatientEligible: boolean
  keyActions: string[]
}

export interface CategoryAssignment {
  category: AHACategory
  categoryLabel: string
  subcategoryLabel: string
  respiratoryModifier: boolean
  riskLevel: RiskLevel
  color: string
  description: string
}

export interface EvaluationState {
  // Step 1: Clinical probability
  probabilityScale?: string
  probabilityResult?: ScaleResult
  // Step 2: Diagnostic
  peConfirmed?: boolean
  dDimer?: number
  age?: number
  // Step 3: Severity
  severityScale?: string
  severityResult?: ScaleResult
  biomarkerElevated?: boolean
  rvDysfunction?: boolean
  hypotension?: boolean
  shock?: boolean
  lactateElevated?: boolean
  refractoryShockOrArrest?: boolean
  needsSupplementalO2?: boolean
  tachypnea?: boolean
  // Step 4-5: Category & treatment
  categoryAssignment?: CategoryAssignment
  treatment?: TreatmentRecommendation
}
