(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[13],{146:function(t,e,n){"use strict";var a=n(2),i=(n(1),n(147),n(156)),o=n.n(i);e.a=function(t){var e=t.handlePageChange,n=t.pageSize,i=t.totalItemsCount,c=t.currentPage;return Object(a.jsx)(o.a,{itemClass:"page-item",linkClass:"page-link",activePage:c,itemsCountPerPage:n,totalItemsCount:i,pageRangeDisplayed:10,onChange:e})}},147:function(t,e,n){},188:function(t,e,n){},189:function(t,e,n){},199:function(t,e,n){"use strict";n.r(e);var a=n(2),i=n(1),o=n(21),c=(n(188),n(9)),s=function(t){var e=t.notifications,n=t.markReadNotifications;return e.map((function(t){var e={text:"",link:"/"};"retweet"===t.notificationType?e={text:"retweeted one of your posts",link:"/post/".concat(t.postId)}:"postLike"===t.notificationType?e={text:"liked one of your posts",link:"/post/".concat(t.postId)}:"follow"===t.notificationType?e={text:"followed you",link:"/profile/".concat(t.userId.username)}:"newMessage"===t.notificationType?e={text:"sent a new message",link:"/chat/".concat(t.chatId)}:"reply"===t.notificationType&&(e={text:"replied to your post",link:"/post/".concat(t.postId)});var i=t.opened?"":"active";return Object(a.jsxs)("div",{className:"notification ".concat(i),onClick:function(){e.link.indexOf("/post")>-1?c.a.push(e.link,{postId:t.postId}):c.a.push(e.link),n(!1,t._id,t.opened)},children:[Object(a.jsx)("img",{src:t.userFrom.profilePic,alt:t.userFrom.username}),Object(a.jsxs)("p",{className:"text",children:[t.userFrom.firstName," ",t.userFrom.lastName," ",e.text]})]},t._id)}))},r=n(32),u=n.n(r),l=n(43),f=n(44),p=n(5),d=function(t,e){return function(){var n=Object(l.a)(u.a.mark((function n(a,i){var o,c;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a({type:p.NOTIFICATIONS_LOADING}),n.next=3,f.a.get("/notifications?currentPage=".concat(t,"&pageSize=").concat(e),{headers:{Authorization:"Bearer "+(i().user.token||localStorage.getItem("accessToken"))}});case 3:o=n.sent,c=o.data,a({type:p.FETCH_NOTIFICATIONS,currentPage:c.currentPage,notifications:c.notifications,pageSize:c.pageSize,pages:c.pages,totalItemsCount:c.totalItemsCount});case 6:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}()},g=n(45),m=n(146);n(189),e.default=function(){var t=Object(o.b)(),e=Object(o.c)((function(t){return t.notification})),n=e.notifications,c=e.notificationsLoading,r=e.currentPage,h=e.pageSize,j=e.totalItemsCount,k=e.pages;Object(i.useEffect)((function(){t(d(1,30))}),[t]);var x=function(e,n,a){t(function(t,e,n){return function(){var a=Object(l.a)(u.a.mark((function a(i,o){return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n||i({type:p.MARK_READ,notificationId:e,markAll:t}),a.next=3,f.a.put("/notifications/".concat(e,"/markRead?markAll=").concat(t),{},{headers:{Authorization:"Bearer "+(o().user.token||localStorage.getItem("accessToken"))}});case 3:case"end":return a.stop()}}),a)})));return function(t,e){return a.apply(this,arguments)}}()}(e,n,a))};return Object(a.jsxs)("div",{className:"notificationsParent",children:[Object(a.jsxs)("div",{className:"title",children:[Object(a.jsx)("h2",{children:"Notifications"}),n.length>0&&Object(a.jsx)("i",{className:"fas fa-check-double",onClick:function(){return x(!0,null,!1)}})]}),k>1&&!c&&Object(a.jsx)("div",{className:"paginate",children:Object(a.jsx)(m.a,{currentPage:r,pageSize:h,totalItemsCount:j,handlePageChange:function(e){t(d(e,30))}})}),c?Object(a.jsx)(g.a,{width:"70px"}):n.length>0?Object(a.jsx)(s,{notifications:n,markReadNotifications:x}):Object(a.jsx)("h3",{className:"nonotifications",children:"No Notifications Yet"})]})}}}]);
//# sourceMappingURL=13.b5c7413a.chunk.js.map