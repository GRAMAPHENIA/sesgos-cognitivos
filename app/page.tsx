"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, Play } from "lucide-react"
import { useGameStore } from "@/store/game-store"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const resetGame = useGameStore((state) => state.resetGame)

  useEffect(() => {
    // Reiniciar el juego cuando se carga la página principal
    resetGame()
  }, [resetGame])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="text-amber-500">Sesgos</span> Cognitivos
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Un juego narrativo educativo sobre cómo nuestros sesgos cognitivos afectan nuestra toma de decisiones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="dotted-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-amber-500" />
              Comenzar Juego
            </CardTitle>
            <CardDescription>Inicia tu viaje a través de los sesgos cognitivos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Enfréntate a cuatro niveles, cada uno centrado en un sesgo cognitivo diferente. Toma decisiones, forma
              hipótesis y descubre cómo tus sesgos afectan tu percepción.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900"
              onClick={() => router.push("/niveles/confirmacion")}
            >
              Comenzar
            </Button>
          </CardFooter>
        </Card>

        <Card className="dotted-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              Instrucciones
            </CardTitle>
            <CardDescription>Aprende cómo jugar</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Descubre las reglas del juego, cómo funcionan los sesgos cognitivos y cómo puedes superarlos para tomar
              mejores decisiones basadas en evidencia.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-zinc-700 text-amber-500 hover:bg-zinc-800/30"
              onClick={() => router.push("/instrucciones")}
            >
              Ver Instrucciones
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Brain className="h-5 w-5" />
          <p>Desarrollado para el aprendizaje sobre sesgos cognitivos</p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 dotted-grid opacity-20"></div>
    </div>
  )
}
