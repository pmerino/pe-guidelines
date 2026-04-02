"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { ScaleResult, RiskLevel } from "@/lib/types"
import { cn } from "@/lib/utils"

const RISK_COLORS: Record<RiskLevel, string> = {
  "very-low": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "intermediate-high": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  "very-high": "bg-red-700/20 text-red-300 border-red-700/30",
}

const RISK_LABELS: Record<RiskLevel, string> = {
  "very-low": "Muy bajo",
  low: "Bajo",
  intermediate: "Intermedio",
  "intermediate-high": "Intermedio-alto",
  high: "Alto",
  "very-high": "Muy alto",
}

interface ToggleItem {
  key: string
  label: string
  points?: number
}

interface NumericItem {
  key: string
  label: string
  min?: number
  max?: number
  step?: number
  unit?: string
}

interface ScaleCalculatorProps {
  title: string
  description: string
  toggleItems?: ToggleItem[]
  numericItems?: NumericItem[]
  calculate: (values: Record<string, boolean | number | string>) => ScaleResult
  onResult?: (result: ScaleResult) => void
  compact?: boolean
  scoreLabel?: string
}

export function ScaleCalculator({
  title,
  description,
  toggleItems = [],
  numericItems = [],
  calculate,
  onResult,
  compact = false,
  scoreLabel = "pts",
}: ScaleCalculatorProps) {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const item of toggleItems) init[item.key] = false
    return init
  })

  const [numerics, setNumerics] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    for (const item of numericItems) init[item.key] = item.min ?? 0
    return init
  })

  const values: Record<string, boolean | number | string> = { ...toggles, ...numerics }
  const result = calculate(values)

  const handleToggle = useCallback((key: string, checked: boolean) => {
    setToggles(prev => {
      const next = { ...prev, [key]: checked }
      return next
    })
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10)
    }
  }, [])

  const handleNumeric = useCallback((key: string, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setNumerics(prev => ({ ...prev, [key]: num }))
    }
  }, [])

  useEffect(() => {
    if (onResult) onResult(result)
  }, [result.score, result.riskLevel, result.label])

  return (
    <div className="space-y-4">
      {!compact && (
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}

      {/* Sticky score */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm py-3 border-b border-border/30">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums">
              {typeof result.score === "number" ? result.score : result.score}
            </span>
            <span className="text-sm text-muted-foreground">{scoreLabel}</span>
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", RISK_COLORS[result.riskLevel])}
          >
            {result.label}
          </Badge>
        </div>
      </div>

      {/* Numeric inputs */}
      {numericItems.length > 0 && (
        <div className="space-y-3">
          {numericItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4">
              <Label htmlFor={item.key} className="text-sm flex-1">
                {item.label}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={item.key}
                  type="number"
                  inputMode="decimal"
                  min={item.min}
                  max={item.max}
                  step={item.step ?? 1}
                  value={numerics[item.key] || ""}
                  onChange={(e) => handleNumeric(item.key, e.target.value)}
                  className="w-24 text-right font-mono"
                />
                {item.unit && (
                  <span className="text-xs text-muted-foreground w-12">{item.unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toggle items */}
      {toggleItems.length > 0 && (
        <div className="space-y-1">
          {toggleItems.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center justify-between gap-3 p-3 rounded-lg transition-colors",
                toggles[item.key]
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "border border-transparent"
              )}
            >
              <Label
                htmlFor={item.key}
                className="text-sm flex-1 cursor-pointer leading-tight"
              >
                {item.label}
                {item.points !== undefined && (
                  <span className="text-muted-foreground ml-1">
                    ({item.points > 0 ? "+" : ""}{item.points} pts)
                  </span>
                )}
              </Label>
              <Switch
                id={item.key}
                checked={toggles[item.key]}
                onCheckedChange={(checked) => handleToggle(item.key, checked)}
                className="shrink-0"
              />
            </div>
          ))}
        </div>
      )}

      {/* Interpretation */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Interpretación
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <p className="text-sm">{result.interpretation}</p>
          {result.recommendation && (
            <p className="text-sm text-blue-400 mt-2">{result.recommendation}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { RISK_COLORS, RISK_LABELS }
