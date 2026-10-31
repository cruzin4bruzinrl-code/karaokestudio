/* KaraokeStudio service worker
   1) Appskalet fungerar offline (nätet först, så nya versioner alltid syns direkt).
   2) Sidan får COOP/COEP-huvuden → flertrådad, snabbare AI även utan serverinställningar. */
const SHELL="ks-shell-v3";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
function isolate(res){
  const h=new Headers(res.headers);
  h.set("Cross-Origin-Opener-Policy","same-origin");
  h.set("Cross-Origin-Embedder-Policy","credentialless");
  return new Response(res.body,{status:res.status,statusText:res.statusText,headers:h});
}
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET")return;
  const u=new URL(r.url);
  if(u.origin!==self.location.origin)return;
  const isDoc=r.mode==="navigate";
  const isShell=isDoc||/\/(manifest\.webmanifest|icon-[a-z0-9-]+\.png|fonts\/[a-z0-9-]+\.woff)$/.test(u.pathname);
  if(!isShell)return;
  e.respondWith((async()=>{
    const cache=await caches.open(SHELL);
    try{
      const net=await fetch(r);
      if(!net.ok)return net;                       /* omdirigeringar och fel lämnas orörda */
      cache.put(r,net.clone()).catch(()=>{});
      return isDoc?isolate(net):net;
    }catch(err){
      const hit=await cache.match(r,{ignoreSearch:true});
      if(hit)return isDoc?isolate(hit):hit;
      throw err;
    }
  })());
});
