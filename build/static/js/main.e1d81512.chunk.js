(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(12),o=t.n(r),c=(t(6),t(2)),i=function(e){e.persons;var n=e.value,t=e.onChange;return u.a.createElement("input",{value:n,onChange:t})},l=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,r=e.handlePersonChange,o=e.handleNumberChange;return u.a.createElement("div",null,u.a.createElement("form",{onSubmit:n},"nimi: ",u.a.createElement("input",{value:t,onChange:r}),u.a.createElement("div",null,"numero: ",u.a.createElement("input",{value:a,onChange:o})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},m=function(e){var n=e.rows,t=e.poista;return n.map(function(e){return u.a.createElement("p",{key:e.id},e.name," ",e.number,u.a.createElement("button",{value:e.id,onClick:t},"poista"))})},s=t(3),f=t.n(s),d="/api/persons",v=function(){return f.a.get(d)},p=function(e){return f.a.post(d,e)},b=function(e){return f.a.delete("".concat(d,"/").concat(e))},g=function(e,n){return f.a.put("".concat(d,"/").concat(e),n)},h=function(e){var n=e.message;return null===n?null:n.includes("Henkil\xf6n")?u.a.createElement("div",{className:"deleted"},n):u.a.createElement("div",{className:"error"},n)},E=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(""),s=Object(c.a)(o,2),f=s[0],d=s[1],E=Object(a.useState)(""),w=Object(c.a)(E,2),j=w[0],C=w[1],N=Object(a.useState)(""),O=Object(c.a)(N,2),k=O[0],P=O[1],S=Object(a.useState)(null),y=Object(c.a)(S,2),D=y[0],H=y[1];Object(a.useEffect)(function(){v().then(function(e){r(e.data)})},[]);var J=k?t.filter(function(e){return e.name.toUpperCase().includes(k.toUpperCase())}):t;return u.a.createElement("div",null,u.a.createElement("h2",null,"Puhelinluettelo"),u.a.createElement(h,{message:D}),"rajaa n\xe4ytett\xe4vi\xe4:"," ",u.a.createElement(i,{value:k,onChange:function(e){P(e.target.value)}}),u.a.createElement("h3",null,"lis\xe4\xe4 uusi"),u.a.createElement(l,{addPerson:function(e){if(e.preventDefault(),t.find(function(e){return e.name===f})){if(window.confirm("".concat(f," on jo luettelossa, korvataanko vanha numero uudella"))){var n=t.find(function(e){return e.name===f}),a={name:f,number:j};g(n.id,a).then(function(e){console.log(e),H("Paivitettiin '".concat(f,"' numero")),r(t.map(function(t){return t.id!==n.id?t:e.data}))}).catch(function(e){H("Henkil\xf6n '".concat(f,"' oli poistettu"))})}}else p({name:f,number:j}).then(function(e){r(t.concat(e.data)),d(""),C("")}),H("Lis\xe4ttiin '".concat(f,"'"))},newName:f,newNumber:j,handlePersonChange:function(e){console.log(e.target.value),d(e.target.value)},handleNumberChange:function(e){console.log(e.target.value),C(e.target.value)}}),u.a.createElement("h2",null,"Numerot"),u.a.createElement(m,{rows:J,poista:function(e){e.preventDefault(),console.log(e.target.value);var n=e.target.value,a=t.find(function(e){return e.id===Number(n)});if(window.confirm("poistetaanko ".concat(a.id))){var u=t.filter(function(e){return e.id!==Number(n)});b(n).then(function(e){r(u)}),H("poistettiin '".concat(a.name,"'"))}}}))};o.a.render(u.a.createElement(E,null),document.getElementById("root"))},6:function(e,n,t){}},[[13,1,2]]]);
//# sourceMappingURL=main.e1d81512.chunk.js.map