import Link from "next/link";
import { AudioLines, HeartHandshake, Sparkles } from "lucide-react";

export default function HomePage() {
  const steps = [
    ["01", "Listen first", "Get a feel for personality through voice."],
    ["02", "Find the spark", "Express interest when the connection feels right."],
    ["03", "Reveal together", "Build trust step by step, together."]
  ];
  return <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 sm:px-10">
    <header className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-200 text-zinc-950"><Sparkles size={20}/></span><span className="text-lg font-bold tracking-tight">Spark <span className="text-orange-200">&</span> Vouch</span></header>
    <section className="grid flex-1 items-center gap-12 py-20 md:grid-cols-[1.1fr_.9fr]">
      <div><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65"><span className="h-2 w-2 rounded-full bg-orange-200"/> A more human way to connect</p>
        <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl">Chemistry is more than a <span className="text-orange-200">swipe.</span></h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg">Get to know the voice, the energy, and the person behind the profile. Make every introduction feel a little more real.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/chat/demo" className="rounded-full bg-orange-200 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-100">Explore a demo</Link><a href="#how-it-works" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/5">How it works</a></div>
      </div>
      <div className="relative mx-auto w-full max-w-sm"><div className="absolute -inset-6 rounded-[2.5rem] bg-orange-200/10 blur-3xl"/><div className="relative space-y-4 rounded-[2rem] border border-white/10 bg-[#151518] p-5 shadow-2xl"><div className="flex items-center justify-between"><span className="text-xs uppercase tracking-[.22em] text-white/40">Your next connection</span><Sparkles size={16} className="text-orange-200"/></div><div className="rounded-2xl bg-gradient-to-br from-orange-100/20 via-rose-200/10 to-transparent p-5"><div className="mb-5 grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/5 text-orange-100"><AudioLines size={30}/></div><p className="text-xl font-semibold">Hear the story.</p><p className="mt-2 text-sm leading-6 text-white/55">A short voice note says what a photo never could.</p></div><div className="flex items-center gap-3 rounded-2xl border border-white/10 p-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-orange-200"><HeartHandshake size={19}/></span><div><p className="text-sm font-semibold">Mutual interest</p><p className="mt-1 text-xs text-white/45">A connection goes both ways.</p></div><span className="ml-auto text-orange-200">✦</span></div></div></div>
    </section>
    <section id="how-it-works" className="grid gap-4 border-t border-white/10 py-8 sm:grid-cols-3">{steps.map(([number, title, description]) => <div key={number} className="rounded-2xl border border-white/10 p-5"><p className="text-xs text-orange-200">{number}</p><h2 className="mt-3 font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-white/55">{description}</p></div>)}</section>
    <footer className="border-t border-white/10 pt-5 text-xs text-white/35">Spark & Vouch · Early concept</footer>
  </main>;
}
