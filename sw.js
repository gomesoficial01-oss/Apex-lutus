// Service Worker do A.P.E.X. Mude VERSION a cada atualização; os dados do usuário (localStorage) não são tocados.
// Só intercepta GET do próprio site. Chamadas a outros endereços (como a IA) passam direto, sem cache nem substituição.
const VERSION="apex-v27";
const FILES=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()))))});
