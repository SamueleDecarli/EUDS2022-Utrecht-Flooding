import{ck as P,cl as y,cm as $,c3 as v,cn as O,r as _,co as S,cp as l,cq as x,cr as A,cs as E,ct as w,cu as o,cv as T,cw as F,cx as p,cy as b,cz as f,e as n,cA as c,cB as g,cC as D,bl as N,cD as M,cE as q,cF as R,cG as I,cH as L,cI as U,cJ as W,cK as B,cL as G,cM as z,cN as H,cO as j,cP as Q,cQ as V,cR as k,cS as J,cT as K,cU as X,bo as u,cV as Y,cW as Z,cX as ee,cY as te,cZ as ae}from"./index.80f43001.js";function se(s){const e=new P;y(e,s),e.include($),e.attributes.add(v.POSITION,"vec3"),e.attributes.add(v.UV0,"vec2"),e.varyings.add("vpos","vec3"),s.hasMultipassTerrain&&e.varyings.add("depth","float");const{vertex:t,fragment:a}=e;return t.uniforms.add(new O("textureCoordinateScaleFactor",r=>_(r.texture)&&_(r.texture.descriptor.textureCoordinateScaleFactor)?r.texture.descriptor.textureCoordinateScaleFactor:S)),t.code.add(l`
    void main(void) {
      vpos = position;
      ${s.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(x,s),e.include(A,s),a.uniforms.add([new E("tex",r=>r.texture),new w("opacity",r=>r.opacity)]),e.varyings.add("vTexCoord","vec2"),s.output===o.Alpha?a.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${s.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${l.float(T)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(a.include(F),a.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${s.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
      gl_FragColor = texture2D(tex, vTexCoord) * opacity;

      if (gl_FragColor.a < ${l.float(T)}) {
        discard;
      }

      gl_FragColor = highlightSlice(gl_FragColor, vpos);
      ${s.transparencyPassType===p.Color?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    }
    `)),e}const re=Object.freeze(Object.defineProperty({__proto__:null,build:se},Symbol.toStringTag,{value:"Module"}));class h extends q{initializeProgram(e){const t=h.shader.get().build(this.configuration);return new R(e.rctx,t,I)}_setPipelineState(e,t){const a=this.configuration,r=e===p.NONE,d=e===p.FrontFace;return L({blending:a.output!==o.Color&&a.output!==o.Alpha||!a.transparent?null:r?ie:U(e),culling:W(a.cullFace),depthTest:{func:B(e)},depthWrite:r?a.writeDepth&&G:z(e),colorWrite:H,stencilWrite:a.hasOccludees?j:null,stencilTest:a.hasOccludees?t?Q:V:null,polygonOffset:r||d?null:k(a.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}h.shader=new D(re,()=>N(()=>import("./ImageMaterial.glsl.242c08f7.js"),["assets/ImageMaterial.glsl.242c08f7.js","assets/index.80f43001.js","assets/index.2de8b745.css"]));const ie=b(f.ONE,f.ONE_MINUS_SRC_ALPHA);class i extends M{constructor(){super(...arguments),this.output=o.Color,this.cullFace=g.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=p.NONE,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}n([c({count:o.COUNT})],i.prototype,"output",void 0),n([c({count:g.COUNT})],i.prototype,"cullFace",void 0),n([c()],i.prototype,"hasSlicePlane",void 0),n([c()],i.prototype,"transparent",void 0),n([c()],i.prototype,"enableOffset",void 0),n([c()],i.prototype,"writeDepth",void 0),n([c()],i.prototype,"hasOccludees",void 0),n([c({count:p.COUNT})],i.prototype,"transparencyPassType",void 0),n([c()],i.prototype,"hasMultipassTerrain",void 0),n([c()],i.prototype,"cullAboveGround",void 0);class le extends J{constructor(e){super(e,new ne),this.supportsEdges=!0,this.techniqueConfig=new i}getConfiguration(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.cullFace=this.parameters.cullFace,this.techniqueConfig.hasSlicePlane=this.parameters.hasSlicePlane,this.techniqueConfig.transparent=this.parameters.transparent,this.techniqueConfig.writeDepth=this.parameters.writeDepth,this.techniqueConfig.hasOccludees=this.parameters.hasOccludees,this.techniqueConfig.transparencyPassType=t.transparencyPassType,this.techniqueConfig.enableOffset=t.camera.relativeElevation<K,this.techniqueConfig.hasMultipassTerrain=t.multipassTerrain.enabled,this.techniqueConfig.cullAboveGround=t.multipassTerrain.cullAboveGround,this.techniqueConfig}intersect(e,t,a,r,d,m,C){X(e,t,r,d,m,void 0,C)}requiresSlot(e,t){return e===u.DRAPED_MATERIAL?!0:Y(t)===o.Highlight?e===u.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?u.TRANSPARENT_MATERIAL:u.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:u.OPAQUE_MATERIAL)}createGLMaterial(e){return e.output===o.Color||e.output===o.Alpha||e.output===o.Highlight?new oe(e):void 0}createBufferWriter(){return new Z(ee)}}class oe extends te{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(h,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==o.Color&&this._output!==o.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class ne extends ae{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=g.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0}}export{se as f,le as m};
