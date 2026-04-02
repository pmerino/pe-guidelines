"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardCheck, Calculator, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/evaluate", label: "Evaluar", icon: ClipboardCheck },
  { href: "/scales", label: "Escalas", icon: Calculator },
  { href: "/guide", label: "Guía", icon: BookOpen },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-md flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[72px]",
                isActive
                  ? "text-blue-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
