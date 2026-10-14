import React, { useEffect, useState } from 'react';
import { Activity, ArrowRight, BrainCircuit, Check, ChevronDown, Code2, Database, GitBranch, MessageSquare, Mic, Palette, Send, Settings2, ShieldCheck, Sparkles, Terminal, Wrench } from 'lucide-react';

const PERSONAS = [
  { id:'strategic', label:'Strategic', detail:'Measured, analytical, future-focused', greeting:'Let’s define the outcome, identify dependencies, and build the strongest path forward.' },
  { id:'energetic', label:'Energetic', detail:'Bold, upbeat, momentum-driven', greeting:'I’m online and ready to build. Give me the target and we’ll turn it into progress.' },
  { id:'calm', label:'Calm', detail:'Patient, supportive, thoughtful', greeting:'We can take this one step at a time. I’ll help keep the work clear and manageable.' },
  { id:'concise', label:'Concise', detail:'Direct, brief, action-oriented', greeting:'Ready. Tell me the task; I’ll focus on the next useful action.' }
];
const STARTERS = [
  { icon:Code2, title:'Build a feature', prompt:'Help me plan the next feature for IntelliStack Systems.' },
  { icon:ShieldCheck, title:'Review security', prompt:'Help me identify security and permission gaps in this project.' },
  { icon:GitBranch, title:'Check project status', prompt:'Help me organize the current project status, blockers, and next steps.' },
  { icon:BrainCircuit, title:'Grow my memory', prompt:'Help me structure my project memory and conversation archive.' }
];
function ArmorPortrait(){
 return <div className="mo-portrait" role="img" aria-label="Maximus Optimus blue armored AI guardian portrait">
  <div className="mo-portrait-grid"/><div className="mo-portrait-ring ring-one"/><div className="mo-portrait-ring ring-two"/>
  <svg className="mo-helmet" viewBox="0 0 320 360" aria-hidden="true">
   <defs>
    <linearGradient id="moArmor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d7f4ff"/><stop offset=".18" stopColor="#3979b5"/><stop offset=".4" stopColor="#101f36"/><stop offset=".68" stopColor="#5ba6e9"/><stop offset="1" stopColor="#07101f"/></linearGradient>
    <linearGradient id="moFace" x1="0" y1="0" x2="0.9" y2="1"><stop stopColor="#071322"/><stop offset=".45" stopColor="#294b71"/><stop offset="1" stopColor="#030812"/></linearGradient>
    <linearGradient id="moEye" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#2cf6ff"/><stop offset=".5" stopColor="#c6ffff"/><stop offset="1" stopColor="#078cff"/></linearGradient>
    <filter id="moGlow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   </defs>
   <ellipse cx="160" cy="328" rx="104" ry="15" fill="#00aaff" opacity=".2"/>
   <path d="M73 115 Q69 44 126 22 L160 10 194 22 Q251 44 247 115 L272 184 254 272 214 316 106 316 66 272 48 184Z" fill="#07101d" stroke="#0d9df9" strokeWidth="3"/>
   <path d="M87 122 Q79 57 129 37 L160 27 191 37 Q241 57 233 122 L252 183 229 253 203 287 117 287 91 253 68 183Z" fill="url(#moArmor)" stroke="#8cdcff" strokeWidth="2"/>
   <path d="M132 42 L160 30 188 42 202 108 180 138 160 149 140 138 118 108Z" fill="#071426" stroke="#2caef8" strokeWidth="2"/>
   <path d="M105 127 L147 147 134 171 95 163 80 184 91 223 119 245 142 222 160 230 178 222 201 245 229 223 240 184 225 163 186 171 173 147 215 127 204 193 160 217 116 193Z" fill="url(#moFace)" stroke="#5bbaf4" strokeWidth="2"/>
   <path d="M95 162 L143 174 131 190 99 183Z" fill="url(#moEye)" filter="url(#moGlow)"/>
   <path d="M225 162 L177 174 189 190 221 183Z" fill="url(#moEye)" filter="url(#moGlow)"/>
   <path d="M147 173 L160 159 173 173 168 211 160 225 152 211Z" fill="#08111e" stroke="#4dbbff" strokeWidth="2"/>
   <path d="M128 246 L160 259 192 246 182 278 160 290 138 278Z" fill="#08111e" stroke="#168ee8" strokeWidth="2"/>
   <path d="M139 264 L160 270 181 264" stroke="#29dfff" strokeWidth="3" fill="none" filter="url(#moGlow)"/>
   <path d="M72 117 L45 148 52 202 73 219 83 184Z" fill="url(#moArmor)" stroke="#2faeff" strokeWidth="3"/>
   <path d="M248 117 L275 148 268 202 247 219 237 184Z" fill="url(#moArmor)" stroke="#2faeff" strokeWidth="3"/>
   <circle cx="64" cy="171" r="16" fill="#061323" stroke="#5abfff" strokeWidth="3"/><circle cx="256" cy="171" r="16" fill="#061323" stroke="#5abfff" strokeWidth="3"/>
   <path d="M146 76 L160 62 174 76 160 90Z M143 98 L160 89 177 98 160 110Z" fill="#1ecbff" opacity=".9"/>
   <path d="M139 298 L160 286 181 298 160 313Z M144 311 L160 302 176 311 160 324Z" fill="#37d7ff" stroke="#9deeff" strokeWidth="1.5"/>
  </svg>
  <div className="mo-portrait-tag"><span className="mo-live-dot"/> VISUAL IDENTITY · BLUE GUARDIAN</div>
 </div>
}
function loadSaved(key, fallback){try{const value=JSON.parse(localStorage.getItem(key)||'null');return value??fallback;}catch{return fallback;}}
export default function MaximusOptimusWorkspace({onNavigate}){
 const [persona,setPersona]=useState(()=>loadSaved('mo-personality','strategic'));
 const [messages,setMessages]=useState(()=>loadSaved('mo-workspace-messages',[]));
 const [draft,setDraft]=useState('');
 const [personalityOpen,setPersonalityOpen]=useState(false);
 const [memoryNote,setMemoryNote]=useState('');
 const [savedMemories,setSavedMemories]=useState(()=>loadSaved('mo-project-memory',['Primary project: IntelliStack Systems Command Center','Current AI scope: one agent named Maximus Optimus','Separate Optimus and Matrix agents are postponed until the main project is substantially complete.']));
 const [showMemory,setShowMemory]=useState(false);
 const [notice,setNotice]=useState('Workspace interface preview. Connect an AI provider and persistent memory to enable real AI responses.');
 const activePersona=PERSONAS.find(p=>p.id===persona)||PERSONAS[0];
 useEffect(()=>{try{localStorage.setItem('mo-personality',JSON.stringify(persona));}catch{}},[persona]);
 useEffect(()=>{try{localStorage.setItem('mo-workspace-messages',JSON.stringify(messages.slice(-80)));}catch{}},[messages]);
 useEffect(()=>{try{localStorage.setItem('mo-project-memory',JSON.stringify(savedMemories));}catch{}},[savedMemories]);
 function send(text=draft){
  const prompt=String(text||'').trim();if(!prompt)return;
  setMessages(current=>[...current,{role:'user',text:prompt,id:Date.now()}]);
  setDraft('');
  setNotice('Message saved in this browser. Live AI responses are not connected yet.');
 }
 function saveMemory(){const value=memoryNote.trim();if(!value)return;setSavedMemories(current=>[value,...current]);setMemoryNote('');setNotice('Memory note saved locally in this browser. It is not yet synced to Supabase.');}
 return <div className="mo-workspace">
  <div className="mo-workspace-topline"><div><span className="mo-kicker"><span className="mo-live-dot"/> INTELLISTACK SYSTEMS · AI WORKSPACE</span><h1>Meet <em>Maximus Optimus</em></h1><p>Your AI development partner for building, improving, and understanding this project.</p></div><button className="mo-secondary-btn" onClick={()=>setShowMemory(v=>!v)}><Database size={16}/>{showMemory?'Hide memory':'Project memory'}</button></div>
  <section className="mo-hero">
   <ArmorPortrait/>
   <div className="mo-hero-copy"><div className="mo-eyebrow"><Sparkles size={14}/> YOUR AI DEVELOPMENT PARTNER</div><h2>Think deeper.<br/><span>Build smarter.</span><br/>Achieve more.</h2><p>I'm Maximus Optimus. I help turn your ideas into plans, organize project knowledge, review implementation decisions, and move IntelliStack Systems forward—one verified step at a time.</p>
    <div className="mo-capabilities"><span><Check size={14}/> Project-aware workflow</span><span><Check size={14}/> Build and review support</span><span><Check size={14}/> Evolving personality</span></div>
    <div className="mo-personality-wrap"><button className="mo-personality-trigger" onClick={()=>setPersonalityOpen(v=>!v)}><Palette size={16}/><span><small>PERSONALITY MODE</small><b>{activePersona.label}</b></span><ChevronDown size={16}/></button>
    {personalityOpen&&<div className="mo-personality-menu">{PERSONAS.map(item=><button key={item.id} className={persona===item.id?'selected':''} onClick={()=>{setPersona(item.id);setPersonalityOpen(false);setNotice('Personality changed to '+item.label+'. This adjusts the workspace persona; full model behavior settings will be connected with the AI provider.')}}><span><b>{item.label}</b><small>{item.detail}</small></span>{persona===item.id&&<Check size={15}/>}</button>)}</div>}</div>
   </div>
   <aside className="mo-status-card"><div className="mo-status-head"><span className="mo-live-dot"/> WORKSPACE STATUS</div><strong>IDENTITY ONLINE</strong><p>Visual workspace active</p><div className="mo-status-line"><Activity size={14}/> AI provider <b>Not connected</b></div><div className="mo-status-line"><Database size={14}/> Memory <b>Local preview</b></div><div className="mo-status-line"><ShieldCheck size={14}/> Access <b>Controlled</b></div></aside>
  </section>
  {showMemory&&<section className="mo-memory-panel"><div className="mo-panel-title"><div><Database size={18}/><span><b>PROJECT MEMORY</b><small>Local starter notes · persistent backend connection pending</small></span></div><span className="mo-memory-count">{savedMemories.length} notes</span></div><div className="mo-memory-list">{savedMemories.map((item,i)=><div key={item+i}><span>{String(i+1).padStart(2,'0')}</span><p>{item}</p><button onClick={()=>setSavedMemories(current=>current.filter((_,j)=>j!==i))} aria-label="Delete memory note">×</button></div>)}</div><div className="mo-memory-compose"><input value={memoryNote} onChange={e=>setMemoryNote(e.target.value)} placeholder="Add a project decision or important requirement…"/><button onClick={saveMemory} disabled={!memoryNote.trim()}><Check size={15}/> Save note</button></div></section>}
  <div className="mo-workbench">
   <section className="mo-chat-panel"><div className="mo-panel-title"><div><MessageSquare size={18}/><span><b>CHAT WITH MAXIMUS OPTIMUS</b><small>One agent · one ongoing project</small></span></div><span className="mo-chat-mode">PREVIEW</span></div>
    <div className="mo-chat-scroll">{messages.length===0?<div className="mo-welcome"><div className="mo-welcome-icon"><Sparkles size={22}/></div><h3>{activePersona.greeting}</h3><p>Start with one of these tasks, or write your own message below.</p><div className="mo-starters">{STARTERS.map(item=>{const Icon=item.icon;return <button key={item.title} onClick={()=>send(item.prompt)}><Icon size={17}/><span><b>{item.title}</b><small>{item.prompt}</small></span><ArrowRight size={15}/></button>})}</div></div>:messages.map(item=><div className={'mo-message '+item.role} key={item.id}><span className="mo-message-avatar">{item.role==='user'?'YOU':'MO'}</span><div><b>{item.role==='user'?'You':'Maximus Optimus'}</b><p>{item.text}</p></div></div>)}</div>
    <form className="mo-chat-compose" onSubmit={e=>{e.preventDefault();send();}}><button type="button" className="mo-compose-tool" title="Voice input not connected" onClick={()=>setNotice('Voice input can be added after the AI provider connection is implemented.')}><Mic size={17}/></button><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Tell Maximus Optimus what we're building…" aria-label="Message Maximus Optimus"/><button type="submit" disabled={!draft.trim()} aria-label="Save message"><Send size={17}/></button></form>
   </section>
   <aside className="mo-tools-panel"><div className="mo-panel-title"><div><Wrench size={18}/><span><b>DEVELOPMENT TOOLS</b><small>Planned connection points</small></span></div></div>
    <button onClick={()=>setNotice('GitHub connection is planned. No repository changes are made from this preview panel yet.')}><GitBranch size={18}/><span><b>GitHub workspace</b><small>Inspect files and propose changes</small></span><span className="mo-tool-state">PLANNED</span></button>
    <button onClick={()=>setNotice('Build and deployment checks are planned. The current interface has not run a build from this panel.')}><Terminal size={18}/><span><b>Build verification</b><small>Review errors and test results</small></span><span className="mo-tool-state">PLANNED</span></button>
    <button onClick={()=>setShowMemory(v=>!v)}><Database size={18}/><span><b>Project memory</b><small>Record requirements and decisions</small></span><span className="mo-tool-state">LOCAL</span></button>
    <div className="mo-tools-note"><ShieldCheck size={15}/><span>Nothing is merged or deployed automatically. Approval gates will be added with real development-tool access.</span></div>
   </aside>
  </div>
  {notice&&<div className="mo-notice" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss notice">×</button></div>}
  <footer className="mo-footer"><span><span className="mo-live-dot"/> MAXIMUS OPTIMUS · DEVELOPMENT PARTNER</span><span>ONE WORLD. ONE SYSTEM. ONE INTELLIGENT NETWORK.</span></footer>
 </div>;
}
