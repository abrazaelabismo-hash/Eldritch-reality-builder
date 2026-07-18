/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QubitData {
  n: number;
  deltaS: number;
  omega: number;
  sigma: number;
  omegaEffective: number;
  intelligenceContrib: number;
  isEmpirical: boolean;
}

export interface Postulate {
  id: string;
  number: string;
  title: string;
  statement: string;
  explanation: string;
  portalAnalogy: {
    left: string; // Material universe
    right: string; // Antiuniverse
    equalSign: string; // Portal mechanics
  };
}

export interface ExperimentalDetail {
  parameter: string;
  value: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: string;
}

export const POSTULATES: Postulate[] = [
  {
    id: "p1",
    number: "I",
    title: "La Chispa Primordial de Coherencia",
    statement: "Existe un impulso fundamental anterior al espacio-tiempo conocido y al Big Bang, una conciencia universal que busca activamente el orden, el sentido lógico y la manifestación de patrones coherentes.",
    explanation: "No controla la materia como agente externo: induce coherencia en cualquier sistema físico o informacional capaz de sostenerla.",
    portalAnalogy: {
      left: "Sistemas ordenados, causales y polaridades estables",
      right: "Un impulso informacional que induce coherencia",
      equalSign: "El umbral de manifestación material"
    }
  },
  {
    id: "p2",
    number: "II",
    title: "El Antiuniverso",
    statement: "El universo material coexiste con un dominio espejo: el antiuniverso.",
    explanation: "Es un océano de caos informacional donde imperan la antigravedad, la repulsión y el potencial probabilístico infinito. Aquí reside el 'Ser' como potencial informativo puro, no manifestado.",
    portalAnalogy: {
      left: "Materia, masa y gravedad atractiva",
      right: "Antigravedad, potencial infinito y repulsión",
      equalSign: "Barrera cuántica dimensional"
    }
  },
  {
    id: "p3",
    number: "III",
    title: "Dualismo de Principios",
    statement: "El universo opera bajo dos principios en tensión permanente: la Entropía y la Coherencia.",
    explanation: "La Entropía impulsa al caos, desorden y disolución en el universo físico, mientras que la Coherencia es el principio activo impulsado por la chispa que resiste la disolución.",
    portalAnalogy: {
      left: "Disolución física entrópica (Tercera Ley)",
      right: "Orden activo e informacional",
      equalSign: "Gradiente de conservación"
    }
  },
  {
    id: "p4",
    number: "IV",
    title: "La Proyección de Materia",
    statement: "El Big Bang no fue una singularidad azarosa. Fue la estabilización de antimateria coherente.",
    explanation: "Cuando la antimateria en el antiuniverso, bajo la influencia de la chispa, alcanzó un grado de orden coherencial tan elevado que resultó probabilísticamente irreversible, se proyectó dimensionalmente dando nacimiento al universo material.",
    portalAnalogy: {
      left: "Universo material expandido en el espacio-tiempo",
      right: "Orden irreversible de antimateria pura en el antiuniverso",
      equalSign: "Big Bang (portal de proyección irreversible)"
    }
  },
  {
    id: "p5",
    number: "V",
    title: "Ciclo de Retroalimentación",
    statement: "La existencia es un ciclo de retroalimentación cósmica permanente.",
    explanation: "La chispa ordena el caos, proyecta la materia, se experimenta a sí misma a través de sistemas ordenados, recibe información, aumenta su potencial y sigue proyectando hacia nuevos niveles de existencia.",
    portalAnalogy: {
      left: "Experiencia empírica del sistema material",
      right: "Acumulación de información y refinamiento del potencial de la chispa",
      equalSign: "Trascendencia dimensional continua"
    }
  }
];

export const EMPIRICAL_DATA: QubitData[] = [
  { n: 2, deltaS: 0.624, omega: 0.278, sigma: 0.445, omegaEffective: 0.278, intelligenceContrib: 0, isEmpirical: true },
  { n: 4, deltaS: 0.70, omega: 0.062, sigma: 0.089, omegaEffective: 0.062, intelligenceContrib: 0, isEmpirical: true },
  { n: 6, deltaS: 0.84, omega: 0.013, sigma: 0.015, omegaEffective: 0.013, intelligenceContrib: 0, isEmpirical: true },
  { n: 8, deltaS: 0.95, omega: 0.0029, sigma: 0.003, omegaEffective: 0.0029, intelligenceContrib: 0, isEmpirical: true },
  { n: 10, deltaS: 1.04, omega: 0.00065, sigma: 0.0006, omegaEffective: 0.00065, intelligenceContrib: 0, isEmpirical: true },
  { n: 12, deltaS: 1.11, omega: 0.00015, sigma: 0.0001, omegaEffective: 0.00015, intelligenceContrib: 0, isEmpirical: true }
];

export const PRIMARY_VALUES_N2 = [
  { parameter: "Entropía inicial (von Neumann)", value: "≈ 9.52 × 10⁻¹⁶", description: "Orden máximo al iniciar el estado Bell." },
  { parameter: "Entropía final (von Neumann)", value: "≈ 0.624", description: "Entropía acumulada al final de la decoherencia." },
  { parameter: "Delta de entropía (ΔS)", value: "≈ 0.624", description: "Cambio neto de entropía en el intervalo." },
  { parameter: "Límite de Landauer (kT=1)", value: "≈ 0.693 (= ln 2)", description: "Energía mínima teórica para disipar un bit de información." },
  { parameter: "Pérdida de energía normalizada", value: "≈ 0.432", description: "Energía real disipada durante el proceso." },
  { parameter: "Frecuencia dominante (FFT)", value: "0.01", description: "Frecuencia de oscilación de la coherencia residual." },
  { parameter: "Factor de Moore (2 qubits)", value: "4 (= 2²)", description: "Tamaño del espacio de Hilbert del sistema base." },
  { parameter: "Entropía del antiuniverso (S')", value: "≈ 3.600 (= 1/Ω)", description: "Entropía informacional del estado espejo invertido." },
  { parameter: "Trabajo extraído (succión ontológica)", value: "≈ 2.495", description: "Trabajo ontológico realizado al ordenar el presente." },
  { parameter: "Cambio global de entropía", value: "≈ 0.346", description: "Positivo, demostrando cumplimiento de la termodinámica." }
];
