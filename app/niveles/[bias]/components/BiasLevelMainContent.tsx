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
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-amber-500 mb-2">{title}</h1>
        <p className="text-zinc-300 mb-4">{description}</p>
        <p className="text-zinc-400">{introduction}</p>
      </div>

      {/* Sección de decisiones */}
      {pendingDecisions.length > 0 ? (
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-amber-400 mb-4">Toma una Decisión</h2>
          <p className="text-zinc-300 mb-6">
            Tus decisiones afectarán el progreso del caso y tu comprensión del sesgo.
          </p>
          
          <div className="space-y-3">
            <p className="font-medium text-zinc-200">{pendingDecisions[0].description}</p>
            
            <div className="space-y-3 mt-4">
              {pendingDecisions[0].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onOptionSelect(pendingDecisions[0], option)}
                  className="w-full text-left p-4 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-lg transition-colors duration-200 flex items-start"
                >
                  <span className="flex-1 text-zinc-200">{option.text}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-400 ml-2 flex-shrink-0"
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
        <div className="text-center py-8">
          <button
            onClick={onCompleteLevel}
            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-medium rounded-lg transition-colors duration-200"
          >
            Completar Nivel
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
