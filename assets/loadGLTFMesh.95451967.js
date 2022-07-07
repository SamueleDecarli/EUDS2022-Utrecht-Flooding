import{tN as P,bC as _,r as u,tO as j,tP as D,tJ as k,b5 as h,dc as b,tQ as w,tB as q,tK as I,nh as U,lN as L,tR as O,tS as G,tT as V,l as R,ek as z,tU as K,j1 as Q,tC as W,nj as X,np as M,lG as B,nq as Y,tV as N,tW as Z,tX as J,tY as H,tZ as tt,t_ as A,t$ as et,u0 as nt,u1 as ot,u2 as rt,u3 as st,u4 as at,u5 as S,u6 as it,nm as ut,u7 as ct,u8 as lt,h0 as C,u9 as ft,ua as pt,ub as mt,co as E,t as dt,uc as gt}from"./vendor.5530b0a9.js";import{k as xt}from"./georeference.9537a1ab.js";async function St(t,e,o){const s=new P($t(o)),n=(await j(s,e,o,!0)).model,p=n.lods.shift(),l=new Map,c=new Map;n.textures.forEach(($,T)=>l.set(T,wt($))),n.materials.forEach(($,T)=>c.set(T,yt($,l)));const i=bt(p);for(const $ of i.parts)vt(i,$,c);const{position:d,normal:f,tangent:r,color:a,texCoord0:m}=i.vertexAttributes,x={position:d.typedBuffer,normal:u(f)?f.typedBuffer:null,tangent:u(r)?r.typedBuffer:null,uv:u(m)?m.typedBuffer:null,color:u(a)?a.typedBuffer:null},v=xt(x,t,o);return{transform:v.transform,components:i.components,spatialReference:t.spatialReference,vertexAttributes:new q({position:v.vertexAttributes.position,normal:v.vertexAttributes.normal,tangent:v.vertexAttributes.tangent,color:x.color,uv:x.uv})}}function $t(t){return(t==null?void 0:t.resolveFile)?{busy:!1,request:async(e,o,s)=>{const n=t.resolveFile(e);return(await _(n,{responseType:o==="image"?"image":o==="binary"?"array-buffer":"json",signal:u(s)?s.signal:null})).data}}:null}function y(t,e){if(dt(t))return"-";const o=t.typedBuffer;return`${I(e,o.buffer,()=>e.size)}/${o.byteOffset}/${o.byteLength}`}function ht(t){return u(t)?t.toString():"-"}function bt(t){let e=0;const o={color:!1,tangent:!1,normal:!1,texCoord0:!1},s=new Map,n=new Map,p=[];for(const l of t.parts){const{attributes:{position:c,normal:i,color:d,tangent:f,texCoord0:r}}=l,a=`
      ${y(c,s)}/
      ${y(i,s)}/
      ${y(d,s)}/
      ${y(f,s)}/
      ${y(r,s)}/
      ${ht(l.transform)}
    `;let m=!1;const x=I(n,a,()=>(m=!0,{start:e,length:c.count}));m&&(e+=c.count),i&&(o.normal=!0),d&&(o.color=!0),f&&(o.tangent=!0),r&&(o.texCoord0=!0),p.push({gltf:l,writeVertices:m,region:x})}return{vertexAttributes:{position:w(U,e),normal:o.normal?w(L,e):null,tangent:o.tangent?w(O,e):null,color:o.color?w(G,e):null,texCoord0:o.texCoord0?w(V,e):null},parts:p,components:[]}}function wt(t){return new D({data:t.data,wrap:Et(t.parameters.wrap)})}function yt(t,e){const o=new R(Rt(t.color,t.opacity)),s=t.emissiveFactor?new R(Mt(t.emissiveFactor)):null;return new k({color:o,colorTexture:h(b(t.textureColor,n=>e.get(n))),normalTexture:h(b(t.textureNormal,n=>e.get(n))),emissiveColor:s,emissiveTexture:h(b(t.textureEmissive,n=>e.get(n))),occlusionTexture:h(b(t.textureOcclusion,n=>e.get(n))),alphaMode:Ct(t.alphaMode),alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,metallic:t.metallicFactor,roughness:t.roughnessFactor,metallicRoughnessTexture:h(b(t.textureMetallicRoughness,n=>e.get(n)))})}function vt(t,e,o){e.writeVertices&&Tt(t,e);const s=e.gltf,n=At(s.indices||s.attributes.position.count,s.primitiveType),p=e.region.start;if(p)for(let l=0;l<n.length;l++)n[l]+=p;t.components.push(new W({faces:n,material:o.get(s.material),trustSourceNormals:!0}))}function Tt(t,e){const{position:o,normal:s,tangent:n,color:p,texCoord0:l}=t.vertexAttributes,c=e.region.start,{attributes:i,transform:d}=e.gltf,f=i.position.count;if(X(o.slice(c,f),i.position,d),u(i.normal)&&u(s)){const r=M(B(),d),a=s.slice(c,f);Y(a,i.normal,r),N(r)&&Z(a,a)}else u(s)&&J(s,0,0,1,{dstIndex:c,count:f});if(u(i.tangent)&&u(n)){const r=M(B(),d),a=n.slice(c,f);H(a,i.tangent,r),N(r)&&tt(a,a)}else u(n)&&A(n,0,0,1,1,{dstIndex:c,count:f});if(u(i.texCoord0)&&u(l)?et(l.slice(c,f),i.texCoord0):u(l)&&nt(l,0,0,{dstIndex:c,count:f}),u(i.color)&&u(p)){const r=i.color,a=p.slice(c,f);if(r.elementCount===4)r instanceof O?ot(a,r,255):r instanceof G?rt(a,r):r instanceof st&&at(a,r,8);else{A(a,255,255,255,255);const m=S.fromTypedArray(a.typedBuffer,a.typedBufferStride);r instanceof L?it(m,r,255):r instanceof S?ut(m,r):r instanceof ct&&lt(m,r,8)}}else u(p)&&A(p.slice(c,f),255,255,255,255)}function At(t,e){switch(e){case C.TRIANGLES:return mt(t,gt);case C.TRIANGLE_STRIP:return pt(t);case C.TRIANGLE_FAN:return ft(t)}}function Ct(t){switch(t){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function Et(t){return{horizontal:F(t.s),vertical:F(t.t)}}function F(t){switch(t){case E.CLAMP_TO_EDGE:return"clamp";case E.MIRRORED_REPEAT:return"mirror";case E.REPEAT:return"repeat"}}function g(t){return t**(1/K)*255}function Rt(t,e){return z(g(t[0]),g(t[1]),g(t[2]),e)}function Mt(t){return Q(g(t[0]),g(t[1]),g(t[2]))}export{St as loadGLTFMesh};