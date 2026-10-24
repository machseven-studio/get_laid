"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { people, Person } from "@/lib/demo-data";
import { Heart, X, SlidersHorizontal, MapPin, AudioLines, Sparkles, RotateCcw } from "lucide-react";

export default function DiscoverPage() {
  const [index,setIndex] = useState(0);
  const [likes,setLikes] = useState<string[]>(["maya","isha"]);
  const [passed,setPassed] = useState<string[]>([]);
  const [filter,setFilter] = useState("For you");
  const person = people[index % people.length];
  const [notice,setNotice] = useState("");
  const advance = (liked:boolean) => {
    if(liked) setLikes(prev => prev.includes(person.id) ? prev : [...prev,person.id]);
    else setPassed(prev => [...prev,person.id]);
    setNotice(liked ? `You liked ${person.name}. Nice choice.` : "On to the next.");
    setIndex(v => v + 1);
  };
  const current = useMemo(() => person,[person]);
  return <AppShell>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">YOUR NEXT CHAPTER</p><h1 className="display-title mt-2">Meet someone <span className="text-white/45">different.</span></h1><p className="mt-3 text-sm text-white/45">Good chemistry starts with being curious.</p></div>
      <button onClick={()=>setFilter(filter==="For you"?"Nearby":"For you")} className="inline-flex items-center gap-2 pb-1 text-xs font-semibold text-white/65 hover:text-white"><SlidersHorizontal size={15}/>{filter}</button>
    </div>
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.72fr)] lg:items-center">
      <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-zinc-900 sm:min-h-[580px]">
        <img key={current.id} src={current.image} alt={`${current.name}'s profile`} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/5"/>
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur-md"><Sparkles size={12}/> Today's pick</div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-2 text-xs text-white/75"><MapPin size={13}/>{current.city} · {current.distance}</div>
          <h2 className="text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">{current.name}, {current.age}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/80">{current.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">{current.tags.map(tag=><span key={tag} className="rounded-full border border-white/30 px-3 py-1.5 text-[11px] font-semibold backdrop-blur-sm">{tag}</span>)}</div>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={()=>advance(false)} aria-label="Pass profile" className="grid h-14 w-14 place-items-center rounded-full border border-white/35 bg-black/30 transition hover:bg-white/10"><X size={23}/></button>
            <button onClick={()=>advance(true)} aria-label="Like profile" className="grid h-14 w-14 place-items-center rounded-full bg-white text-black transition hover:scale-105"><Heart size={22} fill="currentColor"/></button>
            <button onClick={()=>setNotice(current.voice ?? "Voice intro coming soon.")} className="ml-1 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/25 px-4 py-3 text-xs font-bold backdrop-blur-sm hover:bg-white/10"><AudioLines size={16}/> Hear their vibe</button>
          </div>
        </div>
      </div>
      <aside className="space-y-8">
        <div><p className="eyebrow">A LITTLE MORE THAN A PHOTO</p><h3 className="section-title mt-3">Start with the story.</h3><p className="mt-3 text-sm leading-6 text-white/50">“{current.prompt}”</p><p className="mt-1 text-lg font-bold leading-7">{current.answer}</p></div>
        <div className="rule"/>
        <div><p className="eyebrow">YOUR ACTIVITY</p><div className="mt-4 flex items-baseline gap-3"><span className="text-4xl font-extrabold tracking-tight">{likes.length}</span><span className="text-sm text-white/45">people you’ve liked</span></div><p className="mt-2 text-xs text-white/35">Your likes are saved for this demo session.</p></div>
        <button onClick={()=>{setIndex(0);setNotice("");}} className="inline-flex items-center gap-2 text-xs font-bold text-white/55 hover:text-white"><RotateCcw size={14}/> Start discovery again</button>
        {notice && <p role="status" className="border-l border-white/50 pl-3 text-sm text-white/70">{notice}</p>}
      </aside>
    </div>
  </AppShell>;
}
