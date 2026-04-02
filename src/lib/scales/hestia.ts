import type { ScaleResult } from "@/lib/types"

export interface HestiaInput {
  hemodynamicallyUnstable: boolean        // Is the patient hemodynamically unstable?
  thrombolysisOrEmbolectomy: boolean      // Is thrombolysis or embolectomy necessary?
  activeBleedingOrHighRisk: boolean       // Active bleeding or high risk of bleeding?
  oxygenOver24h: boolean                  // >24h O2 to maintain SpO2 >90%?
  diagnosedOnAnticoagulant: boolean       // PE diagnosed during anticoagulant treatment?
  severePainOver24h: boolean              // Severe pain requiring IV medication >24h?
  medicalOrSocialReasons: boolean         // Medical/social reasons for hospitalization?
  creatinineUnder30: boolean              // Creatinine clearance <30 mL/min?
  severeLiverImpairment: boolean          // Severe liver impairment?
  pregnant: boolean                       // Is the patient pregnant?
  hitHistory: boolean                     // History of heparin-induced thrombocytopenia?
}

const ITEMS: { key: keyof HestiaInput; label: string }[] = [
  { key: "hemodynamicallyUnstable", label: "¿Está hemodinámicamente inestable?" },
  { key: "thrombolysisOrEmbolectomy", label: "¿Requiere trombolisis o embolectomía?" },
  { key: "activeBleedingOrHighRisk", label: "¿Sangrado activo o alto riesgo de sangrado?" },
  { key: "oxygenOver24h", label: "¿Requiere >24h de O₂ para mantener SpO₂ >90%?" },
  { key: "diagnosedOnAnticoagulant", label: "¿TEP diagnosticado durante tratamiento anticoagulante?" },
  { key: "severePainOver24h", label: "¿Dolor severo requiriendo analgesia IV >24h?" },
  { key: "medicalOrSocialReasons", label: "¿Razones médicas o sociales para hospitalización?" },
  { key: "creatinineUnder30", label: "¿Aclaramiento de creatinina <30 mL/min?" },
  { key: "severeLiverImpairment", label: "¿Insuficiencia hepática severa?" },
  { key: "pregnant", label: "¿Está embarazada?" },
  { key: "hitHistory", label: "¿Historia de trombocitopenia inducida por heparina?" },
]

export function getHestiaItems() {
  return ITEMS
}

export function calculateHestia(input: HestiaInput): ScaleResult {
  const positiveCount = Object.values(input).filter(Boolean).length
  const isNegative = positiveCount === 0

  return {
    score: positiveCount,
    label: isNegative ? "Hestia negativo — apto para ambulatorio" : "Hestia positivo — considerar hospitalización",
    riskLevel: isNegative ? "low" : "high",
    interpretation: `Hestia: ${positiveCount} criterio(s) positivo(s). ${
      isNegative
        ? "Todos los criterios negativos. El paciente puede ser candidato a manejo ambulatorio."
        : "Al menos un criterio positivo. Considerar hospitalización."
    }`,
    recommendation: isNegative
      ? "Candidato a tratamiento ambulatorio. Asegurar acceso a anticoagulación y seguimiento."
      : "Hospitalización recomendada por criterios Hestia positivos.",
  }
}
