import{ag as m,aJ as p,be as u,N as c,fS as _,t as y}from"./vendor.5530b0a9.js";import{v as f,n as w}from"./QueryEngine.fc6a3d15.js";import{d as I}from"./QueryEngineResult.5f116c82.js";import{u as b}from"./Pipeline.67fab59a.js";import"./QueryEngineCapabilities.c2e9875c.js";import"./WhereClause.3fd56000.js";import"./utils.d90b3912.js";import"./ClassBreaksDefinition.acc91e1f.js";import"./json.d1a0fa35.js";import"./createConnection.a027c49b.js";import"./quickselect.03306040.js";import"./centroid.894e6a56.js";import"./ogcFeatureUtils.8aa97e49.js";import"./geojson.db90832e.js";import"./clientSideDefaults.515b00fc.js";import"./enums.ba1e21c6.js";import"./Utils.bd4fe04d.js";import"./number.08b65821.js";const d=m.getLogger("esri.views.2d.layers.features.support.whereUtils"),g={getAttribute:(r,e)=>r.field(e)};async function T(r,e){const t=await import("./WhereClause.3fd56000.js");try{const i=t.WhereClause.create(r,e);if(!i.isStandardized){const s=new p("mapview - bad input","Unable to apply filter's definition expression, as expression is not standardized.",i);d.error(s)}return s=>{const h=s.readArcadeFeature();return i.testFeature(h,g)}}catch{return d.warn("mapview-bad-where-clause","Encountered an error when evaluating where clause",r),s=>!0}}const v=m.getLogger("esri.views.2d.layers.features.controllers.FeatureFilter"),a=1,x=2;class M{constructor(e){this._geometryBounds=u(),this._idToVisibility=new Map,this._serviceInfo=e}get hash(){return this._hash}check(e){return this._applyFilter(e)}clear(){const e=this._resetAllHiddenIds();return this.update(),{show:e,hide:[]}}invalidate(){this._idToVisibility.forEach((e,t)=>{this._idToVisibility.set(t,0)})}setKnownIds(e){for(const t of e)this._idToVisibility.set(t,a)}setTrue(e){const t=[],i=[],s=new Set(e);return this._idToVisibility.forEach((h,o)=>{const l=!!(this._idToVisibility.get(o)&a),n=s.has(o);!l&&n?t.push(o):l&&!n&&i.push(o),this._idToVisibility.set(o,n?a|x:0)}),{show:t,hide:i}}createQuery(){const{geometry:e,spatialRel:t,where:i,timeExtent:s,objectIds:h}=this;return c.fromJSON({geometry:e,spatialRel:t,where:i,timeExtent:s,objectIds:h})}async update(e,t){this._hash=JSON.stringify(e);const i=await I(e,null,t);await Promise.all([this._setGeometryFilter(i),this._setIdFilter(i),this._setAttributeFilter(i),this._setTimeFilter(i)])}async _setAttributeFilter(e){if(!e||!e.where)return this._clause=null,void(this.where=null);this._clause=await T(e.where,this._serviceInfo.fieldsIndex),this.where=e.where}_setIdFilter(e){this._idsToShow=e&&e.objectIds&&new Set(e.objectIds),this._idsToHide=e&&e.hiddenIds&&new Set(e.hiddenIds),this.objectIds=e&&e.objectIds}async _setGeometryFilter(e){if(!e||!e.geometry)return this._spatialQueryOperator=null,this.geometry=null,void(this.spatialRel=null);const t=e.geometry,i=e.spatialRel||"esriSpatialRelIntersects",s=await f(i,t,this._serviceInfo.geometryType,this._serviceInfo.hasZ,this._serviceInfo.hasM);_(this._geometryBounds,t),this._spatialQueryOperator=s,this.geometry=t,this.spatialRel=i}_setTimeFilter(e){if(this.timeExtent=this._timeOperator=null,e&&e.timeExtent)if(this._serviceInfo.timeInfo)this.timeExtent=e.timeExtent,this._timeOperator=w(this._serviceInfo.timeInfo,e.timeExtent,b);else{const t=new p("feature-layer-view:time-filter-not-available","Unable to apply time filter, as layer doesn't have time metadata.",e.timeExtent);v.error(t)}}_applyFilter(e){return this._filterByGeometry(e)&&this._filterById(e)&&this._filterByTime(e)&&this._filterByExpression(e)}_filterByExpression(e){return!this.where||this._clause(e)}_filterById(e){return(!this._idsToHide||!this._idsToHide.size||!this._idsToHide.has(e.getObjectId()))&&(!this._idsToShow||!this._idsToShow.size||this._idsToShow.has(e.getObjectId()))}_filterByGeometry(e){if(!this.geometry)return!0;const t=e.readHydratedGeometry();return!!t&&this._spatialQueryOperator(t)}_filterByTime(e){return!!y(this._timeOperator)||this._timeOperator(e)}_resetAllHiddenIds(){const e=[];return this._idToVisibility.forEach((t,i)=>{t&a||(this._idToVisibility.set(i,a),e.push(i))}),e}}export{M as default};
