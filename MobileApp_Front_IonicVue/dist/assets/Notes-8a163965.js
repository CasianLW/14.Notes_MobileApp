import{D as b,r as _,n as g,Q as V,o as i,g as N,w as t,h as a,H as e,b as B,c as T,i as s,a as D,N as I,O as m,R as E,e as f,M as L,j as h,S as M,T as $,l as A,A as H,d as R,I as j,t as F,k as p,B as O,C as P,_ as Q}from"./index-250bcd66.js";import{u as U}from"./notes-18c93e9c.js";const k=c=>(O("data-v-919f956a"),c=c(),P(),c),q={class:"ion-button-container"},z={key:0,class:"ion-text-center"},G=k(()=>p("br",null,null,-1)),J=k(()=>p("br",null,null,-1)),K=b({__name:"Notes",setup(c){const n=_(!1),o=U(),r=_([]),u=_({content:""}),w=g();V(async()=>{n.value=!0,await o.fetchNotes(),r.value=o.notes,n.value=!1});const y=async()=>{u.value.content!==""&&(n.value=!0,await o.createNote(u.value),u.value={content:""},n.value=!1,await o.fetchNotes(),r.value=o.notes)},C=async d=>{n.value=!0,await o.deleteNote(d),await o.fetchNotes(),n.value=!1,r.value=o.notes},x=d=>{w.push({path:`/notes/${d}`})};return(d,v)=>(i(),N(e(j),null,{default:t(()=>[a(e(D),null,{default:t(()=>[a(e(B),null,{default:t(()=>[a(e(T),null,{default:t(()=>[s("Notes")]),_:1})]),_:1})]),_:1}),a(e(R),{fullscreen:!0},{default:t(()=>[a(e(I),null,{default:t(()=>[a(e(m),{position:"floating"},{default:t(()=>[s("New Note...")]),_:1}),a(e(E),{placeholder:"My text...",modelValue:u.value.content,"onUpdate:modelValue":v[0]||(v[0]=l=>u.value.content=l)},null,8,["modelValue"]),a(e(f),{onClick:y},{default:t(()=>[s("Add Note")]),_:1})]),_:1}),a(e(L),null,{default:t(()=>[(i(!0),h($,null,M(r.value,l=>(i(),N(e(I),{key:l.id},{default:t(()=>[a(e(m),null,{default:t(()=>[s(F(l.content),1)]),_:2},1024),p("div",q,[a(e(f),{onClick:S=>x(l.id),class:"edit-button"},{default:t(()=>[s(" Edit ")]),_:2},1032,["onClick"]),a(e(f),{fill:"outline",color:"danger",onClick:S=>C(l.id),class:"delete-button"},{default:t(()=>[s(" Delete ")]),_:2},1032,["onClick"])])]),_:2},1024))),128))]),_:1}),n.value?(i(),h("div",z,[G,J,a(e(A),{color:"primary"})])):H("",!0)]),_:1})]),_:1}))}});const Y=Q(K,[["__scopeId","data-v-919f956a"]]);export{Y as default};