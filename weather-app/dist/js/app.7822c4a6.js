(function(t){function a(a){for(var s,n,o=a[0],c=a[1],l=a[2],p=0,h=[];p<o.length;p++)n=o[p],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&h.push(r[n][0]),r[n]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(a);while(h.length)h.shift()();return i.push.apply(i,l||[]),e()}function e(){for(var t,a=0;a<i.length;a++){for(var e=i[a],s=!0,o=1;o<e.length;o++){var c=e[o];0!==r[c]&&(s=!1)}s&&(i.splice(a--,1),t=n(n.s=e[0]))}return t}var s={},r={app:0},i=[];function n(a){if(s[a])return s[a].exports;var e=s[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=s,n.d=function(t,a,e){n.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,a){if(1&a&&(t=n(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var s in t)n.d(e,s,function(a){return t[a]}.bind(null,s));return e},n.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(a,"a",a),a},n.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},n.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=a,o=o.slice();for(var l=0;l<o.length;l++)a(o[l]);var u=c;i.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"04d0":function(t,a,e){t.exports=e.p+"img/icn-light-rain.af6679d1.svg"},"1e8e":function(t,a,e){},2134:function(t,a,e){t.exports=e.p+"img/cloudy.87732b22.jpg"},2381:function(t,a,e){t.exports=e.p+"img/thunderstorm.9260fa60.jpg"},"2c5f":function(t,a,e){},"30e7":function(t,a,e){},"33b9":function(t,a,e){t.exports=e.p+"img/partly-cloudy.5423aa4c.jpg"},"35a6":function(t,a,e){var s={"./App":"3dfd","./App.vue":"3dfd","./assets/css/_cards.scss":"c059","./assets/css/_form.scss":"dd90","./assets/css/_mixins.scss":"30e7","./assets/css/_structure.scss":"2c5f","./assets/css/_type.scss":"b453","./assets/css/_variables.scss":"1e8e","./assets/css/styles.scss":"bf3b","./assets/images/cloudy.jpg":"2134","./assets/images/fog.jpg":"d6d9","./assets/images/hvy-rain.jpg":"971e","./assets/images/icn-cloudy.svg":"6c60","./assets/images/icn-fog.svg":"f0f8","./assets/images/icn-hvy-rain.svg":"741c","./assets/images/icn-light-rain.svg":"04d0","./assets/images/icn-partly-cloudy.svg":"8b02","./assets/images/icn-snow.svg":"e8ad","./assets/images/icn-sunny.svg":"ad49","./assets/images/icn-thunderstorm.svg":"d746","./assets/images/icn-windy.svg":"4dcc","./assets/images/light-rain.jpg":"3b43","./assets/images/partly-cloudy.jpg":"33b9","./assets/images/snow.jpg":"a6f8","./assets/images/sunny.jpg":"54d6","./assets/images/thunderstorm.jpg":"2381","./main":"56d7","./main.js":"56d7"};function r(t){var a=i(t);return e(a)}function i(t){if(!e.o(s,t)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return s[t]}r.keys=function(){return Object.keys(s)},r.resolve=i,t.exports=r,r.id="35a6"},"3b43":function(t,a,e){t.exports=e.p+"img/light-rain.45fdd295.jpg"},"3dfd":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"app"}},[s("h1",[t._v("5 day forecast")]),s("section",{attrs:{"aria-label":"Search for your a five day forecast"}},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"sr-only",attrs:{for:"search"}},[t._v("Location")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.city_query,expression:"city_query"}],attrs:{type:"text",name:"search",id:"search",placeholder:"City"},domProps:{value:t.city_query},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.fetchForecast(a)},input:function(a){a.target.composing||(t.city_query=a.target.value)}}}),s("label",{staticClass:"sr-only",attrs:{for:"state"}},[t._v("Select state")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.state_query,expression:"state_query"}],attrs:{id:"state",name:"state",placeholder:"State"},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.fetchForecast(a)},change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.state_query=a.target.multiple?e:e[0]}}},[s("option",{staticClass:"disabled selected",attrs:{value:""}},[t._v("State")]),s("option",{attrs:{value:"AL"}},[t._v("Alabama")]),s("option",{attrs:{value:"AK"}},[t._v("Alaska")]),s("option",{attrs:{value:"AZ"}},[t._v("Arizona")]),s("option",{attrs:{value:"AR"}},[t._v("Arkansas")]),s("option",{attrs:{value:"CA"}},[t._v("California")]),s("option",{attrs:{value:"CO"}},[t._v("Colorado")]),s("option",{attrs:{value:"CT"}},[t._v("Connecticut")]),s("option",{attrs:{value:"DE"}},[t._v("Delaware")]),s("option",{attrs:{value:"DC"}},[t._v("District Of Columbia")]),s("option",{attrs:{value:"FL"}},[t._v("Florida")]),s("option",{attrs:{value:"GA"}},[t._v("Georgia")]),s("option",{attrs:{value:"HI"}},[t._v("Hawaii")]),s("option",{attrs:{value:"ID"}},[t._v("Idaho")]),s("option",{attrs:{value:"IL"}},[t._v("Illinois")]),s("option",{attrs:{value:"IN"}},[t._v("Indiana")]),s("option",{attrs:{value:"IA"}},[t._v("Iowa")]),s("option",{attrs:{value:"KS"}},[t._v("Kansas")]),s("option",{attrs:{value:"KY"}},[t._v("Kentucky")]),s("option",{attrs:{value:"LA"}},[t._v("Louisiana")]),s("option",{attrs:{value:"ME"}},[t._v("Maine")]),s("option",{attrs:{value:"MD"}},[t._v("Maryland")]),s("option",{attrs:{value:"MA"}},[t._v("Massachusetts")]),s("option",{attrs:{value:"MI"}},[t._v("Michigan")]),s("option",{attrs:{value:"MN"}},[t._v("Minnesota")]),s("option",{attrs:{value:"MS"}},[t._v("Mississippi")]),s("option",{attrs:{value:"MO"}},[t._v("Missouri")]),s("option",{attrs:{value:"MT"}},[t._v("Montana")]),s("option",{attrs:{value:"NE"}},[t._v("Nebraska")]),s("option",{attrs:{value:"NV"}},[t._v("Nevada")]),s("option",{attrs:{value:"NH"}},[t._v("New Hampshire")]),s("option",{attrs:{value:"NJ"}},[t._v("New Jersey")]),s("option",{attrs:{value:"NM"}},[t._v("New Mexico")]),s("option",{attrs:{value:"NY"}},[t._v("New York")]),s("option",{attrs:{value:"NC"}},[t._v("North Carolina")]),s("option",{attrs:{value:"ND"}},[t._v("North Dakota")]),s("option",{attrs:{value:"OH"}},[t._v("Ohio")]),s("option",{attrs:{value:"OK"}},[t._v("Oklahoma")]),s("option",{attrs:{value:"OR"}},[t._v("Oregon")]),s("option",{attrs:{value:"PA"}},[t._v("Pennsylvania")]),s("option",{attrs:{value:"RI"}},[t._v("Rhode Island")]),s("option",{attrs:{value:"SC"}},[t._v("South Carolina")]),s("option",{attrs:{value:"SD"}},[t._v("South Dakota")]),s("option",{attrs:{value:"TN"}},[t._v("Tennessee")]),s("option",{attrs:{value:"TX"}},[t._v("Texas")]),s("option",{attrs:{value:"UT"}},[t._v("Utah")]),s("option",{attrs:{value:"VT"}},[t._v("Vermont")]),s("option",{attrs:{value:"VA"}},[t._v("Virginia")]),s("option",{attrs:{value:"WA"}},[t._v("Washington")]),s("option",{attrs:{value:"WV"}},[t._v("West Virginia")]),s("option",{attrs:{value:"WI"}},[t._v("Wisconsin")]),s("option",{attrs:{value:"WY"}},[t._v("Wyoming")])]),s("button",{staticClass:"searchBtn",on:{click:t.fetchForecast}},[t._v("Search")])]),(t.error,s("div",{class:[{"error-show":null!=t.error},"error"]},[s("p",[t._v(t._s(t.error))])])),s("div",{staticClass:"card-wrapper"},t._l(t.weatherData,(function(a,r){return s("div",{key:a.list,staticClass:"card",class:[0===r?"js-big current":"js-small",""+a.background],on:{mouseenter:t.onHover}},[s("div",{staticClass:"card-header"},[s("time",[t._v(t._s(a.dt_txt))]),s("p",{staticClass:"location"},[t._v(t._s(t.location))])]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"temp main-temp"},[t._v(t._s(a.main.temp))]),s("p",{staticClass:"description"},[t._v(t._s(a.weather[0].description))]),s("inline-svg",{attrs:{src:e("35a6")(""+a.weather[0].icon)}}),s("p",{staticClass:"precip"},[t._v(t._s(a.pop)+"% chance of rain")]),s("p",{staticClass:"temp feels-temp"},[t._v("Feels like "+t._s(a.main.feels_like))]),s("p",{staticClass:"humidity"},[t._v("Humidity: "+t._s(a.main.humidity)+"%")])],1)])})),0)]),t._m(0)])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("footer",[e("p",[t._v("Images from "),e("a",{attrs:{href:"unsplash.com",title:"Unsplash, photos for everyone",target:"_blank"}},[t._v("unsplash.com")])]),e("p",[t._v("Icons made by "),e("a",{attrs:{href:"https://www.flaticon.com/free-icon/cloud_3313884",title:"bqlqn",target:"_blank"}},[t._v("bqlqn")]),t._v(" from "),e("a",{attrs:{href:"https://www.flaticon.com/",target:"_blank",title:"Flaticon"}},[t._v(" www.flaticon.com")])])])}],i=(e("99af"),e("d3b7"),e("ac1f"),e("1276"),{name:"App",data:function(){return{api_key:"4de4a8d80078d333a4a72f1c11d87820",forecast_url:"https://api.openweathermap.org/data/2.5/",weatherData:[],city_query:"",state_query:"",location:"",error:null}},methods:{fetchForecast:function(){var t=this;this.error=null,""==!this.state_query&&""==!this.city_query||null==!this.city_query?fetch("".concat(this.forecast_url,"forecast?q=").concat(this.city_query,",").concat(this.state_query,",US&appid=").concat(this.api_key,"&units=imperial")).then((function(a){if(a.ok)return a.json();t.error=a.status})).then(this.storeData).catch((function(a){404===t.error&&(t.error="Oops looks like something went wrong. Please try again",console.error("Error:",a))})):""==this.city_query||" "==this.city_query||null==this.city_query?this.error="Please enter a city":""!=this.state_query&&" "!=this.state_query&&"state"!=this.state_query||(this.error="Please enter a state")},storeData:function(t){if(this.weatherData=[],null!=t.list){for(var a=0;a<t.list.length;a+=8)this.weatherData.push(t.list[a]);for(var e=0;e<this.weatherData.length;e++){var s=parseInt(this.weatherData[e].main.temp),r=parseInt(this.weatherData[e].main.temp_min),i=parseInt(this.weatherData[e].main.temp_max),n=parseInt(this.weatherData[e].main.feels_like),o=new Date(this.weatherData[e].dt_txt.split(" ")[0]).toDateString().split(" 2020")[0],c=100*this.weatherData[e].pop;"01d"==this.weatherData[e].weather[0].icon||"01n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-sunny.svg",this.weatherData[e].background="background--sunny"):"02d"==this.weatherData[e].weather[0].icon||"02n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-partly-cloudy.svg",this.weatherData[e].background="background--partly-cloudy"):"03d"==this.weatherData[e].weather[0].icon||"03n"==this.weatherData[e].weather[0].icon||"04d"==this.weatherData[e].weather[0].icon||"04n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-cloudy.svg",this.weatherData[e].background="background--cloudy"):"09d"==this.weatherData[e].weather[0].icon||"09n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-light-rain.svg",this.weatherData[e].background="background--lt-rain"):"10d"==this.weatherData[e].weather[0].icon||"10n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-hvy-rain.svg",this.weatherData[e].background="background--hvy-rain"):"11d"==this.weatherData[e].weather[0].icon||"11n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-thunderstorm.svg",this.weatherData[e].background="background--thunderstorm.jpg"):"13d"==this.weatherData[e].weather[0].icon||"13n"==this.weatherData[e].weather[0].icon?(this.weatherData[e].weather[0].icon="./assets/images/icn-snow.svg",this.weatherData[e].background="background--snow"):"50d"!=this.weatherData[e].weather[0].icon&&"50n"!=this.weatherData[e].weather[0].icon||(this.weatherData[e].weather[0].icon="./assets/images/icn-fog.svg",this.weatherData[e].background="background--fog"),this.location=this.city_query+", "+this.state_query,this.weatherData[e].main.temp=s,this.weatherData[e].main.temp_min=r,this.weatherData[e].main.temp_max=i,this.weatherData[e].main.feels_like=n,this.weatherData[e].dt_txt=o,this.weatherData[e].pop=c}}},onHover:function(t){var a=document.querySelector(".current"),e=document.querySelectorAll(".card");if(t.target.classList.contains("js-small")){for(var s=0;s<e.length;s++)e[s].classList.remove("js-big"),e[s].classList.add("js-small");t.target.classList.remove("js-small"),t.target.classList.add("js-big"),a.classList.contains("js-big")&&(a.classList.remove("js-big"),a.classList.add("js-small"))}t.target.classList.contains("current")&&t.target.classList.contains("js-small")&&(t.target.classList.add("js-big"),t.target.classList.remove("js-small"))}}}),n=i,o=(e("5c0b"),e("2877")),c=Object(o["a"])(n,s,r,!1,null,null,null);a["default"]=c.exports},"4dcc":function(t,a,e){t.exports=e.p+"img/icn-windy.ff13f508.svg"},"54d6":function(t,a,e){t.exports=e.p+"img/sunny.5652dd24.jpg"},"56d7":function(t,a,e){"use strict";e.r(a);e("e260"),e("e6cf"),e("cca6"),e("a79d");var s=e("2b0e"),r=e("3dfd"),i=e("6d5e"),n=e.n(i);s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(r["default"])}}).$mount("#app"),s["a"].component("inline-svg",n.a)},"5c0b":function(t,a,e){"use strict";var s=e("9c0c"),r=e.n(s);r.a},"6c60":function(t,a,e){t.exports=e.p+"img/icn-cloudy.b3b5eaf2.svg"},"741c":function(t,a,e){t.exports=e.p+"img/icn-hvy-rain.446c9cba.svg"},"8b02":function(t,a,e){t.exports=e.p+"img/icn-partly-cloudy.c1699aba.svg"},"971e":function(t,a,e){t.exports=e.p+"img/hvy-rain.b3aa76bf.jpg"},"9c0c":function(t,a,e){},a6f8:function(t,a,e){t.exports=e.p+"img/snow.6c71676d.jpg"},ad49:function(t,a,e){t.exports=e.p+"img/icn-sunny.b9812621.svg"},b453:function(t,a,e){},bf3b:function(t,a,e){},c059:function(t,a,e){},d6d9:function(t,a,e){t.exports=e.p+"img/fog.270bca52.jpg"},d746:function(t,a,e){t.exports=e.p+"img/icn-thunderstorm.f32b0173.svg"},dd90:function(t,a,e){},e8ad:function(t,a,e){t.exports=e.p+"img/icn-snow.bb4cb4c2.svg"},f0f8:function(t,a,e){t.exports=e.p+"img/icn-fog.01e4a93c.svg"}});
//# sourceMappingURL=app.7822c4a6.js.map