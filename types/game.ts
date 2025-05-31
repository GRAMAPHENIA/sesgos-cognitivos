// Tipos para el juego de sesgos cognitivos

// Tipo para los sesgos cognitivos disponibles
export type BiasType = "confirmacion" | "anclaje" | "aversion" | "halo"

// Tipo para una hipótesis del jugador
export interface Hypothesis {
  id: string
  content: string
  createdAt: Date
  strength: number // 0-100, qué tan fuerte es la convicción
}

// Tipo para una evidencia o pista
export interface Evidence {
  id: string
  title: string
  description: string
  imageUrl?: string
  isHidden: boolean // Si está oculta inicialmente
  isFiltered: boolean // Si está filtrada por el sesgo actual
  relatedHypothesisIds: string[] // Hipótesis relacionadas con esta evidencia
  contradictingHypothesisIds: string[] // Hipótesis que contradice esta evidencia
  discoveredAt?: Date // Cuándo fue descubierta por el jugador
  tags: string[] // Etiquetas para categorizar la evidencia
}

// Tipo para un sospechoso
export interface Suspect {
  id: string
  name: string
  description: string
  imageUrl?: string
  background: string
  relationships: SuspectRelationship[]
  likeabilityFactor: number // 0-100, para el efecto halo
  initialSuspicionLevel: number // 0-100, para el sesgo de anclaje
  evidenceIds: string[] // Evidencias relacionadas con este sospechoso
}

// Tipo para una relación entre sospechosos
export interface SuspectRelationship {
  suspectId: string
  relationshipType: string
  description: string
}

// Tipo para una decisión que el jugador puede tomar
export interface Decision {
  id: string
  description: string
  options: DecisionOption[]
  madeAt?: Date
  selectedOptionId?: string
}

// Tipo para una opción de decisión
export interface DecisionOption {
  id: string
  text: string
  consequenceDescription: string
  biasInfluence: number // -100 a 100, negativo reduce el sesgo, positivo lo aumenta
  scoreImpact: number // Impacto en la puntuación
  unlocksEvidenceIds: string[] // Evidencias que desbloquea esta opción
}

// Tipo para la puntuación del jugador
export interface Score {
  correctDecisions: number
  biasesAvoided: number
  criticalThinking: number
  total: number
}

// Tipo para un nivel completo
export interface Level {
  id: BiasType
  title: string
  description: string
  introduction: string
  conclusion: string
  suspects: Suspect[]
  evidences: Evidence[]
  decisions: Decision[]
  initialHypotheses: Hypothesis[]
}

// Tipo para el estado del juego
export interface GameState {
  currentBias: BiasType
  currentLevel: Level | null
  activeHypotheses: Hypothesis[]
  discoveredEvidences: Evidence[]
  madeDecisions: Decision[]
  biasProgress: number // 0-100, 0 = completamente sesgado, 100 = sesgo superado
  newEvidencesCount: number // Contador de nuevas evidencias no vistas
  scores: Record<BiasType, Score>
  completedLevels: BiasType[]
}

// Tipo para las acciones del juego
export interface GameActions {
  setCurrentBias: (bias: BiasType) => void
  loadLevel: (level: Level) => void
  addHypothesis: (content: string) => void
  editHypothesis: (id: string, content: string) => void
  removeHypothesis: (id: string) => void
  discoverEvidence: (id: string) => void
  makeDecision: (decisionId: string, optionId: string) => void
  updateBiasProgress: (value: number) => void
  completeLevel: () => void
  resetGame: () => void
  // Métodos auxiliares
  shouldFilterEvidence: (evidence: Evidence) => boolean
  updateFilteredEvidences: () => void
  calculateBiasProgress: () => void
  resetNewEvidencesCount: () => void
}
