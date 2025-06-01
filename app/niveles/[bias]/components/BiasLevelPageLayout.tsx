// app/niveles/[bias]/components/BiasLevelPageLayout.tsx

import { ReactNode } from "react";
import { BiasType } from "../types/bias-level.types";

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
        <button
          onClick={onGoBack}
          className="inline-flex items-center text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Volver al Inicio
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenScoreCard}
              className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
              title="Puntuación"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="sr-only">Puntuación</span>
            </button>

            <button
              onClick={onOpenCognitiveProgress}
              className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
              title="Progreso Cognitivo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                    clipRule="evenodd"
                  />
                </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Historial de Sospechosos</span>
            </button>
          </div>

          <button
            onClick={onOpenHypothesisTracker}
            className="p-2 rounded-full hover:bg-zinc-800/30 transition-colors"
            title="Rastreador de Hipótesis"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10a1 1 0 01-1.64 0l-7-10A1 1 0 012 7h5.792l1.962-3.077a1 1 0 011.546-.107z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Rastreador de Hipótesis</span>
          </button>
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
