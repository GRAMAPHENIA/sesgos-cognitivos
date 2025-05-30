import { v4 as uuidv4 } from "uuid"
import type { Level } from "@/types/game"

export const confirmacionLevel: Level = {
  id: "confirmacion",
  title: "El Caso del Robo en el Museo",
  description:
    "Investiga el robo de una valiosa pintura y descubre cómo el sesgo de confirmación afecta tu investigación.",
  introduction:
    "Una valiosa pintura ha sido robada del Museo Nacional de Arte. Como detective principal, debes investigar a los sospechosos y recopilar evidencias. Ten cuidado: tu tendencia a confirmar tus primeras sospechas puede llevarte por el camino equivocado.",
  conclusion:
    "Este caso demuestra cómo el sesgo de confirmación puede influir en nuestras investigaciones. Cuando formamos una hipótesis temprana, tendemos a buscar evidencia que la confirme y a ignorar la que la contradice.",

  suspects: [
    {
      id: uuidv4(),
      name: "Carlos Mendoza",
      description: "Guardia de seguridad del museo. Trabajaba la noche del robo.",
      imageUrl: undefined,
      background:
        "Ex-militar con 5 años en el museo. Tiene acceso a todas las áreas y conoce los sistemas de seguridad.",
      relationships: [
        {
          suspectId: "2", // ID de Elena Vega
          relationshipType: "Profesional",
          description:
            "Trabaja directamente bajo la supervisión de Elena. Han tenido algunos desacuerdos sobre los protocolos de seguridad.",
        },
      ],
      likeabilityFactor: 60,
      initialSuspicionLevel: 75, // Alto nivel inicial de sospecha
      evidenceIds: ["1", "3", "5"],
    },
    {
      id: "2", // ID fijo para referencias
      name: "Elena Vega",
      description: "Jefa de seguridad del museo. Responsable de los protocolos de seguridad.",
      imageUrl: undefined,
      background:
        "15 años de experiencia en seguridad de museos. Recientemente implementó un nuevo sistema de alarmas.",
      relationships: [
        {
          suspectId: uuidv4(), // ID de Carlos
          relationshipType: "Supervisora",
          description: "Supervisa a Carlos y otros guardias. Es estricta pero justa.",
        },
        {
          suspectId: "3", // ID de Miguel
          relationshipType: "Profesional",
          description: "Trabaja con Miguel en la catalogación de obras para seguridad.",
        },
      ],
      likeabilityFactor: 50,
      initialSuspicionLevel: 30,
      evidenceIds: ["2", "4", "7"],
    },
    {
      id: "3", // ID fijo para referencias
      name: "Miguel Arroyo",
      description: "Curador del museo. Experto en la pintura robada.",
      imageUrl: undefined,
      background: "Historiador de arte con doctorado en Arte Renacentista. Trabajando en el museo por 8 años.",
      relationships: [
        {
          suspectId: "2", // ID de Elena
          relationshipType: "Colega",
          description: "Colabora con Elena en temas de seguridad para exposiciones especiales.",
        },
      ],
      likeabilityFactor: 70,
      initialSuspicionLevel: 45,
      evidenceIds: ["6", "8", "9"],
    },
  ],

  evidences: [
    {
      id: "1",
      title: "Registro de entrada/salida",
      description: "Carlos Mendoza registró su salida 30 minutos después de lo habitual la noche del robo.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Horarios", "Personal"],
    },
    {
      id: "2",
      title: "Cámaras de seguridad",
      description:
        "Las cámaras muestran a una figura encapuchada, pero su rostro no es visible. La estatura coincide con varios empleados.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Video", "Seguridad"],
    },
    {
      id: "3",
      title: "Deudas financieras",
      description: "Carlos tiene deudas significativas debido a gastos médicos recientes.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Finanzas", "Motivo"],
    },
    {
      id: "4",
      title: "Sistema de alarma desactivado",
      description: "El sistema fue desactivado usando el código de Elena, pero ella afirma no haberlo hecho.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Seguridad", "Acceso"],
    },
    {
      id: "5",
      title: "Testimonio de testigo",
      description:
        "Un visitante recuerda haber visto a Carlos cerca de la pintura poco antes del cierre, actuando nervioso.",
      imageUrl: undefined,
      isHidden: false,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Testimonio", "Comportamiento"],
    },
    {
      id: "6",
      title: "Conocimiento especializado",
      description:
        "El ladrón sabía exactamente cómo desmontar la pintura sin dañarla, algo que requiere conocimiento especializado.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Habilidades", "Método"],
    },
    {
      id: "7",
      title: "Coartada de Elena",
      description:
        "Elena estaba en una conferencia de seguridad en otra ciudad la noche del robo, confirmado por múltiples testigos.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: true, // Esta evidencia contradice la hipótesis de que Elena es culpable
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Coartada", "Verificado"],
    },
    {
      id: "8",
      title: "Llamada sospechosa",
      description: "Miguel recibió una llamada de un número desconocido justo después del robo.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Comunicación", "Sospechoso"],
    },
    {
      id: "9",
      title: "Contacto con coleccionista",
      description:
        "Miguel ha estado en contacto con un coleccionista privado conocido por adquirir arte de dudosa procedencia.",
      imageUrl: undefined,
      isHidden: true,
      isFiltered: false,
      relatedHypothesisIds: [],
      contradictingHypothesisIds: [],
      tags: ["Contactos", "Motivo"],
    },
  ],

  decisions: [
    {
      id: uuidv4(),
      description: "¿A quién interrogarás primero?",
      options: [
        {
          id: uuidv4(),
          text: "Carlos Mendoza, el guardia de seguridad",
          consequenceDescription:
            "Te centras en Carlos debido a las evidencias iniciales. Esto podría reforzar tu sesgo de confirmación.",
          biasInfluence: 20, // Aumenta el sesgo
          scoreImpact: 0,
          unlocksEvidenceIds: ["3", "5"],
        },
        {
          id: uuidv4(),
          text: "Elena Vega, la jefa de seguridad",
          consequenceDescription: "Decides interrogar a Elena para obtener una visión más amplia del caso.",
          biasInfluence: -10, // Reduce el sesgo
          scoreImpact: 5,
          unlocksEvidenceIds: ["4", "7"],
        },
        {
          id: uuidv4(),
          text: "Miguel Arroyo, el curador",
          consequenceDescription:
            "Interrogas a Miguel para entender mejor el valor y las características de la obra robada.",
          biasInfluence: -15, // Reduce el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["6", "8"],
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Has encontrado evidencia que contradice tu hipótesis inicial. ¿Qué harás?",
      options: [
        {
          id: uuidv4(),
          text: "Ignorarla y seguir con tu línea de investigación original",
          consequenceDescription: "Decides que esta evidencia no es relevante y continúas con tu hipótesis inicial.",
          biasInfluence: 30, // Aumenta mucho el sesgo
          scoreImpact: -10,
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Reconsiderar tu hipótesis a la luz de la nueva evidencia",
          consequenceDescription:
            "Ajustas tu teoría para incorporar la nueva información, mostrando flexibilidad mental.",
          biasInfluence: -30, // Reduce mucho el sesgo
          scoreImpact: 15,
          unlocksEvidenceIds: ["9"],
        },
        {
          id: uuidv4(),
          text: "Buscar más información antes de decidir",
          consequenceDescription: "Decides investigar más a fondo antes de sacar conclusiones precipitadas.",
          biasInfluence: -20, // Reduce el sesgo
          scoreImpact: 10,
          unlocksEvidenceIds: ["8", "9"],
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Es hora de presentar tus conclusiones. ¿A quién señalas como principal sospechoso?",
      options: [
        {
          id: uuidv4(),
          text: "Carlos Mendoza, el guardia de seguridad",
          consequenceDescription:
            "Concluyes que Carlos es el culpable basándote en las evidencias iniciales y su motivo financiero.",
          biasInfluence: 10, // Puede aumentar el sesgo si te quedaste con la primera impresión
          scoreImpact: 5, // Puntuación media porque es parcialmente correcto
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Elena Vega, la jefa de seguridad",
          consequenceDescription: "Acusas a Elena a pesar de su coartada verificada.",
          biasInfluence: 20, // Aumenta el sesgo por ignorar evidencia contradictoria
          scoreImpact: -15, // Puntuación negativa por conclusión incorrecta
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Miguel Arroyo, el curador",
          consequenceDescription:
            "Concluyes que Miguel es el culpable basándote en su conocimiento especializado y contactos sospechosos.",
          biasInfluence: -25, // Reduce el sesgo por considerar todas las evidencias
          scoreImpact: 20, // Puntuación alta por conclusión correcta
          unlocksEvidenceIds: [],
        },
        {
          id: uuidv4(),
          text: "Una colaboración entre Carlos y Miguel",
          consequenceDescription:
            "Propones que Carlos y Miguel trabajaron juntos: Carlos proporcionó acceso y Miguel el conocimiento especializado.",
          biasInfluence: -30, // Reduce mucho el sesgo por integrar múltiples líneas de evidencia
          scoreImpact: 25, // Puntuación muy alta por la conclusión más precisa
          unlocksEvidenceIds: [],
        },
      ],
    },
  ],

  initialHypotheses: [
    {
      id: uuidv4(),
      content: "Carlos Mendoza aprovechó su posición como guardia para robar la pintura",
      createdAt: new Date(),
      strength: 70,
    },
  ],
}
