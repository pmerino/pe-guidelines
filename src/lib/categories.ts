import type { AHACategory, CategoryAssignment, RiskLevel } from "@/lib/types"

export interface CategoryInput {
  isAsymptomatic: boolean
  isSubsegmental: boolean
  severityScoreLow: boolean   // PESI I-II, sPESI=0, or Hestia negative
  rvDysfunction: boolean
  biomarkerElevated: boolean  // troponin and/or BNP
  transientHypotension: boolean
  normotensiveShock: boolean  // lactate >2, AKI, CI ≤2.2, etc.
  persistentHypotension: boolean // SBP <90 >15min or vasopressors
  cardiogenicShock: boolean
  refractoryShockOrArrest: boolean
  needsSupplementalO2: boolean
  tachypnea: boolean // RR ≥30
}

const CATEGORY_DATA: Record<AHACategory, {
  label: string
  subcategory: string
  color: string
  riskLevel: RiskLevel
  description: string
}> = {
  A: {
    label: "Categoría A",
    subcategory: "Subclínica",
    color: "#22c55e",
    riskLevel: "very-low",
    description: "TEP incidental y asintomático. Hallazgo en imagen realizada por otra indicación.",
  },
  B1: {
    label: "Categoría B1",
    subcategory: "Sintomático — Subsegmental",
    color: "#86efac",
    riskLevel: "low",
    description: "TEP sintomático subsegmental con score de severidad bajo.",
  },
  B2: {
    label: "Categoría B2",
    subcategory: "Sintomático — No subsegmental",
    color: "#fbbf24",
    riskLevel: "low",
    description: "TEP sintomático no subsegmental con score de severidad bajo.",
  },
  C1: {
    label: "Categoría C1",
    subcategory: "VD normal + biomarcadores normales",
    color: "#f59e0b",
    riskLevel: "intermediate",
    description: "TEP sintomático con score de severidad elevado. VD normal y biomarcadores normales.",
  },
  C2: {
    label: "Categoría C2",
    subcategory: "VD anormal O biomarcador anormal",
    color: "#f97316",
    riskLevel: "intermediate-high",
    description: "TEP sintomático con score de severidad elevado. VD anormal O ≥1 biomarcador anormal.",
  },
  C3: {
    label: "Categoría C3",
    subcategory: "VD anormal Y biomarcador anormal",
    color: "#ef4444",
    riskLevel: "high",
    description: "TEP sintomático con score de severidad elevado. VD anormal Y ≥1 biomarcador anormal.",
  },
  D1: {
    label: "Categoría D1",
    subcategory: "Hipotensión transitoria",
    color: "#dc2626",
    riskLevel: "high",
    description: "Fallo cardiopulmonar incipiente. Hipotensión transitoria que responde a volumen.",
  },
  D2: {
    label: "Categoría D2",
    subcategory: "Shock normotensivo",
    color: "#b91c1c",
    riskLevel: "very-high",
    description: "Fallo cardiopulmonar incipiente. Shock normotensivo (hipoperfusión sin hipotensión).",
  },
  E1: {
    label: "Categoría E1",
    subcategory: "Shock cardiogénico",
    color: "#991b1b",
    riskLevel: "very-high",
    description: "Fallo cardiopulmonar. Hipotensión recurrente o persistente con shock cardiogénico.",
  },
  E2: {
    label: "Categoría E2",
    subcategory: "Shock refractario / Paro cardíaco",
    color: "#7f1d1d",
    riskLevel: "very-high",
    description: "Fallo cardiopulmonar. Shock cardiogénico refractario o paro cardíaco.",
  },
}

const RESPIRATORY_ELIGIBLE = new Set<AHACategory>(["C1", "C2", "C3", "D1", "D2", "E1", "E2"])

export function classifyCategory(input: CategoryInput): CategoryAssignment {
  let category: AHACategory

  if (input.refractoryShockOrArrest) {
    category = "E2"
  } else if (input.cardiogenicShock || input.persistentHypotension) {
    category = "E1"
  } else if (input.normotensiveShock) {
    category = "D2"
  } else if (input.transientHypotension) {
    category = "D1"
  } else if (input.isAsymptomatic) {
    category = "A"
  } else if (input.severityScoreLow) {
    category = input.isSubsegmental ? "B1" : "B2"
  } else {
    // Elevated severity score
    if (input.rvDysfunction && input.biomarkerElevated) {
      category = "C3"
    } else if (input.rvDysfunction || input.biomarkerElevated) {
      category = "C2"
    } else {
      category = "C1"
    }
  }

  const data = CATEGORY_DATA[category]
  const respiratoryModifier = RESPIRATORY_ELIGIBLE.has(category) &&
    (input.needsSupplementalO2 || input.tachypnea)

  return {
    category,
    categoryLabel: data.label,
    subcategoryLabel: data.subcategory,
    respiratoryModifier,
    riskLevel: data.riskLevel,
    color: data.color,
    description: data.description,
  }
}

export function getCategoryData() {
  return CATEGORY_DATA
}

export function getCategoryInfo(category: AHACategory) {
  return CATEGORY_DATA[category]
}
