import {useMemo,useState} from 'react';import {useNavigate,useSearchParams} from 'react-router-dom';import {Search,Star,X,Heart} from 'lucide-react';
import {books,cats} from '../data/books';import BookShelf from '../components/BookShelf';import Book3D from '../components/Book3D';import {useStore} from '../context/Store';
export default function Library(){const [sp]=useSearchParams();const [q,setQ]=useState('');const [c,setC]=useState(sp.get('c')||'All');const [sel,setSel]=useState(null);const [ry,setRy]=useState(0);
 const {add,toggleFav,favs}=useStore();const nav=useNavigate();
 const list=useMemo(()=>books.filter(b=>(c==='All'||b.cat===c)&&(b.title+b.author).toLowerCase().includes(q.toLowerCase())),[q,c]);
 const rows=[];for(let i=0;i<list.length;i+=5)rows.push(list.slice(i,i+5));
 return <section className="lib" onMouseMove={e=>setRy((e.clientX/innerWidth-.5)*8)}>
  <h1 className="title">The Library</h1>
  <div className="tools glass"><div className="d-flex align-items-center gap-2"><Search size={16}/><input className="inp2" placeholder="Search title or author…" value={q} onChange={e=>setQ(e.target.value)}/></div>
   <div className="d-flex gap-2 flex-wrap">{cats.map(x=><button key={x} className={'chip '+(c===x?'on':'')} onClick={()=>setC(x)}>{x}</button>)}</div></div>
  <div className="room"><div className="roomin" style={{transform:`rotateX(3deg) rotateY(${ry}deg)`}}>
   {rows.length?rows.map((r,i)=><BookShelf key={i} books={r} onPick={setSel}/>):<p className="text-center py-5">No books match your search.</p>}</div><div className="floor"/></div>
  {sel&&<div className="overlay" onClick={()=>setSel(null)}><div className="modal3 glass" onClick={e=>e.stopPropagation()}>
   <button className="ibtn x" onClick={()=>setSel(null)} aria-label="Close"><X size={16}/></button>
   <div className="stage big"><Book3D b={sel} size={1.4} rot={-20}/></div>
   <div><small className="gold">{sel.cat}</small><h3>{sel.title}</h3><p>{sel.author}</p><p>{sel.desc}</p><p><Star size={14} className="gold"/> {sel.rating} · <b>${sel.price.toFixed(2)}</b></p>
    <div className="d-flex gap-2 flex-wrap"><button className="btn-gold" onClick={()=>add(sel.id)}>Add to Cart</button>
     <button className="chip" onClick={()=>nav('/reading?b='+sel.id)}>Read Sample</button>
     <button className="ibtn" aria-label="Favorite" onClick={()=>toggleFav(sel.id)}><Heart size={16} fill={favs.includes(sel.id)?'currentColor':'none'}/></button></div></div></div></div>}
 </section>}
