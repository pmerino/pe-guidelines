"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import type { EvaluationState, ScaleResult } from "@/lib/types"
import { StepProbability } from "@/components/evaluation/step-probability"
import { StepDiagnostic } from "@/components/evaluation/step-diagnostic"
import { StepSeverity } from "@/components/evaluation/step-severity"
import { StepCategory } from "@/components/evaluation/step-category"
import { StepResult } from "@/components/evaluation/step-result"

const STEPS = [
  { id: "probability", label: "Probabilidad", number: 1 },
  { id: "diagnostic", label: "Diagnóstico", number: 2 },
  { id: "severity", label: "Severidad", number: 3 },
  { id: "category", label: "Categoría", number: 4 },
  { id: "result", label: "Resultado", number: 5 },
]

const STORAGE_KEY = "pe-eval-state"
const STEP_KEY = "pe-eval-step"

function loadState(): EvaluationState {
  if (typeof window === "undefined") return {}
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function loadStep(): number {
  if (typeof window === "undefined") return 0
  try {
    const saved = sessionStorage.getItem(STEP_KEY)
    return saved ? parseInt(saved, 10) : 0
  } catch { return 0 }
}

export default function EvaluatePage() {
  const [step, setStep] = useState(loadStep)
  const [direction, setDirection] = useState(1)
  const [state, setState] = useState<EvaluationState>(loadState)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    sessionStorage.setItem(STEP_KEY, String(step))
  }, [step])

  const updateState = useCallback((updates: Partial<EvaluationState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const next = () => {
    if (step < STEPS.length - 1) {
      setDirection(1)
      setStep(step + 1)
    }
  }

  const prev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  const reset = () => {
    setStep(0)
    setDirection(-1)
    setState({})
    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STEP_KEY)
  }

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return !!state.probabilityResult
      case 1: return state.peConfirmed === true
      case 2: return !!state.severityResult
      case 3: return !!state.categoryAssignment
      default: return true
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="px-4 py-4 max-w-md mx-auto flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Evaluación TEP</h1>
          <span className="text-xs text-muted-foreground font-mono">
            {step + 1}/{STEPS.length}
          </span>
        </div>
        <Progress value={progress} className="h-1" />
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { if (i < step) { setDirection(-1); setStep(i) } }}
              className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                i === step
                  ? "bg-blue-500/20 text-blue-400 font-medium"
                  : i < step
                    ? "bg-muted text-foreground cursor-pointer"
                    : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -100, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full"
          >
            {step === 0 && (
              <StepProbability state={state} onUpdate={updateState} />
            )}
            {step === 1 && (
              <StepDiagnostic state={state} onUpdate={updateState} />
            )}
            {step === 2 && (
              <StepSeverity state={state} onUpdate={updateState} />
            )}
            {step === 3 && (
              <StepCategory state={state} onUpdate={updateState} />
            )}
            {step === 4 && (
              <StepResult state={state} onReset={reset} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4 border-t border-border/30 mt-4">
        {step > 0 && step < STEPS.length - 1 && (
          <Button variant="outline" onClick={prev} className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
        )}
        {step === 1 && state.peConfirmed === false ? (
          <Button onClick={reset} className="flex-1 gap-1">
            <RotateCcw className="h-4 w-4" /> TEP excluido — Nueva evaluación
          </Button>
        ) : step === STEPS.length - 1 ? (
          <Button onClick={reset} className="flex-1 gap-1">
            <RotateCcw className="h-4 w-4" /> Nueva evaluación
          </Button>
        ) : (
          <Button
            onClick={next}
            disabled={!canAdvance()}
            className="flex-1 gap-1"
          >
            {step === 0 && !state.probabilityResult ? "Calcular primero" : "Siguiente"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
