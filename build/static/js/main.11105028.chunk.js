(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[4],{140:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(1),r=a(25),c=a.n(r),o=a(0),i=a(32),l=a.n(i),u=a(43),O=a(6),j=(a(83),a(13)),d=(a(84),a(8)),b=a(21),g=a(5),f=a(29),p=a.n(f),m=function(){var e=Object(b.b)(),t=Object(b.c)((function(e){return e.user})).userDetails;return Object(n.jsxs)("header",{className:"col-md-1",children:[Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(j.a,{to:"/",children:Object(n.jsx)("i",{className:"fab fa-twitter"})})}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(j.a,{to:"/",children:Object(n.jsx)("i",{className:"fa fa-home"})})}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(j.a,{to:"/search",children:Object(n.jsx)("i",{className:"fa fa-search"})})}),Object(n.jsxs)("div",{className:"navItem",children:[Object(n.jsx)(j.a,{to:"/notificationsList",children:Object(n.jsx)("i",{className:"fa fa-bell"})}),t&&t.numberOfNotifications&&t.numberOfNotifications>0?Object(n.jsx)("span",{className:"no",children:t.numberOfNotifications}):null]}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(j.a,{to:"/messages",children:Object(n.jsx)("i",{className:"fa fa-envelope"})})}),Object(n.jsx)("div",{className:"navItem",onClick:function(){d.a.push("/profile/".concat(t.username||localStorage.getItem("userName")))},children:Object(n.jsx)(j.a,{to:"/",children:Object(n.jsx)("i",{className:"fa fa-user"})})}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)("button",{onClick:function(){p()("/").emit("loggedout",localStorage.getItem("email")),localStorage.removeItem("accessToken"),localStorage.removeItem("email"),localStorage.removeItem("userName"),localStorage.removeItem("firstName"),localStorage.removeItem("lastName"),localStorage.removeItem("profilePic"),d.a.push("/login"),e({type:g.LOGOUT})},children:Object(n.jsx)("i",{className:"fa fa-sign-out-alt"})})})]})},E=a(44),I=a(33),S=a(45),_=a(46),T=(a(141),function(e){var t=e.profilePic,a=e.text;return Object(n.jsxs)("div",{className:"toastNot",children:[Object(n.jsx)("img",{src:t,alt:"alt"}),Object(n.jsx)("p",{children:a})]})}),h=a(48);var A=function(e){var t=e.component,a=e.token,s=Object(h.a)(e,["component","token"]);return Object(n.jsx)(O.b,Object(o.a)(Object(o.a)({},s),{},{render:function(e){return a?Object(n.jsx)(t,Object(o.a)({},e)):Object(n.jsx)(O.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},P=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(11)]).then(a.bind(null,191))})),N=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(12)]).then(a.bind(null,192))})),D=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(8)]).then(a.bind(null,196))})),R=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(18)]).then(a.bind(null,193))})),L=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(3),a.e(16),a.e(1),a.e(14)]).then(a.bind(null,197))})),v=Object(s.lazy)((function(){return Promise.all([a.e(3),a.e(9)]).then(a.bind(null,200))})),C=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(3),a.e(1),a.e(7)]).then(a.bind(null,201))})),x=Object(s.lazy)((function(){return a.e(15).then(a.bind(null,198))})),w=Object(s.lazy)((function(){return a.e(10).then(a.bind(null,194))})),U=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(17)]).then(a.bind(null,202))})),k=Object(s.lazy)((function(){return Promise.all([a.e(2),a.e(13)]).then(a.bind(null,199))})),G=Object(s.lazy)((function(){return a.e(19).then(a.bind(null,195))})),y=function(e){var t=Object(O.g)(),a=Object(b.b)(),r=Object(_.a)().socket,c=t.pathname,i=function(e){r.current.emit("loggedin",e)};return Object(s.useEffect)((function(){localStorage.getItem("accessToken")&&localStorage.getItem("email")&&(i(localStorage.getItem("email")),function(){var e=Object(u.a)(l.a.mark((function e(){var t,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.get("/user/getUserByToken",{headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});case 3:t=e.sent,s=t.data,localStorage.setItem("email",s.email),localStorage.setItem("userName",s.username),localStorage.setItem("firstName",s.firstName),localStorage.setItem("lastName",s.lastName),localStorage.setItem("profilePic",s.profilePic),r.current.on("message received",(function(e){d.a.location.pathname.indexOf("/chat")>-1&&a({type:g.SEND_MESSAGE,message:{content:e.content,_id:new Date,createdAt:e.createdAt,updatedAt:e.createdAt,sender:e.sender,readBy:[],chat:e.chatId,error:!1}})})),r.current.on("notification received",(function(e){"newMessage"!==e.type&&a({type:g.ADD_NOTIFICATION,notification:{_id:e.postId?e.postId:e.chatId,opened:!1,userFrom:{firstName:e.firstName,lastName:e.lastName,profilePic:e.profilePic},notificationType:"like"===e.type?"postLike":e.type,postId:e.postId,chatId:e.chatId,createdAt:new Date}}),"newMessage"===e.type&&d.a.location.pathname.indexOf("/chat")>-1||Object(I.b)(Object(n.jsx)(T,{text:e.text,profilePic:e.profilePic}),{onClick:function(){a({type:g.MARK_READ,markAll:!1}),"retweet"===e.type||"like"===e.type||"reply"===e.type?d.a.push("/post/".concat(e.postId)):"follow"===e.type?d.a.push("/profile/".concat(e.followUsername)):"newMessage"===e.type&&d.a.push("/chat/".concat(e.chatId))}})})),a({type:g.LOGIN,token:localStorage.getItem("accessToken"),userDetails:s}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0),d.a.push("/login");case 19:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}()())}),[a]),Object(n.jsxs)("div",{className:"container-fluid",style:{backgroundColor:"/login"===c||"/signup"===c?"#0099ff":"white"},children:[Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"allParent row",style:{justifyContent:"/login"===c||"/signup"===c?"center":null},children:["/login"!==c&&"/signup"!==c?Object(n.jsx)(m,{}):null,Object(n.jsx)(s.Suspense,{fallback:Object(n.jsx)(S.a,{}),children:Object(n.jsx)("main",{className:"col-md-9",style:{display:"/login"===c||"/signup"===c?"flex":"block",flexDirection:"/login"===c||"/signup"===c?"column":null,justifyContent:"/login"===c||"/signup"===c?"center":null},children:Object(n.jsxs)(O.d,{children:[Object(n.jsx)(O.b,{path:"/signup",component:N}),Object(n.jsx)(O.b,{path:"/login",render:function(e){return Object(n.jsx)(P,Object(o.a)(Object(o.a)({},e),{},{emitLoginSocket:i}))}}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/post/:postId",component:R,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/profile/:username/follow",component:v,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/profile/:username",component:L,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/messages/new",component:w,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/messages",component:x,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/chat/:id",component:U,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/search",component:C,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/",component:D,exact:!0}),Object(n.jsx)(A,{token:localStorage.getItem("accessToken"),path:"/notificationsList",component:k,exact:!0}),Object(n.jsx)(O.b,{path:"*",component:G})]})})}),"/login"!==c&&"/signup"!==c&&Object(n.jsx)("div",{className:"empty col-md-2"})]})}),Object(n.jsx)(I.a,{autoClose:4e3,hideProgressBar:!0})]})},M=a(20),H=a(3),F={chatError:null,chatLoading:!1,chat:null,messages:[],currentMessagesPage:1,messagesPageSize:60,totalMessagesCount:60,totalMessagesPages:10},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g.CHAT_MESSAGES_ERROR:return Object(o.a)(Object(o.a)({},e),{},{chatError:t.error,chatLoading:!1});case g.CHAT_LOADING:return Object(o.a)(Object(o.a)({},e),{},{chatLoading:!0,chatError:null});case g.FETCH_CHAT_MESSAGES:return Object(o.a)(Object(o.a)({},e),{},{chatLoading:!1,chat:t.chat,messages:[].concat(Object(H.a)(t.messages.reverse()),Object(H.a)(e.messages)),currentMessagesPage:t.currentPage,messagesPageSize:t.pageSize,totalMessagesCount:t.messagesCount,totalMessagesPages:t.pages});case g.CHANGE_CHAT_NAME:return Object(o.a)(Object(o.a)({},e),{},{chat:Object(o.a)(Object(o.a)({},e.chat),{},{chatName:t.chatName})});case g.SEND_MESSAGE:var a;return a=e.messages.length>=30?e.currentMessagesPage===e.totalMessagesPages?[].concat(Object(H.a)(e.messages),[t.message]):[].concat(Object(H.a)(e.messages.slice(1)),[t.message]):[].concat(Object(H.a)(e.messages),[t.message]),Object(o.a)(Object(o.a)({},e),{},{messages:a});case g.SEND_MESSAGE_ERROR:var n=Object(H.a)(e.messages),s=n.findIndex((function(e){return e._id===t.msgId}));return n[s].error=!0,Object(o.a)(Object(o.a)({},e),{},{messages:n});case g.CLEAR_MESSAGES:return Object(o.a)(Object(o.a)({},e),{},{messages:[],chat:null});default:return e}},W=a(5),B=W.FETCH_NOTIFICATIONS,K=W.NOTIFICATIONS_LOADING,V=W.MARK_READ,Y=W.ADD_NOTIFICATION,J={notifications:[],currentPage:1,pageSize:30,pages:1,totalItemsCount:10,notificationsLoading:!1},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case K:return Object(o.a)(Object(o.a)({},e),{},{notificationsLoading:!0});case B:return Object(o.a)(Object(o.a)({},e),{},{notificationsLoading:!1,notifications:t.notifications,currentPage:t.currentPage,pageSize:t.pageSize,pages:t.pages,totalItemsCount:t.totalItemsCount});case V:var a=Object(H.a)(e.notifications);if(!0===t.markAll)a=a.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{opened:!0})}));else if(t.notificationId){var n=a.findIndex((function(e){return e._id===t.notificationId}));a[n].opened=!0}return Object(o.a)(Object(o.a)({},e),{},{notifications:a});case Y:return Object(o.a)(Object(o.a)({},e),{},{notifications:[t.notification].concat(Object(H.a)(e.notifications))});default:return e}},q=a(5),Q=q.CREATE_POST,Z=q.FETCH_POSTS,$=q.POST_ERROR,ee=q.LIKE_POST,te=q.DELETE_POST,ae=q.RETWEET_POST,ne=q.UNRETWEET_POST,se=q.RETWEET_LOADING,re=q.REPLY_TO_POST,ce=q.POST_LOADING,oe={posts:[],currentPage:1,pageSize:30,pages:1,totalItemsCount:10,errorMessage:null,postActionLoading:{postId:null,postLoading:!1},retweetActionLoading:{postId:null,postLoading:!1},postLoading:!1},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q:return Object(o.a)(Object(o.a)({},e),{},{posts:[t.post].concat(Object(H.a)(e.posts)),errorMessage:null});case ce:return Object(o.a)(Object(o.a)({},e),{},{postLoading:!0});case Z:return Object(o.a)(Object(o.a)({},e),{},{posts:Object(H.a)(t.posts),errorMessage:null,postLoading:!1,currentPage:t.currentPage,pageSize:t.pageSize,pages:t.pages,totalItemsCount:t.totalItemsCount});case ee:var a=Object(H.a)(e.posts);if(a.length>0){var n=a.findIndex((function(e){return e._id===t.postId}));if(n>-1){var s=a[n].likes.findIndex((function(e){return e.username===t.like.username}));s>-1?a[n].likes.splice(s,1):a[n].likes.push(t.like);var r=a.find((function(e){return e._id===t.originalPostId}));if(r&&r.replies&&r.replies.length>0){var c=r.replies.find((function(e){return e._id===t.postId})),i=c.likes.findIndex((function(e){return e.username===t.like.username}));i>-1?c.likes.splice(i,1):c.likes.push(t.like)}}}return Object(o.a)(Object(o.a)({},e),{},{posts:a,postActionLoading:{postId:null,postLoading:!1}});case $:return Object(o.a)(Object(o.a)({},e),{},{errorMessage:t.errorMessage,postLoading:!1});case se:return Object(o.a)(Object(o.a)({},e),{},{retweetActionLoading:{postId:t.postId,postLoading:!0}});case ae:var l=Object(H.a)(e.posts);if(l.length>0){var u=l.map((function(e){return e.retweetData?e.retweetData._id===t.postId||e._id===t.postId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(o.a)({},e):e._id===t.postId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(o.a)({},e)}));return Object(o.a)(Object(o.a)({},e),{},{posts:[t.newlyAddedPost].concat(Object(H.a)(u)),errorMessage:null,retweetActionLoading:{postId:null,postLoading:!1}})}return Object(o.a)(Object(o.a)({},e),{},{posts:Object(H.a)(e.posts),errorMessage:null,retweetActionLoading:{postId:null,postLoading:!1}});case ne:var O=Object(H.a)(e.posts),j=O.filter((function(e){return e._id!==t.deletedPostId})),d=j.map((function(e){return e.retweetData?e.retweetData._id===t.originalPostId||e._id===t.originalPostId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(o.a)({},e):e._id===t.originalPostId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(o.a)({},e)}));return Object(o.a)(Object(o.a)({},e),{},{posts:d,retweetActionLoading:{postId:null,postLoading:!1}});case re:var b=Object(H.a)(e.posts),g=t.post.replyTo?t.post.replyTo.originalPost._id:t.originalPostId,f=b.findIndex((function(e){return e._id===g}));return f>-1&&b[f].replies.push(t.post),Object(o.a)(Object(o.a)({},e),{},{posts:e.posts.length>0?[t.post].concat(Object(H.a)(b)):Object(H.a)(e.posts)});case te:var p=Object(H.a)(e.posts);if(t.originalPostId){var m=p.findIndex((function(e){return e._id===t.originalPostId}));m>-1&&(p[m].replies=p[m].replies.filter((function(e){return e._id!==t.postId})))}var E=p.filter((function(e){return e._id!==t.postId}));return Object(o.a)(Object(o.a)({},e),{},{posts:E});default:return e}},le=a(5),ue=le.LOGIN,Oe=le.USER_ERROR,je=le.CLEAR_USER_ERROR,de=le.RETWEET_POST,be=le.UNRETWEET_POST,ge=le.LOGOUT,fe=le.FOLLOW_USER,pe=le.AUTH_LOADING,me=le.CHANGE_PROFILE_PIC,Ee=le.CHANGE_COVER_PHOTO,Ie=le.PIN_POST,Se=le.LIKE_POST,_e=le.CREATE_CHAT,Te=le.UPDATE_LATEST_MESSAGE,he=le.MARK_READ,Ae=le.ADD_NOTIFICATION,Pe={isAuthenticated:!1,errorMessage:null,token:null,userDetails:null,authLoading:!1},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ue:return Object(o.a)(Object(o.a)({},e),{},{token:t.token,isAuthenticated:!0,errorMessage:null,userDetails:t.userDetails,authLoading:!1});case pe:return Object(o.a)(Object(o.a)({},e),{},{authLoading:!0});case Oe:return Object(o.a)(Object(o.a)({},e),{},{errorMessage:t.errorMessage,authLoading:!1});case je:return Object(o.a)(Object(o.a)({},e),{},{errorMessage:null});case de:if(e.userDetails&&e.userDetails.pinnedPost&&e.userDetails.pinnedPost._id===t.postId){var a=[Object(o.a)({},e.userDetails.pinnedPost)].map((function(e){return e.retweetData?e.retweetData._id===t.postId||e._id===t.postId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(o.a)({},e):e._id===t.postId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(o.a)({},e)}));return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{retweets:[t.retweet].concat(Object(H.a)(e.userDetails.retweets)),pinnedPost:a[0]})})}return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{retweets:[t.retweet].concat(Object(H.a)(e.userDetails.retweets))})});case be:if(e.userDetails&&e.userDetails.pinnedPost&&e.userDetails.pinnedPost._id===t.originalPostId){var n=[Object(o.a)({},e.userDetails.pinnedPost)].map((function(e){return e.retweetData?e.retweetData._id===t.originalPostId||e._id===t.originalPostId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(o.a)({},e):e._id===t.originalPostId?Object(o.a)(Object(o.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(o.a)({},e)}));return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{retweets:Object(H.a)(e.userDetails.retweets.filter((function(e){return e!==t.deletedPostId}))),pinnedPost:n[0]})})}return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{retweets:Object(H.a)(e.userDetails.retweets.filter((function(e){return e!==t.deletedPostId})))})});case ge:return Object(o.a)(Object(o.a)({},e),{},{isAuthenticated:!1,errorMessage:null,token:null,userDetails:null,authLoading:!1});case fe:var s=t.newfollowingUser,r=Object(H.a)(e.userDetails.following),c=r.findIndex((function(e){return e.username===s.username}));return c>-1?r.splice(c,1):r.push(t.newfollowingUser),Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{following:r})});case me:return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{profilePic:t.profilePic})});case Se:if(!e.userDetails||!e.userDetails.pinnedPost||e.userDetails.pinnedPost._id!==t.postId)return Object(o.a)({},e);var i=Object(o.a)({},e.userDetails.pinnedPost),l=i.likes.findIndex((function(e){return e.username===t.like.username}));return l>-1?i.likes.splice(l,1):i.likes.push(t.like),Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{pinnedPost:i})});case Ee:return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{coverPhoto:t.coverPhoto})});case Ie:return"add"===t.pintype?Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{pinnedPost:t.pinnedPost})}):Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{pinnedPost:null})});case _e:return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{chats:[t.chat].concat(Object(H.a)(e.userDetails.chats))})});case Te:var u=Object(H.a)(e.userDetails.chats),O=u.findIndex((function(e){return e._id===t.chatId}));return console.log(t.chatId),console.log(O),O>-1&&(u[O].latestMessage={content:t.content,sender:{firstName:t.user.firstName,lastName:t.user.lastName,username:t.user.username,profilePic:t.user.profilePic,coverPhoto:t.user.coverPhoto},_id:new Date}),Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{chats:u})});case he:return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{numberOfNotifications:t.markAll?0:e.userDetails.numberOfNotifications-1})});case Ae:return Object(o.a)(Object(o.a)({},e),{},{userDetails:Object(o.a)(Object(o.a)({},e.userDetails),{},{numberOfNotifications:e.userDetails.numberOfNotifications+1})});default:return e}},De={users:[],currentPageUser:1,pageSizeUser:30,pagesUser:1,totalItemsCountUser:10,userLoading:!1},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g.USERS_LOADING:return Object(o.a)(Object(o.a)({},e),{},{userLoading:!0});case g.FETCH_USERS:return Object(o.a)(Object(o.a)({},e),{},{users:Object(H.a)(t.userDetails),userLoading:!1,currentPageUser:t.currentPageUser,pageSizeUser:t.pageSizeUser,pagesUser:t.pagesUser,totalItemsCountUser:t.totalItemsCountUser});case g.CLEAR_USER_SEARCH:return Object(o.a)(Object(o.a)({},e),{},{users:[],currentPageUser:1,pageSizeUser:30,pagesUser:1,totalItemsCountUser:10,userLoading:!1});default:return e}},Le=Object(M.c)({user:Ne,post:ie,userSearch:Re,chat:z,notification:X}),ve=a(76),Ce=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||M.d,xe=Object(M.e)(Le,Ce(Object(M.a)(ve.a))),we=Object(n.jsx)(b.a,{store:xe,children:Object(n.jsx)(O.c,{history:d.a,children:Object(n.jsx)(y,{})})});console.log=function(){},c.a.render(we,document.getElementById("root"))},44:function(e,t,a){"use strict";var n=a(75),s=a.n(n),r=a(8),c=s.a.create({baseURL:"/"});!function(e){var t=e.interceptors.response.use((function(e){return e}),(function(a){return a.response&&403===a.response.status&&(r.a.push("/login"),localStorage.removeItem("accessToken"),localStorage.removeItem("email"),localStorage.removeItem("userName"),localStorage.removeItem("firstName"),localStorage.removeItem("lastName"),localStorage.removeItem("profilePic")),e.interceptors.response.eject(t),Promise.reject(a)}))}(c),t.a=c},45:function(e,t,a){"use strict";var n=a(2);a(1),a(140);t.a=function(e){var t=e.width;return Object(n.jsx)("div",{className:"loader",style:{width:t,height:t},children:"Loading..."})}},46:function(e,t,a){"use strict";var n=a(1),s=a(29),r=a.n(s);t.a=function(){var e=Object(n.useRef)();return Object(n.useEffect)((function(){return e.current=r()("/",{transports:["websocket"]}),function(){e.current.close()}}),[]),{socket:e}}},5:function(e,t,a){"use strict";a.r(t),a.d(t,"USER_ERROR",(function(){return n})),a.d(t,"CLEAR_USER_ERROR",(function(){return s})),a.d(t,"AUTH_LOADING",(function(){return r})),a.d(t,"SIGNUP",(function(){return c})),a.d(t,"LOGIN",(function(){return o})),a.d(t,"LOGOUT",(function(){return i})),a.d(t,"CREATE_POST",(function(){return l})),a.d(t,"DELETE_POST",(function(){return u})),a.d(t,"POST_ERROR",(function(){return O})),a.d(t,"FETCH_POSTS",(function(){return j})),a.d(t,"POST_LOADING",(function(){return d})),a.d(t,"LIKE_POST",(function(){return b})),a.d(t,"RETWEET_POST",(function(){return g})),a.d(t,"UNRETWEET_POST",(function(){return f})),a.d(t,"RETWEET_LOADING",(function(){return p})),a.d(t,"REPLY_TO_POST",(function(){return m})),a.d(t,"VIEW_SINGLE_POST",(function(){return E})),a.d(t,"FOLLOW_USER",(function(){return I})),a.d(t,"CHANGE_PROFILE_PIC",(function(){return S})),a.d(t,"CHANGE_COVER_PHOTO",(function(){return _})),a.d(t,"PIN_POST",(function(){return T})),a.d(t,"FETCH_USERS",(function(){return h})),a.d(t,"USERS_LOADING",(function(){return A})),a.d(t,"CLEAR_USER_SEARCH",(function(){return P})),a.d(t,"CREATE_CHAT",(function(){return N})),a.d(t,"CHAT_LOADING",(function(){return D})),a.d(t,"FETCH_CHAT_MESSAGES",(function(){return R})),a.d(t,"CHAT_MESSAGES_ERROR",(function(){return L})),a.d(t,"CHANGE_CHAT_NAME",(function(){return v})),a.d(t,"SEND_MESSAGE",(function(){return C})),a.d(t,"SEND_MESSAGE_ERROR",(function(){return x})),a.d(t,"UPDATE_LATEST_MESSAGE",(function(){return w})),a.d(t,"CLEAR_MESSAGES",(function(){return U})),a.d(t,"NOTIFICATIONS_LOADING",(function(){return k})),a.d(t,"FETCH_NOTIFICATIONS",(function(){return G})),a.d(t,"ADD_NOTIFICATION",(function(){return y})),a.d(t,"MARK_READ",(function(){return M}));var n="USER_ERROR",s="CLEAR_USER_ERROR",r="AUTH_LOADING",c="SIGNUP",o="LOGIN",i="LOGOUT",l="CREATE_POST",u="DELETE_POST",O="POST_ERROR",j="FETCH_POSTS",d="POST_LOADING",b="LIKE_POST",g="RETWEET_POST",f="UNRETWEET_POST",p="RETWEET_LOADING",m="REPLY_TO_POST",E="VIEW_SINGLE_POST",I="FOLLOW_USER",S="CHANGE_PROFILE_PIC",_="CHANGE_COVER_PHOTO",T="PIN_POST",h="FETCH_USERS",A="USERS_LOADING",P="CLEAR_USER_SEARCH",N="CREATE_CHAT",D="CHAT_LOADING",R="FETCH_CHAT_MESSAGES",L="CHAT_MESSAGES_ERROR",v="CHANGE_CHAT_NAME",C="SEND_MESSAGE",x="SEND_MESSAGE_ERROR",w="UPDATE_LATEST_MESSAGE",U="CLEAR_MESSAGES",k="NOTIFICATIONS_LOADING",G="FETCH_NOTIFICATIONS",y="ADD_NOTIFICATION",M="MARK_READ"},8:function(e,t,a){"use strict";var n=a(9);t.a=Object(n.a)()},83:function(e,t,a){},84:function(e,t,a){}},[[142,5,6]]]);
//# sourceMappingURL=main.11105028.chunk.js.map