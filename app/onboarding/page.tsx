"use client";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, ArrowRight, Check } from "lucide-react";

const interests = ["Live music","Coffee","Travel","Fitness","Books","Food","Photography","Art","Ocean","Movies","Dogs","Design"];
export default function OnboardingPage() {
  const [step,setStep] = useState(0);
  const [name,setName] = useState("");
  const [selected,setSelected] = useState<string[]>([]);
  const [intent,setIntent] = useState("A meaningful connection");
  const toggle=(interest:string)=>setSelected(v=>v.includes(interest)?v.filter(x=>x!==interest):v.length<5?[...v,interest]:v);
  return <main className="min-h-screen bg-black px-5 py-8 text-white sm:px-8"><div className="mx-auto max-w-xl"><Link href="/" className="flex items-center gap-2 text-sm font-extrabold tracking-tight"><Sparkles size={17}/> spark & vouch</Link><div className="mt-12 h-px bg-white/10"><div className="h-px bg-white transition-all" style={{width:`${(step+1)/3*100}%`}}/></div><p className="eyebrow mt-8">LET'S MAKE THIS YOURS · 0{step+1}/03</p>
    {step===0&&<section className="mt-6"><h1 className="display-title">First things first.</h1><p className="mt-4 text-sm leading-6 text-white/50">What should we call you?</p><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Your first name" className="mt-8 w-full border-b border-white/25 bg-transparent py-4 text-2xl font-bold outline-none placeholder:text-white/25 focus:border-white"/></section>}
    {step===1&&<section className="mt-6"><h1 className="display-title">What feels like you?</h1><p className="mt-4 text-sm text-white/50">Pick up to five things you love.</p><div className="mt-8 flex flex-wrap gap-2">{interests.map(i=><button key={i} onClick={()=>toggle(i)} className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${selected.includes(i)?"border-white bg-white text-black":"border-white/20 text-white/70 hover:border-white/60"}`}>{selected.includes(i)&&<Check size={13} className="mr-1 inline"/>}{i}</button>)}</div></section>}
    {step===2&&<section className="mt-6"><h1 className="display-title">What are you open to?</h1><p className="mt-4 text-sm text-white/50">No pressure. Just a starting point.</p><div className="mt-8 space-y-3">{["A meaningful connection","Meeting new people","Let’s see where it goes"].map(x=><button key={x} onClick={()=>setIntent(x)} className={`flex w-full items-center justify-between border-b py-5 text-left font-bold ${intent===x?"border-white text-white":"border-white/15 text-white/50"}`}>{x}<span>{intent===x?"✓":""}</span></button>)}</div></section>}
    <div className="mt-12 flex items-center justify-between"><Link href="/" className="text-sm text-white/45 hover:text-white">Back to home</Link>{step<2?<button disabled={step===0&&!name.trim()} onClick={()=>setStep(s=>s+1)} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black disabled:opacity-30">Continue <ArrowRight size={15}/></button>:<Link href="/discover" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black">Explore Spark <ArrowRight size={15}/></Link>}</div>
  </div></main>;
}
