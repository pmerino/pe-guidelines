import type { ScaleResult } from "@/lib/types"

export interface WellsInput {
  dvtSymptoms: boolean        // Clinical symptoms of DVT (3 pts)
  peMostLikely: boolean       // PE more likely than other diagnoses (3 pts)
  heartRateOver100: boolean   // Heart rate >100 bpm (1.5 pts)
  immobilizationOrSurgery: boolean // Immobilization >=3 days or surgery in prior 4 weeks (1.5 pts)
  previousDvtOrPe: boolean    // Previous DVT or PE (1.5 pts)
  hemoptysis: boolean         // Hemoptysis (1 pt)
  cancer: boolean             // Cancer (1 pt)
}

const ITEMS: { key: keyof WellsInput; label: string; points: number }[] = [
  { key: "dvtSymptoms", label: "Signos clínicos de TVP (edema, dolor a la palpación)", points: 3 },
  { key: "peMostLikely", label: "TEP como diagnóstico más probable", points: 3 },
  { key: "heartRateOver100", label: "Frecuencia cardíaca >100 lpm", points: 1.5 },
  { key: "immobilizationOrSurgery", label: "Inmovilización ≥3 días o cirugía en últimas 4 semanas", points: 1.5 },
  { key: "previousDvtOrPe", label: "TVP o TEP previo", points: 1.5 },
  { key: "hemoptysis", label: "Hemoptisis", points: 1 },
  { key: "cancer", label: "Cáncer", points: 1 },
]

export function getWellsItems() {
  return ITEMS
}

export function calculateWells(input: WellsInput): ScaleResult {
  let score = 0
  for (const item of ITEMS) {
    if (input[item.key]) score += item.points
  }

  // Standard Wells scoring
  let label: string
  let riskLevel: ScaleResult["riskLevel"]
  if (score < 2) {
    label = "Baja probabilidad"
    riskLevel = "low"
  } else if (score <= 6) {
    label = "Probabilidad moderada"
    riskLevel = "intermediate"
  } else {
    label = "Alta probabilidad"
    riskLevel = "high"
  }

  // Modified Wells (PE likely/unlikely)
  const peLikely = score > 4
  const modifiedLabel = peLikely ? "TEP probable (>4)" : "TEP improbable (≤4)"

  return {
    score,
    label,
    riskLevel,
    interpretation: `Wells Score: ${score} puntos. ${label}. ${modifiedLabel}.`,
    recommendation: score < 2
      ? "Considerar criterios PERC. Si probabilidad clínica <15%, evaluar PERC para excluir TEP sin más pruebas."
      : score <= 6
        ? "Realizar D-dímero. Usar D-dímero ajustado por edad o criterios YEARS."
        : "Realizar imagen diagnóstica (CTPA) directamente.",
  }
}
