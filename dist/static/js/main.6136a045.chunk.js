(this["webpackJsonpwknd-spa-sheets"]=this["webpackJsonpwknd-spa-sheets"]||[]).push([[0],{28:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(29),i=n.n(a),s=n(10),o=n(3),l=n(11),j=n(1),u=function(e){var t=e.errorMessage;return Object(j.jsx)("div",{className:"error",children:Object(j.jsx)("span",{className:"error-message",children:"Error: ".concat(t)})})},d=n.p+"static/media/icon-loading.2c27a19f.svg",m=function(){return Object(j.jsx)("div",{className:"loading",children:Object(j.jsx)("img",{src:d,alt:"Loading..."})})},b=(n(42),n(5)),p=n(7),O=n(6);function x(e){var t=Object(r.useState)(null),n=Object(O.a)(t,2),c=n[0],a=n[1],i=Object(r.useState)(null),s=Object(O.a)(i,2),o=s[0],l=s[1],j=Object(r.useRef)({});return Object(r.useEffect)((function(){function t(){return(t=Object(p.a)(Object(b.a)().mark((function t(){var n,r,c,a,i,s,o,l,u,d;return Object(b.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.split(":"),r=Object(O.a)(n,6),c=r[1],a=r[2],i=r[3],s=r[4],o=r[5],"fnkconnection"===c){t.next=3;break}throw Error("unsupported connection: ".concat(c));case 3:if(l=a,i&&(l+="?sheet=".concat(i)),u=j.current[l]){t.next=14;break}return t.next=9,fetch(l);case 9:return d=t.sent,t.next=12,d.json();case 12:u=t.sent,j.current[l]=u;case 14:if("#"!==s){t.next=16;break}return t.abrupt("return",u.data[Number(o||0)]);case 16:if(!s){t.next=18;break}return t.abrupt("return",u.data.find((function(e){return e[s]===o}))||{});case 18:return t.abrupt("return",u.data);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}(function(){return t.apply(this,arguments)})().then(a).catch((function(e){l(e),sessionStorage.removeItem("accessToken")}))}),[e]),{data:c,errorMessage:o}}function f(e){if(!e||!e.name||!e.title)return null;var t=e.image||"/assets/adventures/".concat(e.name,".jpeg");return Object(j.jsxs)("li",{className:"adventure-item",itemScope:!0,itemID:e.itemID,itemType:"urn:fnk:type/sheet",children:[Object(j.jsx)(s.b,{to:"/adventure/".concat(e.name),children:Object(j.jsx)("img",{className:"adventure-item-image",src:t,alt:e.title,itemProp:"image",itemType:"image"})}),Object(j.jsxs)("div",{className:"adventure-item-length-price",children:[Object(j.jsx)("div",{className:"adventure-item-length",itemProp:"tripLength",itemType:"text",children:e.tripLength}),Object(j.jsxs)("div",{className:"adventure-item-price",itemProp:"price",itemType:"text",children:["$",e.price]})]}),Object(j.jsx)("div",{className:"adventure-item-title",itemProp:"title",itemType:"text",children:e.title})]})}var h=function(){var e="urn:fnkconnection:/adventures.json:default",t=x(e),n=t.data,r=t.errorMessage;return r?Object(j.jsx)(u,{errorMessage:r}):n?Object(j.jsx)("div",{className:"adventures",children:Object(j.jsx)("ul",{className:"adventure-items",children:n.map((function(t,n){return Object(j.jsx)(f,Object(l.a)({itemID:"".concat(e,":name:").concat(t.name)},t),n)}))})}):Object(j.jsx)(m,{})},v=n.p+"static/media/wknd-card.42e74d83.jpeg",g=function(e){var t,n=e.itemID,r=e.itemProp,c=e.itemType,a=e.className,i=x(n),s=i.data,o=i.errorMessage;if(o)return Object(j.jsx)(u,{errorMessage:o});var l=null!==(t=null===s||void 0===s?void 0:s[r])&&void 0!==t?t:"";return Object(j.jsx)("div",{itemID:n,itemProp:r,itemType:c,className:a,children:"richtext"===c?Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:l}}):l})},y=function(e){var t,n=e.itemID,r=e.itemProp,c=e.itemType,a=e.className,i=e.TitleTag,s=void 0===i?"h1":i,o=x(n),l=o.data,d=o.errorMessage;if(d)return Object(j.jsx)(u,{errorMessage:d});var m=null!==(t=null===l||void 0===l?void 0:l[r])&&void 0!==t?t:"";return Object(j.jsx)(s,{itemID:n,itemProp:r,itemType:c,className:a,children:m})},N=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("article",{className:"card",children:[Object(j.jsx)("img",{src:v,alt:"Sample"}),Object(j.jsxs)("div",{children:[Object(j.jsx)(y,{itemID:"urn:fnkconnection:/home.json:teaser:#:0",itemProp:"title",itemType:"text",TitleTag:"h2"}),Object(j.jsx)(y,{itemID:"urn:fnkconnection:/articles.json:default:name:western-australia-by-camper-van",itemProp:"title",itemType:"text"}),Object(j.jsx)("div",{className:"card-text",children:Object(j.jsx)(g,{itemID:"urn:fnkconnection:/articles.json:default:name:western-australia-by-camper-van",itemProp:"abstract",itemType:"richtext"})}),Object(j.jsx)(s.b,{to:"/magazine",children:Object(j.jsx)("button",{children:"Show More"})})]})]})})},T=n(52),k=n(51),I=n(9),P=n(21);function M(e){var t=new Map;Object(k.a)(e,(function(e,n,r){return"definition"===e.type&&t.set(e.identifier,{node:e,parent:r,refCount:0}),P.a})),Object(k.a)(e,(function(e){if("imageReference"===e.type||"linkReference"===e.type){var n=e.identifier,r=t.get(n);r&&(r.refCount+=1,e.url=r.node.url,r.node.title&&(e.title=r.node.title),e.type="imageReference"===e.type?"image":"link",delete e.identifier,delete e.referenceType)}return P.a}));var n,r=Object(I.a)(t.values());try{for(r.s();!(n=r.n()).done;){var c=n.value;if(c.refCount){var a=c.parent.children.indexOf(c.node);c.parent.children.splice(a,1)}}}catch(i){r.e(i)}finally{r.f()}return e}function D(e,t){return e.children.map((function(e,n){return t&&!t(e)?null:"paragraph"===e.type?Object(j.jsx)("p",{children:D(e,t)},n):"strong"===e.type?Object(j.jsx)("strong",{children:D(e,t)},n):"image"===e.type?Object(j.jsx)("img",{src:e.url,alt:e.alt},n):"emphasis"===e.type?Object(j.jsx)("em",{children:D(e,t)},n):"heading"===e.type?(e.level,Object(j.jsx)("h1",{children:D(e,t)},n)):"text"===e.type?e.value:null})).filter((function(e){return!!e}))}function S(e){var t=[];return Object(k.a)(e,(function(e){"image"===e.type&&t.push(e.url)})),t}function w(e){var t=e.children.findIndex((function(e){return"heading"===e.type}));return t<0?null:D({children:e.children.splice(t,1)})[0]}function z(e,t){var n=Object(r.useState)(null),c=Object(O.a)(n,2),a=c[0],i=c[1],s=Object(r.useState)(null),o=Object(O.a)(s,2),l=o[0],j=o[1],u=Object(r.useRef)({});return Object(r.useEffect)((function(){function n(){return(n=Object(p.a)(Object(b.a)().mark((function n(){var r,c,a,i,s,o,l,j,d,m,p,x;return Object(b.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=e.split(":"),c=Object(O.a)(r,3),a=c[1],i=c[2],"fnkconnection"===a){n.next=3;break}throw Error("unsupported connection: ".concat(a));case 3:if(s="".concat(i,".md"),o=u.current[s]){n.next=15;break}return n.next=8,fetch(s);case 8:if((l=n.sent).ok){n.next=11;break}throw Error(l.status);case 11:return n.next=13,l.text();case 13:o=n.sent,u.current[s]=o;case 15:return M(j=Object(T.a)(o)),d=D(j),m=S(j),p=w(j),x=D(j,t),n.abrupt("return",{dom:d,images:m,title:p,content:x});case 22:case"end":return n.stop()}}),n)})))).apply(this,arguments)}(function(){return n.apply(this,arguments)})().then(i).catch((function(e){j(e),sessionStorage.removeItem("accessToken")}))}),[e]),{data:a,errorMessage:l}}function L(e){return"image"!==e.type}function R(){var e,t="urn:fnkconnection:/summary",n=z(t,L),c=n.data,a=n.errorMessage;if(a)return Object(j.jsx)(u,{errorMessage:a});if(!c)return Object(j.jsx)(m,{});var i=Object(r.cloneElement)(c.title,{itemProp:"title",itemType:"text"});return Object(j.jsxs)("div",{className:"card",children:[Object(j.jsxs)("div",{itemID:t,itemType:"urn:fnk:type/document",itemScope:!0,children:[i,Object(j.jsx)("div",{itemProp:"content",itemType:"richtext",children:c.content})]}),Object(j.jsx)("img",{src:null===(e=c.images)||void 0===e?void 0:e[0],alt:"footer"})]})}var E=function(){return Object(j.jsxs)("div",{className:"Home",children:[Object(j.jsx)(N,{}),Object(j.jsx)("hr",{}),Object(j.jsx)(y,{itemID:"urn:fnkconnection:/home.json:guides:#:0",itemType:"text",itemProp:"title"}),Object(j.jsx)(h,{}),Object(j.jsx)("hr",{}),Object(j.jsx)(R,{})]})},_=n.p+"static/media/wknd-logo-dk.5fba0497.svg",C=(n(43),n.p+"static/media/icon-close.e4df2958.svg");n(28);function H(e){return{__html:e}}function A(e){var t,n=e.name,r=e.title,c=e.image,a=e.activity,i=e.adventureType,s=e.tripLength,o=e.groupSize,u=e.difficulty,d=e.description,m=e.itinerary,b=e.contributor,p=e.itemID;return c=null!==(t=c)&&void 0!==t?t:"/assets/adventures/".concat(n,".jpeg"),Object(j.jsxs)("div",{itemID:p,itemType:"urn:fnk:type/sheet",itemScope:!0,children:[Object(j.jsx)("h1",{itemProp:"title",itemType:"text",className:"adventure-detail-title",children:r}),Object(j.jsxs)("div",{className:"adventure-detail-info",children:[Object(j.jsx)("div",{className:"adventure-detail-info-label",children:"Activity"}),Object(j.jsx)("div",{className:"adventure-detail-info-description",itemProp:"activity",itemType:"text",children:a}),Object(j.jsx)("div",{className:"adventure-detail-info-label",children:"Type"}),Object(j.jsx)("div",{className:"adventure-detail-info-description",itemProp:"adventureType",itemType:"text",children:i}),Object(j.jsx)("div",{className:"adventure-detail-info-label",children:"Trip Length"}),Object(j.jsx)("div",{className:"adventure-detail-info-description",itemProp:"tripLength",itemType:"text",children:s}),Object(j.jsx)("div",{className:"adventure-detail-info-label",children:"Group Size"}),Object(j.jsx)("div",{className:"adventure-detail-info-description",itemProp:"groupSize",itemType:"text",children:o}),Object(j.jsx)("div",{className:"adventure-detail-info-label",children:"Difficulty"}),Object(j.jsx)("div",{className:"adventure-detail-info-description",itemProp:"difficulty",itemType:"text",children:u})]}),Object(j.jsxs)("div",{className:"adventure-detail-content",children:[Object(j.jsx)("img",{className:"adventure-detail-primaryimage",src:c,alt:r,itemProp:"image",itemType:"media"}),Object(j.jsx)("div",{itemProp:"description",itemType:"richtext",dangerouslySetInnerHTML:H(d)}),Object(j.jsx)("h2",{children:"Itinerary"}),Object(j.jsx)("hr",{}),Object(j.jsx)("div",{itemProp:"itinerary",itemType:"richtext",className:"adventure-detail-itinerary",dangerouslySetInnerHTML:H(m)}),Object(j.jsx)(B,Object(l.a)({},b))]})]})}function B(e){if(!e)return null;var t=null;return e.pictureReference&&(t=Object(j.jsx)("img",{className:"contributor-image",src:e.pictureReference._path,alt:e.fullName})),Object(j.jsxs)("div",{className:"contributor",children:[Object(j.jsx)("hr",{className:"contributor-separator"}),t,Object(j.jsx)("h3",{className:"contributor-name",children:e.fullName}),Object(j.jsx)("h4",{className:"contributor-occupation",children:e.occupation})]})}var F=function(){var e=Object(o.o)().name,t=Object(o.m)(),n="urn:fnkconnection:/adventures.json:default:name:".concat(e),r=x(n),c=r.data,a=r.errorMessage;return a?Object(j.jsx)(u,{errorMessage:a}):c?Object(j.jsxs)("div",{className:"adventure-detail",children:[Object(j.jsx)("button",{className:"adventure-detail-close-button",onClick:function(){return t(-1)},children:Object(j.jsx)("img",{className:"Backbutton-icon",src:C,alt:"Return"})}),Object(j.jsx)(A,Object(l.a)({itemID:n},c))]}):Object(j.jsx)(m,{})},J=(n(44),function(e){var t=e.name,n=e.title,r=e.author,c=e.abstract,a=e.itemID;return Object(j.jsxs)("li",{className:"article-item",children:[Object(j.jsxs)("div",{itemScope:!0,itemID:a,children:[Object(j.jsxs)(s.b,{to:"/magazine/".concat(t),children:[Object(j.jsx)("h3",{"data-id":"title",itemProp:"title",itemType:"text",children:n}),Object(j.jsx)("img",{className:"article-item-image",src:"/assets/articles/".concat(t,".jpeg"),alt:n,itemProp:"profilePicture",itemType:"image"})]}),Object(j.jsx)("p",{children:"By ".concat(r)})]}),Object(j.jsx)("p",{className:"article-content",dangerouslySetInnerHTML:{__html:c}})]})}),$=function(){var e=x("urn:fnkconnection:/articles.json:default"),t=e.data,n=e.errorMessage;return n?Object(j.jsx)(u,{errorMessage:n}):t?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("h2",{children:"Articles"}),Object(j.jsx)("ul",{children:t.map((function(e){var t="urn:fnkconnection:/magazine/".concat(e.name);return Object(j.jsx)(J,Object(l.a)({itemID:t},e),t)}))})]}):Object(j.jsx)(m,{})};function G(e){var t=Object(o.o)().name,n="urn:fnkconnection:/magazine/".concat(t),c=z(n,(function(e){return"heading"!==e.type})),a=c.data,i=c.errorMessage;if(i)return Object(j.jsx)(u,{errorMessage:i});if(!a)return Object(j.jsx)(m,{});var d=Object(r.cloneElement)(a.title,{className:"adventure-detail-title",itemProp:"title",itemType:"text"});return Object(j.jsxs)("div",{itemScope:!0,itemID:n,itemType:"unr:fnk:type/document",children:[d,e.author&&Object(j.jsxs)("div",{className:"adventure-detail-info",children:[Object(j.jsx)(K,Object(l.a)({},e)),Object(j.jsx)(s.b,{to:"/magazine/aboutus",children:"About Us"})]}),Object(j.jsxs)("div",{className:"adventure-detail-content",children:[Object(j.jsx)("img",{className:"adventure-detail-primaryimage",src:"/assets/articles/".concat(t,".jpeg"),alt:d}),Object(j.jsx)("div",{children:a.content})]})]})}function K(e){return Object(j.jsxs)("div",{className:"contributor",children:[Object(j.jsx)("img",{className:"contributor-image",src:"/assets/authors/".concat((t=e.author,t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")),".jpeg"),alt:e.author}),Object(j.jsx)("h3",{className:"contributor-name",children:e.author})]});var t}var U=function(){var e=Object(o.o)().name,t=Object(o.m)(),n=x("urn:fnkconnection:/articles.json:default:name:".concat(e)),r=n.data,c=n.errorMessage;return c?Object(j.jsx)(u,{errorMessage:c}):r?Object(j.jsxs)("div",{className:"adventure-detail",children:[Object(j.jsx)("button",{className:"adventure-detail-close-button",onClick:function(){return t(-1)},children:Object(j.jsx)("img",{className:"Backbutton-icon",src:C,alt:"Return"})}),Object(j.jsx)(G,Object(l.a)({},r))]}):Object(j.jsx)(m,{})};var W=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{className:"Home",children:[Object(j.jsxs)("header",{children:[Object(j.jsx)("a",{href:"/",children:Object(j.jsx)("img",{src:_,className:"logo",alt:"WKND Logo"})}),Object(j.jsx)("hr",{})]}),Object(j.jsx)(s.a,{children:Object(j.jsxs)(o.c,{children:[Object(j.jsx)(o.a,{path:"/adventure/:name",element:Object(j.jsx)(F,{})}),Object(j.jsx)(o.a,{path:"/",element:Object(j.jsx)(E,{})}),Object(j.jsx)(o.a,{path:"/magazine",element:Object(j.jsx)($,{})}),Object(j.jsx)(o.a,{path:"/magazine/:name",element:Object(j.jsx)(U,{})})]})})]})})};n(45);i.a.createRoot(document.getElementById("root")).render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(W,{})}))}},[[46,1,2]]]);
//# sourceMappingURL=main.6136a045.chunk.js.map