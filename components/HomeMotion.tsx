'use client';
import {useEffect,useRef,useState} from 'react';
/** All meaningful text remains rendered by the Server Component. This layer is progressive enhancement only. */
export default function HomeMotion(){
 const [progress,setProgress]=useState(0);
 const raf=useRef<number|null>(null);
 useEffect(()=>{
  const root=document.getElementById('oe-home');
  if(!root)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  const items=Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:0.08,rootMargin:'0px 0px 20px 0px'});
  for(const item of items){if(item.getBoundingClientRect().top<window.innerHeight*.88)item.classList.add('revealed');else{item.classList.add('will-reveal');observer.observe(item)}}
  root.classList.add('motion-enabled');
  const update=()=>{raf.current=null;const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0);root.style.setProperty('--scroll-y',String(window.scrollY))};
  const onScroll=()=>{if(raf.current===null)raf.current=requestAnimationFrame(update)};
  update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
  return ()=>{observer.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(raf.current!==null)cancelAnimationFrame(raf.current);root.classList.remove('motion-enabled')};
 },[]);
 return <div className="oe-reading-progress" aria-hidden="true"><span style={{transform:'scaleX('+progress/100+')'}}/></div>
}
