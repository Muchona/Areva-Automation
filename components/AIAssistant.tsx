import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2, Sparkles, Mic, Waves } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { ChatMessage, MessageRole } from '../types.ts';
import { getWarehouseAdvice, SYSTEM_INSTRUCTION } from '../services/geminiService.ts';

interface AIAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: MessageRole.MODEL, text: "Welcome to Areva. I'm your voice-enabled warehouse consultant. How can I assist you with your ASRS project today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioSources = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, transcription]);

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.close();
      }
      audioSources.current.forEach(s => {
        try { s.stop(); } catch(e) {}
      });
    };
  }, []);

  const encode = (bytes: Uint8Array) => {
    let b = '';
    for (let i = 0; i < bytes.byteLength; i++) b += String.fromCharCode(bytes[i]);
    return btoa(b);
  };

  const decode = (base64: string) => {
    const s = atob(base64);
    const b = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const d = new Int16Array(data.buffer);
    const count = d.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, count, sampleRate);
    for (let c = 0; c < numChannels; c++) {
      const channel = buffer.getChannelData(c);
      for (let i = 0; i < count; i++) channel[i] = d[i * numChannels + c] / 32768.0;
    }
    return buffer;
  };

  const startVoiceSession = async () => {
    try {
      setIsVoiceMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      let nextStartTime = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const script = inputCtx.createScriptProcessor(4096, 1, 1);
            script.onaudioprocess = (e) => {
              const data = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(data.length);
              for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
              sessionPromise.then(s => {
                if (s) s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(script);
            script.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.onended = () => audioSources.current.delete(source);
              audioSources.current.add(source);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
            }
            if (msg.serverContent?.interrupted) {
              audioSources.current.forEach(s => { try { s.stop(); } catch(e) {} });
              audioSources.current.clear();
              nextStartTime = 0;
            }
            const partText = msg.serverContent?.modelTurn?.parts?.[0]?.text;
            if (partText) {
              setTranscription(prev => prev + partText);
            }
          },
          onclose: () => setIsVoiceMode(false),
          onerror: (e) => console.error("Live API Error:", e)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          outputAudioTranscription: {}
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error("Voice Hardware Fault:", e);
      setIsVoiceMode(false);
    }
  };

  const stopVoiceSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsVoiceMode(false);
    setTranscription('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: MessageRole.USER, text: msg }]);
    setIsLoading(true);
    const res = await getWarehouseAdvice(messages, msg);
    setMessages(prev => [...prev, { role: MessageRole.MODEL, text: res }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-brandRed text-black p-5 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      ) : (
        <div className="bg-slate-900 rounded-[32px] shadow-3xl w-[380px] sm:w-[420px] flex flex-col border border-slate-800 animate-in fade-in zoom-in slide-in-from-bottom-10">
          <div className="bg-slate-950 p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center space-x-3">
              <div className="bg-brandRed p-2 rounded-xl"><Bot className="w-5 h-5 text-black" /></div>
              <div>
                <p className="font-black text-[10px] uppercase tracking-widest text-white">Areva Expert</p>
                <div className="flex items-center space-x-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isVoiceMode ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{isVoiceMode ? 'Live Consultation' : 'System Ready'}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
          </div>

          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-6 bg-slate-950/50">
            {isVoiceMode ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                   <div className="absolute -inset-12 bg-brandRed/20 rounded-full blur-3xl animate-pulse"></div>
                   <Waves className="w-16 h-16 text-brandRed relative animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                   <p className="text-white font-black uppercase text-xs tracking-widest">Consultant Listening</p>
                   {transcription && <p className="text-slate-400 text-xs italic leading-relaxed">"{transcription}"</p>}
                </div>
                <button onClick={stopVoiceSession} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">End Call</button>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === MessageRole.USER ? 'bg-brandRed text-black rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'}`}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl flex items-center space-x-3">
                  <Loader2 className="w-4 h-4 animate-spin text-brandRed" />
                  <span className="text-[10px] font-black uppercase text-slate-500">Processing...</span>
                </div>
              </div>
            )}
          </div>

          {!isVoiceMode && (
            <div className="p-6 bg-slate-900 border-t border-white/5 flex space-x-3">
              <button onClick={startVoiceSession} className="bg-slate-800 p-4 rounded-2xl text-slate-400 hover:text-brandRed transition-all"><Mic className="w-5 h-5" /></button>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about ASRS density..." className="flex-grow bg-slate-950 rounded-2xl px-6 py-4 text-sm font-medium outline-none text-white border-none" />
              <button onClick={handleSend} disabled={isLoading} className="bg-brandRed text-black p-4 rounded-2xl hover:bg-brandRed/90 disabled:opacity-50"><Send className="w-5 h-5" /></button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;