"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const RISK_FACTORS = {
  majorReversible: {
    title: "Mayor Reversible",
    color: "text-green-400",
    items: [
      "Cirugía con anestesia general ≥30 min",
      "Hospitalización por enfermedad aguda ≥72h confinado en cama",
      "Cesárea",
      "Fractura de miembro inferior",
    ],
  },
  minorReversible: {
    title: "Menor Reversible",
    color: "text-yellow-400",
    items: [
      "Cirugía con anestesia general <30 min",
      "Hospitalización por enfermedad aguda <72h",
      "Enfermedad aguda extrahospitalaria ≥72h confinado en cama",
      "Terapia estrogénica (TRH o ACO)",
      "Periodo periparto",
      "Trauma con movilidad reducida ≥72h",
    ],
  },
  persistent: {
    title: "Persistente (Crónico)",
    color: "text-red-400",
    items: [
      "Cáncer activo (con o sin tratamiento)",
      "Enfermedad autoinmune (AR, LES)",
      "Enfermedad inflamatoria intestinal",
      "Inmovilidad crónica",
    ],
  },
}

export function RiskFactorsGuide() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Factores de riesgo de tromboembolismo venoso (Tabla 9). Determinan la duración de anticoagulación.
      </p>

      {Object.entries(RISK_FACTORS).map(([key, group]) => (
        <Card key={key}>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className={`text-sm font-medium ${group.color}`}>
              {group.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <ul className="space-y-1">
              {group.items.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-500/10 border-blue-500/20">
        <CardContent className="p-3 space-y-2">
          <p className="text-xs font-medium text-blue-400">Implicación para anticoagulación</p>
          <div className="space-y-1 text-[11px]">
            <p><span className="font-medium">Mayor reversible:</span> Anticoagulación 3-6 meses. Bajo riesgo de recurrencia al suspender.</p>
            <p><span className="font-medium">Menor reversible:</span> Considerar extensión vs suspender a 3-6 meses (decisión compartida).</p>
            <p><span className="font-medium">Sin factor identificable:</span> Anticoagulación extendida recomendada (COR 1).</p>
            <p><span className="font-medium">Persistente:</span> Anticoagulación extendida razonable (COR 1 para cáncer, COR 2a otros).</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
