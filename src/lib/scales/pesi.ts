import type { ScaleResult } from "@/lib/types"

export interface PESIInput {
  age: number                    // Age in years (points = age)
  male: boolean                  // Male sex (10 pts)
  cancer: boolean                // History of cancer (30 pts)
  heartFailure: boolean          // History of heart failure (10 pts)
  chronicLungDisease: boolean    // Chronic lung disease (10 pts)
  heartRateOver110: boolean      // Heart rate >=110 bpm (20 pts)
  systolicBPUnder100: boolean    // Systolic BP <100 mmHg (30 pts)
  respRateOver30: boolean        // Respiratory rate >=30 bpm (20 pts)
  tempUnder36: boolean           // Temperature <36C (20 pts)
  alteredMentalStatus: boolean   // Altered mental status (60 pts)
  spo2Under90: boolean           // SpO2 <90% (20 pts)
}

const ITEMS: { key: keyof Omit<PESIInput, "age">; label: string; points: number }[] = [
  { key: "male", label: "Sexo masculino", points: 10 },
  { key: "cancer", label: "Cáncer", points: 30 },
  { key: "heartFailure", label: "Insuficiencia cardíaca", points: 10 },
  { key: "chronicLungDisease", label: "Enfermedad pulmonar crónica", points: 10 },
  { key: "heartRateOver110", label: "FC ≥110 lpm", points: 20 },
  { key: "systolicBPUnder100", label: "PAS <100 mmHg", points: 30 },
  { key: "respRateOver30", label: "FR ≥30 rpm", points: 20 },
  { key: "tempUnder36", label: "Temperatura <36°C", points: 20 },
  { key: "alteredMentalStatus", label: "Estado mental alterado", points: 60 },
  { key: "spo2Under90", label: "SpO₂ <90%", points: 20 },
]

export function getPESIItems() {
  return ITEMS
}

export function calculatePESI(input: PESIInput): ScaleResult {
  const age = Math.max(18, Math.min(120, Math.round(input.age || 0)))
  let score = age
  for (const item of ITEMS) {
    if (input[item.key]) score += item.points
  }

  let pesiClass: string
  let label: string
  let riskLevel: ScaleResult["riskLevel"]

  if (score <= 65) {
    pesiClass = "I"; label = "Riesgo muy bajo"; riskLevel = "very-low"
  } else if (score <= 85) {
    pesiClass = "II"; label = "Riesgo bajo"; riskLevel = "low"
  } else if (score <= 105) {
    pesiClass = "III"; label = "Riesgo intermedio"; riskLevel = "intermediate"
  } else if (score <= 125) {
    pesiClass = "IV"; label = "Riesgo alto"; riskLevel = "high"
  } else {
    pesiClass = "V"; label = "Riesgo muy alto"; riskLevel = "very-high"
  }

  return {
    score,
    label: `Clase ${pesiClass} — ${label}`,
    riskLevel,
    interpretation: `PESI: ${score} puntos. Clase ${pesiClass} (${label}). Mortalidad a 30 días estimada: ${
      pesiClass === "I" ? "0-1.6%" :
      pesiClass === "II" ? "1.7-3.5%" :
      pesiClass === "III" ? "3.2-7.1%" :
      pesiClass === "IV" ? "4.0-11.4%" : "10.0-24.5%"
    }.`,
    recommendation: score <= 85
      ? "Bajo riesgo. Evaluar aptitud para tratamiento ambulatorio con Hestia."
      : "Riesgo elevado. Considerar hospitalización y monitoreo.",
  }
}
