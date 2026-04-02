"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getYEARSItems, calculateYEARS, type YEARSInput } from "@/lib/scales/years"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function YEARSCalculator({ onResult, compact }: Props) {
  const items = getYEARSItems()

  return (
    <ScaleCalculator
      title="Algoritmo YEARS"
      description="Combina 3 criterios clínicos con D-dímero para definir umbral diagnóstico"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label }))}
      numericItems={[
        { key: "dDimer", label: "D-dímero", min: 0, max: 50000, step: 10, unit: "ng/mL" },
      ]}
      calculate={(values) => calculateYEARS(values as unknown as YEARSInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
