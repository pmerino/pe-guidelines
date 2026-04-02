"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getHestiaItems, calculateHestia, type HestiaInput } from "@/lib/scales/hestia"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function HestiaCalculator({ onResult, compact }: Props) {
  const items = getHestiaItems()

  return (
    <ScaleCalculator
      title="Criterios Hestia"
      description="Si todas las respuestas son 'No', el paciente puede ser candidato a manejo ambulatorio"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label }))}
      calculate={(values) => calculateHestia(values as unknown as HestiaInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
