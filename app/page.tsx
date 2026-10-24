"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, AudioLines, Sparkles } from "lucide-react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Cherry — by Harsh and Sam";
  }, []);

  return (
    <main className="cherry-home min-h-screen overflow-hidden bg-black text-white">
      <header className="relative z-10 mx-auto flex h-[82px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="cherry-wordmark" aria-label="Cherry home">
          <span className="cherry-mark"><Sparkles size={17} /></span>
          <span className="cherry-name">Cherry</span>
          <span className="cherry-byline">by Harsh and Sam</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/login" className="hidden text-xs font-bold text-white/65 transition hover:text-white sm:block">Sign in</Link>
          <Link href="/signup" className="cherry-cta">Create account <ArrowRight className="ml-1 inline" size={14}/></Link>
        </div>
      </header>

      <section className="cherry-stage relative mx-auto flex min-h-[calc(100dvh-82px)] max-w-6xl items-center px-5 pb-20 pt-10 sm:px-8">
        <div className="cherry-orb cherry-orb-one" aria-hidden="true" />
        <div className="cherry-orb cherry-orb-two" aria-hidden="true" />
        <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1fr_.8fr]">
          <div className="cherry-intro max-w-2xl">
            <p className="eyebrow mb-6 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-rose-200"/> Meet beyond the first impression</p>
            <h1 className="cherry-hero-title">A little<br/>closer to<br/><span>something real.</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/60 sm:text-lg">Discover people through the details that make them who they are — their voice, their rituals, their little obsessions.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/signup" className="cherry-cta cherry-cta-primary">Join Cherry <ArrowRight className="ml-2 inline" size={15}/></Link>
              <Link href="/reels" className="cherry-quiet-link">Enter the reels <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="cherry-portrait-wrap mx-auto w-full max-w-[390px]">
            <div className="cherry-portrait">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85" alt="Portrait representing a Cherry member" />
              <div className="cherry-portrait-shade" />
              <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-white/80"><span className="h-1.5 w-1.5 rounded-full bg-rose-200"/> Your next chapter</div>
              <div className="cherry-portrait-copy">
                <div className="mb-4 flex items-center gap-3">
                  <span className="cherry-audio-icon"><AudioLines size={21}/></span>
                  <div><p className="text-sm font-extrabold">A voice. A feeling.</p><p className="mt-1 text-xs text-white/55">Meet the person behind the profile.</p></div>
                </div>
                <div className="cherry-wave" aria-hidden="true">{[8,14,6,20,12,25,9,17,28,12,21,7,16,24,10,18,6,14,22,9,17].map((h,i)=><span key={i} style={{height:h}} />)}</div>
              </div>
            </div>
            <div className="cherry-float-note"><span className="cherry-pulse"/> Thoughtfully made for real connection</div>
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-6xl justify-between border-t border-white/[.08] px-5 py-6 text-[10px] tracking-[.16em] text-white/35 sm:px-8"><span>CHERRY</span><span className="italic tracking-normal">by Harsh and Sam</span><span>EARLY ACCESS</span></footer>
    </main>
  );
}
