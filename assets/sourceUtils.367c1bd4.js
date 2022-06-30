import{ho as m,gg as p,nD as y,nE as w,nF as I,fE as d,t as h}from"./vendor.e1f4f720.js";class b{constructor(){this.code=null,this.description=null}}class q{constructor(t){this.error=new b,this.globalId=null,this.objectId=null,this.success=!1,this.uniqueId=null,this.error.description=t}}function f(e){return new q(e)}class v{constructor(t){this.globalId=null,this.success=!0,this.objectId=this.uniqueId=t}}function G(e){return new v(e)}const u=new Set;function P(e,t,i,g=!1,a){u.clear();for(const r in i){const n=e.get(r);if(!n)continue;const l=i[r],s=E(n,l);if(s!==l&&a&&a.push({name:"invalid-value-type",message:"attribute value was converted to match the field type",details:{field:n,originalValue:l,sanitizedValue:s}}),u.add(n.name),n&&(g||n.editable)){const c=w(n,s);if(c)return f(I(c,n,s));t[n.name]=s}}for(const r of e.requiredFields)if(!u.has(r.name))return f(`missing required field "${r.name}"`);return null}function E(e,t){let i=t;return typeof t=="string"&&m(e)?i=parseFloat(t):t!=null&&p(e)&&typeof t!="string"&&(i=String(t)),y(i)}let o;function S(e,t){if(!e||!d(t))return e;if("rings"in e||"paths"in e){if(h(o))throw new TypeError("geometry engine not loaded");return o.simplify(t,e)}return e}async function F(){return h(o)&&(o=await import("./geometryEngineJSON.2762c1dd.js")),o}async function V(e,t){!d(e)||t!=="esriGeometryPolygon"&&t!=="esriGeometryPolyline"||await F()}export{f as a,G as f,S as g,P as m,V as w};