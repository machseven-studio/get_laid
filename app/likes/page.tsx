"use client";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { people } from "@/lib/demo-data";
import { Heart, ArrowUpRight } from "lucide-react";

export default function LikesPage() {
  const [liked,setLiked] = React.useState(["maya","isha"]);
  return <AppShell><div className="mb-10"><p className="eyebrow">THE GOOD PART</p><h1 className="display-title mt-2">Your likes<span className="text-white/35">.</span></h1><p className="mt-3 text-sm text-white/45">A little interest can open a big door.</p></div>
    <div className="divide-y divide-white/[0.09]">{people.filter(p=>liked.includes(p.id)).map(p=><article key={p.id} className="flex items-center gap-4 py-5 sm:gap-6"><img src={p.image} alt="" className="h-24 w-20 rounded-xl object-cover sm:h-28 sm:w-24"/><div className="min-w-0 flex-1"><h2 className="text-xl font-extrabold tracking-tight">{p.name}, {p.age}</h2><p className="mt-1 text-xs text-white/45">{p.city} · {p.distance}</p><p className="mt-3 line-clamp-2 text-sm text-white/65">{p.bio}</p></div><button onClick={()=>setLiked(v=>v.filter(id=>id!==p.id))} aria-label={`Remove ${p.name} from likes`} className="p-2 text-white/50 hover:text-white"><Heart size={19} fill="currentColor"/></button></article>)}</div>
    {liked.length===0 && <div className="py-16 text-center"><Heart className="mx-auto text-white/30" size={30}/><p className="mt-4 font-bold">Your next spark is out there.</p><Link href="/discover" className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">Discover people <ArrowUpRight size={15}/></Link></div>}
  </AppShell>;
}

import React from "react";
