"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, Lightbulb } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Modal } from "@/components/modal";
import HypothesisTracker from "@/components/hypothesis-tracker";
import EvidenceBoard from "@/components/evidence-board";
import SuspectHistory from "@/components/suspect-history";
import CognitiveProgressBar from "@/components/cognitive-progress-bar";
import ScoreCard from "@/components/score-card";
import type { BiasType, Decision, DecisionOption } from "@/types/game";

// Importar datos de los niveles
import { confirmacionLevel } from "@/data/confirmacion-level";
import { anclajeLevel } from "@/data/anclaje-level";
import { aversionLevel } from "@/data/aversion-level";
import { haloLevel } from "@/data/halo-level";

export default function BiasLevelPage() {
  const params = useParams();
  const router = useRouter();
  const {
    setCurrentBias,
    loadLevel,
    currentBias,
    currentLevel,
    biasProgress,
    madeDecisions,
    makeDecision,
    completeLevel,
    completedLevels,
  } = useGameStore();

  const [showConclusion, setShowConclusion] = useState(false);
  const [isHypothesisModalOpen, setIsHypothesisModalOpen] = useState(false);

  // Obtener el sesgo de los parámetros de la URL
  const biasParam = params.bias as string;

  // Validar que el sesgo sea válido
  const validBiases: BiasType[] = [
    "confirmacion",
    "anclaje",
    "aversion",
    "halo",
  ];
  const isValidBias = validBiases.includes(biasParam as BiasType);

  // Redirigir si el sesgo no es válido
  useEffect(() => {
    if (!isValidBias) {
      router.push("/niveles/confirmacion");
    }
  }, [isValidBias, router]);

  // Cargar el nivel correspondiente al sesgo
  useEffect(() => {
    if (isValidBias) {
      const bias = biasParam as BiasType;
      setCurrentBias(bias);

      // Cargar los datos del nivel según el sesgo
      let levelData;
      switch (bias) {
        case "confirmacion":
          levelData = confirmacionLevel;
          break;
        case "anclaje":
          levelData = anclajeLevel;
          break;
        case "aversion":
          levelData = aversionLevel;
          break;
        case "halo":
          levelData = haloLevel;
          break;
      }

      if (levelData) {
        loadLevel(levelData);
      }
    }
  }, [biasParam, isValidBias, loadLevel, setCurrentBias]);

  // Determinar si el nivel está completo
  const isLevelComplete = biasProgress >= 100;

  // Obtener las decisiones pendientes (no tomadas aún)
  const pendingDecisions = currentLevel
    ? currentLevel.decisions.filter(
        (d) => !madeDecisions.some((md) => md.id === d.id)
      )
    : [];

  // Manejar la selección de una opción de decisión
  const handleOptionSelect = (decision: Decision, option: DecisionOption) => {
    makeDecision(decision.id, option.id);
  };

  // Manejar la finalización del nivel
  const handleCompleteLevel = () => {
    completeLevel();
    setShowConclusion(true);
  };

  // Manejar la navegación al siguiente nivel
  const handleNextLevel = () => {
    // Determinar a dónde navegar después
    const biasOrder: BiasType[] = [
      "confirmacion",
      "anclaje",
      "aversion",
      "halo",
    ];
    const currentIndex = biasOrder.indexOf(currentBias);

    if (currentIndex < biasOrder.length - 1) {
      // Avanzar al siguiente nivel
      router.push(`/niveles/${biasOrder[currentIndex + 1]}`);
    } else {
      // Todos los niveles completados, ir a la página de resumen
      router.push("/");
    }
  };

  // Si no hay nivel cargado, mostrar carga
  if (!currentLevel) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-muted-foreground">Cargando nivel...</p>
      </div>
    );
  }

  // Si se está mostrando la conclusión
  if (showConclusion) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="dotted-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              Nivel Completado: {currentLevel.title}
            </CardTitle>
            <CardDescription>
              Has superado el sesgo de {currentBias}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>{currentLevel.conclusion}</p>

            <ScoreCard />

            <div className="flex justify-center pt-4">
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-zinc-900"
                size="lg"
                onClick={handleNextLevel}
              >
                {currentBias === "halo" ? (
                  <>
                    Finalizar Juego
                    <Check className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    Siguiente Nivel
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="absolute inset-0 -z-10 dotted-grid opacity-20"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsHypothesisModalOpen(true)}
            className="rounded-full hover:bg-zinc-800/30"
            title="Rastreador de Hipótesis"
          >
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span className="sr-only">Rastreador de Hipótesis</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="space-y-4">
        <Card className="dotted-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{currentLevel.title}</CardTitle>
            <CardDescription>{currentLevel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{currentLevel.introduction}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HypothesisTracker />
          <EvidenceBoard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SuspectHistory />
          <div className="space-y-6">
            <CognitiveProgressBar />
            <ScoreCard />
          </div>
        </div>

        {pendingDecisions.length > 0 && (
          <Card className="dotted-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Toma una Decisión</CardTitle>
              <CardDescription>
                Tus decisiones afectarán el progreso del caso y tu comprensión
                del sesgo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="font-medium">{pendingDecisions[0].description}</p>

              <div className="space-y-3">
                {pendingDecisions[0].options.map((option) => (
                  <Button
                    key={option.id}
                    className="w-full justify-start text-left h-auto py-3 bg-secondary/50 hover:bg-secondary/70 dotted-border"
                    onClick={() =>
                      handleOptionSelect(pendingDecisions[0], option)
                    }
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isLevelComplete && pendingDecisions.length === 0 && (
          <div className="flex justify-center mt-8">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-zinc-900"
              size="lg"
              onClick={handleCompleteLevel}
            >
              Completar Nivel
              <Check className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {validBiases.map((bias, index) => (
            <div
              key={bias}
              className={`w-3 h-3 rounded-full ${
                completedLevels.includes(bias)
                  ? "bg-amber-500"
                  : bias === currentBias
                  ? "bg-zinc-400"
                  : "bg-zinc-700"
              }`}
              title={`Nivel ${index + 1}: ${bias}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 dotted-grid opacity-20" />
      <Modal
        isOpen={isHypothesisModalOpen}
        onClose={() => setIsHypothesisModalOpen(false)}
        title="Rastreador de Hipótesis"
      >
        <HypothesisTracker />
      </Modal>
    </div>
  )
}
