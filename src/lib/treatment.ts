import type { AHACategory, TreatmentRecommendation } from "@/lib/types"

const TREATMENTS: Record<AHACategory, TreatmentRecommendation> = {
  A: {
    category: "A",
    respiratoryModifier: false,
    anticoagulation: {
      type: "DOAC",
      route: "Oral",
      notes: "Iniciar anticoagulación oral directa (apixaban o rivaroxaban).",
    },
    advancedTherapy: {
      systemicLysis: null,
      cdl: null,
      mt: null,
      surgery: null,
    },
    monitoring: "Ambulatorio con seguimiento",
    pertIndicated: false,
    outpatientEligible: true,
    keyActions: [
      "Iniciar DOAC",
      "Usar Hestia/PESI/sPESI para confirmar aptitud ambulatoria",
      "Seguimiento clínico en 1 semana",
    ],
  },
  B1: {
    category: "B1",
    respiratoryModifier: false,
    anticoagulation: {
      type: "DOAC",
      route: "Oral",
      notes: "DOAC preferido. Evaluar aptitud para manejo ambulatorio.",
    },
    advancedTherapy: {
      systemicLysis: null,
      cdl: null,
      mt: null,
      surgery: null,
    },
    monitoring: "Ambulatorio con seguimiento",
    pertIndicated: false,
    outpatientEligible: true,
    keyActions: [
      "Iniciar DOAC",
      "Evaluar aptitud ambulatoria con herramienta de decisión",
      "Alta temprana recomendada",
      "Seguimiento clínico en 1 semana",
    ],
  },
  B2: {
    category: "B2",
    respiratoryModifier: false,
    anticoagulation: {
      type: "DOAC",
      route: "Oral",
      notes: "DOAC preferido. Evaluar aptitud para manejo ambulatorio.",
    },
    advancedTherapy: {
      systemicLysis: null,
      cdl: null,
      mt: null,
      surgery: null,
    },
    monitoring: "Ambulatorio u hospitalización breve",
    pertIndicated: false,
    outpatientEligible: true,
    keyActions: [
      "Iniciar DOAC",
      "Evaluar aptitud ambulatoria con herramienta de decisión",
      "Alta temprana recomendada",
    ],
  },
  C1: {
    category: "C1",
    respiratoryModifier: false,
    anticoagulation: {
      type: "LMWH",
      route: "Subcutáneo",
      notes: "Iniciar LMWH. Transicionar a DOAC cuando estable.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "3: Harm", loe: "A" },
      cdl: { cor: "3: No Benefit", loe: "C-EO" },
      mt: { cor: "3: No Benefit", loe: "C-EO" },
      surgery: { cor: "3: No Benefit", loe: "C-EO" },
    },
    monitoring: "Hospitalización. Monitorización con biomarcadores.",
    pertIndicated: false,
    outpatientEligible: false,
    keyActions: [
      "Iniciar LMWH",
      "Medir al menos 1 biomarcador (troponina, BNP)",
      "Evaluar función VD con imagen (CT/Eco)",
      "Usar score de riesgo validado (PESI, sPESI)",
    ],
  },
  C2: {
    category: "C2",
    respiratoryModifier: false,
    anticoagulation: {
      type: "LMWH",
      route: "Subcutáneo",
      notes: "Iniciar LMWH. Medir lactato.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "3: Harm", loe: "B-R" },
      cdl: { cor: "2b", loe: "C-LD" },
      mt: { cor: "2b", loe: "C-LD" },
      surgery: { cor: "3: No Benefit", loe: "C-EO" },
    },
    monitoring: "Hospitalización. Monitorización estrecho primeras 24-72h.",
    pertIndicated: false,
    outpatientEligible: false,
    keyActions: [
      "Iniciar LMWH",
      "Medir lactato",
      "Evaluar función VD",
      "Monitorización estrecho primeras 24-72h",
      "Usar score de riesgo validado",
    ],
  },
  C3: {
    category: "C3",
    respiratoryModifier: false,
    anticoagulation: {
      type: "LMWH",
      route: "Subcutáneo",
      notes: "Iniciar LMWH. Monitorización hemodinámico estrecho.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "2b", loe: "C-LD" },
      cdl: { cor: "2b", loe: "C-LD" },
      mt: { cor: "2b", loe: "C-LD" },
      surgery: { cor: "3: No Benefit", loe: "C-EO" },
    },
    monitoring: "Hospitalización. UCI o monitorización intermedio. Primeras 24-72h críticas.",
    pertIndicated: true,
    outpatientEligible: false,
    keyActions: [
      "Iniciar LMWH",
      "Medir lactato (MAP >80 mmHg sugiere bajo riesgo adicional)",
      "Evaluar función VD con eco/CT",
      "Activar PERT si disponible",
      "Monitorización estrecho 24-72h — ventana crítica",
      "Si deterioro → considerar terapia avanzada",
    ],
  },
  D1: {
    category: "D1",
    respiratoryModifier: false,
    anticoagulation: {
      type: "LMWH",
      route: "Subcutáneo/IV",
      notes: "LMWH preferido sobre UFH. Iniciar inmediatamente.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "2b", loe: "C-LD" },
      cdl: { cor: "2b", loe: "B-NR" },
      mt: { cor: "2b", loe: "B-NR" },
      surgery: { cor: "2b", loe: "C-LD" },
    },
    monitoring: "UCI. Vasopresores si necesario. PERT obligatorio.",
    pertIndicated: true,
    outpatientEligible: false,
    keyActions: [
      "Iniciar anticoagulación inmediata (LMWH o UFH)",
      "Vasopresores y/o inotropos",
      "Activar PERT",
      "Medir lactato",
      "Evaluar para terapia avanzada si deterioro",
      "Evaluar shock normotensivo",
    ],
  },
  D2: {
    category: "D2",
    respiratoryModifier: false,
    anticoagulation: {
      type: "LMWH/UFH",
      route: "Subcutáneo/IV",
      notes: "Anticoagulación parenteral inmediata.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "2b", loe: "C-LD" },
      cdl: { cor: "2b", loe: "B-NR" },
      mt: { cor: "2b", loe: "B-NR" },
      surgery: { cor: "2b", loe: "C-LD" },
    },
    monitoring: "UCI. Monitorización hemodinámico continuo. PERT obligatorio.",
    pertIndicated: true,
    outpatientEligible: false,
    keyActions: [
      "Anticoagulación parenteral inmediata",
      "Vasopresores/inotropos",
      "Activar PERT",
      "Evaluar para terapia avanzada (trombolisis, CDL, MT, cirugía)",
      "Considerar VA-ECMO si deterioro",
    ],
  },
  E1: {
    category: "E1",
    respiratoryModifier: false,
    anticoagulation: {
      type: "LMWH/UFH",
      route: "IV preferido",
      notes: "UFH o LMWH IV. Anticoagulación inmediata.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "2a", loe: "C-LD" },
      cdl: { cor: "2a", loe: "C-LD" },
      mt: { cor: "2a", loe: "B-NR" },
      surgery: { cor: "2a", loe: "B-NR" },
    },
    monitoring: "UCI. Soporte hemodinámico completo. PERT obligatorio.",
    pertIndicated: true,
    outpatientEligible: false,
    keyActions: [
      "Anticoagulación parenteral inmediata",
      "Vasopresores/inotropos (norepinefrina primera línea)",
      "Trombolisis sistémica razonable si riesgo de sangrado aceptable (COR 2a)",
      "CDL + anticoagulación razonable (COR 2a)",
      "MT razonable (COR 2a)",
      "Embolectomía quirúrgica razonable (COR 2a)",
      "Activar PERT obligatorio",
    ],
  },
  E2: {
    category: "E2",
    respiratoryModifier: false,
    anticoagulation: {
      type: "UFH",
      route: "IV",
      notes: "UFH IV. Mantener anticoagulación en ECMO.",
    },
    advancedTherapy: {
      systemicLysis: { cor: "2a", loe: "C-LD" },
      cdl: null,
      mt: null,
      surgery: { cor: "3: No Benefit", loe: "B-NR" },
    },
    monitoring: "UCI. VA-ECMO. Soporte vital avanzado.",
    pertIndicated: true,
    outpatientEligible: false,
    keyActions: [
      "VA-ECMO si recursos disponibles (COR 2a)",
      "Trombolisis sistémica si riesgo de sangrado aceptable (COR 2a)",
      "Anticoagulación sistémica en ECMO",
      "Activar PERT obligatorio",
      "No transferir si inestable — estabilizar primero",
    ],
  },
}

export function getTreatment(category: AHACategory): TreatmentRecommendation {
  return TREATMENTS[category]
}

export function getAllTreatments() {
  return TREATMENTS
}
