import type { ScaleResult } from "@/lib/types"

export interface CPESInput {
  troponinElevated: boolean       // Elevated cardiac troponin (1 pt)
  bnpElevated: boolean            // Elevated B-type natriuretic peptide (1 pt)
  rvDysfunction: boolean          // Moderately or severely reduced RV function (1 pt)
  centralThrombus: boolean        // Central thrombus burden (saddle PE) (1 pt)
  concomitantDVT: boolean         // Concomitant deep vein thrombosis (1 pt)
  heartRateOver100: boolean       // Heart rate >100 bpm (1 pt)
}

const ITEMS: { key: keyof CPESInput; label: string }[] = [
  { key: "troponinElevated", label: "Troponina cardíaca elevada" },
  { key: "bnpElevated", label: "Péptido natriurético tipo B elevado" },
  { key: "rvDysfunction", label: "Función VD moderada o severamente reducida" },
  { key: "centralThrombus", label: "Trombo central (TEP en silla de montar)" },
  { key: "concomitantDVT", label: "Trombosis venosa profunda concomitante" },
  { key: "heartRateOver100", label: "FC >100 lpm" },
]

export function getCPESItems() {
  return ITEMS
}

export function calculateCPES(input: CPESInput): ScaleResult {
  const score = Object.values(input).filter(Boolean).length

  const isHighRisk = score >= 6
  let riskLevel: ScaleResult["riskLevel"]
  let label: string

  if (score <= 2) { label = "Riesgo bajo de shock"; riskLevel = "low" }
  else if (score <= 5) { label = "Riesgo intermedio de shock"; riskLevel = "intermediate" }
  else { label = "Riesgo alto de shock normotensivo"; riskLevel = "high" }

  return {
    score,
    label,
    riskLevel,
    interpretation: `CPES: ${score}/6 puntos. ${label}. ${
      isHighRisk
        ? "Alto riesgo de shock normotensivo (índice cardíaco ≤2.2 L/min/m²)."
        : "Riesgo menor de shock normotensivo."
    }`,
    recommendation: isHighRisk
      ? "Alto riesgo de shock normotensivo. Monitorización hemodinámico estrecho. Considerar terapias avanzadas."
      : score <= 2
        ? "Bajo riesgo. Monitorización estándar."
        : "Riesgo intermedio. Monitorización cercano recomendado.",
  }
}
