(function(global){
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const step=(name,mode,item='Tool',extra={})=>({name,mode,item,source:{x:230,y:360},target:{x:640,y:370},...extra});
const recipes={
 cupboard:[['Pull the handle to open the cupboard','open','Cupboard handle'],['Lift the pantry jar onto the counter','place','Pantry jar'],['Return the jar to its shelf','place','Pantry jar'],['Push the door closed','close','Cupboard handle']],
 boot:[['Follow the leather pattern with your knife','trace','Leather knife'],['Fit the upper onto the sole','place','Leather upper'],['Pull the needle through four stitches','rub','Silver needle'],['Press the quiet sole into place','hold','Boot sole']],
 plant:[['Work the trowel through the soil','rub','Trowel'],['Drop the seed into the planting hole','place','Seed'],['Sweep loose soil over the seed','rub','Soil']],
 water:[['Lift the jug to the roots','place','Watering jug'],['Tilt and hold to water the roots','pour','Watering jug'],['Return the jug to the bench','place','Watering jug']],
 harvest:[['Pull the first ripe plant free','pluck','Ripe plant'],['Pull the second ripe plant free','pluck','Ripe plant'],['Put your harvest in the basket','place','Harvest']],
 repair:[['Fit the timber against the broken board','place','Timber'],['Drive the first fastening','rub','Hammer'],['Drive the second fastening','rub','Hammer'],['Attach the weather cover','place','Cover']],
 polish:[['Brush the dust off the heirloom','rub','Soft cloth'],['Polish the left face until it shines','rub','Soft cloth'],['Polish the right face until it shines','rub','Soft cloth']],
 stitch:[['Draw the thread through the needle','trace','Thread'],['Follow the first seam','trace','Needle'],['Follow the second seam','trace','Needle'],['Pull the finishing knot tight','pluck','Thread']],
 weave:[['Place the warp thread on the loom','place','Thread'],['Guide the shuttle across the warp','trace','Shuttle'],['Pull the woven ribbon off the loom','pluck','Ribbon']],
 balance:[['Put the heirloom coin on the left scale','place','Heirloom coin'],['Place the counterweight on the right scale','place','Counterweight'],['Adjust the balance until both sides match','dial','Scale adjustment']],
 bowls:[['Put the small bowl at the first setting','place','Small bowl'],['Put the medium bowl at the second setting','place','Medium bowl'],['Put the large bowl at the final setting','place','Large bowl']],
 feed:[['Set the bowl beside the animal','place','Feeding bowl'],['Place the food in its bowl','place','Moonleaf'],['Hold your hand still while it approaches','hold','Open hand']],
 pet:[['Offer your hand and wait','hold','Open hand'],['Stroke gently back and forth','rub','Gentle hand'],['Move your hand away to give it room','pluck','Open hand']],
 share:[['Pack the provisions into the basket','place','Provisions'],['Carry the basket to the receiving hands','place','Basket'],['Release your gift into their hands','place','Gift']],
 parcel:[['Lift the parcel onto the desk','place','Parcel'],['Turn the tag to read its address','inspect','Delivery tag'],['Set the checked parcel in the dispatch tray','place','Parcel']],
 inspect:[['Turn the object to catch the light','inspect','Evidence'],['Inspect the marking from both sides','inspect','Marked detail'],['Write the detail into your notebook','trace','Quill']],
 records:[['Pull the cover open','open','Record book'],['Turn the page and compare the seal','inspect','Record page'],['Press the seal onto the checked record','stamp','Seal stamp']],
 council:[['Unroll the charter onto the council desk','place','Charter'],['Sign along the recommendation line','trace','Quill'],['Press the council seal into the wax','stamp','Council seal']],
 meal:[['Set the plate and cup at your place','place','Plate'],['Lift the cup and tilt it gently','pour','Tea cup'],['Lift a bite to enjoy your meal','place','Fresh bread']],
 lantern:[['Place the wick into the lantern','place','Wick'],['Hold the flame to the wick','hold','Taper'],['Lift and release the glowing lantern','pluck','Lantern']],
 music:[['Pull the harp string and release it','pluck','Harp string']],
 rune:[['Lift the chosen rune from the tray','place','Rune'],['Fit it into the stone sequence','place','Rune']],
 equip:[['Lift the equipment from the table','place','Equipment'],['Fasten it into your hand strap','trace','Hand strap']],
 decor:[['Lift your decoration from the tray','place','Decoration'],['Place it where you want it','place','Decoration']],
 rewards:[['Set the finished work on the desk','place','Completed work'],['Sign your homecoming register','trace','Quill'],['Pick up your earned mooncoins','pluck','Coin pouch']],
 chest:[['Pull the chest latch free','pluck','Latch'],['Lift the lid open','open','Chest lid'],['Lift the discovery from the chest','place','Discovery']],
 wish:[['Lift the smooth wishing stone','place','Wishing stone'],['Place the stone into the moonwell','place','Wishing stone']],
 trade:[['Place the goods on the counter','place','Goods'],['Move the payment into the counting tray','place','Mooncoins'],['Pass the goods into the receiving basket','place','Goods']],
 fishing:[['Pull back and cast the line into the river','trace','Fishing rod'],['Hold the bobber while it dips for a bite','hold','Bobber'],['Turn the reel to bring your fish to shore','mix','Reel']],
 archery:[['Pull the bowstring back','pluck','Bowstring'],['Move the arrow onto the target','place','Arrow'],['Release the arrow toward the target','pluck','Bowstring']],
 catch:Array.from({length:5},(_,i)=>['Catch lantern light '+(i+1),'place','Lantern light'])
};
function planFor(profile,options={}){
 if(profile==='decor'&&/writing desk/i.test(options.title||''))return ['Notebook','Quill','Writing papers'].map(item=>step('Place the '+item.toLowerCase()+' in its working spot','place',item));
 if(['kitchen','bread','potion'].includes(profile)){
  let ingredients=options.ingredients|| (profile==='bread'?['Flour','Honey','Moonleaf']:profile==='potion'?['Moonleaf','Springwater','Honey']:['Vegetables','Herbs','Water']);
  let out=ingredients.map(item=>step('Bring '+item+' to your '+(profile==='kitchen'?'preparation board':'mixing bowl'),'place',item));
  if(profile==='kitchen')out.push(step(/tea/i.test(options.title||'')?'Crush the herbs with the pestle':'Cut the ingredients along the marked line',/tea/i.test(options.title||'')?'rub':'trace',/tea/i.test(options.title||'')?'Pestle':'Kitchen knife'));
  out.push(step(profile==='potion'?'Stir the draught in full circles':'Mix in three full circles','mix','Wooden spoon'));
  if(profile==='bread')out.push(step('Knead and fold the dough four times','rub','Dough'));
  out.push(step(profile==='bread'?'Place the shaped dough in the oven':'Move the mixture onto the hearth','place',profile==='bread'?'Dough':'Cooking pot'));
  out.push(step('Turn the heat into the green range','dial','Hearth control'));
  out.push(step(profile==='bread'?'Keep the heat steady while the bread browns':'Keep gentle heat steady while it cooks','heat','Hearth control',{seconds:profile==='bread'?10:8}));
  out.push(step(profile==='potion'?'Pour the finished draught into its bottle':profile==='bread'?'Lift the golden loaf onto the serving board':'Serve your finished dish onto the plate','place',profile==='potion'?'Draught bottle':profile==='bread'?'Golden loaf':'Finished dish'));
  return out;
 }
 return (recipes[profile]||recipes.inspect).map(([name,mode,item],i)=>step(name,mode,item,
  profile==='cupboard'&&i===1?{source:{x:520,y:285},target:{x:640,y:490}}:
  profile==='cupboard'&&i===2?{source:{x:640,y:490},target:{x:520,y:285}}:
  {source:{x:230+(i%2)*45,y:360},target:{x:640,y:370}}));
}
class WorkSession{
 constructor(profile,options={}){this.profile=profile;this.title=options.title||profile;this.skin=options.skin||'#ad8870';this.steps=planFor(profile,options);this.index=0;this.progress=0;this.finished=false;this.cancelled=false;this.heat=.22;this.cook=0;this.completed=[];this.pointer=null;this.last=null;this.metrics={};this.position={...this.current.source};this.door=0;this.feedback='';}
 get current(){return this.steps[Math.min(this.index,this.steps.length-1)];}
 begin(x,y,time=0){if(this.finished||this.cancelled)return false;let p={x,y};if(dist(p,this.position)>105)return false;this.pointer={x,y,startX:x,startY:y,time};this.last={x,y};this.metrics={distance:0,turns:0,sign:0,sweep:0,circle:0,angle:Math.atan2(y-360,x-470),tilt:0};return true;}
 move(x,y,time=0){if(!this.pointer)return;let p=this.pointer,m=this.metrics,c=this.current,dx=x-this.last.x,dy=y-this.last.y;
  m.distance+=Math.hypot(dx,dy);if(Math.abs(dx)>2){let sign=Math.sign(dx);if(m.sign&&sign!==m.sign&&m.sweep>35){m.turns++;m.sweep=0;}m.sign=sign;m.sweep+=Math.abs(dx);}
  if(c.mode==='mix'){let angle=Math.atan2(y-360,x-470),delta=Math.atan2(Math.sin(angle-m.angle),Math.cos(angle-m.angle));if(Math.hypot(x-470,y-360)>30&&Math.abs(delta)<.9)m.circle+=Math.abs(delta);m.angle=angle;this.progress=clamp(m.circle/(Math.PI*6),0,1);this.position={x,y};}
  else if(c.mode==='rub'||c.mode==='inspect'){this.progress=clamp(m.turns/(c.mode==='inspect'?2:4),0,1);this.position={x:clamp(x,200,720),y:clamp(y,290,450)};}
  else if(c.mode==='trace'){let yy=Math.abs(y-p.startY);this.progress=yy>65?0:clamp((x-p.startX)/260,0,1);this.position={x,y};if(yy>65)this.feedback='Follow the marked line. Try the stroke again.';}
  else if(c.mode==='open'||c.mode==='close'){this.progress=clamp(Math.abs(x-p.startX)/220,0,1);this.door=c.mode==='open'?this.progress:1-this.progress;this.position={x,y};}
  else if(c.mode==='pluck'){this.progress=clamp(Math.hypot(x-p.startX,y-p.startY)/170,0,1);this.position={x,y};}
  else if(c.mode==='dial'||c.mode==='heat'){this.heat=clamp(this.heat+dx/320,0,1);this.progress=c.mode==='dial'?(this.heat>=.42&&this.heat<=.72?1:0):this.cook/c.seconds;this.position={...c.source};}
  else if(c.mode==='pour'){m.tilt=Math.abs(x-p.startX)>65?1:0;this.position={x:clamp(x,200,720),y:clamp(y,290,450)};}
  else if(c.mode==='place'){this.position={x,y};this.progress=clamp(1-dist(this.position,c.target)/410,0,.99);}
  this.last={x,y};
 }
 tick(dt){if(this.finished||this.cancelled)return;dt=clamp(dt,0,.1);if(!this.pointer)return;let c=this.current;
  if(c.mode==='hold'||c.mode==='stamp')this.progress=clamp(this.progress+dt/(c.mode==='stamp'?1.3:2.5),0,1);
  if(c.mode==='pour'&&this.metrics.tilt)this.progress=clamp(this.progress+dt/2.5,0,1);
  if(c.mode==='heat'){if(this.heat>=.42&&this.heat<=.72){this.cook+=dt;this.feedback='Gentle heat · keep it steady';}else{this.cook=Math.max(0,this.cook-dt*.25);this.feedback=this.heat<.42?'Too cool · turn the heat up':'Too hot · lower the heat';}this.progress=clamp(this.cook/c.seconds,0,1);}
 }
 release(x,y){if(!this.pointer)return false;let c=this.current,ok=c.mode==='place'?dist({x,y},c.target)<82:this.progress>=1;this.pointer=null;
  if(!ok){this.position={...c.source};this.progress=0;if(c.mode==='open')this.door=0;if(c.mode==='close')this.door=1;this.feedback=c.mode==='place'?'Drop the item into the glowing work area.':'Keep working through this step.';return false;}
  this.completed.push(c.item);this.index++;this.progress=0;this.cook=0;this.feedback='';this.metrics={};if(this.index===this.steps.length){this.finished=true;return true;}this.position={...this.current.source};if(this.current.mode==='mix')this.position={x:540,y:360};if(['dial','heat'].includes(this.current.mode))this.position={x:470,y:440};return true;
 }
 cancel(){this.cancelled=true;this.pointer=null;}
}
function rounded(ctx,x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function text(ctx,t,x,y,size=20,color='#f3e8d0',align='center'){ctx.font=`${size}px Georgia,serif`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(t,x,y);}
function wood(ctx,x,y,w,h){let g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#816044');g.addColorStop(.45,'#b18c61');g.addColorStop(1,'#634633');rounded(ctx,x,y,w,h,12,g);ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.strokeStyle='#3b261b35';ctx.lineWidth=1;for(let i=0;i<48;i++){ctx.beginPath();let yy=y+i*h/48;ctx.moveTo(x,yy);ctx.bezierCurveTo(x+w*.3,yy+Math.sin(i)*7,x+w*.7,yy-Math.sin(i*2)*6,x+w,yy);ctx.stroke();}ctx.restore();}
function item(ctx,label,x,y,scale=1,color='#b68a50'){
 ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.shadowColor='#0009';ctx.shadowBlur=12;ctx.shadowOffsetY=9;
 let lower=label.toLowerCase();
 if(/knife|needle|quill|shuttle|trowel|pestle|hammer|spoon/.test(lower)){ctx.rotate(-.35);rounded(ctx,-12,0,24,74,7,'#694531');let g=ctx.createLinearGradient(-20,-75,25,0);g.addColorStop(0,'#f5f1df');g.addColorStop(.5,'#9aa8a8');g.addColorStop(1,'#e1d3ae');rounded(ctx,-12,-72,/knife/.test(lower)?38:24,80,8,g);}
 else if(/coin|seal|stamp|rune|stone|counterweight/.test(lower)){let g=ctx.createRadialGradient(-10,-15,5,0,0,55);g.addColorStop(0,'#e5cf8b');g.addColorStop(1,'#917140');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,46,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#f3ddb0';ctx.lineWidth=3;ctx.stroke();text(ctx,/seal|stamp/.test(lower)?'✧':'❧',0,12,37,'#675136');}
 else if(/book|page|charter|tag|evidence|quill|record/.test(lower)){rounded(ctx,-65,-48,130,96,6,'#e7d6ae');ctx.shadowBlur=0;ctx.strokeStyle='#786245';for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(-49,-29+i*12);ctx.lineTo(40-(i%3)*12,-29+i*12);ctx.stroke();}ctx.fillStyle='#967251';ctx.beginPath();ctx.arc(39,26,13,0,Math.PI*2);ctx.fill();}
 else if(/control|adjustment/.test(lower)){ctx.fillStyle='#1e2e28';ctx.beginPath();ctx.arc(0,0,48,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#d8c493';ctx.lineWidth=5;ctx.stroke();ctx.fillStyle='#d4c095';ctx.beginPath();ctx.arc(0,0,31,0,Math.PI*2);ctx.fill();ctx.fillStyle='#485d4d';ctx.fillRect(-5,-28,10,29);}
 else if(/onion|potato|carrot|tomato/.test(lower)){let g=ctx.createRadialGradient(-12,-15,3,0,0,50);g.addColorStop(0,/carrot/.test(lower)?'#f3b163':/tomato/.test(lower)?'#e29a72':'#e2c6a0');g.addColorStop(1,/carrot/.test(lower)?'#a66336':/tomato/.test(lower)?'#a95338':'#998366');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,/carrot/.test(lower)?25:48,/carrot/.test(lower)?65:40,-.3,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#756548';ctx.lineWidth=2;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.ellipse(i*5,0,30-Math.abs(i)*5,36,0,-1,1);ctx.stroke();}}
 else if(/leather|sole|upper|boot/.test(lower)){rounded(ctx,-55,-25,95,70,20,'#966f4d');rounded(ctx,0,-73,46,90,12,'#785139');ctx.strokeStyle='#e7d2a0';ctx.setLineDash([5,5]);ctx.strokeRect(-48,-18,81,55);ctx.setLineDash([]);}
 else if(/cloth|thread|ribbon|dough|timber|cover/.test(lower)){rounded(ctx,-63,-40,126,80,14,/dough/.test(lower)?'#dac496':'#92a6a0');ctx.strokeStyle='#ffffff45';for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(-55,-30+i*12);ctx.lineTo(55,-30+i*12);ctx.stroke();}}
 else if(/plant|seed|soil|herb|moonleaf|mint|rosemary|basil|lavender/.test(lower)){ctx.strokeStyle='#51734c';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(0,40);ctx.lineTo(0,-34);ctx.stroke();for(let i=0;i<5;i++){ctx.fillStyle=i%2?'#86a76d':'#5a8a54';ctx.beginPath();ctx.ellipse((i%2?1:-1)*16,-28+i*14,24,10,i%2?-.5:.5,0,Math.PI*2);ctx.fill();}}
 else if(/bread|loaf|dish|food|harvest|vegetable|carrot|potato|fish|tomato|apple|berry|pumpkin|corn|pea|lettuce|mushroom/.test(lower)){let g=ctx.createRadialGradient(-10,-15,3,0,0,60);g.addColorStop(0,/bread|loaf/.test(lower)?'#dfb26b':'#bfaa72');g.addColorStop(1,/bread|loaf/.test(lower)?'#86512b':'#6f9154');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,65,40,-.2,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#edddaf';ctx.lineWidth=3;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(i*24-8,-18);ctx.lineTo(i*24+8,14);ctx.stroke();}}
 else if(/lantern|bobber|light/.test(lower)){let g=ctx.createRadialGradient(0,0,5,0,0,63);g.addColorStop(0,'#ffe7a1');g.addColorStop(.55,'#cdaa6199');g.addColorStop(1,'#e8c47900');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,63,0,Math.PI*2);ctx.fill();rounded(ctx,-21,-35,42,70,12,'#ecc57f');}
 else if(/basket|parcel|provisions|gift|goods/.test(lower)){rounded(ctx,-63,-40,126,80,12,'#b19467');ctx.strokeStyle='#6d573c';ctx.lineWidth=4;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.moveTo(i*16,-38);ctx.lineTo(i*16,38);ctx.stroke();}for(let y=-20;y<=20;y+=20){ctx.beginPath();ctx.moveTo(-60,y);ctx.lineTo(60,y);ctx.stroke();}}
 else if(/bowl|cup|plate|pot/.test(lower)){ctx.fillStyle='#d2dcc9';ctx.beginPath();ctx.ellipse(0,0,61,37,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#647568';ctx.lineWidth=6;ctx.stroke();ctx.fillStyle='#9eb09b';ctx.beginPath();ctx.ellipse(0,-7,48,22,0,0,Math.PI*2);ctx.fill();}
 else if(/handle|latch|string|reel/.test(lower)){rounded(ctx,-12,-42,24,84,9,'#d1b371');ctx.strokeStyle='#f2e0ae';ctx.strokeRect(-8,-35,16,70);}
 else{rounded(ctx,-37,-52,74,99,15,color);rounded(ctx,-29,-61,58,15,5,'#775537');rounded(ctx,-28,-15,56,35,5,'#e4d4ad');text(ctx,label.slice(0,13),0,7,12,'#493c2a');}
 ctx.restore();text(ctx,label,x,Math.min(532,y+85*scale),Math.max(10,17*scale),'#f7edd9');
}
function renderWork(ctx,s,image,time=0){
 ctx.clearRect(0,0,960,600);if(image)ctx.drawImage(image,0,0,960,600);else{let sky=ctx.createLinearGradient(0,0,0,600);sky.addColorStop(0,'#293c3a');sky.addColorStop(1,'#101d1c');ctx.fillStyle=sky;ctx.fillRect(0,0,960,600);}
 let shade=ctx.createLinearGradient(0,0,0,600);shade.addColorStop(0,'#0c161660');shade.addColorStop(.35,'#0c161618');shade.addColorStop(1,'#0b100ce0');ctx.fillStyle=shade;ctx.fillRect(0,0,960,600);
 const c=s.current,mode=c.mode;
 if(s.profile==='cupboard'){
  wood(ctx,185,120,590,365);rounded(ctx,211,147,539,312,4,'#302c22');
  for(let yy of [230,335,438]){wood(ctx,216,yy,531,16);for(let xx of [276,399,522,645]){if(yy===335&&xx===522&&(s.index===1||s.index===2))continue;item(ctx,yy===230?'Herbs':yy===335?'Honey':'Flour',xx,yy-36,.5,yy===335?'#c09544':'#a5ad7d');}}
  const width=548*(1-s.door*.88);wood(ctx,204,134,width,330);ctx.strokeStyle='#d8c08a';ctx.lineWidth=3;ctx.strokeRect(220,151,Math.max(0,width-32),296);
  if(width>160){wood(ctx,232,165,width-56,119);wood(ctx,232,300,width-56,129);ctx.strokeStyle='#ddc491';ctx.strokeRect(233,166,width-58,117);ctx.strokeRect(233,301,width-58,127);}for(let yy of [178,402]){rounded(ctx,195,yy,19,45,5,'#bfc3b4');}
  if(mode==='open'||mode==='close')s.position={x:204+width-30,y:285};
  if(s.index===0||s.index===3){ctx.fillStyle='#e2c17a';ctx.beginPath();ctx.ellipse(s.position.x,s.position.y,11,30,0,0,Math.PI*2);ctx.fill();}
  else{wood(ctx,155,480,650,40);ctx.strokeStyle='#b7d997';ctx.lineWidth=3;ctx.setLineDash([7,6]);ctx.beginPath();ctx.ellipse(c.target.x,c.target.y,83,54,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);item(ctx,c.item,s.position.x,s.position.y,.85);}
 }else{
  if(s.profile==='fishing'){
   let water=ctx.createLinearGradient(0,225,0,540);water.addColorStop(0,'#2b596ca0');water.addColorStop(1,'#102f4190');rounded(ctx,100,225,760,315,28,water);ctx.strokeStyle='#bbd9da99';ctx.lineWidth=2;for(let i=0;i<18;i++){let x=130+(i*43)%650,y=255+(i*37)%240;ctx.beginPath();ctx.ellipse(x,y,17+Math.sin(time+i)*5,3,0,0,Math.PI);ctx.stroke();}
  }else{wood(ctx,100,225,760,315);ctx.fillStyle='#1e17132b';ctx.fillRect(105,530,750,14);}
  if(s.profile==='catch'&&!s.pointer)s.position={x:230+Math.sin(time*1.4+s.index)*95,y:340+Math.cos(time*1.7+s.index)*45};
  const cooking=['kitchen','bread','potion'].includes(s.profile);
  if(cooking){
   ctx.save();ctx.shadowColor='#000';ctx.shadowBlur=25;ctx.fillStyle='#5c625d';ctx.beginPath();ctx.ellipse(470,369,123,74,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=s.profile==='potion'?'#809f82':'#baad7c';ctx.beginPath();ctx.ellipse(470,354,105,51,0,0,Math.PI*2);ctx.fill();ctx.restore();
   if(mode==='mix'){ctx.strokeStyle='#f3dfb180';ctx.lineWidth=3;for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(470,354,30+i*17,12+i*7,(s.metrics.circle||0)*.07,0,Math.PI*1.7);ctx.stroke();}}
   if(s.profile==='kitchen'&&mode==='trace'){wood(ctx,245,308,330,119);for(let i=0;i<7;i++){ctx.fillStyle=i<Math.floor(s.progress*7)?'#dbb27a':'#a68050';ctx.beginPath();ctx.ellipse(290+i*37,367,12+ (i<Math.floor(s.progress*7)?0:5),22,-.2,0,Math.PI*2);ctx.fill();}}
   if(s.profile==='bread'&&mode==='rub'){ctx.fillStyle='#ddc79e';ctx.beginPath();ctx.ellipse(470,360,100+(s.pointer?15:0),45-(s.pointer?8:0),0,0,Math.PI*2);ctx.fill();}
   rounded(ctx,656,280,155,173,18,'#303c38');rounded(ctx,675,302,117,100,12,'#111a17');let flame=ctx.createLinearGradient(0,380,0,420);flame.addColorStop(0,'#ffe499');flame.addColorStop(1,'#b9713b');ctx.fillStyle=flame;ctx.fillRect(688,405,94,7+Math.max(0,s.heat*14));
   if(mode==='heat'||mode==='dial'){
    rounded(ctx,230,255,500,90,20,'#17251fea');rounded(ctx,258,285,442,25,12,'#483d30');rounded(ctx,258+.42*442,285,.30*442,25,5,'#739a65');ctx.fillStyle='#fff0bf';ctx.beginPath();ctx.arc(258+s.heat*442,298,15,0,Math.PI*2);ctx.fill();
    text(ctx,s.feedback||'Turn into the green range, then hold',480,278,19);text(ctx,mode==='heat'?Math.ceil(Math.max(0,c.seconds-s.cook))+' seconds of steady cooking':'Gentle cooking heat',480,334,18);s.position={x:470,y:440};
    for(let i=0;i<6;i++){ctx.strokeStyle='#e0e8d17a';ctx.lineWidth=3;ctx.beginPath();let x=445+i*12;ctx.moveTo(x,369);ctx.bezierCurveTo(x+12,343-Math.sin(time+i)*7,x-15,325,x+5,310);ctx.stroke();}
   }
  }
  if(['plant','water','harvest'].includes(s.profile)){rounded(ctx,510,295,270,145,18,'#47372b');for(let i=0;i<35;i++){ctx.fillStyle=i%2?'#7a5c3c':'#382d22';ctx.beginPath();ctx.arc(535+(i*43)%220,320+(i*29)%95,3+i%3,0,Math.PI*2);ctx.fill();}if(s.profile!=='plant'||s.index>0)item(ctx,'Seedling',648,345,.7);}
  if(['records','inspect','council','rewards','parcel'].includes(s.profile)){item(ctx,'Record page',625,358,1.4);text(ctx,'ELDORIA · WORK RECORD',625,328,15,'#5d4730');}
  if(['feed','pet'].includes(s.profile)){ctx.fillStyle='#b8a681';ctx.beginPath();ctx.ellipse(659,365,86,51,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(718,330,37,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2f3c31';ctx.beginPath();ctx.arc(729,325,5,0,Math.PI*2);ctx.fill();}
  if(mode==='mix'){
   ctx.strokeStyle='#e7d38c';ctx.setLineDash([8,10]);ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(470,360,83,59,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);text(ctx,'Circle the bowl three times',470,469,18);
  }
  if(mode==='trace'){ctx.strokeStyle='#eed7a0';ctx.lineWidth=4;ctx.setLineDash([8,6]);ctx.beginPath();ctx.moveTo(c.source.x,c.source.y);ctx.lineTo(c.source.x+260,c.source.y);ctx.stroke();ctx.setLineDash([]);}
  if(mode==='place'){ctx.strokeStyle='#b7d997';ctx.lineWidth=4;ctx.setLineDash([7,6]);ctx.beginPath();ctx.ellipse(c.target.x,c.target.y,87,57,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);text(ctx,'Place here',c.target.x,c.target.y+84,17,'#d2e7b9');}
  item(ctx,c.item,s.position.x,s.position.y,.88);
  if(mode==='pour'&&s.pointer&&s.metrics.tilt){ctx.strokeStyle='#b9dedd';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(s.position.x+20,s.position.y+25);ctx.quadraticCurveTo(s.position.x+40,s.position.y+65,s.position.x+25,s.position.y+95);ctx.stroke();}
  if(mode==='stamp'&&s.progress>.4){ctx.fillStyle='#98764b';ctx.beginPath();ctx.arc(625,365,15+10*s.progress,0,Math.PI*2);ctx.fill();}
  if(mode==='rub'&&s.profile==='polish'){ctx.fillStyle='#f9efc0';for(let i=0;i<4;i++){let x=600+i*26;ctx.fillRect(x,326-i%2*20,3,15);ctx.fillRect(x-6,332-i%2*20,15,3);}}
  for(let i=0;i<Math.min(s.completed.length,5);i++)item(ctx,s.completed[i],135+i*80,250,.35);
 }
 if(s.pointer){ctx.save();ctx.translate(s.last?.x||s.position.x,(s.last?.y||s.position.y)+28);ctx.rotate(-.15);rounded(ctx,-20,8,58,108,23,s.skin);for(let i=0;i<4;i++)rounded(ctx,-20+i*14,-25-i*3,13,66,7,s.skin);ctx.restore();}
 const instruction={place:'Hold and drag the item into the glowing work area',trace:'Hold the tool and follow the dotted line',mix:'Hold the spoon and draw three circles around the bowl',rub:'Hold and work back and forth four times',inspect:'Hold and turn the item back and forth',open:'Hold the handle and pull the door open',close:'Hold the handle and push the door closed',pluck:'Hold and pull the object, then release',pour:'Hold, tilt sideways and keep pouring',hold:'Hold gently for two and a half seconds',stamp:'Press and hold the seal',dial:'Hold the control and move sideways into the green range',heat:'Hold the control; adjust sideways to keep gentle heat'}[mode];
 rounded(ctx,90,545,780,46,13,'#101f1ded');text(ctx,instruction,480,574,18);
}
class Experience{
 constructor({onSound=()=>{},onGesture=()=>{}}={}){
  this.onSound=onSound;this.onGesture=onGesture;this.active=null;this.frame=0;
  this.element=document.createElement('section');this.element.className='eldoria-hands';this.element.hidden=true;this.element.setAttribute?.('aria-label','Hands-on activity');
  this.top=document.createElement('div');this.top.className='eldoria-hands-top';this.heading=document.createElement('h2');this.leave=document.createElement('button');this.leave.textContent='Leave activity';this.leave.onclick=()=>this.cancel();this.top.append(this.heading,this.leave);
  this.caption=document.createElement('p');this.caption.className='eldoria-hands-caption';this.caption.setAttribute?.('aria-live','polite');
  this.canvas=document.createElement('canvas');this.canvas.width=960;this.canvas.height=600;this.canvas.tabIndex=0;this.canvas.setAttribute?.('aria-label','Interactive work surface. Drag objects to work. Keyboard: Enter to hold, arrow keys to move, Enter to release.');this.canvas.style.touchAction='none';
  this.meter=document.createElement('progress');this.meter.max=1;this.tip=document.createElement('p');this.tip.className='eldoria-hands-tip';this.tip.textContent='Touch or mouse: hold and move the objects · Keyboard: Enter to hold, arrows to work, Enter to release · Esc to leave';
  this.element.append(this.top,this.caption,this.canvas,this.meter,this.tip);document.body.append(this.element);this.ctx=this.canvas.getContext('2d');
  const point=e=>{let r=this.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*960/r.width,y:(e.clientY-r.top)*600/r.height};};
  this.canvas.addEventListener('pointerdown',e=>{if(e.button!==undefined&&e.button!==0)return;if(this.pointerId!==undefined)return;e.preventDefault();let p=point(e);if(this.active?.begin(p.x,p.y,Date.now())){this.pointerId=e.pointerId;this.canvas.setPointerCapture?.(e.pointerId);this.onSound(230,.05);}});
  this.canvas.addEventListener('pointermove',e=>{if(this.pointerId!==e.pointerId)return;let p=point(e);this.active?.move(p.x,p.y,Date.now());this.onGesture(this.active);});
  this.canvas.addEventListener('pointerup',e=>{if(this.pointerId!==e.pointerId)return;this.pointerId=undefined;let p=point(e);this.release(p.x,p.y);});
  this.canvas.addEventListener('pointercancel',()=>{this.pointerId=undefined;if(this.active){this.active.pointer=null;this.active.progress=0;this.active.position={...this.active.current.source};}});
  this.canvas.addEventListener('keydown',e=>{if(!this.active)return;if(['Enter',' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Escape'].includes(e.key)){e.preventDefault();e.stopPropagation();}let s=this.active;
   if(e.key==='Escape'){this.cancel();return;}if(e.key==='Enter'||e.key===' '){if(s.pointer)this.release(s.last.x,s.last.y);else s.begin(s.position.x,s.position.y,Date.now());}
   if(e.key.startsWith('Arrow')&&s.pointer){let x=s.last.x,y=s.last.y;if(s.current.mode==='mix'){let a=(s.keyboardAngle||0)+Math.PI/12;s.keyboardAngle=a;x=470+83*Math.cos(a);y=360+59*Math.sin(a);}else{x+=(e.key==='ArrowRight'?22:e.key==='ArrowLeft'?-22:0);y+=(e.key==='ArrowDown'?22:e.key==='ArrowUp'?-22:0);}s.move(x,y,Date.now());this.onGesture(s);}
  });
 }
 start(profile,{title,ingredients,skin,image,onComplete,onCancel}={}){this.cancel();this.active=new WorkSession(profile,{title,ingredients,skin});this.image=image;this.done=onComplete;this.abandon=onCancel;this.heading.textContent=title||profile;this.element.hidden=false;this.canvas.focus?.({preventScroll:true});this.lastTime=null;this.loop(0);return this.active;}
 release(x,y){let s=this.active;if(!s)return;let changed=s.release(x,y);if(changed){this.onSound(550,.08);global.navigator?.vibrate?.(15);}if(s.finished){let done=this.done;this.close();done?.();}}
 loop(now){if(!this.active)return;let s=this.active;s.tick(this.lastTime===null?0:(now-this.lastTime)/1000);this.lastTime=now;
  this.caption.textContent='Step '+(s.index+1)+' of '+s.steps.length+' · '+s.current.name+(s.feedback?' · '+s.feedback:'');this.meter.value=s.progress;
  this.tip.textContent=({place:'Hold the item, drag it into the green ring, then release.',mix:'Hold the spoon and circle the bowl three times, then release.',trace:'Hold the tool and move left to right along the dotted line.',rub:'Hold and move back and forth four times, then release.',inspect:'Hold the item and turn it back and forth, then release.',open:'Hold the brass handle and pull sideways to open.',close:'Hold the brass handle and push sideways to close.',pour:'Hold, tilt sideways and keep pouring for two and a half seconds.',hold:'Hold gently for two and a half seconds, then release.',stamp:'Press and hold the seal, then release.',pluck:'Hold and pull the object away, then release.',dial:'Hold the round control and slide sideways into the green range.',heat:'Keep holding the control. Move sideways to stay in the green range until cooked.'})[s.current.mode]+' Keyboard: Enter to hold/release; arrow keys to work.';
  renderWork(this.ctx,s,this.image,now/1000);this.frame=global.requestAnimationFrame(t=>this.loop(t));
 }
 close(){if(this.frame)global.cancelAnimationFrame?.(this.frame);this.frame=0;this.active=null;this.element.hidden=true;this.pointerId=undefined;this.done=null;this.abandon=null;}
 cancel(){if(!this.active)return;let abandon=this.abandon;this.active.cancel();this.close();abandon?.();}
}
global.EldoriaHandsOn={WorkSession,Experience,planFor,renderWork,profiles:Object.keys(recipes).concat(['kitchen','bread','potion'])};
})(window);
