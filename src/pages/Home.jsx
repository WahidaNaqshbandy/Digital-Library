import {useMemo,useState} from 'react';import {Link} from 'react-router-dom';
import {books,cats} from '../data/books';import BookCard from '../components/BookCard';import Book3D from '../components/Book3D';import {useStore} from '../context/Store';
const Sec=({t,list})=><section className="sec"><h2>{t}</h2><div className="grid4">{list.map(b=><BookCard key={b.id} b={b}/>)}</div></section>;
export default function Home(){const {notify}=useStore();const [em,setEm]=useState('');
 const dots=useMemo(()=>Array.from({length:36},(_,i)=>({l:Math.random()*100,t:Math.random()*100,d:4+Math.random()*8,s:1+Math.random()*3,i})),[]);
 const mv=e=>{const s=e.currentTarget.style;s.setProperty('--mx',(e.clientX/innerWidth-.5)*2);s.setProperty('--my',(e.clientY/innerHeight-.5)*2)};
 return <>
 <header className="hero" onMouseMove={mv}>{dots.map(p=><span key={p.i} className="dot" style={{left:p.l+'%',top:p.t+'%',width:p.s,height:p.s,animationDuration:p.d+'s'}}/>)}
  <div className="floaters">{books.slice(0,5).map((b,i)=><div key={b.id} className={'fl fl'+i}><Book3D b={b} size={.7} rot={-30}/></div>)}</div>
  <div className="hero-in"><h1>A Universe Between Every Page.</h1><p>Discover, explore, and experience the world of books in a whole new dimension.</p>
   <Link to="/library" className="btn-gold mag">Explore Library</Link></div>
  <div className="openbook"><div className="ob l"/><div className="ob r"/><div className="ob flip"/></div></header>
 <Sec t="Featured Books" list={books.slice(0,4)}/>
 <section className="sec"><h2>Popular Categories</h2><div className="d-flex flex-wrap gap-3 justify-content-center">{cats.slice(1).map(c=><Link key={c} className="chip mag" to={'/library?c='+c}>{c}</Link>)}</div></section>
 <Sec t="Trending Now" list={[...books].sort((a,b)=>b.rating-a.rating).slice(0,4)}/>
 <Sec t="Recommended For You" list={books.slice(8,12)}/>
 <section className="sec stats">{[['14+','Curated titles'],['7','Categories'],['120k','Pages read'],['4.6★','Average rating']].map(([n,l])=><div key={l} className="glass stat"><b>{n}</b><span>{l}</span></div>)}</section>
 <section className="sec"><div className="glass news"><h2>Join the Reading Circle</h2><p>New arrivals and quiet recommendations, once a month.</p>
  <form className="d-flex gap-2 justify-content-center flex-wrap" onSubmit={e=>{e.preventDefault();notify('Subscribed — welcome to LUMINA!');setEm('')}}>
  <input required type="email" className="form-control inp" placeholder="you@email.com" value={em} onChange={e=>setEm(e.target.value)}/><button className="btn-gold">Subscribe</button></form></div></section></>}
