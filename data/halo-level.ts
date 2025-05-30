import { v4 as uuidv4 } from "uuid"
import type { Level } from "@/types/game"

export const haloLevel: Level = {
  id: "halo",
  title: "El Caso del Candidato Perfecto",
  description:
    "Evalúa candidatos para un puesto importante y descubre cómo el efecto halo influye en tus percepciones.",
  introduction:
    "Como director de recursos humanos, debes seleccionar al mejor candidato para un puesto ejecutivo clave. Tus impresiones iniciales sobre los candidatos pueden crear un 'efecto halo' que influya en cómo evalúas sus habilidades específicas.",
  conclusion:
    "Este caso ilustra cómo el efecto halo puede distorsionar nuestras evaluaciones. Cuando tenemos una impresión positiva general de alguien, tendemos a ver todas sus características específicas de manera más favorable, y viceversa.",

  suspects: [
    {
      id: uuidv4(),
      name: "Alejandro Vega",
      description: "Candidato carismático y seguro de sí mismo con una presencia impresionante.",
      imageUrl: undefined,
      background:
        "MBA de una universidad prestigiosa. Experiencia en dos empresas reconocidas. Excelentes habilidades de comunicación y presentación.",
      relationships: [
        {
          suspectId: "2", // ID de Sofía
          relationshipType: "Competidor",
          description: "Compite directamente con Sofía por el puesto ejecutivo.",
        },
        {
          suspectId: "3", // ID de Daniel
          relationshipType: "Competidor",
          description: "Compite directamente con Daniel por el puesto ejecutivo.",
        },
      ],
      likeabilityFactor: 90, // Muy alto factor de simpatía (para el efecto halo)
      initialSuspicionLevel: 20,
      evidenceIds: ["1", "4", "7"],
    },
    {
      id: "2", // ID fijo para referencias
      name: "Sofía Ramírez",
      description: "Candidata reservada pero con un historial sólido de resultados.",
      imageUrl: undefined,
      background:
        "Doctorado en Economía. Trayectoria de 12 años con logros consistentes pero poco publicitados. Prefiere el trabajo detallado a las presentaciones.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Alejandro
          relationshipType: "Competidora",
          description: "Compite directamente con Alejandro por el puesto ejecutivo.",
        },
        {
          suspectId: "3", // ID de Daniel
          relationshipType: "Competidora",
          description: "Compite directamente con Daniel por el puesto ejecutivo.",
        },
      ],
      likeabilityFactor: 50, // Factor de simpatía medio
      initialSuspicionLevel: 40,
      evidenceIds: ["2", "5", "8"],
    },
    {
      id: "3", // ID fijo para referencias
      name: "Daniel Torres",
      description: "Candidato con apariencia desaliñada y estilo de comunicación directo, a veces brusco.",
      imageUrl: undefined,
      background:
        "Formación técnica sin títulos de prestigio. Ha liderado equipos en startups exitosas y tiene experiencia práctica significativa.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Alejandro
          relationshipType: "Competidor",
          description: "Compite directamente con Alejandro por el puesto ejecutivo.",
        },
        {
          suspectId: "2", // ID de Sofía
          relationshipType: "Competidor",
          description: "Compite directamente con Sofía por el puesto ejecutivo.",
        },
      ],
      likeabilityFactor: 30, // Bajo factor de simpatía
      initialSuspicionLevel: 60,
      evidenceIds: ["3", "6", "9"],
    },
  ],

  evidences: [
    {
      id: "1",
      title: "Entrevista inicial con Alejandro",
      description:
        "Alejandro causó una excelente primera impresión. Vestimenta impecable, comunicación fluida y gran carisma.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Alejandro", "Entrevista"],
    },
    {
      id: "2",
      title: "Entrevista inicial con Sofía",
      description:
        "Sofía pareció nerviosa y habló en voz baja. Sus respuestas fueron técnicamente sólidas pero no cautivadoras.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Sofía", "Entrevista"],
    },
    {
      id: "3",
      title: "Entrevista inicial con Daniel",
      description:
        "Daniel llegó con ropa casual y fue directo al punto, a veces interrumpiendo. Mostró conocimiento práctico pero poca diplomacia.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Daniel", "Entrevista"],
    },
    {
      id: "4",
      title: "Resultados de Alejandro",
      description:
        "Los proyectos liderados por Alejandro tuvieron resultados mixtos. Dos éxitos notables pero también un fracaso costoso que no mencionó en su CV.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Alejandro", "Resultados"],
    },
    {
      id: "5",
      title: "Resultados de Sofía",
      description:
        "Sofía ha generado consistentemente un 15% de aumento en eficiencia en todos sus proyectos anteriores. Sus equipos reportan alta satisfacción.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Sofía", "Resultados"],
    },
    {
      id: "6",
      title: "Resultados de Daniel",
      description:
        "Daniel ha liderado tres proyectos de alto riesgo que superaron las expectativas. Sus métodos poco convencionales generaron innovación.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Daniel", "Resultados"],
    },
    {
      id: "7",
      title: "Evaluación técnica de Alejandro",
      description:
        "Alejandro obtuvo una puntuación de 65/100 en la evaluación técnica, por debajo del promedio para candidatos con su experiencia.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Alejandro", "Técnico"],
    },
    {
      id: "8",
      title: "Evaluación técnica de Sofía",
      description:
        "Sofía obtuvo 95/100 en la evaluación técnica, demostrando dominio excepcional de las habilidades requeridas.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Sofía", "Técnico"],
    },
    {
      id: "9",
      title: "Evaluación técnica de Daniel",
      description:
        "Daniel obtuvo 88/100 en la evaluación técnica, mostrando sólidas habilidades con enfoques innovadores para resolver problemas.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Daniel", "Técnico"],
    },
  ],

  decisions: [
    {
      id: uuidv4(),
      description: "Después de las entrevistas iniciales, ¿a quién consideras el candidato más prometedor?",
      options: [
        {
          id: uuidv4(),
          text: "Alejandro Vega, el candidato carismático",
          consequenceDescription: "Te dejas llevar por la fuerte primera impresión y el carisma de Alejandro.",
          biasInfluence: 25, // Aumenta el sesgo (efecto halo)
          scoreImpact: 0,
          unlocksEvidenceIds: ["4", "7"],
        },
        {
          id: uuidv4(),
          text: "Sofía Ramírez, la candidata reservada",
          consequenceDescription:
            "Miras más allá de la primera impresión y consideras el potencial de Sofía a pesar de su presentación menos impactante.",
          biasInfluence: -15, // Reduce el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["5", "8"],
        },
        {
          id: uuidv4(),
          text: "Daniel Torres, el candidato directo",
          consequenceDescription: "Superas la impresión inicial negativa para considerar las cualidades de Daniel.",
          biasInfluence: -20, // Reduce significativamente el sesgo
          scoreImpact: 15,
          unlocksEvidenceIds: ["6", "9"],
        },
        {
          id: uuidv4(),
          text: "Necesito más información sobre todos antes de formar una opinión",
          consequenceDescription: "Evitas completamente el efecto halo al reservar tu juicio hasta tener más datos.",
          biasInfluence: -30, // Reduce mucho el sesgo
          scoreImpact: 20,
          unlocksEvidenceIds: ["4", "5", "6"],
        },
      ],
    },
    {
      id: uuidv4(),
      description:
        "Has recibido evaluaciones técnicas que contradicen algunas de tus impresiones iniciales. ¿Cómo procedes?",
      options: [
        {
          id: uuidv4(),
          text: "Cuestionar la validez de las evaluaciones técnicas",
          consequenceDescription: "Intentas descartar información que contradice tus impresiones iniciales.",
          biasInfluence: 30, // Aumenta mucho el sesgo
          scoreImpact: -10,
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Reconsiderar tus impresiones a la luz de los nuevos datos",
          consequenceDescription:
            "Ajustas tus percepciones basándote en información objetiva, superando el efecto halo.",
          biasInfluence: -25, // Reduce significativamente el sesgo
          scoreImpact: 15,
          unlocksEvidenceIds: ["7", "8", "9"],
        },
        {
          id: uuidv4(),
          text: "Dar igual peso a las impresiones personales y las evaluaciones técnicas",
          consequenceDescription:
            "Buscas un equilibrio, pero aún permites que las impresiones personales influyan significativamente.",
          biasInfluence: 10, // Aumenta ligeramente el sesgo
          scoreImpact: 5,
          unlocksEvidenceIds: ["7", "8"],
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Es hora de tomar la decisión final. ¿A quién seleccionas para el puesto?",
      options: [
        {
          id: uuidv4(),
          text: "Alejandro Vega",
          consequenceDescription:
            "Seleccionas al candidato más carismático a pesar de sus resultados mixtos y menor competencia técnica.",
          biasInfluence: 25, // Aumenta el sesgo
          scoreImpact: -5,
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Sofía Ramírez",
          consequenceDescription:
            "Seleccionas a la candidata con los mejores resultados y habilidades técnicas, superando su menor carisma inicial.",
          biasInfluence: -30, // Reduce significativamente el sesgo
          scoreImpact: 20,
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Daniel Torres",
          consequenceDescription:
            "Seleccionas al candidato con buen equilibrio entre habilidades técnicas e innovación, a pesar de su primera impresión menos favorable.",
          biasInfluence: -25, // Reduce significativamente el sesgo
          scoreImpact: 15,
          unlocksEvidenceIds: [],
        },
      ],
    },
  ],

  initialHypotheses: [
    {
      id: uuidv4(),
      content: "Alejandro Vega es claramente el mejor candidato basado en su impresionante presencia y credenciales",
      createdAt: new Date(),
      strength: 85,
    },
  ],
}
