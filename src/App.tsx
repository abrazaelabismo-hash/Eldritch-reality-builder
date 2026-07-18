/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import EldritchThinkingCore from "./components/EldritchThinkingCore";
import eldritchBg from "./assets/images/eldritch_background_1783824462816.jpg";

export default function App() {
  return (
    <div id="app-container" className="relative min-h-screen bg-black text-neutral-200 font-sans flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-neutral-800 selection:text-neutral-100 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={eldritchBg}
          alt="Eldritch Background"
          className="w-full h-full object-cover opacity-90 filter brightness-90 contrast-110"
          referrerPolicy="no-referrer"
        />
        {/* Radial dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_rgba(0,0,0,0.65)_100%)]"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        {/* Imposing, atmospheric title */}
        <div className="text-center mb-6 select-none pointer-events-none animate-fade-in">
          <div className="inline-block px-3 py-1 mb-2.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-[9px] font-mono tracking-[0.25em] text-amber-400 uppercase animate-pulse">
            NÚCLEO DE RESONANCIA ACTIVO
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 via-neutral-100 to-amber-200/90 drop-shadow-[0_4px_16px_rgba(245,158,11,0.18)] leading-tight">
            Eldritch Reality Builder
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-amber-500/40"></span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">SYSTEM DECREE INTERFACE</span>
            <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-amber-500/40"></span>
          </div>
        </div>

        <div className="w-full">
          <EldritchThinkingCore />
        </div>
      </div>
    </div>
  );
}

