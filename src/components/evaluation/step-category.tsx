"use client"

import { useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { classifyCategory } from "@/lib/categories"
import type { EvaluationState } from "@/lib/types"

interface Props {
  state: EvaluationState
  onUpdate: (updates: Partial<EvaluationState>) => void
}

export function StepCategory({ state, onUpdate }: Props) {
  const assignment = useMemo(() => {
    const severityLow = state.severityResult
      ? state.severityResult.riskLevel === "low" || state.severityResult.riskLevel === "very-low"
      : false

    return classifyCategory({
      isAsymptomatic: false,
      isSubsegmental: false,
      severityScoreLow: severityLow,
      rvDysfunction: !!state.rvDysfunction,
      biomarkerElevated: !!state.biomarkerElevated,
      transientHypotension: !!state.hypotension && !state.shock,
      normotensiveShock: !!state.shock && !state.hypotension,
      persistentHypotension: !!state.hypotension && !!state.shock,
      cardiogenicShock: !!state.hypotension && !!state.shock,
      refractoryShockOrArrest: !!state.refractoryShockOrArrest,
      needsSupplementalO2: !!state.needsSupplementalO2,
      tachypnea: !!state.tachypnea,
    })
  }, [
    state.severityResult, state.rvDysfunction, state.biomarkerElevated,
    state.hypotension, state.shock, state.refractoryShockOrArrest,
    state.needsSupplementalO2, state.tachypnea,
  ])

  useEffect(() => {
    onUpdate({ categoryAssignment: assignment })
  }, [assignment])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Paso 4: Categoría AHA/ACC</h2>
        <p className="text-sm text-muted-foreground">
          Clasificación automática basada en los datos previos
        </p>
      </div>

      {/* Main category card */}
      <Card
        className="border-2 overflow-hidden"
        style={{ borderColor: assignment.color }}
      >
        <div className="h-2" style={{ backgroundColor: assignment.color }} />
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span
              className="text-3xl font-bold font-mono"
              style={{ color: assignment.color }}
            >
              {assignment.category}
            </span>
            {assignment.respiratoryModifier && (
              <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                + Modificador R
              </Badge>
            )}
          </div>
          <div>
            <p className="font-semibold">{assignment.categoryLabel}</p>
            <p className="text-sm text-muted-foreground">{assignment.subcategoryLabel}</p>
          </div>
          <p className="text-sm">{assignment.description}</p>
        </CardContent>
      </Card>

      {/* Context */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Datos utilizados</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Severidad: <span className="font-medium">{state.severityResult?.label ?? "—"}</span></div>
            <div>VD: <span className="font-medium">{state.rvDysfunction ? "Disfunción" : "Normal"}</span></div>
            <div>Biomarcadores: <span className="font-medium">{state.biomarkerElevated ? "Elevados" : "Normales"}</span></div>
            <div>Hipotensión: <span className="font-medium">{state.hypotension ? "Sí" : "No"}</span></div>
            <div>Shock: <span className="font-medium">{state.shock ? "Sí" : "No"}</span></div>
            <div>Refractario/Paro: <span className="font-medium">{state.refractoryShockOrArrest ? "Sí" : "No"}</span></div>
            <div>O₂ suplementario: <span className="font-medium">{state.needsSupplementalO2 ? "Sí" : "No"}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
