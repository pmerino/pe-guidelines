"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getWellsItems, calculateWells, type WellsInput } from "@/lib/scales/wells"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function WellsCalculator({ onResult, compact }: Props) {
  const items = getWellsItems()

  return (
    <ScaleCalculator
      title="Wells Score"
      description="Probabilidad clínica pre-test de TEP"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label, points: i.points }))}
      calculate={(values) => calculateWells(values as unknown as WellsInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
