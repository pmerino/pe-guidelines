"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getPERCItems, calculatePERC, type PERCInput } from "@/lib/scales/perc"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function PERCCalculator({ onResult, compact }: Props) {
  const items = getPERCItems()

  return (
    <ScaleCalculator
      title="PERC Rule-Out"
      description="Si todos los criterios se cumplen y probabilidad clínica <15%, TEP excluido sin más pruebas"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label }))}
      calculate={(values) => calculatePERC(values as unknown as PERCInput)}
      onResult={onResult}
      compact={compact}
      scoreLabel=""
    />
  )
}
