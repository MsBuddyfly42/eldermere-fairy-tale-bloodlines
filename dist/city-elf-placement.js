/* Feet use coordinates in the photographed floor, projected through the same crop as the room. */
(()=>{'use strict';
const sprites=[[181,11,464,507],[153,7,385,512],[81,6,347,509],[135,4,512,506],[133,0,392,509],[114,1,433,507],[208,8,425,507],[126,16,437,512],[114,9,354,510],[158,2,415,501],[124,0,425,499],[110,4,363,504]];
const streets={
 capital:[[23,88],[41,83],[60,94],[78,87]],market:[[24,89],[42,83],[61,94],[79,87]],
 home:[[24,89],[35,95],[44,84],[53,93]],gardens:[[29,90],[45,84],[61,94],[76,88]],
 festival:[[25,89],[43,83],[61,94],[78,88]],workshop:[[24,90],[43,84],[62,94],[78,88]],
 academy:[[29,91],[45,84],[62,94],[75,88]],forest:[[34,91],[46,83],[58,94],[68,88]],
 forgotten:[[28,91],[44,84],[61,94],[75,88]],court:[[26,90],[43,84],[61,94],[77,88]],library:[[29,90],[45,84],[62,94],[76,88]]};
const floors={
 'neighbor-pip':[[54,94]],'neighbor-fern':[[51,95]],'neighbor-cobble':[[56,93]],'neighbor-willow':[[53,95]],
 'cottage-sitting':[[37,92]],'cottage':[[43,93]],'county-legacy':[[48,94]],
 'county-camp':[[25,90],[72,86],[84,95]],'county-market':[[39,93],[62,87]],'county-garden':[[43,93],[61,87]],
 treehouse:[[43,93],[61,87]],'original-shoemaker':[[45,95],[68,91]],
 workshop:[[43,94],[65,88]],shop:[[44,94],[62,88]],tavern:[[43,94],[62,88]],
 study:[[50,94],[66,88]],stable:[[44,94],[62,88]],dormitory:[[44,94],[63,88]],
 apothecary:[[44,94],[61,88]],greenhouse:[[44,94],[61,87]],sanctuary:[[45,94],[62,88]],
 library:[[44,94],[62,87]],manor:[[43,94],[61,87]],royal:[[44,94],[62,87]],runes:[[44,94],[61,87]],moonwell:[[44,94],[62,87]],festival:[[44,94],[62,87]],cellar:[[44,94],[62,87]],'willow-lane':[[41,94],[49,87],[58,95],[66,89]]};
function crop(w,h,imageWidth=768,imageHeight=512){const ratio=imageWidth/imageHeight,width=Math.max(w,h*ratio),height=width/ratio;return{width,height,left:(w-width)/2,top:(h-height)/2}}
function sprite(id){const i=((id%12)+12)%12,[left,top,right,bottom]=sprites[i],width=right-left,height=bottom-top,cell=i%6;return{left:cell%3*512+left,top:Math.floor(cell/3)*512+top,width,height}}
function place({width,height,imageWidth=768,imageHeight=512,district,room,image,count,mobile=false,spriteIds=[]}){const g=crop(width,height,imageWidth,imageHeight),base=String(image||'').replace(/-night$/,''),inside=!!room;let anchors=inside?(floors[base]||[[44,94],[62,88]]):(streets[district]||streets.capital);if(mobile&&count>1)anchors=!inside&&district==='home'?[[38,94],[53,86]]:[[43,94],[61,87]];const result=[];for(let i=0;i<count;i++){const anchor=anchors[i%anchors.length],box=sprite(spriteIds[i]??i),depth=.92+(anchor[1]-82)*.012;const figureHeight=Math.min(mobile?315:390,height*(inside?.49:.47)*depth),figureWidth=figureHeight*box.width/box.height;let x=g.left+anchor[0]*g.width/100;const inset=Math.min(width*.26,figureWidth*.48+6);x=Math.max(inset,Math.min(width-inset,x));const y=g.top+anchor[1]*g.height/100;result.push({x,y,width:figureWidth,height:figureHeight,box,groundX:(x-g.left)/g.width*100,groundY:anchor[1]})}return result}
globalThis.EldoriaElfPlacement={sprites,sprite,crop,place,streets,floors};
})();
