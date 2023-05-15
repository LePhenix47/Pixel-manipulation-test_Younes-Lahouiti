(()=>{"use strict";(()=>{function t(t){return t.getContext("2d")}function i(t,i,e){t.width=i,t.height=e}function e(t,i,e){t.clearRect(0,0,i,e)}class n{constructor(t,i,e,n,s,a,o,r=0){this.context=t,this.width=i,this.height=e,this.originX=n,this.originY=s,this.color=a,this.x=Math.random()*this.width,this.y=Math.random()*this.height,this.gap=r,this.size=o-this.gap,this.vectorX=0,this.vectorY=0,this.mouseParticleDistanceX=0,this.mouseParticleDistanceY=0,this.mouseTotalDistance=0,this.force=0,this.angle=0,this.friction=.6*Math.random()+.15,this.ease=.2*Math.random()+.05}update(t,i,e=2e4){const{x:n,y:s}=this.context.canvas.getBoundingClientRect();this.mouseParticleDistanceX=t-this.x-n,this.mouseParticleDistanceY=i-this.y-s,this.mouseTotalDistance=Math.pow(this.mouseParticleDistanceX,2)+Math.pow(this.mouseParticleDistanceY,2),this.force=-1*e/this.mouseTotalDistance;this.mouseTotalDistance<e&&(this.angle=Math.atan2(this.mouseParticleDistanceY,this.mouseParticleDistanceX),this.vectorX=Math.cos(this.angle)*this.force,this.vectorY=Math.sin(this.angle)*this.force),this.vectorX*=this.friction,this.vectorY*=this.friction,this.x+=this.vectorX+(this.originX-this.x)*this.ease,this.y+=this.vectorY+(this.originY-this.y)*this.ease}draw(){this.context.fillStyle=this.color,this.context.fillRect(this.x,this.y,this.size,this.size)}}const{log:s,error:a,table:o,time:r,timeEnd:c,timeStamp:h,timeLog:d,assert:l,clear:u,count:f,countReset:g,group:v,groupCollapsed:m,groupEnd:p,trace:x,profile:w,profileEnd:y,warn:D,debug:E,info:L,dir:P,dirxml:R}=console;function _(t,i){var e;if(!i)return document.querySelector(t);return(null===(e=null==i?void 0:i.tagName)||void 0===e?void 0:e.includes("-"))?i.shadowRoot.querySelector(t):i.querySelector(t)}function M(t,i){t.classList.add(i)}function b(t,i){t.classList.remove(i)}function X(t){return Array.from(t)}var Y=function(t,i,e,n){return new(e||(e=Promise))((function(s,a){function o(t){try{c(n.next(t))}catch(t){a(t)}}function r(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var i;t.done?s(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(o,r)}c((n=n.apply(t,i||[])).next())}))};function F(t,i){const{type:e}=t;var n,s;return(n=e,s="/",n.split(s))[0]===i}function T(t){return new Promise(((i,e)=>{const n=new FileReader;n.readAsDataURL(t),n.addEventListener("load",(()=>{const t=n.result;"string"!=typeof t?e("Error: Base64 string not found."):i(t)})),n.addEventListener("error",(()=>{e("Error: Failed to read audio file.")}))}))}var A=function(t,i,e,n){return new(e||(e=Promise))((function(s,a){function o(t){try{c(n.next(t))}catch(t){a(t)}}function r(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var i;t.done?s(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(o,r)}c((n=n.apply(t,i||[])).next())}))};const I=new Map;I.set("x",0),I.set("y",0),I.set("radius",2e4),document.addEventListener("mousemove",(function(t){I.set("x",t.x),I.set("y",t.y)})),s("Hello world!");const S=_(".index__input");S.addEventListener("change",(function(t){return A(this,void 0,void 0,(function*(){J();try{const i=t.currentTarget,e=yield function(t){return Y(this,void 0,void 0,(function*(){try{const i=X(t.files);return 1===i.length?i[0]:i}catch(t){a({fileRetrievalError:t})}}))}(i);if(!F(e,"image"))throw M(C,"invalid-img-upload"),"File uploaded is not an image!";const n=yield T(e);yield K(n),tt(),it(),Z(),nt(),et()}catch(t){a("File upload error:",{fileUploadError:t})}finally{b(C,"dragging")}}))}));const C=_(".index__label");C.addEventListener("dragover",(function(t){t.preventDefault(),J(),M(C,"dragging")})),C.addEventListener("dragleave",(function(t){t.preventDefault(),J(),b(C,"dragging")})),C.addEventListener("drop",(function(t){return A(this,void 0,void 0,(function*(){t.preventDefault(),s(t),J();try{const i=yield function(t){return Y(this,void 0,void 0,(function*(){try{const i=X(t.dataTransfer.files);return 1===i.length?i[0]:i}catch(t){a({fileRetrievalError:t})}}))}(t);if(!i)throw M(C,"invalid-drop"),"Data dropped is not a file!";if(!F(i,"image"))throw M(C,"invalid-img-drop"),"File dropped is not an image!";s(i);const e=yield T(i);yield K(e),tt(),it(),Z(),nt(),et()}catch(t){a("File drop error:",{fileDropError:t}),M(C,"invalid-drop")}finally{b(C,"dragging")}}))}));const $=_(".index__image");let q={width:0,height:0,aspectRatio:0};const z=_("main"),N=_(".index__controls"),B=_(".index__delete-button");B.addEventListener("click",(function(){e(j,W.width,W.height),$.src="",S.value="",M(B,"hide"),st(),Q.reset(),M(W,"hide"),M(N,"hide"),q={width:0,height:0,aspectRatio:0},i(W,0,0),b(C,"hide")}));const H=_("#pixel-resolution"),U=_("label[for=pixel-resolution]"),k=_("#mouse-radius"),O=_("label[for=mouse-radius]");H.addEventListener("input",(function(t){e(j,W.width,W.height);const i=Number(t.target.value);U.textContent=`Pixel resolution: ${i}px`,s("change",i),st(),Q.reset(),Q.createImage(i),nt()})),k.addEventListener("input",(function(t){const i=1e3*Number(t.target.value),e=(n=i,new Intl.NumberFormat(s,{maximumSignificantDigits:3}).format(n));var n,s;O.textContent=`Mouse radius: ${e}`,I.set("radius",i)})),s(k,U,H,O);const W=_(".index__canvas"),j=t(W);let G=0;function J(){b(C,"invalid-drop"),b(C,"invalid-img-drop"),b(C,"invalid-img-upload")}function K(t){return A(this,void 0,void 0,(function*(){$.src=t,$.addEventListener("load",V)}))}let Q=new class{constructor(i,e){this.canvas=i,this.context=t(i),this.particlesArray=[],this.imageElement=e}createImage(t=8){this.context.drawImage(this.imageElement,0,0),this.pixelsData=this.context.getImageData(0,0,this.canvas.width,this.canvas.height),this.convertToPixels(t)}animatePixels(t,i,e=2e4){for(const n of this.particlesArray)n.update(t,i,e),n.draw()}convertToPixels(t=1){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(let i=0;i<this.pixelsData.height;i+=t)for(let e=0;e<this.pixelsData.width;e+=t){const s=4*e+4*i*this.pixelsData.width;if(this.pixelsData.data[s+3]<10)continue;const a=this.pixelsData.data[s+0],o=this.pixelsData.data[s+1],r=this.pixelsData.data[s+2],c=`rgb(${a}, ${o}, ${r})`,h=new n(this.context,this.canvas.width,this.canvas.height,e,i,c,t);this.particlesArray.push(h)}}reset(){this.particlesArray=[]}}(W,$);function V(t){const{width:e,height:n}=t.currentTarget;q.width=e,q.height=n,q.aspectRatio=e/n;z.clientWidth<e||z.clientHeight<n?(s("Overflows!"),i(W,q.width,q.height)):i(W,q.width,q.height),function(t=1){Q.createImage(t)}(13),s(Q)}function Z(){b(N,"hide")}function tt(){b(C,"dragging"),M(C,"hide")}function it(){b(B,"hide")}function et(){b(W,"hide")}function nt(){e(j,W.width,W.height),Q.animatePixels(I.get("x"),I.get("y"),I.get("radius")),G=requestAnimationFrame(nt)}function st(){cancelAnimationFrame(G)}window.addEventListener("resize",(function(t){s("changed width")}))})()})();