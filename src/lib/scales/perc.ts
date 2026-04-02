import type { ScaleResult } from "@/lib/types"

export interface PERCInput {
  ageUnder50: boolean          // Age <50 years
  heartRateUnder100: boolean   // Heart rate <100 bpm
  spo2Over95: boolean          // SpO2 >=95%
  noHemoptysis: boolean        // No hemoptysis
  noEstrogen: boolean          // No estrogen use
  noPriorDvtPe: boolean        // No prior DVT or PE
  noUnilateralSwelling: boolean // No unilateral leg swelling
  noRecentSurgery: boolean     // No surgery/trauma requiring hospitalization within 4 weeks
}

const ITEMS: { key: keyof PERCInput; label: string }[] = [
  { key: "ageUnder50", label: "Edad <50 años" },
  { key: "heartRateUnder100", label: "FC <100 lpm" },
  { key: "spo2Over95", label: "SpO₂ ≥95%" },
  { key: "noHemoptysis", label: "Sin hemoptisis" },
  { key: "noEstrogen", label: "Sin uso de estrógenos" },
  { key: "noPriorDvtPe", label: "Sin TVP/TEP previo" },
  { key: "noUnilateralSwelling", label: "Sin edema unilateral de pierna" },
  { key: "noRecentSurgery", label: "Sin cirugía/trauma con hospitalización en últimas 4 semanas" },
]

export function getPERCItems() {
  return ITEMS
}

export function calculatePERC(input: PERCInput): ScaleResult {
  const allMet = Object.values(input).every(Boolean)
  const metCount = Object.values(input).filter(Boolean).length

  return {
    score: allMet ? 0 : 1,
    label: allMet ? "PERC negativo — TEP excluido" : "PERC positivo — no se puede excluir TEP",
    riskLevel: allMet ? "very-low" : "intermediate",
    interpretation: allMet
      ? `Todos los criterios PERC cumplidos (${metCount}/8). Probabilidad de TEP muy baja. No se requieren más pruebas.`
      : `${metCount}/8 criterios PERC cumplidos. No se puede excluir TEP con PERC.`,
    recommendation: allMet
      ? "No se necesitan más estudios diagnósticos para TEP."
      : "PERC no descarta TEP. Proceder con D-dímero u otra evaluación.",
  }
}
