'use strict';(function(g,f){"object"===typeof exports&&"undefined"!==typeof module?module.exports=f():"function"===typeof define&&define.amd?define(f):(g=g||self,g.Graph=f())})(this,function(){function g(a,b){let c=new Map;for(let [e,d]of a)e!==b&&d instanceof Map?c.set(e,g(d,b)):e!==b&&c.set(e,d);return c}function f(a){let b=new Map;Object.keys(a).forEach(c=>{let e=a[c];if(null!==e&&"object"===typeof e&&!Array.isArray(e))return b.set(c,f(e));var d=Number(e);d=isNaN(d)||0>=d?!1:!0;if(!d)throw Error(`Invalid node: ${c}: ${e}`);
return b.set(c,Number(e))});return b}function l(a){if(!(a instanceof Map))throw Error(`Invalid graph: Expected Map instead found ${typeof a}`);a.forEach((a,c)=>{if("object"===typeof a&&a instanceof Map)l(a);else if("number"!==typeof a||0>=a)throw Error(`Values must be numbers greater than 0. Found value ${a} at ${c}`);})}class m{constructor(){this.keys=new Set;this.queue=[]}sort(){this.queue.sort((a,b)=>a.priority-b.priority)}set(a,b){let c=Number(b);if(isNaN(c))throw new TypeError('"priority" must be a number');
this.keys.has(a)?this.queue.map(b=>{b.key===a&&Object.assign(b,{priority:c});return b}):(this.keys.add(a),this.queue.push({key:a,priority:c}));this.sort();return this.queue.length}next(){let a=this.queue.shift();this.keys.delete(a.key);return a}isEmpty(){return 0===this.queue.length}has(a){return this.keys.has(a)}get(a){return this.queue.find(b=>b.key===a)}}class n{constructor(a){a instanceof Map?(l(a),this.graph=a):this.graph=a?f(a):new Map}addNode(a,b){b instanceof Map?l(b):b=f(b);this.graph.set(a,
b);return this}addVertex(a,b){return this.addNode(a,b)}removeNode(a){this.graph=g(this.graph,a);return this}path(a,b,c={}){if(!this.graph.size)return c.cost?{path:null,cost:0}:null;let e=new Set,d=new m,f=new Map,h=[],g=0,k=[];c.avoid&&(k=[].concat(c.avoid));if(k.includes(a))throw Error(`Starting node (${a}) cannot be avoided`);if(k.includes(b))throw Error(`Ending node (${b}) cannot be avoided`);for(d.set(a,0);!d.isEmpty();){let a=d.next();if(a.key===b){g=a.priority;for(b=a.key;f.has(b);)h.push(b),
b=f.get(b);break}e.add(a.key);(this.graph.get(a.key)||new Map).forEach((b,c)=>{if(e.has(c)||k.includes(c))return null;if(!d.has(c))return f.set(c,a.key),d.set(c,a.priority+b);let g=d.get(c).priority;b=a.priority+b;return b<g?(f.set(c,a.key),d.set(c,b)):null})}if(!h.length)return c.cost?{path:null,cost:0}:null;c.trim?h.shift():h=h.concat([a]);c.reverse||(h=h.reverse());return c.cost?{path:h,cost:g}:h}shortestPath(...a){return this.path(...a)}}return n})
