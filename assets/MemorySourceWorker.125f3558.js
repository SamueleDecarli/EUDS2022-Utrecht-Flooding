var $=Object.defineProperty,A=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var q=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var w=(f,e,t)=>e in f?$(f,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[e]=t,D=(f,e)=>{for(var t in e||(e={}))k.call(e,t)&&w(f,t,e[t]);if(q)for(var t of q(e))C.call(e,t)&&w(f,t,e[t]);return f},O=(f,e)=>A(f,P(e));import{aJ as I,nG as G,n7 as W,dt as z,t as L,fK as b,i1 as Q,r as _,nI as S,nJ as B,nK as J,gg as M}from"./vendor.5530b0a9.js";import{t as K,n as U}from"./objectIdUtils.773397d7.js";import{u as H}from"./FeatureStore.4a75b08f.js";import{f as E,g as j}from"./QueryEngineResult.5f116c82.js";import{Y as V}from"./QueryEngine.fc6a3d15.js";import{a as Y,u as N,l as X}from"./clientSideDefaults.515b00fc.js";import{w as ee,a as g,m as T,f as x,g as v}from"./sourceUtils.60f6c0cc.js";import"./PooledRBush.bf2ef677.js";import"./quickselect.03306040.js";import"./optimizedFeatureQueryEngineAdapter.0646efa0.js";import"./centroid.894e6a56.js";import"./WhereClause.3fd56000.js";import"./utils.d90b3912.js";import"./ClassBreaksDefinition.acc91e1f.js";import"./json.d1a0fa35.js";import"./QueryEngineCapabilities.c2e9875c.js";const te=M,ie={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:M},se={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function ne(f){return Q(f)?f.z!=null:!!f.hasZ}function re(f){return Q(f)?f.m!=null:!!f.hasM}class je{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=this._fieldsIndex=this._createDefaultAttributes=null}async load(e){const t=[],{features:r}=e,i=this._inferLayerProperties(r,e.fields),o=e.fields||[],p=e.hasM!=null?e.hasM:i.hasM,c=e.hasZ!=null?e.hasZ:i.hasZ,y=!e.spatialReference&&!i.spatialReference,u=y?te:e.spatialReference||i.spatialReference,a=y?ie:null,s=e.geometryType||i.geometryType,m=!s;let d=e.objectIdField||i.objectIdField,l=e.timeInfo;if(!m&&(y&&t.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!s))throw new I("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!d)throw new I("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(i.objectIdField&&d!==i.objectIdField&&(t.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${d}" doesn't match the field name "${i.objectIdField}", found in the provided fields`}),d=i.objectIdField),d&&!i.objectIdField){let n=null;o.some(h=>h.name===d&&(n=h,!0))?(n.type="esriFieldTypeOID",n.editable=!1,n.nullable=!1):o.unshift({alias:d,name:d,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const n of o){if(n.name==null&&(n.name=n.alias),n.alias==null&&(n.alias=n.name),!n.name)throw new I("feature-layer:invalid-field-name","field name is missing",{field:n});if(n.name===d&&(n.type="esriFieldTypeOID"),!G.jsonValues.includes(n.type))throw new I("feature-layer:invalid-field-type",`invalid type for field "${n.name}"`,{field:n})}const F={};for(const n of o)if(n.type!=="esriFieldTypeOID"&&n.type!=="esriFieldTypeGlobalID"){const h=W(n);h!==void 0&&(F[n.name]=h)}if(this._fieldsIndex=new z(o),this._createDefaultAttributes=Y(F,d),l){if(l.startTimeField){const n=this._fieldsIndex.get(l.startTimeField);n?(l.startTimeField=n.name,n.type="esriFieldTypeDate"):l.startTimeField=null}if(l.endTimeField){const n=this._fieldsIndex.get(l.endTimeField);n?(l.endTimeField=n.name,n.type="esriFieldTypeDate"):l.endTimeField=null}if(l.trackIdField){const n=this._fieldsIndex.get(l.trackIdField);n?l.trackIdField=n.name:(l.trackIdField=null,t.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:l}}))}l.startTimeField||l.endTimeField||(t.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:l}}),l=null)}const R={warnings:t,featureErrors:[],layerDefinition:O(D({},se),{drawingInfo:N(s),templates:X(F),extent:a,geometryType:s,objectIdField:d,fields:o,hasZ:!!c,hasM:!!p,timeInfo:l}),assignedObjectIds:{}};if(this._queryEngine=new V({fields:o,geometryType:s,hasM:p,hasZ:c,objectIdField:d,spatialReference:u,featureStore:new H({geometryType:s,hasM:p,hasZ:c}),timeInfo:l,cacheSpatialQueries:!0}),!r||!r.length)return this._nextObjectId=K,R;const Z=U(d,r);return this._nextObjectId=Z+1,await E(r,u),this._loadInitialFeatures(R,r)}async applyEdits(e){const{spatialReference:t,geometryType:r}=this._queryEngine;return await Promise.all([ee(t,r),E(e.adds,t),E(e.updates,t)]),this._applyEdits(e)}queryFeatures(e,t={}){return this._queryEngine.executeQuery(e,t.signal)}queryFeatureCount(e,t={}){return this._queryEngine.executeQueryForCount(e,t.signal)}queryObjectIds(e,t={}){return this._queryEngine.executeQueryForIds(e,t.signal)}queryExtent(e,t={}){return this._queryEngine.executeQueryForExtent(e,t.signal)}querySnapping(e,t={}){return this._queryEngine.executeQueryForSnapping(e,t.signal)}_inferLayerProperties(e,t){let r,i,o=null,p=null,c=null;for(const y of e){const u=y.geometry;if(!L(u)&&(o||(o=b(u)),p||(p=u.spatialReference),r==null&&(r=ne(u)),i==null&&(i=re(u)),o&&p&&r!=null&&i!=null))break}if(t&&t.length){let y=null;t.some(u=>{const a=u.type==="esriFieldTypeOID",s=!u.type&&u.name&&u.name.toLowerCase()==="objectid";return y=u,a||s})&&(c=y.name)}return{geometryType:o,spatialReference:p,objectIdField:c,hasM:i,hasZ:r}}_loadInitialFeatures(e,t){const{geometryType:r,hasM:i,hasZ:o,objectIdField:p,spatialReference:c,featureStore:y}=this._queryEngine,u=[];for(const a of t){if(a.uid!=null&&(e.assignedObjectIds[a.uid]=-1),a.geometry&&r!==b(a.geometry)){e.featureErrors.push(g("Incorrect geometry type."));continue}const s=this._createDefaultAttributes(),m=T(this._fieldsIndex,s,a.attributes,!0,e.warnings);m?e.featureErrors.push(m):(this._assignObjectId(s,a.attributes,!0),a.attributes=s,a.uid!=null&&(e.assignedObjectIds[a.uid]=a.attributes[p]),_(a.geometry)&&(a.geometry=j(a.geometry,a.geometry.spatialReference,c)),u.push(a))}if(y.addMany(S([],u,r,o,i,p)),e.layerDefinition.extent=this._queryEngine.fullExtent,e.layerDefinition.timeInfo){const{start:a,end:s}=this._queryEngine.timeExtent;e.layerDefinition.timeInfo.timeExtent=[a,s]}return e}_applyEdits(e){const{adds:t,updates:r,deletes:i}=e,o={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(t&&t.length&&this._applyAddEdits(o,t),r&&r.length&&this._applyUpdateEdits(o,r),i&&i.length){for(const p of i)o.deleteResults.push(x(p));this._queryEngine.featureStore.removeManyById(i)}return{fullExtent:this._queryEngine.fullExtent,featureEditResults:o}}_applyAddEdits(e,t){const{addResults:r}=e,{geometryType:i,hasM:o,hasZ:p,objectIdField:c,spatialReference:y,featureStore:u}=this._queryEngine,a=[];for(const s of t){if(s.geometry&&i!==b(s.geometry)){r.push(g("Incorrect geometry type."));continue}const m=this._createDefaultAttributes(),d=T(this._fieldsIndex,m,s.attributes);if(d)r.push(d);else{if(this._assignObjectId(m,s.attributes),s.attributes=m,s.uid!=null){const l=s.attributes[c];e.uidToObjectId[s.uid]=l}_(s.geometry)&&(s.geometry=j(v(s.geometry,y),s.geometry.spatialReference,y)),a.push(s),r.push(x(s.attributes[c]))}}u.addMany(S([],a,i,p,o,c))}_applyUpdateEdits({updateResults:e},t){const{geometryType:r,hasM:i,hasZ:o,objectIdField:p,spatialReference:c,featureStore:y}=this._queryEngine;for(const u of t){const{attributes:a,geometry:s}=u,m=a&&a[p];if(m==null){e.push(g(`Identifier field ${p} missing`));continue}if(!y.has(m)){e.push(g(`Feature with object id ${m} missing`));continue}const d=B(y.getFeature(m),r,o,i);if(_(s)){if(r!==b(s)){e.push(g("Incorrect geometry type."));continue}d.geometry=j(v(s,c),s.spatialReference,c)}if(a){const l=T(this._fieldsIndex,d.attributes,a);if(l){e.push(l);continue}}y.add(J(d,r,o,i,p)),e.push(x(m))}}_assignObjectId(e,t,r=!1){const i=this._queryEngine.objectIdField;r&&t&&isFinite(t[i])?e[i]=t[i]:e[i]=this._nextObjectId++}}export{je as default};
