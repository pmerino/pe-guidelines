import type { ScaleResult } from "@/lib/types"

export interface ShockIndexInput {
  heartRate: number      // Heart rate in bpm
  systolicBP: number     // Systolic blood pressure in mmHg
}

export function calculateShockIndex(input: ShockIndexInput): ScaleResult {
  if (input.systolicBP <= 0) {
    return { score: 0, label: "PAS inválida", riskLevel: "low", interpretation: "Ingrese una PAS válida.", recommendation: "" }
  }

  const si = input.heartRate / input.systolicBP
  const rounded = Math.round(si * 100) / 100

  let label: string
  let riskLevel: ScaleResult["riskLevel"]

  if (si < 0.7) {
    label = "Normal"; riskLevel = "low"
  } else if (si < 1.0) {
    label = "Limítrofe"; riskLevel = "intermediate"
  } else if (si < 1.3) {
    label = "Elevado"; riskLevel = "high"
  } else {
    label = "Muy elevado — shock"; riskLevel = "very-high"
  }

  return {
    score: rounded,
    label: `Shock Index: ${rounded} — ${label}`,
    riskLevel,
    interpretation: `Shock Index = FC/PAS = ${input.heartRate}/${input.systolicBP} = ${rounded}. ${label}.`,
    recommendation: si >= 1.0
      ? "Shock Index elevado. Asociado con mayor riesgo de eventos adversos. Considerar monitoreo hemodinámico."
      : "Shock Index dentro de rango aceptable.",
  }
}
