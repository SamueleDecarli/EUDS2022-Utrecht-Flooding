import{ag as p,g as o,i as t,n as d,d8 as l}from"./vendor.e1f4f720.js";import{WhereClause as f}from"./WhereClause.de5a3790.js";const n=p.getLogger("esri.views.3d.layers.support.DefinitionExpressionSceneLayerView"),x=a=>{let s=class extends a{constructor(){super(...arguments),this._definitionExpressionErrors=0,this._maxDefinitionExpressionErrors=20,this.logError=i=>{this._definitionExpressionErrors<this._maxDefinitionExpressionErrors&&n.error("Error while evaluating definitionExpression: "+i),this._definitionExpressionErrors++,this._definitionExpressionErrors===this._maxDefinitionExpressionErrors&&n.error("Further errors are ignored")}}get parsedDefinitionExpression(){if(!this.i3slayer||!this.i3slayer.definitionExpression)return null;try{const i=f.create(this.i3slayer.definitionExpression,this.i3slayer.fieldsIndex);if(!i.isStandardized)return n.error("definitionExpression is using non standard function"),null;const r=[],e=i.fieldNames;return l(e,this.i3slayer.fields,{missingFields:r}),r.length>0?(n.error(`definitionExpression references unknown fields: ${r.join(", ")}`),null):(this._definitionExpressionErrors=0,i)}catch(i){return n.error("Failed to parse definitionExpression: "+i),null}}get definitionExpressionFields(){return this.parsedDefinitionExpression?this.parsedDefinitionExpression.fieldNames:null}_evaluateClause(i,r){try{return i.testFeature(r)}catch(e){return this.logError(e),!1}}_addDefinitionExpressionToQuery(i){if(!this.parsedDefinitionExpression)return i;const r=this.i3slayer.definitionExpression,e=i.clone();return e.where?e.where=`(${r}) AND (${e.where})`:e.where=r,e}};return o([t()],s.prototype,"i3slayer",void 0),o([t({readOnly:!0})],s.prototype,"parsedDefinitionExpression",null),o([t({readOnly:!0})],s.prototype,"definitionExpressionFields",null),s=o([d("esri.views.3d.layers.support.DefinitionExpressionSceneLayerView")],s),s};export{x as p};