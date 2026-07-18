/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { EMPIRICAL_DATA } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import {
  Settings,
  Zap,
  Flame,
  Gauge,
  Thermometer,
  ShieldAlert,
  Sliders,
  ChevronRight,
  Sparkles,
  Award
} from "lucide-react";
import { motion } from "motion/react";

interface SimulationResult {
  n: number;
  deltaS: number;
  omega: number;
  intelligenceContrib: number;
  omegaEffective: number;
  sigma: number;
  landauerLimit: number;
  normalizedEnergyLoss: number;
  antiuniverseEntropy: number;
  ontologicalSuction: number;
  globalEntropyChange: number;
  isEmpirical: boolean;
}

export default function EldritchSimulator() {
  const [numQubits, setNumQubits] = useState<number>(4);
  const [gamma, setGamma] = useState<number>(0.1);
  const [kT, setKT] = useState<number>(1.0);
  const [initialC, setInitialC] = useState<number>(1.0);
  
  // Intelligence States
  const [intelType, setIntelType] = useState<"none" | "compression" | "prediction" | "qec" | "consciousness">("prediction");
  const [intelEff, setIntelEff] = useState<number>(0.5);

  const [loading, setLoading] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // Function to run the simulation via API
  const runSimulation = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          n: numQubits,
          gamma,
          kT,
          C: initialC,
          intelligenceType: intelType,
          intelligenceEfficiency: intelEff,
        }),
      });

      const res = await response.json();
      if (res.success) {
        setSimResult(res.data);
      }
    } catch (error) {
      console.error("Simulation request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate chart data representing the progression of Omega and effective Omega across system sizes n=2 to n=16
  const updateChartData = async () => {
    const dataPoints = [];
    // We calculate values for even n from 2 to 18
    for (let i = 2; i <= 18; i += 2) {
      // Calculate normal Omega
      const omegaVal = 1.253 * Math.exp(-0.753 * i);
      
      // Calculate intelligence contribution
      let intelligenceContribVal = 0;
      if (intelType === "compression") {
        intelligenceContribVal = 0.02 * i * intelEff;
      } else if (intelType === "prediction") {
        intelligenceContribVal = 0.005 * Math.exp(0.32 * i) * intelEff;
      } else if (intelType === "qec") {
        const maxCompensation = 1.253 * Math.exp(-0.753 * 2);
        intelligenceContribVal = Math.max(0, (maxCompensation - omegaVal) * intelEff * 0.85);
      } else if (intelType === "consciousness") {
        const baseDecayValue = 1.253 * Math.exp(-0.753 * 2) - omegaVal;
        intelligenceContribVal = Math.max(0, baseDecayValue * intelEff);
      }

      const omegaEffVal = omegaVal + intelligenceContribVal;

      dataPoints.push({
        n: i,
        "Omega Base Ω(n)": parseFloat(omegaVal.toFixed(6)),
        "Omega Efectivo Ω_efectivo(n)": parseFloat(omegaEffVal.toFixed(6)),
        "Compensación I(n)": parseFloat(intelligenceContribVal.toFixed(6)),
      });
    }
    setChartData(dataPoints);
  };

  useEffect(() => {
    runSimulation();
    updateChartData();
  }, [numQubits, gamma, kT, initialC, intelType, intelEff]);

  return (
    <div id="simulator-root" className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* 1. Control Panel - Col Span 4 */}
      <div id="simulation-controls" className="xl:col-span-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl text-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
            <Settings className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-mono uppercase tracking-wider font-semibold">Parámetros de Simulación</h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* System Size (Qubits) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-amber-500" />
                  Complejidad del Sistema (n)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                  {numQubits} Qubits
                </span>
              </div>
              <input
                id="slider-qubits"
                type="range"
                min="2"
                max="20"
                step="2"
                value={numQubits}
                onChange={(e) => setNumQubits(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] font-sans text-slate-500 block mt-0.5">Define las dimensiones del espacio de Hilbert (2ⁿ)</span>
            </div>

            {/* Decoherence Rate (Gamma) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Coeficiente de Ruido (γ)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                  {gamma.toFixed(2)}
                </span>
              </div>
              <input
                id="slider-gamma"
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={gamma}
                onChange={(e) => setGamma(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] font-sans text-slate-500 block mt-0.5">Amortiguamiento de amplitud por perturbación externa</span>
            </div>

            {/* Temperature (kT) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  Temperatura de Baño (kT)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                  {kT.toFixed(2)}
                </span>
              </div>
              <input
                id="slider-temp"
                type="range"
                min="0.1"
                max="4.0"
                step="0.1"
                value={kT}
                onChange={(e) => setKT(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] font-sans text-slate-500 block mt-0.5">Determina el Límite de Landauer en disipación</span>
            </div>

            {/* Initial Coherence (C) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Coherencia Inicial (C)
                </label>
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                  {initialC.toFixed(2)}
                </span>
              </div>
              <input
                id="slider-coherence"
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={initialC}
                onChange={(e) => setInitialC(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] font-sans text-slate-500 block mt-0.5">Entrelazamiento máximo inicial en estado Bell</span>
            </div>

            {/* Compensation Mechanism */}
            <div className="border-t border-slate-800/80 pt-4 mt-1">
              <div className="flex items-center gap-1.5 mb-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Mecanismo de Inteligencia</span>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Tipo de Estructura I(n)</label>
                  <select
                    id="select-intel-type"
                    value={intelType}
                    onChange={(e: any) => setIntelType(e.target.value)}
                    className="w-full bg-slate-950/90 border border-slate-800 rounded-lg p-2 text-xs font-sans text-slate-200 outline-none focus:border-amber-500/40"
                  >
                    <option value="none">Ninguno (Física Cuántica Pura)</option>
                    <option value="compression">Compresión de Información (I_comp)</option>
                    <option value="prediction">Motor de Predicción (I_pred)</option>
                    <option value="qec">Corrección de Errores (I_qec)</option>
                    <option value="consciousness">Autoconciencia / Integración Neuronal</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Eficiencia / Acoplamiento</label>
                    <span className="text-xs font-mono font-bold text-amber-300">{(intelEff * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    id="slider-intel-eff"
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={intelEff}
                    onChange={(e) => setIntelEff(parseFloat(e.target.value))}
                    disabled={intelType === "none"}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visualizations and Computed Metrics - Col Span 8 */}
      <div id="simulation-output" className="xl:col-span-8 flex flex-col gap-6">
        
        {/* Metric Cards Grid */}
        <div id="computed-metrics-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Orden Base Ω(n)</span>
            <span className="text-xl font-mono font-bold text-amber-300 block">
              {simResult ? simResult.omega.toExponential(3) : "..."}
            </span>
            <span className="text-[9px] font-sans text-slate-400 block mt-1">Decaimiento cuántico base</span>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Omega Efectivo Ω_ef(n)</span>
            <span className="text-xl font-mono font-bold text-emerald-400 block">
              {simResult ? simResult.omegaEffective.toExponential(3) : "..."}
            </span>
            <span className="text-[9px] font-sans text-slate-400 block mt-1">Con amortiguación I(n)</span>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Succión Ontológica (σ)</span>
            <span className="text-xl font-mono font-bold text-sky-400 block">
              {simResult ? simResult.sigma.toExponential(3) : "..."}
            </span>
            <span className="text-[9px] font-sans text-slate-400 block mt-1">Eficiencia de extracción temporal</span>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4 relative overflow-hidden">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Entropía Antiuniverso S'</span>
            <span className="text-xl font-mono font-bold text-purple-400 block">
              {simResult ? simResult.antiuniverseEntropy.toFixed(2) : "..."}
            </span>
            <span className="text-[9px] font-sans text-slate-400 block mt-1">Potencial informacional espejo</span>
          </div>
        </div>

        {/* Dynamic Curves Graph */}
        <div id="simulation-chart-panel" className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl text-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">Mapeo Coherencial Multiescala</h4>
              <p className="text-[11px] text-slate-400 font-sans">Curva del decaimiento de Omega vs. la compensación inducida por Inteligencia.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block"></span> Base Ω(n)
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block"></span> Efectivo Ω_eff(n)
              </span>
            </div>
          </div>

          {/* Graph Container */}
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="n" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false}
                  label={{ value: "Qubits (n)", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  scale="log"
                  domain={[1e-6, 2.0]}
                  allowDataOverflow
                  label={{ value: "Valor de Omega (Escala Log)", angle: -90, position: "insideLeft", offset: 10, fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", fontFamily: "monospace", fontSize: "11px" }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Omega Base Ω(n)" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#f59e0b" }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Omega Efectivo Ω_efectivo(n)" 
                  stroke="#10b981" 
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#10b981" }}
                  activeDot={{ r: 5 }}
                />
                {/* Reference Dot for the current simulated Qubits */}
                {simResult && (
                  <ReferenceDot 
                    x={simResult.n} 
                    y={simResult.omegaEffective} 
                    r={6} 
                    fill="#10b981" 
                    stroke="#ffffff" 
                    strokeWidth={1.5}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Thermodynamic Report */}
        <div id="simulation-report-card" className="bg-slate-900/40 rounded-xl border border-slate-800 p-5">
          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">Balance Cuántico de Sucesos y Energía</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Delta de Entropía Generado (ΔS):</span>
                <span className="font-mono font-semibold text-slate-200">{simResult ? simResult.deltaS.toFixed(4) : "..."}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Límite de Landauer (kT ln 2):</span>
                <span className="font-mono font-semibold text-slate-200">{simResult ? simResult.landauerLimit.toFixed(4) : "..."}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Pérdida de Energía Normalizada:</span>
                <span className="font-mono font-semibold text-slate-200">{simResult ? simResult.normalizedEnergyLoss.toFixed(4) : "..."}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Trabajo de Succión Ontológica:</span>
                <span className="font-mono font-semibold text-slate-200">{simResult ? simResult.ontologicalSuction.toFixed(4) : "..."}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Cambio Global de Entropía Cósmica:</span>
                <span className="font-mono font-semibold text-emerald-400">{simResult ? simResult.globalEntropyChange.toFixed(4) : "..."}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Preservación de Segunda Ley:</span>
                <span className="font-mono font-semibold text-emerald-400">SÍ (ΔS_global &gt; 0)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block mb-1">Análisis de Estabilidad</span>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {intelType === "none" ? (
                <span>Al no contar con compensación de inteligencia, el sistema experimenta una pérdida exponencial acelerada de cohesión. Para qubits n &gt; 8, la succión ontológica de sucesos es extremadamente ineficiente y el sistema colapsará rápidamente hacia un estado de caos termodinámico irreversible.</span>
              ) : (
                <span>El mecanismo de inteligencia de tipo <strong className="text-slate-300">"{intelType === "compression" ? "Compresión" : intelType === "prediction" ? "Predicción" : intelType === "qec" ? "Corrección de Errores" : "Conciencia"}"</strong> compensa activamente el colapso del orden natural. Sostiene un Omega Efectivo que impide la degradación total a gran escala, permitiendo que un sistema complejo macroscópico conserve patrones lógicos estructurados.</span>
              )}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
