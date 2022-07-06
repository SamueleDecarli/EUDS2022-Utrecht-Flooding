var O=Object.defineProperty;var T=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var f=(a,e,t)=>e in a?O(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,g=(a,e)=>{for(var t in e||(e={}))S.call(e,t)&&f(a,t,e[t]);if(T)for(var t of T(e))x.call(e,t)&&f(a,t,e[t]);return a};import{cs as A,ct as w,cu as E,cb as _,cv as F,r as C,cw as b,cx as l,cy as N,cz as D,cA as M,cB as q,cC as o,cD as m,cE as R,cF as p,cG as I,cH as y,i as n,cI as c,cJ as v,cK as L,cL as U,cM as W,cN as B,cO as G,cP as z,cQ as H,cR as j,cS as Q,cT as V,cU as J,cV as K,cW as X,cX as Y,cY as Z,cZ as k,c_ as ee,c$ as te,d0 as ae,bu as u,d1 as se,d2 as re,d3 as ie,d4 as oe,d5 as ne}from"./vendor.e52053a0.js";function ce(a){const e=new A;w(e,a),e.include(E),e.attributes.add(_.POSITION,"vec3"),e.attributes.add(_.UV0,"vec2"),e.varyings.add("vpos","vec3"),a.hasMultipassTerrain&&e.varyings.add("depth","float");const{vertex:t,fragment:s}=e;return t.uniforms.add(new F("textureCoordinateScaleFactor",r=>C(r.texture)&&C(r.texture.descriptor.textureCoordinateScaleFactor)?r.texture.descriptor.textureCoordinateScaleFactor:b)),t.code.add(l`
    void main(void) {
      vpos = position;
      ${a.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(N,a),e.include(D,a),s.uniforms.add([new M("tex",r=>r.texture),new q("opacity",r=>r.opacity)]),e.varyings.add("vTexCoord","vec2"),a.output===o.Alpha?s.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${l.float(m)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(s.include(R),s.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
      gl_FragColor = texture2D(tex, vTexCoord) * opacity;

      if (gl_FragColor.a < ${l.float(m)}) {
        discard;
      }

      gl_FragColor = highlightSlice(gl_FragColor, vpos);
      ${a.transparencyPassType===p.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    }
    `)),e}const le=Object.freeze(Object.defineProperty({__proto__:null,build:ce},Symbol.toStringTag,{value:"Module"}));class h extends W{initializeProgram(e){const t=h.shader.get().build(this.configuration);return new B(e.rctx,t,G)}_setPipelineState(e,t){const s=this.configuration,r=e===p.NONE,d=e===p.FrontFace;return z({blending:s.output!==o.Color&&s.output!==o.Alpha||!s.transparent?null:r?ue:H(e),culling:j(s.cullFace),depthTest:{func:Q(e)},depthWrite:r?s.writeDepth&&V:J(e),colorWrite:K,stencilWrite:s.hasOccludees?X:null,stencilTest:s.hasOccludees?t?Y:Z:null,polygonOffset:r||d?null:k(s.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}h.shader=new L(le,()=>import("./ImageMaterial.glsl.012112c3.js"));const ue=I(y.ONE,y.ONE_MINUS_SRC_ALPHA);class i extends U{constructor(){super(...arguments),this.output=o.Color,this.cullFace=v.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=p.NONE,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}n([c({count:o.COUNT})],i.prototype,"output",void 0),n([c({count:v.COUNT})],i.prototype,"cullFace",void 0),n([c()],i.prototype,"hasSlicePlane",void 0),n([c()],i.prototype,"transparent",void 0),n([c()],i.prototype,"enableOffset",void 0),n([c()],i.prototype,"writeDepth",void 0),n([c()],i.prototype,"hasOccludees",void 0),n([c({count:p.COUNT})],i.prototype,"transparencyPassType",void 0),n([c()],i.prototype,"hasMultipassTerrain",void 0),n([c()],i.prototype,"cullAboveGround",void 0);class ve extends ee{constructor(e){super(e,new he),this.supportsEdges=!0,this.techniqueConfig=new i}getConfiguration(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.cullFace=this.parameters.cullFace,this.techniqueConfig.hasSlicePlane=this.parameters.hasSlicePlane,this.techniqueConfig.transparent=this.parameters.transparent,this.techniqueConfig.writeDepth=this.parameters.writeDepth,this.techniqueConfig.hasOccludees=this.parameters.hasOccludees,this.techniqueConfig.transparencyPassType=t.transparencyPassType,this.techniqueConfig.enableOffset=t.camera.relativeElevation<te,this.techniqueConfig.hasMultipassTerrain=t.multipassTerrain.enabled,this.techniqueConfig.cullAboveGround=t.multipassTerrain.cullAboveGround,this.techniqueConfig}intersect(e,t,s,r,d,P,$){ae(e,t,r,d,P,void 0,$)}requiresSlot(e,t){return e===u.DRAPED_MATERIAL?!0:se(t)===o.Highlight?e===u.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?u.TRANSPARENT_MATERIAL:u.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:u.OPAQUE_MATERIAL)}createGLMaterial(e){return e.output===o.Color||e.output===o.Alpha||e.output===o.Highlight?new pe(e):void 0}createBufferWriter(){return new re(ie)}}class pe extends oe{constructor(e){super(g(g({},e),e.material.parameters))}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(h,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==o.Color&&this._output!==o.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class he extends ne{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=v.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0}}export{ce as f,ve as m};
