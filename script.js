// canvas만으로 그리는 픽셀 아트 탐험 게임입니다. 외부 게임 라이브러리는 쓰지 않습니다.
const canvas=document.querySelector('#game'),ctx=canvas.getContext('2d');
const overlay=document.querySelector('#overlay'),startButton=document.querySelector('#startButton');
const countLabel=document.querySelector('#count'),roomLabel=document.querySelector('#roomLabel'),hint=document.querySelector('#hint');
const title=document.querySelector('#overlayTitle'),storyText=document.querySelector('#overlayText'),choicesBox=document.querySelector('#choices');

// 기억마다 짧은 이야기와 수수께끼가 있습니다. choices의 정답 번호는 0부터 시작합니다.
const rooms=[
 {name:'첫 번째 서가',tone:'#55384e',wall:'#47354d',floor:'#353044',props:[[150,275,'table'],[650,260,'plant']],memories:[
  {x:110,y:235,story:'비가 오던 날, 꼬마 유나는 우산 하나를 친구와 나누어 썼어요. 둘은 젖은 신발을 보며 한참 웃었답니다.',riddle:'두 사람이 함께 쓰면 더 따뜻해지는 것은?',answers:['우산','시계','베개'],right:0},
  {x:400,y:125,story:'사서 할아버지는 매일 창가에 작은 컵을 두었어요. 떠난 친구가 돌아오면 함께 차를 마시고 싶었거든요.',riddle:'할아버지가 친구를 위해 남겨 둔 것은?',answers:['장갑','찻잔','열쇠'],right:1},
  {x:675,y:310,story:'유나는 친구에게 받은 낡은 종이별을 책 속에 끼워 두었어요. 별을 볼 때마다 그날의 웃음이 떠올랐죠.',riddle:'종이별은 무엇을 떠올리게 했나요?',answers:['함께 웃던 날','시험 점수','새 신발'],right:0}]},
 {name:'두 번째, 달빛 자료실',tone:'#43536a',wall:'#37465c',floor:'#303548',props:[[190,290,'table'],[610,290,'plant']],memories:[
  {x:110,y:320,story:'창문을 두드리는 빗소리에 잠 못 들던 밤, 누군가 조용히 자장가를 흥얼거렸어요.',riddle:'잠 못 드는 밤에 마음을 달래 준 것은?',answers:['기차 소리','자장가','종소리'],right:1},
  {x:400,y:185,story:'달빛 아래 읽은 모험책 한 권. 주인공은 두려웠지만, 친구의 손을 잡고 어두운 숲을 건넜어요.',riddle:'주인공이 숲을 건널 수 있었던 힘은?',answers:['친구의 용기','마법 지도','빠른 신발'],right:0},
  {x:690,y:235,story:'창가의 고양이는 매일 달을 바라보았어요. 돌아오지 않는 주인을 기다리는 것처럼요.',riddle:'고양이가 매일 바라본 것은?',answers:['등대','달','시계'],right:1}]},
 {name:'세 번째, 비밀 정원',tone:'#496653',wall:'#3d5549',floor:'#303f3b',props:[[180,278,'plant'],[620,278,'plant']],memories:[
  {x:110,y:315,story:'책장 뒤에는 작은 화분이 숨겨져 있었어요. 아무도 보지 않아도 새싹은 천천히 자랐죠.',riddle:'아무도 보지 않아도 새싹은 어떻게 했나요?',answers:['천천히 자랐다','책을 읽었다','잠들었다'],right:0},
  {x:400,y:255,story:'유나는 매일 물을 주며 새싹에게 오늘 있었던 일을 들려주었어요. 비밀을 나눌 친구가 생긴 기분이었죠.',riddle:'유나는 새싹에게 무엇을 들려주었나요?',answers:['옛날 노래','오늘 있었던 일','암호'],right:1},
  {x:690,y:315,story:'작은 꽃이 피자 정원에는 나비 한 마리가 찾아왔어요. 기다림은 때때로 아름다운 선물이 돼요.',riddle:'꽃이 피자 정원에 찾아온 것은?',answers:['나비','강아지','우체부'],right:0}]},
 {name:'네 번째, 잊힌 음악실',tone:'#755444',wall:'#60433f',floor:'#45393a',props:[[190,270,'piano'],[610,275,'table']],memories:[
  {x:110,y:260,story:'먼지 쌓인 피아노 건반 하나가 낮은 소리를 냈어요. 오래전 누군가의 연습곡이 방 안에 맴돌았죠.',riddle:'피아노는 어떤 소리를 내었나요?',answers:['낮은 소리','큰 종소리','휘파람'],right:0},
  {x:400,y:200,story:'실수해도 괜찮다며 박수를 쳐 주던 엄마. 그 박수 덕분에 아이는 끝까지 연주했어요.',riddle:'아이가 연주를 끝낸 까닭은?',answers:['상장을 받고 싶어서','응원해 준 사람이 있어서','악보를 외워서'],right:1},
  {x:690,y:300,story:'마지막 음이 끝나자 방 안은 고요해졌어요. 하지만 그 음악은 듣는 사람의 마음속에 남았답니다.',riddle:'음악은 어디에 남았나요?',answers:['복도에','마음속에','창문에'],right:1}]},
 {name:'다섯 번째, 기억의 등대',tone:'#765c77',wall:'#52445f',floor:'#383447',props:[[180,278,'table'],[625,278,'plant']],memories:[
  {x:110,y:300,story:'도서관 가장 깊은 곳에 작은 편지가 있었어요. 유나는 오래전 자신에게 쓴 편지를 펼쳤죠.',riddle:'편지는 누구에게 쓴 것이었나요?',answers:['사서 할아버지','오래전의 자신','친구'],right:1},
  {x:400,y:190,story:'“천천히 가도 괜찮아. 네가 모은 작은 순간들이 너를 만들 거야.” 편지에는 그렇게 적혀 있었어요.',riddle:'편지가 전한 말은?',answers:['빨리 달려가','작은 순간도 소중해','책을 많이 읽어'],right:1},
  {x:690,y:300,story:'유나는 기억을 모두 책장에 돌려놓았어요. 도서관의 불빛은 이제 길을 잃은 사람에게도 따뜻한 길잡이가 됩니다.',riddle:'기억을 돌려놓은 뒤 도서관의 불빛은?',answers:['꺼졌어요','길잡이가 되었어요','색이 변했어요'],right:1}]}
];
let roomIndex=0,collected=0,playing=false,activeMemory=null,soundOn=true,audio=null;
const player={x:400,y:365,speed:2.65},keys=new Set(),mobile=new Set();let roomMemories=[];
function sound(kind='collect'){if(!soundOn)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const now=audio.currentTime,notes=kind==='wrong'?[165]:kind==='door'?[440,587,740]:kind==='start'?[330,440,660]:[523,659,784];notes.forEach((hz,i)=>{const osc=audio.createOscillator(),gain=audio.createGain();osc.type=kind==='wrong'?'triangle':'square';osc.frequency.setValueAtTime(hz,now+i*.075);gain.gain.setValueAtTime(.045,now+i*.075);gain.gain.exponentialRampToValueAtTime(.001,now+i*.075+.13);osc.connect(gain);gain.connect(audio.destination);osc.start(now+i*.075);osc.stop(now+i*.075+.14)})}catch(error){console.info('이 브라우저에서는 효과음을 재생하지 못했습니다.',error)}}
document.querySelector('#soundToggle').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.classList.toggle('muted',!soundOn);e.currentTarget.setAttribute('aria-label',soundOn?'효과음 끄기':'효과음 켜기');if(soundOn)sound('collect')});
function loadRoom(){roomMemories=rooms[roomIndex].memories.map((data,index)=>({...data,index,got:false}));roomLabel.textContent=rooms[roomIndex].name;updateCount();player.x=400;player.y=365}
function updateCount(){countLabel.textContent=`${collected} / ${rooms.length*3}`}
function showScreen({eyebrow='A LITTLE PIXEL ADVENTURE',heading,body,button='확인',icon='✦',foot='',onChoice=null}){document.querySelector('#overlayEyebrow').textContent=eyebrow;title.innerHTML=heading;storyText.innerHTML=body;document.querySelector('#bookIcon').textContent=icon;document.querySelector('#overlayFoot').textContent=foot;choicesBox.replaceChildren();startButton.textContent=button;startButton.onclick=onChoice;startButton.classList.toggle('hidden-button',!onChoice);overlay.classList.remove('hidden')}
function showTitle(){playing=false;showScreen({heading:'기억을 수집하는<br>도서관',body:'오래된 도서관에 흩어진 기억 조각을 찾아<br>다섯 개의 방에 숨은 이야기를 완성해 주세요.',button:'모험 시작하기　→',icon:'▤',foot:'이동: 방향키 / WASD　·　조사: E　·　모바일: 화면 버튼',onChoice:startGame})}
function startGame(){roomIndex=0;collected=0;activeMemory=null;loadRoom();overlay.classList.add('hidden');playing=true;hint.textContent='반짝이는 기억 가까이에서 E를 눌러 이야기를 읽어 보세요';sound('start')}

