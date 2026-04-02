"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { calculateShockIndex, type ShockIndexInput } from "@/lib/scales/shock-index"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function ShockIndexCalculator({ onResult, compact }: Props) {
  return (
    <ScaleCalculator
      title="Shock Index"
      description="FC / PAS — indicador rápido de inestabilidad hemodinámica"
      numericItems={[
        { key: "heartRate", label: "Frecuencia cardíaca", min: 30, max: 250, unit: "lpm" },
        { key: "systolicBP", label: "PAS", min: 40, max: 300, unit: "mmHg" },
      ]}
      calculate={(values) => calculateShockIndex(values as unknown as ShockIndexInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
