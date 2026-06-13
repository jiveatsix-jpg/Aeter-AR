/** Glossary entries for scientific/technical terms used in AR descriptions */
export interface GlossaryEntry {
  term: string       // Canonical term (lowercase for matching)
  aliases: string[]  // Alternative forms (plural, spanish variations, etc.)
  definition: string // Short, clear definition
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "nervio vago",
    aliases: ["vago", "vagal", "nervio vago", "nervio vago (x par craneal)", "estimulación vagal"],
    definition: "Décimo par craneal, principal componente del sistema nervioso parasimpático. Su activación reduce la frecuencia cardíaca, la presión arterial y la respuesta al estrés. Es el 'freno' natural del sistema nervioso.",
  },
  {
    term: "sistema parasimpático",
    aliases: ["parasimpático", "pns", "sistema nervioso parasimpático"],
    definition: "Rama del sistema nervioso autónomo responsable de 'descansar y digerir'. Reduce la frecuencia cardíaca, dilata los vasos sanguíneos y promueve la relajación. Es el contrapeso del sistema simpático.",
  },
  {
    term: "sistema simpático",
    aliases: ["simpático", "sns", "sistema nervioso simpático"],
    definition: "Rama del sistema nervioso autónomo responsable de la respuesta de 'lucha o huida'. Aumenta la frecuencia cardíaca, dilata las pupilas y libera adrenalina. Se activa en situaciones de estrés o peligro.",
  },
  {
    term: "sistema nervioso autónomo",
    aliases: ["autónomo", "sistema nervioso autónomo", "sna"],
    definition: "Parte del sistema nervioso que controla funciones involuntarias como la frecuencia cardíaca, la digestión y la respiración. Se divide en sistema simpático y parasimpático.",
  },
  {
    term: "hrv",
    aliases: ["variabilidad cardíaca", "variabilidad de la frecuencia cardíaca", "heart rate variability", "hrv (variabilidad cardíaca)"],
    definition: "Variabilidad en el intervalo de tiempo entre latidos del corazón. Una HRV alta indica un sistema nervioso flexible y saludable, capaz de adaptarse al estrés. Una HRV baja se asocia con estrés crónico, fatiga y mayor riesgo cardiovascular.",
  },
  {
    term: "cortisol",
    aliases: ["cortisol", "hormona del estrés"],
    definition: "Hormona principal del estrés, producida por las glándulas suprarrenales. Niveles crónicamente elevados se asocian con ansiedad, inflamación, aumento de peso y deterioro cognitivo. La respiración lenta puede reducir sus niveles.",
  },
  {
    term: "alvéolos",
    aliases: ["alvéolo", "alveolos", "alveolo", "alvéolos pulmonares"],
    definition: "Pequeños sacos de aire en los pulmones donde ocurre el intercambio de oxígeno y dióxido de carbono con la sangre. La respiración profunda los mantiene expandidos y funcionales.",
  },
  {
    term: "co₂",
    aliases: ["dióxido de carbono", "co2", "anhídrido carbónico"],
    definition: "Gas residual producido por el metabolismo celular y eliminado por la respiración. Niveles adecuados de CO₂ son necesarios para regular el pH sanguíneo y activar los quimiorreceptores que controlan la respiración.",
  },
  {
    term: "efecto bohr",
    aliases: ["bohr", "efecto bohr", "bohr effect"],
    definition: "Mecanismo fisiológico descubierto por Christian Bohr (1904) por el cual la hemoglobina libera más oxígeno en tejidos con alta concentración de CO₂. La respiración controlada puede optimizar este proceso.",
  },
  {
    term: "barorreceptores",
    aliases: ["barorreceptor", "baro-receptores"],
    definition: "Sensores de presión en las paredes de las arterias y el corazón. Detectan cambios en la presión arterial y envían señales al cerebro para ajustar la frecuencia cardíaca. La respiración lenta los estimula, promoviendo la calma.",
  },
  {
    term: "quimiorreceptores",
    aliases: ["quimiorreceptor", "quimio-receptores", "quimiorreceptores centrales"],
    definition: "Sensores que detectan cambios en los niveles de CO₂, oxígeno y pH en la sangre y el cerebro. Envían señales al centro respiratorio para ajustar la frecuencia y profundidad de la respiración.",
  },
  {
    term: "hipocapnia",
    aliases: ["hipocapnia"],
    definition: "Nivel anormalmente bajo de dióxido de carbono en la sangre, causado por hiperventilación. Puede provocar mareo, hormigueo en extremidades y, en casos extremos, síncope o tetania.",
  },
  {
    term: "alcalosis",
    aliases: ["alcalosis respiratoria"],
    definition: "Elevación del pH sanguíneo por encima de lo normal (sangre demasiado alcalina). Ocurre cuando se elimina demasiado CO₂ por hiperventilación. Puede causar mareo, confusión y espasmos musculares.",
  },
  {
    term: "hipoxia",
    aliases: ["hipoxia"],
    definition: "Nivel anormalmente bajo de oxígeno en los tejidos del cuerpo. En la respiración controlada, la hipoxia leve e intencional puede estimular adaptaciones fisiológicas, pero la hipoxia severa es peligrosa.",
  },
  {
    term: "síncope",
    aliases: ["síncope", "desmayo", "lipotimia"],
    definition: "Pérdida temporal de la conciencia causada por flujo sanguíneo insuficiente al cerebro. Puede ocurrir por hiperventilación, cambios bruscos de presión o retenciones prolongadas. Es una señal de alerta para detener la práctica.",
  },
  {
    term: "tetania",
    aliases: ["tetania"],
    definition: "Contracción muscular involuntaria y sostenida, generalmente en manos y pies, causada por desequilibrio de electrolitos (especialmente calcio) inducido por alcalosis respiratoria. Es una señal de alerta para detener la práctica.",
  },
  {
    term: "bradicardia",
    aliases: ["bradicardia"],
    definition: "Frecuencia cardíaca más lenta de lo normal (generalmente <60 latidos por minuto en reposo). Inducida intencionalmente en técnicas como PRN para mejorar la estabilidad y precisión motora.",
  },
  {
    term: "eje hpa",
    aliases: ["hpa", "eje hipotálamo-pituitaria-adrenal", "eje hipotálamo-hipófisis-suprarrenal"],
    definition: "Eje hipotálamo-pituitaria-adrenal: el sistema central de respuesta al estrés del cuerpo. Regula la liberación de cortisol y adrenalina. La respiración controlada puede modular su actividad, reduciendo la respuesta al estrés.",
  },
  {
    term: "adrenalina",
    aliases: ["adrenalina", "epinefrina"],
    definition: "Hormona y neurotransmisor producido por las glándulas suprarrenales. Aumenta la frecuencia cardíaca, la presión arterial y el flujo sanguíneo a los músculos. Es la principal hormona de la respuesta de 'lucha o huida'.",
  },
  {
    term: "lactato",
    aliases: ["lactato", "ácido láctico"],
    definition: "Compuesto producido por los músculos durante el ejercicio anaeróbico. Tradicionalmente asociado con la fatiga muscular, pero actualmente se sabe que también es una fuente de energía y una señal metabólica importante.",
  },
  {
    term: "corteza prefrontal",
    aliases: ["corteza prefrontal", "prefrontal", "córtex prefrontal"],
    definition: "Parte del cerebro responsable de funciones ejecutivas: toma de decisiones, planificación, control de impulsos y regulación emocional. La respiración lenta aumenta el flujo sanguíneo a esta región, mejorando la claridad mental.",
  },
  {
    term: "hemoglobina",
    aliases: ["hemoglobina"],
    definition: "Proteína en los glóbulos rojos que transporta oxígeno desde los pulmones a los tejidos y dióxido de carbono de vuelta a los pulmones. El Efecto Bohr describe cómo la hemoglobina libera oxígeno donde más se necesita.",
  },
  {
    term: "il-10",
    aliases: ["il-10", "interleuquina 10", "interleukina 10"],
    definition: "Citocina anti-inflamatoria producida por el sistema inmunológico. Niveles más altos de IL-10 se asocian con menor inflamación crónica. Algunos estudios sugieren que ciertas técnicas respiratorias pueden aumentar su producción.",
  },
  {
    term: "prn",
    aliases: ["prn", "pro re nata", "ventana prn"],
    definition: "Del latín 'pro re nata': 'según sea necesario'. En medicina y en esta app, indica una técnica de aplicación puntual y bajo demanda, no una práctica continua o programada.",
  },
  {
    term: "hiperventilación",
    aliases: ["hiperventilación", "hiperventilar"],
    definition: "Respiración excesivamente rápida o profunda que elimina demasiado CO₂ del cuerpo. Puede causar hipocapnia, alcalosis respiratoria y síntomas como mareo, hormigueo y confusión. En contexto controlado, se usa intencionalmente en algunas técnicas avanzadas.",
  },
  {
    term: "frecuencia cardíaca",
    aliases: ["frecuencia cardíaca", "pulso", "ritmo cardíaco"],
    definition: "Número de latidos del corazón por minuto (lpm). La frecuencia cardíaca en reposo de un adulto sano es de 60-100 lpm. La respiración lenta puede reducirla temporalmente, indicando activación parasimpática.",
  },
  {
    term: "presión arterial",
    aliases: ["presión arterial", "tensión arterial", "presión sanguínea"],
    definition: "Fuerza que ejerce la sangre contra las paredes de las arterias. Se mide en milímetros de mercurio (mmHg) y se expresa con dos números: sistólica (máxima) y diastólica (mínima). La respiración lenta puede reducirla.",
  },
  {
    term: "ph",
    aliases: ["ph sanguíneo", "ph", "potencial de hidrógeno"],
    definition: "Medida de acidez o alcalinidad de la sangre. El pH sanguíneo normal es de ~7.35-7.45 (ligeramente alcalino). La respiración afecta el pH al regular los niveles de CO₂, que forma ácido carbónico en la sangre.",
  },
  {
    term: "pranayama",
    aliases: ["pranayama", "pranayama yóguico"],
    definition: "Práctica yóguica de control de la respiración. Del sánscrito 'prana' (energía vital) y 'yama' (control). Incluye técnicas como Nadi Shodhana (respiración alterna) y Bhastrika (respiración de fuelle). Varias técnicas de respiración moderna tienen raíces en el pranayama.",
  },
  {
    term: "bhastrika",
    aliases: ["bhastrika", "respiración de fuelle"],
    definition: "Técnica de pranayama que consiste en respiraciones rápidas y forzadas, similares al fuelle de un herrero. Activa el sistema simpático y aumenta la temperatura corporal. La técnica 'Modo Turbo' de esta app se inspira en Bhastrika.",
  },
  {
    term: "ratio",
    aliases: ["ratio", "proporción", "relación inhalación-exhalación"],
    definition: "Relación entre la duración de la inhalación y la exhalación en un ciclo respiratorio. Por ejemplo, 1:2 significa que la exhalación dura el doble que la inhalación. Diferentes ratios producen diferentes efectos fisiológicos.",
  },
  {
    term: "vía nasal",
    aliases: ["nasal", "respiración nasal", "vía nasal"],
    definition: "Respiración a través de la nariz. Filtra, calienta y humedece el aire, produce óxido nítrico (que mejora la oxigenación) y activa el sistema parasimpático más eficazmente que la respiración bucal.",
  },
  {
    term: "bhramari pranayama",
    aliases: ["bhramari", "respiración del abejorro", "humming bee breath"],
    definition: "Técnica de pranayama yóguico que consiste en exhalar con un zumbido glótico sostenido (como el zumbido de una abeja). La vibración mecánica del sonido estimula el nervio vago a través del oído medio, produciendo una activación parasimpática única por vía vibro-acústica.",
  },
  {
    term: "vibro-acústico",
    aliases: ["vibroacústico", "vibro-acústica", "estimulación vibro-acústica"],
    definition: "Estimulación mecánica del sistema nervioso mediante vibraciones sonoras. En el contexto respiratorio, el zumbido glótico del Bhramari Pranayama genera vibraciones que se transmiten por el cráneo al oído medio, activando la rama auricular del nervio vago y produciendo un efecto calmante inmediato.",
  },
]
