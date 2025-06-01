// app/niveles/[bias]/utils/type-converters.ts

import {
  Decision as StoreDecision,
  DecisionOption as StoreDecisionOption,
  Level as StoreLevel,
  Suspect as StoreSuspect,
} from "@/types/game";

import {
  Decision,
  DecisionOption,
  LevelData,
  Suspect,
  StoreLevelData,
  MadeDecision
} from "../types/bias-level.types";

/**
 * Convierte una opción de decisión del store al formato local
 */
export function fromStoreDecisionOption(option: StoreDecisionOption): DecisionOption {
  return {
    id: option.id,
    text: option.consequenceDescription,
    effect: option.biasInfluence,
    scoreImpact: option.scoreImpact || 0,
    evidenceId: option.unlocksEvidenceIds?.[0],
  };
}

/**
 * Convierte una decisión del store al formato local
 */
export function fromStoreDecision(decision: StoreDecision): Decision {
  return {
    ...decision,
    options: decision.options.map(fromStoreDecisionOption),
  };
}

/**
 * Convierte un sospechoso del store al formato local
 */
export function fromStoreSuspect(suspect: StoreSuspect): Suspect {
  // Extraer solo los campos que necesitamos
  const { evidenceIds, ...rest } = suspect;
  return rest;
}

/**
 * Convierte un nivel del store al formato local
 */
export function fromStoreLevel(level: StoreLevel): LevelData {
  return {
    ...level,
    decisions: level.decisions.map(fromStoreDecision),
    suspects: level.suspects.map(fromStoreSuspect),
    maxScore: 1000, // Valor por defecto
  };
}

/**
 * Convierte una opción de decisión local al formato del store
 */
export function toStoreDecisionOption(option: DecisionOption): StoreDecisionOption {
  return {
    id: option.id,
    consequenceDescription: option.text,
    biasInfluence: option.effect,
    scoreImpact: option.scoreImpact || 0,
    unlocksEvidenceIds: option.evidenceId ? [option.evidenceId] : [],
    text: option.text, // Mantener compatibilidad con el tipo StoreDecisionOption
  };
}

/**
 * Convierte una decisión local al formato del store
 */
export function toStoreDecision(decision: Decision): StoreDecision {
  return {
    ...decision,
    options: decision.options.map(toStoreDecisionOption),
  };
}

/**
 * Convierte un sospechoso local al formato del store
 */
export function toStoreSuspect(suspect: Suspect): StoreSuspect {
  return {
    ...suspect,
    evidenceIds: [], // Se manejará por separado
  };
}

/**
 * Convierte un nivel local al formato del store
 */
export function toStoreLevel(levelData: LevelData): StoreLevel {
  return {
    ...levelData,
    decisions: levelData.decisions.map(toStoreDecision),
    suspects: levelData.suspects.map(toStoreSuspect),
  };
}

/**
 * Convierte una decisión tomada al formato del store
 */
export function toStoreMadeDecision(decision: MadeDecision) {
  return {
    decisionId: decision.decisionId,
    optionId: decision.optionId,
  };
}
