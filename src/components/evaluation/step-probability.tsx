"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { WellsCalculator } from "@/components/scales/wells-calc"
import { GenevaCalculator } from "@/components/scales/geneva-calc"
import { PERCCalculator } from "@/components/scales/perc-calc"
import { YEARSCalculator } from "@/components/scales/years-calc"
import type { EvaluationState, ScaleResult } from "@/lib/types"

interface Props {
  state: EvaluationState
  onUpdate: (updates: Partial<EvaluationState>) => void
}

export function StepProbability({ state, onUpdate }: Props) {
  const [selectedScale, setSelectedScale] = useState(state.probabilityScale || "wells")

  const handleResult = (scaleName: string) => (result: ScaleResult) => {
    onUpdate({
      probabilityScale: scaleName,
      probabilityResult: result,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Paso 1: Probabilidad Clínica</h2>
        <p className="text-sm text-muted-foreground">
          Seleccione una escala para evaluar la probabilidad pre-test de TEP
        </p>
      </div>

      <Tabs value={selectedScale} onValueChange={setSelectedScale}>
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="wells" className="text-xs">Wells</TabsTrigger>
          <TabsTrigger value="geneva" className="text-xs">Geneva</TabsTrigger>
          <TabsTrigger value="perc" className="text-xs">PERC</TabsTrigger>
          <TabsTrigger value="years" className="text-xs">YEARS</TabsTrigger>
        </TabsList>

        <TabsContent value="wells" className="mt-4">
          <WellsCalculator onResult={handleResult("wells")} compact />
        </TabsContent>
        <TabsContent value="geneva" className="mt-4">
          <GenevaCalculator onResult={handleResult("geneva")} compact />
        </TabsContent>
        <TabsContent value="perc" className="mt-4">
          <PERCCalculator onResult={handleResult("perc")} compact />
        </TabsContent>
        <TabsContent value="years" className="mt-4">
          <YEARSCalculator onResult={handleResult("years")} compact />
        </TabsContent>
      </Tabs>
    </div>
  )
}
