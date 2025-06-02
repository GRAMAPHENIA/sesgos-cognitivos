// app/niveles/[bias]/components/BiasLevelMainContent.tsx

import { Decision, DecisionOption } from "../types/bias-level.types";

interface BiasLevelMainContentProps {
  title: string;
  description: string;
  introduction: string;
  pendingDecisions: Decision[];
  isLevelComplete: boolean;
  onOptionSelect: (decision: Decision, option: DecisionOption) => void;
  onCompleteLevel: () => void;
}

export function BiasLevelMainContent({
  title,
  description,
  introduction,
  pendingDecisions,
  isLevelComplete,
  onOptionSelect,
  onCompleteLevel,
}: BiasLevelMainContentProps) {
  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <div className="dotted-border bg-card/50 backdrop-blur-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-amber-500 mb-2">{title}</h1>
        <p className="text-zinc-400 mb-4">{description}</p>
        <p className="text-zinc-400">{introduction}</p>
      </div>

      {/* Sección de decisiones */}
      {pendingDecisions.length > 0 ? (
        <div className="dotted-border bg-card/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-amber-500 mb-4">Decisiones</h2>
          <p className="text-zinc-500 mb-6">
            Tus decisiones afectarán el progreso del caso y tu comprensión del sesgo.
          </p>
          
          <div className="space-y-3">
            <p className="font-medium text-amber-500">{pendingDecisions[0].description}</p>
            
            <div className="space-y-3 mt-4">
              {pendingDecisions[0].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onOptionSelect(pendingDecisions[0], option)}
                  className="w-full text-left p-4 hover:bg-zinc-700/10 border border-dashed border-zinc-600 rounded-lg transition-all duration-200 flex items-start transform"
                >
                  <span className="flex-1 text-zinc-500">{option.text}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : isLevelComplete ? (
        <div className="dotted-border bg-card/50 backdrop-blur-sm rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-amber-500 mb-3">¡Todas las decisiones tomadas!</h2>
          <p className="text-zinc-500 mb-6">Revisa tus decisiones o continúa al siguiente paso.</p>
          
          <button
            onClick={onCompleteLevel}
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-zinc-900 rounded-lg group bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-800 transition-all duration-200 transform"
          >
            <span className="relative flex items-center">
              Completar Nivel
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
