(this["webpackJsonpmanga-tracker"]=this["webpackJsonpmanga-tracker"]||[]).push([[0],{57:function(t,e,n){"use strict";n.r(e);var c=n(1),a=n(21),r=n.n(a),i=n(24),s=n(3),o=n(6),l=n.n(o),j=n(2),u=function(t){var e=Object(c.useState)(""),n=Object(s.a)(e,2),a=n[0],r=n[1];return{type:t,value:a,onChange:function(t){r(t.target.value)},onSubmit:function(){r("")}}},d=function(){var t=JSON.parse(localStorage.getItem("loggedInUser"));return{headers:{Authorization:"bearer ".concat(t.token)}}},b=function(t){var e=new Date,n=new Date(t).getTime(),c=(e.getTime()-n)/1e3;return c<60?"just now":c<3600?"".concat(Math.floor(c/60)," minute(s) ago"):c<86400?"".concat(Math.floor(c/3600)," hour(s) ago"):c<2592e3?"".concat(Math.floor(c/86400)," day(s) ago"):c<31104e3?"".concat(Math.floor(c/2592e3)," month(s) ago"):"".concat(Math.floor(c/31104e3)," year(s) ago")},h=n(0),O={textAlign:"center"},x=function(t){var e=Object(c.useState)(""),n=Object(s.a)(e,2),a=n[0],r=n[1],i=Object(c.useState)(!1),o=Object(s.a)(i,2),x=o[0],p=o[1],f=Object(c.useState)(!1),g=Object(s.a)(f,2),m=g[0],v=g[1],S=u("text"),C=u("text"),k="http://localhost:3001/api/manga";Object(c.useEffect)((function(){r(a||t.manga)}),[t,a]);var w=d(),y=function(e){if(e.preventDefault(),"<"===e.target.outerText){var n=Object(j.a)(Object(j.a)({},a),{},{chapter:a.chapter-=1});r(n),l.a.put(k,n,w).then((function(e){r(e.data),t.alert("".concat(e.data.title," moved to previous chapter"))})).catch((function(e){t.alert("Error: ".concat(e))}))}else if(">"===e.target.outerText){var c=Object(j.a)(Object(j.a)({},a),{},{chapter:a.chapter+=1,lastRead:new Date});r(c),l.a.put(k,c,w).then((function(e){r(e.data),t.alert("".concat(e.data.title," moved to next chapter"))})).catch((function(e){t.alert("Error: ".concat(e))}))}},D=function(t){t.preventDefault(),p(!x)},U=function(t){t.preventDefault(),v(!m)};return Object(h.jsxs)("tr",{style:O,children:[Object(h.jsx)("td",{children:a.title||"none"}),Object(h.jsx)("td",{children:b(a.lastRead)}),Object(h.jsxs)("td",{children:[Object(h.jsx)("button",{onClick:y,children:"<"}),"\xa0",a.chapter,"\xa0",Object(h.jsx)("button",{onClick:y,children:">"})]}),Object(h.jsx)("td",{children:x?Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=Object(j.a)(Object(j.a)({},a),{},{link:S.value});l.a.put(k,n,w).then((function(t){r(t.data),S.onSubmit(),p(!x)})).catch((function(e){t.alert("Error: ".concat(e))}))},children:["link: ",Object(h.jsx)("input",Object(j.a)({},S)),Object(h.jsx)("button",{type:"submit",children:"Update"}),Object(h.jsx)("button",{onClick:D,children:"Cancel"})]})}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("a",{href:String(a.link),children:"Go"}),Object(h.jsx)("button",{onClick:D,children:"Update"})]})}),Object(h.jsx)("td",{children:m?Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=Object(j.a)(Object(j.a)({},a),{},{notes:C.value});l.a.put(k,n,w).then((function(t){r(t.data),C.onSubmit(),v(!m)})).catch((function(e){t.alert("Error: ".concat(e))}))},children:[Object(h.jsx)("input",{type:C.type,onChange:C.onChange,onSubmit:C.onSubmit,defaultValue:a.notes}),Object(h.jsx)("button",{type:"submit",children:"Update"}),Object(h.jsx)("button",{onClick:U,children:"Cancel"})]})}):Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("p",{children:[a.notes,Object(h.jsx)("button",{onClick:U,children:"Update"})]})})}),Object(h.jsx)("td",{children:Object(h.jsxs)("select",{onChange:function(e){if(e.preventDefault(),window.confirm("Are you sure you want to mark ".concat(a.title," as ").concat(e.target.value))){var n=Object(j.a)(Object(j.a)({},a),{},{status:e.target.value});l.a.put(k,n,w).then((function(n){r(n.data),t.alert("Setting ".concat(a.title," status to ").concat(e.target.value))})).catch((function(e){t.alert("Error: ".concat(e))}))}},children:[Object(h.jsx)("option",{value:a.status,children:a.status}),"reading"===a.status?null:Object(h.jsx)("option",{value:"reading",children:"reading"}),"finished"===a.status?null:Object(h.jsx)("option",{value:"finished",children:"finished"}),"to start"===a.status?null:Object(h.jsx)("option",{value:"to start",children:"to start"}),"on hold"===a.status?null:Object(h.jsx)("option",{value:"on hold",children:"on hold"})]})}),Object(h.jsx)("td",{})]})},p=function(t){var e=t.add,n=Object(c.useState)(!1),a=Object(s.a)(n,2),r=a[0],i=a[1],o=u("text"),l=u("text"),d=function(){return Object(h.jsx)("button",{onClick:function(t){t.preventDefault(),i(!r)},style:{height:"25px",width:"90px"},children:r?"Close":"Add Manga"})};return Object(h.jsxs)("div",{children:[Object(h.jsx)(d,{}),r?Object(h.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e({title:o.value,link:l.value}),o.onSubmit(),l.onSubmit(),i(!r)},children:["title:",Object(h.jsx)("input",Object(j.a)({},o)),Object(h.jsx)("br",{}),"link:",Object(h.jsx)("input",Object(j.a)({},l)),Object(h.jsx)("button",{type:"submit",children:"Add"})]}):null]})},f=function(t){var e=t.message;return Object(h.jsx)("div",{children:e?Object(h.jsx)("h3",{children:e}):null})},g=function(t){var e=t.data,n=Object(c.useState)(!1),a=Object(s.a)(n,2),r=a[0],i=a[1],o=e.reduce((function(t,e){return t+e.chapter}),0),l=e.length,j=e.filter((function(t){return"finished"===t.status})).length,u=e.filter((function(t){return"reading"===t.status})).length;return Object(h.jsxs)("div",{children:[Object(h.jsx)("button",{onClick:function(){return i(!r)},children:r?"Hide Stats":"Show Stats"}),r?Object(h.jsxs)("div",{children:[Object(h.jsxs)("p",{children:["Chapters read: ",o]}),Object(h.jsxs)("p",{children:["Mangas in collection: ",l]}),Object(h.jsxs)("p",{children:["Mangas finished: ",j]}),Object(h.jsxs)("p",{children:["Mangas current reading: ",u]})]}):null]})},m=function(t){var e=t.setSorter,n=t.sorter;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("label",{children:"Sort by:"}),Object(h.jsxs)("select",{value:n,onChange:function(t){t.preventDefault(),e(t.target.value)},children:[Object(h.jsx)("option",{value:"timedes",children:"Time descending"}),Object(h.jsx)("option",{value:"timeasc",children:"Time ascending"}),Object(h.jsx)("option",{value:"namedes",children:"Name descending"}),Object(h.jsx)("option",{value:"nameasc",children:"Name ascending"})]})]})},v=function(t,e,n){switch(t){case"timedes":return new Date(n.lastRead).getTime()-new Date(e.lastRead).getTime();case"timeasc":return new Date(e.lastRead).getTime()-new Date(n.lastRead).getTime();case"namedes":return e.title.toUpperCase()===n.title.toUpperCase()?0:n.title.toUpperCase()>e.title.toUpperCase()?1:-1;case"nameasc":return e.title.toUpperCase()===n.title.toUpperCase()?0:e.title.toUpperCase()>n.title.toUpperCase()?1:-1}},S=0,C=function(){var t=Object(c.useState)([]),e=Object(s.a)(t,2),n=e[0],a=e[1],r=Object(c.useState)("reading"),i=Object(s.a)(r,2),o=i[0],j=i[1],u=Object(c.useState)(""),b=Object(s.a)(u,2),O=b[0],C=b[1],k=Object(c.useState)("timedes"),w=Object(s.a)(k,2),y=w[0],D=w[1],U=d();Object(c.useEffect)((function(){var t=d();l.a.get("http://localhost:3001/api/manga",t).then((function(t){a(t.data)}))}),[o,O]);var T=function(t){clearTimeout(S),S=setTimeout((function(){C("")}),2500),C(t)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("button",{onClick:function(){return j("reading")},children:"Reading"}),Object(h.jsx)("button",{onClick:function(){return j("to start")},children:"To start"}),Object(h.jsx)("button",{onClick:function(){return j("finished")},children:"Finished"}),Object(h.jsx)("button",{onClick:function(){return j("on hold")},children:"On hold"}),Object(h.jsx)("button",{onClick:function(){return j("")},children:"All"}),"\xa0 currently viewing: \xa0 ",o||"All"]}),Object(h.jsx)("table",{width:"80%",children:Object(h.jsxs)("tbody",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("h3",{children:"Title"})}),Object(h.jsx)("th",{children:Object(h.jsx)("h3",{children:"Last Read"})}),Object(h.jsx)("th",{children:Object(h.jsx)("h3",{children:"Current"})}),Object(h.jsx)("th",{children:"Link"}),Object(h.jsx)("th",{children:"Notes"}),Object(h.jsx)("th",{children:"Status"})]}),n.filter((function(t){return t.status.includes(o)})).sort((function(t,e){return v(y,t,e)})).map((function(t){return Object(h.jsx)(x,{manga:t,alert:function(t){return T(t)}},t._id)}))]})})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("br",{}),Object(h.jsx)(p,{add:function(t){l.a.post("http://localhost:3001/api/manga",t,U).then((function(e){a(e.data),T("Added new manga ".concat(t.title))}))}}),Object(h.jsx)(f,{message:O}),Object(h.jsx)(g,{data:n}),Object(h.jsx)(m,{setSorter:D,sorter:y})]})]})},k=n(10),w=n.n(k),y=n(22),D=n(6),U=function(t){var e=t.onLogin,n=u("text"),c=u("password"),a=function(){var t=Object(y.a)(w.a.mark((function t(a){var r;return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,t.next=4,D.post("http://localhost:3001/api/login",{username:n.value,password:c.value});case 4:r=t.sent,window.localStorage.setItem("loggedInUser",JSON.stringify(r.data)),e(),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),console.log(a);case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}();return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Login"}),Object(h.jsxs)("form",{onSubmit:a,children:["username:",Object(h.jsx)("input",Object(j.a)({},n)),Object(h.jsx)("br",{}),"password:",Object(h.jsx)("input",Object(j.a)({},c)),Object(h.jsx)("br",{}),Object(h.jsx)("button",{type:"submit",children:"Login"})]})]})},T=function(){var t=Object(c.useState)("loading..."),e=Object(s.a)(t,2),n=e[0],a=e[1];Object(c.useEffect)((function(){try{var t=localStorage.getItem("loggedInUser"),e={headers:{Authorization:"bearer ".concat(JSON.parse(t).token)}};l.a.get("http://localhost:3001/api/users/verify",e).then((function(e){"valid"===e.data?a(JSON.parse(t)):a(null)})).catch((function(t){a(null)}))}catch(n){a(null)}}),[]);return Object(h.jsx)(h.Fragment,{children:n?"loading..."===n?Object(h.jsx)("p",{children:n}):Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Manga Tracker"}),Object(h.jsxs)("p",{children:["Logged in as 'user name' ",Object(h.jsx)("button",{onClick:function(){return localStorage.removeItem("loggedInUser"),void a(null)},children:"logout"})]}),Object(h.jsx)(C,{})]}):Object(h.jsx)(U,{onLogin:function(){var t=localStorage.getItem("loggedInUser");t&&a(JSON.parse(t))}})})};r.a.render(Object(h.jsx)(i.a,{children:Object(h.jsx)(T,{})}),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.95ea6843.chunk.js.map