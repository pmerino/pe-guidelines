"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AHACategoriesGuide } from "@/components/guide/aha-categories"
import { TreatmentTable } from "@/components/guide/treatment-table"
import { RiskFactorsGuide } from "@/components/guide/risk-factors"
import { DiagnosticAlgorithm } from "@/components/guide/diagnostic-algorithm"

export default function GuidePage() {
  const [tab, setTab] = useState("categories")

  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold">Guía de Referencia</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AHA/ACC 2026 — TEP agudo
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="categories" className="text-[10px]">Categorías</TabsTrigger>
          <TabsTrigger value="treatment" className="text-[10px]">Tratamiento</TabsTrigger>
          <TabsTrigger value="algorithm" className="text-[10px]">Algoritmo</TabsTrigger>
          <TabsTrigger value="risk" className="text-[10px]">F. Riesgo</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-4">
          <AHACategoriesGuide />
        </TabsContent>
        <TabsContent value="treatment" className="mt-4">
          <TreatmentTable />
        </TabsContent>
        <TabsContent value="algorithm" className="mt-4">
          <DiagnosticAlgorithm />
        </TabsContent>
        <TabsContent value="risk" className="mt-4">
          <RiskFactorsGuide />
        </TabsContent>
      </Tabs>
    </div>
  )
}
