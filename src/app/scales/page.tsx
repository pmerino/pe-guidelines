import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SCALES } from "@/lib/scales"
import {
  Stethoscope, ClipboardList, ShieldCheck, GitBranch,
  Activity, Zap, Home, HeartPulse, Gauge, Divide, Thermometer,
} from "lucide-react"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  "clipboard-list": ClipboardList,
  "shield-check": ShieldCheck,
  "git-branch": GitBranch,
  activity: Activity,
  zap: Zap,
  home: Home,
  "heart-pulse": HeartPulse,
  gauge: Gauge,
  divide: Divide,
  thermometer: Thermometer,
}

const CATEGORY_LABELS = {
  probability: "Probabilidad Clínica",
  severity: "Severidad y Pronóstico",
  monitoring: "Monitorización",
}

const CATEGORY_COLORS = {
  probability: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  severity: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  monitoring: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export default function ScalesPage() {
  const categories = ["probability", "severity", "monitoring"] as const

  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold">Escalas Clínicas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Calculadoras individuales — TEP agudo
        </p>
      </div>

      {categories.map((cat) => {
        const scales = SCALES.filter((s) => s.category === cat)
        return (
          <div key={cat} className="space-y-3">
            <Badge variant="outline" className={CATEGORY_COLORS[cat]}>
              {CATEGORY_LABELS[cat]}
            </Badge>
            <div className="grid grid-cols-2 gap-3">
              {scales.map((scale) => {
                const Icon = ICON_MAP[scale.icon]
                return (
                  <Link key={scale.id} href={`/scales/${scale.id}`}>
                    <Card className="h-full hover:border-blue-500/30 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                          <span className="font-semibold text-sm">{scale.shortName}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {scale.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
