(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{192:function(e,t,n){var content=n(197);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(49).default)("571af42b",content,!0,{sourceMap:!1})},196:function(e,t,n){"use strict";var r=n(192);n.n(r).a},197:function(e,t,n){(t=n(48)(!1)).push([e.i,".container{min-height:100vh;margin:0 auto;display:flex;justify-content:center;align-items:center;text-align:center}.title{font-family:Quicksand,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;display:block;font-weight:300;font-size:100px;color:#35495e;letter-spacing:1px}.subtitle{font-weight:300;font-size:42px;color:#526488;word-spacing:5px;padding-bottom:15px}.links{padding-top:15px}",""]),e.exports=t},201:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(15),l=(n(82),r.a.extend({data:function(){return{name:"",email:"",password:"",error:""}},methods:{pressed:function(){var e=this;this.error="",o.auth().createUserWithEmailAndPassword(this.email,this.password).then((function(t){o.auth().signInWithEmailAndPassword(e.email,e.password).then((function(){e.$router.push("/")}))})).catch((function(t){return e.error=t}))}}})),c=(n(196),n(19)),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h1",[e._v("Register")]),e._v(" "),n("form",{on:{submit:function(t){return t.preventDefault(),e.pressed(t)}}},[n("div",{staticClass:"name"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",placeholder:"Nickname"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"login"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",placeholder:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"password"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),n("input",{attrs:{type:"submit",value:"Register"}}),e._v(" "),e.error?n("div",{staticClass:"error"},[e._v(e._s(e.error.message))]):e._e()])])}),[],!1,null,null,null);t.default=component.exports}}]);