// 방마다 색감과 장식, 가구 배치를 바꿔 다섯 개 스테이지를 만듭니다.
function pixelRect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function drawRoom(){const room=rooms[roomIndex];ctx.fillStyle=room.floor;ctx.fillRect(0,0,800,450);
 // 원근감 있는 나무 바닥판
 for(let y=215;y<450;y+=28){pixelRect(0,y,800,2,'#17192533');for(let x=((y/28)%2)*36;x<800;x+=72){pixelRect(x,y+3,1,22,'#17192525');pixelRect(x+1,y+26,38,1,'#bfa87518')}}
 // 뒤쪽 벽과 장식 띠
 pixelRect(0,0,800,215,room.wall);pixelRect(0,206,800,10,'#221e2c');pixelRect(0,218,800,4,'#b78a5a');pixelRect(0,44,800,3,'#ffffff0c');
 // 벽돌 패턴과 높은 창문
 for(let y=15;y<200;y+=32)for(let x=(y%64?0:30);x<800;x+=60)pixelRect(x,y,1,22,'#ffffff0a');
 pixelRect(350,42,100,119,'#211e30');pixelRect(356,48,88,107,'#86728e');pixelRect(361,53,78,96,'#bac9d0');pixelRect(365,57,70,88,'#d8c8a4');pixelRect(399,53,3,102,'#56445d');pixelRect(361,101,78,4,'#56445d');
 // 달빛/빛살
 ctx.globalAlpha=.13;ctx.fillStyle='#ffe5a7';ctx.beginPath();ctx.moveTo(365,60);ctx.lineTo(293,215);ctx.lineTo(510,215);ctx.lineTo(435,60);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
 // 책장: 테두리, 나뭇결, 다채로운 책과 책등 장식
 for(const sx of [24,118,214,490,586,682]){pixelRect(sx-4,58,82,145,'#211b2a');pixelRect(sx,54,74,8,'#c18e56');pixelRect(sx+3,62,68,5,'#806044');pixelRect(sx+5,68,64,126,'#2a2233');for(let shelf=0;shelf<3;shelf++){const yy=74+shelf*38;let bx=sx+8;for(let b=0;b<6;b++){const bw=7+(b%3);const colors=['#c37a61','#d7ae68','#778ea1','#aa82af','#789274','#d6c39b','#b35f58'];const hh=22+(b%3)*3;pixelRect(bx,yy+24-hh,bw,hh,colors[(b+shelf+roomIndex)%colors.length]);pixelRect(bx+1,yy+25-hh,bw-2,2,'#ffffff33');pixelRect(bx,yy+25, bw+1,4,'#79533f');bx+=10}}pixelRect(sx-5,197,84,7,'#96664a');pixelRect(sx-5,204,84,3,'#221b28')}
 // 램프와 금속 걸이
 for(const lx of [80,300,500,720]){pixelRect(lx-2,8,4,27,'#30263a');pixelRect(lx-10,30,20,3,'#9b754e');pixelRect(lx-6,19,12,12,'#f2ce86');pixelRect(lx-3,22,6,6,'#fff2bd');ctx.globalAlpha=.08;ctx.fillStyle='#ffda8c';ctx.beginPath();ctx.arc(lx,30,30,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}
 // 가구와 식물
 for(const [x,y,type] of room.props)drawProp(x,y,type);
 // 출구, 기억 조각, 캐릭터
 const open=roomMemories.every(m=>m.got);pixelRect(365,403,70,47,'#221b2c');pixelRect(371,407,58,43,open?'#e8bd70':'#77564b');pixelRect(378,413,44,37,open?'#ffe7a2':'#473248');pixelRect(382,417,36,33,open?'#a77f64':'#30253a');pixelRect(410,432,4,5,'#f2d080');
 roomMemories.forEach(m=>{if(!m.got)drawMemory(m)});drawPlayer();ctx.textAlign='center';ctx.font='12px sans-serif';ctx.fillStyle='#fff0c4';ctx.fillText(open?'E  다음 방으로':'기억을 모두 모으면 문이 열려요',400,395)
}
function drawProp(x,y,type){if(type==='table'){pixelRect(x-32,y-4,64,8,'#bd8957');pixelRect(x-27,y+4,6,24,'#644338');pixelRect(x+21,y+4,6,24,'#644338');pixelRect(x-25,y-10,20,6,'#d1a265');pixelRect(x+12,y-14,5,10,'#efe0b4');pixelRect(x+10,y-16,9,3,'#d7b668')}else if(type==='piano'){pixelRect(x-39,y-11,78,31,'#312331');pixelRect(x-36,y-9,72,15,'#6c403b');pixelRect(x-34,y-7,68,8,'#ead9b6');for(let n=0;n<8;n++)pixelRect(x-32+n*8,y-7,1,8,'#3b2a36');for(let n=0;n<5;n++)pixelRect(x-27+n*12,y-7,4,5,'#29222e');pixelRect(x-32,y+20,5,14,'#45313a');pixelRect(x+27,y+20,5,14,'#45313a')}else{pixelRect(x-18,y+10,36,6,'#926749');pixelRect(x-12,y+16,5,19,'#644b3d');pixelRect(x+8,y+16,5,19,'#644b3d');pixelRect(x-5,y+1,10,12,'#b77753');for(const [dx,dy,c] of [[-10,-7,'#6e9a71'],[2,-13,'#88ab70'],[11,-4,'#58835f'],[-2,-22,'#9ab77b'],[13,-17,'#73966c']])pixelRect(x+dx,y+dy,9,12,c)}}
function drawMemory(m){const pulse=(Math.sin(Date.now()/180+m.x)+1)/2;ctx.globalAlpha=.24+pulse*.17;ctx.fillStyle='#ffe18c';ctx.beginPath();ctx.arc(m.x,m.y,17+pulse*5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;pixelRect(m.x-3,m.y-9,6,18,'#fff4bd');pixelRect(m.x-7,m.y-3,14,6,'#fff4bd');pixelRect(m.x-2,m.y-6,4,12,'#f3bb65');pixelRect(m.x-5,m.y-1,10,3,'#f3bb65');pixelRect(m.x-12,m.y-13,2,2,'#fff1ba');pixelRect(m.x+10,m.y+9,2,2,'#fff1ba')}
function drawPlayer(){const x=Math.round(player.x),y=Math.round(player.y),step=(keys.size||mobile.size)?Math.sin(Date.now()/70)*2:0;pixelRect(x-11,y+9,22,5,'#15152288');
 // 부츠와 옷자락
 pixelRect(x-8,y+6+step,7,9,'#513745');pixelRect(x+2,y+6-step,7,9,'#513745');pixelRect(x-8,y+12+step,8,3,'#c48e61');pixelRect(x+1,y+12-step,8,3,'#c48e61');pixelRect(x-9,y-3,18,13,'#486c83');pixelRect(x-7,y-2,14,10,'#668ca0');pixelRect(x-3,y-2,6,10,'#d1aa68');pixelRect(x-10,y+1,3,9,'#b18059');pixelRect(x+7,y+1,3,9,'#b18059');
 // 얼굴, 머리, 귀, 반짝이는 눈
 pixelRect(x-6,y-14,12,12,'#e6b99a');pixelRect(x-8,y-16,16,6,'#342838');pixelRect(x-8,y-13,3,7,'#493343');pixelRect(x+5,y-13,3,7,'#493343');pixelRect(x-5,y-9,2,2,'#292536');pixelRect(x+3,y-9,2,2,'#292536');pixelRect(x-2,y-5,4,1,'#aa6d68');pixelRect(x-9,y-4,3,10,'#d0a66e');pixelRect(x+6,y-4,3,10,'#d0a66e');pixelRect(x-8,y+7,16,2,'#9cc2bd')}
function move(){if(!playing)return;let dx=0,dy=0;if(keys.has('arrowleft')||keys.has('a')||mobile.has('left'))dx--;if(keys.has('arrowright')||keys.has('d')||mobile.has('right'))dx++;if(keys.has('arrowup')||keys.has('w')||mobile.has('up'))dy--;if(keys.has('arrowdown')||keys.has('s')||mobile.has('down'))dy++;if(dx&&dy){dx*=.707;dy*=.707}const nx=Math.max(20,Math.min(780,player.x+dx*player.speed)),ny=Math.max(50,Math.min(388,player.y+dy*player.speed));const blocks=rooms[roomIndex].props.some(([x,y,t])=>{const rx=t==='piano'?38:30,ry=t==='piano'?28:25;return nx+8>x-rx&&nx-8<x+rx&&ny+6>y-ry&&ny-14<y+ry});if(!blocks){player.x=nx;player.y=ny}}
function openMemory(memory){activeMemory=memory;playing=false;overlay.classList.remove('hidden');document.querySelector('#overlayEyebrow').textContent=`${rooms[roomIndex].name} · 기억 ${memory.index+1}/3`;title.textContent='기억의 한 페이지';storyText.innerHTML=`<span class="story-copy">${memory.story}</span><br><strong class="riddle">수수께끼　${memory.riddle}</strong>`;document.querySelector('#bookIcon').textContent='✧';document.querySelector('#overlayFoot').textContent='이야기를 읽고 알맞은 답을 골라 주세요';startButton.classList.add('hidden-button');choicesBox.replaceChildren();memory.answers.forEach((answer,i)=>{const button=document.createElement('button');button.textContent=`${i+1}. ${answer}`;button.addEventListener('click',()=>answerMemory(i,button));choicesBox.append(button)})}
function answerMemory(answer,button){if(!activeMemory)return;if(answer===activeMemory.right){sound('collect');activeMemory.got=true;collected++;updateCount();storyText.innerHTML='정답이에요! 이 이야기가 도서관의 책장으로 돌아갔어요.';choicesBox.replaceChildren();activeMemory=null;setTimeout(()=>{overlay.classList.add('hidden');playing=true;hint.textContent=roomMemories.every(m=>m.got)?'기억이 모두 모였어요. 출구에서 E를 누르세요':'다른 기억 조각도 찾아보세요'},950)}else{sound('wrong');button.classList.add('wrong');hint.textContent='아직 기억이 흐릿해요. 이야기를 다시 떠올려 보세요';setTimeout(()=>button.classList.remove('wrong'),550)}}
function interact(){if(!playing)return;const nearby=roomMemories.map(m=>({m,d:Math.hypot(player.x-m.x,player.y-m.y)})).filter(o=>!o.m.got&&o.d<38).sort((a,b)=>a.d-b.d)[0];if(nearby){sound('start');openMemory(nearby.m);return}if(roomMemories.every(m=>m.got)&&player.y>375&&Math.abs(player.x-400)<62){sound('door');if(roomIndex<rooms.length-1){roomIndex++;loadRoom();hint.textContent=`${rooms[roomIndex].name}에 도착했어요. 새 기억을 찾아보세요`}else finishGame()}}
function finishGame(){playing=false;sound('door');showScreen({eyebrow:'MEMORY ARCHIVE · COMPLETE',heading:'모든 기억이<br>제자리를 찾았어요',body:`다섯 개의 방에서 ${collected}개의 기억을 모았어요.<br>유나의 이야기는 이제 책장 속에서 오래 빛날 거예요.`,button:'처음부터 다시하기　↻',icon:'✦',foot:'모험을 함께해 줘서 고마워요, 기억 수집가!',onChoice:startGame});hint.textContent='모험 완료'}
function frame(){move();drawRoom();requestAnimationFrame(frame)}
window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();keys.add(k);if(k==='e')interact()});window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>{keys.clear();mobile.clear()});
document.querySelectorAll('.mobile-pad button').forEach(button=>{const dir=button.dataset.dir;button.addEventListener('pointerdown',e=>{e.preventDefault();mobile.add(dir);button.setPointerCapture(e.pointerId)});for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>mobile.delete(dir))});
showTitle();loadRoom();frame();
