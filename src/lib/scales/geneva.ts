import type { ScaleResult } from "@/lib/types"

export interface GenevaInput {
  ageOver65: boolean                // Age >65 (1 pt / 1 pt simplified)
  previousDvtOrPe: boolean          // Previous DVT or PE (3 pts / 1 pt)
  surgeryOrFracture: boolean        // Surgery or fracture within 1 month (2 pts / 1 pt)
  activeCancer: boolean             // Active cancer (2 pts / 1 pt)
  unilateralLimbPain: boolean       // Unilateral lower-limb pain (3 pts / 1 pt)
  hemoptysis: boolean               // Hemoptysis (2 pts / 1 pt)
  heartRate75to94: boolean          // Heart rate 75-94 bpm (3 pts / 1 pt)
  heartRateOver95: boolean          // Heart rate >=95 bpm (5 pts / 1 pt)
  lowerLimbPainAndEdema: boolean    // Pain on palpation + unilateral edema (4 pts / 1 pt)
}

const ITEMS_FULL: { key: keyof GenevaInput; label: string; points: number }[] = [
  { key: "ageOver65", label: "Edad >65 años", points: 1 },
  { key: "previousDvtOrPe", label: "TVP o TEP previo", points: 3 },
  { key: "surgeryOrFracture", label: "Cirugía o fractura en el último mes", points: 2 },
  { key: "activeCancer", label: "Cáncer activo", points: 2 },
  { key: "unilateralLimbPain", label: "Dolor unilateral en miembro inferior", points: 3 },
  { key: "hemoptysis", label: "Hemoptisis", points: 2 },
  { key: "heartRate75to94", label: "FC 75-94 lpm", points: 3 },
  { key: "heartRateOver95", label: "FC ≥95 lpm", points: 5 },
  { key: "lowerLimbPainAndEdema", label: "Dolor a la palpación venosa profunda + edema unilateral", points: 4 },
]

const ITEMS_SIMPLIFIED: { key: keyof GenevaInput; label: string; points: number }[] = [
  { key: "ageOver65", label: "Edad >65 años", points: 1 },
  { key: "previousDvtOrPe", label: "TVP o TEP previo", points: 1 },
  { key: "surgeryOrFracture", label: "Cirugía o fractura en el último mes", points: 1 },
  { key: "activeCancer", label: "Cáncer activo", points: 1 },
  { key: "unilateralLimbPain", label: "Dolor unilateral en miembro inferior", points: 1 },
  { key: "hemoptysis", label: "Hemoptisis", points: 1 },
  { key: "heartRate75to94", label: "FC 75-94 lpm", points: 1 },
  { key: "heartRateOver95", label: "FC ≥95 lpm", points: 1 },
  { key: "lowerLimbPainAndEdema", label: "Dolor a la palpación venosa profunda + edema unilateral", points: 1 },
]

export function getGenevaItems(simplified: boolean) {
  return simplified ? ITEMS_SIMPLIFIED : ITEMS_FULL
}

export function calculateGeneva(input: GenevaInput, simplified: boolean): ScaleResult {
  const items = simplified ? ITEMS_SIMPLIFIED : ITEMS_FULL
  let score = 0
  for (const item of items) {
    if (input[item.key]) score += item.points
  }
  // Cannot have both heart rate ranges
  if (input.heartRate75to94 && input.heartRateOver95) {
    score -= simplified ? 1 : 3 // remove the 75-94 points
  }

  let label: string
  let riskLevel: ScaleResult["riskLevel"]

  if (simplified) {
    if (score <= 1) { label = "Baja probabilidad"; riskLevel = "low" }
    else if (score <= 4) { label = "Probabilidad intermedia"; riskLevel = "intermediate" }
    else { label = "Alta probabilidad"; riskLevel = "high" }
  } else {
    if (score <= 3) { label = "Baja probabilidad"; riskLevel = "low" }
    else if (score <= 10) { label = "Probabilidad intermedia"; riskLevel = "intermediate" }
    else { label = "Alta probabilidad"; riskLevel = "high" }
  }

  const version = simplified ? "Simplificado" : "Completo"
  return {
    score,
    label,
    riskLevel,
    interpretation: `Geneva Revisado ${version}: ${score} puntos. ${label}.`,
    recommendation: riskLevel === "low"
      ? "Probabilidad baja. Considerar D-dímero para descartar TEP."
      : riskLevel === "intermediate"
        ? "Realizar D-dímero. Si positivo, imagen diagnóstica."
        : "Realizar imagen diagnóstica (CTPA) directamente.",
  }
}
