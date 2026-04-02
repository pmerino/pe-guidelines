"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Check, X } from "lucide-react"

export function DiagnosticAlgorithm() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Algoritmo de evaluación diagnóstica para sospecha de TEP agudo (Figura 1 de las guías).
      </p>

      <div className="space-y-3">
        {/* Step 1 */}
        <Card className="border-green-500/30">
          <CardContent className="p-3 space-y-1">
            <Badge className="bg-green-500/20 text-green-400 text-[10px]">COR 1</Badge>
            <p className="text-sm font-medium">Historia clínica y examen físico</p>
            <p className="text-xs text-muted-foreground">
              Evaluar factores de riesgo, síntomas y signos. Determinar probabilidad pre-test con herramienta validada (Wells, Geneva).
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-muted-foreground" /></div>

        {/* Probability branches */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="border-green-500/20">
            <CardContent className="p-2 text-center space-y-1">
              <p className="text-[10px] font-medium text-green-400">Baja &lt;15%</p>
              <p className="text-[10px] text-muted-foreground">Evaluar PERC</p>
              <p className="text-[10px]">Si PERC negativo → <span className="text-green-400">Excluir TEP</span></p>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/20">
            <CardContent className="p-2 text-center space-y-1">
              <p className="text-[10px] font-medium text-yellow-400">Intermedia 15-50%</p>
              <p className="text-[10px] text-muted-foreground">D-dímero + YEARS</p>
              <p className="text-[10px]">Si negativo → <span className="text-green-400">Excluir</span></p>
            </CardContent>
          </Card>
          <Card className="border-red-500/20">
            <CardContent className="p-2 text-center space-y-1">
              <p className="text-[10px] font-medium text-red-400">Alta &gt;50%</p>
              <p className="text-[10px] text-muted-foreground">Imagen directa</p>
              <p className="text-[10px]">CTPA <span className="text-blue-400">(COR 1)</span></p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-muted-foreground" /></div>

        {/* D-dimer thresholds */}
        <Card className="bg-muted/30">
          <CardContent className="p-3 space-y-2">
            <p className="text-sm font-medium">Umbrales de D-dímero</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 mt-0.5 text-green-400 shrink-0" />
                <p><span className="font-medium">Ajustado por edad (≥50 años):</span> edad × 10 ng/mL</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 mt-0.5 text-green-400 shrink-0" />
                <p><span className="font-medium">YEARS 0 criterios:</span> umbral 1000 ng/mL</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 mt-0.5 text-green-400 shrink-0" />
                <p><span className="font-medium">YEARS ≥1 criterio:</span> umbral 500 ng/mL</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-muted-foreground" /></div>

        {/* Imaging */}
        <Card>
          <CardContent className="p-3 space-y-2">
            <p className="text-sm font-medium">Imagen diagnóstica</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 text-[9px] shrink-0">COR 1</Badge>
                <p><span className="font-medium">CTPA</span> — estándar de referencia</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-green-500/20 text-green-400 text-[9px] shrink-0">COR 1</Badge>
                <p><span className="font-medium">V/Q scan</span> — alternativa validada</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-yellow-500/20 text-yellow-400 text-[9px] shrink-0">COR 2a</Badge>
                <p><span className="font-medium">V/Q SPECT</span> — preferible sobre V/Q planar</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge className="bg-red-500/20 text-red-400 text-[9px] shrink-0">COR 3</Badge>
                <p>Eco sola <span className="font-medium">no confirma ni excluye</span> TEP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RV assessment */}
        <Card>
          <CardContent className="p-3 space-y-2">
            <p className="text-sm font-medium">Si TEP confirmado — evaluar VD</p>
            <div className="space-y-1.5 text-xs">
              <p>• RV/LV ratio en CT (COR 1, eje corto axial o 4C)</p>
              <p>• Eco: TAPSE, velocidad sistólica tricuspídea, McConnell</p>
              <p>• Biomarcadores: troponina y BNP/NT-proBNP</p>
              <p>• Lactato (arterial o venoso) si Cat C-E</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
