(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"1BiQ":function(e,t,r){"use strict";r.r(t),(function(e){r.d(t,"default",(function(){return c}));var n=r("1c9+"),o=r("9oXm"),i=r("vULT"),s=r("qPxQ");const a=e=>e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");let u=[];class c extends o.a{static async open(e,t=5e3){return new c}constructor(){super(),this.scrambleKey=void 0,this.unwrap=!0,u.push(this)}async exchange(t){try{return await function(t,r,o,s){const u=function(t,r){const n=e.alloc(t.length);for(let e=0;e<t.length;e++)n[e]=t[e]^r[e%r.length];return n}(t,o),c=e.from("0000000000000000000000000000000000000000000000000000000000000000","hex"),p={version:"U2F_V2",keyHandle:a(u.toString("base64")),challenge:a(c.toString("base64")),appId:location.origin};return Object(i.a)("apdu","=> "+t.toString("hex")),Object(n.sign)(p,r/1e3).then(t=>{const{signatureData:r}=t;if("string"==typeof r){const t=e.from((n=r).replace(/-/g,"+").replace(/_/g,"/")+"==".substring(0,3*n.length%4),"base64");let o;return o=s?t.slice(5):t,Object(i.a)("apdu","<= "+o.toString("hex")),o}throw t;var n})}(t,this.exchangeTimeout,this.scrambleKey,this.unwrap)}catch(r){throw"object"==typeof r.metaData?(5===r.metaData.code&&(u.forEach(e=>e.emit("disconnect")),u=[]),function(e,t,r){const n=new s.TransportError(t,r);return n.originalError=e,n}(r,"Failed to sign with Ledger device: U2F "+r.metaData.type,"U2F_"+r.metaData.code)):r}}setScrambleKey(t){this.scrambleKey=e.from(t,"ascii")}setUnwrap(e){this.unwrap=e}close(){return Promise.resolve()}}c.isSupported=n.isSupported,c.list=()=>Object(n.isSupported)().then(e=>e?[null]:[]),c.listen=e=>{let t=!1;return Object(n.isSupported)().then(r=>{t||(r?(e.next({type:"add",descriptor:null}),e.complete()):e.error(new s.TransportError("U2F browser support is needed for Ledger. Please use Chrome, Opera or Firefox with a U2F extension. Also make sure you're on an HTTPS connection","U2FNotSupported")))}),{unsubscribe:()=>{t=!0}}}}).call(this,r("tjlA").Buffer)},"1c9+":function(e,t,r){"use strict";e.exports=r("d5mW")},adUY:function(e,t,r){"use strict";var n=n||{};e.exports=n,n.EXTENSION_ID="kmendfapggjehodndflmmgagdbamhnfd",n.MessageTypes={U2F_REGISTER_REQUEST:"u2f_register_request",U2F_SIGN_REQUEST:"u2f_sign_request",U2F_REGISTER_RESPONSE:"u2f_register_response",U2F_SIGN_RESPONSE:"u2f_sign_response"},n.ErrorCodes={OK:0,OTHER_ERROR:1,BAD_REQUEST:2,CONFIGURATION_UNSUPPORTED:3,DEVICE_INELIGIBLE:4,TIMEOUT:5},n.disconnect=function(){n.port_&&n.port_.port_&&(n.port_.port_.disconnect(),n.port_=null)},n.getMessagePort=function(e){"undefined"!=typeof chrome&&chrome.runtime?chrome.runtime.sendMessage(n.EXTENSION_ID,{type:n.MessageTypes.U2F_SIGN_REQUEST,signRequests:[]},(function(){chrome.runtime.lastError?n.getIframePort_(e):n.getChromeRuntimePort_(e)})):n.getIframePort_(e)},n.getChromeRuntimePort_=function(e){var t=chrome.runtime.connect(n.EXTENSION_ID,{includeTlsChannelId:!0});setTimeout((function(){e(null,new n.WrappedChromeRuntimePort_(t))}),0)},n.WrappedChromeRuntimePort_=function(e){this.port_=e},n.WrappedChromeRuntimePort_.prototype.postMessage=function(e){this.port_.postMessage(e)},n.WrappedChromeRuntimePort_.prototype.addEventListener=function(e,t){var r=e.toLowerCase();"message"==r||"onmessage"==r?this.port_.onMessage.addListener((function(e){t({data:e})})):console.error("WrappedChromeRuntimePort only supports onMessage")},n.getIframePort_=function(e){var t="chrome-extension://"+n.EXTENSION_ID,r=document.createElement("iframe");r.src=t+"/u2f-comms.html",r.setAttribute("style","display:none"),document.body.appendChild(r);var o=!1,i=new MessageChannel,s=function(t){"ready"==t.data?(i.port1.removeEventListener("message",s),o||(o=!0,e(null,i.port1))):console.error('First event on iframe port was not "ready"')};i.port1.addEventListener("message",s),i.port1.start(),r.addEventListener("load",(function(){r.contentWindow.postMessage("init",t,[i.port2])})),setTimeout((function(){o||(o=!0,e(new Error("IFrame extension not supported")))}),200)},n.EXTENSION_TIMEOUT_SEC=30,n.port_=null,n.waitingForPort_=[],n.reqCounter_=0,n.callbackMap_={},n.getPortSingleton_=function(e){n.port_?e(null,n.port_):(0==n.waitingForPort_.length&&n.getMessagePort((function(e,t){for(e||(n.port_=t,n.port_.addEventListener("message",n.responseHandler_));n.waitingForPort_.length;)n.waitingForPort_.shift()(e,t)})),n.waitingForPort_.push(e))},n.responseHandler_=function(e){var t=e.data,r=t.requestId;if(r&&n.callbackMap_[r]){var o=n.callbackMap_[r];delete n.callbackMap_[r],o(null,t.responseData)}else console.error("Unknown or missing requestId in response.")},n.isSupported=function(e){n.getPortSingleton_((function(t,r){e(!t)}))},n.sign=function(e,t,r){n.getPortSingleton_((function(o,i){if(o)return t(o);var s=++n.reqCounter_;n.callbackMap_[s]=t,i.postMessage({type:n.MessageTypes.U2F_SIGN_REQUEST,signRequests:e,timeoutSeconds:void 0!==r?r:n.EXTENSION_TIMEOUT_SEC,requestId:s})}))},n.register=function(e,t,r,o){n.getPortSingleton_((function(i,s){if(i)return r(i);var a=++n.reqCounter_;n.callbackMap_[a]=r,s.postMessage({type:n.MessageTypes.U2F_REGISTER_REQUEST,signRequests:t,registerRequests:e,timeoutSeconds:void 0!==o?o:n.EXTENSION_TIMEOUT_SEC,requestId:a})}))}},d5mW:function(e,t,r){"use strict";(function(t){e.exports=c;var n=r("adUY"),o="undefined"!=typeof navigator&&!!navigator.userAgent,i=o&&navigator.userAgent.match(/Safari\//)&&!navigator.userAgent.match(/Chrome\//),s=o&&navigator.userAgent.match(/Edge\/1[2345]/),a=null;function u(e){return a||(a=new e((function(e,t){function r(){e({u2f:null,native:!0})}return o?i?r():(void 0!==window.u2f&&"function"==typeof window.u2f.sign&&e({u2f:window.u2f,native:!0}),s||"http:"===location.protocol||"undefined"==typeof MessageChannel?r():void n.isSupported((function(t){t?e({u2f:n,native:!1}):r()}))):r()}))),a}function c(e){return{isSupported:l.bind(e),ensureSupport:g.bind(e),register:E.bind(e),sign:_.bind(e),ErrorCodes:c.ErrorCodes,ErrorNames:c.ErrorNames}}function p(e,t){var r=null!=t?t.errorCode:1,n=c.ErrorNames[""+r],o=new Error(e);return o.metaData={type:n,code:r},o}function d(e,t){var r={};return r.promise=new e((function(e,n){r.resolve=e,r.reject=n,t.then(e,n)})),r.promise.cancel=function(t,n){u(e).then((function(e){n&&!e.native&&e.u2f.disconnect(),r.reject(p(t,{errorCode:-1}))}))},r}function l(){return u(this).then((function(e){return!!e.u2f}))}function f(e){if(!e.u2f){if("http:"===location.protocol)throw new Error("U2F isn't supported over http, only https");throw new Error("U2F not supported")}}function g(){return u(this).then(f)}function E(e,t,r){var n=this;return Array.isArray(e)||(e=[e]),"number"==typeof t&&void 0===r&&(r=t,t=null),t||(t=[]),d(n,u(n).then((function(o){f(o);var i=o.native,s=o.u2f;return new n((function(n,o){i?s.register(e[0].appId,e,t,(function(e){e.errorCode?o(p("Registration failed",e)):(delete e.errorCode,n(e))}),r):s.register(e,t,(function(e,t){e?o(e):t.errorCode?o(p("Registration failed",t)):n(t)}),r)}))}))).promise}function _(e,t){var r=this;return Array.isArray(e)||(e=[e]),d(r,u(r).then((function(n){f(n);var o=n.native,i=n.u2f;return new r((function(r,n){o?i.sign(e[0].appId,e[0].challenge,e,(function(e){e.errorCode?n(p("Sign failed",e)):(delete e.errorCode,r(e))}),t):i.sign(e,(function(e,t){e?n(e):t.errorCode?n(p("Sign failed",t)):r(t)}),t)}))}))).promise}function m(e){c[e]=function(){if(!t.Promise)throw new Error("The platform doesn't natively support promises");var r=[].slice.call(arguments);return c(t.Promise)[e].apply(null,r)}}c.ErrorCodes={CANCELLED:-1,OK:0,OTHER_ERROR:1,BAD_REQUEST:2,CONFIGURATION_UNSUPPORTED:3,DEVICE_INELIGIBLE:4,TIMEOUT:5},c.ErrorNames={"-1":"CANCELLED",0:"OK",1:"OTHER_ERROR",2:"BAD_REQUEST",3:"CONFIGURATION_UNSUPPORTED",4:"DEVICE_INELIGIBLE",5:"TIMEOUT"},m("isSupported"),m("ensureSupport"),m("register"),m("sign")}).call(this,r("yLpj"))}}]);