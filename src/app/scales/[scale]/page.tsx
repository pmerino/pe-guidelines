"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getScaleById } from "@/lib/scales"
import { WellsCalculator } from "@/components/scales/wells-calc"
import { GenevaCalculator } from "@/components/scales/geneva-calc"
import { PERCCalculator } from "@/components/scales/perc-calc"
import { YEARSCalculator } from "@/components/scales/years-calc"
import { PESICalculator } from "@/components/scales/pesi-calc"
import { SPESICalculator } from "@/components/scales/spesi-calc"
import { HestiaCalculator } from "@/components/scales/hestia-calc"
import { BovaCalculator } from "@/components/scales/bova-calc"
import { CPESCalculator } from "@/components/scales/cpes-calc"
import { ShockIndexCalculator } from "@/components/scales/shock-index-calc"
import { NEWS2Calculator } from "@/components/scales/news2-calc"

const SCALE_COMPONENTS: Record<string, React.ComponentType> = {
  wells: WellsCalculator,
  geneva: GenevaCalculator,
  perc: PERCCalculator,
  years: YEARSCalculator,
  pesi: PESICalculator,
  spesi: SPESICalculator,
  hestia: HestiaCalculator,
  bova: BovaCalculator,
  cpes: CPESCalculator,
  "shock-index": ShockIndexCalculator,
  news2: NEWS2Calculator,
}

export default function ScalePage() {
  const params = useParams()
  const router = useRouter()
  const scaleId = params.scale as string
  const scaleMeta = getScaleById(scaleId)
  const ScaleComponent = SCALE_COMPONENTS[scaleId]

  if (!scaleMeta || !ScaleComponent) {
    return (
      <div className="px-4 py-6 max-w-md mx-auto">
        <p className="text-muted-foreground">Escala no encontrada.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 max-w-md mx-auto space-y-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-1 -ml-2 text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>
      <ScaleComponent />
    </div>
  )
}
