import{hJ as a,h as o,k as s,t as n,i as e,j as r,c3 as d,n as p}from"./vendor.5530b0a9.js";import{p as l}from"./I3SMeshView3D.08b6e5b9.js";import{n as h}from"./LayerView3D.b66f774a.js";import{u as m}from"./LayerView.f88dad35.js";import"./I3SAttributeOverrides.95f2217f.js";import"./I3SNode.16f36fc0.js";import"./SceneModification.486a7112.js";import"./persistable.b7d0ec1c.js";import"./Graphics3DScaleVisibility.0d8a12bf.js";import"./optimizedFeatureQueryEngineAdapter.0646efa0.js";import"./centroid.894e6a56.js";import"./PooledRBush.bf2ef677.js";import"./quickselect.03306040.js";import"./SceneLayerWorker.5db7e65a.js";import"./attributeUtils.99d8ee08.js";const c=.2;let t=class extends l(h(m)){constructor(){super(...arguments),this.type="integrated-mesh-3d",this.lodFactor=1,this._elevationContext="im",this._isIntegratedMesh=!0,this._supportsLabeling=!1,this.drapeTargetType=a.WithoutRasterImage}get progressiveLoadFactor(){return this.lodFactor>=1?c:1}initialize(){this.updatingHandles.add(()=>this.layer.modifications,()=>this._loadModifications(),o),this.view.basemapTerrain.overlayManager.registerDrapeTarget(this)}destroy(){this.view.basemapTerrain.overlayManager.unregisterDrapeTarget(this)}_createLayerGraphic(){const i=new s;return i.layer=this.layer,i.sourceLayer=this.layer,i}canResume(){return super.canResume()&&(!this._controller||this._controller.rootNodeVisible)}_loadModifications(){if(this.handles.remove("modifications"),n(this.layer.modifications))return void(this._modifications=[]);const i=this.layer.modifications;this.handles.add(this.updatingHandles.addOnCollectionChange(()=>i,()=>this._modifications=i.toArray(),o),"modifications")}};e([r()],t.prototype,"layer",void 0),e([r({aliasOf:"layer"})],t.prototype,"i3slayer",void 0),e([r(d)],t.prototype,"updatingProgress",void 0),e([r({readOnly:!0,aliasOf:"_controller.updatingProgress"})],t.prototype,"updatingProgressValue",void 0),e([r({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.integratedMesh.lodFactor"})],t.prototype,"lodFactor",void 0),e([r({readOnly:!0})],t.prototype,"progressiveLoadFactor",null),t=e([p("esri.views.3d.layers.SceneLayerView3D")],t);const C=t;export{C as default};