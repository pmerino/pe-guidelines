import type { ScaleResult } from "@/lib/types"

export interface YEARSInput {
  dvtSigns: boolean           // Clinical signs of DVT
  hemoptysis: boolean         // Hemoptysis
  peMostLikely: boolean       // PE is the most likely diagnosis
  dDimer: number              // D-dimer value in ng/mL (or ug/L FEU)
}

const ITEMS: { key: keyof Omit<YEARSInput, "dDimer">; label: string }[] = [
  { key: "dvtSigns", label: "Signos clínicos de TVP" },
  { key: "hemoptysis", label: "Hemoptisis" },
  { key: "peMostLikely", label: "TEP como diagnóstico más probable" },
]

export function getYEARSItems() {
  return ITEMS
}

export function calculateYEARS(input: YEARSInput): ScaleResult {
  const criteriaCount = [input.dvtSigns, input.hemoptysis, input.peMostLikely].filter(Boolean).length
  const dDimer = input.dDimer

  let needsImaging: boolean
  let threshold: number

  if (criteriaCount === 0) {
    threshold = 1000
    needsImaging = dDimer >= 1000
  } else {
    threshold = 500
    needsImaging = dDimer >= 500
  }

  const label = needsImaging ? "Requiere imagen diagnóstica" : "TEP excluido"
  const riskLevel: ScaleResult["riskLevel"] = needsImaging ? "high" : "low"

  return {
    score: criteriaCount,
    label,
    riskLevel,
    interpretation: `YEARS: ${criteriaCount} criterio(s) positivo(s). D-dímero: ${dDimer} ng/mL. Umbral aplicado: ${threshold} ng/mL. ${label}.`,
    recommendation: needsImaging
      ? "D-dímero por encima del umbral. Realizar CTPA para confirmar o excluir TEP."
      : `D-dímero <${threshold} ng/mL con ${criteriaCount} criterio(s) YEARS. TEP excluido de forma segura.`,
  }
}
