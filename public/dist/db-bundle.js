!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([,function(e,n){let t;const r=indexedDB.open("budget",1);function o(){const e=t.transaction(["pending"],"readwrite").objectStore("pending").getAll();e.onsuccess=function(){e.result.length>0&&fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(e.result),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(e=>e.json()).then(()=>{const e=t.transaction(["pending"],"readwrite");console.log("Offline actions have been successfully sent to and received by server.");e.objectStore("pending").clear()})}}r.onupgradeneeded=function(e){e.target.result.createObjectStore("pending",{autoIncrement:!0})},r.onsuccess=function(e){t=e.target.result,navigator.onLine&&o()},r.onerror=function(e){console.log("Encounter error here! "+e.target.errorCode)},window.addEventListener("online",o)}]);