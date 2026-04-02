import type { ScaleResult } from "@/lib/types"

export interface BovaInput {
  systolicBP90to100: boolean       // Systolic BP 90-100 mmHg (2 pts)
  troponinElevated: boolean        // Cardiac troponin elevation (2 pts)
  rvDysfunction: boolean           // Right ventricular dysfunction (2 pts)
  heartRateOver110: boolean        // Heart rate >=110 bpm (1 pt)
}

const ITEMS: { key: keyof BovaInput; label: string; points: number }[] = [
  { key: "systolicBP90to100", label: "PAS 90-100 mmHg", points: 2 },
  { key: "troponinElevated", label: "Troponina cardíaca elevada", points: 2 },
  { key: "rvDysfunction", label: "Disfunción del ventrículo derecho", points: 2 },
  { key: "heartRateOver110", label: "FC ≥110 lpm", points: 1 },
]

export function getBovaItems() {
  return ITEMS
}

export function calculateBova(input: BovaInput): ScaleResult {
  let score = 0
  for (const item of ITEMS) {
    if (input[item.key]) score += item.points
  }

  let stage: string
  let label: string
  let riskLevel: ScaleResult["riskLevel"]

  if (score <= 2) {
    stage = "I"; label = "Riesgo bajo"; riskLevel = "low"
  } else if (score <= 4) {
    stage = "II"; label = "Riesgo intermedio"; riskLevel = "intermediate"
  } else {
    stage = "III"; label = "Riesgo alto"; riskLevel = "high"
  }

  return {
    score,
    label: `Stage ${stage} — ${label}`,
    riskLevel,
    interpretation: `Bova Score: ${score} puntos. Stage ${stage} (${label}).`,
    recommendation: stage === "I"
      ? "Bajo riesgo de complicaciones. Monitorización estándar."
      : stage === "II"
        ? "Riesgo intermedio. Monitorización estrecho y considerar evaluación hemodinámica."
        : "Alto riesgo. Monitorización intensivo. Considerar terapias avanzadas si deterioro.",
  }
}
