"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from "react";
type Sounds={click:()=>void;success:()=>void};
const Context=createContext<Sounds>({click:()=>{},success:()=>{}});
function tone(freq:number,duration:number,volume:number){
  if(typeof window==="undefined")return;
  try{
    const C=window.AudioContext||(window as typeof window & {webkitAudioContext?:typeof AudioContext}).webkitAudioContext;
    if(!C)return;
    const ctx=new C();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type="sine";osc.frequency.value=freq;
    gain.gain.setValueAtTime(volume,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);
    osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+duration);
    osc.onended=()=>void ctx.close();
  }catch{}
}
export function SoundProvider({children}:{children:ReactNode}){
  const click=useCallback(()=>tone(740,.045,.018),[]);
  const success=useCallback(()=>{tone(660,.07,.025);window.setTimeout(()=>tone(880,.09,.02),70);},[]);
  useEffect(()=>{
    const onClick=(event:MouseEvent)=>{
      const target=event.target;
      if(!(target instanceof Element))return;
      const interactive=target.closest("button,a,[role='button'],input[type='submit'],input[type='button'],summary,[data-click-sound]");
      if(!interactive)return;
      if(interactive instanceof HTMLButtonElement && interactive.disabled)return;
      if(interactive.getAttribute("aria-disabled")==="true")return;
      click();
    };
    document.addEventListener("click",onClick,true);
    return ()=>document.removeEventListener("click",onClick,true);
  },[click]);
  const value=useMemo(()=>({click,success}),[click,success]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useSounds(){return useContext(Context);}
