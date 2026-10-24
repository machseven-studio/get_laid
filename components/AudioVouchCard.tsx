"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Pause, Play } from "lucide-react";
type AudioVouchCardProps = { title: string; subtitle?: string; audioUrl?: string | null };

export function AudioVouchCard({ title, subtitle, audioUrl }: AudioVouchCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { const audio = audioRef.current; if (!audio) return; const onEnded = () => setPlaying(false); audio.addEventListener("ended", onEnded); return () => { audio.pause(); audio.removeEventListener("ended", onEnded); }; }, [audioUrl]);
  async function togglePlayback() {
    const audio = audioRef.current; if (!audio) return;
    if (audio.paused) { try { await audio.play(); setPlaying(true); } catch { setPlaying(false); } }
    else { audio.pause(); setPlaying(false); }
  }
  return <article className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-200/10 text-orange-200"><Mic size={18} aria-hidden="true"/></div>
    <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold">{title}</h3>{subtitle ? <p className="mt-1 text-xs text-white/55">{subtitle}</p> : null}</div>
    {audioUrl ? <><audio ref={audioRef} src={audioUrl} preload="none"/><button type="button" onClick={togglePlayback} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10" aria-label={playing ? "Pause audio vouch" : "Play audio vouch"}>{playing ? <Pause size={16}/> : <Play size={16}/>}</button></> : <span className="text-xs text-white/40">No audio</span>}
  </article>;
}
