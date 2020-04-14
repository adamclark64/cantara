(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{128:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(0),r=n.n(a),i=n(180),o=n(179),c=(n(130),function(e){var t=e.title,n=e.description;return r.a.createElement("div",{className:"card cantara__card"},r.a.createElement("div",{className:"card__header"},r.a.createElement("h3",null,t)),r.a.createElement("div",{className:"card__body"},n))});function s(){return r.a.createElement("div",{className:"features__container"},r.a.createElement("div",{className:"cantara__features"},r.a.createElement("h2",{className:"cantara__features__title",id:"features"},"Features"),r.a.createElement("div",{className:"cantara__features__container"},r.a.createElement(c,{title:"React webapps",description:"You are just one CLI command away to get you up and running with a modern React + TypeScript webapp."}),r.a.createElement(c,{title:"NodeJS APIs",description:"Develop NodeJS APIs using TypeScript."}),r.a.createElement(c,{title:"Serverless endpoints",description:"Developing and deploying serverless endpoints using TypeScript is a breeze with Cantara."}),r.a.createElement(c,{title:"Publish typesafe packages to NPM",description:"If it is a React Component, a browser library or a NodeJS library, with Cantara you can publish it to NPM with just one command. Types included out of the box!"}),r.a.createElement(c,{title:"Unit/Integration/E2E testing",description:"Cantara comes build in with all testing utilities you need. Thanks to Jest and react-testing-library, testing is fun again! Cantara also offers special commands for browser testing."}),r.a.createElement(c,{title:"Organized in a monorepository!",description:"If done correctly, monorepositories can speed up development remarkably. Fullstack development never was that easy."}),r.a.createElement(c,{title:"Zero config",description:"Yep, that's right. No webpack config, no .tsconfig and no jest config to touch. It just works \u2122"})),r.a.createElement(i.a,{href:Object(o.a)("docs/introduction"),className:"button button--secondary button--lg button--block"},"Get started now")))}},178:function(e,t,n){"use strict";var a=n(0),r=n(48);t.a=function(){return Object(a.useContext)(r.a)}},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(185);var a=n(178);function r(e){var t=(Object(a.a)().siteConfig||{}).baseUrl,n=void 0===t?"/":t;if(!e)return e;return/^(https?:|\/\/)/.test(e)?e:e.startsWith("/")?n+e.slice(1):n+e}},180:function(e,t,n){"use strict";var a=n(1),r=n(0),i=n.n(r),o=n(35),c=/^\/(?!\/)/;t.a=function(e){var t,n=e.to,s=e.href,u=n||s,l=c.test(u),d=Object(r.useRef)(!1),f="undefined"!=typeof window&&"IntersectionObserver"in window;return Object(r.useEffect)((function(){return!f&&l&&window.docusaurus.prefetch(u),function(){f&&t&&t.disconnect()}}),[u,f,l]),u&&l?i.a.createElement(o.b,Object(a.a)({},e,{onMouseEnter:function(){d.current||(window.docusaurus.preload(u),d.current=!0)},innerRef:function(e){var n,a;f&&e&&l&&(n=e,a=function(){window.docusaurus.prefetch(u)},(t=new window.IntersectionObserver((function(e){e.forEach((function(e){n===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(t.unobserve(n),t.disconnect(),a())}))}))).observe(n))},to:u})):i.a.createElement("a",Object(a.a)({},e,{href:u}))}},183:function(e,t,n){var a=n(66),r=n(23);e.exports=function(e,t,n){if(a(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(r(e))}},184:function(e,t,n){var a=n(2)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[a]=!1,!"/./"[e](t)}catch(r){}}return!0}},185:function(e,t,n){"use strict";var a=n(17),r=n(34),i=n(183),o="".startsWith;a(a.P+a.F*n(184)("startsWith"),"String",{startsWith:function(e){var t=i(this,e,"startsWith"),n=r(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),a=String(e);return o?o.call(t,a,n):t.slice(n,n+a.length)===a}})}}]);