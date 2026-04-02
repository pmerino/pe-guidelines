import type { ScaleResult } from "@/lib/types"

export interface NEWS2Input {
  respRate: number        // Respiratory rate (breaths/min)
  spo2: number            // SpO2 (%)
  isOnO2: boolean         // On supplemental oxygen?
  temperature: number     // Temperature (°C)
  systolicBP: number      // Systolic BP (mmHg)
  heartRate: number       // Heart rate (bpm)
  consciousness: "alert" | "confusion" | "voice" | "pain" | "unresponsive"
}

function respRateScore(rr: number): number {
  if (rr <= 8) return 3
  if (rr <= 11) return 1
  if (rr <= 20) return 0
  if (rr <= 24) return 2
  return 3
}

function spo2Score(spo2: number): number {
  if (spo2 <= 91) return 3
  if (spo2 <= 93) return 2
  if (spo2 <= 95) return 1
  return 0
}

function airOrO2Score(isOnO2: boolean): number {
  return isOnO2 ? 2 : 0
}

function temperatureScore(temp: number): number {
  if (temp <= 35.0) return 3
  if (temp <= 36.0) return 1
  if (temp <= 38.0) return 0
  if (temp <= 39.0) return 1
  return 2
}

function systolicBPScore(sbp: number): number {
  if (sbp <= 90) return 3
  if (sbp <= 100) return 2
  if (sbp <= 110) return 1
  if (sbp <= 219) return 0
  return 3
}

function heartRateScore(hr: number): number {
  if (hr <= 40) return 3
  if (hr <= 50) return 1
  if (hr <= 90) return 0
  if (hr <= 110) return 1
  if (hr <= 130) return 2
  return 3
}

function consciousnessScore(c: NEWS2Input["consciousness"]): number {
  return c === "alert" ? 0 : 3
}

export function calculateNEWS2(input: NEWS2Input): ScaleResult {
  const scores = [
    respRateScore(input.respRate),
    spo2Score(input.spo2),
    airOrO2Score(input.isOnO2),
    temperatureScore(input.temperature),
    systolicBPScore(input.systolicBP),
    heartRateScore(input.heartRate),
    consciousnessScore(input.consciousness),
  ]

  const total = scores.reduce((a, b) => a + b, 0)
  const hasAny3 = scores.some(s => s === 3)

  let label: string
  let riskLevel: ScaleResult["riskLevel"]

  if (total >= 9) {
    label = "Riesgo alto"; riskLevel = "very-high"
  } else if (total >= 7 || hasAny3) {
    label = "Riesgo alto (≥7 o parámetro individual = 3)"; riskLevel = "high"
  } else if (total >= 5) {
    label = "Riesgo medio"; riskLevel = "intermediate"
  } else if (total >= 1) {
    label = "Riesgo bajo"; riskLevel = "low"
  } else {
    label = "Riesgo muy bajo"; riskLevel = "very-low"
  }

  return {
    score: total,
    label,
    riskLevel,
    interpretation: `NEWS2: ${total}/20 puntos. ${label}.${hasAny3 ? " (⚠ Parámetro individual con score 3)" : ""}`,
    recommendation: total >= 7
      ? "Riesgo alto. Evaluación médica urgente. Considerar traslado a cuidados intensivos."
      : total >= 5
        ? "Riesgo medio. Aumentar frecuencia de monitoreo. Evaluación médica pronta."
        : "Continuar monitoreo de rutina.",
  }
}
