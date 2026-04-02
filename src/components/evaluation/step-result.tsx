"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getTreatment } from "@/lib/treatment"
import {
  Pill, Syringe, AlertTriangle, Users, Home as HomeIcon,
  Activity, ShieldAlert, HeartPulse, BookOpen,
} from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import type { EvaluationState } from "@/lib/types"

interface Props {
  state: EvaluationState
  onReset: () => void
}

const COR_COLORS: Record<string, string> = {
  "1": "bg-green-500/20 text-green-400",
  "2a": "bg-yellow-500/20 text-yellow-400",
  "2b": "bg-orange-500/20 text-orange-400",
  "3: Harm": "bg-red-500/20 text-red-400",
  "3: No Benefit": "bg-zinc-500/20 text-zinc-400",
}

export function StepResult({ state }: Props) {
  const cat = state.categoryAssignment
  const treatment = useMemo(() => {
    if (!cat) return null
    return getTreatment(cat.category)
  }, [cat])

  if (!cat || !treatment) {
    return <p className="text-muted-foreground">Complete los pasos anteriores.</p>
  }

  return (
    <div className="space-y-4">
      {/* Category header */}
      <div className="text-center space-y-2">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-bold font-mono"
          style={{ backgroundColor: cat.color + "30", color: cat.color }}
        >
          {cat.category}
        </div>
        <p className="font-semibold">{cat.categoryLabel}</p>
        <p className="text-sm text-muted-foreground">{cat.subcategoryLabel}</p>
        {cat.respiratoryModifier && (
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400">
            Modificador Respiratorio (R)
          </Badge>
        )}
      </div>

      <Separator />

      {/* Anticoagulation */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Pill className="h-4 w-4 text-blue-400" />
            Anticoagulación
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">{treatment.anticoagulation.type}</Badge>
            <span className="text-xs text-muted-foreground">{treatment.anticoagulation.route}</span>
          </div>
          <p className="text-sm">{treatment.anticoagulation.notes}</p>
        </CardContent>
      </Card>

      {/* Advanced therapy */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Syringe className="h-4 w-4 text-orange-400" />
            Terapia Avanzada
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="space-y-2">
            {[
              { label: "Trombolisis sistémica", data: treatment.advancedTherapy.systemicLysis },
              { label: "CDL", data: treatment.advancedTherapy.cdl },
              { label: "Trombectomía mecánica", data: treatment.advancedTherapy.mt },
              { label: "Cirugía", data: treatment.advancedTherapy.surgery },
            ].map((therapy) => (
              <div key={therapy.label} className="flex items-center justify-between">
                <span className="text-sm">{therapy.label}</span>
                {therapy.data ? (
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${COR_COLORS[therapy.data.cor] || ""}`}
                  >
                    COR {therapy.data.cor} / LOE {therapy.data.loe}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">No indicada</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoring & disposition */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-400" />
            Monitorización y disposición
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 space-y-2">
          <p className="text-sm">{treatment.monitoring}</p>
          <div className="flex flex-wrap gap-2">
            {treatment.pertIndicated && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 gap-1">
                <Users className="h-3 w-3" /> PERT indicado
              </Badge>
            )}
            {treatment.outpatientEligible && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                <HomeIcon className="h-3 w-3" /> Apto para ambulatorio
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key actions */}
      <Card>
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-yellow-400" />
            Acciones clave
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <ul className="space-y-1.5">
            {treatment.keyActions.map((action, i) => (
              <li key={i} className="text-sm flex gap-2">
                <HeartPulse className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                {action}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Glossary */}
      <Accordion>
        <AccordionItem>
          <AccordionTrigger className="text-xs text-muted-foreground gap-2">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            Glosario de abreviaturas
          </AccordionTrigger>
          <AccordionContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
              <dt className="font-mono font-medium text-foreground">COR</dt>
              <dd className="text-muted-foreground">Class of Recommendation — Clase de recomendación</dd>
              <dt className="font-mono font-medium text-foreground">LOE</dt>
              <dd className="text-muted-foreground">Level of Evidence — Nivel de evidencia</dd>
              <dt className="font-mono font-medium text-foreground">CDL</dt>
              <dd className="text-muted-foreground">Catheter-Directed Lysis — Trombolisis dirigida por catéter</dd>
              <dt className="font-mono font-medium text-foreground">MT</dt>
              <dd className="text-muted-foreground">Mechanical Thrombectomy — Trombectomía mecánica</dd>
              <dt className="font-mono font-medium text-foreground">PERT</dt>
              <dd className="text-muted-foreground">Pulmonary Embolism Response Team — Equipo de respuesta a TEP</dd>
              <dt className="font-mono font-medium text-foreground">LMWH</dt>
              <dd className="text-muted-foreground">Low Molecular Weight Heparin — Heparina de bajo peso molecular</dd>
              <dt className="font-mono font-medium text-foreground">UFH</dt>
              <dd className="text-muted-foreground">Unfractionated Heparin — Heparina no fraccionada</dd>
              <dt className="font-mono font-medium text-foreground">DOAC</dt>
              <dd className="text-muted-foreground">Direct Oral Anticoagulant — Anticoagulante oral directo</dd>
              <dt className="font-mono font-medium text-foreground">VA-ECMO</dt>
              <dd className="text-muted-foreground">Veno-Arterial Extracorporeal Membrane Oxygenation — Oxigenación por membrana extracorpórea venoarterial</dd>
              <dt className="font-mono font-medium text-foreground">VD</dt>
              <dd className="text-muted-foreground">Ventrículo derecho</dd>
            </dl>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-[10px] text-muted-foreground text-center">
        Basado en AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN 2026 Guidelines.
        Esta herramienta no reemplaza el juicio clínico.
      </p>
    </div>
  )
}
