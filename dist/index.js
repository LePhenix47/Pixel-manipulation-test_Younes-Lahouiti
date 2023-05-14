(()=>{"use strict";(()=>{function t(t){return t.getContext("2d")}function i(t,i,e){t.width=i,t.height=e}function e(t,i,e){t.clearRect(0,0,i,e)}class n{constructor(t,i,e,n,s,a,o,r=0){this.context=t,this.width=i,this.height=e,this.mouseRadius=2e4,this.originX=n,this.originY=s,this.color=a,this.x=Math.random()*this.width,this.y=Math.random()*this.height,this.gap=r,this.size=o-this.gap,this.vectorX=0,this.vectorY=0,this.mouseParticleDistanceX=0,this.mouseParticleDistanceY=0,this.mouseTotalDistance=0,this.force=0,this.angle=0,this.friction=.6*Math.random()+.15,this.ease=.2*Math.random()+.05}update(t,i){this.mouseParticleDistanceX=t-this.x,this.mouseParticleDistanceY=i-this.y,this.mouseTotalDistance=Math.pow(this.mouseParticleDistanceX,2)+Math.pow(this.mouseParticleDistanceY,2),this.force=-1*this.mouseRadius/this.mouseTotalDistance;this.mouseTotalDistance<this.mouseRadius&&(this.angle=Math.atan2(this.mouseParticleDistanceY,this.mouseParticleDistanceX),this.vectorX=Math.cos(this.angle)*this.force,this.vectorY=Math.sin(this.angle)*this.force),this.vectorX*=this.friction,this.vectorY*=this.friction,this.x+=this.vectorX+(this.originX-this.x)*this.ease,this.y+=this.vectorY+(this.originY-this.y)*this.ease}draw(){this.context.fillStyle=this.color,this.context.fillRect(this.x,this.y,this.size,this.size)}}const{log:s,error:a,table:o,time:r,timeEnd:c,timeStamp:h,timeLog:d,assert:l,clear:u,count:f,countReset:g,group:v,groupCollapsed:m,groupEnd:p,trace:x,profile:w,profileEnd:y,warn:D,debug:E,info:L,dir:P,dirxml:R}=console;function M(t,i){var e;if(!i)return document.querySelector(t);return(null===(e=null==i?void 0:i.tagName)||void 0===e?void 0:e.includes("-"))?i.shadowRoot.querySelector(t):i.querySelector(t)}function X(t,i){t.classList.add(i)}function Y(t,i){t.classList.remove(i)}function _(t){return Array.from(t)}var T=function(t,i,e,n){return new(e||(e=Promise))((function(s,a){function o(t){try{c(n.next(t))}catch(t){a(t)}}function r(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var i;t.done?s(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(o,r)}c((n=n.apply(t,i||[])).next())}))};function A(t,i){const{type:e}=t;var n,s;return(n=e,s="/",n.split(s))[0]===i}function F(t){return new Promise(((i,e)=>{const n=new FileReader;n.readAsDataURL(t),n.addEventListener("load",(()=>{const t=n.result;"string"!=typeof t?e("Error: Base64 string not found."):i(t)})),n.addEventListener("error",(()=>{e("Error: Failed to read audio file.")}))}))}var b=function(t,i,e,n){return new(e||(e=Promise))((function(s,a){function o(t){try{c(n.next(t))}catch(t){a(t)}}function r(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var i;t.done?s(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(o,r)}c((n=n.apply(t,i||[])).next())}))};const S=new Map;S.set("x",0),S.set("y",0),s("Hello world!");const q=M(".index__input");q.addEventListener("change",(function(t){return b(this,void 0,void 0,(function*(){H();try{const i=t.currentTarget,e=yield function(t){return T(this,void 0,void 0,(function*(){try{const i=_(t.files);return 1===i.length?i[0]:i}catch(t){a({fileRetrievalError:t})}}))}(i);if(!A(e,"image"))throw X(z,"invalid-img-upload"),"File uploaded is not an image!";const n=yield F(e);yield N(n),J(),O(),V(),Q()}catch(t){a("File upload error:",{fileUploadError:t})}finally{Y(z,"dragging")}}))}));const z=M(".index__label");z.addEventListener("dragover",(function(t){t.preventDefault(),H(),X(z,"dragging")})),z.addEventListener("dragleave",(function(t){t.preventDefault(),H(),Y(z,"dragging")})),z.addEventListener("drop",(function(t){return b(this,void 0,void 0,(function*(){t.preventDefault(),s(t),H();try{const i=yield function(t){return T(this,void 0,void 0,(function*(){try{const i=_(t.dataTransfer.files);return i.length<=1?i[0]:i}catch(t){a({fileRetrievalError:t})}}))}(t);if(!i)throw X(z,"invalid-drop"),"Data dropped is not a file!";if(!A(i,"image"))throw X(z,"invalid-img-drop"),"File dropped is not an image!";s(i);const e=yield F(i);yield N(e),J(),O(),V(),Q()}catch(t){a("File drop error:",{fileDropError:t}),X(z,"invalid-drop")}finally{Y(z,"dragging")}}))}));const I=M(".index__image"),$={width:0,height:0,aspectRatio:0},C=(M("main"),M(".index__delete-button"));C.addEventListener("click",(function(){e(k,U.width,U.height),I.src="",q.value="",X(C,"hide"),cancelAnimationFrame(B),j.reset(),X(U,"hide"),U.removeEventListener("mousemove",K),i(U,0,0),Y(z,"hide")}));const U=M(".index__canvas"),k=t(U);let B=0;function H(){Y(z,"invalid-drop"),Y(z,"invalid-img-drop"),Y(z,"invalid-img-upload")}function N(t){return b(this,void 0,void 0,(function*(){I.src=t,I.addEventListener("load",G)}))}let j=new class{constructor(i,e){this.canvas=i,this.context=t(i),this.particlesArray=[],this.imageElement=e}createImage(){this.context.drawImage(this.imageElement,0,0),this.pixelsData=this.context.getImageData(0,0,this.canvas.width,this.canvas.height),this.convertToPixels(20)}animatePixels(t,i){for(const e of this.particlesArray)e.update(t,i),e.draw()}convertToPixels(t=1){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(let i=0;i<this.pixelsData.height;i+=t)for(let e=0;e<this.pixelsData.width;e+=t){const s=4*e+4*i*this.pixelsData.width;if(this.pixelsData.data[s+3]<=0)continue;const a=this.pixelsData.data[s+0],o=this.pixelsData.data[s+1],r=this.pixelsData.data[s+2],c=`rgb(${a}, ${o}, ${r})`,h=new n(this.context,this.canvas.width,this.canvas.height,e,i,c,t);this.particlesArray.push(h)}}reset(){this.particlesArray=[]}}(U,I);function G(t){const{width:e,height:n}=t.currentTarget;$.width=e,$.height=n,$.aspectRatio=e/n,i(U,$.width,$.height),U.addEventListener("mousemove",K),s(j),j.createImage()}function J(){Y(z,"dragging"),X(z,"hide")}function K(t){S.set("x",t.x),S.set("y",t.y),s(S)}function O(){Y(C,"hide")}function Q(){Y(U,"hide")}function V(){e(k,U.width,U.height),j.animatePixels(S.get("x"),S.get("y")),B=requestAnimationFrame(V)}window.addEventListener("resize",(function(t){s("changed width")}))})()})();