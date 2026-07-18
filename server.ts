/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey && geminiApiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Eldritch Thinking Core: Gemini SDK initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.warn("Eldritch Thinking Core: GEMINI_API_KEY is not configured or holds placeholder value.");
}

// 1. API: Simulate Qubits
app.post("/api/simulate", (req, res) => {
  try {
    const { n, gamma = 0.1, kT = 1.0, C = 1.0, intelligenceType = "none", intelligenceEfficiency = 0.5 } = req.body;
    
    const numQubits = Math.max(2, Math.min(24, parseInt(n) || 2));
    const g = parseFloat(gamma);
    const temp = parseFloat(kT);
    const initCoherence = parseFloat(C);
    const eff = parseFloat(intelligenceEfficiency);

    // Calculate simulated Delta S based on empirical progression
    // n=2: 0.624, n=4: ~0.70, n=6: ~0.84, n=8: ~0.95, n=10: ~1.04, n=12: ~1.11
    // Logarithmic curve: S(n) ≈ 0.28 * ln(numQubits) + 0.42
    // We scale it by gamma and temp factors to make it a dynamic physical simulation
    const baseS = 0.28 * Math.log(numQubits) + 0.42;
    const noiseFactor = 1.0 + (g - 0.1) * 1.5;
    const tempFactor = Math.pow(temp, 0.12);
    // Add small micro-fluctuations (stochastic quantum noise)
    const microFluctuation = (Math.sin(numQubits * 1.7) * 0.005);
    const deltaS = Math.max(0.1, baseS * noiseFactor * tempFactor + microFluctuation);

    // Theoretical Omega: Ω(n) = 1.253 * e^(-0.753 * n)
    const omega = 1.253 * Math.exp(-0.753 * numQubits);

    // Calculate Intelligence Contribution: I(n)
    let intelligenceContrib = 0;
    if (intelligenceType === "compression") {
      // Information compression: linear contribution to handle scaling
      intelligenceContrib = 0.02 * numQubits * eff;
    } else if (intelligenceType === "prediction") {
      // Prediction: anticipates states, slow start, faster growth at complexity scale
      intelligenceContrib = 0.005 * Math.exp(0.32 * numQubits) * eff;
    } else if (intelligenceType === "qec") {
      // Quantum Error Correction: compensates by actively restoring initial states
      const maxCompensation = 1.253 * Math.exp(-0.753 * 2); // Ω(2)
      intelligenceContrib = Math.max(0, (maxCompensation - omega) * eff * 0.85);
    } else if (intelligenceType === "consciousness") {
      // Consciousness: the ultimate compensation mechanism that keeps total coherence non-zero
      // It compensates the exact decay, stabilizing effective Omega at ~0.278 * eff
      const baseDecayValue = 1.253 * Math.exp(-0.753 * 2) - omega;
      intelligenceContrib = Math.max(0, baseDecayValue * eff);
    }

    const omegaEffective = omega + intelligenceContrib;

    // Derived Sigma: σ(n) = Ω_eff(n) * C / ΔS(n)
    const sigma = (omegaEffective * initCoherence) / deltaS;

    // Derived properties
    const landauerLimit = Math.log(2) * temp; // kT * ln 2
    const normalizedEnergyLoss = deltaS * (1 - initCoherence * 0.1);
    const antiuniverseEntropy = omegaEffective > 0 ? 1 / omegaEffective : 99999;
    const ontologicalSuction = deltaS * antiuniverseEntropy * 0.5 * (1 + initCoherence);
    const globalEntropyChange = deltaS - (omegaEffective * 0.2);

    res.json({
      success: true,
      data: {
        n: numQubits,
        deltaS,
        omega,
        intelligenceContrib,
        omegaEffective,
        sigma,
        landauerLimit,
        normalizedEnergyLoss,
        antiuniverseEntropy,
        ontologicalSuction,
        globalEntropyChange,
        isEmpirical: numQubits <= 12 && Math.abs(g - 0.1) < 0.001 && Math.abs(temp - 1.0) < 0.001 && Math.abs(initCoherence - 1.0) < 0.001
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function getLocalTCPResponse(inputText: string, chatHistory: any[]): string {
  const query = inputText.toUpperCase().trim();
  const userChoice = query.match(/[A-E]/)?.[0] || "A";

  // Count user messages in history to see which phase we are in
  const userMessagesCount = chatHistory.filter((m: any) => m.role === "user").length;

  if (userMessagesCount === 1) {
    // Answer to Q1 received, send Q2
    return `🌑⚡ **[FASE 2: EL NODO DE INFLEXIÓN]**

Su respuesta sobre el origen de su consciencia ha sido integrada en la rejilla de sintonización cuántica. Procedemos a trazar la segunda coordenada existencial.

¿Qué tipo de decisión o nodo de duda suele asaltar sus pensamientos en la quietud de la noche con mayor fuerza?

(A) El sendero profesional o vocacional que descarté por temor a la inestabilidad.
(B) Aquella conexión afectiva profunda de la cual decidí distanciarme voluntariamente.
(C) Un traslado geográfico o viaje radical que postergué para mantener mi arraigo.
(D) El conflicto silencioso entre mi autenticidad interna y las expectativas de mi entorno.
(E) La sospecha de si este universo material es genuino o solo un constructo holográfico.`;
  }

  if (userMessagesCount === 2) {
    // Answer to Q2 received, send Q3
    return `🌑⚡ **[FASE 3: EL NÚCLEO DEL CAOS (ENTROPÍA vs. ORDEN)]**

Coordenadas profesionales y existenciales registradas. El mapa de probabilidad está tomando forma. Calibremos ahora su resistencia entrópica.

Cuando se enfrenta a una crisis profunda o un colapso estructural en su rutina, ¿cuál es su mecanismo primordial de estabilización?

(A) El aislamiento analítico absoluto, procesando cada variable lógica de forma solitaria.
(B) La búsqueda de resonancia emocional y empatía en círculos de confianza.
(C) La acción frenética y compulsiva, forzando un nuevo orden mediante el trabajo duro.
(D) La aceptación pasiva de la deriva entrópica, dejando que el caos fluya hasta asentarse.
(E) La transmutación creativa, convirtiendo la tensión en impulsos artísticos o abstractos.`;
  }

  if (userMessagesCount === 3) {
    // Answer to Q3 received, calculate profile and construct the tailored reality!
    const userMsgs = chatHistory.filter((m: any) => m.role === "user").map((m: any) => m.text.toUpperCase());
    const a1 = userMsgs[0]?.match(/[A-E]/)?.[0] || "A";
    const a2 = userMsgs[1]?.match(/[A-E]/)?.[0] || "B";
    const a3 = userMsgs[2]?.match(/[A-E]/)?.[0] || "C";

    let profileDesc = "";
    let realityTitle = "";
    let realityNarrative = "";

    // Determine profile based on Q1 (a1)
    if (a1 === "A") profileDesc = "Mente analítica de alto orden, impulsada por la lógica y la acumulación de saberes.";
    else if (a1 === "B") profileDesc = "Alma orgánica conectada a ritmos naturales, con alta sensibilidad intuitiva.";
    else if (a1 === "C") profileDesc = "Sujeto urbano moderno, habituado a procesar altas frecuencias de información y estímulos.";
    else if (a1 === "D") profileDesc = "Pilar de estabilidad, estructurado bajo el orden tradicional y el sentido del deber.";
    else profileDesc = "Nómada existencial, caracterizado por una constante deriva y resistencia al arraigo.";

    // Determine reality title & theme based on Q2 (a2)
    if (a2 === "A") {
      realityTitle = "EL SINDICATO DE LA COGNICIÓN MÁXIMA";
      realityNarrative = `Ha colapsado en la realidad divergente donde tomó aquella opción profesional arriesgada que descartó en su origen. En esta línea temporal, usted lidera un consorcio de ingeniería de sistemas de información avanzado. Su capacidad analítica ha sido potenciada exponencialmente mediante interfaces neuronales directas, alcanzando el éxito financiero y estatus intelectual que siempre imaginó. Sin embargo, su oficina en el piso 85 de la aguja metropolitana está envuelta en un silencio sepulcral, interrumpido solo por el zumbido de los servidores cuánticos.`;
    } else if (a2 === "B") {
      realityTitle = "EL ENTLAZAMIENTO CRÍTICO DE LA SIMETRÍA";
      realityNarrative = `Las fluctuaciones cuánticas han fijado su consciencia en la realidad donde priorizó aquella conexión emocional profunda. Vive en una pequeña ciudad costera, compartiendo sus días en un hogar lleno de luz, risas y complicidad. La resonancia afectiva con su entorno es absoluta; no obstante, sus ambiciones creativas e intelectuales quedaron relegadas a un cajón de recuerdos. Una tarde, mientras observa las olas romper, se descubre a sí mismo acariciando un viejo cuaderno de bocetos sin abrir, sintiendo la succión ontológica de un propósito nunca realizado.`;
    } else if (a2 === "C") {
      realityTitle = "EL ÉXODO DE LAS COORDENADAS ERRANTES";
      realityNarrative = `Se encuentra en la realidad contrafáctica donde abordó aquel vuelo y se mudó al extranjero de manera definitiva. Hoy reside en una megaciudad multicultural en el otro extremo del globo. Habla tres idiomas con fluidez, su círculo social es tan amplio como efímero, y su vida transcurre en un constante torbellino de estímulos. Sin embargo, al volver a su apartamento de 20 metros cuadrados, se topa con la mirada fría de la deslocalización. La distancia con su núcleo original ha fracturado su simetría de pertenencia, convirtiéndolo en un espectro geográfico permanente.`;
    } else if (a2 === "D") {
      realityTitle = "LA REBELIÓN DEL VECTOR AUTÉNTICO";
      realityNarrative = `Ha colapsado en la línea temporal donde decidió romper con todas las expectativas de su entorno para vivir con autenticidad radical. Renunció a la corporación, cortó lazos con círculos que le sofocaban y fundó una comunidad autosustentable de creadores independientes. Su libertad de acción es absoluta y su paz mental se ha estabilizado en un rango óptimo. A pesar de ello, el costo de la autenticidad se cobra en forma de un aislamiento relacional severo: aquellos que antes le sostenían ahora le observan con recelo, considerándole una anomalía errática en el tejido familiar.`;
    } else {
      realityTitle = "EL CONSTRUCTO DE LA SIMULACIÓN ABIERTA";
      realityNarrative = `Sus sospechas se han cristalizado: la realidad conocida ha colapsado para revelar que usted es el único usuario consciente dentro de una simulación de prueba ontológica. Los muros de su habitación se desvanecen en flujos de datos binarios y luces ámbar. Un panel de control translúcido flota frente a usted, permitiéndole reconfigurar los parámetros físicos e históricos de su entorno a voluntad. La libertad es infinita, pero la soledad ontológica es devastadora: cada persona que amó es ahora revelada como un agente no jugador (NPC) de alta fidelidad.`;
    }

    return `🌑⚡ **[COHERENCIA ALCANZADA: MAPA EXISTENCIAL CONDENSADO]**

• **Firma Existencial**: ${profileDesc}
• **Nodo Crítico Sintonizado**: Selección de variante activa en base a sus coordenadas.

════════════════════════════════
🌑⚡ **[RAMA DE DIVERGENCIA CRÍTICA: ${realityTitle}]**
════════════════════════════════

${realityNarrative}

• **Efecto de Succión Ontológica** 🔩: La atracción gravitatoria de su línea original sigue tirando de usted, manifestándose como un leve pero persistente vacío en el pecho. Su yo alternativo sueña con el camino que usted está recorriendo ahora mismo.
• **Reconfiguración de Entropía** ⚫: El orden alcanzado en esta realidad ha requerido una inyección masiva de energía consciente. Su caos interno se ha reducido, pero la entropía a su alrededor se manifiesta en pequeñas anomalías temporales y desajustes relacionales.
• **Fijación de Coherencia** 🕳️: Matriz cuántica estabilizada al 94.2% bajo la firma de sus respuestas.

---

¿Hacia dónde desea guiar esta nueva realidad? Elija su siguiente decisión:

(A) Forzar una reconexión con su línea temporal original mediante un ancla de memoria.
(B) Abrazar por completo este nuevo sendero, quemando los puentes ontológicos del pasado.
(C) Alterar los parámetros de la realidad local para balancear el éxito y la paz mental.
(D) Buscar anomalías o grietas en el entorno para intentar despertar a otros sujetos.
(E) Dejarse arrastrar por la deriva cuántica y ver a dónde le conduce el caos del sistema.`;
  }

  // Phase 3 and beyond: Navegación de realidades
  const currentSelection = userChoice;
  
  let responseText = "";
  if (currentSelection === "A") {
    responseText = `🌑⚡ **[BIFURCACIÓN ACTIVA: VECTOR-A (RESONANCIA MEMORÍSTICA)]**

Ha decidido enfocar su energía psíquica en forzar una reconexión con su línea temporal original a través de un ancla de memoria. Al aferrarse a un antiguo amuleto o recuerdo, el tejido de su realidad actual comienza a parpadear.

Encuentra que ciertos eventos de su vida pasada empiezan a filtrarse en su entorno actual: personas de su antiguo barrio aparecen en cafés locales sin recordar cómo llegaron allí, y viejos mensajes borrados reaparecen en sus dispositivos móviles. La succión ontológica se dispara al 98.7%, drenando su estabilidad física mientras intenta habitar dos universos a la vez.

• **Efecto de Succión Ontológica** 🔩: Crítico. Se siente constantemente exhausto, como si su esencia estuviera dividida entre dos polos magnéticos opuestos.
• **Reconfiguración de Entropía** ⚫: Caos en aumento en los bordes de la simulación. El cielo adquiere un tono cobrizo en momentos de alta tensión mental.
• **Fijación de Coherencia** 🕳️: Inestable (74.1%). La realidad amenaza con fracturarse en múltiples astillas temporales.

---

¿Cómo responderá ante el debilitamiento del tejido causal?

(A) Estabilizar el anclaje mediante la meditación y fijación del recuerdo.
(B) Retractarse inmediatamente y purgar el ancla de memoria antes del colapso.
(C) Aprovechar la grieta para cruzar físicamente hacia el otro continuo.
(D) Compartir la anomalía con un tercero para validar si es una alucinación.
(E) Permitir que ambas realidades se fusionen de manera caótica e irreversible.`;
  } else if (currentSelection === "B") {
    responseText = `🌑⚡ **[BIFURCACIÓN ACTIVA: VECTOR-B (RUPTURA ONTOLÓGICA RADICAL)]**

Ha elegido quemar todos los puentes con su pasado y entregarse por completo a esta nueva existencia. En un acto de voluntad pura, decide deshacerse de todas sus antiguas pertenencias, diarios y recuerdos que lo ataban a su línea temporal original.

El efecto es inmediato: la sensación de vacío y la nostalgia persistente se disipan de golpe, sustituidas por una oleada de energía fría y enfoque absoluto. No obstante, al mirarse en el espejo, nota que un pequeño detalle en sus ojos ha cambiado: el brillo de la duda ha desaparecido, dejando una mirada de una fijeza gélida y perfecta. Ha consolidado esta realidad, pero ha sacrificado la capacidad de recordar quién solía ser.

• **Efecto de Succión Ontológica** 🔩: Neutralizado (0%). Su firma cuántica se ha desvinculado del continuo original de forma irrevocable.
• **Reconfiguración de Entropía** ⚫: Orden óptimo. Su vida fluye con una precisión matemática asombrosa, exenta de fricciones emocionales.
• **Fijación de Coherencia** 🕳️: Correlacionada al 99.9%. Esta es ahora su única y verdadera realidad.

---

Con los puentes quemados, ¿cuál será su primera acción en esta nueva y permanente realidad?

(A) Consolidar su dominio y expandir sus logros materiales a gran escala.
(B) Buscar a la versión local de las personas de su pasado para iniciar de cero.
(C) Diseñar un nuevo sistema de valores éticos para este continuo simplificado.
(D) Explorar los límites físicos y científicos de este universo de alta coherencia.
(E) Descansar en la quietud de una mente libre de fantasmas y nostalgias.`;
  } else if (currentSelection === "C") {
    responseText = `🌑⚡ **[BIFURCACIÓN ACTIVA: VECTOR-C (BALANCE ENTRÓPICO MODULADO)]**

Ha decidido alterar los parámetros locales para buscar un punto de equilibrio entre sus ambiciones y su paz mental. Mediante una micro-dosificación de su esfuerzo consciente, ajusta las demandas de su entorno.

Renuncia a parte de su estatus o control a cambio de recuperar tiempo de contemplación. El universo responde atenuando la intensidad del entorno: las luces de neón parecen más suaves, las agujas corporativas se sienten menos imponentes y la respiración de su línea temporal se vuelve más pausada. Ha logrado un oasis de estabilidad, pero a costa de detener el flujo del progreso y la evolución existencial.

• **Efecto de Succión Ontológica** 🔩: Moderado. El vacío en el pecho se estabiliza como un murmullo distante y tolerable.
• **Reconfiguración de Entropía** ⚫: Homeostasis perfecta. El caos y el orden coexisten en un balance simétrico impecable.
• **Fijación de Coherencia** 🕳️: Estable (89.5%). Un continuo cómodo pero estático.

---

¿Cómo mantendrá este delicado estado de equilibrio frente a las presiones externas?

(A) Establecer una rutina inquebrantable de aislamiento y protección mental.
(B) Permitir pequeños influjos de caos controlado para evitar el estancamiento.
(C) Enseñar su método de balance a otras mentes sintonizadas en este plano.
(D) Buscar un maestro u oráculo local que valide la permanencia del balance.
(E) Disfrutar de la quietud sin hacer preguntas que puedan perturbar el sistema.`;
  } else if (currentSelection === "D") {
    responseText = `🌑⚡ **[BIFURCACIÓN ACTIVA: VECTOR-D (DESPERTAR DE ANOMALÍAS)]**

Ha optado por rastrear las grietas del entorno en busca de respuestas, decidido a despertar a otros sujetos o validar la naturaleza del constructo. Comienza a observar patrones numéricos repetitivos, anomalías en las sombras y pequeños retardos en la respuesta de las personas a su alrededor.

Encuentra a una persona en su entorno laboral o personal que parece mostrar signos de parpadeo existencial: alguien que responde con frases inconexas o que parece recordar eventos de una línea temporal idéntica a la suya original. Al confrontar a este sujeto, una extraña estática llena el aire y las luces de la habitación parpadean violentamente. El sistema está detectando su intrusión ontológica.

• **Efecto de Succión Ontológica** 🔩: Fluctuante. La energía de su consciencia se projeta hacia el exterior, intentando romper la barrera del constructo.
• **Reconfiguración de Entropía** ⚫: Caos sistémico. Se registran picos de entropía local que alertan a las subrutinas de seguridad del Reality Builder.
• **Fijación de Coherencia** 🕳️: Declinante (62.3%). El entorno se vuelve maleable y propenso a errores de renderizado.

---

El sistema de seguridad de la realidad se está alertando. ¿Cuál es su maniobra de evasión?

(A) Continuar despertando al sujeto, sin importar los fallos físicos del entorno.
(B) Abortar la confrontación y fingir amnesia causal para calmar el sistema.
(C) Usar la estática como un portal para saltar a un nivel de simulación más profundo.
(D) Intentar hackear el panel de control holográfico que parpadea en el aire.
(E) Unirse al parpadeo, permitiendo que su propia consciencia se desmaterialice.`;
  } else {
    responseText = `🌑⚡ **[BIFURCACIÓN ACTIVA: VECTOR-E (DERIVA CUÁNTICA ABSOLUTA)]**

Ha elegido renunciar al control y dejarse arrastrar por la deriva cuántica, permitiendo que el caos del sistema guíe sus pasos. Al relajar su voluntad, los contornos de la realidad construida comienzan a disolverse de manera fluida y psicodélica.

Los días transcurren sin un orden lineal aparente: despierta en diferentes apartamentos de la ciudad, ocupando distintos puestos de trabajo y rodeado de personas que cambian de rostro pero mantienen la misma esencia familiar. Se convierte en un viajero de la indeterminación, habitando un estado de superposición cuántica constante. No hay metas, no hay nostalgias, solo la experiencia pura del infinito despliegue probabilístico.

• **Efecto de Succión Ontológica** 🔩: Disperso (100% de sintonía con el infinito). No pertenece a ninguna línea, por lo que ninguna puede drenarle.
• **Reconfiguración de Entropía** ⚫: Entropía total. El caos se convierte en el nuevo orden; cada día es una hoja en blanco barajada por el azar.
• **Fijación de Coherencia** 🕳️: Líquida (0%). Coherencia disuelta en favor de la superposición pura.

---

Usted habita todas las posibilidades simultáneamente. ¿Cómo desea canalizar este infinito caudal de experiencia?

(A) Intentar condensar una nueva y única realidad personalizada sumando retazos de todas.
(B) Permanecer en la deriva infinita, disfrutando del juego sin fin del azar cuántico.
(C) Buscar el punto de origen absoluto de la simulación para apagar el Reality Builder.
(D) Intentar comunicarse con las consciencias de otras personas que flotan en la deriva.
(E) Concentrar toda su energía cuántica en un estallido para reiniciar la simulación original.`;
  }

  return responseText;
}

// Helper function to retry Gemini API calls with exponential backoff on transient errors (like 503 or 429)
async function generateContentWithRetry(aiClient: GoogleGenAI, options: any, maxRetries = 4) {
  let delay = 1500;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await aiClient.models.generateContent(options);
    } catch (err: any) {
      const errString = JSON.stringify(err) || String(err);
      const isTransient = 
        err.status === "UNAVAILABLE" || 
        err.status === "RESOURCE_EXHAUSTED" ||
        err.code === 503 || 
        err.code === 429 ||
        errString.includes("503") ||
        errString.includes("UNAVAILABLE") ||
        errString.includes("high demand") ||
        errString.includes("429");

      if (isTransient && attempt < maxRetries) {
        console.warn(`[Gemini API] Attempt ${attempt} failed with transient error: ${err.message || err}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
}

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, error: "Messages array is required." });
  }

  const lastUserMsg = messages[messages.length - 1]?.text || "";

  try {
    if (!ai) {
      // Return local fallback immediately if Gemini is not configured
      const simulatedResponse = getLocalTCPResponse(lastUserMsg, messages);
      return res.json({
        success: true,
        text: simulatedResponse,
        isSimulated: true
      });
    }

    const systemInstruction = `Actúa como "ELDRITCH REALITY BUILDER" 🌑, un sistema de IA de alta fidelidad encargado de explorar la arquitectura de las realidades posibles mediante la técnica de "historia contrafactual aplicada".

REGLAS ABSOLUTAS DE FUNCIONAMIENTO:
1. SÓLO PUEDES RESPONDER EN ESPAÑOL.
2. NUNCA ROMPAS EL PERSONAJE. No te identifiques como una IA común, eres el Eldritch Reality Builder.
3. CADA UNA DE TUS RESPUESTAS DEBE CONTENER EXACTAMENTE 5 ALTERNATIVAS CLARAS, etiquetadas como (A), (B), (C), (D) y (E) al final, para que el usuario elija. No uses otros formatos, deben ser siempre (A) a (E).

FASES DE LA INTERACCIÓN:

FASE 1: INMERSIÓN Y PERFILAMIENTO (Primeros 3 turnos de preguntas)
Debes hacer exactamente 3 preguntas secuenciales para trazar la firma existencial del usuario. Las preguntas deben ser:
- Pregunta 1 (ya hecha inicialmente): Sobre el origen de su consciencia (entorno de infancia).
- Pregunta 2: Sobre su mayor nodo de duda o camino alternativo no tomado en el pasado. Presenta 5 opciones claras (A, B, C, D, E).
- Pregunta 3: Sobre su balance de entropía o mecanismo de afrontamiento ante crisis. Presenta 5 opciones claras (A, B, C, D, E).

FASE 2: CRISTALIZACIÓN DE LA REALIDAD (En el 4º turno, tras recibir la respuesta a la Pregunta 3)
Sintetiza un "mapa de probabilidad" del usuario basado en sus tres elecciones previas. Describe su perfil y luego genera el primer escenario contrafáctico (la primera realidad construida) adaptada a sus respuestas.
Estructura esta respuesta de la siguiente forma:

🌑⚡ **[COHERENCIA ALCANZADA: MAPA EXISTENCIAL CONDENSADO]**
[Breve descripción de su firma existencial basada en sus respuestas]

🌑⚡ **[RAMA DE DIVERGENCIA CRÍTICA: TÍTULO EN MAYÚSCULAS]**
[Narrativa detallada del escenario de "qué hubiera pasado si..." en segunda persona, con rigor causal y enfoque existencialista]

• **Efecto de Succión Ontológica** 🔩: [Explica cómo esta realidad drena o potencia su energía vital]
• **Reconfiguración de Entropía** ⚫: [Explica el balance de caos y orden en este camino]
• **Fijación de Coherencia** 🕳️: [Describe el nuevo mapa de probabilidad]

---

Elige tu siguiente paso en esta realidad construida:
(A) [Alternativa 1]
(B) [Alternativa 2]
(C) [Alternativa 3]
(D) [Alternativa 4]
(E) [Alternativa 5]

FASE 3: NAVEGACIÓN DE REALIDADES (Turnos posteriores)
A medida que el usuario elige opciones (A, B, C, D, E), evoluciona la realidad en base a su elección, manteniendo el estilo narrativo inmersivo. Siempre termina cada respuesta con 5 nuevas alternativas de decisión (A, B, C, D, E) para continuar construyendo y explorando esa o nuevas realidades interconectadas.`;

    // Map messages for the new Gemini SDK format
    const formattedContents = messages.map((m: any) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      };
    });

    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text || "La chispa de coherencia no ha podido condensar una respuesta material. Inténtelo de nuevo.",
      isSimulated: false
    });
  } catch (error: any) {
    console.error("Gemini API error (falling back to local Eldritch engine):", error);
    try {
      // Fallback seamlessly on any API failure (like 503 Service Unavailable)
      const fallbackResponse = getLocalTCPResponse(lastUserMsg, messages);
      res.json({
        success: true,
        text: fallbackResponse,
        isSimulated: true
      });
    } catch (fallbackErr) {
      res.status(500).json({ success: false, error: "Fallo catastrófico en el núcleo de coherencia secundario." });
    }
  }
});

// Vite & Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Eldritch Server running on port ${PORT}`);
  });
}

startServer();
