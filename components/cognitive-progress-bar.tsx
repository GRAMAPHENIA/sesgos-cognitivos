"use client"

import { useGameStore } from "@/store/game-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertTriangle, Target, TrendingDown, Heart } from "lucide-react"

export default function CognitiveProgressBar() {
  const { biasProgress, currentBias } = useGameStore()

  // Obtener información del sesgo actual
  const biasInfo = {
    confirmacion: {
      title: "Sesgo de Confirmación",
      description: "Tu tendencia a buscar información que confirme tus hipótesis existentes.",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: "from-amber-600 to-amber-400",
    },
    anclaje: {
      title: "Sesgo de Anclaje",
      description: "Tu tendencia a depender demasiado de la primera información que recibes.",
      icon: <Target className="h-5 w-5 text-amber-500" />,
      color: "from-amber-600 to-amber-400",
    },
    aversion: {
      title: "Aversión a la Pérdida",
      description: "Tu tendencia a preferir evitar pérdidas que adquirir ganancias equivalentes.",
      icon: <TrendingDown className="h-5 w-5 text-amber-500" />,
      color: "from-amber-600 to-amber-400",
    },
    halo: {
      title: "Efecto Halo",
      description: "Tu tendencia a dejarte influir por la impresión general de una persona.",
      icon: <Heart className="h-5 w-5 text-amber-500" />,
      color: "from-amber-600 to-amber-400",
    },
  }

  const info = biasInfo[currentBias]

  // Determinar el mensaje según el progreso
  const getMessage = () => {
    if (biasProgress < 25) {
      return "Estás fuertemente influenciado por este sesgo."
    } else if (biasProgress < 50) {
      return "Estás comenzando a reconocer este sesgo."
    } else if (biasProgress < 75) {
      return "Estás haciendo buen progreso superando este sesgo."
    } else {
      return "¡Estás superando este sesgo cognitivo!"
    }
  }

  return (
    <Card className="dotted-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="h-5 w-5 text-amber-500" />
          Progreso Cognitivo
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {info.icon}
          <span>{info.title}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Sesgo Fuerte</span>
            <span className="text-muted-foreground">Sesgo Superado</span>
          </div>
          <div className="relative">
            <Progress value={biasProgress} className="h-3" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${info.color}`}
              style={{ width: `${biasProgress}%`, opacity: 0.7 }}
            />
          </div>
        </div>

        <p className="text-sm">{getMessage()}</p>

        <div className="p-3 rounded-md dotted-border bg-secondary/20">
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
