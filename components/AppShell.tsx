"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, MessageCircle, UserRound, Sparkles, Clapperboard, LogIn } from "lucide-react";
import { useSounds } from "@/components/SoundProvider";

const items = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/reels", label: "Reels", icon: Clapperboard },
  { href: "/likes", label: "Likes", icon: Heart },
  { href: "/matches", label: "Chats", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: UserRound }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sounds = useSounds();
  return <div className="min-h-screen bg-black text-white">
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/discover" className="flex items-center gap-2.5" aria-label="Cherry home">
          <span className="cherry-mark"><Sparkles size={16}/></span>
          <span className="cherry-name text-xl">Cherry</span><span className="cherry-byline">by Harsh and Sam</span>
        </Link>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[.28em] text-white/35 sm:block">A little closer to something real</span>
        <div className="flex items-center gap-3"><Link href="/login" className="text-xs font-bold text-white/50 hover:text-white">Sign in</Link><Link href="/profile" aria-label="Profile" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-sm font-bold hover:bg-white/10">S</Link></div>
      </div>
    </header>
    <main className="mx-auto min-h-[calc(100dvh-140px)] max-w-6xl px-5 pb-28 pt-7 sm:px-8 sm:pb-12">{children}</main>
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-black/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:sticky sm:bottom-0 sm:border-t-0 sm:bg-black">
      <div className="mx-auto flex max-w-xl items-center justify-around px-3 py-3 sm:rounded-full sm:border sm:border-white/10 sm:bg-white/[0.025]">
        {items.map(({href,label,icon:Icon}) => {
          const active = pathname === href || (href === "/matches" && pathname.startsWith("/chat/"));
          return <Link key={href} href={href} onClick={()=>sounds.click()} className={`flex min-w-[60px] flex-col items-center gap-1.5 px-3 py-1 text-[10px] font-semibold transition ${active ? "text-white" : "text-white/40 hover:text-white/80"}`} aria-current={active ? "page" : undefined}>
            <Icon size={20} strokeWidth={active ? 2.3 : 1.7}/><span>{label}</span>
          </Link>;
        })}
      </div>
    </nav>
  </div>;
}
