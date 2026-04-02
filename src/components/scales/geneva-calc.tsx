"use client"

import { useState } from "react"
import { ScaleCalculator } from "@/components/scale-calculator"
import { getGenevaItems, calculateGeneva, type GenevaInput } from "@/lib/scales/geneva"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ScaleResult } from "@/lib/types"

interface Props {
  onResult?: (result: ScaleResult) => void
  compact?: boolean
}

export function GenevaCalculator({ onResult, compact }: Props) {
  const [simplified, setSimplified] = useState(false)
  const items = getGenevaItems(simplified)

  return (
    <div className="space-y-4">
      <Tabs value={simplified ? "simplified" : "full"} onValueChange={(v) => setSimplified(v === "simplified")}>
        <TabsList className="w-full">
          <TabsTrigger value="full" className="flex-1">Completo</TabsTrigger>
          <TabsTrigger value="simplified" className="flex-1">Simplificado</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScaleCalculator
        title="Geneva Revisado"
        description={simplified ? "Versión simplificada — todos los ítems valen 1 punto" : "Versión completa con puntuación variable"}
        toggleItems={items.map((i) => ({ key: i.key, label: i.label, points: i.points }))}
        calculate={(values) => calculateGeneva(values as unknown as GenevaInput, simplified)}
        onResult={onResult}
        compact={compact}
      />
    </div>
  )
}
