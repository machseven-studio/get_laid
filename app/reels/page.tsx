"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { people } from "@/lib/demo-data";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, Bookmark, ChevronUp, ChevronDown, Send, Sparkles } from "lucide-react";

export default function ReelsPage() {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [liked,setLiked] = useState<string[]>([]);
  const [saved,setSaved] = useState<string[]>([]);
  const [muted,setMuted] = useState(true);
  const [commentFor,setCommentFor] = useState<string | null>(null);
  const [comment,setComment] = useState("");
  const [comments,setComments] = useState<Record<string,string[]>>({});
  const [toast,setToast] = useState("");
  const reels = people.map((person,i)=>({...person, caption:[
    "A little glimpse of my kind of weekend.",
    "Convince me your favourite city spot is worth the hype.",
    "The best kind of chemistry starts with a good conversation.",
    "Currently accepting recommendations for my next adventure."
  ][i % 4]}));

  function toggle(list:string[],setList:(v:string[])=>void,id:string) {
    setList(list.includes(id)?list.filter(x=>x!==id):[...list,id]);
  }
  function share(personName:string) {
    const text = "Meet "+personName+" on Spark & Vouch";
    if (navigator.share) navigator.share({title:"Spark & Vouch",text}).catch(()=>setToast("Share cancelled"));
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(()=>setToast("Share text copied")).catch(()=>setToast(text));
    else setToast(text);
  }
  function next(direction:number) {
    const container=feedRef.current;
    if(!container) return;
    const items=container.querySelectorAll<HTMLElement>("[data-reel]");
    const current=Array.from(items).findIndex(el=>el.getBoundingClientRect().top>=container.getBoundingClientRect().top-5);
    const target=Math.max(0,Math.min(items.length-1,(current<0?0:current)+direction));
    items[target]?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function addComment(id:string) {
    const value=comment.trim(); if(!value) return;
    setComments(prev=>({...prev,[id]:[...(prev[id]??[]),value]})); setComment(""); setCommentFor(null);
  }

  return <AppShell>
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div><p className="eyebrow">MEET THEM IN MOTION</p><h1 className="display-title mt-2">Reels<span className="text-white/35">.</span></h1><p className="mt-2 text-sm text-white/45">Little moments. Real people. Your next spark.</p></div>
        <button onClick={()=>setMuted(v=>!v)} className="mb-1 flex items-center gap-2 text-xs font-semibold text-white/55 hover:text-white" aria-label={muted?"Unmute reel previews":"Mute reel previews"}>{muted?<VolumeX size={16}/>:<Volume2 size={16}/>}<span className="hidden sm:inline">{muted?"Sound off":"Sound on"}</span></button>
      </div>
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_42px]">
        <div ref={feedRef} className="reel-feed h-[min(72dvh,760px)] min-h-[470px] snap-y snap-mandatory overflow-y-auto overscroll-contain rounded-[1.6rem] bg-zinc-950 md:h-[min(76dvh,780px)]" aria-label="Scrollable reels feed">
          {reels.map((person,i)=><article key={person.id} data-reel className="relative isolate h-full min-h-full snap-start snap-always overflow-hidden bg-zinc-900">
            <img src={person.image} alt={person.name+" profile reel preview"} className="absolute inset-0 -z-20 h-full w-full object-cover" loading={i<2?"eager":"lazy"}/>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-transparent to-black/90"/>
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between"><span className="rounded-full bg-black/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur-sm">For you · {i+1}/{reels.length}</span><Sparkles size={18}/></div>
            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 p-5 sm:p-7">
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-white/65">{person.city} · {person.distance}</p>
                <h2 className="text-3xl font-extrabold tracking-[-.06em]">{person.name}, {person.age}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/85">{person.caption}</p>
                <p className="mt-2 max-w-md text-xs leading-5 text-white/60">{person.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">{person.tags.slice(0,3).map(tag=><span key={tag} className="text-[10px] font-semibold text-white/75">#{tag.replaceAll(" ","")}</span>)}</div>
                <div className="mt-5 flex flex-wrap items-center gap-3"><button onClick={()=>toggle(liked,setLiked,person.id)} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-extrabold text-black transition active:scale-95"><Heart size={16} fill={liked.includes(person.id)?"currentColor":"none"}/>{liked.includes(person.id)?"Liked":"Like"}</button><Link href={`/chat/${person.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-4 py-3 text-xs font-bold backdrop-blur-sm hover:bg-white/10"><MessageCircle size={15}/> Say hello</Link></div>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-5 pb-1">
                <button onClick={()=>toggle(liked,setLiked,person.id)} aria-label={liked.includes(person.id)?"Unlike":"Like"} className="flex flex-col items-center gap-1 text-white drop-shadow"><Heart size={25} fill={liked.includes(person.id)?"white":"none"}/><span className="text-[10px] font-bold">{liked.includes(person.id)?"Liked":"Like"}</span></button>
                <button onClick={()=>setCommentFor(person.id)} aria-label="Comments" className="flex flex-col items-center gap-1 drop-shadow"><MessageCircle size={24}/><span className="text-[10px] font-bold">{(comments[person.id]??[]).length}</span></button>
                <button onClick={()=>share(person.name)} aria-label="Share profile" className="flex flex-col items-center gap-1 drop-shadow"><Share2 size={23}/><span className="text-[10px] font-bold">Share</span></button>
                <button onClick={()=>toggle(saved,setSaved,person.id)} aria-label={saved.includes(person.id)?"Unsave profile":"Save profile"} className="flex flex-col items-center gap-1 drop-shadow"><Bookmark size={22} fill={saved.includes(person.id)?"white":"none"}/><span className="text-[10px] font-bold">{saved.includes(person.id)?"Saved":"Save"}</span></button>
              </div>
            </div>
            {commentFor===person.id&&<div className="absolute inset-0 z-20 flex items-end bg-black/65 p-4 backdrop-blur-sm"><div className="w-full rounded-2xl bg-zinc-950 p-4"><div className="mb-3 flex items-center justify-between"><p className="font-extrabold">Say something kind</p><button onClick={()=>setCommentFor(null)} className="text-sm text-white/50">Close</button></div>{(comments[person.id]??[]).map((c,j)=><p key={j} className="border-t border-white/10 py-2 text-sm text-white/70">{c}</p>)}<form onSubmit={e=>{e.preventDefault();addComment(person.id)}} className="mt-2 flex gap-2 border-t border-white/10 pt-3"><input autoFocus value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a comment…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35"/><button type="submit" disabled={!comment.trim()} className="text-white disabled:opacity-30"><Send size={18}/></button></form></div></div>}
          </article>)}
        </div>
        <div className="hidden flex-col items-center justify-center gap-3 md:flex"><button onClick={()=>next(-1)} aria-label="Previous reel" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 hover:bg-white/10"><ChevronUp size={18}/></button><button onClick={()=>next(1)} aria-label="Next reel" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 hover:bg-white/10"><ChevronDown size={18}/></button></div>
      </div>
      <p className="mt-4 text-center text-[10px] text-white/30">Scroll to move between profiles · Demo photos and profiles · Not real video clips</p>
      {toast&&<button onClick={()=>setToast("")} role="status" className="mt-3 text-xs text-white/70">{toast} · dismiss</button>}
    </div>
  </AppShell>;
}
