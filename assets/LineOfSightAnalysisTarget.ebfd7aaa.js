import{t as d,mt as f,iT as j,y as v,mf as s,i as t,j as o,aY as p,dw as y,n as c,l7 as h}from"./vendor.5530b0a9.js";import{w as a}from"./persistable.b7d0ec1c.js";function I(e,r){return u(e)===u(r)}function u(e){if(d(e))return null;const r=e.layer!=null?e.layer.id:"";let i=null;return i=e.objectId!=null?e.objectId:e.layer!=null&&"objectIdField"in e.layer&&e.layer.objectIdField!=null&&e.attributes!=null?e.attributes[e.layer.objectIdField]:e.uid,i==null?null:`o-${r}-${i}`}const b={json:{write:{writer:$,target:{"feature.layerId":{type:[Number,String]},"feature.objectId":{type:[Number,String]}}},origins:{"web-scene":{read:m}}}};function $(e,r){var i;d(e)||((i=e.layer)==null?void 0:i.objectIdField)==null||e.attributes==null||(r.feature={layerId:e.layer.id,objectId:e.attributes[e.layer.objectIdField]})}function m(e){if(e.layerId!=null&&e.objectId!=null)return{uid:null,layer:{id:e.layerId,objectIdField:"ObjectId"},attributes:{ObjectId:e.objectId}}}let l=class extends f(j(v)){constructor(e){super(e),this.position=null,this.elevationInfo=null,this.feature=null}equals(e){return s(this.position,e.position)&&s(this.elevationInfo,e.elevationInfo)&&I(this.feature,e.feature)}};t([o({type:p}),a()],l.prototype,"position",void 0),t([o({type:y}),a()],l.prototype,"elevationInfo",void 0),t([o(b)],l.prototype,"feature",void 0),l=t([c("esri.analysis.LineOfSightAnalysisObserver")],l);const F=l;let n=class extends f(h){constructor(e){super(e),this.position=null,this.elevationInfo=null,this.feature=null}equals(e){return s(this.position,e.position)&&s(this.elevationInfo,e.elevationInfo)&&I(this.feature,e.feature)}};t([o({type:p}),a()],n.prototype,"position",void 0),t([o({type:y}),a()],n.prototype,"elevationInfo",void 0),t([o(b)],n.prototype,"feature",void 0),n=t([c("esri.analysis.LineOfSightAnalysisTarget")],n);const O=n;export{O as f,u as l,F as u};