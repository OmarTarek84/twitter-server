(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[9],{143:function(e,o,t){"use strict";t.d(o,"a",(function(){return a}));var l=t(47);function a(e,o){return function(e){if(Array.isArray(e))return e}(e)||function(e,o){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],l=!0,a=!1,n=void 0;try{for(var r,s=e[Symbol.iterator]();!(l=(r=s.next()).done)&&(t.push(r.value),!o||t.length!==o);l=!0);}catch(i){a=!0,n=i}finally{try{l||null==s.return||s.return()}finally{if(a)throw n}}return t}}(e,o)||Object(l.a)(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},150:function(e,o,t){"use strict";var l=t(2),a=(t(1),t(151),t(13));o.a=function(e){var o=e.username,t=e.profilePic,n=e.firstName,r=e.lastName,s=e.loggedinFollowing,i=e.followUser,c=e.followLoading,f=e.followIndex,u=e.userIndex,d=e.parentUserClicked,w=s?s.findIndex((function(e){return e.username===o}))>-1:null;return Object(l.jsxs)("div",{className:"userDet",onClick:d,children:[Object(l.jsx)("div",{className:"details",children:Object(l.jsxs)("div",{className:"picAndName",children:[Object(l.jsx)("img",{src:t,alt:o}),Object(l.jsxs)(a.a,{className:"firstlastname",to:"/profile/".concat(o),onClick:function(e){return e.stopPropagation()},children:[n," ",r]}),Object(l.jsxs)("span",{className:"username",children:["@",o]})]})}),Object(l.jsx)("div",{className:"followBtn",style:{display:o!==localStorage.getItem("userName")&&i&&s?"flex":"none"},children:Object(l.jsx)("button",{style:{backgroundColor:w?"#00ACEE":"white",color:w?"white":"#00ACEE"},disabled:c&&f===u,onClick:i,children:w?"Following":"Follow"})})]},o)}},151:function(e,o,t){},178:function(e,o,t){},179:function(e,o,t){},200:function(e,o,t){"use strict";t.r(o);var l=t(2),a=t(32),n=t.n(a),r=t(43),s=t(143),i=t(3),c=t(0),f=t(1),u=t(21),d=t(157),w=t(44),m=t(9),g=t(5),j=t(45),b=(t(178),t(150)),p=(t(179),function(e){var o=e.following,t=e.followers,a=e.tabIndex,n=e.loggedinFollowing,r=e.followUser,s=e.followLoading,i=e.followIndex;e.userIndex;return(0===a?o:t).map((function(e,o){return Object(l.jsx)(b.a,{firstName:e.firstName,lastName:e.lastName,username:e.username,profilePic:e.profilePic,loggedinFollowing:n,followUser:function(t){return r(t,e.username,e.firstName,e.lastName,e.profilePic,o)},followLoading:s,followIndex:i,userIndex:o,parentUserClicked:function(){}},e.username)}))}),O=t(46),h={following:[],followers:[],username:null,listLoading:!1,listError:null,firstName:null,lastName:null,followLoading:!1,followIndex:0},x=function(e,o){switch(o.type){case"list_loading":return Object(c.a)(Object(c.a)({},e),{},{listLoading:!0,listError:null});case"fetch_list":return Object(c.a)(Object(c.a)({},e),{},{following:o.following,followers:o.followers,username:o.username,firstName:o.firstName,lastName:o.lastName,listLoading:!1,listError:null});case"list_error":return Object(c.a)(Object(c.a)({},e),{},{listLoading:!1,listError:o.listError});case"follow_loading":return Object(c.a)(Object(c.a)({},e),{},{followLoading:!0,followIndex:o.followIndex});case"follow_user":return"Add"===o.resType?o.profileUsername===o.follower.username?Object(c.a)(Object(c.a)({},e),{},{following:[].concat(Object(i.a)(e.following),[o.mainUserFollowing]),followLoading:!1}):Object(c.a)(Object(c.a)({},e),{},{followLoading:!1}):o.profileUsername===o.follower.username?Object(c.a)(Object(c.a)({},e),{},{following:e.following.filter((function(e){return e.username!==o.mainUserFollowing.username})),followLoading:!1}):Object(c.a)(Object(c.a)({},e),{},{followLoading:!1});default:return e}};o.default=function(e){var o=Object(f.useReducer)(x,h),t=Object(s.a)(o,2),a=t[0],i=t[1],c=Object(u.b)(),b=Object(O.a)().socket,N=Object(u.c)((function(e){return e.user})).userDetails,y=Object(f.useState)(m.a.location&&m.a.location.state?m.a.location.state.tabIndex:0),v=Object(s.a)(y,2),I=v[0],L=v[1],U=function(){var o=Object(r.a)(n.a.mark((function o(t,l,a,r,s,f){var u;return n.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t.stopPropagation(),i({type:"follow_loading",followIndex:f}),o.next=4,w.a.put("/user/follow/".concat(l),{},{headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});case 4:u=o.sent,c({type:g.FOLLOW_USER,newfollowingUser:u.data&&u.data.newfollowingUser?u.data.newfollowingUser:null}),i({type:"follow_user",follower:{firstName:N.firstName,lastName:N.lastName,email:N.email,profilePic:N.profilePic,username:N.username},resType:u.data.type,tabIndex:I,profileUsername:e.match.params.username,mainUserFollowing:{firstName:a,lastName:r,profilePic:s,username:l}}),"Add"===u.data.type&&b.current.emit("notification Sent",{notificationFrom:N.username,notificationTo:[u.data.newfollowingUser.username],type:"follow"});case 8:case"end":return o.stop()}}),o)})));return function(e,t,l,a,n,r){return o.apply(this,arguments)}}();return Object(f.useEffect)((function(){console.log(m.a.location),i({type:"list_loading"});var o=function(){var o=Object(r.a)(n.a.mark((function o(){var t;return n.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,w.a.get("/user/followList/".concat(e.match.params.username),{headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});case 3:t=o.sent,console.log(t.data),i({type:"fetch_list",following:t.data.following,followers:t.data.followers,username:t.data.username,firstName:t.data.firstName,lastName:t.data.lastName}),o.next=12;break;case 8:o.prev=8,o.t0=o.catch(0),console.log(o.t0),i({type:"list_error",listError:o.t0.response&&o.t0.response.data&&o.t0.response.data.message?o.t0.response.data.message:o.t0.message});case 12:case"end":return o.stop()}}),o,null,[[0,8]])})));return function(){return o.apply(this,arguments)}}();m.a.location&&m.a.location.state&&m.a.location.state.following?i({type:"fetch_list",following:m.a.location.state.following,followers:m.a.location.state.followers,username:m.a.location.state.username,firstName:m.a.location.state.firstName,lastName:m.a.location.state.lastName}):o()}),[e.match.params.username]),Object(l.jsxs)("div",{className:"followlist",children:[Object(l.jsxs)("h2",{children:[a&&a.firstName," ",a.lastName&&a.lastName]}),Object(l.jsx)("div",{className:"tabs",children:Object(l.jsxs)(d.d,{onSelect:function(e){L(e)},defaultIndex:I,children:[Object(l.jsxs)(d.b,{children:[Object(l.jsx)(d.a,{children:"Following"}),Object(l.jsx)(d.a,{children:"Followers"})]}),Object(l.jsx)(d.c,{children:a.listLoading?Object(l.jsx)(j.a,{width:"60"}):a.listError?a.listError:a.following.length>0?Object(l.jsx)(p,{following:a.following,followUser:U,loggedinFollowing:N?N.following:null,tabIndex:I,followLoading:a.followLoading,followIndex:a.followIndex}):Object(l.jsx)("h4",{className:"nofollow",children:"You are not following any users yet"})}),Object(l.jsx)(d.c,{children:a.listLoading?Object(l.jsx)(j.a,{width:"60"}):a.listError?a.listError:a.followers.length>0?Object(l.jsx)(p,{followers:a.followers,followUser:U,loggedinFollowing:N?N.following:null,tabIndex:I,followLoading:a.followLoading,followIndex:a.followIndex}):Object(l.jsx)("h4",{className:"nofollow",children:"You have no followers yet"})})]})})]})}}}]);
//# sourceMappingURL=9.715c697d.chunk.js.map