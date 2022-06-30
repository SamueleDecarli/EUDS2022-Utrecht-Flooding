import{od as b,l1 as L,ar as u,ac as S,t as E,al as V,oe as v,lg as C,aT as g,fa as l,dL as _,l4 as $,of as P,og as y,kW as h,g as T,n as j,lV as I}from"./vendor.e1f4f720.js";import{E as w}from"./QueryEngineResult.e001e53c.js";import"./WhereClause.de5a3790.js";import"./utils.b67e6d51.js";import"./ClassBreaksDefinition.ee27788f.js";import"./json.d1a0fa35.js";let f=class{constructor(){this._idToComponent=new Map,this._components=new b(t=>t.bounds),this._edges=new b(t=>t.bounds),this._tmpLineSegment=L(),this._tmpP1=u(),this._tmpP2=u(),this._tmpP3=u(),this.remoteClient=null}async fetchCandidates(t,e){await Promise.resolve(),S(e),await this._ensureEdgeLocations(t,e);const n=[];return this._edges.forEachNeighbor(s=>this._addCandidates(t,s,n),t.bounds),{result:{candidates:n}}}async _ensureEdgeLocations(t,e){const n=[];if(this._components.forEachNeighbor(i=>{if(E(i.info)){const{id:a,uid:d}=i;n.push({id:a,uid:d})}},t.bounds),!n.length)return;const s={components:n},o=await this.remoteClient.invoke("fetchAllEdgeLocations",s,V(e,{}));for(const i of o.components)this._setFetchEdgeLocations(i)}async add(t){const e=new p(t.id,t.bounds);return this._idToComponent.set(e.id,e),this._components.add([e]),{result:{}}}async remove(t){const e=this._idToComponent.get(t.id);if(e){const n=[];this._edges.forEachNeighbor(s=>{s.component===e&&n.push(s)},e.bounds),this._edges.remove(n),this._components.remove([e]),this._idToComponent.delete(e.id)}return{result:{}}}_setFetchEdgeLocations(t){const e=this._idToComponent.get(t.id);if(E(e)||t.uid!==e.uid)return;const n=v.createView(t.locations),s=new Array(n.count),o=u(),i=u();for(let r=0;r<n.count;r++){const m=I(),c=_(m);n.position0.getVec(r,o),n.position1.getVec(r,i),C(c,c,o,.5),C(c,c,i,.5),g(c,c,t.origin),m[3]=l(c,o);const x=new k(e,r,m);s[r]=x}this._edges.add(s);const{objectIds:a,origin:d}=t;e.info={locations:n,objectIds:a,origin:d}}_addCandidates(t,e,n){const{locations:s,origin:o,objectIds:i}=e.component.info,a=s.position0.getVec(e.index,this._tmpP1),d=s.position1.getVec(e.index,this._tmpP2);g(a,a,o),g(d,d,o);const r=i[s.componentIndex.get(e.index)];this._addEdgeCandidate(t,r,a,d,n),this._addVertexCandidate(t,r,a,n),this._addVertexCandidate(t,r,d,n)}_addEdgeCandidate(t,e,n,s,o){if(!(t.types&w.EDGE))return;const i=_(t.bounds),a=$(n,s,this._tmpLineSegment),d=P(a,i,this._tmpP3);if(!y(t.bounds,d))return null;o.push({type:"edge",objectId:e,target:h(d),distance:l(i,d),start:h(n),end:h(s)})}_addVertexCandidate(t,e,n,s){if(!(t.types&w.VERTEX))return;const o=_(t.bounds);if(!y(t.bounds,n))return null;s.push({type:"vertex",objectId:e,target:h(n),distance:l(o,n)})}};function M(){return new f}f=T([j("esri.views.interactive.snapping.featureSources.sceneLayerSource.SceneLayerSnappingSourceWorker")],f);class p{constructor(e,n){this.id=e,this.bounds=n,this.info=null,this.uid=++p.uid}}p.uid=0;class k{constructor(e,n,s){this.component=e,this.index=n,this.bounds=s}}export{f as SceneLayerSnappingSourceWorker,M as default};