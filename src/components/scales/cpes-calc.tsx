"use client"

import { ScaleCalculator } from "@/components/scale-calculator"
import { getCPESItems, calculateCPES, type CPESInput } from "@/lib/scales/cpes"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function CPESCalculator({ onResult, compact }: Props) {
  const items = getCPESItems()

  return (
    <ScaleCalculator
      title="CPES Score"
      description="Composite Pulmonary Embolism Shock — riesgo de shock normotensivo"
      toggleItems={items.map((i) => ({ key: i.key, label: i.label }))}
      calculate={(values) => calculateCPES(values as unknown as CPESInput)}
      onResult={onResult}
      compact={compact}
    />
  )
}
