'use strict';
/* Size the photograph itself, rather than cropping the floor to fill a tall frame. */
const screenFitCSS=document.createElement('link');screenFitCSS.rel='stylesheet';screenFitCSS.href='city-screen-fit.css?v=screen-1';document.head.append(screenFitCSS);
function screenFitScene(){const el=$('cityScene'),photo=cityPhotoLayout;if(!el||!photo)return;const ratio=photo.width/photo.height,viewport=window.visualViewport,viewHeight=viewport?.height||innerHeight,stage=el.parentElement,style=getComputedStyle(stage),availableWidth=stage.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight),top=el.getBoundingClientRect().top+(viewport?.offsetTop||0),footer=$('realmFooter'),reserve=footer&&getComputedStyle(footer).display!=='none'?footer.getBoundingClientRect().height:0;const availableHeight=Math.max(40,viewHeight-Math.max(0,top)-reserve-14),width=Math.min(availableWidth,availableHeight*ratio);el.style.setProperty('width',Math.floor(width)+'px');el.style.setProperty('height',Math.floor(width/ratio)+'px');}
const screenFitLayoutBefore=cityLayoutPhoto;cityLayoutPhoto=function(){screenFitScene();screenFitLayoutBefore()};
// Scene information and camera controls must never cover the photographed floor.
function screenFitCaption(){const caption=$('elfSceneCaption');if(caption){caption.hidden=false;for(const selector of ['.city-scene-bottom','.city-view-controls']){const el=document.querySelector(selector);if(el&&el.parentElement!==caption)caption.append(el)}}}
const screenFitDrawBefore=cityDraw;cityDraw=function(){screenFitDrawBefore();screenFitCaption();screenFitScene()};comfortDraw=cityDraw;
const screenFitFocusBefore=$('cityFocus').onclick;$('cityFocus').onclick=()=>{screenFitFocusBefore();cityResetCamera();screenFitScene();$('cityScene').scrollIntoView({block:'start',behavior:'instant'});screenFitScene()};
$('cityResetView').setAttribute('aria-label','Reset viewpoint');$('cityResetView').title='Fit the whole scene, including the ground';
window.addEventListener('resize',()=>{screenFitScene();cityLayoutPhoto()});window.visualViewport?.addEventListener('resize',()=>{screenFitScene();cityLayoutPhoto()});
new ResizeObserver(()=>{screenFitScene();cityLayoutPhoto()}).observe(cityStage);
$('cityRoomTrail').after($('comfortObjective'));if($('promiseBanner'))$('comfortObjective').after($('promiseBanner'));
window.ELDORIA_SCREEN_FIT={version:1,fit:()=>{cityResetCamera();screenFitScene();cityLayoutPhoto()}};screenFitCaption();cityLayoutPhoto();
