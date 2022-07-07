var T=Object.defineProperty,b=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var f=(e,r,t)=>r in e?T(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,n=(e,r)=>{for(var t in r||(r={}))O.call(r,t)&&f(e,t,r[t]);if(v)for(var t of v(r))R.call(r,t)&&f(e,t,r[t]);return e},h=(e,r)=>b(e,w(r));import{rh as W,ri as j,mS as U,mT as $,mR as P,mU as C,c6 as L,rj as A,rl as D,rH as I,J,r as m,mW as k,bP as g,bS as M,bC as y,mX as N,aJ as u,pS as B,gX as G,sJ as q,e_ as E,i as a,j as o,dp as V,fy as X,jA as x,mZ as H,n as K}from"./vendor.5530b0a9.js";import{s as z}from"./ArcGISCachedService.938b7880.js";import{E as F,y as Q,X as Z}from"./SublayersOwner.af183a0a.js";import"./TilemapCache.cf2646b7.js";const _=["Canvas/World_Dark_Gray_Base","Canvas/World_Dark_Gray_Reference","Canvas/World_Light_Gray_Base","Canvas/World_Light_Gray_Reference","Elevation/World_Hillshade","Elevation/World_Hillshade_Dark","Ocean/World_Ocean_Base","Ocean/World_Ocean_Reference","Ocean_Basemap","Reference/World_Boundaries_and_Places","Reference/World_Boundaries_and_Places_Alternate","Reference/World_Transportation","World_Imagery","World_Street_Map","World_Topo_Map"];let s=class extends W(F(j(U($(z(Q(P(C(L(A(D(I(J))))))))))))){constructor(...e){super(...e),this.listMode="show",this.isReference=null,this.operationalLayerType="ArcGISTiledMapServiceLayer",this.resampling=!0,this.sourceJSON=null,this.spatialReference=null,this.path=null,this.sublayers=null,this.type="tile",this.url=null}normalizeCtorArgs(e,r){return typeof e=="string"?n({url:e},r):e}load(e){const r=m(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(k).then(()=>this._fetchService(r))),Promise.resolve(this)}get attributionDataUrl(){var r;const e=(r=this.parsedUrl)==null?void 0:r.path.toLowerCase();return e&&this._getDefaultAttribution(this._getMapName(e))}readSpatialReference(e,r){return(e=e||r.tileInfo&&r.tileInfo.spatialReference)&&g.fromJSON(e)}writeSublayers(e,r,t,i){if(!this.loaded||!e)return;const c=e.slice().reverse().flatten(({sublayers:p})=>p&&p.toArray().reverse()).toArray(),l=[],d=n({writeSublayerStructure:!1},i);c.forEach(p=>{const S=p.write({},d);l.push(S)}),l.some(p=>Object.keys(p).length>1)&&(r.layers=l)}get tileServers(){return this._getDefaultTileServers(this.parsedUrl.path)}castTileServers(e){return Array.isArray(e)?e.map(r=>M(r).path):null}fetchTile(e,r,t,i={}){const{signal:c}=i,l=this.getTileUrl(e,r,t),d={responseType:"image",signal:c,query:n({},this.refreshParameters)};return y(l,d).then(p=>p.data)}getTileUrl(e,r,t){const i=!this.tilemapCache&&this.supportsBlankTile,c=N(h(n(h(n({},this.parsedUrl.query),{blankTile:!i&&null}),this.customParameters),{token:this.apiKey})),l=this.tileServers;return`${l&&l.length?l[r%l.length]:this.parsedUrl.path}/tile/${e}/${r}/${t}${c?"?"+c:""}`}_fetchService(e){return new Promise((r,t)=>{if(this.sourceJSON){if(this.sourceJSON.bandCount!=null&&this.sourceJSON.pixelSizeX!=null)throw new u("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");return void r({data:this.sourceJSON})}if(!this.parsedUrl)throw new u("tile-layer:undefined-url","layer's url is not defined");const i=B(this.parsedUrl.path);if(m(i)&&i.serverType==="ImageServer")throw new u("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");y(this.parsedUrl.path,{query:h(n(n({f:"json"},this.parsedUrl.query),this.customParameters),{token:this.apiKey}),responseType:"json",signal:e}).then(r,t)}).then(r=>{if(r.ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=r.data,this.read(r.data,{origin:"service",url:this.parsedUrl}),this.version===10.1&&!G(this.url))return this._fetchServerVersion(this.url,e).then(t=>{this.read({currentVersion:t})}).catch(()=>{})})}_fetchServerVersion(e,r){if(!q(e))return Promise.reject();const t=e.replace(/(.*\/rest)\/.*/i,"$1")+"/info";return y(t,{query:h(n({f:"json"},this.customParameters),{token:this.apiKey}),responseType:"json",signal:r}).then(i=>{if(i.data&&i.data.currentVersion)return i.data.currentVersion;throw new u("tile-layer:version-not-available")})}_getMapName(e){const r=e.match(/^(?:https?:)?\/\/(server\.arcgisonline\.com|services\.arcgisonline\.com|ibasemaps-api\.arcgis\.com)\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i);return r&&r[2]}_getDefaultAttribution(e){if(!e)return;let r;e=e.toLowerCase();for(let t=0,i=_.length;t<i;t++)if(r=_[t],r.toLowerCase().includes(e))return E("//static.arcgis.com/attribution/"+r)}_getDefaultTileServers(e){const r=e.search(/^(?:https?:)?\/\/server\.arcgisonline\.com/i)!==-1,t=e.search(/^(?:https?:)?\/\/services\.arcgisonline\.com/i)!==-1;return r||t?[e,e.replace(r?/server\.arcgisonline/i:/services\.arcgisonline/i,r?"services.arcgisonline":"server.arcgisonline")]:[]}get hasOverriddenFetchTile(){return!this.fetchTile.__isDefault__}};a([o({readOnly:!0})],s.prototype,"attributionDataUrl",null),a([o({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),a([o({json:{read:!0,write:!0}})],s.prototype,"blendMode",void 0),a([o({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),a([o({readOnly:!0,type:["ArcGISTiledMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),a([o({type:Boolean})],s.prototype,"resampling",void 0),a([o()],s.prototype,"sourceJSON",void 0),a([o({type:g})],s.prototype,"spatialReference",void 0),a([V("spatialReference",["spatialReference","tileInfo"])],s.prototype,"readSpatialReference",null),a([o({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],s.prototype,"path",void 0),a([o({readOnly:!0})],s.prototype,"sublayers",void 0),a([X("sublayers",{layers:{type:[Z]}})],s.prototype,"writeSublayers",null),a([o({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),a([o()],s.prototype,"tileServers",null),a([x("tileServers")],s.prototype,"castTileServers",null),a([o({readOnly:!0,json:{read:!1}})],s.prototype,"type",void 0),a([o(H)],s.prototype,"url",void 0),s=a([K("esri.layers.TileLayer")],s),s.prototype.fetchTile.__isDefault__=!0;const ae=s;export{ae as default};
