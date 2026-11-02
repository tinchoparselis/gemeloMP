import {MARCO,SYSTEM} from './marco-mp.js';
const $=id=>document.getElementById(id); let engine=null, modelId='', busy=false;
let session={schema:'gemelo-mp-v2',student:'',startedAt:'',model:'',rounds:[],sources:MARCO.map(x=>x.fuente)};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function log(msg,ai){let e=document.createElement('div');e.className='turn'+(ai?' ai':'');e.innerHTML='<div class="who">'+(ai?'Tutor generativo':'Estudiante')+'</div>'+escapeHTML(msg);$('history').append(e);}
function save(){try{localStorage.setItem('gemelomp-session',JSON.stringify(session));}catch{}}
function download(){let blob=new Blob([JSON.stringify(session,null,2)],{type:'application/json'});let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='gemelo-mp-'+new Date().toISOString().slice(0,10)+'-'+(session.student.replace(/[^a-z0-9-]/gi,'_')||'anonimo')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);}
$('export').onclick=download;$('finishExport').onclick=download;
$('reset').onclick=()=>{localStorage.removeItem('gemelomp-session');location.reload()};
function update(){let n=session.rounds.length;$('round').textContent='Ronda '+Math.min(n+1,5)+' de 5';$('promptLabel').textContent=n===0?'Tu definición: ¿qué es la tecnología?':'Reformulá tu posición a partir de la intervención anterior';if(n>=5){$('dialogue').classList.add('hidden');$('finish').classList.remove('hidden');}}
function showSession(){ $('setup').classList.add('hidden');$('dialogue').classList.remove('hidden');$('history').replaceChildren();session.rounds.forEach(r=>{log(r.answer,false);log(r.feedback,true)});update();}
const supported=!!(navigator.gpu&&window.isSecureContext);
$('compat').textContent=supported?'WebGPU detectado. La ejecución dependerá también de la memoria disponible.':'WebGPU no disponible en este navegador o no estás en HTTPS. Probá Chrome/Edge actualizado en una computadora compatible.';
$('load').disabled=!supported;
$('load').onclick=async()=>{if(busy)return;busy=true;$('load').disabled=true;try{
 $('progress').textContent='Cargando biblioteca WebLLM…';
 // Importación dinámica: no se necesita instalar npm ni compilar el proyecto.
 const webllm=await import('https://esm.run/@mlc-ai/web-llm');
 const candidates=webllm.prebuiltAppConfig.model_list.filter(m=>/Llama-3\.2-1B-Instruct-q4f16_1-MLC|Qwen2\.5-0\.5B-Instruct-q4f16_1-MLC|SmolLM2-1\.7B-Instruct-q4f16_1-MLC/i.test(m.model_id));
 const choice=candidates.find(m=>/Llama-3\.2-1B-Instruct-q4f16_1-MLC/.test(m.model_id))||candidates[0];
 if(!choice)throw Error('No se encontró un modelo pequeño compatible en la versión actual de WebLLM. Revisá README.');
 modelId=choice.model_id;
 $('progress').textContent='Modelo seleccionado: '+modelId+'\nIniciando descarga…';
 engine=await webllm.CreateMLCEngine(modelId,{initProgressCallback:p=>{$('progress').textContent='Descargando / preparando modelo: '+(p.text||Math.round((p.progress||0)*100)+'%');}});
 session={schema:'gemelo-mp-v2',student:$('student').value.trim(),startedAt:new Date().toISOString(),model:modelId,rounds:[],sources:MARCO.map(x=>x.fuente)};
 save();showSession();
 }catch(e){$('progress').textContent='No se pudo iniciar la IA local: '+e.message+'\nProbá una computadora con Chrome/Edge actualizado y memoria suficiente.';$('load').disabled=false;}finally{busy=false;}};
$('send').onclick=async()=>{let answer=$('answer').value.trim();if(!answer||busy||!engine)return;busy=true;$('send').disabled=true;$('status').textContent='El modelo está leyendo tu argumento y elaborando una repregunta…';
 try{let prior=session.rounds.map((r,i)=>`Ronda ${i+1}\nEstudiante: ${r.answer}\nTutor: ${r.feedback}`).join('\n\n');let context=MARCO.map(x=>`[${x.id}] ${x.nombre}. ${x.texto} (${x.fuente})`).join('\n');let final=session.rounds.length===4;
 let messages=[{role:'system',content:SYSTEM+'\n\nMARCO CONCEPTUAL DOCUMENTADO (síntesis, no citas):\n'+context},{role:'user',content:`Pregunta central: ¿Qué es la tecnología?\n\nHISTORIAL:\n${prior||'(primera respuesta)'}\n\nRESPUESTA ACTUAL:\n${answer}\n\n${final?'QUINTA Y ÚLTIMA RONDA: sintetizá una transformación y una duda que pueda llevar a clase. No formules una nueva consigna obligatoria.':'Formulá UNA sola repregunta específica que cuestione una presuposición, omisión o tensión de esta respuesta, evitando repetir las anteriores.'}`}];
 let result=await engine.chat.completions.create({messages,temperature:0.65,max_tokens:210});let feedback=result.choices?.[0]?.message?.content?.trim();if(!feedback)throw Error('El modelo no devolvió texto');session.rounds.push({answer,feedback,at:new Date().toISOString()});save();log(answer,false);log(feedback,true);$('answer').value='';update();$('status').textContent='';
 }catch(e){$('status').textContent='No se pudo generar una intervención: '+e.message+' (tu texto sigue disponible para reintentar).';}finally{busy=false;$('send').disabled=false;}};
