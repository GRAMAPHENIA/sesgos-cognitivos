"use client"

import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import { toast } from "@/components/ui/use-toast"
import type { BiasType, GameState, GameActions, Hypothesis, Evidence, Level, Score, Decision } from "@/types/game"

// Estado inicial para cada puntuación
const initialScore: Score = {
  correctDecisions: 0,
  biasesAvoided: 0,
  criticalThinking: 0,
  total: 0,
}

// Estado inicial del juego
const initialState: GameState = {
  currentBias: "confirmacion",
  currentLevel: null,
  activeHypotheses: [],
  discoveredEvidences: [],
  madeDecisions: [],
  biasProgress: 0,
  newEvidencesCount: 0, // Contador de nuevas evidencias
  scores: {
    confirmacion: { ...initialScore },
    anclaje: { ...initialScore },
    aversion: { ...initialScore },
    halo: { ...initialScore },
  },
  completedLevels: [],
}

// Crear el store con Zustand
export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  // Establecer el sesgo actual
  setCurrentBias: (bias: BiasType) => {
    set({ currentBias: bias })
  },

  // Cargar un nivel
  loadLevel: (level: Level) => {
    set({
      currentLevel: level,
      activeHypotheses: level.initialHypotheses,
      discoveredEvidences: [],
      madeDecisions: [],
      biasProgress: 0,
      newEvidencesCount: 0, // Reiniciar contador al cargar un nuevo nivel
    })
  },

  // Añadir una nueva hipótesis
  addHypothesis: (content: string) => {
    const newHypothesis: Hypothesis = {
      id: uuidv4(),
      content,
      createdAt: new Date(),
      strength: 50, // Fuerza inicial media
    }

    set((state) => ({
      activeHypotheses: [...state.activeHypotheses, newHypothesis],
    }))

    // Actualizar las evidencias filtradas basadas en la nueva hipótesis
    get().updateFilteredEvidences()
  },

  // Editar una hipótesis existente
  editHypothesis: (id: string, content: string) => {
    set((state) => ({
      activeHypotheses: state.activeHypotheses.map((h) => (h.id === id ? { ...h, content, strength: 50 } : h)),
    }))

    // Actualizar las evidencias filtradas después de editar
    get().updateFilteredEvidences()
  },

  // Eliminar una hipótesis
  removeHypothesis: (id: string) => {
    set((state) => ({
      activeHypotheses: state.activeHypotheses.filter((h) => h.id !== id),
    }))

    // Actualizar las evidencias filtradas después de eliminar
    get().updateFilteredEvidences()
  },

  // Descubrir una evidencia
  discoverEvidence: (id: string) => {
    const { currentLevel, discoveredEvidences } = get()

    if (!currentLevel) return

    const evidence = currentLevel.evidences.find((e) => e.id === id)
    if (!evidence || discoveredEvidences.some((e) => e.id === id)) return

    const newEvidence: Evidence = {
      ...evidence,
      discoveredAt: new Date(),
      isFiltered: get().shouldFilterEvidence(evidence),
    }

    set((state) => ({
      discoveredEvidences: [...state.discoveredEvidences, newEvidence],
      newEvidencesCount: state.newEvidencesCount + 1, // Incrementar contador
    }))

    // Actualizar el progreso del sesgo
    get().calculateBiasProgress()
  },
  
  // Reiniciar el contador de notificaciones de evidencias
  resetNewEvidencesCount: () => {
    set({ newEvidencesCount: 0 })
  },

  // Tomar una decisión
  makeDecision: (decisionId: string, optionId: string) => {
    const { currentLevel, madeDecisions } = get()
    if (!currentLevel) return

    const decision = currentLevel.decisions.find((d) => d.id === decisionId)
    if (!decision) return

    const option = decision.options.find((o) => o.id === optionId)
    if (!option) return

    // Registrar la decisión tomada
    const newDecision: Decision = {
      ...decision,
      madeAt: new Date(),
      selectedOptionId: optionId,
    }

    // Aplicar consecuencias de la decisión
    set((state) => ({
      madeDecisions: [...state.madeDecisions, newDecision],
    }))

    // Contar cuántas evidencias se van a desbloquear
    const newEvidences = option.unlocksEvidenceIds?.filter(
      (evidenceId) => !get().discoveredEvidences.some((e) => e.id === evidenceId)
    ) || []

    // Descubrir evidencias desbloqueadas por esta opción
    option.unlocksEvidenceIds?.forEach((evidenceId) => {
      get().discoverEvidence(evidenceId)
    })

    // Mostrar notificación si se desbloquearon evidencias
    if (newEvidences.length > 0) {
      const evidence = currentLevel.evidences.find(e => e.id === newEvidences[0])
      if (evidence) {
        toast({
          title: `¡Nueva${newEvidences.length > 1 ? 's' : ''} evidencia${newEvidences.length > 1 ? 's' : ''} desbloqueada${newEvidences.length > 1 ? 's' : ''}!`,
          description: newEvidences.length > 1 
            ? `Has desbloqueado ${newEvidences.length} nuevas evidencias` 
            : evidence.title,
          variant: "default",
          duration: 5000,
        })
      }
    }

    // Actualizar el progreso del sesgo
    get().calculateBiasProgress()
  },

  // Actualizar el progreso del sesgo
  updateBiasProgress: (value: number) => {
    // Asegurar que el valor esté entre 0 y 100
    const clampedValue = Math.max(0, Math.min(100, value))
    set({ biasProgress: clampedValue })
  },

  // Completar el nivel actual
  completeLevel: () => {
    const { currentBias, completedLevels } = get()

    if (!completedLevels.includes(currentBias)) {
      set((state) => ({
        completedLevels: [...state.completedLevels, currentBias],
      }))
    }

    // Determinar el siguiente nivel
    const biasOrder: BiasType[] = ["confirmacion", "anclaje", "aversion", "halo"]
    const currentIndex = biasOrder.indexOf(currentBias)

    if (currentIndex < biasOrder.length - 1) {
      // Avanzar al siguiente nivel
      get().setCurrentBias(biasOrder[currentIndex + 1])
    }
  },

  // Reiniciar el juego
  resetGame: () => {
    set({
      ...initialState,
      newEvidencesCount: 0, // Asegurarse de que el contador se reinicie
    })
  },

  // Métodos auxiliares (no expuestos directamente en la interfaz)

  // Determinar si una evidencia debe ser filtrada basada en las hipótesis activas
  shouldFilterEvidence: (evidence: Evidence) => {
    const { activeHypotheses, currentBias } = get()

    // Solo aplicar filtrado en el nivel de sesgo de confirmación
    if (currentBias !== "confirmacion") return false

    // Si no hay hipótesis activas, no filtrar
    if (activeHypotheses.length === 0) return false

    // Verificar si la evidencia contradice alguna hipótesis fuerte
    const contradictsStrongHypothesis = activeHypotheses.some(
      (h) => evidence.contradictingHypothesisIds.includes(h.id) && h.strength > 70,
    )

    return contradictsStrongHypothesis
  },

  // Actualizar el estado de filtrado de las evidencias descubiertas
  updateFilteredEvidences: () => {
    set((state) => ({
      discoveredEvidences: state.discoveredEvidences.map((evidence) => ({
        ...evidence,
        isFiltered: get().shouldFilterEvidence(evidence),
      })),
    }))
  },

  // Calcular el progreso del sesgo basado en las decisiones y evidencias
  calculateBiasProgress: () => {
    const { madeDecisions, discoveredEvidences, currentBias } = get()

    // Diferentes cálculos según el tipo de sesgo
    switch (currentBias) {
      case "confirmacion": {
        // Basado en cuántas evidencias contradictorias ha descubierto
        const totalContradictoryEvidences = discoveredEvidences.filter(
          (e) => !e.isFiltered && e.contradictingHypothesisIds.length > 0,
        ).length
        const progress = Math.min(100, totalContradictoryEvidences * 20)
        get().updateBiasProgress(progress)
        break
      }

      case "anclaje": {
        // Basado en cuántas decisiones se alejan del ancla inicial
        const decisionsAgainstAnchor = madeDecisions.filter((d) => {
          const option = d.options.find((o) => o.id === d.selectedOptionId)
          return option && option.biasInfluence < 0
        }).length

        const progress = Math.min(100, decisionsAgainstAnchor * 25)
        get().updateBiasProgress(progress)
        break
      }

      case "aversion": {
        // Basado en decisiones que aceptan riesgos calculados
        const riskTakingDecisions = madeDecisions.filter((d) => {
          const option = d.options.find((o) => o.id === d.selectedOptionId)
          return option && option.biasInfluence < 0
        }).length

        const progress = Math.min(100, riskTakingDecisions * 25)
        get().updateBiasProgress(progress)
        break
      }

      case "halo": {
        // Basado en decisiones que cuestionan a personajes simpáticos
        const questioningDecisions = madeDecisions.filter((d) => {
          const option = d.options.find((o) => o.id === d.selectedOptionId)
          return option && option.biasInfluence < 0
        }).length

        const progress = Math.min(100, questioningDecisions * 25)
        get().updateBiasProgress(progress)
        break
      }
    }
  },
}))
