"use client"

import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, CheckCircle, ShieldAlert, Brain } from "lucide-react"
import type { BiasType } from "@/types/game"

export default function ScoreCard() {
  const { scores, currentBias, completedLevels } = useGameStore()

  // Obtener la puntuación del nivel actual
  const currentScore = scores[currentBias]

  // Nombres de los sesgos para mostrar
  const biasNames: Record<BiasType, string> = {
    confirmacion: "Sesgo de Confirmación",
    anclaje: "Sesgo de Anclaje",
    aversion: "Aversión a la Pérdida",
    halo: "Efecto Halo",
  }

  // Iconos para cada categoría de puntuación
  const scoreIcons = {
    correctDecisions: <CheckCircle className="h-4 w-4 text-zinc-300" />,
    biasesAvoided: <ShieldAlert className="h-4 w-4 text-zinc-300" />,
    criticalThinking: <Brain className="h-4 w-4 text-zinc-300" />,
  }

  // Calcular la puntuación total de todos los niveles completados
  const calculateTotalScore = () => {
    return Object.entries(scores)
      .filter(([bias]) => completedLevels.includes(bias as BiasType))
      .reduce((total, [, score]) => total + score.total, 0)
  }

  return (
    <Card className="dotted-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Puntuación
        </CardTitle>
        <CardDescription>Tu desempeño en el nivel actual: {biasNames[currentBias]}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-md dotted-border bg-secondary/20 text-center">
            <div className="flex justify-center mb-1">{scoreIcons.correctDecisions}</div>
            <div className="text-xl font-bold text-amber-500">{currentScore.correctDecisions}</div>
            <div className="text-xs text-muted-foreground">Decisiones Acertadas</div>
          </div>

          <div className="p-3 rounded-md dotted-border bg-secondary/20 text-center">
            <div className="flex justify-center mb-1">{scoreIcons.biasesAvoided}</div>
            <div className="text-xl font-bold text-amber-500">{currentScore.biasesAvoided}</div>
            <div className="text-xs text-muted-foreground">Sesgos Evitados</div>
          </div>

          <div className="p-3 rounded-md dotted-border bg-secondary/20 text-center">
            <div className="flex justify-center mb-1">{scoreIcons.criticalThinking}</div>
            <div className="text-xl font-bold text-amber-500">{currentScore.criticalThinking}</div>
            <div className="text-xs text-muted-foreground">Pensamiento Crítico</div>
          </div>
        </div>

        <div className="p-4 rounded-md dotted-border bg-secondary/20 flex justify-between items-center">
          <div>
            <div className="text-sm text-amber-500">Puntuación Total</div>
            <div className="text-xs text-muted-foreground">
              {completedLevels.length > 0
                ? `${completedLevels.length} nivel(es) completado(s)`
                : "Ningún nivel completado aún"}
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-500">
            {completedLevels.length > 0 ? calculateTotalScore() : currentScore.total}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
