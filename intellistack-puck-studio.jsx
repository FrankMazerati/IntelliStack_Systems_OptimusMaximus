import React, { useMemo, useState } from 'react';
import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { ArrowLeft, CheckCircle2, Layers3, Monitor, Save, ShieldCheck, Smartphone, Tablet } from 'lucide-react';

const color = label => ({ type: 'text', label: label + ' (hex)' });
const number = label => ({ type: 'number', label });
const select = (label, values) => ({ type: 'select', label, options: values.map(value => ({ label: value, value })) });
const styles = { backgroundColor: color('Background'), textColor: color('Text'), borderColor: color('Border'), padding: number('Padding (px)'), radius: number('Corner radius (px)') };
const panelStyle = p => ({ background: p.backgroundColor || '#0c1426', color: p.textColor || '#e8efff', border: '1px solid ' + (p.borderColor || '#31445f'), borderRadius: Math.max(0, Number(p.radius ?? 12)) + 'px', padding: Math.max(0, Number(p.padding ?? 16)) + 'px', boxSizing: 'border-box', minWidth: 0, overflowWrap: 'anywhere' });

const config = {
 root: {
  fields: { canvasBackground: color('Canvas background'), canvasPadding: number('Canvas padding (px)') },
  defaultProps: { canvasBackground: '#070c19', canvasPadding: 20 },
  render: ({ children, canvasBackground = '#070c19', canvasPadding = 20 }) => <div style={{ background: canvasBackground, color: '#e8efff', minHeight: '100%', padding: canvasPadding, boxSizing: 'border-box' }}>{children}</div>
 },
 categories: {
  'IntelliStack Shell': { title: 'IntelliStack Shell', components: ['ISBrandHeader', 'OperationsStatusBar', 'WorldClockStrip', 'CommandFooter'] },
  'Navigation & Actions': { title: 'Navigation & Actions', components: ['NavigationTile', 'ActionButton', 'QuickActionPanel'] },
  'Data & Operations': { title: 'Data & Operations', components: ['MetricCard', 'CityClockCard', 'DataTablePanel', 'AlertBanner', 'ActivityFeed'] },
  'Content & Media': { title: 'Content & Media', components: ['SectionHeading', 'TextPanel', 'ImagePanel', 'DividerBlock', 'SpacerBlock'] },
  'Branding & Messaging': { title: 'Branding & Messaging', components: ['BrandImage', 'SloganBlock'] },
  'Layout': { title: 'Layout', components: ['ResponsiveGrid', 'PanelContainer'] }
 },
 components: {
  ISBrandHeader: {
   label: 'IS Brand Header',
   fields: { organization: {type:'text',label:'Organization'}, title:{type:'text',label:'Header title'}, subtitle:{type:'text',label:'Tagline'}, backgroundColor:color('Header background'), textColor:color('Header text'), accentColor:color('Logo/accent'), padding:number('Padding (px)'), alignment:select('Alignment',['Left','Center','Right']) },
   defaultProps:{organization:'INTELLISTACK SYSTEMS',title:'MAXIMUS OPTIMUS COMMAND CENTER',subtitle:'ONE WORLD. ONE SYSTEM. ONE INTELLIGENT NETWORK.',backgroundColor:'#080f1e',textColor:'#e8efff',accentColor:'#00d4ff',padding:18,alignment:'Left'},
   render:p=><header style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap',padding:p.padding,background:p.backgroundColor,color:p.textColor,borderBottom:'1px solid '+p.accentColor,justifyContent:p.alignment==='Center'?'center':p.alignment==='Right'?'flex-end':'flex-start',boxSizing:'border-box'}}><div style={{width:44,height:44,flex:'0 0 44px',display:'grid',placeItems:'center',border:'2px solid '+p.accentColor,clipPath:'polygon(50% 0,92% 18%,84% 72%,50% 100%,16% 72%,8% 18%)',color:p.accentColor,fontWeight:900}}>IS</div><div style={{minWidth:0}}><div style={{fontSize:11,letterSpacing:2,color:p.accentColor,fontWeight:800}}>{p.organization}</div><div style={{fontSize:'clamp(16px,2vw,23px)',fontWeight:800,marginTop:3}}>{p.title}</div><div style={{fontSize:10,letterSpacing:1.2,opacity:.75,marginTop:4}}>{p.subtitle}</div></div></header>
  },
  OperationsStatusBar:{
   label:'Operations Status Bar',fields:{label:{type:'text',label:'Status label'},detail:{type:'text',label:'Supporting text'},statusColor:color('Status indicator'),...styles},
   defaultProps:{label:'GLOBAL OPERATIONS',detail:'All systems monitored · 24/7 operations',statusColor:'#00e6a8',backgroundColor:'#0b1b2a',textColor:'#e8efff',borderColor:'#28547c',padding:12,radius:10},
   render:p=><div style={{...panelStyle(p),display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}><span style={{width:9,height:9,borderRadius:'50%',background:p.statusColor,boxShadow:'0 0 12px '+p.statusColor}}/><strong style={{fontSize:12,letterSpacing:1.2}}>{p.label}</strong><span style={{opacity:.75,fontSize:13}}>{p.detail}</span></div>
  },
  WorldClockStrip:{
   label:'World Clock Strip',fields:{title:{type:'text',label:'Strip title'},backgroundColor:color('Background'),textColor:color('Text'),accentColor:color('Accent'),padding:number('Padding (px)')},
   defaultProps:{title:'WORLD CLOCK · GLOBAL OPERATIONS',backgroundColor:'#0c1426',textColor:'#e8efff',accentColor:'#00d4ff',padding:12},
   render:p=><div style={{...panelStyle({...p,borderColor:p.accentColor,radius:10}),display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}><span style={{color:p.accentColor}}>◷</span><strong style={{fontSize:12,letterSpacing:1.1}}>{p.title}</strong><span style={{marginLeft:'auto',fontSize:11,opacity:.7}}>CHICAGO · LOS ANGELES · NEW YORK · LONDON</span></div>
  },
  CityClockCard:{
   label:'City Clock Card',fields:{city:{type:'text',label:'City'},region:{type:'text',label:'Region/time zone'},time:{type:'text',label:'Display time'},status:select('Status',['Operational','Monitoring','Attention required']),accentColor:color('Card accent'),...styles},
   defaultProps:{city:'CHICAGO',region:'CENTRAL OPERATIONS',time:'09:41:26',status:'Operational',accentColor:'#00d4ff',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#28547c',padding:18,radius:14},
   render:p=><article style={{...panelStyle(p),borderTop:'3px solid '+p.accentColor}}><div style={{fontSize:10,letterSpacing:1.5,color:p.accentColor,fontWeight:800}}>{p.city}</div><div style={{fontSize:24,fontWeight:800,margin:'8px 0 5px',fontVariantNumeric:'tabular-nums'}}>{p.time}</div><div style={{fontSize:10,opacity:.72,letterSpacing:.8}}>{p.region}</div><div style={{marginTop:12,fontSize:11,color:p.status==='Attention required'?'#ffb86b':p.status==='Monitoring'?'#8bbdff':'#00e6a8'}}>● {p.status}</div></article>
  },
  NavigationTile:{
   label:'Navigation Tile',fields:{title:{type:'text',label:'Tile title'},description:{type:'text',label:'Description'},iconText:{type:'text',label:'Icon/short mark'},backgroundColor:color('Background'),textColor:color('Text'),accentColor:color('Accent'),borderColor:color('Border'),padding:number('Padding (px)'),radius:number('Corner radius (px)')},
   defaultProps:{title:'Network Operations',description:'Monitor network health and topology',iconText:'NET',backgroundColor:'#0c1426',textColor:'#e8efff',accentColor:'#00d4ff',borderColor:'#31445f',padding:16,radius:12},
   render:p=><div style={{...panelStyle(p),display:'flex',gap:12,alignItems:'center'}}><span style={{width:40,height:40,display:'grid',placeItems:'center',border:'1px solid '+p.accentColor,borderRadius:10,color:p.accentColor,fontWeight:900,fontSize:11,flexShrink:0}}>{p.iconText}</span><div><div style={{fontWeight:800}}>{p.title}</div><div style={{fontSize:12,opacity:.7,marginTop:4}}>{p.description}</div></div></div>
  },
  MetricCard:{
   label:'Metric Card',fields:{label:{type:'text',label:'Metric label'},value:{type:'text',label:'Value'},change:{type:'text',label:'Change/context'},accentColor:color('Metric accent'),...styles},
   defaultProps:{label:'MANAGED ENDPOINTS',value:'1,284',change:'+4.8% this period',accentColor:'#00d4ff',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:18,radius:12},
   render:p=><div style={panelStyle(p)}><div style={{fontSize:10,letterSpacing:1.2,opacity:.7,fontWeight:800}}>{p.label}</div><div style={{fontSize:30,fontWeight:900,color:p.accentColor,margin:'8px 0'}}>{p.value}</div><div style={{fontSize:11,opacity:.75}}>{p.change}</div></div>
  },
  SectionHeading:{
   label:'Section Heading',fields:{eyebrow:{type:'text',label:'Eyebrow/category'},title:{type:'text',label:'Heading'},description:{type:'textarea',label:'Description'},textColor:color('Text color'),accentColor:color('Accent'),alignment:select('Alignment',['Left','Center','Right']),padding:number('Padding (px)')},
   defaultProps:{eyebrow:'ENTERPRISE OPERATIONS',title:'Command Overview',description:'A unified view of the global service environment.',textColor:'#e8efff',accentColor:'#00d4ff',alignment:'Left',padding:8},
   render:p=><div style={{padding:p.padding,textAlign:p.alignment.toLowerCase(),color:p.textColor}}><div style={{fontSize:10,fontWeight:800,letterSpacing:1.7,color:p.accentColor}}>{p.eyebrow}</div><h2 style={{fontSize:'clamp(21px,3vw,30px)',margin:'7px 0',lineHeight:1.2}}>{p.title}</h2><p style={{fontSize:13,opacity:.72,margin:0,lineHeight:1.6}}>{p.description}</p></div>
  },
  TextPanel:{
   label:'Text Panel',fields:{title:{type:'text',label:'Panel title'},body:{type:'textarea',label:'Body text'},...styles},
   defaultProps:{title:'Operational Notes',body:'Add procedures, instructions, status details, or supporting information here.',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:18,radius:12},
   render:p=><section style={panelStyle(p)}><h3 style={{fontSize:16,margin:'0 0 10px'}}>{p.title}</h3><p style={{fontSize:13,lineHeight:1.7,whiteSpace:'pre-wrap',margin:0,opacity:.85}}>{p.body}</p></section>
  },
  ActionButton:{
   label:'Action Button',fields:{label:{type:'text',label:'Button label'},helper:{type:'text',label:'Supporting note'},backgroundColor:color('Button background'),textColor:color('Button text'),borderColor:color('Button border'),radius:number('Corner radius (px)'),padding:number('Padding (px)'),variant:select('Style',['Solid','Outline','Glow'])},
   defaultProps:{label:'Open workspace',helper:'Visual component sample',backgroundColor:'#1765ad',textColor:'#ffffff',borderColor:'#00d4ff',radius:9,padding:12,variant:'Solid'},
   render:p=><div style={{display:'inline-flex',flexDirection:'column',gap:6,alignItems:'flex-start'}}><span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',background:p.variant==='Outline'?'transparent':p.backgroundColor,color:p.textColor,border:'1px solid '+p.borderColor,borderRadius:p.radius,padding:p.padding+'px 18px',fontWeight:800,fontSize:13,boxShadow:p.variant==='Glow'?'0 0 18px '+p.borderColor+'66':'none'}}>{p.label}<span style={{marginLeft:10,color:p.borderColor}}>↗</span></span><small style={{opacity:.6,fontSize:10}}>{p.helper}</small></div>
  },
  QuickActionPanel:{
   label:'Quick Action Panel',fields:{title:{type:'text',label:'Panel title'},actionOne:{type:'text',label:'Action one'},actionTwo:{type:'text',label:'Action two'},actionThree:{type:'text',label:'Action three'},...styles},
   defaultProps:{title:'Quick Actions',actionOne:'Create service ticket',actionTwo:'Review security alerts',actionThree:'Launch response workflow',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:16,radius:12},
   render:p=><section style={panelStyle(p)}><h3 style={{margin:'0 0 12px',fontSize:15}}>{p.title}</h3>{[p.actionOne,p.actionTwo,p.actionThree].map((a,i)=><div key={a+i} style={{padding:'10px 0',borderTop:'1px solid '+p.borderColor,fontSize:12,display:'flex',gap:9}}><span style={{color:'#00d4ff'}}>0{i+1}</span>{a}</div>)}</section>
  },
  AlertBanner:{
   label:'Alert Banner',fields:{severity:select('Severity',['Information','Success','Warning','Critical']),title:{type:'text',label:'Alert title'},message:{type:'textarea',label:'Message'},backgroundColor:color('Background'),textColor:color('Text'),borderColor:color('Alert border'),padding:number('Padding (px)'),radius:number('Corner radius (px)')},
   defaultProps:{severity:'Warning',title:'Review required',message:'Design sample only. Connect a real alert source before operational use.',backgroundColor:'#172033',textColor:'#e8efff',borderColor:'#ffb86b',padding:14,radius:10},
   render:p=><div role="note" style={{...panelStyle(p),borderLeft:'4px solid '+p.borderColor,display:'flex',gap:12}}><span style={{fontSize:18,color:p.borderColor}}>{p.severity==='Critical'?'◆':p.severity==='Success'?'✓':p.severity==='Information'?'i':'!'}</span><div><strong style={{fontSize:13}}>{p.title}</strong><div style={{fontSize:12,lineHeight:1.6,marginTop:4,opacity:.8}}>{p.message}</div></div></div>
  },
  DataTablePanel:{
   label:'Data Table Panel',fields:{title:{type:'text',label:'Table title'},columnOne:{type:'text',label:'Column one'},columnTwo:{type:'text',label:'Column two'},columnThree:{type:'text',label:'Column three'},rowOne:{type:'text',label:'Row one (separate cells with ·)'},rowTwo:{type:'text',label:'Row two (separate cells with ·)'},rowThree:{type:'text',label:'Row three (separate cells with ·)'},...styles},
   defaultProps:{title:'Operational Inventory',columnOne:'RESOURCE',columnTwo:'STATUS',columnThree:'OWNER',rowOne:'Endpoint fleet · Operational · Service Desk',rowTwo:'Network core · Monitoring · Network Ops',rowThree:'Identity service · Operational · Security',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:14,radius:12},
   render:p=><section style={panelStyle(p)}><h3 style={{fontSize:15,margin:'0 0 12px'}}>{p.title}</h3><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:11,textAlign:'left'}}><thead><tr>{[p.columnOne,p.columnTwo,p.columnThree].map((x,i)=><th key={i} style={{padding:8,color:'#00d4ff',borderBottom:'1px solid '+p.borderColor}}>{x}</th>)}</tr></thead><tbody>{[p.rowOne,p.rowTwo,p.rowThree].map((row,i)=><tr key={i}>{row.split('·').map((x,j)=><td key={j} style={{padding:8,borderBottom:'1px solid '+p.borderColor,opacity:.82}}>{x.trim()}</td>)}</tr>)}</tbody></table></div></section>
  },
  ActivityFeed:{
   label:'Activity Feed',fields:{title:{type:'text',label:'Feed title'},eventOne:{type:'text',label:'Event one'},eventTwo:{type:'text',label:'Event two'},eventThree:{type:'text',label:'Event three'},...styles},
   defaultProps:{title:'Recent Activity',eventOne:'Service desk queue reviewed',eventTwo:'Endpoint compliance scan completed',eventThree:'Network health check recorded',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:16,radius:12},
   render:p=><section style={panelStyle(p)}><h3 style={{margin:'0 0 12px',fontSize:15}}>{p.title}</h3>{[p.eventOne,p.eventTwo,p.eventThree].map((x,i)=><div key={x+i} style={{display:'flex',gap:10,padding:'8px 0',borderTop:'1px solid '+p.borderColor,fontSize:12}}><span style={{color:'#00e6a8'}}>●</span><span>{x}</span></div>)}</section>
  },
  ImagePanel:{
   label:'Image / Media Panel',fields:{title:{type:'text',label:'Image title'},imageUrl:{type:'text',label:'Image URL (https)'},alt:{type:'text',label:'Accessible description'},caption:{type:'text',label:'Caption'},backgroundColor:color('Background'),textColor:color('Text'),borderColor:color('Border'),padding:number('Padding (px)'),radius:number('Corner radius (px)')},
   defaultProps:{title:'Infrastructure Visualization',imageUrl:'',alt:'Infrastructure visualization placeholder',caption:'Add a trusted image URL to preview media.',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:12,radius:12},
   render:p=><figure style={{...panelStyle(p),margin:0}}><div style={{fontWeight:800,fontSize:14,marginBottom:10}}>{p.title}</div>{p.imageUrl&&/^https:\/\//i.test(p.imageUrl)?<img src={p.imageUrl} alt={p.alt} style={{width:'100%',maxHeight:360,objectFit:'cover',borderRadius:Math.max(0,Number(p.radius)-4)}}/>:<div style={{minHeight:120,display:'grid',placeItems:'center',border:'1px dashed '+p.borderColor,borderRadius:8,fontSize:12,opacity:.7}}>Add an HTTPS image URL in the inspector</div>}<figcaption style={{fontSize:11,opacity:.7,marginTop:8}}>{p.caption}</figcaption></figure>
  },
  BrandImage:{label:'Brand Image / Shield',fields:{imageUrl:{type:'text',label:'Uploaded image URL'},alt:{type:'text',label:'Accessible description'},caption:{type:'text',label:'Optional caption'},fit:select('Image fit',['Contain','Cover','Fill']),imageWidth:number('Image width (px; 0 = full width)'),imageHeight:number('Image height (px; 0 = natural)'),alignment:select('Alignment',['Left','Center','Right']),backgroundColor:color('Background'),borderColor:color('Border'),borderWidth:number('Border width (px)'),radius:number('Corner radius (px)'),padding:number('Padding (px)')},defaultProps:{imageUrl:'',alt:'IntelliStack Systems shield logo',caption:'',fit:'Contain',imageWidth:160,imageHeight:0,alignment:'Left',backgroundColor:'transparent',borderColor:'#31445f',borderWidth:0,radius:8,padding:4},render:p=><figure style={{margin:0,padding:Math.max(0,Number(p.padding)||0),background:p.backgroundColor||'transparent',border:(Math.max(0,Number(p.borderWidth)||0))+'px solid '+(p.borderColor||'transparent'),borderRadius:Math.max(0,Number(p.radius)||0),textAlign:(p.alignment||'Left').toLowerCase(),minWidth:0}}>{p.imageUrl&&/^https:\/\//i.test(p.imageUrl)?<img src={p.imageUrl} alt={p.alt||'Brand image'} style={{display:'inline-block',width:Number(p.imageWidth)>0?Math.min(2400,Number(p.imageWidth))+'px':'100%',height:Number(p.imageHeight)>0?Math.min(1600,Number(p.imageHeight))+'px':'auto',maxWidth:'100%',objectFit:(p.fit||'Contain').toLowerCase(),borderRadius:Math.max(0,Number(p.radius)-2)}}/>:<div style={{minHeight:90,maxWidth:360,display:'grid',placeItems:'center',border:'1px dashed '+(p.borderColor||'#31445f'),borderRadius:8,padding:16,fontSize:12,opacity:.75}}>Upload your shield in the Studio media bar, then paste its URL here.</div>}{p.caption&&<figcaption style={{fontSize:11,opacity:.7,marginTop:8}}>{p.caption}</figcaption>}</figure>},
  SloganBlock:{label:'Slogan / Brand Message',fields:{eyebrow:{type:'text',label:'Small heading'},slogan:{type:'textarea',label:'Slogan text'},supportingText:{type:'textarea',label:'Supporting text'},backgroundColor:color('Background'),textColor:color('Text'),accentColor:color('Accent'),alignment:select('Text alignment',['Left','Center','Right']),fontSize:number('Slogan font size (px)'),fontWeight:select('Font weight',['400','500','600','700','800','900']),padding:number('Padding (px)'),radius:number('Corner radius (px)')},defaultProps:{eyebrow:'INTELLISTACK SYSTEMS',slogan:'ONE WORLD. ONE SYSTEM. ONE INTELLIGENT NETWORK.',supportingText:'',backgroundColor:'transparent',textColor:'#e8efff',accentColor:'#00d4ff',alignment:'Left',fontSize:22,fontWeight:'800',padding:12,radius:8},render:p=><section style={{background:p.backgroundColor||'transparent',color:p.textColor||'#e8efff',textAlign:(p.alignment||'Left').toLowerCase(),padding:Math.max(0,Number(p.padding)||0),borderRadius:Math.max(0,Number(p.radius)||0),minWidth:0,overflowWrap:'anywhere'}}>{p.eyebrow&&<div style={{fontSize:10,letterSpacing:2,color:p.accentColor||'#00d4ff',fontWeight:800,marginBottom:7}}>{p.eyebrow}</div>}<div style={{fontSize:Math.max(8,Math.min(96,Number(p.fontSize)||22)),fontWeight:p.fontWeight||'800',lineHeight:1.25}}>{p.slogan}</div>{p.supportingText&&<p style={{fontSize:13,lineHeight:1.6,opacity:.78,margin:'8px 0 0'}}>{p.supportingText}</p>}</section>},
  DividerBlock:{label:'Divider',fields:{color:color('Divider color'),thickness:number('Thickness (px)'),verticalSpace:number('Vertical space (px)')},defaultProps:{color:'#31445f',thickness:1,verticalSpace:12},render:p=><div style={{padding:(p.verticalSpace+'px 0')}}><div style={{height:Math.max(1,Number(p.thickness)),background:p.color}}/></div>},
  SpacerBlock:{label:'Spacer',fields:{height:number('Height (px)')},defaultProps:{height:24},render:p=><div aria-hidden="true" style={{height:Math.max(0,Number(p.height)||0),minHeight:0}}/>},
  ResponsiveGrid:{
   label:'Responsive Grid',fields:{columns:select('Desktop columns',['1','2','3','4']),gap:number('Grid gap (px)'),note:{type:'text',label:'Layout note'}},
   defaultProps:{columns:'3',gap:14,note:'Responsive grid sample'},
   render:p=><div style={{display:'grid',gridTemplateColumns:'repeat('+Math.max(1,Math.min(4,Number(p.columns)||3))+',minmax(0,1fr))',gap:p.gap}}>{Array.from({length:Math.max(1,Math.min(4,Number(p.columns)||3))},(_,i)=><div key={i} style={{...panelStyle({}),minHeight:70,display:'grid',placeItems:'center',fontSize:11,opacity:.75}}>Grid column {i+1}</div>)}</div>
  },
  PanelContainer:{
   label:'Panel Container',fields:{title:{type:'text',label:'Panel label'},...styles},
   defaultProps:{title:'Panel Container',backgroundColor:'#0c1426',textColor:'#e8efff',borderColor:'#31445f',padding:18,radius:12},
   render:p=><div style={panelStyle(p)}><div style={{fontSize:10,letterSpacing:1.2,opacity:.7,marginBottom:10}}>{p.title}</div><div style={{border:'1px dashed '+p.borderColor,borderRadius:8,padding:14,fontSize:11,opacity:.75}}>Container preview — use as a section boundary.</div></div>
  },
  CommandFooter:{
   label:'Command Center Footer',fields:{leftText:{type:'text',label:'Left text'},rightText:{type:'text',label:'Right text'},backgroundColor:color('Footer background'),textColor:color('Footer text'),accentColor:color('Accent'),padding:number('Padding (px)')},
   defaultProps:{leftText:'INTELLISTACK SYSTEMS',rightText:'ONE WORLD. ONE INTELLIGENT NETWORK.',backgroundColor:'#080f1e',textColor:'#a9bddb',accentColor:'#00d4ff',padding:14},
   render:p=><footer style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',padding:p.padding,background:p.backgroundColor,color:p.textColor,borderTop:'1px solid '+p.accentColor,fontSize:10,letterSpacing:1}}><strong style={{color:p.accentColor}}>{p.leftText}</strong><span>{p.rightText}</span></footer>
  }
 }
};

// Shared inspector controls for every block: pixel nudges, dimensions, opacity, and typography.
const sharedBlockFields = {
 offsetX:number('Move horizontally (px; 96 px ≈ 1 inch)'), offsetY:number('Move vertically (px; 96 px ≈ 1 inch)'),
 blockWidth:number('Block width (px; 0 = automatic)'), blockMaxWidth:number('Maximum width (px; 0 = unlimited)'),
 blockMinHeight:number('Minimum height (px)'), blockOpacity:number('Opacity (0–100)'),
 blockFontFamily:select('Font family',['Inherit','Inter','Orbitron','DM Mono','Arial','Georgia','Verdana']),
 blockFontSize:number('Base font size (px; 0 = automatic)'), blockFontWeight:select('Base font weight',['Inherit','400','500','600','700','800','900']),
 blockTextAlign:select('Base text alignment',['Inherit','Left','Center','Right']), blockLineHeight:number('Line height (e.g. 1.4)'),
 blockLetterSpacing:number('Letter spacing (px)')
};
Object.values(config.components).forEach(component => {
 component.fields={...sharedBlockFields,...component.fields};
 const renderComponent=component.render;
 component.render=props=><div style={{position:'relative',left:Number(props.offsetX)||0,top:Number(props.offsetY)||0,width:Number(props.blockWidth)>0?Math.min(2400,Number(props.blockWidth))+'px':'auto',maxWidth:Number(props.blockMaxWidth)>0?Math.min(2400,Number(props.blockMaxWidth))+'px':'100%',minHeight:Number(props.blockMinHeight)>0?Math.min(1600,Number(props.blockMinHeight))+'px':undefined,opacity:props.blockOpacity!==undefined&&props.blockOpacity!==''?Math.max(0,Math.min(100,Number(props.blockOpacity)))/100:1,fontFamily:props.blockFontFamily&&props.blockFontFamily!=='Inherit'?props.blockFontFamily:undefined,fontSize:Number(props.blockFontSize)>0?Math.min(96,Number(props.blockFontSize))+'px':undefined,fontWeight:props.blockFontWeight&&props.blockFontWeight!=='Inherit'?props.blockFontWeight:undefined,textAlign:props.blockTextAlign&&props.blockTextAlign!=='Inherit'?props.blockTextAlign.toLowerCase():undefined,lineHeight:Number(props.blockLineHeight)>0?Math.min(3,Number(props.blockLineHeight)):undefined,letterSpacing:Number(props.blockLetterSpacing)?Math.max(-5,Math.min(20,Number(props.blockLetterSpacing)))+'px':undefined,boxSizing:'border-box'}}>{renderComponent(props)}</div>;
});
const defaults = key => ({ id:key+'-1', ...config.components[key].defaultProps });
const starterData = { root:{props:{canvasBackground:'#070c19',canvasPadding:20}}, content:[
 {type:'ISBrandHeader',props:defaults('ISBrandHeader')},
 {type:'OperationsStatusBar',props:defaults('OperationsStatusBar')},
 {type:'SectionHeading',props:defaults('SectionHeading')},
 {type:'WorldClockStrip',props:defaults('WorldClockStrip')},
 {type:'ResponsiveGrid',props:{...defaults('ResponsiveGrid'),columns:'4'}},
 ...[['CHICAGO','09:41:26','#00d4ff'],['LOS ANGELES','07:41:26','#8b7bff'],['NEW YORK','10:41:26','#00e6a8'],['LONDON','15:41:26','#ffb86b']].map((c,i)=>({type:'CityClockCard',props:{...defaults('CityClockCard'),id:'city-clock-'+i,city:c[0],time:c[1],accentColor:c[2]}})),
 {type:'MetricCard',props:defaults('MetricCard')},
 {type:'MetricCard',props:{...defaults('MetricCard'),id:'metric-tickets-1',label:'OPEN SERVICE TICKETS',value:'36',accentColor:'#ffb86b'}},
 {type:'MetricCard',props:{...defaults('MetricCard'),id:'metric-health-1',label:'NETWORK HEALTH',value:'99.98%',accentColor:'#00e6a8'}},
 {type:'AlertBanner',props:defaults('AlertBanner')},
 {type:'QuickActionPanel',props:defaults('QuickActionPanel')},
 {type:'DataTablePanel',props:defaults('DataTablePanel')},
 {type:'ActivityFeed',props:defaults('ActivityFeed')},
 {type:'CommandFooter',props:defaults('CommandFooter')}
]};

export default function IntelliStackPuckStudio({theme,setTheme,onSave,saving,notice,onExit,onUploadImage}) {
 const [workingData,setWorkingData]=useState(()=>theme?.puckLayout||starterData);
 const [viewMode,setViewMode]=useState('desktop');
 const [savedMessage,setSavedMessage]=useState('');
 const [assetUrl,setAssetUrl]=useState(theme?.images?.studioLibrary||'');
 const [assetUploading,setAssetUploading]=useState(false);
 const [assetError,setAssetError]=useState('');
 const handleAssetUpload=async event=>{const file=event.target.files?.[0];if(!file)return;setAssetError('');if(!['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'].includes(file.type)){setAssetError('Choose a JPG, PNG, WebP, GIF, or SVG image.');event.target.value='';return;}if(file.size>8*1024*1024){setAssetError('Images must be 8 MB or smaller.');event.target.value='';return;}if(!onUploadImage){setAssetError('Media storage is not connected to this editor yet.');event.target.value='';return;}setAssetUploading(true);try{const url=await onUploadImage(file,'studioLibrary');if(url){setAssetUrl(url);setSavedMessage('Image uploaded. Add a Brand Image block and paste the URL into its image field.');}}catch(error){setAssetError(error?.message||'Image upload failed.');}finally{setAssetUploading(false);event.target.value='';}};
 const copyAssetUrl=async()=>{try{await navigator.clipboard.writeText(assetUrl);setSavedMessage('Image URL copied. Add a Brand Image block and paste it into the image URL field.');}catch{setSavedMessage('Select and copy the image URL from the field below.');}};
 const initialData=useMemo(()=>workingData,[]);
 const handlePublish=async data=>{
  const nextTheme={...theme,puckLayout:data,puckLayoutVersion:1};
  setWorkingData(data);setTheme(nextTheme);setSavedMessage('');
  await onSave(nextTheme);
 };
 return <div className="is-puck-studio">
  <header className="is-puck-studio-header"><div className="is-puck-studio-brand"><span className="is-puck-shield">IS</span><div><strong>INTELLISTACK SYSTEMS</strong><b>VISUAL COMPONENT STUDIO</b><small>Drag, select, style, arrange, and publish component layouts.</small></div></div><div className="is-puck-studio-actions"><button type="button" className="is-puck-quiet" onClick={onExit}><ArrowLeft size={16}/> Exit Studio</button><button type="button" className="is-puck-publish" disabled={saving} onClick={()=>handlePublish(workingData)}><Save size={16}/> Save / Publish</button></div></header>
  <div className="is-puck-studio-subbar"><div><Layers3 size={15}/><span>Block library</span><b>21 component types</b><span className="is-puck-subtle">· Layout, typography, position, branding</span></div><div className="is-puck-viewports"><button type="button" className={viewMode==='desktop'?'active':''} onClick={()=>setViewMode('desktop')}><Monitor size={15}/><span>Desktop</span></button><button type="button" className={viewMode==='tablet'?'active':''} onClick={()=>setViewMode('tablet')}><Tablet size={15}/><span>Tablet</span></button><button type="button" className={viewMode==='mobile'?'active':''} onClick={()=>setViewMode('mobile')}><Smartphone size={15}/><span>Mobile</span></button></div></div>
   <section className="is-puck-media-bar"><div><strong>Studio media library</strong><small>Upload the exact shield, logo, or background you want to use. Then add a Brand Image block and paste its URL.</small></div><label className="is-puck-upload-button"><span>{assetUploading?'Uploading…':'＋ Upload image'}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" onChange={handleAssetUpload} disabled={assetUploading}/></label>{assetUrl&&<div className="is-puck-asset-url"><input aria-label="Uploaded image URL" readOnly value={assetUrl}/><button type="button" className="is-puck-quiet" onClick={copyAssetUrl}>Copy URL</button></div>}{assetError&&<p className="is-puck-asset-error" role="alert">{assetError}</p>}</section>
  <div className="is-puck-notice"><ShieldCheck size={15}/><span>This editor saves a Puck layout with the shared organization theme. Existing live dashboard screens are not replaced until each screen is connected to this renderer.</span></div>
  {(notice||savedMessage)&&<div className="is-puck-feedback" role="status">{savedMessage||notice}</div>}
  <div className={'is-puck-editor-frame is-puck-'+viewMode}><Puck config={config} data={initialData} headerTitle="IntelliStack Systems · Component Studio" headerPath="/themestudio" height="calc(100vh - 220px)" viewports={[{label:'Desktop',width:1440},{label:'Tablet',width:820},{label:'Mobile',width:390}]} onChange={setWorkingData} onPublish={handlePublish}/></div>
  <footer className="is-puck-studio-foot"><CheckCircle2 size={14}/><span>Each block has independent content, color, border, spacing, and shape controls where applicable.</span><span className="is-puck-foot-count">Puck · open-source React editor</span></footer>
 </div>;
}
