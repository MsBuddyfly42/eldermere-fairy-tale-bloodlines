/* Window openings are measured against the original photographic room, not the viewport. */
(()=>{'use strict';
const rect=(x,y,w,h,cols=2,rows=3)=>({quad:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],cols,rows});
const arch=(x,y,w,h,cols=2,rows=3)=>({...rect(x,y,w,h,cols,rows),arch:true});
const quad=(points,cols=2,rows=3)=>({quad:points,cols,rows});
const openings={
 'cottage-kitchen':[quad([[65.3,18.7],[72.4,17.8],[72.4,40],[65.3,40.8]],3,4),quad([[74.4,17.3],[83.2,16.1],[83.2,39.2],[74.4,40]],1,1),quad([[85.1,16.2],[90.6,15.9],[90.6,38.8],[85.1,39]],2,4)],
 'cottage-bath':[quad([[19,6.7],[30.2,7.4],[30.2,38],[19,38]],3,4),quad([[32.2,7.8],[42.4,9],[42.4,38],[32.2,38]],3,4)],
 'cottage-sitting':[quad([[69.8,16.5],[74.5,15.1],[74.5,36.4],[69.8,36.4]],2,3),quad([[75.7,14.9],[79.8,13.4],[79.8,36.4],[75.7,36.4]],1,3),quad([[80.8,13.2],[84.5,12.6],[84.5,36.4],[80.8,36.4]],1,3)],
 'cottage-den':[quad([[11.8,4.7],[17.3,5.5],[17.3,29.8],[11.8,28.8]],2,3),quad([[19.3,5.8],[25.4,6.8],[25.4,29.2],[19.3,30]],2,3)],
 'cottage-bedroom':[rect(54.2,15,5.3,21,1,4),rect(61.5,15,8.3,22,2,4),rect(73.2,14.9,6.4,21,2,4)],
 'cottage-basement':[rect(9,0,7,9,2,2),rect(17.8,0,3.3,8,1,2)],
 cottage:[arch(32.3,17,5.2,19,1,3),arch(38.4,17,5.4,20,1,3),arch(44.8,17,5.2,19,1,3),arch(65,21,7,13,2,2)],
 'neighbor-pip':[rect(23.3,7.4,5.2,9.5,2,2),quad([[76,8],[80,6],[80,40],[76,44]],1,3),quad([[81.5,5],[90,1],[90,42],[81.5,40]],2,3)],
 'neighbor-fern':[rect(75.9,15,4.4,12,1,3),quad([[83.8,11],[99.7,8],[99.7,26],[83.8,28]],4,3)],
 'neighbor-cobble':[rect(71.1,1,5,14,2,3),quad([[93,0],[100,0],[100,61],[93,56]],2,5)],
 'neighbor-willow':[quad([[14.7,13],[25,18],[25,32],[14.7,32]],3,3),quad([[27,19],[40,22],[40,35],[27,33]],3,3),quad([[17,1],[36,1],[42,9],[30,13]],4,2)],
 'county-legacy':[rect(32,22,5,10,2,3)],
 'original-shoemaker':[arch(25.3,5.5,8.6,20,2,3)],
 treehouse:[arch(17.2,17.5,9.4,27,2,4),arch(37.5,30.5,8.4,12.7,2,2),arch(71.5,21,7,18,2,3),arch(83,23,6,19,2,3),arch(38.5,0,8,7,2,2)],
 apothecary:[arch(43.4,10.5,13.8,24,3,3),arch(2,4,6,32,1,4)],
 dormitory:[arch(65.5,32,3,14,1,3),rect(26.6,7,2.6,35,1,5)],
 greenhouse:[quad([[16,6],[27,15],[27,42],[16,43]],3,4),quad([[30,18],[38,21],[38,43],[30,44]],2,4),arch(48.3,2,9.5,41,2,5),quad([[60,3],[66,0],[66,40],[60,41]],2,5),quad([[8,0],[16,0],[37,14],[30,16]],4,2)],
 library:[arch(38,0,4.5,28,1,5),arch(46.5,0,4.5,28,1,5),arch(53,0,4.2,27,1,5)],
 manor:[arch(1,5,7,34,2,4),arch(34,47,4.5,11,1,2),arch(45,43,5,15,1,3),arch(55.5,45,4.5,12,1,2)],
 moonwell:[arch(29,15,5.6,23,1,4),arch(73.5,23,7,21,2,3),arch(82,15,8,23,2,3)],
 royal:[arch(47,1,8.5,43,2,6),arch(31.8,15,4,27,1,4),arch(63,17,4.5,27,1,4)],
 runes:[arch(49.5,18.5,6.9,26.5,2,4),arch(8,0,6,42,2,5),arch(27.7,0,4,32,1,4)],
 sanctuary:[arch(44.7,24,9.2,17,2,3),arch(88.5,7,11,29,2,4),arch(42.5,0,7.5,4,2,1)],
 shop:[arch(48.4,19,5.8,11,2,2)],
 stable:[rect(56,16,7.7,12,2,3),rect(55,41,9,14,1,1)],
 study:[arch(4.5,0,8.7,43,2,5)],
 tavern:[arch(33.8,27,7.2,18.8,2,3),arch(46,32,7.5,14,2,2)],
 workshop:[arch(0,1,8.3,30,2,4),arch(10,6,7,23,2,3)],
 festival:[arch(20,39,6,15,2,3),arch(29,39,7,15,2,3),arch(43,40,7.5,14,2,3),arch(55,39,7,13,2,3),quad([[83,28],[95,20],[95,35],[83,40]],3,2)],
 cellar:[arch(31,4,10.5,29,2,4)]
};
const blockers={
 'cottage-kitchen':[[[62,10],[68,10],[68,26],[66.5,34],[64,33]],[[64,34],[72.4,34.8],[73,42],[63,42]],[[75,36.5],[81,33.5],[84,39],[84,43],[74,43]],[[87,34],[92,31],[94,42],[87,42]]],

 'cottage-den':[[[9,26],[14,24],[16,33],[11,35]]],
 'cottage-sitting':[[[68,26],[71,23],[74,25],[74,34],[76,36],[73,40],[68,39]]]
};
function base(name){return String(name||'').replace(/-night$/,'')}
function windows(image){return openings[base(image)]||[]}
function lerp(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]}
function point(q,u,v){return lerp(lerp(q[0],q[1],u),lerp(q[3],q[2],u),v)}
function panes(window){const {quad:q,cols=1,rows=1}=window,out=[],gap=window.gap??.045;for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const l=(x+gap)/cols,r=(x+1-gap)/cols,t=(y+gap)/rows,b=(y+1-gap)/rows;out.push([point(q,l,t),point(q,r,t),point(q,r,b),point(q,l,b)])}return out}
function layout(width,height,imageWidth,imageHeight){const ratio=imageWidth/imageHeight,w=Math.max(width,height*ratio),h=w/ratio;return{width:w,height:h,left:(width-w)/2,top:(height-h)/2}}
function source(district,room,phase){const night=phase==='night';if(room==='home'||room==='legacyRoom'||room?.startsWith('cottage'))return{url:'assets/interiors/cottage-yard'+(night?'-night':'')+'.jpg',cell:null};if(['pipHome','fernHome','cobbleHome','willowHome'].includes(room))return{url:'assets/interiors/willow-lane'+(night?'-night':'')+'.jpg',cell:null};const cells={capital:['a',0],market:['a',1],home:['a',2],gardens:['a',3],festival:['b',0],workshop:['b',1],academy:['b',2],forest:['b',3],forgotten:['c',0],court:['c',1],library:['c',2]};const [atlas,cell]=cells[district]||cells.home;return{url:'assets/city/city-'+atlas+(night?'-night':'')+'.webp',cell}}
function weatherStyle(weather){const snow=['snow','snowstorm','blizzard'].includes(weather);return{snow,density:weather==='clear'?0:weather==='blizzard'?240:weather==='snowstorm'?180:weather==='thunderstorm'?170:weather==='rain'?130:100,wind:weather==='blizzard'?8:weather==='snowstorm'?4:weather==='thunderstorm'?3:snow?.6:1.1,fall:snow?(weather==='snow'?1:3.4):weather==='sleet'?13:17,fog:weather==='blizzard'?.58:weather==='snowstorm'?.3:weather==='snow'?.08:weather==='thunderstorm'?.18:weather==='clear'?0:.07}}
globalThis.EldoriaInteriorWeatherModel={openings,blockers,windows,panes,layout,source,weatherStyle};
})();
