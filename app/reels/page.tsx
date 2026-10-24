"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { people } from "@/lib/demo-data";
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Send, Sparkles, Compass, Clapperboard, UserRound, ArrowLeft } from "lucide-react";
import { useSounds } from "@/components/SoundProvider";

export default function ReelsPage() {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const reelAudio = useRef<HTMLAudioElement | null>(null);
  const sounds = useSounds();
  const [liked,setLiked] = useState<string[]>(["isha"]);
  const [saved,setSaved] = useState<string[]>([]);
  const [muted,setMuted] = useState(true);
  const [commentFor,setCommentFor] = useState<string | null>(null);
  const [comment,setComment] = useState("");
  const [comments,setComments] = useState<Record<string,string[]>>({maya:["That sunset is unreal ✨"],aarav:["Need this playlist."]});
  const [active,setActive] = useState(0);
  const [toast,setToast] = useState("");
  const reels = people.map((person,i)=>({...person,caption:[
    "A little glimpse of my kind of weekend.",
    "Convince me your favourite city spot is worth the hype.",
    "The best kind of chemistry starts with a good conversation.",
    "Currently accepting recommendations for my next adventure."
  ][i%4]}));

  useEffect(()=>{
    const root=feedRef.current;
    if(!root) return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));});
    },{root,threshold:.65});
    root.querySelectorAll("[data-reel]").forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);

  function toggle(id:string,setter:(v:string[])=>void,current:string[]) {
    setter(current.includes(id)?current.filter(x=>x!==id):[...current,id]);
  }
  function like(id:string) { sounds.click(); setLiked(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]); }
  async function toggleSound(){ const audio=reelAudio.current; if(!audio){setMuted(v=>!v);return;} if(muted){setMuted(false);try{await audio.play();}catch{setToast("Tap sound again to start audio.");}}else{setMuted(true);audio.pause();} }
  function share(name:string) {
    const text="Meet "+name+" on Cherry";
    if(navigator.share) navigator.share({title:"Cherry",text}).catch(()=>{});
    else if(navigator.clipboard) navigator.clipboard.writeText(text).then(()=>setToast("Profile share text copied"));
    else setToast(text);
  }
  function submitComment(id:string) {
    const value=comment.trim(); if(!value) return;
    setComments(v=>({...v,[id]:[...(v[id]??[]),value]}));setComment("");setCommentFor(null);
  }
  function move(direction:number) {
    const root=feedRef.current;
    const items=root?.querySelectorAll<HTMLElement>("[data-reel]");
    items?.[Math.max(0,Math.min(reels.length-1,active+direction))]?.scrollIntoView({behavior:"smooth",block:"start"});
  }

  return <main className="reels-immersive fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden bg-black text-white">
    <audio ref={reelAudio} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop preload="none" muted={muted} />
    <div ref={feedRef} className="reels-scroll absolute inset-0 h-full w-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain" aria-label="Full-screen profile reels">
      {reels.map((person,i)=><article key={person.id} data-reel data-index={i} onDoubleClick={()=>{if(!liked.includes(person.id))like(person.id);}} className="relative isolate h-[100dvh] min-h-[100dvh] w-full snap-start snap-always overflow-hidden bg-neutral-950">
        <img src={person.image} alt={person.name+" profile moment"} draggable={false} className="absolute inset-0 -z-20 h-full w-full select-none object-cover object-center" loading={i<2?"eager":"lazy"}/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-transparent via-40% to-black/90"/>
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pb-10 pt-[max(env(safe-area-inset-top),18px)]">
          <Link href="/discover" aria-label="Back to discover" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 backdrop-blur-md"><ArrowLeft size={19}/></Link>
          <div className="flex items-center gap-2 text-[13px] font-extrabold tracking-[-.04em]">spark <span className="text-white/50">&</span> vouch <Sparkles size={13}/></div>
          <button onClick={toggleSound} aria-label={muted?"Turn reel sound on":"Turn reel sound off"} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 backdrop-blur-md">{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
        </div>

        <div className="absolute bottom-[calc(76px+env(safe-area-inset-bottom))] left-0 right-0 z-10 flex items-end gap-3 px-4 sm:px-8">
          <div className="min-w-0 flex-1 pb-2">
            <div className="mb-3 flex items-center gap-2"><span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.18em] backdrop-blur-md">For you · {i+1}/{reels.length}</span>{person.online&&<span className="flex items-center gap-1 text-[10px] font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> Active now</span>}</div>
            <div className="flex items-center gap-3"><img src={person.image} alt="" className="h-11 w-11 rounded-full border border-white/50 object-cover"/><div className="min-w-0"><h1 className="text-[22px] font-extrabold leading-tight tracking-[-.055em]">{person.name}, {person.age}</h1><p className="mt-0.5 text-[11px] text-white/70">{person.city} · {person.distance}</p></div><button onClick={()=>setToast("Demo profile · verified status is not enabled")} className="ml-1 rounded-full border border-white/50 px-3 py-1.5 text-[10px] font-bold">View</button></div>
            <p className="mt-3 max-w-md text-[13px] leading-5 text-white/90">{person.caption} <span className="text-white/65">{person.bio}</span></p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">{person.tags.slice(0,3).map(tag=><span key={tag} className="text-[10px] font-semibold text-white/80">#{tag.replaceAll(" ","")}</span>)}</div>
            <div className="mt-4 flex gap-2"><button onClick={()=>like(person.id)} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-extrabold text-black active:scale-95"><Heart size={16} fill={liked.includes(person.id)?"currentColor":"none"}/>{liked.includes(person.id)?"Liked":"Like"}</button><Link href={"/chat/"+person.id} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/45 bg-black/25 px-4 text-xs font-bold backdrop-blur-md"><MessageCircle size={15}/> Say hello</Link></div>
          </div>
          <aside className="mb-2 flex shrink-0 flex-col items-center gap-5">
            <button onClick={()=>like(person.id)} aria-label="Like profile" className="flex flex-col items-center gap-1.5 drop-shadow-lg"><Heart size={27} fill={liked.includes(person.id)?"white":"none"} strokeWidth={2.1}/><span className="text-[10px] font-bold">{liked.includes(person.id)?"Liked":"Like"}</span></button>
            <button onClick={()=>{sounds.click();setCommentFor(person.id);}} aria-label="Open comments" className="flex flex-col items-center gap-1.5 drop-shadow-lg"><MessageCircle size={26}/><span className="text-[10px] font-bold">{(comments[person.id]??[]).length}</span></button>
            <button onClick={()=>share(person.name)} aria-label="Share profile" className="flex flex-col items-center gap-1.5 drop-shadow-lg"><Share2 size={24}/><span className="text-[10px] font-bold">Share</span></button>
            <button onClick={()=>{sounds.click();toggle(person.id,setSaved,saved);}} aria-label="Save profile" className="flex flex-col items-center gap-1.5 drop-shadow-lg"><Bookmark size={23} fill={saved.includes(person.id)?"white":"none"}/><span className="text-[10px] font-bold">{saved.includes(person.id)?"Saved":"Save"}</span></button>
            <div className="mt-1 h-9 w-9 overflow-hidden rounded-xl border border-white/30"><img src={person.image} alt="" className="h-full w-full object-cover"/></div>
          </aside>
        </div>
        <div className="absolute bottom-[calc(68px+env(safe-area-inset-bottom))] left-4 right-4 z-10 h-[2px] overflow-hidden bg-white/30"><div className="h-full bg-white/90" style={{width:((i+1)/reels.length*100)+"%"}}/></div>

        {commentFor===person.id&&<div className="absolute inset-0 z-30 flex items-end bg-black/55 backdrop-blur-sm" onClick={()=>setCommentFor(null)}><section className="w-full rounded-t-[28px] border-t border-white/15 bg-[#080808] px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-5" onClick={e=>e.stopPropagation()}><div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/25"/><div className="mb-4 flex items-center justify-between"><h2 className="text-base font-extrabold">Comments <span className="text-white/40">({(comments[person.id]??[]).length})</span></h2><button onClick={()=>setCommentFor(null)} className="text-xs text-white/55">Close</button></div><div className="max-h-[28dvh] space-y-4 overflow-y-auto">{(comments[person.id]??[]).map((c,j)=><p key={j} className="text-sm leading-5"><span className="mr-2 font-bold">you</span><span className="text-white/75">{c}</span></p>)}</div><form onSubmit={e=>{e.preventDefault();submitComment(person.id)}} className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4"><div className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-black text-black">S</div><input autoFocus value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a comment…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35"/><button type="submit" disabled={!comment.trim()} className="text-sm font-bold text-white disabled:opacity-30"><Send size={18}/></button></form></section></div>}
      </article>)}
    </div>
    <nav aria-label="Main navigation" className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="mx-auto flex h-[58px] max-w-lg items-center justify-around">
        <Link href="/discover" className="flex flex-col items-center gap-1 text-white/55"><Compass size={20}/><span className="text-[9px]">Discover</span></Link>
        <Link href="/reels" aria-current="page" className="flex flex-col items-center gap-1 text-white"><Clapperboard size={21} strokeWidth={2.4}/><span className="text-[9px] font-bold">Reels</span></Link>
        <Link href="/likes" className="flex flex-col items-center gap-1 text-white/55"><Heart size={20}/><span className="text-[9px]">Likes</span></Link>
        <Link href="/matches" className="flex flex-col items-center gap-1 text-white/55"><MessageCircle size={20}/><span className="text-[9px]">Chats</span></Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-white/55"><UserRound size={20}/><span className="text-[9px]">Profile</span></Link>
      </div>
    </nav>
    {toast&&<button role="status" onClick={()=>setToast("")} className="absolute left-1/2 top-20 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs backdrop-blur">{toast} · dismiss</button>}
  </main>;
}
