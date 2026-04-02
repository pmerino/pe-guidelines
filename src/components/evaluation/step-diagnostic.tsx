"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, ImageIcon } from "lucide-react"
import { RISK_COLORS } from "@/components/scale-calculator"
import type { EvaluationState } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  state: EvaluationState
  onUpdate: (updates: Partial<EvaluationState>) => void
}

export function StepDiagnostic({ state, onUpdate }: Props) {
  const prob = state.probabilityResult
  const riskLevel = prob?.riskLevel ?? "intermediate"

  const showDDimer = riskLevel === "low" || riskLevel === "very-low" || riskLevel === "intermediate"
  const directImaging = riskLevel === "high" || riskLevel === "very-high"

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Paso 2: Evaluación Diagnóstica</h2>
        <p className="text-sm text-muted-foreground">
          Recomendación basada en la probabilidad clínica
        </p>
      </div>

      {/* Probability summary */}
      {prob && (
        <Card className="bg-muted/30">
          <CardContent className="p-3 flex items-center justify-between">
            <span className="text-sm">Probabilidad clínica ({state.probabilityScale})</span>
            <Badge variant="outline" className={cn("text-xs", RISK_COLORS[prob.riskLevel])}>
              {prob.label}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Recommendation */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">
              {directImaging
                ? "Imagen diagnóstica directa recomendada (CTPA)"
                : "Evaluar D-dímero antes de imagen"}
            </span>
          </div>

          {showDDimer && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm">D-dímero</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={state.dDimer ?? ""}
                    onChange={(e) => onUpdate({ dDimer: parseFloat(e.target.value) || 0 })}
                    className="w-24 text-right font-mono"
                    placeholder="0"
                  />
                  <span className="text-xs text-muted-foreground">ng/mL</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm">Edad del paciente</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={state.age ?? ""}
                    onChange={(e) => onUpdate({ age: parseInt(e.target.value) || 0 })}
                    className="w-20 text-right font-mono"
                    placeholder="0"
                  />
                  <span className="text-xs text-muted-foreground">años</span>
                </div>
              </div>
              {state.age && state.age > 50 && state.dDimer !== undefined && (
                <p className="text-xs text-muted-foreground">
                  Umbral D-dímero ajustado por edad: {state.age * 10} ng/mL
                  {state.dDimer < state.age * 10
                    ? " — D-dímero por debajo del umbral"
                    : " — D-dímero por encima del umbral"}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* PE confirmed? */}
      <div className="space-y-2">
        <p className="text-sm font-medium">¿Se confirma TEP?</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={state.peConfirmed === true ? "default" : "outline"}
            className="gap-2 h-12"
            onClick={() => onUpdate({ peConfirmed: true })}
          >
            <CheckCircle className="h-4 w-4" />
            Sí, TEP confirmado
          </Button>
          <Button
            variant={state.peConfirmed === false ? "destructive" : "outline"}
            className="gap-2 h-12"
            onClick={() => onUpdate({ peConfirmed: false })}
          >
            <XCircle className="h-4 w-4" />
            No / Excluido
          </Button>
        </div>
        {state.peConfirmed === false && (
          <p className="text-sm text-green-400 mt-2">
            TEP excluido. No se requiere evaluación adicional de severidad.
          </p>
        )}
      </div>
    </div>
  )
}
