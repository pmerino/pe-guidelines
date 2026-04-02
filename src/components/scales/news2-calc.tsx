"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { calculateNEWS2, type NEWS2Input } from "@/lib/scales/news2"
import { RISK_COLORS } from "@/components/scale-calculator"
import { cn } from "@/lib/utils"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function NEWS2Calculator({ onResult, compact }: Props) {
  const [respRate, setRespRate] = useState(16)
  const [spo2, setSpo2] = useState(97)
  const [isOnO2, setIsOnO2] = useState(false)
  const [temperature, setTemperature] = useState(37.0)
  const [systolicBP, setSystolicBP] = useState(120)
  const [heartRate, setHeartRate] = useState(80)
  const [consciousness, setConsciousness] = useState<NEWS2Input["consciousness"]>("alert")

  const result = useMemo(() => {
    const r = calculateNEWS2({ respRate, spo2, isOnO2, temperature, systolicBP, heartRate, consciousness })
    if (onResult) onResult(r)
    return r
  }, [respRate, spo2, isOnO2, temperature, systolicBP, heartRate, consciousness, onResult])

  return (
    <div className="space-y-4">
      {!compact && (
        <div>
          <h2 className="text-lg font-semibold">NEWS2</h2>
          <p className="text-sm text-muted-foreground">National Early Warning Score 2 — detección de deterioro clínico</p>
        </div>
      )}

      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm py-3 border-b border-border/30">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums">{result.score}</span>
            <span className="text-sm text-muted-foreground">/20</span>
          </div>
          <Badge variant="outline" className={cn("text-xs font-medium", RISK_COLORS[result.riskLevel])}>
            {result.label}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: "Frecuencia respiratoria", value: respRate, set: setRespRate, unit: "rpm", min: 1, max: 60 },
          { label: "SpO₂", value: spo2, set: setSpo2, unit: "%", min: 50, max: 100 },
          { label: "Temperatura", value: temperature, set: setTemperature, unit: "°C", min: 30, max: 42, step: 0.1 },
          { label: "PAS", value: systolicBP, set: setSystolicBP, unit: "mmHg", min: 40, max: 300 },
          { label: "Frecuencia cardíaca", value: heartRate, set: setHeartRate, unit: "lpm", min: 20, max: 250 },
        ].map((field) => (
          <div key={field.label} className="flex items-center justify-between gap-4">
            <Label className="text-sm flex-1">{field.label}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="decimal"
                min={field.min}
                max={field.max}
                step={field.step ?? 1}
                value={field.value}
                onChange={(e) => field.set(parseFloat(e.target.value) || 0)}
                className="w-20 text-right font-mono"
              />
              <span className="text-xs text-muted-foreground w-12">{field.unit}</span>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-transparent">
          <Label htmlFor="o2" className="text-sm flex-1 cursor-pointer">O₂ suplementario</Label>
          <Switch id="o2" checked={isOnO2} onCheckedChange={setIsOnO2} />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Nivel de consciencia</Label>
          <RadioGroup value={consciousness} onValueChange={(v) => setConsciousness(v as NEWS2Input["consciousness"])}>
            {[
              { value: "alert", label: "Alerta" },
              { value: "confusion", label: "Confusión de nuevo inicio" },
              { value: "voice", label: "Responde a voz" },
              { value: "pain", label: "Responde a dolor" },
              { value: "unresponsive", label: "No responde" },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center gap-2 p-2">
                <RadioGroupItem value={opt.value} id={`c-${opt.value}`} />
                <Label htmlFor={`c-${opt.value}`} className="text-sm cursor-pointer">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <Card className="bg-muted/30">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Interpretación</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <p className="text-sm">{result.interpretation}</p>
          <p className="text-sm text-blue-400 mt-2">{result.recommendation}</p>
        </CardContent>
      </Card>
    </div>
  )
}
