/* Authored photograph coordinates. A route is not inferred from building list order. */
(()=>{'use strict';
const entrances={
 capital:{archive:[11,56],tavern:[55,63],manor:[93,54]},
 market:{shop:[14,54],merchant:[86,57]},
 home:{home:[78,55],willowLane:[15,69]},
 gardens:{garden:[28,61],creatures:[88,57]},
 festival:{lantern:[30,67],game:[81,68]},
 workshop:{originalShop:[24,55],orders:[69,58]},
 academy:{potion:[26,62],runes:[57,57],spellAtelier:[88,55]},
 forest:{oak:[24,43],well:[81,65]},
 forgotten:{carriage:[13,56],orphanage:[82,58]},
 court:{court:[88,57]},library:{portraits:[88,60],mysteries:[42,61]},
 willowLane:{pipHome:[13,48],fernHome:[87,47],cobbleHome:[38,42]}
};
const interior={home:{cottageKitchen:[75,39],cottageSitting:[23,48]},cottageBasement:{cottageKitchen:[14,24]},cottagePorch:{cottageKitchen:[20,31],cottageYard:[92,64]},owlPorch:{owlRoom:[75,46]}};
const cottage={home:['cottageSitting','cottageKitchen','cottageDen','cottageBedroom','legacyRoom'],cottageKitchen:['home','cottageSitting','cottageBasement','cottagePorch'],cottageBath:['cottageBedroom'],cottageSitting:['home','cottageKitchen','cottageDen'],cottageDen:['home','cottageSitting'],cottageBasement:['cottageKitchen'],cottageBedroom:['home','cottageBath'],cottagePorch:['cottageKitchen','cottageYard'],cottageYard:['cottagePorch'],legacyRoom:['home']};
const within=[['originalShop','craft'],['craft','orders'],['court','bloodlines'],['portraits','memoryHall'],['memoryHall','mysteries']];
const parent={craft:'originalShop',bloodlines:'court',memoryHall:'portraits',pipHome:'willowLane',fernHome:'willowLane',cobbleHome:'willowLane',willowHome:'willowLane',willowLane:'@home',home:'@home',cottageKitchen:'home',cottageSitting:'home',cottageDen:'home',cottageBedroom:'home',cottageBath:'cottageBedroom',cottageBasement:'cottageKitchen',cottagePorch:'cottageKitchen',cottageYard:'cottagePorch',legacyRoom:'home'};
function graph(district,rooms){const g={};function edge(a,b){(g[a]??=[]);(g[b]??=[]);if(!g[a].includes(b))g[a].push(b);if(!g[b].includes(a))g[b].push(a)}const street='@'+district;g[street]=[];for(const id of rooms){if(district==='home'&&Object.hasOwn(cottage,id))continue;if(district==='home'&&['pipHome','fernHome','cobbleHome','willowHome'].includes(id))continue;if(['craft','bloodlines','memoryHall'].includes(id))continue;edge(street,id)}if(district==='home'){edge(street,'home');for(const [id,neighbors]of Object.entries(cottage))for(const next of neighbors)edge(id,next);for(const id of ['pipHome','fernHome','cobbleHome','willowHome'])edge('willowLane',id)}for(const [a,b]of within)if(rooms.includes(a)&&rooms.includes(b))edge(a,b);return g}
function back(district,room){return parent[room]||'@'+district}
function anchor(district,room,target){return room?(room==='willowLane'?entrances.willowLane?.[target]:interior[room]?.[target])||null:entrances[district]?.[target]||null}
function path(g,from,to){const q=[[from]],seen=new Set([from]);while(q.length){const p=q.shift(),at=p[p.length-1];if(at===to)return p;for(const n of g[at]||[])if(!seen.has(n)){seen.add(n);q.push([...p,n])}}return[]}
globalThis.EldoriaConnectionsModel={entrances,interior,cottage,graph,back,anchor,path};
})();
