"use client";
import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { people, initialMatches } from "@/lib/demo-data";
import { Search, MessageCircle, AudioLines } from "lucide-react";

export default function MatchesPage() {
  const [query,setQuery] = useState("");
  const matches = people.filter(p=>initialMatches.includes(p.id) && p.name.toLowerCase().includes(query.toLowerCase()));
  return <AppShell><div className="mb-9"><p className="eyebrow">WHERE IT GETS INTERESTING</p><h1 className="display-title mt-2">Your people<span className="text-white/35">.</span></h1><p className="mt-3 text-sm text-white/45">Good conversations start here.</p></div>
    <label className="flex items-center gap-3 border-b border-white/20 py-3 text-white/50 focus-within:border-white"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a connection" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"/></label>
    <div className="mt-8 flex gap-5 overflow-x-auto pb-3">{people.filter(p=>initialMatches.includes(p.id)).map(p=><Link href={`/chat/${p.id}`} key={p.id} className="min-w-[76px] text-center"><span className="relative mx-auto block h-[70px] w-[70px] rounded-full p-[2px] ring-1 ring-white/50"><img src={p.image} alt="" className="h-full w-full rounded-full object-cover"/>{p.online && <i className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-white"/>}</span><span className="mt-2 block text-xs font-semibold">{p.name}</span></Link>)}</div>
    <div className="mt-8"><p className="eyebrow mb-3">MESSAGES</p>{matches.map((p,i)=><Link href={`/chat/${p.id}`} key={p.id} className="flex items-center gap-4 border-b border-white/[0.09] py-5 transition hover:bg-white/[0.025]"><img src={p.image} alt="" className="h-14 w-14 rounded-full object-cover"/><span className="min-w-0 flex-1"><span className="block font-bold">{p.name}</span><span className="mt-1 block truncate text-sm text-white/45">{i===0?"You: that sounds like a plan.":"Send the first hello…"}</span></span><span className="text-white/40"><MessageCircle size={18}/></span></Link>)}
    {matches.length===0 && <p className="py-10 text-sm text-white/45">No connections match that search.</p>}</div>
    <p className="mt-8 flex items-center gap-2 text-xs text-white/35"><AudioLines size={14}/> Voice intros make first messages less awkward.</p>
  </AppShell>;
}
