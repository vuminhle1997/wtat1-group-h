(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{105:function(e,t,a){e.exports=a(139)},110:function(e,t,a){},137:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),c=a.n(o),l=(a(110),a(8)),i=a.n(l),u=a(14),s=a(5),m=a(40),d=a(12),p=a(94),f=a(188),g=a(170),h=a(173),b=a(175),v=a(176),E=a(192),O=a(180),y=a(190),j=a(141),w=a(181),C=a(16),S=a.n(C),k=a(17),x=a.n(k),T=Object(g.a)({root:{paddingTop:"3em"},wrapper:{padding:"1em 0","& .MuiFormControl-root":{padding:".75em 0 .5em 0"}}});function M(e){var t=e.setAppState,a=Object(d.f)(),o=T(),c=Object(n.useState)(localStorage.getItem("email")||""),l=Object(s.a)(c,2),m=l[0],p=l[1],f=Object(n.useState)(localStorage.getItem("password")||""),g=Object(s.a)(f,2),C=g[0],k=g[1],M=Object(n.useState)(!1),A=Object(s.a)(M,2),B=A[0],I=A[1],F=Object(n.useState)("true"===localStorage.getItem("rememberMe")),N=Object(s.a)(F,2),L=N[0],P=N[1];Object(n.useEffect)((function(){return function(){console.log("clears landingpage")}}),[]),Object(n.useEffect)((function(){}),[B]);var W=function(){var e=Object(u.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={user:{email:m,password:C}},e.next=3,S.a.post("http://localhost:5000/api/v1.0/users/login",a).then((function(e){console.log(e),200===e.status&&(I(!1),x.a.set("authToken",e.data.token),t(1),setTimeout((function(){t(2)}),1e3))})).catch((function(e){console.log(e),I(!0)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{className:o.root},r.a.createElement(b.a,{container:!0},r.a.createElement(b.a,{item:!0,xs:8},r.a.createElement("div",null,"big image")),r.a.createElement(b.a,{item:!0,xs:4,className:o.wrapper},r.a.createElement(v.a,null,r.a.createElement("div",{className:"covid-logo-app"},"LOGO"),r.a.createElement(E.a,{label:"Email",variant:"outlined",value:m,onChange:function(e){return p(e.target.value)}}),r.a.createElement(E.a,{label:"Password",type:"password",value:C,variant:"outlined",onChange:function(e){return k(e.target.value)}}),r.a.createElement(O.a,{control:r.a.createElement(y.a,{checked:L,onChange:function(e){!0===e.target.checked?(localStorage.setItem("email",m),localStorage.setItem("password",C)):localStorage.clear(),localStorage.setItem("rememberMe",e.target.checked),P(e.target.checked)}}),label:"Remember me"}),B?r.a.createElement(j.a,{variant:"subtitle2"},"Your email or password is wrong. Please try again!"):"",r.a.createElement(b.a,{container:!0},r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(w.a,{variant:"contained",color:"primary",onClick:W},"Login")),r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(w.a,{variant:"contained",color:"secondary",onClick:function(){return a.push("/register")}},"Register"))))))))}var A=a(182),B=a(179),I=a(194),F=a(189),N=a(195);function L(e,t){for(var a=[],n=e;n<=t;n++)a.push(n);return a}var P=L(1,31),W=L(1,12),_=L(1970,2020),D=Object(g.a)({root:{padding:"2em"},wrapper:{padding:"2em","& .MuiFormControl-root":{padding:".75em 0 .5em 0"}},back:{position:"fixed",top:"0.5em",left:"0.5em"}});function z(e){var t=e.setAppState;navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){p(e.coords.latitude),y(e.coords.longitude)}));var a=Object(d.f)(),o=D(),c=Object(n.useState)(0),l=Object(s.a)(c,2),m=l[0],p=l[1],f=Object(n.useState)(0),g=Object(s.a)(f,2),O=g[0],y=g[1],C=Object(n.useState)(""),k=Object(s.a)(C,2),T=k[0],M=k[1],L=Object(n.useState)(""),z=Object(s.a)(L,2),R=z[0],U=z[1],Y=Object(n.useState)(""),G=Object(s.a)(Y,2),H=G[0],J=G[1],V=Object(n.useState)(""),q=Object(s.a)(V,2),X=q[0],Z=q[1],$=Object(n.useState)(""),K=Object(s.a)($,2),Q=K[0],ee=K[1],te=Object(n.useState)(""),ae=Object(s.a)(te,2),ne=ae[0],re=ae[1],oe=Object(n.useState)(1),ce=Object(s.a)(oe,2),le=ce[0],ie=ce[1],ue=Object(n.useState)(1),se=Object(s.a)(ue,2),me=se[0],de=se[1],pe=Object(n.useState)(2020),fe=Object(s.a)(pe,2),ge=fe[0],he=fe[1],be=Object(n.useState)(""),ve=Object(s.a)(be,2),Ee=ve[0],Oe=ve[1],ye=Object(n.useState)(""),je=Object(s.a)(ye,2),we=je[0],Ce=je[1],Se=Object(n.useState)(""),ke=Object(s.a)(Se,2),xe=ke[0],Te=ke[1],Me=Object(n.useState)(null),Ae=Object(s.a)(Me,2),Be=Ae[0],Ie=Ae[1],Fe=Object(n.useState)(!1),Ne=Object(s.a)(Fe,2),Le=Ne[0],Pe=Ne[1],We=Object(n.useState)(!1),_e=Object(s.a)(We,2),De=_e[0],ze=_e[1];Object(n.useEffect)((function(){}),[Le,De]);var Re=function(){var e=Object(u.a)(i.a.mark((function e(){var n,r,o,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(Q===ne&&Q.length>8)){e.next=7;break}return n=le>=1&&le<10?"0".concat(le):le,r=me>=1&&me<10?"0".concat(me):me,o="".concat(n,"/").concat(r,"/").concat(ge),c={user:{username:T,password:Q,firstname:R,lastname:H,gender:Ee,dob:o,personalId:we,email:X,address:xe,phonenumber:Be,latitude:m,longitude:O,role:"User"}},e.next=7,S.a.post("http://localhost:5000/api/v1.0/users/create",c).then((function(e){200===e.status&&(x.a.set("authToken",e.data.token),ze(!0),Pe(!1),t(1),setTimeout((function(){return a.push("/")}),1500))})).catch((function(e){Pe(!0),ze(!1)}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,{color:"primary",onClick:function(){return a.push("/")},className:o.back},r.a.createElement("div",{dangerouslySetInnerHTML:{__html:"<"}})),r.a.createElement(h.a,{className:o.wrapper},r.a.createElement(v.a,null,r.a.createElement(E.a,{label:"Username *",variant:"outlined",onChange:function(e){return M(e.target.value)}}),r.a.createElement(b.a,{container:!0,spacing:2},r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(E.a,{label:"Firstname *",fullWidth:!0,variant:"outlined",onChange:function(e){return U(e.target.value)}})),r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(E.a,{label:"Lastname *",variant:"outlined",fullWidth:!0,onChange:function(e){return J(e.target.value)}}))),r.a.createElement(E.a,{label:"Email *",type:"email",variant:"outlined",onChange:function(e){return Z(e.target.value)}}),r.a.createElement(E.a,{label:"Password *",type:"password",variant:"outlined",onChange:function(e){return ee(e.target.value)}}),r.a.createElement(E.a,{label:"Confirm password *",type:"password",variant:"outlined",onChange:function(e){return re(e.target.value)}}),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Gender *"),r.a.createElement(F.a,{value:Ee,variant:"outlined",onChange:function(e){return Oe(e.target.value)}},r.a.createElement(N.a,{value:"Male"},"Male"),r.a.createElement(N.a,{value:"Female"},"Female"),r.a.createElement(N.a,{value:"Misc"},"Not listed"))),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Birthday *"),r.a.createElement(F.a,{value:le,variant:"outlined",onChange:function(e){return ie(e.target.value)}},P.map((function(e){return r.a.createElement(N.a,{key:"day-".concat(e),value:e},e)})))),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Birthmonth *"),r.a.createElement(F.a,{value:me,variant:"outlined",onChange:function(e){return de(e.target.value)}},W.map((function(e){return r.a.createElement(N.a,{key:"month-".concat(e),value:e},e)})))),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Birthyear *"),r.a.createElement(F.a,{value:ge,variant:"outlined",onChange:function(e){return he(e.target.value)}},_.map((function(e){return r.a.createElement(N.a,{key:"year-".concat(e),value:e},e)})))),r.a.createElement(E.a,{label:"Personal ID *",variant:"outlined",onChange:function(e){return Ce(e.target.value)}}),r.a.createElement(E.a,{label:"Address",variant:"outlined",onChange:function(e){return Te(e.target.value)}}),r.a.createElement(E.a,{label:"Phonenumber",variant:"outlined",onChange:function(e){return Ie(e.target.value)}}),r.a.createElement(w.a,{variant:"contained",color:"secondary",onClick:Re},"Register")),Le?r.a.createElement(j.a,{variant:"body2"},"Something went wrong"):"",De?r.a.createElement(j.a,{variant:"body1"},"Successful registed. You will be redirected . . ."):""))}a(137);function R(){return r.a.createElement("div",null)}var U=a(183),Y=a(184),G=a(142),H=a(95),J=a(89),V=a.n(J),q=a(90),X=a.n(q),Z=Object(g.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function $(e){var t=e.handleLogout,a=Z(),n=Object(d.f)(),o=r.a.useState(null),c=Object(s.a)(o,2),l=c[0],i=c[1],u=Boolean(l);return r.a.createElement("div",{className:a.root},r.a.createElement(U.a,{position:"static"},r.a.createElement(Y.a,null,r.a.createElement(G.a,{edge:"start",className:a.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(V.a,null)),r.a.createElement(j.a,{variant:"h6",className:a.title},"COVID-19"),r.a.createElement(G.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){i(e.currentTarget)},color:"inherit"},r.a.createElement(X.a,null)),r.a.createElement(H.a,{anchorEl:l,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:u,onClose:function(){i(null)}},r.a.createElement(N.a,{onClick:function(){n.push("/profile")}},"Profile"),r.a.createElement(N.a,{onClick:t},"Logout")))))}var K=a(191),Q=a(185),ee=a(186),te=Object(g.a)({root:{display:"block"},div:{margin:".5em auto"}});function ae(e){var t=e.report,a=(e.index,te());return r.a.createElement(K.a,{className:a.div,key:t._id},r.a.createElement(Q.a,{expandIcon:"x"},r.a.createElement(j.a,null,"Report of User: ","".concat(t.submitter))),r.a.createElement(ee.a,{className:a.root},r.a.createElement(j.a,{variant:"caption"},"Submitted on: ",r.a.createElement(j.a,{variant:"body1"},t.date)),r.a.createElement(j.a,{variant:"caption"},"Details: ",r.a.createElement(j.a,{variant:"body1"},t.details)),r.a.createElement(j.a,{variant:"caption"},"Precondition: ",r.a.createElement(j.a,{variant:"body1"},t.precondition)),r.a.createElement(j.a,{variant:"caption"},"Symptoms: ",r.a.createElement(j.a,{variant:"body1"},t.symptoms)),r.a.createElement(j.a,{variant:"caption"},"From infected area:",r.a.createElement(j.a,{variant:"body1"},t.infected_area?"yes":"no")),r.a.createElement(j.a,{variant:"caption"},"Infected from a person: ",r.a.createElement(j.a,{variant:"body1"},t.person_from_infected?"yes":"no")),r.a.createElement(j.a,{variant:"caption"},"Infected: ",r.a.createElement(j.a,{variant:"body1"},t.infected_person?"yes":"no"))))}var ne=a(97),re=a(91),oe=a(92),ce=a(96),le=a(98),ie=[{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#263c3f"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#6b9a76"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#212a37"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#9ca5b3"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#746855"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#1f2835"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#f3d19c"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#515c6d"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}],ue=function(e){Object(le.a)(a,e);var t=Object(ce.a)(a);function a(e){var n;return Object(re.a)(this,a),(n=t.call(this,e)).googleMapRef=r.a.createRef(),n.createGoogleMap=function(){var e=n.props,t=e.lat,a=e.lng;return new window.google.maps.Map(n.googleMapRef.current,{zoom:10,center:{lat:t||52.503325,lng:a||13.426746},styles:ie})},n.drawCircles=function(){var e=n.state,t=e.infectedAreas,a=e.infectedCountries;t.length>0&&t.map((function(e){n.drawInfectedAreaCircle(e)})),a.length>0&&a.map((function(e){var t=e.active,a=e.countryInfo;n.drawInfectedArea({lat:a.lat,lng:a.long},t)}))},n.fetchAreasByBounds=function(){var e=Object(u.a)(i.a.mark((function e(t,a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("http://localhost:5000/api/v1.0/areas?minLat=".concat(t.min,"&maxLat=").concat(t.max,"&minLng=").concat(a.min,"&maxLng=").concat(a.max)).then((function(e){e.data.length>0&&(console.log(e.data),e.data.forEach((function(e){var t=Object(ne.a)(n.state.infectedAreas);t.some((function(t){return t._id===e._id}))||t.push(e),n.setState({infectedAreas:t})})))})).catch((function(e){console.error(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.deleteCirclesOutOfBounds=function(e,t){var a=[];n.state.infectedAreas.forEach((function(n,r){n.latitude>=e.min&&n.latitude<=e.max&&n.longitude>=t.min&&n.longitude<=t.max&&a.push(n)})),n.setState({infectedAreas:a})},n.onMapChange=function(){var e=n.state.googleMap;e.addListener("dragend",(function(){var t={min:e.getBounds().Ya.i,max:e.getBounds().Ya.j},a={min:e.getBounds().Ua.i,max:e.getBounds().Ua.j};n.deleteCirclesOutOfBounds(t,a),n.fetchAreasByBounds(t,a)})),e.addListener("zoom_changed",(function(){var t={min:e.getBounds().Ya.i,max:e.getBounds().Ya.j},a={min:e.getBounds().Ua.i,max:e.getBounds().Ua.j};n.deleteCirclesOutOfBounds(t,a),n.fetchAreasByBounds(t,a)}))},n.createMarker=function(e){return new window.google.maps.Marker({position:e,map:n.state.googleMap})},n.createCircle=function(e){return new window.google.maps.Circle({strokeColor:"#FF0000",strokeOpacity:.4,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,map:n.state.googleMap,center:e,radius:15e6})},n.drawInfectedArea=function(e,t,a){var r=1100*Math.sqrt(t);return new window.google.maps.Circle({strokeColor:"#FF0000",strokeOpacity:.05,strokeWeight:1,fillColor:"#FF0000",fillOpacity:.35,map:n.state.googleMap,center:e,radius:r})},n.drawInfectedAreaCircle=function(e){return new window.google.maps.Circle({strokeColor:"#FF0000",strokeOpacity:.4,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,map:n.state.googleMap,center:{lat:e.latitude,lng:e.longitude},radius:15e3})},n.fetchData=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="https://corona.lmao.ninja/v2/countries/",["Vietnam","Germany","USA","FR","Thailand"].forEach((function(e){t+=e+"%2C"})),e.next=5,S.a.get(t).then((function(e){n.setState({infectedCountries:e.data},(function(){return console.log(n.state.infectedCountries)}))})).catch((function(e){console.error(e)}));case 5:n.drawCircles();case 6:case"end":return e.stop()}}),e)}))),n.state={googleMap:null,infectedAreas:[],infectedCountries:[]},n}return Object(oe.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=document.createElement("script");t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlcik1-nD4XiC1ryjEF6JjZO39hsrHP84",window.document.body.appendChild(t),t.addEventListener("load",(function(){e.state.googleMap=e.createGoogleMap(),e.onMapChange(),e.fetchData()}))}},{key:"componentDidUpdate",value:function(){this.drawCircles()}},{key:"render",value:function(){return r.a.createElement("div",{id:"map",ref:this.googleMapRef,style:{width:"400px",height:"300px"}})}}]),a}(n.Component),se=a(93),me=a.n(se),de=a(140),pe=a(187),fe=Object(g.a)((function(e){return{overlay:{background:"rgba(50,50,50, 0.65)",width:"100vw",height:"100vh",position:"fixed",top:0,left:0},root:{position:"relative",top:"1.5em"},paper:{},select:{width:"100%"},wrapper:{width:"85%",margin:"0 auto",padding:"1em 0","& .MuiFormControl-root":{padding:"1em 0 .5em 0"}},headline:{textAlign:"center",padding:"10px 0"},button:{margin:".75em 1em"},backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}}));function ge(e){var t=e.handleClose,a=(e.openReportForm,fe()),o=Object(n.useState)(""),c=Object(s.a)(o,2),l=c[0],m=c[1],d=Object(n.useState)(""),p=Object(s.a)(d,2),f=p[0],g=p[1],v=Object(n.useState)(""),O=Object(s.a)(v,2),y=O[0],C=O[1],k=Object(n.useState)(!1),T=Object(s.a)(k,2),M=T[0],A=T[1],L=Object(n.useState)(!1),P=Object(s.a)(L,2),W=P[0],_=P[1],D=Object(n.useState)(0),z=Object(s.a)(D,2),R=z[0],U=z[1],Y=Object(n.useState)(0),G=Object(s.a)(Y,2),H=G[0],J=G[1],V=Object(n.useState)(!1),q=Object(s.a)(V,2),X=q[0],Z=q[1];navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){U(e.coords.latitude),J(e.coords.longitude)}));var $=function(){var e=Object(u.a)(i.a.mark((function e(){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={headers:{Authorization:"Bearer ".concat(x.a.get("authToken"))}},n={report:{latitude:R,longitude:H,symptoms:l,precondition:f,infected_area:W,person_from_infected:M,date:new Date,details:y}},e.next=4,Z(!0);case 4:return e.next=6,S.a.post("http://localhost:5000/api/v1.0/reports/report",n,a).then((function(e){console.log(e),setTimeout((function(){return t()}),1500)})).catch((function(e){console.log(e),Z(!1)}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.overlay},r.a.createElement(h.a,{className:a.root},r.a.createElement(de.a,{elevation:3},r.a.createElement(j.a,{className:a.headline,variant:"h4"},"Submit report"),r.a.createElement(pe.a,null),r.a.createElement("div",{className:a.wrapper},r.a.createElement(E.a,{label:"Symptoms",variant:"outlined",fullWidth:!0,onChange:function(e){return m(e.target.value)}}),r.a.createElement(E.a,{label:"Precondition",variant:"outlined",fullWidth:!0,onChange:function(e){return g(e.target.value)}}),r.a.createElement(E.a,{label:"Details",multiline:!0,rows:4,rowsMax:10,variant:"outlined",fullWidth:!0,onChange:function(e){return C(e.target.value)}}),r.a.createElement(b.a,{container:!0},r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(B.a,{fullWidth:!0},r.a.createElement(I.a,null,"Contacted with infected person"),r.a.createElement(F.a,{value:M,variant:"outlined",autoWidth:!0,onChange:function(e){return A(e.target.value)}},r.a.createElement(N.a,{value:!0},"Yes"),r.a.createElement(N.a,{value:!1},"No")))),r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(B.a,{fullWidth:!0},r.a.createElement(I.a,null,"Came from infected area"),r.a.createElement(F.a,{value:W,variant:"outlined",autoWidth:!0,onChange:function(e){return _(e.target.value)}},r.a.createElement(N.a,{value:!0},"Yes"),r.a.createElement(N.a,{value:!1},"No"))))),r.a.createElement(j.a,{variant:"body1"},"The app needs to localize your current location for submitting the report. Please accept the permission, so the app can access your current geolocation. This is necessary, so that you aware other people, where the virus might be. The provided data will inform the user, where COVID might be located by displaying it on the map. You will keep friends, family and yourself safe."),r.a.createElement(w.a,{className:a.button,variant:"contained",color:"secondary",disabled:X,onClick:$},"Submit"),r.a.createElement(w.a,{className:a.button,variant:"contained",color:"primary",onClick:t},"Cancel"))))))}var he=Object(g.a)({addIcon:{position:"fixed",bottom:"1em",right:"1em"},accordion:{margin:".5em auto"}});function be(e){var t=e.appState,a=e.handleLogout,o=(e.isAdmin,e.setIsAdmin,e.auth,he()),c=(Object(d.f)(),Object(n.useState)(null)),l=Object(s.a)(c,2),m=l[0],p=l[1],f=Object(n.useState)(0),g=Object(s.a)(f,2),b=g[0],v=(g[1],Object(n.useState)(52.425)),E=Object(s.a)(v,2),O=E[0],y=E[1],j=Object(n.useState)(78.454787),w=Object(s.a)(j,2),C=w[0],k=w[1],x=Object(n.useState)(null),T=Object(s.a)(x,2),M=T[0],B=T[1];Object(n.useEffect)((function(){F(),I()}),[]),Object(n.useEffect)((function(){}),[b]);var I=function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){y(e.coords.latitude),k(e.coords.longitude)}))},F=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("http://localhost:5000/api/v1.0/reports/").then((function(e){200===e.status&&(console.log(e),p(e.data.reports))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement($,{handleLogout:a}),1===t?r.a.createElement("div",null,"Loading"):r.a.createElement("main",null,r.a.createElement(ue,{lat:O,lng:C}),r.a.createElement(h.a,null,m.map((function(e,t){return r.a.createElement(ae,{key:t,report:e})})),r.a.createElement(A.a,{className:o.addIcon,color:"secondary","aria-label":"add",onClick:function(e){B(e.currentTarget)}},r.a.createElement(me.a,null)),null!=M?r.a.createElement(ge,{openReportForm:M,handleClose:function(){B(null)}}):"")),r.a.createElement(R,null))}function ve(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(""),l=Object(s.a)(c,2),m=(l[0],l[1]),d=Object(n.useState)(""),p=Object(s.a)(d,2),f=(p[0],p[1]),g=Object(n.useState)(""),O=Object(s.a)(g,2),y=(O[0],O[1]),w=Object(n.useState)(""),C=Object(s.a)(w,2),k=(C[0],C[1]),T=Object(n.useState)(),M=Object(s.a)(T,2),A=(M[0],M[1]),L=Object(n.useState)(),D=Object(s.a)(L,2),z=D[0],U=D[1],Y=Object(n.useState)(),G=Object(s.a)(Y,2),H=G[0],J=G[1],V=Object(n.useState)(),q=Object(s.a)(V,2),X=q[0],Z=q[1],K=Object(n.useState)(),Q=Object(s.a)(K,2),ee=Q[0],te=Q[1],ae=Object(n.useState)(),ne=Object(s.a)(ae,2),re=(ne[0],ne[1]),oe=Object(n.useState)(),ce=Object(s.a)(oe,2),le=(ce[0],ce[1]),ie=Object(n.useState)(),ue=Object(s.a)(ie,2),se=(ue[0],ue[1]),me=Object(n.useState)(!1),de=Object(s.a)(me,2),pe=de[0],fe=(de[1],Object(n.useState)(!1)),ge=Object(s.a)(fe,2),he=ge[0];ge[1];Object(n.useEffect)((function(){be()}),[]),Object(n.useEffect)((function(){}),[pe,he,a]);var be=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.get("http://localhost:5000/api/v1.0/users/profile",{headers:{Authorization:"Bearer ".concat(x.a.get("authToken"))}}).then((function(e){console.log(e);var t=e.data,a=t.username,n=t.firstname,r=t.lastname,c=t.email,l=t.dob,i=t.gender,u=t.personalId,s=t.address,d=t.phonenumber;o(a),m(n),f(r),y(c),U(parseInt(l.substring(0,2))),J(parseInt(l.substring(3,5))),Z(parseInt(l.substring(6,l.length+1))),te(i),re(u),le(s),se(d)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement($,null),r.a.createElement("main",null,r.a.createElement(h.a,null,r.a.createElement(v.a,null,r.a.createElement(E.a,{label:"Username *",variant:"outlined",onChange:function(e){return o(e.target.value)}}),r.a.createElement(b.a,{container:!0,spacing:2},r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(E.a,{label:"Firstname *",fullWidth:!0,variant:"outlined",onChange:function(e){return m(e.target.value)}})),r.a.createElement(b.a,{item:!0,xs:6},r.a.createElement(E.a,{label:"Lastname *",variant:"outlined",fullWidth:!0,onChange:function(e){return f(e.target.value)}}))),r.a.createElement(E.a,{label:"Email *",type:"email",variant:"outlined",onChange:function(e){return y(e.target.value)}}),r.a.createElement(E.a,{label:"Password *",type:"password",variant:"outlined",onChange:function(e){return k(e.target.value)}}),r.a.createElement(E.a,{label:"Confirm password *",type:"password",variant:"outlined",onChange:function(e){return A(e.target.value)}}),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Gender *"),r.a.createElement(F.a,{value:ee,variant:"outlined",onChange:function(e){return te(e.target.value)}},r.a.createElement(N.a,{value:"Male"},"Male"),r.a.createElement(N.a,{value:"Female"},"Female"),r.a.createElement(N.a,{value:"Misc"},"Not listed"))),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Birthday *"),r.a.createElement(F.a,{value:z,variant:"outlined",onChange:function(e){return U(e.target.value)}},P.map((function(e){return r.a.createElement(N.a,{key:"day-".concat(e),value:e},e)})))),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Birthmonth *"),r.a.createElement(F.a,{value:H,variant:"outlined",onChange:function(e){return J(e.target.value)}},W.map((function(e){return r.a.createElement(N.a,{key:"month-".concat(e),value:e},e)})))),r.a.createElement(B.a,null,r.a.createElement(I.a,null,"Birthyear *"),r.a.createElement(F.a,{value:X,variant:"outlined",onChange:function(e){return Z(e.target.value)}},_.map((function(e){return r.a.createElement(N.a,{key:"year-".concat(e),value:e},e)})))),r.a.createElement(E.a,{label:"Personal ID *",variant:"outlined",onChange:function(e){return re(e.target.value)}}),r.a.createElement(E.a,{label:"Address",variant:"outlined",onChange:function(e){return le(e.target.value)}}),r.a.createElement(E.a,{label:"Phonenumber",variant:"outlined",onChange:function(e){return se(e.target.value)}})),pe?r.a.createElement(j.a,{variant:"body2"},"Something went wrong"):"",he?r.a.createElement(j.a,{variant:"body1"},"Successful registed. You will be redirected . . ."):"")),r.a.createElement(R,null))}var Ee="dark"===x.a.get("themeType")?"dark":"light",Oe=Object(p.a)({palette:{type:Ee},spacing:2});var ye=function(){var e=Object(n.useState)(0),t=Object(s.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(!1),l=Object(s.a)(c,2),p=l[0],g=l[1],h=Object(n.useState)(!1),b=Object(s.a)(h,2),v=b[0],E=b[1],O=Object(n.useState)(null),y=Object(s.a)(O,2),j=y[0],w=y[1];Object(n.useEffect)((function(){k()}),[]),Object(n.useEffect)((function(){!0===p&&C()}),[p]);var C=function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={headers:{Authorization:"Bearer ".concat(x.a.get("authToken"))}},e.next=3,S.a.get("http://localhost:5000/api/v1.0/users/profile",t).then((function(e){console.log(e),"Employee_Public_Health"===e.data.role&&E(!0),w(e.data)})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x.a.get("authToken")&&(o(1),setTimeout(Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.post("http://localhost:5000/api/v1.0/users/refresh",{},{headers:{Authorization:"Bearer ".concat(x.a.get("authToken"))}}).then((function(e){200===e.status&&(o(2),g(!0),x.a.set("authToken",e.data.token))})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)}))),1500));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.remove("authToken");case 2:setTimeout((function(){o(0)}),1e3);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(f.a,{theme:Oe},r.a.createElement(m.a,null,r.a.createElement(d.c,null,r.a.createElement(d.a,{exact:!0,path:"/"},0===a?r.a.createElement(M,{setAppState:o,setAuth:g}):r.a.createElement(be,{appState:a,auth:p,setIsAdmin:E,isAdmin:v,handleLogout:T})),r.a.createElement(d.a,{path:"/profile"},r.a.createElement(ve,{user:j})),r.a.createElement(d.a,{path:"/register"},r.a.createElement(z,{setAppState:o,setAuth:g}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[105,1,2]]]);
//# sourceMappingURL=main.a92713cb.chunk.js.map