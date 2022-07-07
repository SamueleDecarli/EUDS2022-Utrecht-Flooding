var H=Object.defineProperty,C=Object.defineProperties;var K=Object.getOwnPropertyDescriptors;var M=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var U=(r,e,t)=>e in r?H(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,O=(r,e)=>{for(var t in e||(e={}))W.call(e,t)&&U(r,t,e[t]);if(M)for(var t of M(e))X.call(e,t)&&U(r,t,e[t]);return r},R=(r,e)=>C(r,K(e));import{r as j,fK as Y,hM as ee,hN as te,hO as A,hP as re,i,j as l,hQ as se,fQ as ae,au as L,bP as ie,hR as oe,n as S,eM as T,hS as ne,k as D,dp as le,fy as pe,hT as ue,hU as ye,fP as me,hV as ce,hW as de,bC as he,gy as fe,hX as ge,aJ as _,t as we,ae as be,hs as xe,aL as ve,ba as Pe}from"./vendor.5530b0a9.js";import{q as Ee}from"./DynamicLayerView3D.ce91f2f5.js";import{s as G}from"./clickToleranceUtils.501648d0.js";import{d as Ne,s as $e}from"./popupUtils.b3e0b00a.js";import{a as Ie}from"./drapedUtils.5b2332f6.js";import"./LayerView3D.b66f774a.js";import"./projectExtentUtils.c5348bbe.js";import"./ImageMaterial.0df036e3.js";import"./LayerView.f88dad35.js";import"./RefreshableLayerView.9632c8ac.js";const Q=r=>r.spatialReference.wkid||JSON.stringify(r.spatialReference);function Oe(r,e){const{dpi:t,gdbVersion:a,geometry:s,geometryPrecision:n,height:h,layerOption:p,mapExtent:o,maxAllowableOffset:c,returnFieldName:y,returnGeometry:d,returnUnformattedValues:g,returnZ:N,spatialReference:P,timeExtent:E,tolerance:u,width:v}=r.toJSON(),{dynamicLayers:w,layerDefs:f,layerIds:b}=je(r),F=e&&j(e.geometry)?e.geometry:null,x={geometryPrecision:n,maxAllowableOffset:c,returnFieldName:y,returnGeometry:d,returnUnformattedValues:g,returnZ:N,tolerance:u},I=F&&F.toJSON()||s;if(x.imageDisplay=`${v},${h},${t}`,a&&(x.gdbVersion=a),I&&(delete I.spatialReference,x.geometry=JSON.stringify(I),x.geometryType=Y(I)),P?x.sr=P.wkid||JSON.stringify(P):I&&I.spatialReference?x.sr=Q(I):o&&o.spatialReference&&(x.sr=Q(o)),x.time=E?[E.start,E.end].join(","):null,o){const{xmin:B,ymin:q,xmax:Z,ymax:z}=o;x.mapExtent=`${B},${q},${Z},${z}`}return f&&(x.layerDefs=f),w&&!f&&(x.dynamicLayers=w),x.layers=p==="popup"?"visible":p,b&&!w&&(x.layers+=`:${b.join(",")}`),x}function je(r){var P,E;const{mapExtent:e,floors:t,width:a,sublayers:s,layerIds:n,layerOption:h,gdbVersion:p}=r,o=(E=(P=s==null?void 0:s.find(u=>u.layer!=null))==null?void 0:P.layer)==null?void 0:E.serviceSublayers,c=h==="popup",y={},d=ee({extent:e,width:a,spatialReference:e==null?void 0:e.spatialReference}),g=[],N=u=>{const v=d===0,w=u.minScale===0||d<=u.minScale,f=u.maxScale===0||d>=u.maxScale;if(u.visible&&(v||w&&f))if(u.sublayers)u.sublayers.forEach(N);else{if((n==null?void 0:n.includes(u.id))===!1||c&&(!u.popupTemplate||!u.popupEnabled))return;g.unshift(u)}};if(s==null||s.forEach(N),s&&!g.length)y.layerIds=[];else{const u=te(g,o,p),v=g.map(w=>{const f=A(t,w);return w.toExportImageJSON(f)});if(u)y.dynamicLayers=JSON.stringify(v);else{if(s){let f=g.map(({id:b})=>b);n&&(f=f.filter(b=>n.includes(b))),y.layerIds=f}else(n==null?void 0:n.length)&&(y.layerIds=n);const w=Se(t,g);if(j(w)&&w.length){const f={};for(const b of w)b.definitionExpression&&(f[b.id]=b.definitionExpression);Object.keys(f).length&&(y.layerDefs=JSON.stringify(f))}}}return y}function Se(r,e){const t=!!(r==null?void 0:r.length),a=e.filter(s=>s.definitionExpression!=null||t&&s.floorInfo!=null);return a.length?a.map(s=>{const n=A(r,s),h=re(n,s.definitionExpression);return{id:s.id,definitionExpression:h}}):null}var V;let m=V=class extends T{constructor(r){super(r),this.dpi=96,this.floors=null,this.gdbVersion=null,this.geometry=null,this.geometryPrecision=null,this.height=400,this.layerIds=null,this.layerOption="top",this.mapExtent=null,this.maxAllowableOffset=null,this.returnFieldName=!0,this.returnGeometry=!1,this.returnM=!1,this.returnUnformattedValues=!0,this.returnZ=!1,this.spatialReference=null,this.sublayers=null,this.timeExtent=null,this.tolerance=null,this.width=400}static from(r){return ne(V,r)}};i([l({type:Number,json:{write:!0}})],m.prototype,"dpi",void 0),i([l()],m.prototype,"floors",void 0),i([l({type:String,json:{write:!0}})],m.prototype,"gdbVersion",void 0),i([l({types:se,json:{read:ae,write:!0}})],m.prototype,"geometry",void 0),i([l({type:Number,json:{write:!0}})],m.prototype,"geometryPrecision",void 0),i([l({type:Number,json:{write:!0}})],m.prototype,"height",void 0),i([l({type:[Number],json:{write:!0}})],m.prototype,"layerIds",void 0),i([l({type:["top","visible","all","popup"],json:{write:!0}})],m.prototype,"layerOption",void 0),i([l({type:L,json:{write:!0}})],m.prototype,"mapExtent",void 0),i([l({type:Number,json:{write:!0}})],m.prototype,"maxAllowableOffset",void 0),i([l({type:Boolean,json:{write:!0}})],m.prototype,"returnFieldName",void 0),i([l({type:Boolean,json:{write:!0}})],m.prototype,"returnGeometry",void 0),i([l({type:Boolean,json:{write:!0}})],m.prototype,"returnM",void 0),i([l({type:Boolean,json:{write:!0}})],m.prototype,"returnUnformattedValues",void 0),i([l({type:Boolean,json:{write:!0}})],m.prototype,"returnZ",void 0),i([l({type:ie,json:{write:!0}})],m.prototype,"spatialReference",void 0),i([l()],m.prototype,"sublayers",void 0),i([l({type:oe,json:{write:!0}})],m.prototype,"timeExtent",void 0),i([l({type:Number,json:{write:!0}})],m.prototype,"tolerance",void 0),i([l({type:Number,json:{write:!0}})],m.prototype,"width",void 0),m=V=i([S("esri.rest.support.IdentifyParameters")],m);const k=m;let $=class extends T{constructor(r){super(r),this.displayFieldName=null,this.feature=null,this.layerId=null,this.layerName=null}readFeature(r,e){return D.fromJSON({attributes:O({},e.attributes),geometry:O({},e.geometry)})}writeFeature(r,e){if(!r)return;const{attributes:t,geometry:a}=r;t&&(e.attributes=O({},t)),j(a)&&(e.geometry=a.toJSON(),e.geometryType=ue.toJSON(a.type))}};i([l({type:String,json:{write:!0}})],$.prototype,"displayFieldName",void 0),i([l({type:D})],$.prototype,"feature",void 0),i([le("feature",["attributes","geometry"])],$.prototype,"readFeature",null),i([pe("feature")],$.prototype,"writeFeature",null),i([l({type:Number,json:{write:!0}})],$.prototype,"layerId",void 0),i([l({type:String,json:{write:!0}})],$.prototype,"layerName",void 0),$=i([S("esri.rest.support.IdentifyResult")],$);const Fe=$;async function Re(r,e,t){const a=(e=Je(e)).geometry?[e.geometry]:[],s=ye(r);return s.path+="/identify",me(a).then(n=>{const h=Oe(e,{geometry:n&&n[0]}),p=ce(O(R(O({},s.query),{f:"json"}),h)),o=de(p,t);return he(s.path,o).then(Ve).then(c=>Ae(c,e.sublayers))})}function Ve(r){const e=r.data;e.results=e.results||[];const t={results:[]};return t.results=e.results.map(a=>Fe.fromJSON(a)),t}function Je(r){return r=k.from(r)}function Ae(r,e){if(!(e==null?void 0:e.length))return r;const t=new Map;function a(s){t.set(s.id,s),s.sublayers&&s.sublayers.forEach(a)}e.forEach(a);for(const s of r.results)s.feature.sourceLayer=t.get(s.layerId);return r}const Me=r=>{let e=class extends r{initialize(){this.exportImageParameters=new ge({layer:this.layer})}destroy(){this.exportImageParameters.destroy(),this.exportImageParameters=null}get exportImageVersion(){var t;return(t=this.exportImageParameters)==null||t.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}async fetchPopupFeatures(t,a){var h,p,o,c,y,d;const{layer:s}=this;if(!t)throw new _("mapimagelayer:fetchPopupFeatures","Nothing to fetch without area",{layer:s});const n=(o=(p=(h=this.layer.capabilities)==null?void 0:h.operations)==null?void 0:p.supportsQuery)!=null?o:!0;if(!(((d=(y=(c=this.layer.capabilities)==null?void 0:c.operations)==null?void 0:y.supportsIdentify)!=null?d:!0)&&this.layer.version>=10.5)&&!n)throw new _("mapimagelayer:fetchPopupFeatures-not-supported","query operation is disabled for this service",{layer:s});return n?this._fetchPopupFeaturesUsingQueries(t,a):this._fetchPopupFeaturesUsingIdentify(t,a)}canResume(){var t;return!!super.canResume()&&!((t=this.timeExtent)==null?void 0:t.isEmpty)}async _fetchPopupFeaturesUsingIdentify(t,a){const s=await this._createIdentifyParameters(t,a);if(we(s))return[];const{results:n}=await Re(this.layer.parsedUrl,s);return n.map(h=>h.feature)}async _createIdentifyParameters(t,a){var E,u;const{floors:s,spatialReference:n,scale:h}=this.view,p=j(a)?a.event:null,o=await this._collectPopupProviders(this.layer.sublayers,h,a);if(!o.length)return null;await Promise.all(o.map(({sublayer:v})=>v.load().catch(()=>{})));const c=Math.min(be("mapimagelayer-popup-identify-max-tolerance"),this.layer.allSublayers.reduce((v,w)=>w.renderer?G({renderer:w.renderer,event:p}):v,2)),y=this.createFetchPopupFeaturesQueryGeometry(t,c),d=xe(h,n),g=Math.round(y.width/d),N=new L({xmin:y.center.x-d*g,ymin:y.center.y-d*g,xmax:y.center.x+d*g,ymax:y.center.y+d*g,spatialReference:y.spatialReference}),P=((u=(E=this.layer.capabilities)==null?void 0:E.operations)==null?void 0:u.supportsQuery)===!1||await new Promise(v=>{let w=!1;Promise.all(o.map(async({popupTemplate:f})=>{if(f){const b=await this._loadArcadeModules(f);if(w)return;(b==null?void 0:b.arcadeUtils.hasGeometryOperations(f))&&(w=!0,v(!0))}})).finally(()=>v(!1))});return new k({floors:s,gdbVersion:this.layer.gdbVersion,geometry:t,height:g,layerOption:"popup",mapExtent:N,maxAllowableOffset:P?0:d,returnGeometry:!0,spatialReference:n,sublayers:this.layer.sublayers,timeExtent:this.timeExtent,tolerance:c,width:g})}async _fetchPopupFeaturesUsingQueries(t,a){const s=await this._collectPopupProviders(this.layer.sublayers,this.view.scale,a),n=j(a)?a.event:null,h=s.map(async({sublayer:p,popupTemplate:o})=>{var N,P;await p.load().catch(()=>{});const c=p.createQuery(),y=G({renderer:p.renderer,event:n}),d=this.createFetchPopupFeaturesQueryGeometry(t,y);if(c.geometry=d,c.outFields=await Ne(p,o),"floors"in this.view){const E=(P=(N=this.view)==null?void 0:N.floors)==null?void 0:P.clone(),u=A(E,p);j(u)&&(c.where=c.where?`(${c.where}) AND (${u})`:u)}const g=await this._loadArcadeModules(o);return g&&g.arcadeUtils.hasGeometryOperations(o)||(c.maxAllowableOffset=d.width/y),(await p.queryFeatures(c)).features});return(await ve(h)).reduce((p,o)=>o.value?[...p,...o.value]:p,[]).filter(p=>p!=null)}async _collectPopupProviders(t,a,s){const n=[],h=async o=>{const c=o.minScale===0||a<=o.minScale,y=o.maxScale===0||a>=o.maxScale;if(o.visible&&c&&y){if(o.sublayers)o.sublayers.forEach(h);else if(o.popupEnabled){const d=$e(o,R(O({},s),{defaultPopupTemplateEnabled:!1}));j(d)&&n.unshift({sublayer:o,popupTemplate:d})}}},p=t.toArray().reverse().map(h);return await Promise.all(p),n}_loadArcadeModules(t){var a;if(((a=t.expressionInfos)==null?void 0:a.length)||Array.isArray(t.content)&&t.content.some(s=>s.type==="expression"))return Pe()}};return i([l()],e.prototype,"exportImageParameters",void 0),i([l({readOnly:!0})],e.prototype,"exportImageVersion",null),i([l()],e.prototype,"layer",void 0),i([l()],e.prototype,"suspended",void 0),i([l(fe)],e.prototype,"timeExtent",void 0),e=i([S("esri.views.layers.MapImageLayerView")],e),e};let J=class extends Me(Ee){constructor(){super(...arguments),this.type="map-image-3d"}initialize(){this.updatingHandles.add(()=>this.exportImageVersion,()=>this.updatingHandles.addPromise(this.refreshDebounced()))}createFetchPopupFeaturesQueryGeometry(r,e){return Ie(r,e,this.view)}getFetchOptions(){return{timeExtent:this.timeExtent}}};J=i([S("esri.views.3d.layers.MapImageLayerView3D")],J);const ze=J;export{ze as default};
