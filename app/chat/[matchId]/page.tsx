"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Send, ShieldCheck } from "lucide-react";
type Message = { id: number; text: string; own: boolean };

export default function ChatPage() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! I liked your voice note — you sound like someone with good stories.", own: false },
    { id: 2, text: "Thanks! The best ones usually start with a spontaneous plan.", own: true }
  ]);
  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const text = draft.trim(); if (!text) return;
    setMessages(current => [...current, { id: Date.now(), text, own: true }]); setDraft("");
  }
  return <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-6 sm:px-6">
    <header className="flex items-center gap-3 border-b border-white/10 pb-5"><Link href="/" aria-label="Back home" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/5"><ArrowLeft size={18}/></Link><div className="grid h-10 w-10 place-items-center rounded-full bg-orange-200/15 font-semibold text-orange-100">S</div><div className="flex-1"><h1 className="text-sm font-semibold">Spark connection</h1><p className="mt-1 text-xs text-white/45">Demo conversation</p></div><ShieldCheck size={19} className="text-orange-200"/></header>
    <div className="my-6 rounded-xl border border-orange-200/15 bg-orange-200/[0.06] p-3 text-xs leading-5 text-white/60">This is a local UI demo. Messages are not saved or sent to another person.</div>
    <section aria-label="Messages" className="flex-1 space-y-4 py-4">{messages.map(message => <div key={message.id} className={message.own ? "flex justify-end" : "flex justify-start"}><p className={message.own ? "max-w-[85%] rounded-2xl rounded-br-sm bg-orange-200 px-4 py-3 text-sm leading-6 text-zinc-950" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.07] px-4 py-3 text-sm leading-6 text-white/85"}>{message.text}</p></div>)}</section>
    <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 pt-5"><label htmlFor="message" className="sr-only">Write a message</label><input id="message" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Write a message..." className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-orange-200/60"/><button type="submit" disabled={!draft.trim()} aria-label="Send message" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange-200 text-zinc-950 disabled:opacity-40"><Send size={17}/></button></form>
  </main>;
}
