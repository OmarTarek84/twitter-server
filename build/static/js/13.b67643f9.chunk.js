(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[13],{112:function(e,t,r){},113:function(e,t,r){},115:function(e,t,r){},134:function(e,t,r){"use strict";r.r(t);var a=r(2),n=r(21),o=r.n(n),s=r(27),c=r(83),i=r(4),l=r(1),u=r(0),p=(r(112),r(28)),d=r(29),f=(r(113),r(96)),g=(r(114),r(90)),m=function(e,t){var r=6e4,a=36e5,n=864e5,o=2592e6,s=31536e6,c=e-t;return c<r?c/1e3<30?"Just Now":Math.round(c/1e3)+" seconds ago":c<a?Math.round(c/r)+" minutes ago":c<n?Math.round(c/a)+" hours ago":c<o?Math.round(c/n)+" days ago":c<s?Math.round(c/o)+" months ago":Math.round(c/s)+" years ago"},b=function(e){var t=e.posts,r=e.deletePostReqGoHome,n=e.retweetReq,o=e.viewSinglePostReq,s=e.likePostReq,c=e.postActionLoading,i=e.retweetActionLoading,l=e.selectTabIndex,u=e.goToProfile,p=e.submitReplyReq,d=e.disableReply,b=e.pinPost,j=e.pinnedPostId,h=t.map((function(e){return Object(a.jsx)(g.a,{postId:e._id,firstName:e.postedBy.firstName,lastName:e.postedBy.lastName,username:e.postedBy.username,content:e.content,createdAt:m(new Date,new Date(e.content?e.createdAt:e.retweetData.createdAt)),profilePic:e.postedBy.profilePic,likePostReq:s,likes:e.likes,postActionLoading:c,loggedInUsername:localStorage.getItem("userName"),retweetReq:n,retweetActionLoading:i,retweetUsers:e.retweetUsers,retweetData:e.retweetData,combineretweetsAndPosts:!0,replyTo:e.replyTo||null,replyToUsername:e.replyTo&&e.replyTo.originalPost?e.replyTo.originalPost.postedBy.username:null,replyPostTypeReplyToUsername:e.postedBy.username,viewSinglePostReq:function(){return o(e._id,e.replyTo?e.replyTo.originalPost._id:null)},deletePost:r,goToProfile:u,disableReply:d,pinPost:function(){return b(e._id)},pinnedPostId:j,submitReplyReq:p},e._id)}));return Object(a.jsxs)(f.d,{onSelect:l,children:[Object(a.jsxs)(f.b,{children:[Object(a.jsx)(f.a,{children:"Posts"}),Object(a.jsx)(f.a,{children:"Replies"})]}),Object(a.jsx)(f.c,{children:h}),Object(a.jsx)(f.c,{children:h})]})},j=r(16),h=r(12),O=r(85),w=r(6),P=(r(115),r(116)),x=r.n(P),y=(r(117),function(e){var t,r,n=e.closeUploadModal,o=e.uploadProfilePic,s=e.photoType,i=Object(u.useState)(),l=Object(c.a)(i,2),p=l[0],d=l[1],f=Object(u.useRef)(null),g=Object(u.useRef)(null),m=Object(u.useState)({unit:"%",width:30,aspect:"profilePic"===s?1:16/9}),b=Object(c.a)(m,2),j=b[0],h=b[1],O=Object(u.useState)(null),w=Object(c.a)(O,2),P=w[0],y=w[1],v=Object(u.useCallback)((function(e){f.current=e}),[]);return Object(u.useEffect)((function(){if(P&&g.current&&f.current){var e=f.current,t=g.current,r=P,a=e.naturalWidth/e.width,n=e.naturalHeight/e.height,o=t.getContext("2d"),s=window.devicePixelRatio;t.width=r.width*s,t.height=r.height*s,o.setTransform(s,0,0,s,0,0),o.imageSmoothingQuality="high",o.drawImage(e,r.x*a,r.y*n,r.width*a,r.height*n,0,0,r.width,r.height)}}),[P]),Object(a.jsx)("div",{className:"backdrop",children:Object(a.jsxs)("div",{className:"replyModal",children:[Object(a.jsxs)("div",{className:"titleP",children:[Object(a.jsxs)("h2",{children:["Upload A new ","profilePic"===s?"Profile Picture":"Cover Photo"]}),Object(a.jsx)("i",{className:"fa fa-times",onClick:n})]}),Object(a.jsxs)("div",{className:"fileInput",children:[Object(a.jsx)("input",{type:"file",name:"image",accept:"image/*",onChange:function(e){if(e.target.files&&e.target.files.length>0){var t=new FileReader;t.addEventListener("load",(function(){return d(t.result)})),t.readAsDataURL(e.target.files[0])}}}),Object(a.jsx)("canvas",{ref:g,style:{width:Math.round(null!==(t=null===P||void 0===P?void 0:P.width)&&void 0!==t?t:0),height:Math.round(null!==(r=null===P||void 0===P?void 0:P.height)&&void 0!==r?r:0)}}),Object(a.jsx)(x.a,{src:p,onImageLoaded:v,crop:j,onChange:function(e){return h(e)},onComplete:function(e){return y(e)}})]}),Object(a.jsxs)("div",{className:"btnActions",children:[Object(a.jsx)("button",{className:"btn btn-primary upload",disabled:!j||!g.current,onClick:function(){o(g.current.toDataURL(),s),n()},children:"Upload"}),Object(a.jsx)("button",{className:"btn btn-danger",onClick:n,children:"Cancel"})]})]})})}),v=r(128),N=r(84),R=r(30),I=r(87),k={userLoading:!1,profile:null,error:null,combinedPostsAndRetweets:[],followLoading:!1,imageUploadProgressRunning:!1,imageUploadProgress:0},A=function(e,t){switch(t.type){case"user_loading":return Object(l.a)(Object(l.a)({},e),{},{userLoading:!0,error:null});case"fetch_user":return Object(l.a)(Object(l.a)({},e),{},{userLoading:!1,profile:t.profile,combinedPostsAndRetweets:[].concat(Object(i.a)(t.profile.posts),Object(i.a)(t.profile.retweets)),followLoading:!1});case"user_error":return Object(l.a)(Object(l.a)({},e),{},{error:t.error,userLoading:!1,followLoading:!1});case"retweet":var r=Object(i.a)(e.combinedPostsAndRetweets),a=r.findIndex((function(e){return e._id===t.postId})),n=Object(i.a)(r[a].retweetUsers);return n.findIndex((function(e){return e.username===localStorage.getItem("userName")}))>-1?n=n.filter((function(e){return e.username!==localStorage.getItem("userName")})):n.unshift({firstName:localStorage.getItem("firstName"),lastName:localStorage.getItem("lastName"),username:localStorage.getItem("userName"),profilePic:localStorage.getItem("profilePic")}),r[a].retweetUsers=n,Object(l.a)(Object(l.a)({},e),{},{profile:Object(l.a)(Object(l.a)({},e.profile),{},{combinedPostsAndRetweets:r})});case"like_post":var o=Object(i.a)(e.combinedPostsAndRetweets);1===t.tabIndex&&(o=Object(i.a)(e.profile.replies));var s=o.findIndex((function(e){return e._id===t.postId})),c=Object(i.a)(o[s].likes),u=c.findIndex((function(e){return e.username===localStorage.getItem("userName")}));return u>-1?c.splice(u,1):c.push({firstName:localStorage.getItem("firstName"),lastName:localStorage.getItem("lastName"),username:localStorage.getItem("userName"),profilePic:localStorage.getItem("profilePic")}),o[s].likes=c,0===t.tabIndex?Object(l.a)(Object(l.a)({},e),{},{combinedPostsAndRetweets:o}):Object(l.a)(Object(l.a)({},e),{},{profile:Object(l.a)(Object(l.a)({},e.profile),{},{replies:o})});case"delete_reply_post":var p=Object(i.a)(e.profile.replies),d=p.findIndex((function(e){return e._id===t.replyPostId}));return p.splice(d,1),Object(l.a)(Object(l.a)({},e),{},{profile:Object(l.a)(Object(l.a)({},e.profile),{},{replies:Object(i.a)(p)})});case"follow_loading":return Object(l.a)(Object(l.a)({},e),{},{followLoading:!0});case"follow_user":return"Add"===t.resType?Object(l.a)(Object(l.a)({},e),{},{profile:Object(l.a)(Object(l.a)({},e.profile),{},{followers:[].concat(Object(i.a)(e.profile.followers),[t.follower])}),followLoading:!1}):Object(l.a)(Object(l.a)({},e),{},{profile:Object(l.a)(Object(l.a)({},e.profile),{},{followers:e.profile.followers.filter((function(e){return e.username!==t.follower.username}))}),followLoading:!1});case"image_upload":return Object(l.a)(Object(l.a)({},e),{},{imageUploadProgressRunning:!0,imageUploadProgress:t.progress});case"change_profile_pic":return Object(l.a)(Object(l.a)({},e),{},{imageUploadProgressRunning:!1,imageUploadProgress:0,profile:Object(l.a)(Object(l.a)({},e.profile),{},{profilePic:t.profilePic})});case"change_cover_photo":return Object(l.a)(Object(l.a)({},e),{},{imageUploadProgressRunning:!1,imageUploadProgress:0,profile:Object(l.a)(Object(l.a)({},e.profile),{},{coverPhoto:t.coverPhoto})});default:return e}};t.default=function(e){var t=Object(u.useReducer)(A,k),r=Object(c.a)(t,2),n=r[0],i=r[1],l=Object(u.useState)(0),f=Object(c.a)(l,2),g=f[0],m=f[1],P=Object(u.useState)(!1),x=Object(c.a)(P,2),_=x[0],S=x[1],T=Object(u.useState)({open:!1,type:"profilePic"}),C=Object(c.a)(T,2),U=C[0],L=C[1],E=Object(u.useRef)(),B=Object(u.useRef)(),D=Object(u.useRef)(),M=Object(j.b)(),q=Object(j.c)((function(e){return e.post})),H=q.postActionLoading,F=q.retweetActionLoading,G=Object(j.c)((function(e){return e.user})),z=G.token,Y=G.userDetails,W=Object(j.c)((function(e){return e.chat})).chatLoading,J=function(e,t){M(Object(O.d)(e,t)),i({type:"like_post",postId:e,tabIndex:g})},Q=function(e,t){D.current=R.b.warning("Submitting Your retweet..."),M(Object(O.f)(e,t)).then((function(){R.b.dismiss(D.current),R.b.success("Retweet Success")})),i({type:"retweet",postId:e})},V=function(e,t){i({type:"delete_reply_post",replyPostId:e}),M(Object(O.b)(e,t))},K=function(e,t){h.a.push("/post/".concat(t||e),{postId:t||e,backgroundGreenPostId:e})},X=function(e){h.a.push("/profile/".concat(e))},Z=function(e){m(e)},$=function(){var e=Object(s.a)(o.a.mark((function e(t,r){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B.current=R.b.warning("Submitting Your Reply..."),e.next=3,M(Object(O.e)(t.reply,r));case 3:a=e.sent,R.b.dismiss(B.current),R.b.success("Reply Post Success"),i({type:"add_reply",reply:a.post});case 7:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),ee=function(e){h.a.push("/profile/".concat(n.profile.username,"/follow"),{tabIndex:e,username:n.profile.username,followers:n.profile.followers,following:n.profile.following,firstName:n.profile.firstName,lastName:n.profile.lastName})},te=function(e){E.current=R.b.warning("Pinning Post..."),M(Object(N.b)(e)).then((function(){R.b.dismiss(E.current),R.b.success("Pin Post Success")}))},re=function(){var e=Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i({type:"follow_loading"}),e.next=3,p.a.put("/user/follow/".concat(n.profile.username),{},{headers:{Authorization:"Bearer "+z||!1}});case 3:t=e.sent,M({type:w.FOLLOW_USER,newfollowingUser:t.data&&t.data.newfollowingUser?t.data.newfollowingUser:null}),i({type:"follow_user",follower:{firstName:Y.firstName,lastName:Y.lastName,email:Y.email,profilePic:Y.profilePic,username:Y.username},resType:t.data.type}),R.b.success("Add"===t.data.type?"You are following ".concat(t.data.newfollowingUser.firstName," ").concat(t.data.newfollowingUser.lastName):"You unfollowed ".concat(t.data.newfollowingUser.firstName," ").concat(t.data.newfollowingUser.lastName)),"Add"===t.data.type?S(!0):S(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(e){L({type:e,open:!0})},ne=function(){var e=Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M(Object(I.b)([n.profile.username],!1));case 2:t=e.sent,h.a.push("/chat/".concat(t.chat._id));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){(function(){var t=Object(s.a)(o.a.mark((function t(){var r,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i({type:"user_loading"}),m(0),t.prev=2,t.next=5,p.a.get("/user/profile/".concat(e.match.params.username),{headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});case 5:r=t.sent,i({type:"fetch_user",profile:r.data,likes:r.data.likes,retweets:r.data.retweets}),console.log(r.data),a=r.data.followers.findIndex((function(e){return e.username===localStorage.getItem("userName")}))>-1,S(a),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(2),console.log(t.t0),i({type:"user_error",error:t.t0.response&&t.t0.response.data&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message});case 16:case"end":return t.stop()}}),t,null,[[2,12]])})));return function(){return t.apply(this,arguments)}})()()}),[e.match.params.username]);var oe=function(){var e=Object(s.a)(o.a.mark((function e(t,r,a){var n,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.arrayBuffer();case 5:return s=e.sent,e.abrupt("return",new File([s],r,{type:a}));case 7:case"end":return e.stop()}}),e)})));return function(t,r,a){return e.apply(this,arguments)}}(),se=function(e){var t=e.loaded/e.total*100;i({type:"image_upload",progress:t})},ce=function(){var e=Object(s.a)(o.a.mark((function e(t,r){var a,n,s,c,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("/user/getSignedUrl?photoType="+r,{headers:{Authorization:"Bearer "+(z||localStorage.getItem("accessToken"))}});case 2:return a=e.sent,n=a.data,s=n.url,c=n.imagePath,console.log(a.data),e.next=7,oe(t,"".concat(Y.username||localStorage.getItem("userName"),".png"),"image/png");case 7:return l=e.sent,e.prev=8,e.next=11,p.a.put(s,l,{headers:{"Content-Type":"image/png"},onUploadProgress:"profilePic"===r?se:null});case 11:if("profilePic"!==r){e.next=18;break}return M({type:w.CHANGE_PROFILE_PIC,profilePic:c+"?"+(new Date).getTime()}),i({type:"change_profile_pic",profilePic:c+"?"+(new Date).getTime()}),e.next=16,p.a.put("/user/changeProfilePic",{imagePath:c},{headers:{Authorization:"Bearer "+(z||localStorage.getItem("accessToken"))}});case 16:e.next=22;break;case 18:return M({type:w.CHANGE_COVER_PHOTO,coverPhoto:c+"?"+(new Date).getTime()}),i({type:"change_cover_photo",coverPhoto:c+"?"+(new Date).getTime()}),e.next=22,p.a.put("/user/changeCoverPhoto",{imagePath:c},{headers:{Authorization:"Bearer "+(z||localStorage.getItem("accessToken"))}});case 22:R.b.success("Your photo has been changed"),e.next=28;break;case 25:e.prev=25,e.t0=e.catch(8),console.log(e.t0);case 28:case"end":return e.stop()}}),e,null,[[8,25]])})));return function(t,r){return e.apply(this,arguments)}}();return Object(a.jsxs)("div",{className:"profile",children:[!n.userLoading&&n.profile?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("h2",{children:[n.profile.firstName," ",n.profile.lastName]}),Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"coverphoto",style:{backgroundColor:!n.profile.coverPhoto&&"#00ACEE"},children:[Object(a.jsx)("button",{className:"cameraCoverPhoto",onClick:function(){return ae("coverPhoto")},style:{display:(n.profile.username!==localStorage.getItem("userName")||n.imageUploadProgressRunning)&&"none"},disabled:n.imageUploadProgressRunning,children:Object(a.jsx)("i",{className:"fas fa-camera"})}),n.profile.coverPhoto&&Object(a.jsx)("img",{src:n.profile.coverPhoto,alt:n.profile.username})]}),Object(a.jsxs)("div",{className:"profilePic",children:[Object(a.jsx)("img",{src:n.profile.profilePic,alt:n.profile.username,style:{WebkitFilter:n.imageUploadProgressRunning?"blur(3px)":"none",filter:n.imageUploadProgressRunning?"blur(3px)":"none",msFilter:n.imageUploadProgressRunning?"blur(3px)":"none"}}),Object(a.jsx)("button",{className:"camera",onClick:function(){return ae("profilePic")},style:{display:(n.profile.username!==localStorage.getItem("userName")||n.imageUploadProgressRunning)&&"none"},disabled:n.imageUploadProgressRunning,children:Object(a.jsx)("i",{className:"fas fa-camera"})}),n.imageUploadProgressRunning&&Object(a.jsx)("div",{className:"progressCir",children:Object(a.jsx)(v.a,{percent:"70",strokeWidth:"4",strokeColor:"#00875D"})})]}),Object(a.jsxs)("div",{className:"emailfollowing",style:{display:n.profile.username===(Y?Y.username:localStorage.getItem("userName"))?"none":"flex"},children:[W?Object(a.jsx)(d.a,{width:"30px"}):Object(a.jsx)("button",{className:"email",onClick:ne,children:Object(a.jsx)("i",{className:"fa fa-envelope"})}),Object(a.jsx)("button",{className:"follow",onClick:re,disabled:n.followLoading,style:{backgroundColor:_?"#00ACEE":"white",color:_?"white":"#00ACEE"},children:_?"Following":"Follow"})]}),Object(a.jsxs)("div",{className:"userdetails",style:{marginTop:n.profile.username===(Y?Y.username:localStorage.getItem("userName"))?"70px":"20px"},children:[Object(a.jsxs)("p",{className:"firstlastname",children:[n.profile.firstName," ",n.profile.lastName]}),Object(a.jsxs)("p",{className:"username",children:["@",n.profile.username]}),Object(a.jsxs)("div",{className:"followingfollowers",children:[Object(a.jsxs)("p",{onClick:function(){return ee(0)},children:[Object(a.jsx)("span",{children:n.profile.following.length})," Following"]}),Object(a.jsxs)("p",{onClick:function(){return ee(1)},children:[Object(a.jsx)("span",{children:n.profile.followers.length})," Followers"]})]})]}),Object(a.jsx)("div",{className:"tabs",children:Object(a.jsx)(b,{likePostReq:J,viewSinglePostReq:K,retweetReq:Q,deletePostReqGoHome:V,postActionLoading:H,retweetActionLoading:F,posts:0===g?n.combinedPostsAndRetweets:n.profile.replies,selectTabIndex:Z,goToProfile:X,disableReply:1===g,submitReplyReq:$,pinnedPostId:Y&&Y.pinnedPost?Y.pinnedPost._id:null,pinPost:te})})]})]}):Object(a.jsx)(d.a,{width:"60"}),U.open&&Object(a.jsx)(y,{token:z,username:Y.username||localStorage.getItem("userName"),closeUploadModal:function(){L({type:"profilePic",open:!1})},uploadProfilePic:ce,photoType:U.type})]})}},87:function(e,t,r){"use strict";r.d(t,"c",(function(){return i})),r.d(t,"b",(function(){return l})),r.d(t,"a",(function(){return u}));var a=r(21),n=r.n(a),o=r(27),s=r(28),c=r(6),i=function(e){return function(){var t=Object(o.a)(n.a.mark((function t(r,a){var o,i,l;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r({type:c.CHAT_LOADING}),o=a().user&&a().user.token?a().user.token:localStorage.getItem("accessToken"),t.next=5,s.a.get("/chat/getMessages?chatId=".concat(e),{headers:{Authorization:"Bearer "+o}});case 5:i=t.sent,l=i.data,r({type:c.FETCH_CHAT_MESSAGES,chat:l}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),r({type:c.CHAT_MESSAGES_ERROR,error:t.t0.response&&t.t0.response.data&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message});case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e,r){return t.apply(this,arguments)}}()},l=function(e,t){return function(){var r=Object(o.a)(n.a.mark((function r(a,o){var i,l,u;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a({type:c.CHAT_LOADING}),r.next=4,s.a.post("/chat/createChat?isGroupChat=".concat(t),{users:e},{headers:{Authorization:"Bearer "+(o().user.token||localStorage.getItem("accessToken"))}});case 4:return i=r.sent,l=i.data,r.next=8,a({type:c.CREATE_CHAT,chat:l});case 8:return u=r.sent,r.abrupt("return",u);case 12:r.prev=12,r.t0=r.catch(0),console.log(r.t0);case 15:case"end":return r.stop()}}),r,null,[[0,12]])})));return function(e,t){return r.apply(this,arguments)}}()},u=function(e,t){return function(){var r=Object(o.a)(n.a.mark((function r(a,o){return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,s.a.put("/chat/changeChatName?chatId=".concat(e),{chatName:t},{headers:{Authorization:"Bearer "+(o().user.token||localStorage.getItem("accessToken"))}});case 3:a({type:c.CHANGE_CHAT_NAME,chatName:t}),r.next=9;break;case 6:r.prev=6,r.t0=r.catch(0),console.log(r.t0);case 9:case"end":return r.stop()}}),r,null,[[0,6]])})));return function(e,t){return r.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=13.b67643f9.chunk.js.map