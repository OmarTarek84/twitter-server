(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[8],{151:function(e,t,n){"use strict";var s=n(2),o=(n(0),n(152),n(155)),i=n.n(o);t.a=function(e){var t=e.handlePageChange,n=e.pageSize,o=e.totalItemsCount,r=e.currentPage;return Object(s.jsx)(i.a,{itemClass:"page-item",linkClass:"page-link",activePage:r,itemsCountPerPage:n,totalItemsCount:o,pageRangeDisplayed:10,onChange:t})}},152:function(e,t,n){},159:function(e,t,n){},160:function(e,t,n){},161:function(e,t,n){},190:function(e,t,n){"use strict";n.r(t);var s=n(2),o=n(0),i=n(21),r=n(142),a=n(141),c=(n(159),n(140)),d=(n(160),n(148)),u=n(44),p=function(){var e=Object(i.c)((function(e){return e.user})).userDetails,t=Object(d.a)(),n=t.register,a=t.handleSubmit,p=t.errors,l=t.reset,P=Object(o.useState)(!1),g=Object(c.a)(P,2),b=g[0],m=g[1],f=Object(i.b)();return Object(s.jsx)("div",{className:"postfeed",children:Object(s.jsxs)("div",{className:"postflex",children:[Object(s.jsx)("div",{className:"profilePic",children:Object(s.jsx)("img",{src:(null===e||void 0===e?void 0:e.profilePic)||localStorage.getItem("profilePic"),alt:"profile pic"})}),Object(s.jsxs)("form",{onSubmit:a((function(e){m(!0),f(Object(r.a)(e)).then((function(){l(),m(!1)})).catch((function(e){return m(!1)}))})),children:[Object(s.jsx)("textarea",{name:"content",placeholder:"What's Happening?",ref:n({required:!0})}),b?Object(s.jsx)("div",{className:"spinner",children:Object(s.jsx)(u.a,{width:"40px"})}):Object(s.jsx)("button",{type:"submit",disabled:!!p.content,className:"btn btn-primary",children:"Post"})]})]})})},l=(n(161),n(147)),P=function(e,t){var n=6e4,s=36e5,o=864e5,i=2592e6,r=31536e6,a=e-t;return a<n?a/1e3<30?"Just Now":Math.round(a/1e3)+" seconds ago":a<s?Math.round(a/n)+" minutes ago":a<o?Math.round(a/s)+" hours ago":a<i?Math.round(a/o)+" days ago":a<r?Math.round(a/i)+" months ago":Math.round(a/r)+" years ago"},g=function(e){var t=e.posts,n=e.likePostReq,o=e.postActionLoading,i=e.submitReplyReq,r=e.viewSinglePostReq,a=e.retweetActionLoading,c=e.loggedInUsername,d=e.retweetReq,u=e.deletePost,p=e.goToProfile,g=e.pinPost,b=e.pinnedPost,m=e.pinnedPostId,f=t.map((function(e){return Object(s.jsx)(l.a,{postId:e._id,firstName:e.postedBy.firstName,lastName:e.postedBy.lastName,username:e.postedBy.username,content:e.content,createdAt:P(new Date,new Date(e.content?e.createdAt:e.retweetData.createdAt)),goToProfile:p,profilePic:e.postedBy.profilePic,likePostReq:n,likes:e.likes,postActionLoading:o,loggedInUsername:c,retweetReq:d,retweetActionLoading:a,retweetUsers:e.retweetUsers,retweetData:e.retweetData,submitReplyReq:i,replyTo:e.replyTo||null,viewSinglePostReq:function(){return r(e._id,e.replyTo?e.replyTo.originalPost._id:null)},deletePost:u,pinPost:g,pinnedPost:b,pinnedPostId:m},e._id)}));return Object(s.jsx)("div",{className:"posts",children:f})},b=n(12),m=n(151),f=n(45),j=function(e,t){var n=6e4,s=36e5,o=864e5,i=2592e6,r=31536e6,a=e-t;return a<n?a/1e3<30?"Just Now":Math.round(a/1e3)+" seconds ago":a<s?Math.round(a/n)+" minutes ago":a<o?Math.round(a/s)+" hours ago":a<i?Math.round(a/o)+" days ago":a<r?Math.round(a/i)+" months ago":Math.round(a/r)+" years ago"};t.default=function(){var e=Object(o.useRef)(),t=Object(o.useRef)(),n=Object(o.useRef)(),c=Object(o.useRef)(),d=Object(i.b)(),P=Object(i.c)((function(e){return e.post})),h=P.posts,w=P.postActionLoading,O=P.retweetActionLoading,y=P.postLoading,R=P.errorMessage,x=P.currentPage,v=P.pageSize,N=P.pages,I=P.totalItemsCount,S=Object(i.c)((function(e){return e.user})).userDetails;Object(o.useEffect)((function(){d(Object(r.c)(1,30,""))}),[d]);var T=function(e,t){d(Object(r.d)(e,t))},q=function(e,t){c.current=f.b.warning("Submitting Your retweet..."),d(Object(r.f)(e,t)).then((function(){f.b.dismiss(c.current),f.b.success("Retweet Success")}))},D=function(e,t){n.current=f.b.warning("Submitting Your Reply..."),d(Object(r.e)(e.reply,t)).then((function(){f.b.dismiss(n.current),f.b.success("Reply Post Success")}))},A=function(e,t){b.a.push("/post/".concat(t||e),{postId:t||e,backgroundGreenPostId:e})},_=function(e){b.a.push("/profile/".concat(e))},k=function(e){t.current=f.b.warning("Pinning Post..."),d(Object(a.b)(e)).then((function(){f.b.dismiss(t.current),f.b.success("Pin Post Success")}))};return Object(s.jsxs)("div",{className:"homepage",children:[Object(s.jsx)("h1",{children:"Home"}),Object(s.jsx)(p,{}),S&&S.pinnedPost&&Object(s.jsx)("div",{className:"pinnedPost",children:Object(s.jsx)(l.a,{postId:S.pinnedPost._id,firstName:S.pinnedPost.postedBy.firstName,lastName:S.pinnedPost.postedBy.lastName,username:S.pinnedPost.postedBy.username,content:S.pinnedPost.content,pinnedPost:!0,viewSinglePostReq:function(){return A(S.pinnedPost._id,S.pinnedPost.replyTo?S.pinnedPost.replyTo.originalPost._id:null)},pinnedPostId:S.pinnedPost._id,createdAt:j(new Date,new Date(S.pinnedPost.content?S.pinnedPost.createdAt:S.pinnedPost.retweetData.createdAt)),profilePic:S.pinnedPost.postedBy.profilePic,likePostReq:function(){return T(S.pinnedPost._id,S.pinnedPost.replyTo?S.pinnedPost.replyTo.originalPost._id:null)},likes:S.pinnedPost.likes,postActionLoading:w,loggedInUsername:S.username||localStorage.getItem("userName"),goToProfile:function(){return _(S.pinnedPost.postedBy.username)},retweetReq:function(){return q(S.pinnedPost._id,S.pinnedPost.retweetData?S.pinnedPost.retweetData._id:null)},retweetActionLoading:O,retweetUsers:S.pinnedPost.retweetUsers,retweetData:S.pinnedPost.retweetData,submitReplyReq:D,replyToUsername:S.pinnedPost.replyTo&&S.pinnedPost.replyTo.originalPost?S.pinnedPost.replyTo.originalPost.postedBy.username:null,replyPostTypeReplyToUsername:S.pinnedPost.postedBy.username,pinPost:function(){return k(S.pinnedPost._id)}})}),N>1&&Object(s.jsx)("div",{className:"paginate",children:Object(s.jsx)(m.a,{handlePageChange:function(e){d(Object(r.c)(e,30,""))},currentPage:x,pageSize:v,pages:N,totalItemsCount:I})}),y||R?y&&!R?Object(s.jsx)(u.a,{width:"60px"}):Object(s.jsx)("h4",{className:"fetchpostserror",children:"Error in Fetching Posts"}):Object(s.jsx)(g,{loggedInUsername:S?S.username:localStorage.getItem("username"),retweetReq:q,likePostReq:T,postActionLoading:w,retweetActionLoading:O,posts:h,submitReplyReq:D,viewSinglePostReq:A,deletePost:function(t,n){e.current=f.b.warning("Delete post in progress"),d(Object(r.b)(t,n)).then((function(){f.b.dismiss(e.current),f.b.success("Delete Post Success")}))},goToProfile:_,pinPost:k,pinnedPost:!1,pinnedPostId:S&&S.pinnedPost?S.pinnedPost._id:null})]})}}}]);
//# sourceMappingURL=8.d424d004.chunk.js.map