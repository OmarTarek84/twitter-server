(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[4],{140:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(1),r=a(25),c=a.n(r),o=a(32),i=a.n(o),u=a(43),l=a(6),O=(a(83),a(13)),j=(a(84),a(9)),d=a(21),b=a(5),g=a(29),f=a.n(g),p=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.user})).userDetails;return Object(n.jsxs)("header",{className:"col-md-1",children:[Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(O.a,{to:"/",children:Object(n.jsx)("i",{className:"fab fa-twitter"})})}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(O.a,{to:"/",children:Object(n.jsx)("i",{className:"fa fa-home"})})}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(O.a,{to:"/search",children:Object(n.jsx)("i",{className:"fa fa-search"})})}),Object(n.jsxs)("div",{className:"navItem",children:[Object(n.jsx)(O.a,{to:"/notificationsList",children:Object(n.jsx)("i",{className:"fa fa-bell"})}),t&&t.numberOfNotifications&&t.numberOfNotifications>0?Object(n.jsx)("span",{className:"no",children:t.numberOfNotifications}):null]}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)(O.a,{to:"/messages",children:Object(n.jsx)("i",{className:"fa fa-envelope"})})}),Object(n.jsx)("div",{className:"navItem",onClick:function(){j.a.push("/profile/".concat(t.username||localStorage.getItem("userName")))},children:Object(n.jsx)(O.a,{to:"/",children:Object(n.jsx)("i",{className:"fa fa-user"})})}),Object(n.jsx)("div",{className:"navItem",children:Object(n.jsx)("button",{onClick:function(){f()("/").emit("loggedout",localStorage.getItem("email")),localStorage.removeItem("accessToken"),localStorage.removeItem("email"),localStorage.removeItem("userName"),localStorage.removeItem("firstName"),localStorage.removeItem("lastName"),localStorage.removeItem("profilePic"),j.a.push("/login"),e({type:b.LOGOUT})},children:Object(n.jsx)("i",{className:"fa fa-sign-out-alt"})})})]})},m=a(44),E=a(33),I=a(45),S=a(46),_=(a(141),function(e){var t=e.profilePic,a=e.text;return Object(n.jsxs)("div",{className:"toastNot",children:[Object(n.jsx)("img",{src:t,alt:"alt"}),Object(n.jsx)("p",{children:a})]})}),T=a(0),h=a(48);var P=function(e){var t=e.component,a=e.token,s=Object(h.a)(e,["component","token"]);return Object(n.jsx)(l.b,Object(T.a)(Object(T.a)({},s),{},{render:function(e){return a?Object(n.jsx)(t,Object(T.a)({},e)):Object(n.jsx)(l.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},A=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(11)]).then(a.bind(null,191))})),N=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(12)]).then(a.bind(null,192))})),D=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(1),a.e(8)]).then(a.bind(null,196))})),R=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(18)]).then(a.bind(null,193))})),L=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(3),a.e(16),a.e(1),a.e(14)]).then(a.bind(null,197))})),v=Object(s.lazy)((function(){return Promise.all([a.e(3),a.e(9)]).then(a.bind(null,200))})),C=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(2),a.e(3),a.e(1),a.e(7)]).then(a.bind(null,201))})),x=Object(s.lazy)((function(){return a.e(15).then(a.bind(null,198))})),w=Object(s.lazy)((function(){return a.e(10).then(a.bind(null,194))})),U=Object(s.lazy)((function(){return Promise.all([a.e(0),a.e(17)]).then(a.bind(null,202))})),k=Object(s.lazy)((function(){return Promise.all([a.e(2),a.e(13)]).then(a.bind(null,199))})),G=Object(s.lazy)((function(){return a.e(19).then(a.bind(null,195))})),y=function(e){var t=Object(l.g)(),a=Object(d.b)(),r=Object(S.a)().socket,c=t.pathname;return Object(s.useEffect)((function(){localStorage.getItem("accessToken")&&localStorage.getItem("email")&&function(){var e=Object(u.a)(i.a.mark((function e(){var t,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.get("/user/getUserByToken",{headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});case 3:t=e.sent,s=t.data,localStorage.setItem("email",s.email),localStorage.setItem("userName",s.username),localStorage.setItem("firstName",s.firstName),localStorage.setItem("lastName",s.lastName),localStorage.setItem("profilePic",s.profilePic),r.current.emit("loggedin",s.email),r.current.on("message received",(function(e){c.indexOf("/chat")>-1&&a({type:b.SEND_MESSAGE,message:{content:e.content,_id:new Date,createdAt:e.createdAt,updatedAt:e.createdAt,sender:e.sender,readBy:[],chat:e.chatId,error:!1}})})),r.current.on("notification received",(function(e){"newMessage"!==e.type&&a({type:b.ADD_NOTIFICATION,notification:{_id:e.postId?e.postId:e.chatId,opened:!1,userFrom:{firstName:e.firstName,lastName:e.lastName,profilePic:e.profilePic},notificationType:"like"===e.type?"postLike":e.type,postId:e.postId,chatId:e.chatId,createdAt:new Date}}),"newMessage"===e.type&&j.a.location.pathname.indexOf("/chat")>-1||Object(E.b)(Object(n.jsx)(_,{text:e.text,profilePic:e.profilePic}),{onClick:function(){"retweet"===e.type||"like"===e.type||"reply"===e.type?j.a.push("/post/".concat(e.postId)):"follow"===e.type?j.a.push("/profile/".concat(e.followUsername)):"newMessage"===e.type&&j.a.push("/chat/".concat(e.chatId))}})})),a({type:b.LOGIN,token:localStorage.getItem("accessToken"),userDetails:s}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0),j.a.push("/login");case 20:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}()()}),[a]),Object(n.jsxs)("div",{className:"container-fluid",style:{backgroundColor:"/login"===c||"/signup"===c?"#0099ff":"white"},children:[Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"allParent row",style:{justifyContent:"/login"===c||"/signup"===c?"center":null},children:["/login"!==c&&"/signup"!==c?Object(n.jsx)(p,{}):null,Object(n.jsx)(s.Suspense,{fallback:Object(n.jsx)(I.a,{}),children:Object(n.jsx)("main",{className:"col-md-9",style:{display:"/login"===c||"/signup"===c?"flex":"block",flexDirection:"/login"===c||"/signup"===c?"column":null,justifyContent:"/login"===c||"/signup"===c?"center":null},children:Object(n.jsxs)(l.d,{children:[Object(n.jsx)(l.b,{path:"/signup",component:N}),Object(n.jsx)(l.b,{path:"/login",component:A}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/post/:postId",component:R,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/profile/:username/follow",component:v,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/profile/:username",component:L,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/messages/new",component:w,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/messages",component:x,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/chat/:id",component:U,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/search",component:C,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/",component:D,exact:!0}),Object(n.jsx)(P,{token:localStorage.getItem("accessToken"),path:"/notificationsList",component:k,exact:!0}),Object(n.jsx)(l.b,{path:"*",component:G})]})})}),"/login"!==c&&"/signup"!==c&&Object(n.jsx)("div",{className:"empty col-md-2"})]})}),Object(n.jsx)(E.a,{autoClose:4e3,hideProgressBar:!0})]})},M=a(20),H=a(3),F={chatError:null,chatLoading:!1,chat:null,messages:[],currentMessagesPage:1,messagesPageSize:60,totalMessagesCount:60,totalMessagesPages:10},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.CHAT_MESSAGES_ERROR:return Object(T.a)(Object(T.a)({},e),{},{chatError:t.error,chatLoading:!1});case b.CHAT_LOADING:return Object(T.a)(Object(T.a)({},e),{},{chatLoading:!0,chatError:null});case b.FETCH_CHAT_MESSAGES:return Object(T.a)(Object(T.a)({},e),{},{chatLoading:!1,chat:t.chat,messages:[].concat(Object(H.a)(t.messages.reverse()),Object(H.a)(e.messages)),currentMessagesPage:t.currentPage,messagesPageSize:t.pageSize,totalMessagesCount:t.messagesCount,totalMessagesPages:t.pages});case b.CHANGE_CHAT_NAME:return Object(T.a)(Object(T.a)({},e),{},{chat:Object(T.a)(Object(T.a)({},e.chat),{},{chatName:t.chatName})});case b.SEND_MESSAGE:var a;return a=e.messages.length>=30?e.currentMessagesPage===e.totalMessagesPages?[].concat(Object(H.a)(e.messages),[t.message]):[].concat(Object(H.a)(e.messages.slice(1)),[t.message]):[].concat(Object(H.a)(e.messages),[t.message]),Object(T.a)(Object(T.a)({},e),{},{messages:a});case b.SEND_MESSAGE_ERROR:var n=Object(H.a)(e.messages),s=n.findIndex((function(e){return e._id===t.msgId}));return n[s].error=!0,Object(T.a)(Object(T.a)({},e),{},{messages:n});case b.CLEAR_MESSAGES:return Object(T.a)(Object(T.a)({},e),{},{messages:[],chat:null});default:return e}},W=a(5),B=W.FETCH_NOTIFICATIONS,K=W.NOTIFICATIONS_LOADING,V=W.MARK_READ,Y=W.ADD_NOTIFICATION,J={notifications:[],currentPage:1,pageSize:30,pages:1,totalItemsCount:10,notificationsLoading:!1},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case K:return Object(T.a)(Object(T.a)({},e),{},{notificationsLoading:!0});case B:return Object(T.a)(Object(T.a)({},e),{},{notificationsLoading:!1,notifications:t.notifications,currentPage:t.currentPage,pageSize:t.pageSize,pages:t.pages,totalItemsCount:t.totalItemsCount});case V:var a=Object(H.a)(e.notifications);if(!0===t.markAll)a=a.map((function(e){return Object(T.a)(Object(T.a)({},e),{},{opened:!0})}));else{var n=a.findIndex((function(e){return e._id===t.notificationId}));a[n].opened=!0}return Object(T.a)(Object(T.a)({},e),{},{notifications:a});case Y:return Object(T.a)(Object(T.a)({},e),{},{notifications:[t.notification].concat(Object(H.a)(e.notifications))});default:return e}},q=a(5),Q=q.CREATE_POST,Z=q.FETCH_POSTS,$=q.POST_ERROR,ee=q.LIKE_POST,te=q.DELETE_POST,ae=q.RETWEET_POST,ne=q.UNRETWEET_POST,se=q.RETWEET_LOADING,re=q.REPLY_TO_POST,ce=q.POST_LOADING,oe={posts:[],currentPage:1,pageSize:30,pages:1,totalItemsCount:10,errorMessage:null,postActionLoading:{postId:null,postLoading:!1},retweetActionLoading:{postId:null,postLoading:!1},postLoading:!1},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q:return Object(T.a)(Object(T.a)({},e),{},{posts:[t.post].concat(Object(H.a)(e.posts)),errorMessage:null});case ce:return Object(T.a)(Object(T.a)({},e),{},{postLoading:!0});case Z:return Object(T.a)(Object(T.a)({},e),{},{posts:Object(H.a)(t.posts),errorMessage:null,postLoading:!1,currentPage:t.currentPage,pageSize:t.pageSize,pages:t.pages,totalItemsCount:t.totalItemsCount});case ee:var a=Object(H.a)(e.posts);if(a.length>0){var n=a.findIndex((function(e){return e._id===t.postId}));if(n>-1){var s=a[n].likes.findIndex((function(e){return e.username===t.like.username}));s>-1?a[n].likes.splice(s,1):a[n].likes.push(t.like);var r=a.find((function(e){return e._id===t.originalPostId}));if(r&&r.replies&&r.replies.length>0){var c=r.replies.find((function(e){return e._id===t.postId})),o=c.likes.findIndex((function(e){return e.username===t.like.username}));o>-1?c.likes.splice(o,1):c.likes.push(t.like)}}}return Object(T.a)(Object(T.a)({},e),{},{posts:a,postActionLoading:{postId:null,postLoading:!1}});case $:return Object(T.a)(Object(T.a)({},e),{},{errorMessage:t.errorMessage,postLoading:!1});case se:return Object(T.a)(Object(T.a)({},e),{},{retweetActionLoading:{postId:t.postId,postLoading:!0}});case ae:var i=Object(H.a)(e.posts);if(i.length>0){var u=i.map((function(e){return e.retweetData?e.retweetData._id===t.postId||e._id===t.postId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(T.a)({},e):e._id===t.postId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(T.a)({},e)}));return Object(T.a)(Object(T.a)({},e),{},{posts:[t.newlyAddedPost].concat(Object(H.a)(u)),errorMessage:null,retweetActionLoading:{postId:null,postLoading:!1}})}return Object(T.a)(Object(T.a)({},e),{},{posts:Object(H.a)(e.posts),errorMessage:null,retweetActionLoading:{postId:null,postLoading:!1}});case ne:var l=Object(H.a)(e.posts),O=l.filter((function(e){return e._id!==t.deletedPostId})),j=O.map((function(e){return e.retweetData?e.retweetData._id===t.originalPostId||e._id===t.originalPostId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(T.a)({},e):e._id===t.originalPostId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(T.a)({},e)}));return Object(T.a)(Object(T.a)({},e),{},{posts:j,retweetActionLoading:{postId:null,postLoading:!1}});case re:var d=Object(H.a)(e.posts),b=t.post.replyTo?t.post.replyTo.originalPost._id:t.originalPostId,g=d.findIndex((function(e){return e._id===b}));return g>-1&&d[g].replies.push(t.post),Object(T.a)(Object(T.a)({},e),{},{posts:e.posts.length>0?[t.post].concat(Object(H.a)(d)):Object(H.a)(e.posts)});case te:var f=Object(H.a)(e.posts);if(t.originalPostId){var p=f.findIndex((function(e){return e._id===t.originalPostId}));p>-1&&(f[p].replies=f[p].replies.filter((function(e){return e._id!==t.postId})))}var m=f.filter((function(e){return e._id!==t.postId}));return Object(T.a)(Object(T.a)({},e),{},{posts:m});default:return e}},ue=a(5),le=ue.LOGIN,Oe=ue.USER_ERROR,je=ue.CLEAR_USER_ERROR,de=ue.RETWEET_POST,be=ue.UNRETWEET_POST,ge=ue.LOGOUT,fe=ue.FOLLOW_USER,pe=ue.AUTH_LOADING,me=ue.CHANGE_PROFILE_PIC,Ee=ue.CHANGE_COVER_PHOTO,Ie=ue.PIN_POST,Se=ue.LIKE_POST,_e=ue.CREATE_CHAT,Te=ue.UPDATE_LATEST_MESSAGE,he=ue.MARK_READ,Pe=ue.ADD_NOTIFICATION,Ae={isAuthenticated:!1,errorMessage:null,token:null,userDetails:null,authLoading:!1},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case le:return Object(T.a)(Object(T.a)({},e),{},{token:t.token,isAuthenticated:!0,errorMessage:null,userDetails:t.userDetails,authLoading:!1});case pe:return Object(T.a)(Object(T.a)({},e),{},{authLoading:!0});case Oe:return Object(T.a)(Object(T.a)({},e),{},{errorMessage:t.errorMessage,authLoading:!1});case je:return Object(T.a)(Object(T.a)({},e),{},{errorMessage:null});case de:if(e.userDetails&&e.userDetails.pinnedPost&&e.userDetails.pinnedPost._id===t.postId){var a=[Object(T.a)({},e.userDetails.pinnedPost)].map((function(e){return e.retweetData?e.retweetData._id===t.postId||e._id===t.postId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(T.a)({},e):e._id===t.postId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:[t.postedBy].concat(Object(H.a)(e.retweetUsers))}):Object(T.a)({},e)}));return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{retweets:[t.retweet].concat(Object(H.a)(e.userDetails.retweets)),pinnedPost:a[0]})})}return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{retweets:[t.retweet].concat(Object(H.a)(e.userDetails.retweets))})});case be:if(e.userDetails&&e.userDetails.pinnedPost&&e.userDetails.pinnedPost._id===t.originalPostId){var n=[Object(T.a)({},e.userDetails.pinnedPost)].map((function(e){return e.retweetData?e.retweetData._id===t.originalPostId||e._id===t.originalPostId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(T.a)({},e):e._id===t.originalPostId?Object(T.a)(Object(T.a)({},e),{},{retweetUsers:e.retweetUsers.filter((function(e){return e.username!==localStorage.getItem("userName")}))}):Object(T.a)({},e)}));return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{retweets:Object(H.a)(e.userDetails.retweets.filter((function(e){return e!==t.deletedPostId}))),pinnedPost:n[0]})})}return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{retweets:Object(H.a)(e.userDetails.retweets.filter((function(e){return e!==t.deletedPostId})))})});case ge:return Object(T.a)(Object(T.a)({},e),{},{isAuthenticated:!1,errorMessage:null,token:null,userDetails:null,authLoading:!1});case fe:var s=t.newfollowingUser,r=Object(H.a)(e.userDetails.following),c=r.findIndex((function(e){return e.username===s.username}));return c>-1?r.splice(c,1):r.push(t.newfollowingUser),Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{following:r})});case me:return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{profilePic:t.profilePic})});case Se:if(!e.userDetails||!e.userDetails.pinnedPost||e.userDetails.pinnedPost._id!==t.postId)return Object(T.a)({},e);var o=Object(T.a)({},e.userDetails.pinnedPost),i=o.likes.findIndex((function(e){return e.username===t.like.username}));return i>-1?o.likes.splice(i,1):o.likes.push(t.like),Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{pinnedPost:o})});case Ee:return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{coverPhoto:t.coverPhoto})});case Ie:return"add"===t.pintype?Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{pinnedPost:t.pinnedPost})}):Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{pinnedPost:null})});case _e:return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{chats:[t.chat].concat(Object(H.a)(e.userDetails.chats))})});case Te:var u=Object(H.a)(e.userDetails.chats),l=u.findIndex((function(e){return e._id===t.chatId}));return u[l].latestMessage={content:t.content,sender:{firstName:t.user.firstName,lastName:t.user.lastName,username:t.user.username,profilePic:t.user.profilePic,coverPhoto:t.user.coverPhoto},_id:new Date},Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{chats:u})});case he:return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{numberOfNotifications:t.markAll?0:e.userDetails.numberOfNotifications-1})});case Pe:return Object(T.a)(Object(T.a)({},e),{},{userDetails:Object(T.a)(Object(T.a)({},e.userDetails),{},{numberOfNotifications:e.userDetails.numberOfNotifications+1})});default:return e}},De={users:[],currentPageUser:1,pageSizeUser:30,pagesUser:1,totalItemsCountUser:10,userLoading:!1},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.USERS_LOADING:return Object(T.a)(Object(T.a)({},e),{},{userLoading:!0});case b.FETCH_USERS:return Object(T.a)(Object(T.a)({},e),{},{users:Object(H.a)(t.userDetails),userLoading:!1,currentPageUser:t.currentPageUser,pageSizeUser:t.pageSizeUser,pagesUser:t.pagesUser,totalItemsCountUser:t.totalItemsCountUser});case b.CLEAR_USER_SEARCH:return Object(T.a)(Object(T.a)({},e),{},{users:[],currentPageUser:1,pageSizeUser:30,pagesUser:1,totalItemsCountUser:10,userLoading:!1});default:return e}},Le=Object(M.c)({user:Ne,post:ie,userSearch:Re,chat:z,notification:X}),ve=a(76),Ce=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||M.d,xe=Object(M.e)(Le,Ce(Object(M.a)(ve.a))),we=Object(n.jsx)(d.a,{store:xe,children:Object(n.jsx)(l.c,{history:j.a,children:Object(n.jsx)(y,{})})});console.log=function(){},c.a.render(we,document.getElementById("root"))},44:function(e,t,a){"use strict";var n=a(75),s=a.n(n),r=a(9),c=s.a.create({baseURL:"/"});!function(e){var t=e.interceptors.response.use((function(e){return e}),(function(a){return a.response&&403===a.response.status&&(r.a.push("/login"),localStorage.removeItem("accessToken"),localStorage.removeItem("email"),localStorage.removeItem("userName"),localStorage.removeItem("firstName"),localStorage.removeItem("lastName"),localStorage.removeItem("profilePic")),e.interceptors.response.eject(t),Promise.reject(a)}))}(c),t.a=c},45:function(e,t,a){"use strict";var n=a(2);a(1),a(140);t.a=function(e){var t=e.width;return Object(n.jsx)("div",{className:"loader",style:{width:t,height:t},children:"Loading..."})}},46:function(e,t,a){"use strict";var n=a(1),s=a(29),r=a.n(s);t.a=function(){var e=Object(n.useRef)();return Object(n.useEffect)((function(){return e.current=r()("/",{transports:["websocket"]}),function(){e.current.close()}}),[]),{socket:e}}},5:function(e,t,a){"use strict";a.r(t),a.d(t,"USER_ERROR",(function(){return n})),a.d(t,"CLEAR_USER_ERROR",(function(){return s})),a.d(t,"AUTH_LOADING",(function(){return r})),a.d(t,"SIGNUP",(function(){return c})),a.d(t,"LOGIN",(function(){return o})),a.d(t,"LOGOUT",(function(){return i})),a.d(t,"CREATE_POST",(function(){return u})),a.d(t,"DELETE_POST",(function(){return l})),a.d(t,"POST_ERROR",(function(){return O})),a.d(t,"FETCH_POSTS",(function(){return j})),a.d(t,"POST_LOADING",(function(){return d})),a.d(t,"LIKE_POST",(function(){return b})),a.d(t,"RETWEET_POST",(function(){return g})),a.d(t,"UNRETWEET_POST",(function(){return f})),a.d(t,"RETWEET_LOADING",(function(){return p})),a.d(t,"REPLY_TO_POST",(function(){return m})),a.d(t,"VIEW_SINGLE_POST",(function(){return E})),a.d(t,"FOLLOW_USER",(function(){return I})),a.d(t,"CHANGE_PROFILE_PIC",(function(){return S})),a.d(t,"CHANGE_COVER_PHOTO",(function(){return _})),a.d(t,"PIN_POST",(function(){return T})),a.d(t,"FETCH_USERS",(function(){return h})),a.d(t,"USERS_LOADING",(function(){return P})),a.d(t,"CLEAR_USER_SEARCH",(function(){return A})),a.d(t,"CREATE_CHAT",(function(){return N})),a.d(t,"CHAT_LOADING",(function(){return D})),a.d(t,"FETCH_CHAT_MESSAGES",(function(){return R})),a.d(t,"CHAT_MESSAGES_ERROR",(function(){return L})),a.d(t,"CHANGE_CHAT_NAME",(function(){return v})),a.d(t,"SEND_MESSAGE",(function(){return C})),a.d(t,"SEND_MESSAGE_ERROR",(function(){return x})),a.d(t,"UPDATE_LATEST_MESSAGE",(function(){return w})),a.d(t,"CLEAR_MESSAGES",(function(){return U})),a.d(t,"NOTIFICATIONS_LOADING",(function(){return k})),a.d(t,"FETCH_NOTIFICATIONS",(function(){return G})),a.d(t,"ADD_NOTIFICATION",(function(){return y})),a.d(t,"MARK_READ",(function(){return M}));var n="USER_ERROR",s="CLEAR_USER_ERROR",r="AUTH_LOADING",c="SIGNUP",o="LOGIN",i="LOGOUT",u="CREATE_POST",l="DELETE_POST",O="POST_ERROR",j="FETCH_POSTS",d="POST_LOADING",b="LIKE_POST",g="RETWEET_POST",f="UNRETWEET_POST",p="RETWEET_LOADING",m="REPLY_TO_POST",E="VIEW_SINGLE_POST",I="FOLLOW_USER",S="CHANGE_PROFILE_PIC",_="CHANGE_COVER_PHOTO",T="PIN_POST",h="FETCH_USERS",P="USERS_LOADING",A="CLEAR_USER_SEARCH",N="CREATE_CHAT",D="CHAT_LOADING",R="FETCH_CHAT_MESSAGES",L="CHAT_MESSAGES_ERROR",v="CHANGE_CHAT_NAME",C="SEND_MESSAGE",x="SEND_MESSAGE_ERROR",w="UPDATE_LATEST_MESSAGE",U="CLEAR_MESSAGES",k="NOTIFICATIONS_LOADING",G="FETCH_NOTIFICATIONS",y="ADD_NOTIFICATION",M="MARK_READ"},83:function(e,t,a){},84:function(e,t,a){},9:function(e,t,a){"use strict";var n=a(8);t.a=Object(n.a)()}},[[142,5,6]]]);
//# sourceMappingURL=main.89ea100c.chunk.js.map