import { v4 as uuidv4 } from "uuid"
import type { Level } from "@/types/game"

export const anclajeLevel: Level = {
  id: "anclaje",
  title: "El Caso del Fraude Corporativo",
  description: "Investiga un posible fraude financiero y descubre cómo el sesgo de anclaje afecta tus decisiones.",
  introduction:
    "Una importante empresa tecnológica ha reportado discrepancias en sus estados financieros. Como auditor forense, debes investigar si ha habido fraude y quién es el responsable. La primera información que recibas puede 'anclar' tu percepción del caso.",
  conclusion:
    "Este caso ilustra cómo el sesgo de anclaje puede influir en nuestras decisiones. La primera cifra o dato que recibimos se convierte en un 'ancla' que afecta nuestros juicios posteriores, incluso cuando tenemos nueva información disponible.",

  suspects: [
    {
      id: uuidv4(),
      name: "Javier Soto",
      description: "Director Financiero (CFO) de la empresa. Responsable directo de los informes financieros.",
      imageUrl: undefined,
      background:
        "MBA de una prestigiosa universidad. 12 años en la empresa, ascendiendo desde analista financiero hasta CFO hace 3 años.",
      relationships: [
        {
          suspectId: "2", // ID de Laura
          relationshipType: "Jefe",
          description: "Es el superior directo de Laura. Mantienen una relación profesional tensa.",
        },
        {
          suspectId: "3", // ID de Ricardo
          relationshipType: "Colega ejecutivo",
          description: "Trabaja estrechamente con Ricardo en la planificación estratégica de la empresa.",
        },
      ],
      likeabilityFactor: 40,
      initialSuspicionLevel: 85, // Muy alto nivel inicial de sospecha (ancla)
      evidenceIds: ["1", "3", "5"],
    },
    {
      id: "2", // ID fijo para referencias
      name: "Laura Méndez",
      description: "Contadora principal. Maneja los detalles de los informes financieros diarios.",
      imageUrl: undefined,
      background: "Contadora certificada con 8 años en la empresa. Conocida por su meticulosidad y ética de trabajo.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Javier
          relationshipType: "Subordinada",
          description:
            "Trabaja bajo la dirección de Javier. Ha expresado preocupaciones sobre algunas prácticas contables.",
        },
      ],
      likeabilityFactor: 65,
      initialSuspicionLevel: 20, // Bajo nivel inicial de sospecha
      evidenceIds: ["2", "6", "8"],
    },
    {
      id: "3", // ID fijo para referencias
      name: "Ricardo Vega",
      description: "Director Ejecutivo (CEO). Fundador y rostro público de la empresa.",
      imageUrl: undefined,
      background: "Emprendedor exitoso que fundó la empresa hace 15 años. Ha liderado su crecimiento exponencial.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Javier
          relationshipType: "Superior",
          description: "Supervisa a Javier y establece los objetivos financieros de la empresa.",
        },
        {
          suspectId: "2", // ID de Laura
          relationshipType: "Superior indirecto",
          description: "Rara vez interactúa directamente con Laura, pero aprueba los informes finales.",
        },
      ],
      likeabilityFactor: 75,
      initialSuspicionLevel: 30,
      evidenceIds: ["4", "7", "9"],
    },
  ],

  evidences: [
    {
      id: "1",
      title: "Informe inicial",
      description:
        "El informe preliminar señala a Javier Soto como principal sospechoso, con una estimación de fraude de $10 millones.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Informe", "Inicial"],
    },
    {
      id: "2",
      title: "Correos electrónicos",
      description:
        "Correos entre Laura y Javier muestran que ella cuestionó algunas transacciones, pero él insistió en procesarlas.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Comunicación", "Evidencia"],
    },
    {
      id: "3",
      title: "Transacciones sospechosas",
      description: "Varias transacciones aprobadas por Javier no tienen documentación de respaldo adecuada.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Finanzas", "Irregularidades"],
    },
    {
      id: "4",
      title: "Presión por resultados",
      description:
        "Memorandos de Ricardo a todo el equipo ejecutivo exigiendo 'resultados excepcionales' para atraer inversores.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Presión", "Motivo"],
    },
    {
      id: "5",
      title: "Estilo de vida de Javier",
      description:
        "Javier ha comprado recientemente una casa lujosa y un auto deportivo, aparentemente por encima de sus posibilidades.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Estilo de vida", "Sospechoso"],
    },
    {
      id: "6",
      title: "Análisis forense detallado",
      description:
        "Un análisis más profundo revela que el fraude es de $3 millones, no $10 millones como se estimó inicialmente.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Análisis", "Corrección"],
    },
    {
      id: "7",
      title: "Reuniones privadas",
      description:
        "Ricardo y Javier tuvieron varias reuniones privadas antes de los períodos de informes financieros cuestionados.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Reuniones", "Sospechoso"],
    },
    {
      id: "8",
      title: "Denuncias previas",
      description:
        "Laura había presentado denuncias internas sobre prácticas contables cuestionables que fueron ignoradas.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Denuncias", "Historial"],
    },
    {
      id: "9",
      title: "Beneficio de acciones",
      description:
        "Ricardo vendió una cantidad significativa de sus acciones justo antes de que se descubrieran las discrepancias.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Acciones", "Beneficio"],
    },
  ],

  decisions: [
    {
      id: uuidv4(),
      description: "Basándote en el informe inicial, ¿cuál es tu estimación del fraude?",
      options: [
        {
          id: uuidv4(),
          text: "$10 millones, como indica el informe",
          consequenceDescription: "Te anclas en la cifra inicial sin cuestionarla.",
          biasInfluence: 25, // Aumenta el sesgo de anclaje
          scoreImpact: -5,
          unlocksEvidenceIds: ["3"],
        },
        {
          id: uuidv4(),
          text: "Entre $5-8 millones, probablemente menor a lo reportado",
          consequenceDescription: "Ajustas ligeramente la estimación inicial, pero sigues influenciado por el ancla.",
          biasInfluence: 10, // Aumenta ligeramente el sesgo
          scoreImpact: 0,
          unlocksEvidenceIds: ["3", "6"],
        },
        {
          id: uuidv4(),
          text: "Necesito más información antes de hacer una estimación",
          consequenceDescription: "Evitas anclarte en la cifra inicial y buscas más datos.",
          biasInfluence: -20, // Reduce el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["3", "6", "8"],
        },
      ],
    },
    {
      id: uuidv4(),
      description: "¿Qué línea de investigación priorizarás?",
      options: [
        {
          id: uuidv4(),
          text: "Investigar a fondo a Javier Soto",
          consequenceDescription: "Te centras exclusivamente en el principal sospechoso del informe inicial.",
          biasInfluence: 20, // Aumenta el sesgo
          scoreImpact: 0,
          unlocksEvidenceIds: ["5"],
        },
        {
          id: uuidv4(),
          text: "Examinar la cadena de aprobaciones financieras",
          consequenceDescription:
            "Investigas el proceso completo, lo que te permite ver más allá del sospechoso inicial.",
          biasInfluence: -15, // Reduce el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["4", "7"],
        },
        {
          id: uuidv4(),
          text: "Entrevistar a todos los involucrados en el departamento financiero",
          consequenceDescription: "Amplías tu investigación para incluir múltiples perspectivas.",
          biasInfluence: -25, // Reduce significativamente el sesgo
          scoreImpact: 15,
          unlocksEvidenceIds: ["4", "7", "9"],
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Has descubierto que el fraude es menor a lo estimado inicialmente. ¿Cómo procedes?",
      options: [
        {
          id: uuidv4(),
          text: "Mantener el enfoque en Javier como principal culpable",
          consequenceDescription: "A pesar de la nueva información, sigues anclado en tu sospechoso inicial.",
          biasInfluence: 30, // Aumenta mucho el sesgo
          scoreImpact: -10,
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Reconsiderar la magnitud del caso pero mantener los sospechosos",
          consequenceDescription: "Ajustas tu percepción del fraude pero no de los responsables.",
          biasInfluence: 10, // Aumenta ligeramente el sesgo
          scoreImpact: 5,
          unlocksEvidenceIds: ["9"],
        },
        {
          id: uuidv4(),
          text: "Reevaluar completamente el caso con la nueva información",
          consequenceDescription: "Te desanclas completamente y reconsideras todas las evidencias y sospechosos.",
          biasInfluence: -30, // Reduce significativamente el sesgo
          scoreImpact: 20,
          unlocksEvidenceIds: ["8", "9"],
        },
      ],
    },
  ],

  initialHypotheses: [
    {
      id: uuidv4(),
      content: "Javier Soto es el único responsable de un fraude de aproximadamente $10 millones",
      createdAt: new Date(),
      strength: 80,
    },
  ],
}
