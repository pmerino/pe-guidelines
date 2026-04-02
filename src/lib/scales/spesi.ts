import type { ScaleResult } from "@/lib/types"

export interface SPESIInput {
  ageOver80: boolean               // Age >80 years
  cancer: boolean                  // History of cancer
  chronicCardiopulmonary: boolean  // Chronic cardiopulmonary disease
  heartRateOver110: boolean        // Heart rate >=110 bpm
  systolicBPUnder100: boolean      // Systolic BP <100 mmHg
  spo2Under90: boolean             // SpO2 <90%
}

const ITEMS: { key: keyof SPESIInput; label: string }[] = [
  { key: "ageOver80", label: "Edad >80 años" },
  { key: "cancer", label: "Cáncer" },
  { key: "chronicCardiopulmonary", label: "Enfermedad cardiopulmonar crónica" },
  { key: "heartRateOver110", label: "FC ≥110 lpm" },
  { key: "systolicBPUnder100", label: "PAS <100 mmHg" },
  { key: "spo2Under90", label: "SpO₂ <90%" },
]

export function getSPESIItems() {
  return ITEMS
}

export function calculateSPESI(input: SPESIInput): ScaleResult {
  const score = Object.values(input).filter(Boolean).length

  const isLowRisk = score === 0
  return {
    score,
    label: isLowRisk ? "Bajo riesgo de mortalidad a 30 días" : "Alto riesgo de mortalidad a 30 días",
    riskLevel: isLowRisk ? "low" : "high",
    interpretation: `sPESI: ${score} punto(s). ${isLowRisk ? "Bajo riesgo (0 puntos)" : "Alto riesgo (≥1 punto)"}.`,
    recommendation: isLowRisk
      ? "Bajo riesgo. Evaluar aptitud para manejo ambulatorio."
      : "Riesgo elevado. Hospitalización recomendada. Considerar evaluación con biomarcadores e imagen de VD.",
  }
}
