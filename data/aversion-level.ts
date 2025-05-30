import { v4 as uuidv4 } from "uuid"
import type { Level } from "@/types/game"

export const aversionLevel: Level = {
  id: "aversion",
  title: "El Dilema de la Inversión",
  description:
    "Toma decisiones de inversión y descubre cómo la aversión a la pérdida afecta tus elecciones financieras.",
  introduction:
    "Como asesor financiero, debes ayudar a un cliente a tomar decisiones sobre su cartera de inversiones en un mercado volátil. Tus recomendaciones determinarán si tu cliente gana o pierde dinero, pero recuerda: psicológicamente, las pérdidas pesan más que las ganancias equivalentes.",
  conclusion:
    "Este caso demuestra cómo la aversión a la pérdida puede llevarnos a tomar decisiones subóptimas. A menudo preferimos evitar pérdidas a obtener ganancias equivalentes, lo que puede resultar en oportunidades perdidas y menor rendimiento a largo plazo.",

  suspects: [
    {
      id: uuidv4(),
      name: "Inversión en Tecnología",
      description: "Acciones de una empresa tecnológica innovadora pero volátil.",
      imageUrl: undefined,
      background:
        "La empresa ha mostrado un crecimiento explosivo pero también grandes fluctuaciones. Tiene potencial de alto rendimiento pero también de pérdidas significativas.",
      relationships: [
        {
          suspectId: "2", // ID de Bonos Gubernamentales
          relationshipType: "Correlación negativa",
          description:
            "Tiende a moverse en dirección opuesta a los bonos gubernamentales durante períodos de incertidumbre.",
        },
      ],
      likeabilityFactor: 60,
      initialSuspicionLevel: 50,
      evidenceIds: ["1", "4", "7"],
    },
    {
      id: "2", // ID fijo para referencias
      name: "Bonos Gubernamentales",
      description: "Inversión de bajo riesgo y bajo rendimiento con respaldo gubernamental.",
      imageUrl: undefined,
      background:
        "Históricamente estables con rendimientos predecibles pero modestos. Considerados como un 'refugio seguro' durante la volatilidad del mercado.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Tecnología
          relationshipType: "Inversión conservadora",
          description: "Ofrece estabilidad pero limita el potencial de crecimiento significativo.",
        },
      ],
      likeabilityFactor: 70,
      initialSuspicionLevel: 20,
      evidenceIds: ["2", "5", "8"],
    },
    {
      id: "3", // ID fijo para referencias
      name: "Fondo de Mercados Emergentes",
      description: "Inversión en economías en desarrollo con alto potencial de crecimiento y alto riesgo.",
      imageUrl: undefined,
      background:
        "Exposición a mercados con rápido crecimiento pero inestabilidad política y económica. Historial de rendimientos volátiles pero potencialmente muy altos.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Tecnología
          relationshipType: "Correlación positiva",
          description:
            "Tiende a seguir tendencias similares a las acciones tecnológicas en períodos de optimismo del mercado.",
        },
        {
          suspectId: "2", // ID de Bonos
          relationshipType: "Alternativa de alto riesgo",
          description: "Representa el extremo opuesto del espectro de riesgo comparado con los bonos.",
        },
      ],
      likeabilityFactor: 50,
      initialSuspicionLevel: 70,
      evidenceIds: ["3", "6", "9"],
    },
  ],

  evidences: [
    {
      id: "1",
      title: "Historial de rendimiento tecnológico",
      description:
        "La inversión en tecnología ha tenido un rendimiento promedio del 15% anual durante los últimos 5 años, pero con caídas de hasta 30% en algunos trimestres.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Tecnología", "Historial"],
    },
    {
      id: "2",
      title: "Rendimiento de bonos",
      description:
        "Los bonos gubernamentales han rendido un constante 3% anual durante la última década, sin pérdidas nominales.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Bonos", "Estabilidad"],
    },
    {
      id: "3",
      title: "Volatilidad de mercados emergentes",
      description:
        "El fondo de mercados emergentes ha tenido rendimientos que oscilan entre -25% y +40% en los últimos años.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Emergentes", "Volatilidad"],
    },
    {
      id: "4",
      title: "Análisis de innovación",
      description:
        "La empresa tecnológica está a punto de lanzar un producto revolucionario que podría duplicar sus ingresos.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Tecnología", "Oportunidad"],
    },
    {
      id: "5",
      title: "Proyección de tasas de interés",
      description: "Se espera que las tasas de interés suban, lo que podría reducir el valor de los bonos existentes.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Bonos", "Riesgo"],
    },
    {
      id: "6",
      title: "Reformas económicas",
      description:
        "Varios países emergentes están implementando reformas que podrían estabilizar sus economías y atraer inversión extranjera.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Emergentes", "Oportunidad"],
    },
    {
      id: "7",
      title: "Competencia tecnológica",
      description:
        "Un competidor importante está ganando cuota de mercado, lo que podría afectar negativamente a la empresa tecnológica.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Tecnología", "Riesgo"],
    },
    {
      id: "8",
      title: "Análisis a largo plazo",
      description:
        "Históricamente, los bonos han tenido rendimientos reales negativos después de ajustar por inflación en períodos de 20+ años.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Bonos", "Largo plazo"],
    },
    {
      id: "9",
      title: "Crecimiento demográfico",
      description:
        "Las economías emergentes tienen poblaciones jóvenes en crecimiento, lo que podría impulsar el consumo y el crecimiento económico durante décadas.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Emergentes", "Largo plazo"],
    },
  ],

  decisions: [
    {
      id: uuidv4(),
      description: "Tu cliente acaba de sufrir una pérdida del 10% en su cartera. ¿Qué le recomiendas?",
      options: [
        {
          id: uuidv4(),
          text: "Vender las inversiones con pérdidas y mover todo a bonos seguros",
          consequenceDescription: "Evitas más pérdidas pero también limitas la posibilidad de recuperación.",
          biasInfluence: 30, // Aumenta mucho el sesgo (aversión a la pérdida)
          scoreImpact: -10,
          unlocksEvidenceIds: ["2", "5"],
        },
        {
          id: uuidv4(),
          text: "Mantener la estrategia actual y esperar a que el mercado se recupere",
          consequenceDescription: "No reaccionas emocionalmente a la pérdida temporal.",
          biasInfluence: -15, // Reduce el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["4", "7"],
        },
        {
          id: uuidv4(),
          text: "Aprovechar la caída para comprar más acciones a precio reducido",
          consequenceDescription:
            "Ves la pérdida como una oportunidad, superando completamente la aversión a la pérdida.",
          biasInfluence: -30, // Reduce significativamente el sesgo
          scoreImpact: 20,
          unlocksEvidenceIds: ["4", "6", "9"],
        },
      ],
    },
    {
      id: uuidv4(),
      description:
        "Se presenta una oportunidad de inversión con 60% de probabilidad de ganar $5,000 y 40% de perder $3,000. ¿Qué recomiendas?",
      options: [
        {
          id: uuidv4(),
          text: "Rechazar la oportunidad para evitar cualquier posibilidad de pérdida",
          consequenceDescription:
            "Priorizas evitar pérdidas sobre obtener ganancias, aunque matemáticamente la inversión tiene valor esperado positivo.",
          biasInfluence: 25, // Aumenta el sesgo
          scoreImpact: -5,
          unlocksEvidenceIds: ["2"],
        },
        {
          id: uuidv4(),
          text: "Aceptar la oportunidad basándote en el valor esperado positivo",
          consequenceDescription:
            "Tomas una decisión racional basada en probabilidades, superando la aversión a la pérdida.",
          biasInfluence: -25, // Reduce significativamente el sesgo
          scoreImpact: 15,
          unlocksEvidenceIds: ["3", "6"],
        },
        {
          id: uuidv4(),
          text: "Invertir una cantidad menor para limitar la exposición al riesgo",
          consequenceDescription: "Encuentras un equilibrio entre la oportunidad y el riesgo.",
          biasInfluence: -10, // Reduce ligeramente el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["3"],
        },
      ],
    },
    {
      id: uuidv4(),
      description:
        "Tu cliente necesita planificar para su jubilación en 30 años. ¿Qué estrategia de inversión recomiendas?",
      options: [
        {
          id: uuidv4(),
          text: "Principalmente bonos y otras inversiones de bajo riesgo",
          consequenceDescription:
            "Priorizas la seguridad sobre el crecimiento, lo que podría resultar en rendimientos insuficientes a largo plazo.",
          biasInfluence: 20, // Aumenta el sesgo
          scoreImpact: -10,
          unlocksEvidenceIds: ["8"],
        },
        {
          id: uuidv4(),
          text: "Una cartera equilibrada con exposición moderada a acciones",
          consequenceDescription: "Buscas un equilibrio entre seguridad y crecimiento.",
          biasInfluence: 0, // Neutral
          scoreImpact: 5,
          unlocksEvidenceIds: ["4", "8"],
        },
        {
          id: uuidv4(),
          text: "Alta exposición a acciones y mercados emergentes, reduciendo gradualmente el riesgo con el tiempo",
          consequenceDescription:
            "Aprovechas el largo horizonte temporal para maximizar el crecimiento, aceptando la volatilidad a corto plazo.",
          biasInfluence: -30, // Reduce significativamente el sesgo
          scoreImpact: 20,
          unlocksEvidenceIds: ["4", "6", "9"],
        },
      ],
    },
  ],

  initialHypotheses: [
    {
      id: uuidv4(),
      content: "Es mejor evitar inversiones con cualquier riesgo de pérdida significativa",
      createdAt: new Date(),
      strength: 75,
    },
  ],
}
