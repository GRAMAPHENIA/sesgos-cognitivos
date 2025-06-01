// app/niveles/[bias]/components/BiasLevelPageLayout.tsx

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { BiasType } from "../types/bias-level.types";
import { ArrowLeft, Award, Clock, FileText, Users, Lightbulb } from "lucide-react";

interface BiasLevelPageLayoutProps {
  children: ReactNode;
  currentBias: BiasType;
  validBiases: BiasType[];
  completedLevels: BiasType[];
  onOpenScoreCard: () => void;
  onOpenCognitiveProgress: () => void;
  onOpenEvidenceBoard: () => void;
  onOpenSuspectHistory: () => void;
  onOpenHypothesisTracker: () => void;
  newEvidencesCount: number;
  onResetNewEvidencesCount: () => void;
  onGoBack: () => void;
}

export function BiasLevelPageLayout({
  children,
  currentBias,
  validBiases,
  completedLevels,
  onOpenScoreCard,
  onOpenCognitiveProgress,
  onOpenEvidenceBoard,
  onOpenSuspectHistory,
  onOpenHypothesisTracker,
  newEvidencesCount,
  onResetNewEvidencesCount,
  onGoBack,
}: BiasLevelPageLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={onGoBack}
          className="inline-flex items-center text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Inicio
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenScoreCard}
              className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
              title="Puntuación"
            >
              <Award className="h-5 w-5 text-amber-500" />
              <span className="sr-only">Puntuación</span>
            </button>

            <button
              onClick={onOpenCognitiveProgress}
              className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
              title="Progreso Cognitivo"
            >
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="sr-only">Progreso Cognitivo</span>
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  onOpenEvidenceBoard();
                  onResetNewEvidencesCount();
                }}
                className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors relative"
                title="Tablero de Evidencias"
              >
                <FileText className="h-5 w-5 text-amber-500" />
                <span className="sr-only">Tablero de Evidencias</span>
                {newEvidencesCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {newEvidencesCount}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={onOpenSuspectHistory}
              className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
              title="Historial de Sospechosos"
            >
              <Users className="h-5 w-5 text-amber-500" />
              <span className="sr-only">Historial de Sospechosos</span>
            </button>
          </div>

          <button
            onClick={onOpenHypothesisTracker}
            className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
            title="Rastreador de Hipótesis"
          >
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span className="sr-only">Rastreador de Hipótesis</span>
          </button>
          
          <ThemeToggle />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="space-y-4">{children}</div>

      {/* Footer */}
      <div className="flex justify-center mt-8">
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

      {/* Fondo decorativo */}
      <div className="fixed inset-0 -z-10 bg-grid-zinc-900/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
    </div>
  );
}
