System.register(["./index-legacy-0ff49c16.js","./notes-legacy-7a8aaf03.js"],(function(e,t){"use strict";var l,a,n,u,d,o,c,i,s,r,f,v,p,_,m,y,N,h,g,x,w,C,b,k,V,j,D,E,I,U,B,A,H=document.createElement("style");return H.textContent=".edit-note-card[data-v-3798a6d5]{margin-bottom:20px}\n",document.head.appendChild(H),{setters:[e=>{l=e.D,a=e.n,n=e.U,u=e.r,d=e.Q,o=e.o,c=e.g,i=e.w,s=e.h,r=e.H,f=e.b,v=e.V,p=e.W,_=e.c,m=e.i,y=e.a,N=e.J,h=e.K,g=e.N,x=e.O,w=e.R,C=e.e,b=e.j,k=e.l,V=e.A,j=e.d,D=e.I,E=e.B,I=e.C,U=e.k,B=e._},e=>{A=e.u}],execute:function(){const t=e=>(E("data-v-3798a6d5"),e=e(),I(),e),H={key:0,class:"ion-text-center"},J=t((()=>U("br",null,null,-1))),K=t((()=>U("br",null,null,-1)));e("default",B(l({__name:"NoteDetail",setup(e){const t=A(),l=a(),E=n(),I=u({id:E.params.id,content:""}),U=u(!1);d((async()=>{U.value=!0;const e=await t.fetchNoteById(E.params.id);e&&(I.value.content=e.content),U.value=!1}));const B=async()=>{U.value=!0,await t.updateNote(I.value.id,I.value),U.value=!1},O=async()=>{U.value=!0,await t.deleteNote(I.value.id),await t.fetchNotes(),U.value=!1,l.push("/notes")};return(e,t)=>(o(),c(r(D),null,{default:i((()=>[s(r(y),null,{default:i((()=>[s(r(f),null,{default:i((()=>[s(r(v),{slot:"start"},{default:i((()=>[s(r(p),{"default-href":"/notes"})])),_:1}),s(r(_),null,{default:i((()=>[m("Edit Note")])),_:1})])),_:1})])),_:1}),s(r(j),{class:"ion-padding"},{default:i((()=>[s(r(N),{class:"edit-note-card"},{default:i((()=>[s(r(h),null,{default:i((()=>[s(r(g),null,{default:i((()=>[s(r(x),{position:"floating"},{default:i((()=>[m("Edit Note")])),_:1}),s(r(w),{modelValue:I.value.content,"onUpdate:modelValue":t[0]||(t[0]=e=>I.value.content=e),placeholder:I.value.content},null,8,["modelValue","placeholder"])])),_:1}),s(r(C),{expand:"full",onClick:B},{default:i((()=>[m("Update Note")])),_:1}),s(r(C),{fill:"outline",color:"danger",expand:"full",onClick:O},{default:i((()=>[m("Delete Note")])),_:1})])),_:1})])),_:1}),U.value?(o(),b("div",H,[J,K,s(r(k),{color:"primary"})])):V("",!0)])),_:1})])),_:1}))}}),[["__scopeId","data-v-3798a6d5"]]))}}}));
