// app/niveles/[bias]/components/BiasLevelFooter.tsx

import { BiasType } from "../types/bias-level.types";

interface BiasLevelFooterProps {
  validBiases: BiasType[];
  currentBias: BiasType;
  completedLevels: BiasType[];
}

export function BiasLevelFooter({
  validBiases,
  currentBias,
  completedLevels,
}: BiasLevelFooterProps) {
  return (
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
  );
}
