const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const window={};vm.runInNewContext(fs.readFileSync('dist/hands-on.js','utf8'),{window});
const {WorkSession,profiles}=window.EldoriaHandsOn;
function workStep(s,release=(x,y)=>s.release(x,y)){
 const c=s.current,p={...s.position};assert(s.begin(p.x,p.y));
 if(c.mode==='place'){s.move(c.target.x,c.target.y);release(c.target.x,c.target.y);return;}
 if(c.mode==='mix'){for(let i=1;i<=150;i++){let a=i*Math.PI/24;s.move(470+83*Math.cos(a),360+59*Math.sin(a));}}
 else if(c.mode==='rub'||c.mode==='inspect'){for(let i=0;i<7;i++)s.move(p.x+(i%2?-90:90),p.y);}
 else if(c.mode==='trace')s.move(p.x+270,p.y);
 else if(c.mode==='open'||c.mode==='close')s.move(p.x-240,p.y);
 else if(c.mode==='pluck')s.move(p.x,p.y-190);
 else if(c.mode==='dial'){s.move(p.x+(0.58-s.heat)*320,p.y);}
 else if(c.mode==='heat'){s.move(p.x+(0.58-s.heat)*320,p.y);for(let i=0;i<130;i++)s.tick(.1);}
 else if(c.mode==='pour'){s.move(p.x+100,p.y);for(let i=0;i<30;i++)s.tick(.1);}
 else for(let i=0;i<30;i++)s.tick(.1);
 const last=s.last;assert(s.progress>=1,`${s.profile}: ${c.mode} was not worked`);release(last.x,last.y);
}
for(const profile of profiles){let s=new WorkSession(profile);assert(s.steps.length>0);for(let i=0;i<400;i++)s.tick(.1);assert.equal(s.index,0,profile+' advanced without input');assert.equal(s.finished,false);assert(!s.begin(-900,-900));
 for(let limit=0;!s.finished&&limit<30;limit++)workStep(s);
 assert.equal(s.finished,true,profile+' did not finish');assert.equal(s.completed.length,s.steps.length);let n=s.index;s.tick(.1);assert.equal(s.index,n);assert(!s.begin(200,200));
 let cancelled=new WorkSession(profile);cancelled.cancel();assert(!cancelled.begin(230,360));assert.equal(cancelled.finished,false);
}
let badDrop=new WorkSession('trade');badDrop.begin(230,360);badDrop.move(10,10);assert(!badDrop.release(10,10));assert.equal(badDrop.index,0);
let offLine=new WorkSession('boot');offLine.begin(230,360);offLine.move(500,500);assert(!offLine.release(500,500));assert.equal(offLine.index,0);
let heat=new WorkSession('kitchen');heat.index=heat.steps.findIndex(s=>s.mode==='heat');heat.position={x:470,y:440};heat.heat=.95;heat.begin(470,440);for(let i=0;i<200;i++)heat.tick(.1);assert.equal(heat.cook,0);assert(!heat.release(470,440));heat.heat=.58;for(let i=0;i<200;i++)heat.tick(.1);assert.equal(heat.cook,0,'Cooking advances without active tending');
let pour=new WorkSession('water');pour.index=1;pour.position={...pour.current.source};pour.begin(pour.position.x,pour.position.y);for(let i=0;i<100;i++)pour.tick(.1);assert.equal(pour.progress,0,'Upright jug pours itself');
console.log(`Passed: all ${profiles.length} hands-on activity plans; input-only progress; valid drag targets, cut lines, circles, strokes, holds and heat; failed inputs, cancellation and no idle cooking.`);

// Exercise the real event adapter at a phone-sized canvas, including a second touch.
const ctx=new Proxy({createLinearGradient(){return {addColorStop(){}}},createRadialGradient(){return {addColorStop(){}}}}, {get:(o,k)=>o[k]||(o[k]=()=>{})});
function element(){return {style:{},events:{},append(){},setAttribute(){},getContext(){return ctx},focus(){},setPointerCapture(){},getBoundingClientRect(){return {left:20,top:100,width:360,height:225}},addEventListener(name,fn){this.events[name]=fn}};}
let testWindow={requestAnimationFrame(){return 1},cancelAnimationFrame(){},navigator:{}};vm.runInNewContext(fs.readFileSync('dist/hands-on.js','utf8'),{window:testWindow,document:{createElement:element,body:element()}});
let completed=0,cancelled=0,view=new testWindow.EldoriaHandsOn.Experience();view.start('cupboard',{onComplete:()=>completed++,onCancel:()=>cancelled++});
const event=(p,id=1)=>({clientX:20+p.x*360/960,clientY:100+p.y*225/600,pointerId:id,button:0,preventDefault(){}});
let p={...view.active.position};view.canvas.events.pointerdown(event(p));assert(view.active.pointer,'Phone-sized handle cannot be grabbed');view.canvas.events.pointerdown(event({x:1,y:1},2));assert.equal(view.pointerId,1,'Second touch took over');
view.canvas.events.pointermove(event({x:p.x-240,y:p.y}));view.canvas.events.pointerup(event({x:p.x-240,y:p.y}));assert.equal(view.active.index,1,'Phone drag did not open door');assert.equal(completed,0);
view.canvas.events.pointerdown(event(view.active.position));view.canvas.events.pointercancel();assert.equal(view.active.progress,0);assert.equal(view.active.pointer,null);view.cancel();assert.equal(completed,0);assert.equal(cancelled,1);assert(view.element.hidden);
view.start('records',{onComplete:()=>completed++});while(view.active)workStep(view.active,(x,y)=>view.release(x,y));assert.equal(completed,1);view.release(0,0);assert.equal(completed,1,'Completion repeated');
console.log('Passed: phone coordinate scaling, actual pointer event adapter, multitouch exclusion, pointer cancellation, overlay cleanup and exactly-once completion.');
