"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { people } from "@/lib/demo-data";
import { Pencil, MapPin, AudioLines, Check } from "lucide-react";

export default function ProfilePage() {
  const [name,setName] = useState("Sam");
  const [bio,setBio] = useState("Here for real conversation, spontaneous plans, and finding the best coffee in town.");
  const [editing,setEditing] = useState(false);
  const [saved,setSaved] = useState(false);
  return <AppShell><div className="mb-9"><p className="eyebrow">YOUR INTRODUCTION</p><h1 className="display-title mt-2">The real you<span className="text-white/35">.</span></h1><p className="mt-3 text-sm text-white/45">A profile should sound like you, not a résumé.</p></div>
    <div className="grid gap-10 md:grid-cols-[260px_1fr]">
      <div><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900"><img src={people[1].image} alt="Demo profile portrait" className="h-full w-full object-cover"/><span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em]">Preview profile</span></div><button onClick={()=>{setEditing(!editing);setSaved(false)}} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"><Pencil size={15}/>{editing?"Finish editing":"Edit profile"}</button></div>
      <div className="space-y-8">
        <div className="border-b border-white/10 pb-6"><p className="eyebrow">BASIC DETAILS</p>{editing?<label className="mt-4 block text-xs text-white/45">Display name<input value={name} onChange={e=>setName(e.target.value)} className="mt-2 block w-full border-b border-white/20 bg-transparent py-3 text-2xl font-extrabold text-white outline-none focus:border-white"/></label>:<h2 className="mt-3 text-3xl font-extrabold tracking-tight">{name}, 25</h2>}<p className="mt-2 flex items-center gap-2 text-sm text-white/45"><MapPin size={14}/> Mumbai, India</p></div>
        <div className="border-b border-white/10 pb-6"><p className="eyebrow">IN YOUR OWN WORDS</p>{editing?<textarea value={bio} onChange={e=>setBio(e.target.value)} rows={4} className="mt-4 w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm leading-6 text-white outline-none focus:border-white"/>:<p className="mt-3 max-w-xl text-base leading-7 text-white/75">{bio}</p>}</div>
        <div className="border-b border-white/10 pb-6"><p className="eyebrow">VOICE INTRO</p><div className="mt-4 flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full border border-white/20"><AudioLines size={20}/></span><div><p className="font-bold">A little about me</p><p className="mt-1 text-xs text-white/40">Your voice, your energy · Demo only</p></div></div></div>
        {editing && <button onClick={()=>{setEditing(false);setSaved(true)}} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-white/85"><Check size={16}/> Save changes</button>}
        {saved && <p role="status" className="text-sm text-white/60">Profile changes saved for this demo.</p>}
      </div>
    </div>
  </AppShell>;
}
