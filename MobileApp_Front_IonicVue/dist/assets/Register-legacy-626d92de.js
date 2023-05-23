System.register(["./index-legacy-0ff49c16.js","./ExploreContainer-legacy-532c6f19.js"],(function(e,a){"use strict";var t,r,l,n,s,i,o,u,d,m,c,p,f,v,g,_,y,h,b,w,E,R,x,k,C,q,I,S,z,M,F,T,j,L=document.createElement("style");return L.textContent=".error[data-v-649dd7dc]{color:red}\n",document.head.appendChild(L),{setters:[e=>{t=e.I,r=e.a,l=e.b,n=e.c,s=e.d,i=e.F,o=e.E,u=e.l,d=e.m,m=e.r,c=e.u,p=e.n,f=e.p,v=e.q,g=e.s,_=e.v,y=e.x,h=e._,b=e.f,w=e.o,E=e.g,R=e.w,x=e.h,k=e.i,C=e.k,q=e.y,I=e.z,S=e.j,z=e.A,M=e.t,F=e.B,T=e.C},e=>{j=e.E}],execute:function(){f("customRequired",(e=>!(!e||""===e.trim())||"Champ obligatoire")),f("required",g),f("email",_),f("customEmail",(e=>!(!e||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))||"Entrez une adresse email valide")),f("min",y),f("password",(e=>!!/(?=.*[A-Z])/.test(e)||"Le mot de passe doit contenir au moins une lettre capitale")),v({generateMessage:e=>{var a;return null!==(a={customRequired:"Champ obligatoire",customEmail:"Entrez une adresse email valide",password:"Le mot de passe doit contenir au moins une lettre capitale",required:"Ce champ est obligatoire",min:"Le mot de passe doit avoir au moins 8 caractères",email:"Entrez une adresse email valide"}[e.rule.name])&&void 0!==a?a:"This field is invalid"}});const a={components:{IonPage:t,IonHeader:r,IonToolbar:l,IonTitle:n,IonContent:s,ExploreContainer:j,Field:i,ErrorMessage:o,IonSpinner:u},setup(){const{handleSubmit:e,resetForm:a,errors:t}=d(),r=m(!1),l=m(!1),n=m(""),s=c(),i=p(),o=e((async e=>{r.value=!0;try{await s.register(e.username,e.email,e.password),i.push({path:"/home"})}catch(a){l.value=!0,console.log(a),n.value="Register failed, try again"}r.value=!1,setTimeout((()=>{n.value=""}),3e3)}));return{handleSubmit:e,errors:t,error:l,errorMessage:n,usernameRules:"required",emailRules:"customRequired|email",passwordRules:"required|min:8|password",register:o,activeSpinner:r}}},L=e=>(F("data-v-649dd7dc"),e=e(),T(),e),A={key:0},P={key:0},B={key:0},H={key:0,class:"ion-text-center"},U=L((()=>C("br",null,null,-1))),Z=L((()=>C("br",null,null,-1))),$={key:1,class:"error ion-text-center"};e("default",h(a,[["render",function(e,a,t,r,l,n){const s=b("ion-title"),i=b("ion-toolbar"),o=b("ion-header"),u=b("ion-label"),d=b("ion-input"),m=b("ErrorMessage"),c=b("Field"),p=b("ion-item"),f=b("ion-button"),v=b("ion-spinner"),g=b("ion-content"),_=b("ion-page");return w(),E(_,null,{default:R((()=>[x(o,null,{default:R((()=>[x(i,null,{default:R((()=>[x(s,{class:"ion-text-center"},{default:R((()=>[k("Register")])),_:1})])),_:1})])),_:1}),x(g,{fullscreen:!0},{default:R((()=>[x(o,{collapse:"condense"},{default:R((()=>[x(i,null,{default:R((()=>[x(s,{size:"large"},{default:R((()=>[k("Register")])),_:1})])),_:1})])),_:1}),C("main",null,[C("form",{onSubmit:a[0]||(a[0]=q(((...e)=>r.register&&r.register(...e)),["prevent"]))},[x(p,null,{default:R((()=>[x(u,{position:"stacked"},{default:R((()=>[k("Username:")])),_:1}),x(c,{name:"username",rules:r.usernameRules},{default:R((({field:e})=>[x(d,I({type:"text"},e,{autocomplete:"username"}),null,16),e.value?(w(),S("div",A,[x(m,{name:"username"})])):z("",!0)])),_:1},8,["rules"])])),_:1}),x(p,null,{default:R((()=>[x(u,{position:"stacked"},{default:R((()=>[k("Email:")])),_:1}),x(c,{name:"email",rules:r.emailRules},{default:R((({field:e})=>[x(d,I({type:"email"},e,{autocomplete:"email"}),null,16),e.value?(w(),S("div",P,[x(m,{name:"email"})])):z("",!0)])),_:1},8,["rules"])])),_:1}),x(p,null,{default:R((()=>[x(u,{position:"stacked"},{default:R((()=>[k("Password:")])),_:1}),x(c,{name:"password",rules:r.passwordRules},{default:R((({field:e})=>[x(d,I({type:"password"},e,{autocomplete:"current-password"}),null,16),e.value?(w(),S("div",B,[x(m,{name:"password"})])):z("",!0)])),_:1},8,["rules"])])),_:1}),x(f,{expand:"full",type:"submit"},{default:R((()=>[k("Register")])),_:1})],32),r.activeSpinner?(w(),S("div",H,[U,Z,x(v,{color:"primary"})])):z("",!0),r.error?(w(),S("div",$,M(r.errorMessage),1)):z("",!0)])])),_:1})])),_:1})}],["__scopeId","data-v-649dd7dc"]]))}}}));