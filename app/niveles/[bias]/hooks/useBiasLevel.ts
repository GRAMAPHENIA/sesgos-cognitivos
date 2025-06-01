// app/niveles/[bias]/hooks/useBiasLevel.ts

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { 
  BiasType, 
  LevelData, 
  Decision,
  DecisionOption,
  MadeDecision
} from "../types/bias-level.types";
import { 
  toStoreLevel, 
  fromStoreLevel, 
  fromStoreDecision,
  toStoreDecision,
  toStoreMadeDecision
} from "../utils/type-converters";

// Importar datos de los niveles
import { confirmacionLevel } from "@/data/confirmacion-level";
import { anclajeLevel } from "@/data/anclaje-level";
import { aversionLevel } from "@/data/aversion-level";
import { haloLevel } from "@/data/halo-level";

// Función para convertir los datos de nivel al formato esperado
const prepareLevelData = (level: any): LevelData => ({
  ...level,
  maxScore: 1000,
  decisions: level.decisions.map((d: any) => ({
    ...d,
    options: d.options.map((o: any) => ({
      ...o,
      effect: o.biasInfluence || 0,
      scoreImpact: o.scoreImpact || 0,
      text: o.consequenceDescription || '',
      evidenceId: o.unlocksEvidenceIds?.[0]
    }))
  }))
});

// Mapa de niveles convertidos
const levelDataMap: Record<BiasType, LevelData> = {
  confirmacion: prepareLevelData(confirmacionLevel),
  anclaje: prepareLevelData(anclajeLevel),
  aversion: prepareLevelData(aversionLevel),
  halo: prepareLevelData(haloLevel)
} as const;

interface UseBiasLevelReturn {
  currentBias: BiasType;
  currentLevel: LevelData | null;
  biasProgress: number;
  madeDecisions: MadeDecision[];
  completedLevels: BiasType[];
  showConclusion: boolean;
  pendingDecisions: Decision[]; // Decisiones pendientes (no tomadas)
  isLevelComplete: boolean;
  validBiases: BiasType[];
  newEvidencesCount: number;
  resetNewEvidencesCount: () => void;
  handleOptionSelect: (decision: Decision, option: DecisionOption) => void;
  handleCompleteLevel: () => void;
  handleNextLevel: () => void;
}

export function useBiasLevel(): UseBiasLevelReturn {
  const params = useParams();
  const router = useRouter();
  const {
    setCurrentBias,
    loadLevel,
    currentBias,
    currentLevel,
    biasProgress,
    madeDecisions,
    makeDecision: makeDecisionInStore,
    completeLevel: completeLevelInStore,
    completedLevels,
    newEvidencesCount,
    resetNewEvidencesCount
  } = useGameStore();

  const [showConclusion, setShowConclusion] = useState(false);
  const biasParam = params.bias as string;
  const validBiases: BiasType[] = ["confirmacion", "anclaje", "aversion", "halo"];
  const isValidBias = validBiases.includes(biasParam as BiasType);
  // Usamos 'confirmacion' como valor por defecto para evitar problemas de tipo
  const currentBiasType: BiasType = isValidBias ? (biasParam as BiasType) : 'confirmacion';

  // Redirigir si el sesgo no es válido
  useEffect(() => {
    if (!isValidBias) {
      router.push("/niveles/confirmacion");
    }
  }, [isValidBias, router]);

  // Cargar el nivel correspondiente al sesgo
  useEffect(() => {
    if (currentBiasType) {
      setCurrentBias(currentBiasType);
      // Cargar el nivel con los datos ya convertidos
      loadLevel(toStoreLevel(levelDataMap[currentBiasType]));
    }
  }, [currentBiasType, loadLevel, setCurrentBias]);

  // Obtener decisiones pendientes (no tomadas aún)
  const pendingDecisions = useMemo<Decision[]>(() => {
    if (!currentLevel) return [];
    
    return currentLevel.decisions
      .filter(decision => !madeDecisions.some(madeDecision => madeDecision.id === decision.id))
      .map(decision => fromStoreDecision(decision));
  }, [currentLevel, madeDecisions]);
  
  // Convertir madeDecisions al formato esperado
  const formattedMadeDecisions = useMemo<MadeDecision[]>(() => {
    return madeDecisions
      .filter(decision => decision.selectedOptionId) // Solo decisiones con opción seleccionada
      .map(decision => ({
        decisionId: decision.id,
        optionId: decision.selectedOptionId as string
      }));
  }, [madeDecisions]);

  const isLevelComplete = biasProgress >= 100;

  const handleOptionSelect = useCallback((decision: Decision, option: DecisionOption) => {
    makeDecisionInStore(decision.id, option.id);
  }, [makeDecisionInStore]);

  const handleCompleteLevel = useCallback(() => {
    if (currentBiasType) {
      completeLevelInStore();
      setShowConclusion(true);
    }
  }, [completeLevelInStore, currentBiasType]);

  const handleNextLevel = useCallback(() => {
    if (!currentBiasType) return;
    
    const currentIndex = validBiases.indexOf(currentBiasType);
    if (currentIndex < validBiases.length - 1) {
      router.push(`/niveles/${validBiases[currentIndex + 1]}`);
    } else {
      router.push("/");
    }
  }, [currentBiasType, router, validBiases]);

  // Convertir el currentLevel a LevelData para la UI
  const currentLevelData = useMemo(() => {
    if (!currentLevel) return null;
    return fromStoreLevel(currentLevel);
  }, [currentLevel]);

  // Aseguramos que currentBias nunca sea null
  const safeCurrentBias = currentBiasType || 'confirmacion';
  
  return {
    currentBias: safeCurrentBias,
    currentLevel: currentLevelData,
    biasProgress,
    madeDecisions: formattedMadeDecisions, // Usar las decisiones formateadas
    completedLevels,
    showConclusion,
    pendingDecisions,
    isLevelComplete,
    validBiases,
    newEvidencesCount,
    resetNewEvidencesCount,
    handleOptionSelect,
    handleCompleteLevel,
    handleNextLevel,
  };
}
