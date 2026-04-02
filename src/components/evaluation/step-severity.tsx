"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PESICalculator } from "@/components/scales/pesi-calc"
import { SPESICalculator } from "@/components/scales/spesi-calc"
import { HestiaCalculator } from "@/components/scales/hestia-calc"
import { BovaCalculator } from "@/components/scales/bova-calc"
import { CPESCalculator } from "@/components/scales/cpes-calc"
import type { EvaluationState, ScaleResult } from "@/lib/types"

interface Props {
  state: EvaluationState
  onUpdate: (updates: Partial<EvaluationState>) => void
}

export function StepSeverity({ state, onUpdate }: Props) {
  const [selectedScale, setSelectedScale] = useState(state.severityScale || "spesi")

  const handleResult = (scaleName: string) => (result: ScaleResult) => {
    onUpdate({ severityScale: scaleName, severityResult: result })
  }

  const toggleField = (field: keyof EvaluationState) => (checked: boolean) => {
    onUpdate({ [field]: checked })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Paso 3: Severidad</h2>
        <p className="text-sm text-muted-foreground">
          Evaluar la gravedad del TEP confirmado
        </p>
      </div>

      <Tabs value={selectedScale} onValueChange={setSelectedScale}>
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="spesi" className="text-[10px]">sPESI</TabsTrigger>
          <TabsTrigger value="pesi" className="text-[10px]">PESI</TabsTrigger>
          <TabsTrigger value="hestia" className="text-[10px]">Hestia</TabsTrigger>
          <TabsTrigger value="bova" className="text-[10px]">Bova</TabsTrigger>
          <TabsTrigger value="cpes" className="text-[10px]">CPES</TabsTrigger>
        </TabsList>

        <TabsContent value="spesi" className="mt-4">
          <SPESICalculator onResult={handleResult("spesi")} compact />
        </TabsContent>
        <TabsContent value="pesi" className="mt-4">
          <PESICalculator onResult={handleResult("pesi")} compact />
        </TabsContent>
        <TabsContent value="hestia" className="mt-4">
          <HestiaCalculator onResult={handleResult("hestia")} compact />
        </TabsContent>
        <TabsContent value="bova" className="mt-4">
          <BovaCalculator onResult={handleResult("bova")} compact />
        </TabsContent>
        <TabsContent value="cpes" className="mt-4">
          <CPESCalculator onResult={handleResult("cpes")} compact />
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="space-y-1">
        <p className="text-sm font-medium mb-3">Parámetros adicionales para categorización</p>
        {[
          { key: "biomarkerElevated" as const, label: "Biomarcadores elevados (troponina y/o BNP)" },
          { key: "rvDysfunction" as const, label: "Disfunción del VD (eco/CT: RV/LV >1.0)" },
          { key: "hypotension" as const, label: "Hipotensión (PAS <90 mmHg)" },
          { key: "shock" as const, label: "Shock (lactato >2, AKI, IC ≤2.2)" },
          { key: "lactateElevated" as const, label: "Lactato elevado" },
          { key: "needsSupplementalO2" as const, label: "Necesita O₂ suplementario" },
          { key: "tachypnea" as const, label: "Taquipnea (FR ≥30) o SpO₂ <90%" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-3 p-3 rounded-lg"
          >
            <Label htmlFor={item.key} className="text-sm flex-1 cursor-pointer leading-tight">
              {item.label}
            </Label>
            <Switch
              id={item.key}
              checked={!!state[item.key]}
              onCheckedChange={toggleField(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
