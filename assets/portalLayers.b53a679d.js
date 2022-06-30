var S=Object.defineProperty,h=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var p=(e,r,a)=>r in e?S(e,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[r]=a,u=(e,r)=>{for(var a in r||(r={}))w.call(r,a)&&p(e,a,r[a]);if(m)for(var a of m(r))T.call(r,a)&&p(e,a,r[a]);return e},f=(e,r)=>h(e,g(r));import{bH as L,R as M}from"./vendor.e1f4f720.js";import{a as v}from"./lazyLayerLoader.61c37b60.js";import{f as P,I as l,m as C,n as c}from"./layersLoader.190cf26b.js";import{s as d}from"./portalItemUtils.ef74c483.js";import"./jsonContext.f681423f.js";function X(e){return!e.portalItem||e.portalItem instanceof L||(e=f(u({},e),{portalItem:new L(e.portalItem)})),F(e.portalItem).then(r=>{const a=u({portalItem:e.portalItem},r.properties);return new r.constructor(a)})}function F(e){return e.load().then($).then(b)}function $(e){switch(e.type){case"Map Service":return j(e);case"Feature Service":return G(e);case"Feature Collection":return W(e);case"Scene Service":return K(e);case"Image Service":return D(e);case"Stream Service":return A();case"Vector Tile Service":return B();case"KML":return V();case"WFS":return k();case"WMTS":return O();case"WMS":return x();case"Feed":return R();default:return Promise.reject(new M("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type}))}}function b(e){return(0,v[e.className])().then(r=>({constructor:r,properties:e.properties}))}function j(e){return E(e).then(r=>r?{className:"TileLayer"}:{className:"MapImageLayer"})}function G(e){return N(e).then(r=>{if(typeof r=="object"){const a={};return r.id!=null&&(a.layerId=r.id),{className:"FeatureLayer",properties:a}}return{className:"GroupLayer"}})}function K(e){return N(e).then(r=>{if(typeof r=="object"){const a={};let o;if(r.id!=null?(a.layerId=r.id,o=`${e.url}/layers/${r.id}`):o=e.url,Array.isArray(e.typeKeywords)&&e.typeKeywords.length>0){const t={IntegratedMesh:"IntegratedMeshLayer","3DObject":"SceneLayer",Point:"SceneLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};for(const n of Object.keys(t))if(e.typeKeywords.includes(n))return{className:t[n]}}return c(o).then(t=>{let n="SceneLayer";const s={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};return t&&t.layerType&&s[t.layerType]&&(n=s[t.layerType]),{className:n,properties:a}})}return r===!1?c(e.url).then(a=>(a==null?void 0:a.layerType)==="Voxel"?{className:"VoxelLayer"}:{className:"GroupLayer"}):{className:"GroupLayer"}})}async function W(e){if(await e.load(),d(e,"Map Notes"))return{className:"MapNotesLayer"};if(d(e,"Route Layer"))return{className:"RouteLayer"};const r=await e.fetchData();return l(r)===1?{className:"FeatureLayer"}:{className:"GroupLayer"}}async function D(e){var t,n,s,y;await e.load();const r=(n=(t=e.typeKeywords)==null?void 0:t.map(I=>I.toLowerCase()))!=null?n:[];if(r.includes("elevation 3d layer"))return{className:"ElevationLayer"};if(r.includes("tiled imagery"))return{className:"ImageryTileLayer"};const a=(s=await e.fetchData())==null?void 0:s.layerType;return a==="ArcGISTiledImageServiceLayer"?{className:"ImageryTileLayer"}:a==="ArcGISImageServiceLayer"?{className:"ImageryLayer"}:((y=(await c(e.url)).cacheType)==null?void 0:y.toLowerCase())==="map"?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}function A(){return{className:"StreamLayer"}}function B(){return{className:"VectorTileLayer"}}function V(){return{className:"KMLLayer"}}function k(){return{className:"WFSLayer"}}function x(){return{className:"WMSLayer"}}function O(){return{className:"WMTSLayer"}}function R(){return{className:"StreamLayer"}}function E(e){return c(e.url).then(r=>r.tileInfo)}function N(e){return!e.url||e.url.match(/\/\d+$/)?Promise.resolve({}):e.load().then(()=>e.fetchData()).then(async r=>e.type==="Feature Service"?i(r=await P(r,e.url)):l(r)>0?i(r):c(e.url).then(i))}function i(e){return l(e)===1&&{id:C(e)}}export{X as fromItem,$ as selectLayerClassPath};