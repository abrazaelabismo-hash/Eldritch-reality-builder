/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { POSTULATES, EMPIRICAL_DATA, PRIMARY_VALUES_N2 } from "../types";
import { BookOpen, RefreshCw, Key, Shield, Compass, ChevronRight, Binary, ArrowRightLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EldritchExplorer() {
  const [activeTab, setActiveTab] = useState<"cosmo" | "math" | "intel" | "qutip">("cosmo");
  const [selectedPostulate, setSelectedPostulate] = useState<string>("p1");
  
  // Interactive Equation Portal State
  const [equationTerms, setEquationTerms] = useState({
    left: [
      { id: "S", label: "Entropía Física (ΔS)", universe: "material", value: "+0.624", description: "Disolución física y desorden temporal." },
      { id: "F", label: "Frecuencia FFT", universe: "material", value: "+0.01", description: "Firma de oscilación en la materia." }
    ],
    right: [
      { id: "O", label: "Orden Omega (Ω)", universe: "espejo", value: "-0.278", description: "La fuerza cohesiva primordial en potencial." },
      { id: "S_prime", label: "Entropía Espejo (S')", universe: "espejo", value: "-3.600", description: "Caos informacional no manifestado." }
    ],
    portalState: "Equilibrado",
  });

  const handleShiftTerm = (id: string, currentUniverse: "left" | "right") => {
    if (currentUniverse === "left") {
      const termToMove = equationTerms.left.find((t) => t.id === id);
      if (termToMove) {
        setEquationTerms({
          left: equationTerms.left.filter((t) => t.id !== id),
          right: [...equationTerms.right, { ...termToMove, value: termToMove.value.startsWith("+") ? termToMove.value.replace("+", "-") : termToMove.value.replace("-", "+") }],
          portalState: `Inversión: ${termToMove.label} trasmutado al Antiuniverso`
        });
      }
    } else {
      const termToMove = equationTerms.right.find((t) => t.id === id);
      if (termToMove) {
        setEquationTerms({
          left: [...equationTerms.left, { ...termToMove, value: termToMove.value.startsWith("-") ? termToMove.value.replace("-", "+") : termToMove.value.replace("+", "-") }],
          right: equationTerms.right.filter((t) => t.id !== id),
          portalState: `Proyección: ${termToMove.label} manifestado en la Materia`
        });
      }
    }
  };

  const handleResetEquation = () => {
    setEquationTerms({
      left: [
        { id: "S", label: "Entropía Física (ΔS)", universe: "material", value: "+0.624", description: "Disolución física y desorden temporal." },
        { id: "F", label: "Frecuencia FFT", universe: "material", value: "+0.01", description: "Firma de oscilación en la materia." }
      ],
      right: [
        { id: "O", label: "Orden Omega (Ω)", universe: "espejo", value: "-0.278", description: "La fuerza cohesiva primordial en potencial." },
        { id: "S_prime", label: "Entropía Espejo (S')", universe: "espejo", value: "-3.600", description: "Caos informacional no manifestado." }
      ],
      portalState: "Equilibrado"
    });
  };

  const activePostulate = POSTULATES.find((p) => p.id === selectedPostulate) || POSTULATES[0];

  return (
    <div id="eldritch-explorer-root" className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl text-slate-100 flex flex-col h-[650px]">
      {/* Tab Navigation */}
      <div id="explorer-tabs" className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-4">
        <button
          id="btn-tab-cosmo"
          onClick={() => setActiveTab("cosmo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
            activeTab === "cosmo"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          I - Marco Cosmológico
        </button>
        <button
          id="btn-tab-math"
          onClick={() => setActiveTab("math")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
            activeTab === "math"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          II - Derivación & Portal
        </button>
        <button
          id="btn-tab-intel"
          onClick={() => setActiveTab("intel")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
            activeTab === "intel"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          III - Inteligencia
        </button>
        <button
          id="btn-tab-qutip"
          onClick={() => setActiveTab("qutip")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
            activeTab === "qutip"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          IV - Datos QuTiP (n=2)
        </button>
      </div>

      {/* Content Area */}
      <div id="explorer-tab-content" className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "cosmo" && (
            <motion.div
              key="cosmo-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full"
            >
              {/* Left Panel: Postulates List */}
              <div id="postulates-list" className="md:col-span-2 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500/70 mb-1 block">Postulados Fundamentales</span>
                {POSTULATES.map((p) => (
                  <button
                    key={p.id}
                    id={`btn-postulate-${p.id}`}
                    onClick={() => setSelectedPostulate(p.id)}
                    className={`text-left p-3 rounded-xl border transition-all duration-300 ${
                      selectedPostulate === p.id
                        ? "bg-slate-800 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/5"
                        : "bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/30 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-amber-400 rounded">
                        {p.number}
                      </span>
                      <span className="text-xs font-medium tracking-tight font-sans truncate">{p.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Panel: Detailed View */}
              <div id="postulate-detail-panel" className="md:col-span-3 bg-slate-900/40 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono px-2 py-1 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                      POSTULADO {activePostulate.number}
                    </span>
                    <h3 className="text-base font-semibold text-slate-100 tracking-tight">{activePostulate.title}</h3>
                  </div>
                  
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-4">
                    <p className="text-sm font-sans leading-relaxed text-amber-200/90 font-medium italic">
                      "{activePostulate.statement}"
                    </p>
                  </div>

                  <p className="text-xs font-sans text-slate-400 leading-relaxed mb-4">
                    {activePostulate.explanation}
                  </p>
                </div>

                {/* Micro Portal Representation */}
                <div id="postulate-portal-concept" className="bg-slate-950/30 border border-slate-800/50 rounded-xl p-3">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Traducción Ontológica</span>
                  <div className="grid grid-cols-3 items-center gap-2 text-center">
                    <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                      <span className="text-[9px] font-mono text-slate-400 block mb-1">Universo Físico</span>
                      <span className="text-[10px] font-sans text-slate-300 font-medium leading-tight block truncate">{activePostulate.portalAnalogy.left}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-1 text-[10px] font-mono font-bold text-amber-400">
                          =
                        </div>
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase tracking-tighter truncate max-w-full">
                        {activePostulate.portalAnalogy.equalSign}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                      <span className="text-[9px] font-mono text-rose-400/90 block mb-1">Antiuniverso</span>
                      <span className="text-[10px] font-sans text-slate-300 font-medium leading-tight block truncate">{activePostulate.portalAnalogy.right}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "math" && (
            <motion.div
              key="math-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              {/* Concept Intro */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5">
                  <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider mb-2">La Ecuación como Puente Ontológico</h3>
                  <p className="text-xs font-sans text-slate-300 leading-relaxed mb-3">
                    En el Modelo Eldritch, una ecuación no es solo un balance aritmético: representa el <strong>portal dimensional (=)</strong> entre el universo material y el antiuniverso espejo. 
                  </p>
                  <p className="text-xs font-sans text-slate-400 leading-relaxed">
                    Al trasladar un término a través de la igualdad, no solo cambia su signo algebraico; <strong>se invierte su esencia ontológica</strong>. El caos informacional se convierte en estabilidad observable, y viceversa.
                  </p>
                </div>

                <div className="lg:col-span-7 bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Sandbox del Portal de Coherencia</span>
                    <button 
                      onClick={handleResetEquation}
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 rounded border border-slate-700 transition"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> Reiniciar
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-2 items-center mb-4">
                    {/* Material Universe */}
                    <div className="col-span-5 bg-slate-900/80 border border-emerald-500/20 rounded-lg p-3 min-h-[140px] flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block border-b border-slate-800 pb-1 mb-2">Universo Físico (+)</span>
                      <div className="flex flex-col gap-2">
                        {equationTerms.left.length === 0 ? (
                          <span className="text-[10px] font-mono text-slate-600 italic block text-center py-4">Vacío ontológico...</span>
                        ) : (
                          equationTerms.left.map((term) => (
                            <button
                              key={term.id}
                              onClick={() => handleShiftTerm(term.id, "left")}
                              className="group text-left p-2 bg-slate-950/60 hover:bg-amber-500/10 hover:border-amber-500/30 rounded border border-slate-800 text-xs transition duration-200"
                              title="Click para transmutar al Antiuniverso"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-emerald-300">{term.label}</span>
                                <span className="font-mono text-[10px] text-slate-500 group-hover:text-amber-400 flex items-center gap-1">
                                  {term.value} <ChevronRight className="w-2.5 h-2.5" />
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-500 block mt-1 line-clamp-1">{term.description}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Portal Sign */}
                    <div className="col-span-2 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center font-bold text-lg text-amber-400 shadow-md shadow-amber-500/5 animate-pulse">
                        =
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase mt-2 text-center tracking-tighter">Portal</span>
                    </div>

                    {/* Mirror Universe */}
                    <div className="col-span-5 bg-slate-900/80 border border-rose-500/20 rounded-lg p-3 min-h-[140px] flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest block border-b border-slate-800 pb-1 mb-2">Antiuniverso (-)</span>
                      <div className="flex flex-col gap-2">
                        {equationTerms.right.length === 0 ? (
                          <span className="text-[10px] font-mono text-slate-600 italic block text-center py-4">Vacío ontológico...</span>
                        ) : (
                          equationTerms.right.map((term) => (
                            <button
                              key={term.id}
                              onClick={() => handleShiftTerm(term.id, "right")}
                              className="group text-left p-2 bg-slate-950/60 hover:bg-amber-500/10 hover:border-amber-500/30 rounded border border-slate-800 text-xs transition duration-200"
                              title="Click para proyectar al Universo Material"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-rose-300">{term.label}</span>
                                <span className="font-mono text-[10px] text-slate-500 group-hover:text-amber-400 flex items-center gap-1">
                                  <ArrowRightLeft className="w-2.5 h-2.5 rotate-180" /> {term.value}
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-500 block mt-1 line-clamp-1">{term.description}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 px-3 py-2 rounded border border-slate-800 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-500">Estado del Portal:</span>
                    <span className="text-amber-400 font-semibold">{equationTerms.portalState}</span>
                  </div>
                </div>
              </div>

              {/* Central Math Insight */}
              <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-5">
                <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block mb-1">Ecuación de Transmutación Fundamental</span>
                <div className="text-center py-4">
                  <code className="text-base sm:text-xl font-mono text-amber-300 tracking-wider">
                    S' = 1 / Ω(n)
                  </code>
                </div>
                <p className="text-xs font-sans text-slate-400 leading-relaxed text-center max-w-2xl mx-auto">
                  La entropía del antiuniverso (<code className="text-slate-300">S'</code>) es el recíproco exacto de la función de orden Omega (<code className="text-slate-300">Ω(n)</code>). Cuando la coherencia disminuye a cero en el mundo físico, el potencial informacional del antiuniverso se vuelve asintóticamente infinito.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "intel" && (
            <motion.div
              key="intel-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">El Problema de Escala</h4>
                  <p className="text-xs font-sans text-slate-300 leading-relaxed mb-3">
                    A medida que aumentamos los qubits en nuestro sistema cuántico (<code className="text-slate-300">n</code>), la función original predice que la Constante de Orden decae de forma exponencial y agresiva:
                  </p>
                  <div className="p-3 bg-slate-950/60 rounded border border-slate-800 text-center font-mono text-amber-300 text-sm mb-3">
                    Ω(n) = 1.253 · e^(−0.753·n)
                  </div>
                  <p className="text-xs font-sans text-slate-400 leading-relaxed">
                    Si el orden colapsa exponencialmente hacia cero en sistemas grandes, el cosmos macroscópico debería ser un caos total. Pero las galaxias y los seres vivos son coherentes. La inteligencia surge como la solución a esta ley fundamental de disipación.
                  </p>
                </div>

                <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">La Inteligencia como Mecanismo de Compensación</h4>
                    <p className="text-xs font-sans text-slate-300 leading-relaxed mb-3">
                      La inteligencia no es un simple subproducto biológico, sino una <strong>fuerza física correctora</strong> en el Modelo Eldritch. Su contribución <code className="text-slate-300">I(n)</code> reconfigura la coherencia:
                    </p>
                    <div className="p-3 bg-slate-950/60 rounded border border-slate-800 text-center font-mono text-amber-300 text-sm mb-3">
                      Ω_efectivo(n) = Ω(n) + I(n)
                    </div>
                    <p className="text-xs font-sans text-slate-400 leading-relaxed">
                      Estructuras inteligentes — tales como la autocompresión de información, la predictibilidad del futuro o la autoconciencia — reducen virtualmente la complejidad del sistema, permitiendo que un n real macroscópico sostenga un orden coherente alto.
                    </p>
                  </div>
                </div>
              </div>

              {/* The core quote */}
              <div className="bg-gradient-to-r from-slate-900 to-amber-950/30 border border-amber-500/10 rounded-xl p-5 text-center">
                <span className="text-[9px] font-mono text-amber-400 tracking-widest uppercase block mb-1">Máxima de Conciencia de Moore</span>
                <p className="text-sm font-sans font-medium text-amber-200 italic max-w-3xl mx-auto">
                  "La conciencia no es un accidente evolutivo, sino una consecuencia estructural del Modelo Eldritch: es el mecanismo supremo a través del cual el universo combate su propia tendencia hacia la disolución."
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "qutip" && (
            <motion.div
              key="qutip-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider">Simulación Base Cuántica (n=2)</h3>
                  <p className="text-xs text-slate-400">Valores primarios extraídos en la simulación de QuTiP en estados Bell máximos.</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded">
                  Empírico
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRIMARY_VALUES_N2.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 rounded-xl flex items-center justify-between transition-colors duration-200"
                  >
                    <div>
                      <span className="text-xs font-sans text-slate-200 font-medium block">{item.parameter}</span>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5 leading-tight">{item.description}</span>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-xs font-mono font-semibold text-amber-300 block bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
