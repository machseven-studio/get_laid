"use client";
import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { byId } from "@/lib/demo-data";
import { ArrowLeft, Send, AudioLines, MoreHorizontal } from "lucide-react";

type Message = { id: number; text: string; own: boolean };
export default function ChatPage({ params }: { params: { matchId: string } }) {
  const person = byId(params.matchId);
  const [draft,setDraft] = useState("");
  const [messages,setMessages] = useState<Message[]>([
    {id:1,text:"Hey! I liked your voice note — you sound like someone with good stories.",own:false},
    {id:2,text:"Thanks! The best ones usually start with a spontaneous plan.",own:true}
  ]);
  function sendMessage(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const text=draft.trim(); if(!text) return;
    setMessages(v=>[...v,{id:Date.now(),text,own:true}]); setDraft("");
  }
  return <AppShell><div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col">
    <header className="flex items-center gap-3 border-b border-white/10 pb-5"><Link href="/matches" aria-label="Back to matches" className="text-white/55 hover:text-white"><ArrowLeft size={19}/></Link><img src={person.image} alt="" className="h-11 w-11 rounded-full object-cover"/><div className="min-w-0 flex-1"><h1 className="font-extrabold tracking-tight">{person.name}, {person.age}</h1><p className="mt-1 text-[11px] text-white/40">{person.online?"Online now":person.city+" · "+person.distance}</p></div><button onClick={()=>alert("Demo conversation options")} aria-label="Conversation options" className="text-white/50 hover:text-white"><MoreHorizontal size={20}/></button></header>
    <div className="my-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/30"><span className="h-px flex-1 bg-white/10"/><span>A new connection</span><span className="h-px flex-1 bg-white/10"/></div>
    <div className="flex-1 space-y-4 py-4">{messages.map(m=><div key={m.id} className={m.own?"flex justify-end":"flex justify-start"}><p className={m.own?"max-w-[85%] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm leading-6 text-black":"max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.08] px-4 py-3 text-sm leading-6 text-white/85"}>{m.text}</p></div>)}</div>
    <p className="mb-3 text-center text-[10px] text-white/25">Demo mode · Messages are not sent or stored</p>
    <form onSubmit={sendMessage} className="flex items-center gap-3 border-t border-white/10 pt-4"><button type="button" onClick={()=>alert(person.voice ?? "Voice intro coming soon.")} aria-label="Listen to voice intro" className="text-white/50 hover:text-white"><AudioLines size={20}/></button><label htmlFor="message" className="sr-only">Write a message</label><input id="message" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Say something real…" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-white/30"/><button type="submit" disabled={!draft.trim()} aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-full bg-white text-black disabled:opacity-30"><Send size={16}/></button></form>
  </div></AppShell>;
}
