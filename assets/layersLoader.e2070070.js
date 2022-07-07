import{bC as b,aJ as y,bL as I,bN as g}from"./vendor.5530b0a9.js";import{a as i}from"./lazyLayerLoader.51410ee6.js";import{e as w}from"./jsonContext.6141a5b1.js";async function d(t){const{data:n}=await b(t,{responseType:"json",query:{f:"json"}});return n}async function v(t,n){const e=t.instance.portalItem;if(e&&e.id)return await e.load(n),T(t),L(t,n)}function T(t){const n=t.instance.portalItem;if(!t.supportedTypes.includes(n.type))throw new y("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:n.type,expectedType:t.supportedTypes.join(", ")})}async function L(t,n){const e=t.instance,r=e.portalItem,{url:a,title:l}=r,o=w(r);if(e.type==="group")return e.read({title:l},o),S(e,t);a&&e.read({url:a},o);const u=await f(t,n);return u&&e.read(u,o),e.resourceReferences={portalItem:r,paths:o.readResourcePaths},e.read({title:l},o),I(e,o)}function S(t,n){let e;const r=t.portalItem.type;switch(r){case"Feature Service":case"Feature Collection":e=i.FeatureLayer;break;case"Stream Service":e=i.StreamLayer;break;case"Scene Service":e=i.SceneLayer;break;default:throw new y("portal:unsupported-item-type-as-group",`The item type '${r}' is not supported as a 'IGroupLayer'`)}let a;return e().then(l=>(a=l,f(n))).then(async l=>r==="Feature Service"?(l=await m(l,t.portalItem.url),c(t,a,l)):s(l)>0?c(t,a,l):F(t,a))}function F(t,n){return t.portalItem.url?d(t.portalItem.url).then(e=>{var a,l;function r(o){return{id:o.id,name:o.name}}e&&c(t,n,{layers:(a=e.layers)==null?void 0:a.map(r),tables:(l=e.tables)==null?void 0:l.map(r)})}):Promise.resolve()}function c(t,n,e){let r=e.layers||[];const a=e.tables||[];t.portalItem.type==="Feature Collection"&&(r.forEach(l=>{var o;((o=l==null?void 0:l.layerDefinition)==null?void 0:o.type)==="Table"&&a.push(l)}),r=r.filter(l=>{var o;return((o=l==null?void 0:l.layerDefinition)==null?void 0:o.type)!=="Table"})),r.reverse().forEach(l=>{const o=p(t,n,e,l);t.add(o)}),a.reverse().forEach(l=>{const o=p(t,n,e,l);t.tables.add(o)})}function p(t,n,e,r){const a=new n({portalItem:t.portalItem.clone(),layerId:r.id,sublayerTitleMode:"service-name"});if(t.portalItem.type==="Feature Collection"){const l={origin:"portal-item",portal:t.portalItem.portal||g.getDefault()};a.read(r,l);const o=e.showLegend;o!=null&&a.read({showLegend:o},l)}return a}function f(t,n){if(t.supportsData===!1)return Promise.resolve(void 0);const e=t.instance;return e.portalItem.fetchData("json",n).catch(()=>null).then(async r=>{if(j(e)){let a,l=!0;return r&&s(r)>0&&(e.layerId==null&&(e.layerId=h(r)),a=D(r,e.layerId),a&&(s(r)===1&&(l=!1),r.showLegend!=null&&(a.showLegend=r.showLegend))),l&&e.sublayerTitleMode!=="service-name"&&(e.sublayerTitleMode="item-title-and-service-name"),a}return r})}async function m(t,n){if((t==null?void 0:t.layers)==null||(t==null?void 0:t.tables)==null){const e=await d(n);(t=t||{}).layers=t.layers||(e==null?void 0:e.layers),t.tables=t.tables||(e==null?void 0:e.tables)}return t}function h(t){const n=t.layers;if(n&&n.length)return n[0].id;const e=t.tables;return e&&e.length?e[0].id:null}function D(t,n){const e=t.layers;if(e){for(let a=0;a<e.length;a++)if(e[a].id===n)return e[a]}const r=t.tables;if(r){for(let a=0;a<r.length;a++)if(r[a].id===n)return r[a]}return null}function s(t){var n,e,r,a;return((e=(n=t==null?void 0:t.layers)==null?void 0:n.length)!=null?e:0)+((a=(r=t==null?void 0:t.tables)==null?void 0:r.length)!=null?a:0)}function j(t){return t.type!=="stream"&&"layerId"in t}var _=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",getFirstLayerOrTableId:h,getNumLayersAndTables:s,load:v,preprocessFSItemData:m});export{s as I,m as f,_ as l,h as m,d as n};
