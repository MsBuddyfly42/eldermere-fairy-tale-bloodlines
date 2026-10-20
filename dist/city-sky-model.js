/* Presentation follows the sun; celebrations follow the real local date. */
(()=>{'use strict';
function ensure(s){if(!s.citySky||typeof s.citySky!=='object'||Array.isArray(s.citySky))s.citySky={};const q=s.citySky;if(!['auto','day','night'].includes(q.view))q.view='auto';if(!q.claimed||typeof q.claimed!=='object'||Array.isArray(q.claimed))q.claimed={};return q}
function light(s,c){const mode=ensure(s).view;if(mode!=='auto')return mode;const [rise,set]={spring:[6,19],summer:[5,21],autumn:[7,18],winter:[8,17]}[c.season];if(c.hour===rise)return'dawn';if(c.hour===set-1)return'dusk';return c.night?'night':'day'}
function events(year){const thanksgiving=22+(4-new Date(Date.UTC(year,10,1)).getUTCDay()+7)%7;return[
 ['newyear',1,1,'New Year’s Wishfire','Write a hopeful wish and welcome a new year beside the bonfire.','stars'],
 ['kindness',2,14,'Hearts & Kindness Day','Make room at the table and share a handmade kindness with your neighbors.','welcome'],
 ['halloween',10,31,'Halloween Lantern Night','Gather in costume for gentle tales, glowing pumpkins and toasted treats.','toast'],
 ['thanksgiving',11,thanksgiving,'Thanksgiving Harvest Table','Prepare a generous harvest supper for the county’s long table.','harvest'],
 ['christmas',12,24,'Christmas Eve Story Circle','Wrap up warmly and welcome travelers to a magical fireside story.','winter'],
 ['christmasday',12,25,'Christmas Handmade Giving','Offer a handmade gift and a welcoming place beside the fire.','welcome'],
 ['yearsend',12,31,'New Year’s Eve Bonfire','Sing the bonfire refrain beneath the final stars of the year.','song']
].map(([id,month,day,title,text,puzzle])=>({id,month,day,year,title,text,puzzle,key:year+'-'+String(month).padStart(2,'0')+'-'+String(day).padStart(2,'0'),claim:year+':'+id})).sort((a,b)=>a.key.localeCompare(b.key))}
function today(c){return events(c.year).filter(e=>e.key===c.key)}
function celebrate(s,id,c,answer){const e=today(c).find(e=>e.id===id);if(!e)return{ok:false,reason:'This celebration opens on its real calendar date. You can enjoy the campground and seasonal gatherings today.'};const q=ensure(s);if(q.claimed[e.claim])return{ok:true,title:e.title+' · a celebration already remembered'};if(!globalThis.EldoriaCountyModel.check(s,e.puzzle,answer))return{ok:false,reason:globalThis.EldoriaCountyModel.puzzles[e.puzzle].hint};q.claimed[e.claim]=true;s.coins=(s.coins||0)+25;const county=globalThis.EldoriaCountyModel;county.ensure(s).campKeepsakes.push(e.title+' · '+c.year);county.event(s,'holiday:'+e.claim,e.title,'The county celebrated together. Your holiday keepsake is ready for your legacy room.','holiday',c);return{ok:true,title:e.title+' · holiday keepsake saved',coins:25}}
globalThis.EldoriaSkyModel={ensure,light,events,today,celebrate};
})();
