"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, AlertTriangle, Target, TrendingDown, Heart } from "lucide-react"

export default function InstruccionesPage() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">Instrucciones del Juego</h1>

        <p className="text-lg text-muted-foreground">
          Este juego te desafía a reconocer y superar cuatro sesgos cognitivos comunes a través de una serie de
          investigaciones narrativas.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cómo Jugar</h2>

        <ol className="space-y-4 list-decimal list-inside">
          <li>Cada nivel representa un sesgo cognitivo diferente.</li>
          <li>Formarás hipótesis sobre los casos presentados.</li>
          <li>Recopilarás evidencias que pueden confirmar o refutar tus hipótesis.</li>
          <li>Tomarás decisiones basadas en la información disponible.</li>
          <li>El juego te mostrará cómo tus sesgos afectan tus decisiones.</li>
          <li>Tu objetivo es reconocer y superar estos sesgos para tomar mejores decisiones.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Los Sesgos Cognitivos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="dotted-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Sesgo de Confirmación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tendemos a buscar, interpretar y recordar información que confirma nuestras creencias existentes,
                ignorando evidencia contradictoria.
              </p>
            </CardContent>
          </Card>

          <Card className="dotted-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-amber-500" />
                Sesgo de Anclaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dependemos demasiado de la primera información que recibimos (el "ancla") al tomar decisiones
                posteriores.
              </p>
            </CardContent>
          </Card>

          <Card className="dotted-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingDown className="h-5 w-5 text-amber-500" />
                Aversión a la Pérdida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Preferimos evitar pérdidas que adquirir ganancias equivalentes. El dolor de perder es psicológicamente
                más poderoso que el placer de ganar.
              </p>
            </CardContent>
          </Card>

          <Card className="dotted-border bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-5 w-5 text-amber-500" />
                Efecto Halo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nuestra impresión general de una persona influye en cómo percibimos sus rasgos específicos. Si nos
                agrada alguien, tendemos a ver todas sus acciones de manera positiva.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Componentes del Juego</h2>

        <ul className="space-y-4 list-disc list-inside">
          <li>
            <span className="font-semibold text-amber-500">Rastreador de Hipótesis:</span> Aquí puedes crear, editar y
            eliminar tus hipótesis sobre el caso.
          </li>
          <li>
            <span className="font-semibold text-amber-500">Tablero de Evidencias:</span> Muestra las pistas que has
            descubierto. Algunas pueden estar filtradas por tus sesgos.
          </li>
          <li>
            <span className="font-semibold text-amber-500">Historial de Sospechosos:</span> Información detallada sobre
            cada sospechoso del caso.
          </li>
          <li>
            <span className="font-semibold text-amber-500">Barra de Progreso Cognitivo:</span> Indica tu avance en la
            superación del sesgo del nivel actual.
          </li>
          <li>
            <span className="font-semibold text-amber-500">Tarjeta de Puntuación:</span> Muestra tu desempeño en cada
            nivel.
          </li>
        </ul>

        <div className="mt-12 flex justify-center">
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-zinc-900"
            onClick={() => router.push("/niveles/confirmacion")}
            size="lg"
          >
            <Brain className="mr-2 h-5 w-5" />
            Comenzar el Juego
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 dotted-grid opacity-20"></div>
    </div>
  )
}
