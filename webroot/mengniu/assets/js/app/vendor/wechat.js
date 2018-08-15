var useLive = false;
if (useLive) {
	// this is Live
	var $url = "http://crm.peninsulaboutiquewechat.com/";
}
else {
	// this is UAT
	var $url = "http://pen-crm-uat.archisense.cn/";
}



var $title = '猜猜我最喜爱的月饼口味';
var $desc = 'å®ƒèº«æŠ«ç›”ç”²æ‰‹æœ‰åˆ©çˆªï¼Œåœ¨ä¸›æž—é—´ç©¿å±±éåœ°æ¥åŽ»è‡ªå¦‚ã€‚å®ƒï¼Œèƒ½é€ƒå‡ºä½ çš„æ‰‹æŽŒå¿ƒå—ï¼Ÿ ';


window.share = {
	imgUrl : 'http://'+window.location.host+'/assets/i/shareImg.jpg',
	link : window.location.host + "/#phase2-main",
	title : $title,
	desc : $desc,
};

$(function () {
	shareConfig();   
});
function shareConfig(){
	console.log(1)
		var url = window.location.href;
		$.ajax({
	 		type : "POST",
	 		url : $url + 'wechat/auth/wx-share',
	 		dataType : "jsonp",
	 		jsonp: "callback",
	 		jsonpCallback:"success_jsonpCallback",

	 		async : false,
	 		data:{
	 			url:url
	 			},
	 		success : function(response) {
	 			wxshare(response);
	 		}
	 	});
		function wxshare(response) { 
			wx.config({
			  debug: false,
			  appId: response.appId,
			  timestamp:response.timestamp,
			  nonceStr: response.nonceStr,
			  signature: response.signature,
			  jsApiList: [
                'checkJsApi',
                'hideMenuItems'
              ],
		  	})
		}
		wx.ready(function () {
            wxcheck();
            function wxcheck(){
                wx.checkJsApi({
                     jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems'
                      ],
                      success: function (res) {
                      }
                    });
            }
            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:appMessage",
                    "menuItem:share:timeline",
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:share:facebook",
                    "menuItem:share:QZone"
                ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        })
}
