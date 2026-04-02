"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getPESIItems, calculatePESI, type PESIInput } from "@/lib/scales/pesi"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function PESICalculator({ onResult, compact }: Props) {
  const items = getPESIItems()

  return (
    <ScaleCalculator
      title="PESI"
      description="Pulmonary Embolism Severity Index — predice mortalidad a 30 días (Clases I-V)"
      numericItems={[
        { key: "age", label: "Edad", min: 18, max: 120, unit: "años" },
      ]}
      toggleItems={items.map((i) => ({ key: i.key, label: i.label, points: i.points }))}
      calculate={(values) => calculatePESI(values as unknown as PESIInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
