(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[7],{146:function(e,t,n){"use strict";var s=n(2),o=(n(1),n(147),n(156)),i=n.n(o);t.a=function(e){var t=e.handlePageChange,n=e.pageSize,o=e.totalItemsCount,c=e.currentPage;return Object(s.jsx)(i.a,{itemClass:"page-item",linkClass:"page-link",activePage:c,itemsCountPerPage:n,totalItemsCount:o,pageRangeDisplayed:10,onChange:t})}},147:function(e,t,n){},150:function(e,t,n){"use strict";var s=n(2),o=(n(1),n(151),n(13));t.a=function(e){var t=e.username,n=e.profilePic,i=e.firstName,c=e.lastName,a=e.loggedinFollowing,r=e.followUser,l=e.followLoading,u=e.followIndex,d=e.userIndex,p=e.parentUserClicked,b=a?a.findIndex((function(e){return e.username===t}))>-1:null;return Object(s.jsxs)("div",{className:"userDet",onClick:p,children:[Object(s.jsx)("div",{className:"details",children:Object(s.jsxs)("div",{className:"picAndName",children:[Object(s.jsx)("img",{src:n,alt:t}),Object(s.jsxs)(o.a,{className:"firstlastname",to:"/profile/".concat(t),onClick:function(e){return e.stopPropagation()},children:[i," ",c]}),Object(s.jsxs)("span",{className:"username",children:["@",t]})]})}),Object(s.jsx)("div",{className:"followBtn",style:{display:t!==localStorage.getItem("userName")&&r&&a?"flex":"none"},children:Object(s.jsx)("button",{style:{backgroundColor:b?"#00ACEE":"white",color:b?"white":"#00ACEE"},disabled:l&&u===d,onClick:r,children:b?"Following":"Follow"})})]},t)}},151:function(e,t,n){},180:function(e,t,n){},181:function(e,t,n){},201:function(e,t,n){"use strict";n.r(t);var s=n(2),o=n(143),i=n(1),c=(n(180),n(181),n(157)),a=n(152),r=n(45),l=n(150),u=function(e,t){var n=6e4,s=36e5,o=864e5,i=2592e6,c=31536e6,a=e-t;return a<n?a/1e3<30?"Just Now":Math.round(a/1e3)+" seconds ago":a<s?Math.round(a/n)+" minutes ago":a<o?Math.round(a/s)+" hours ago":a<i?Math.round(a/o)+" days ago":a<c?Math.round(a/i)+" months ago":Math.round(a/c)+" years ago"},d=function(e){var t=e.selectTabIndex,n=e.posts,o=e.deletePost,i=e.retweetReq,d=e.viewSinglePostReq,p=e.likePostReq,b=e.postActionLoading,j=e.retweetActionLoading,g=e.goToProfile,f=e.submitReplyReq,m=e.disableReply,h=e.pinPost,O=e.pinnedPostId,P=e.postLoading,w=e.users,x=e.userLoading,y=n.map((function(e){return Object(s.jsx)(a.a,{postId:e._id,firstName:e.postedBy.firstName,lastName:e.postedBy.lastName,username:e.postedBy.username,content:e.content,createdAt:u(new Date,new Date(e.content?e.createdAt:e.retweetData.createdAt)),profilePic:e.postedBy.profilePic,likePostReq:p,likes:e.likes,postActionLoading:b,loggedInUsername:localStorage.getItem("userName"),retweetReq:i,retweetActionLoading:j,retweetUsers:e.retweetUsers,retweetData:e.retweetData,combineretweetsAndPosts:!0,replyTo:e.replyTo||null,replyToUsername:e.replyTo&&e.replyTo.originalPost?e.replyTo.originalPost.postedBy.username:null,replyPostTypeReplyToUsername:e.postedBy.username,viewSinglePostReq:function(){return d(e._id,e.replyTo?e.replyTo.originalPost._id:null)},deletePost:o,goToProfile:g,disableReply:m,pinPost:function(){return h(e._id)},pinnedPostId:O,submitReplyReq:f},e._id)})),N=w.map((function(e,t){return Object(s.jsx)(l.a,{firstName:e.firstName,lastName:e.lastName,username:e.username,profilePic:e.profilePic,parentUserClicked:function(){}},e.username)}));return Object(s.jsxs)(c.d,{onSelect:t,children:[Object(s.jsxs)(c.b,{children:[Object(s.jsx)(c.a,{children:"Posts"}),Object(s.jsx)(c.a,{children:"Users"})]}),Object(s.jsx)(c.c,{children:P?Object(s.jsx)(r.a,{width:"60px"}):n.length>0?y:Object(s.jsx)("h3",{className:"notfound",children:"No Posts Found."})}),Object(s.jsx)(c.c,{children:x?Object(s.jsx)(r.a,{width:"60px"}):w.length>0?N:Object(s.jsx)("h3",{className:"notfound",children:"No Users Found."})})]})},p=n(146),b=n(21),j=n(145),g=n(144),f=n(9),m=n(33),h=n(46);t.default=function(){var e=Object(i.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(0),r=Object(o.a)(a,2),l=r[0],u=r[1],O=Object(h.a)().socket,P=Object(b.b)(),w=Object(i.useRef)(),x=Object(i.useRef)(),y=Object(i.useRef)(),N=Object(i.useRef)(),R=Object(b.c)((function(e){return e.post})),S=R.posts,v=R.currentPage,C=R.pageSize,I=R.totalItemsCount,T=R.pages,k=R.postActionLoading,A=R.retweetActionLoading,L=R.postLoading,U=Object(b.c)((function(e){return e.userSearch})),q=U.users,D=U.currentPageUser,E=U.pageSizeUser,F=U.totalItemsCountUser,B=U.pagesUser,M=U.userLoading,_=Object(b.c)((function(e){return e.user})).userDetails,z=function(e){P(0===l?Object(j.c)(e,30,n):Object(g.c)(e,30,n,""))};Object(i.useEffect)((function(){if(n||!((0===l?S:q).length<=0)){var e=setTimeout((function(){n&&P(0===l?Object(j.c)(1,30,n):Object(g.c)(1,30,n,""))}),500);return function(){clearTimeout(e)}}P(0===l?Object(j.c)(1,30,n):Object(g.c)(1,30,n,""))}),[n,l,P]);return console.log("SEARCH RENDERED"),Object(s.jsxs)("div",{className:"search",children:[Object(s.jsx)("h2",{children:"Search"}),Object(s.jsxs)("div",{className:"input",children:[Object(s.jsx)("i",{className:"fa fa-search"}),Object(s.jsx)("input",{type:"text",value:n,onChange:function(e){return c(e.target.value)}})]}),M||L||0===l&&T<=1||1===l&&B<=1?null:Object(s.jsx)("div",{className:"paginate",children:0===l?Object(s.jsx)(p.a,{handlePageChange:z,currentPage:v,pageSize:C,pages:T,totalItemsCount:I}):Object(s.jsx)(p.a,{handlePageChange:z,currentPage:D,pageSize:E,pages:B,totalItemsCount:F})}),Object(s.jsx)("div",{className:"tab",children:Object(s.jsx)(d,{likePostReq:function(e,t,n){P(Object(j.d)(e,t)),n!==_.username&&O.current.emit("notification Sent",{notificationFrom:_.username,notificationTo:[n],type:"like",postId:e})},viewSinglePostReq:function(e,t){f.a.push("/post/".concat(t||e),{postId:t||e,backgroundGreenPostId:e})},retweetReq:function(e,t,n){y.current=m.b.warning("Submitting Your retweet..."),P(Object(j.f)(e,t)).then((function(){m.b.dismiss(y.current),m.b.success("Retweet Success"),n!==_.username&&O.current.emit("notification Sent",{notificationFrom:_.username,notificationTo:[n],type:"retweet",postId:e})}))},deletePost:function(e,t){N.current=m.b.warning("Delete post in progress"),P(Object(j.b)(e,t)).then((function(){m.b.dismiss(N.current),m.b.success("Delete Post Success")}))},postLoading:L,postActionLoading:k,retweetActionLoading:A,selectTabIndex:function(e){u(e)},goToProfile:function(e){f.a.push("/profile/".concat(e))},disableReply:1===l,submitReplyReq:function(e,t,n){x.current=m.b.warning("Submitting Your Reply..."),P(Object(j.e)(e.reply,t)).then((function(){m.b.dismiss(x.current),m.b.success("Reply Post Success"),O.current.emit("notification Sent",{notificationFrom:_.username,notificationTo:[n],type:"reply",postId:t})}))},pinnedPostId:_&&_.pinnedPost?_.pinnedPost._id:null,pinPost:function(e){w.current=m.b.warning("Pinning Post..."),P(Object(g.b)(e)).then((function(){m.b.dismiss(w.current),m.b.success("Pin Post Success")}))},posts:S,users:q,userLoading:M})})]})}}}]);
//# sourceMappingURL=7.78910879.chunk.js.map