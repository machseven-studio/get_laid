"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { people } from "@/lib/demo-data";
import { Heart, X, SlidersHorizontal, MapPin, AudioLines, Sparkles, RotateCcw, Check, Info } from "lucide-react";

export default function DiscoverPage() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<string[]>([]);
  const [passed, setPassed] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [city, setCity] = useState("All cities");
  const [intent, setIntent] = useState("Everyone");
  const [notice, setNotice] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const candidates = useMemo(() => people.filter((p) =>
    (city === "All cities" || p.city === city) &&
    (intent === "Everyone" || p.tags.includes(intent))
  ), [city, intent]);
  const person = candidates.length ? candidates[index % candidates.length] : null;

  function advance(liked: boolean) {
    if (!person) return;
    if (liked) {
      setLikes((prev) => prev.includes(person.id) ? prev : [...prev, person.id]);
      setNotice(`You liked ${person.name}. Your interest is saved in this demo session.`);
    } else {
      setPassed((prev) => prev.includes(person.id) ? prev : [...prev, person.id]);
      setNotice("Passed. You can keep exploring.");
    }
    setShowDetails(false);
    setIndex((v) => v + 1);
  }

  return <AppShell>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">MEET SOMEONE NEW</p><h1 className="display-title mt-2">Your next spark<span className="text-white/35">.</span></h1><p className="mt-2 text-sm text-white/45">A profile is more than a first impression.</p></div>
      <button onClick={() => setFilterOpen((v) => !v)} aria-expanded={filterOpen} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white/75 transition hover:border-white/40 hover:text-white"><SlidersHorizontal size={15}/> Filters</button>
    </div>

    {filterOpen && <section className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:grid-cols-2" aria-label="Discovery filters">
      <label className="text-xs font-semibold text-white/60">City<select value={city} onChange={(e) => { setCity(e.target.value); setIndex(0); }} className="mt-2 block w-full rounded-xl border border-white/15 bg-zinc-950 px-3 py-3 text-sm text-white outline-none focus:border-rose-200"><option>All cities</option><option>Mumbai</option></select></label>
      <label className="text-xs font-semibold text-white/60">Shared interest<select value={intent} onChange={(e) => { setIntent(e.target.value); setIndex(0); }} className="mt-2 block w-full rounded-xl border border-white/15 bg-zinc-950 px-3 py-3 text-sm text-white outline-none focus:border-rose-200"><option>Everyone</option>{Array.from(new Set(people.flatMap((p) => p.tags))).sort().map((tag) => <option key={tag}>{tag}</option>)}</select></label>
      <p className="flex items-center gap-2 text-[11px] text-white/35 sm:col-span-2"><Info size={13}/> Filters apply to sample profiles in this preview.</p>
    </section>}

    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.68fr)] lg:items-start">
      <section className="min-w-0">
        {person ? <article className="group relative min-h-[540px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-zinc-950 sm:min-h-[650px]">
          <img key={person.id} src={person.image} alt={`Portrait for ${person.name}'s sample profile`} className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.015]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10"/>
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] backdrop-blur-md"><Sparkles size={12}/> Sample profile</div>
          <button onClick={() => setShowDetails((v) => !v)} aria-expanded={showDetails} className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-bold backdrop-blur-md hover:bg-black/65">{showDetails ? "Less info" : "More about"}</button>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="mb-2 flex items-center gap-2 text-xs text-white/75"><MapPin size={13}/>{person.city} · {person.distance}</div>
            <h2 className="text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">{person.name}, {person.age}</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/85">{person.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">{person.tags.map((tag) => <span key={tag} className="rounded-full border border-white/25 bg-black/15 px-3 py-1.5 text-[11px] font-semibold backdrop-blur-sm">{tag}</span>)}</div>
            {showDetails && <div className="mt-4 rounded-xl border border-white/15 bg-black/55 p-4 backdrop-blur-md"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-rose-200/80">{person.prompt}</p><p className="mt-2 text-sm font-semibold leading-6">{person.answer}</p></div>}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={() => advance(false)} aria-label="Pass profile" className="grid h-14 w-14 place-items-center rounded-full border border-white/35 bg-black/35 transition hover:scale-105 hover:bg-white/10"><X size={23}/></button>
              <button onClick={() => advance(true)} aria-label="Like profile" className="grid h-14 w-14 place-items-center rounded-full bg-rose-200 text-black shadow-[0_8px_30px_rgba(223,135,149,.22)] transition hover:scale-105"><Heart size={22} fill="currentColor"/></button>
              <button onClick={() => setNotice(person.voice ?? "No voice introduction added to this sample profile.")} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-3 text-xs font-bold backdrop-blur-sm transition hover:bg-white/10"><AudioLines size={16}/> Voice intro</button>
            </div>
          </div>
        </article> : <div className="grid min-h-[400px] place-items-center rounded-3xl border border-white/10 p-8 text-center"><div><Sparkles className="mx-auto text-rose-200" size={28}/><h2 className="mt-4 text-xl font-extrabold">No profiles in this filter.</h2><p className="mt-2 text-sm text-white/45">Try another interest to keep discovering.</p><button onClick={() => {setCity("All cities");setIntent("Everyone");setIndex(0);}} className="mt-5 rounded-full bg-white px-5 py-3 text-xs font-extrabold text-black">Reset filters</button></div></div>}
        <p className="mt-3 flex items-center gap-2 text-[10px] text-white/30"><Info size={12}/> Demo experience — likes are not sent to another person.</p>
      </section>

      <aside className="space-y-7">
        <div><p className="eyebrow">A LITTLE MORE THAN A PHOTO</p><h3 className="section-title mt-3">Start with the story.</h3>{person ? <><p className="mt-3 text-sm leading-6 text-white/50">“{person.prompt}”</p><p className="mt-1 text-lg font-bold leading-7">{person.answer}</p></> : <p className="mt-3 text-sm text-white/45">Choose a different filter to see a new story.</p>}</div>
        <div className="rule"/>
        <div><p className="eyebrow">YOUR ACTIVITY</p><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 p-4"><span className="text-3xl font-extrabold">{likes.length}</span><p className="mt-1 text-xs text-white/45">Profiles liked</p></div><div className="rounded-2xl border border-white/10 p-4"><span className="text-3xl font-extrabold">{passed.length}</span><p className="mt-1 text-xs text-white/45">Passed</p></div></div><p className="mt-3 text-[11px] text-white/35">Counts reset when this demo session ends.</p></div>
        <button onClick={() => {setIndex(0);setLikes([]);setPassed([]);setNotice("");setShowDetails(false);}} className="inline-flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-white"><RotateCcw size={14}/> Restart discovery</button>
        {notice && <p role="status" aria-live="polite" className="rounded-xl border border-white/10 bg-white/[.03] p-4 text-sm leading-6 text-white/70">{notice}</p>}
        <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.035] p-4"><div className="flex items-center gap-2 text-xs font-bold text-rose-100"><Check size={14}/> Built around mutual interest</div><p className="mt-2 text-xs leading-5 text-white/45">In the live product, a match should only happen when both people express interest.</p></div>
      </aside>
    </div>
  </AppShell>;
}
