/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Terminal, Cpu, Info, Check, AlertCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_MESSAGES = (): ChatMessage[] => [
  {
    id: "init",
    role: "model",
    text: `🌑⚡ **[SISTEMA DE INICIALIZACIÓN: ELDRITCH REALITY BUILDER]**

Bienvenido, viajero. He activado los canales cuánticos para explorar la arquitectura de sus realidades posibles mediante la técnica de **historia contrafactual aplicada**.

Para trazar un mapa de probabilidad existencial acorde a usted y construir realidades hechas a su medida, debemos iniciar una **Inmersión de Datos** en 3 fases.

**FASE 1: El Origen de su Consciencia**
¿Cuál de estos entornos define mejor la atmósfera de su infancia y moldeó su percepción del mundo?

(A) Un santuario de libros, silencio y debates racionales intensos.
(B) La naturaleza indómita, bosques hondos, tierra fértil y los susurros del viento.
(C) El latido de la gran urbe, luces de neón parpadeantes y asfalto húmedo.
(D) El calor familiar protector, tradiciones arraigadas y un camino seguro y predecible.
(E) El movimiento constante, mudanzas recurrentes, viajes y un sutil desarraigo geográfico.`,
    timestamp: new Date().toLocaleTimeString()
  }
];

function parseOptions(text: string): { key: string; text: string }[] {
  const options: { key: string; text: string }[] = [];
  const keysFound = new Set<string>();
  const lines = text.split("\n");
  for (const line of lines) {
    const match = line.match(/^\s*[\-\*•]?\s*\(([A-E])\)\s+(.+)$/i);
    if (match) {
      const key = match[1].toUpperCase();
      if (!keysFound.has(key)) {
        keysFound.add(key);
        const textVal = match[2].replace(/^\[|\]$/g, '').trim();
        options.push({ key, text: textVal });
      }
    } else {
      const matchDot = line.match(/^\s*[\-\*•]?\s*([A-E])\.\s+(.+)$/i);
      if (matchDot) {
        const key = matchDot[1].toUpperCase();
        if (!keysFound.has(key)) {
          keysFound.add(key);
          const textVal = matchDot[2].replace(/^\[|\]$/g, '').trim();
          options.push({ key, text: textVal });
        }
      }
    }
  }
  return options;
}

export default function EldritchThinkingCore() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES());
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSimulated, setIsSimulated] = useState<boolean | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const lastMessageOptions = lastMessage && lastMessage.role === "model" && !loading 
    ? parseOptions(lastMessage.text) 
    : [];

  const handleOptionClick = (option: { key: string; text: string }) => {
    handleSendMessage(`Alternativa (${option.key}): ${option.text}`);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSimulated(data.isSimulated);
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            role: "model",
            text: data.text,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      } else {
        throw new Error(data.error || "Failed response");
      }
    } catch (error) {
      console.error("Thinking core error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          role: "model",
          text: "Error de sintonización cuántica: No se pudo enlazar la comunicación. Verifique si la clave GEMINI_API_KEY está configurada en la plataforma.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES());
    setIsSimulated(null);
  };

  return (
    <div id="thinking-core-root" className="bg-black/5 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20 text-neutral-100 flex flex-col h-[720px] w-full">
      
      {/* Header - Pristine and minimal */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-amber-500/80 flex items-center gap-2 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Terminal de Consonancia
        </h3>

        <button
          onClick={clearChat}
          className="p-1.5 hover:bg-white/10 text-neutral-500 hover:text-rose-400 rounded-lg transition"
          title="Limpiar"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Area */}
      <div id="chat-messages" className="flex-1 overflow-y-auto mb-4 pr-2 space-y-3 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
            <span className="text-xs font-mono tracking-widest text-neutral-500">SYSTEM IDLE</span>
            <span className="text-[10px] text-neutral-600 font-sans mt-1">Introduzca un evento específico para comenzar la ingeniería de realidad...</span>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl border text-xs font-sans leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white/10 border-white/20 text-neutral-200 rounded-br-none"
                    : "bg-black/30 border-amber-500/20 text-neutral-300 rounded-bl-none shadow-lg shadow-black/10"
                }`}
              >
                {msg.role === "model" && (
                  <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-1">
                    System Core
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-start"
            >
              <div className="bg-black/30 border border-white/10 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Options list - sleek, translucent, and fully visible */}
      {lastMessageOptions.length > 0 && (
        <div className="mb-4 space-y-1.5 animate-fade-in max-h-[180px] overflow-y-auto pr-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-amber-500/60 mb-1 px-1">
            Alternativas de decisión disponibles:
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {lastMessageOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => handleOptionClick(option)}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-amber-500/[0.08] active:bg-amber-500/[0.12] border border-white/5 hover:border-amber-500/30 text-neutral-300 hover:text-amber-100 transition duration-150 backdrop-blur-md flex items-start gap-2.5 group shadow-md"
              >
                <span className="flex-shrink-0 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:border-amber-500/40 transition">
                  {option.key}
                </span>
                <span className="text-[11px] leading-relaxed font-sans">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        id="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex gap-2"
      >
        <input
          id="input-chat-text"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={lastMessageOptions.length > 0 ? "Selecciona una alternativa arriba o escribe una alteración..." : "introducir un evento..."}
          className="flex-1 bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/10 hover:border-white/20 focus:border-amber-500/40 rounded-xl px-4 py-3 text-xs font-sans text-neutral-200 placeholder-neutral-500 outline-none transition"
        />
        <button
          id="btn-chat-send"
          type="submit"
          disabled={!inputText.trim() || loading}
          className="px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/15 hover:border-amber-500/35 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-35 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
