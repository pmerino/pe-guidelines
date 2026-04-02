"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getSPESIItems, calculateSPESI, type SPESIInput } from "@/lib/scales/spesi"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function SPESICalculator({ onResult, compact }: Props) {
  const items = getSPESIItems()

  return (
    <ScaleCalculator
      title="sPESI"
      description="PESI simplificado — 0 puntos = bajo riesgo, ≥1 punto = alto riesgo"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label }))}
      calculate={(values) => calculateSPESI(values as unknown as SPESIInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
