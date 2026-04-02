import type { ScaleMeta } from "@/lib/types"

export const SCALES: ScaleMeta[] = [
  // Probability scales
  {
    id: "wells",
    name: "Wells Score",
    shortName: "Wells",
    description: "Probabilidad clínica pre-test de TEP",
    category: "probability",
    icon: "stethoscope",
  },
  {
    id: "geneva",
    name: "Geneva Revisado",
    shortName: "Geneva",
    description: "Probabilidad clínica pre-test (versión completa y simplificada)",
    category: "probability",
    icon: "clipboard-list",
  },
  {
    id: "perc",
    name: "PERC Rule-Out",
    shortName: "PERC",
    description: "Criterios para excluir TEP sin más pruebas",
    category: "probability",
    icon: "shield-check",
  },
  {
    id: "years",
    name: "Algoritmo YEARS",
    shortName: "YEARS",
    description: "Combina criterios clínicos con D-dímero ajustado",
    category: "probability",
    icon: "git-branch",
  },
  // Severity scales
  {
    id: "pesi",
    name: "PESI",
    shortName: "PESI",
    description: "Pulmonary Embolism Severity Index — mortalidad a 30 días",
    category: "severity",
    icon: "activity",
  },
  {
    id: "spesi",
    name: "sPESI",
    shortName: "sPESI",
    description: "PESI simplificado — bajo vs alto riesgo",
    category: "severity",
    icon: "zap",
  },
  {
    id: "hestia",
    name: "Criterios Hestia",
    shortName: "Hestia",
    description: "Aptitud para tratamiento ambulatorio",
    category: "severity",
    icon: "home",
  },
  {
    id: "bova",
    name: "Bova Score",
    shortName: "Bova",
    description: "Riesgo de deterioro hemodinámico",
    category: "severity",
    icon: "heart-pulse",
  },
  {
    id: "cpes",
    name: "CPES Score",
    shortName: "CPES",
    description: "Riesgo de shock normotensivo",
    category: "severity",
    icon: "gauge",
  },
  // Monitoring scales
  {
    id: "shock-index",
    name: "Shock Index",
    shortName: "SI",
    description: "FC/PAS — indicador rápido de inestabilidad",
    category: "monitoring",
    icon: "divide",
  },
  {
    id: "news2",
    name: "NEWS2",
    shortName: "NEWS2",
    description: "National Early Warning Score — deterioro clínico",
    category: "monitoring",
    icon: "thermometer",
  },
]

export function getScalesByCategory(category: ScaleMeta["category"]) {
  return SCALES.filter(s => s.category === category)
}

export function getScaleById(id: string) {
  return SCALES.find(s => s.id === id)
}
