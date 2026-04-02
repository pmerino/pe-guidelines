"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getBovaItems, calculateBova, type BovaInput } from "@/lib/scales/bova"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function BovaCalculator({ onResult, compact }: Props) {
  const items = getBovaItems()

  return (
    <ScaleCalculator
      title="Bova Score"
      description="Riesgo de deterioro hemodinámico en TEP hemodinámicamente estable"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label, points: i.points }))}
      calculate={(values) => calculateBova(values as unknown as BovaInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
