"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { BiasType } from "./types/bias-level.types";
import { useBiasLevel } from "./hooks/useBiasLevel";

// Componentes de diseño
import { BiasLevelPageLayout } from "./components/BiasLevelPageLayout";
import { BiasLevelMainContent } from "./components/BiasLevelMainContent";
import { BiasLevelLoading } from "./components/BiasLevelLoading";
import { LevelConclusion } from "./components/LevelConclusion";

// Componentes de modales
import { HypothesisTrackerModal } from "./components/modals/HypothesisTrackerModal";
import { EvidenceBoardModal } from "./components/modals/EvidenceBoardModal";
import { SuspectHistoryModal } from "./components/modals/SuspectHistoryModal";
import { CognitiveProgressModal } from "./components/modals/CognitiveProgressModal";
import { ScoreCardModal } from "./components/modals/ScoreCardModal";

export default function BiasLevelPage() {
  const router = useRouter();
  
  // Estados para controlar los modales
  const [isHypothesisModalOpen, setIsHypothesisModalOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isSuspectHistoryModalOpen, setIsSuspectHistoryModalOpen] = useState(false);
  const [isCognitiveProgressOpen, setIsCognitiveProgressOpen] = useState(false);
  const [isScoreCardOpen, setIsScoreCardOpen] = useState(false);
  
  // Obtener el estado y las acciones del hook personalizado
  const {
    currentBias,
    currentLevel,
    biasProgress,
    madeDecisions,
    completedLevels,
    showConclusion,
    pendingDecisions,
    isLevelComplete,
    validBiases,
    newEvidencesCount,
    handleOptionSelect,
    handleCompleteLevel,
    handleNextLevel,
    resetNewEvidencesCount,
  } = useBiasLevel();

  // Si no hay nivel cargado, mostrar pantalla de carga
  if (!currentLevel) {
    return <BiasLevelLoading />;
  }


  // Si se está mostrando la conclusión
  if (showConclusion) {
    return (
      <LevelConclusion
        currentBias={currentBias}
        title={currentLevel.title}
        conclusion={currentLevel.conclusion}
        isLastLevel={currentBias === "halo"}
        onNextLevel={handleNextLevel}
      />
    );
  }

  return (
    <>
      <BiasLevelPageLayout
        currentBias={currentBias}
        validBiases={validBiases}
        completedLevels={completedLevels}
        onOpenScoreCard={() => setIsScoreCardOpen(true)}
        onOpenCognitiveProgress={() => setIsCognitiveProgressOpen(true)}
        onOpenEvidenceBoard={() => {
          setIsEvidenceModalOpen(true);
          resetNewEvidencesCount();
        }}
        onOpenSuspectHistory={() => setIsSuspectHistoryModalOpen(true)}
        onOpenHypothesisTracker={() => setIsHypothesisModalOpen(true)}
        newEvidencesCount={newEvidencesCount}
        onResetNewEvidencesCount={resetNewEvidencesCount}
        onGoBack={() => router.push('/')}
      >
        <BiasLevelMainContent
          title={currentLevel.title}
          description={currentLevel.description}
          introduction={currentLevel.introduction}
          pendingDecisions={pendingDecisions}
          isLevelComplete={isLevelComplete}
          onOptionSelect={handleOptionSelect}
          onCompleteLevel={handleCompleteLevel}
        />
      </BiasLevelPageLayout>

      {/* Modales */}
      <HypothesisTrackerModal
        isOpen={isHypothesisModalOpen}
        onClose={() => setIsHypothesisModalOpen(false)}
      />
      
      <EvidenceBoardModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
      />

      <SuspectHistoryModal
        isOpen={isSuspectHistoryModalOpen}
        onClose={() => setIsSuspectHistoryModalOpen(false)}
      />

      <CognitiveProgressModal
        isOpen={isCognitiveProgressOpen}
        onClose={() => setIsCognitiveProgressOpen(false)}
      />

      <ScoreCardModal
        isOpen={isScoreCardOpen}
        onClose={() => setIsScoreCardOpen(false)}
      />
    </>
  );
}
