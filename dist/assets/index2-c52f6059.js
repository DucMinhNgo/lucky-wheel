/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */class A{constructor(){this.gestureId=0,this.requestedStart=new Map,this.disabledGestures=new Map,this.disabledScroll=new Set}createGesture(t){var r;return new R(this,this.newID(),t.name,(r=t.priority)!==null&&r!==void 0?r:0,!!t.disableScroll)}createBlocker(t={}){return new k(this,this.newID(),t.disable,!!t.disableScroll)}start(t,r,s){return this.canStart(t)?(this.requestedStart.set(r,s),!0):(this.requestedStart.delete(r),!1)}capture(t,r,s){if(!this.start(t,r,s))return!1;const a=this.requestedStart;let n=-1e4;if(a.forEach(c=>{n=Math.max(n,c)}),n===s){this.capturedId=r,a.clear();const c=new CustomEvent("ionGestureCaptured",{detail:{gestureName:t}});return document.dispatchEvent(c),!0}return a.delete(r),!1}release(t){this.requestedStart.delete(t),this.capturedId===t&&(this.capturedId=void 0)}disableGesture(t,r){let s=this.disabledGestures.get(t);s===void 0&&(s=new Set,this.disabledGestures.set(t,s)),s.add(r)}enableGesture(t,r){const s=this.disabledGestures.get(t);s!==void 0&&s.delete(r)}disableScroll(t){this.disabledScroll.add(t),this.disabledScroll.size===1&&document.body.classList.add(I)}enableScroll(t){this.disabledScroll.delete(t),this.disabledScroll.size===0&&document.body.classList.remove(I)}canStart(t){return!(this.capturedId!==void 0||this.isDisabled(t))}isCaptured(){return this.capturedId!==void 0}isScrollDisabled(){return this.disabledScroll.size>0}isDisabled(t){const r=this.disabledGestures.get(t);return!!(r&&r.size>0)}newID(){return this.gestureId++,this.gestureId}}class R{constructor(t,r,s,a,n){this.id=r,this.name=s,this.disableScroll=n,this.priority=a*1e6+r,this.ctrl=t}canStart(){return this.ctrl?this.ctrl.canStart(this.name):!1}start(){return this.ctrl?this.ctrl.start(this.name,this.id,this.priority):!1}capture(){if(!this.ctrl)return!1;const t=this.ctrl.capture(this.name,this.id,this.priority);return t&&this.disableScroll&&this.ctrl.disableScroll(this.id),t}release(){this.ctrl&&(this.ctrl.release(this.id),this.disableScroll&&this.ctrl.enableScroll(this.id))}destroy(){this.release(),this.ctrl=void 0}}class k{constructor(t,r,s,a){this.id=r,this.disable=s,this.disableScroll=a,this.ctrl=t}block(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.disableGesture(t,this.id);this.disableScroll&&this.ctrl.disableScroll(this.id)}}unblock(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.enableGesture(t,this.id);this.disableScroll&&this.ctrl.enableScroll(this.id)}}destroy(){this.unblock(),this.ctrl=void 0}}const I="backdrop-no-scroll",B=new A;/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const X=(e,t,r,s)=>{const a=F(e)?{capture:!!s.capture,passive:!!s.passive}:!!s.capture;let n,c;return e.__zone_symbol__addEventListener?(n="__zone_symbol__addEventListener",c="__zone_symbol__removeEventListener"):(n="addEventListener",c="removeEventListener"),e[n](t,r,a),()=>{e[c](t,r,a)}},F=e=>{if(g===void 0)try{const t=Object.defineProperty({},"passive",{get:()=>{g=!0}});e.addEventListener("optsTest",()=>{},t)}catch{g=!1}return!!g};let g;const W=2e3,j=(e,t,r,s,a)=>{let n,c,h,o,d,l,m,S=0;const p=f=>{S=Date.now()+W,t(f)&&(!c&&r&&(c=X(e,"touchmove",r,a)),h||(h=X(f.target,"touchend",i,a)),o||(o=X(f.target,"touchcancel",i,a)))},v=f=>{S>Date.now()||t(f)&&(!l&&r&&(l=X(L(e),"mousemove",r,a)),m||(m=X(L(e),"mouseup",y,a)))},i=f=>{b(),s&&s(f)},y=f=>{Y(),s&&s(f)},b=()=>{c&&c(),h&&h(),o&&o(),c=h=o=void 0},Y=()=>{l&&l(),m&&m(),l=m=void 0},E=()=>{b(),Y()},T=(f=!0)=>{f?(n||(n=X(e,"touchstart",p,a)),d||(d=X(e,"mousedown",v,a))):(n&&n(),d&&d(),n=d=void 0,E())};return{enable:T,stop:E,destroy:()=>{T(!1),s=r=t=void 0}}},L=e=>e instanceof Document?e:e.ownerDocument,H=(e,t,r)=>{const s=r*(Math.PI/180),a=e==="x",n=Math.cos(s),c=t*t;let h=0,o=0,d=!1,l=0;return{start(m,S){h=m,o=S,l=0,d=!0},detect(m,S){if(!d)return!1;const p=m-h,v=S-o,i=p*p+v*v;if(i<c)return!1;const y=Math.sqrt(i),b=(a?p:v)/y;return b>n?l=1:b<-n?l=-1:l=0,d=!1,!0},isGesture(){return l!==0},getDirection(){return l}}},K=e=>{let t=!1,r=!1,s=!0,a=!1;const n=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},e),c=n.canStart,h=n.onWillStart,o=n.onStart,d=n.onEnd,l=n.notCaptured,m=n.onMove,S=n.threshold,p=n.passive,v=n.blurOnStart,i={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},y=H(n.direction,n.threshold,n.maxAngle),b=B.createGesture({name:e.gestureName,priority:e.gesturePriority,disableScroll:e.disableScroll}),Y=u=>{const w=x(u);return r||!s||(O(u,i),i.startX=i.currentX,i.startY=i.currentY,i.startTime=i.currentTime=w,i.velocityX=i.velocityY=i.deltaX=i.deltaY=0,i.event=u,c&&c(i)===!1)||(b.release(),!b.start())?!1:(r=!0,S===0?_():(y.start(i.startX,i.startY),!0))},E=u=>{if(t){!a&&s&&(a=!0,M(i,u),requestAnimationFrame(T));return}M(i,u),y.detect(i.currentX,i.currentY)&&(!y.isGesture()||!_())&&q()},T=()=>{t&&(a=!1,m&&m(i))},_=()=>b.capture()?(t=!0,s=!1,i.startX=i.currentX,i.startY=i.currentY,i.startTime=i.currentTime,h?h(i).then(C):C(),!0):!1,f=()=>{if(typeof document<"u"){const u=document.activeElement;u!=null&&u.blur&&u.blur()}},C=()=>{v&&f(),o&&o(i),s=!0},D=()=>{t=!1,r=!1,a=!1,s=!0,b.release()},P=u=>{const w=t,z=s;if(D(),!!z){if(M(i,u),w){d&&d(i);return}l&&l(i)}},G=j(n.el,Y,E,P,{capture:!1,passive:p}),q=()=>{D(),G.stop(),l&&l(i)};return{enable(u=!0){u||(t&&P(void 0),D()),G.enable(u)},destroy(){b.destroy(),G.destroy()}}},M=(e,t)=>{if(!t)return;const r=e.currentX,s=e.currentY,a=e.currentTime;O(t,e);const n=e.currentX,c=e.currentY,o=(e.currentTime=x(t))-a;if(o>0&&o<100){const d=(n-r)/o,l=(c-s)/o;e.velocityX=d*.7+e.velocityX*.3,e.velocityY=l*.7+e.velocityY*.3}e.deltaX=n-e.startX,e.deltaY=c-e.startY,e.event=t},O=(e,t)=>{let r=0,s=0;if(e){const a=e.changedTouches;if(a&&a.length>0){const n=a[0];r=n.clientX,s=n.clientY}else e.pageX!==void 0&&(r=e.pageX,s=e.pageY)}t.currentX=r,t.currentY=s},x=e=>e.timeStamp||Date.now();export{B as GESTURE_CONTROLLER,K as createGesture};
