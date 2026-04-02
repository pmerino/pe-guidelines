"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  {
    letter: "A",
    name: "Subclínica",
    color: "#22c55e",
    risk: "Riesgo más bajo",
    description: "TEP incidental y asintomático",
    subcategories: [],
    criteria: "Hallazgo en imagen realizada por otra indicación. Sin sospecha clínica de TEP.",
  },
  {
    letter: "B",
    name: "Sintomático",
    color: "#86efac",
    risk: "Riesgo bajo",
    description: "Score de severidad bajo",
    subcategories: [
      { id: "B1", name: "Subsegmental", criteria: "TEP subsegmental (single o múltiple)" },
      { id: "B2", name: "No subsegmental", criteria: "TEP segmental o más proximal" },
    ],
    criteria: "PESI clase I-II, sPESI = 0, o Hestia negativo",
  },
  {
    letter: "C",
    name: "Sintomático",
    color: "#f97316",
    risk: "Riesgo elevado",
    description: "Score de severidad elevado",
    subcategories: [
      { id: "C1", name: "VD normal + biomarcadores normales", criteria: "Sin disfunción VD ni elevación de biomarcadores" },
      { id: "C2", name: "VD anormal O ≥1 biomarcador anormal", criteria: "Uno de los dos alterado" },
      { id: "C3", name: "VD anormal Y ≥1 biomarcador anormal", criteria: "Ambos alterados — mayor riesgo" },
    ],
    criteria: "PESI clase III-V, sPESI ≥ 1, o Hestia ≥ 1",
  },
  {
    letter: "D",
    name: "Fallo Cardiopulmonar Incipiente",
    color: "#dc2626",
    risk: "Riesgo alto",
    description: "Pre-shock o shock normotensivo",
    subcategories: [
      { id: "D1", name: "Hipotensión transitoria", criteria: "PAS <90 transitoria, responde a volumen" },
      { id: "D2", name: "Shock normotensivo", criteria: "Lactato >2, AKI, IC ≤2.2, sin hipotensión" },
    ],
    criteria: "Signos de compromiso hemodinámico incipiente",
  },
  {
    letter: "E",
    name: "Fallo Cardiopulmonar",
    color: "#991b1b",
    risk: "Riesgo más alto",
    description: "Shock cardiogénico o paro",
    subcategories: [
      { id: "E1", name: "Shock cardiogénico", criteria: "Hipotensión recurrente/persistente con shock" },
      { id: "E2", name: "Shock refractario / Paro cardíaco", criteria: "Refractario a vasopresores o paro cardíaco" },
    ],
    criteria: "Colapso hemodinámico establecido",
  },
]

export function AHACategoriesGuide() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Categorías Clínicas AHA/ACC para TEP Agudo 2026. Toca una categoría para ver subcategorías.
      </p>

      {/* Risk gradient bar */}
      <div className="flex rounded-full overflow-hidden h-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.letter}
            className="flex-1"
            style={{ backgroundColor: cat.color }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Menor riesgo</span>
        <span>Mayor riesgo</span>
      </div>

      {CATEGORIES.map((cat) => (
        <Card
          key={cat.letter}
          className="overflow-hidden cursor-pointer"
          onClick={() => setExpanded(expanded === cat.letter ? null : cat.letter)}
        >
          <div className="h-1" style={{ backgroundColor: cat.color }} />
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="text-xl font-bold font-mono w-8"
                  style={{ color: cat.color }}
                >
                  {cat.letter}
                </span>
                <div>
                  <p className="text-sm font-medium">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  expanded === cat.letter && "rotate-180"
                )}
              />
            </div>

            {expanded === cat.letter && (
              <div className="pt-2 space-y-2">
                <p className="text-xs">{cat.criteria}</p>
                {cat.subcategories.length > 0 && (
                  <div className="space-y-1.5 pl-4 border-l-2" style={{ borderColor: cat.color + "60" }}>
                    {cat.subcategories.map((sub) => (
                      <div key={sub.id} className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-mono" style={{ borderColor: cat.color + "40", color: cat.color }}>
                            {sub.id}
                          </Badge>
                          <span className="text-xs font-medium">{sub.name}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{sub.criteria}</p>
                      </div>
                    ))}
                  </div>
                )}
                <Badge variant="outline" className="text-[10px]">{cat.risk}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Card className="bg-purple-500/10 border-purple-500/20">
        <CardContent className="p-3">
          <p className="text-xs">
            <span className="font-medium text-purple-400">Modificador R:</span>{" "}
            Aplicar a categorías C-E cuando hay hipoxemia/taquipnea con necesidad de O₂ suplementario
            (SpO₂ &lt;90%, FR ≥30, o uso de cánula nasal &gt;6L/mascarilla).
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
