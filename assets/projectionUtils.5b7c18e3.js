import{t,r as a,al as c,jX as s,j$ as l}from"./vendor.5530b0a9.js";function d(i,n,o,r=!1){const e=l(i,n);return t(e)?null:(e.hasZ&&!r||!a(o)||(e.z=c(s(o,e),0)),e)}function f(i,n,o){o.warnOnce(`Failed to project analysis geometry (id: '${i.id}'), projection from spatial reference (wkid: '${n.wkid}') to view spatial reference is not supported. Projection may be possible after calling projection.load().`)}export{f as a,d as n};