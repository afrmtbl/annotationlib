!function(t){const e={};function n(t,e,n,r,s,o){!function(){window.AnnotationParser=class{static get attributeMap(){return{type:"tp",style:"s",x:"x",y:"y",width:"w",height:"h",sx:"sx",sy:"sy",timeStart:"ts",timeEnd:"te",text:"t",actionType:"at",actionUrl:"au",actionUrlTarget:"aut",actionSeconds:"as",bgOpacity:"bgo",bgColor:"bgc",fgColor:"fgc",textSize:"txsz"}}deserializeAnnotation(t){const e=this.constructor.attributeMap,n=t.split(","),r={};for(const t of n){const[n,s]=t.split("="),o=this.getKeyByValue(e,n);let i="";i=["text","actionType","actionUrl","actionUrlTarget","type","style"].indexOf(o)>-1?decodeURIComponent(s):parseFloat(s,10),r[o]=i}return r}serializeAnnotation(t){const e=this.constructor.attributeMap;let n="";for(const r in t){const s=e[r];["text","actionType","actionUrl","actionUrlTarget"].indexOf(r)>-1&&s&&t.hasOwnProperty(r)?n+=`${s}=${encodeURIComponent(t[r])},`:-1===["text","actionType","actionUrl","actionUrlTarget"].indexOf("key")&&s&&t.hasOwnProperty(r)&&(n+=`${s}=${t[r]},`)}return n.substring(0,n.length-1)}deserializeAnnotationList(t){const e=t.split(";");e.length=e.length-1;const n=[];for(const t of e)n.push(this.deserializeAnnotation(t));return n}serializeAnnotationList(t){let e="";for(const n of t)e+=this.serializeAnnotation(n)+";";return e}xmlToDom(t){return(new DOMParser).parseFromString(t,"application/xml")}getAnnotationsFromXml(t){return this.xmlToDom(t).getElementsByTagName("annotation")}parseYoutubeAnnotationList(t){const e=[];for(const n of t){const t=this.parseYoutubeAnnotation(n);t&&e.push(t)}return e}parseYoutubeAnnotation(t){const e=t,n=this.getAttributesFromBase(e);if(!n.type||"pause"===n.type)return null;const r=this.getTextFromBase(e),s=this.getActionFromBase(e),o=this.getBackgroundShapeFromBase(e);if(!o)return null;const i=o.timeRange.start,a=o.timeRange.end;if(isNaN(i)||isNaN(a)||null===i||null===a)return null;const l=this.getAppearanceFromBase(e);let u={type:n.type,x:o.x,y:o.y,width:o.width,height:o.height,timeStart:i,timeEnd:a};return n.style&&(u.style=n.style),r&&(u.text=r),s&&(u=Object.assign(s,u)),l&&(u=Object.assign(l,u)),o.hasOwnProperty("sx")&&(u.sx=o.sx),o.hasOwnProperty("sy")&&(u.sy=o.sy),u}getBackgroundShapeFromBase(t){const e=t.getElementsByTagName("movingRegion")[0];if(!e)return null;const n=e.getAttribute("type"),r=e.getElementsByTagName(`${n}Region`),s=this.extractRegionTime(r),o={type:n,x:parseFloat(r[0].getAttribute("x"),10),y:parseFloat(r[0].getAttribute("y"),10),width:parseFloat(r[0].getAttribute("w"),10),height:parseFloat(r[0].getAttribute("h"),10),timeRange:s},i=r[0].getAttribute("sx"),a=r[0].getAttribute("sy");return i&&(o.sx=parseFloat(i,10)),a&&(o.sy=parseFloat(a,10)),o}getAttributesFromBase(t){const e={};return e.type=t.getAttribute("type"),e.style=t.getAttribute("style"),e}getTextFromBase(t){const e=t.getElementsByTagName("TEXT")[0];if(e)return e.textContent}getActionFromBase(t){const e=t.getElementsByTagName("action")[0];if(!e)return null;e.getAttribute("type");const n=e.getElementsByTagName("url")[0];if(!n)return null;const r=n.getAttribute("target"),s=n.getAttribute("value");if(s.startsWith("https://www.youtube.com/")){const t=new URL(s),e=t.searchParams.get("src_vid"),n=t.searchParams.get("v");return this.linkOrTimestamp(t,e,n,r)}}linkOrTimestamp(t,e,n,r){if(e&&n&&e===n){let e=0;const n=t.hash;if(n&&n.startsWith("#t=")){const n=t.hash.split("#t=")[1];e=this.timeStringToSeconds(n)}return{actionType:"time",actionSeconds:e}}return{actionType:"url",actionUrl:t.href,actionUrlTarget:r}}getAppearanceFromBase(t){const e=t.getElementsByTagName("appearance")[0];if(e){const t=e.getAttribute("bgAlpha"),n=e.getAttribute("bgColor"),r=e.getAttribute("fgColor"),s=e.getAttribute("textSize"),o={};return t&&(o.bgOpacity=parseFloat(t,10)),n&&(o.bgColor=parseInt(n,10)),r&&(o.fgColor=parseInt(r,10)),s&&(o.textSize=parseFloat(s,10)),o}}extractRegionTime(t){let e=t[0].getAttribute("t");e=this.hmsToSeconds(e);let n=t[t.length-1].getAttribute("t");return{start:e,end:n=this.hmsToSeconds(n)}}hmsToSeconds(t){let e=t.split(":"),n=0,r=1;for(;e.length>0;)n+=r*parseFloat(e.pop(),10),r*=60;return n}timeStringToSeconds(t){let e=0;const n=t.split("h"),r=(n[1]||t).split("m"),s=(r[1]||t).split("s");return n[0]&&2===n.length&&(e+=60*parseInt(n[0],10)*60),r[0]&&2===r.length&&(e+=60*parseInt(r[0],10)),s[0]&&2===s.length&&(e+=parseInt(s[0],10)),e}getKeyByValue(t,e){for(const n in t)if(t.hasOwnProperty(n)&&t[n]===e)return n}}}()}e.baseRequire="undefined"!=typeof require?require:t=>{throw new Error(`Could not resolve module name: ${t}`)},e.modules={},e.files={},e.mains={},e.resolve=((t,e)=>{(t=t.split("/")).shift();for(const n of e.split("/"))".."===n?t.pop():"."!==n&&t.push(n);return"/"+t.join("/")}),e.Module=function(t,e){this.filename=t,this.id=t,this.loaded=!1,this.parent=e,this.children=[],this.exports={}},e.makeRequire=(t=>{const n=t=>n._module(t).exports;return n._deps={},n.main=t,n._esModule=(t=>{const e=n._module(t);return e.exports.__esModule?e.exports:{get default(){return e.exports}}}),n._module=(r=>{let s=t?n._deps[r]:e.main;if(null==s){const t={exports:e.baseRequire(r)};return n._deps[r]={module:t},t}if(s.module)return s.module;const o=new e.Module(s.filename,t);return s.module=o,o.require=e.makeRequire(o),o.require._deps=s.deps,o.require.main=t?t.require.main:o,t&&t.children.push(o),s(o,o.exports,o.require,s.filename,s.filename.split("/").slice(0,-1).join("/"),{url:"file://"+("/"===s.filename.charAt(0)?"":"/")+s.filename}),o.loaded=!0,o}),n}),e.files["C:/Users/afrm/Desktop/projects/annotationlib/lib/src/parser/index.js"]=n,n.deps={},n.filename="C:/Users/afrm/Desktop/projects/annotationlib/lib/src/parser/index.js",e.main=n,e.makeRequire(null)(),"undefined"!=typeof module&&(module.exports=e.main.module&&e.main.module.exports)}("undefined"!=typeof global?global:"undefined"!=typeof window&&window);