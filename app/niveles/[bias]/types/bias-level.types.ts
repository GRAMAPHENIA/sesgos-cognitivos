// app/niveles/[bias]/types/bias-level.types.ts

import type { 
  BiasType, 
  Decision as StoreDecision, 
  DecisionOption as StoreDecisionOption, 
  Level as StoreLevel,
  Suspect as StoreSuspect,
  Hypothesis,
  Evidence
} from "@/types/game";

// Re-exportar tipos del store para mantener consistencia
export type { BiasType, Evidence, Hypothesis };

// Tipo para las decisiones tomadas
export interface MadeDecision {
  decisionId: string;
  optionId: string;
}

// Extender tipos del store según sea necesario
export interface DecisionOption extends Omit<StoreDecisionOption, 'biasInfluence' | 'consequenceDescription' | 'unlocksEvidenceIds'> {
  effect: number; // Alias para biasInfluence
  text: string;    // Alias para consequenceDescription
  evidenceId?: string; // Alias para unlocksEvidenceIds[0]
  nextDecisionId?: string;
}

export interface Decision extends Omit<StoreDecision, 'options'> {
  options: DecisionOption[];
  isCritical?: boolean;
}

export interface Suspect extends Omit<StoreSuspect, 'evidenceIds'> {
  // Mantenemos la misma estructura pero sin evidenceIds que ya está en el store
}

export interface LevelData extends Omit<StoreLevel, 'decisions' | 'suspects'> {
  // Asegurarse de que las decisiones y sospechosos usen nuestros tipos extendidos
  decisions: Decision[];
  suspects: Suspect[];
  // Campos adicionales específicos de la UI
  maxScore: number;
}

export interface LevelProgress {
  biasProgress: number;
  madeDecisions: MadeDecision[];
  completedLevels: BiasType[];
}

// Tipo para los datos de un nivel en el store
export type StoreLevelData = Omit<StoreLevel, 'decisions' | 'suspects'> & {
  decisions: StoreDecision[];
  suspects: StoreSuspect[];
};
