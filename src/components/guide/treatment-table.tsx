"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const COR_COLORS: Record<string, string> = {
  "2a": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "2b": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "3:H": "bg-red-500/20 text-red-400 border-red-500/30",
  "3:NB": "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
}

const TABLE_DATA = [
  { cat: "A-C1", lysis: "3:H", cdl: "3:NB", mt: "3:NB", surgery: "3:NB" },
  { cat: "C2", lysis: "3:H", cdl: "2b", mt: "2b", surgery: "3:NB" },
  { cat: "C3", lysis: "2b", cdl: "2b", mt: "2b", surgery: "3:NB" },
  { cat: "D1-2", lysis: "2b", cdl: "2b", mt: "2b", surgery: "2b" },
  { cat: "E1", lysis: "2a", cdl: "2a", mt: "2a", surgery: "2a" },
  { cat: "E2", lysis: "2a", cdl: "—", mt: "—", surgery: "3:NB" },
]

function CorBadge({ cor }: { cor: string }) {
  if (cor === "—") return <span className="text-xs text-muted-foreground">N/A</span>
  const colorKey = cor as keyof typeof COR_COLORS
  return (
    <Badge variant="outline" className={cn("text-[9px] font-mono px-1.5", COR_COLORS[colorKey])}>
      {cor === "3:H" ? "3:Harm" : cor === "3:NB" ? "3:NoBen" : `COR ${cor}`}
    </Badge>
  )
}

export function TreatmentTable() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Resumen de recomendaciones de terapia avanzada por categoría AHA/ACC (Tabla 7 de las guías).
      </p>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="p-2 text-left font-medium text-muted-foreground">Cat.</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Lisis</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">CDL</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">MT</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Cirugía</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((row) => (
                  <tr key={row.cat} className="border-b border-border/20 last:border-0">
                    <td className="p-2 font-mono font-medium">{row.cat}</td>
                    <td className="p-2 text-center"><CorBadge cor={row.lysis} /></td>
                    <td className="p-2 text-center"><CorBadge cor={row.cdl} /></td>
                    <td className="p-2 text-center"><CorBadge cor={row.mt} /></td>
                    <td className="p-2 text-center"><CorBadge cor={row.surgery} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-1 text-[10px] text-muted-foreground">
        <p><span className="text-yellow-400">COR 2a</span> = Razonable (beneficio &gt;&gt; riesgo)</p>
        <p><span className="text-orange-400">COR 2b</span> = Puede considerarse (beneficio ≥ riesgo)</p>
        <p><span className="text-red-400">3:Harm</span> = No recomendado (riesgo &gt; beneficio)</p>
        <p><span className="text-zinc-400">3:NoBen</span> = Sin beneficio</p>
        <p>CDL = Trombolisis dirigida por catéter · MT = Trombectomía mecánica</p>
      </div>
    </div>
  )
}
