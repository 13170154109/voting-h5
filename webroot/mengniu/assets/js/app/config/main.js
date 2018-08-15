require(["app", "managers/layout-manager", "managers/router", "managers/resize-manager", "managers/tracker"],


    function (app, LayoutManager, Router, ResizeManager, Tracker) {

        // layout manager
        app.layout = (new LayoutManager()).layout();

        // router
        app.router = new Router();

        app.resizeManager = new ResizeManager();

        app.tracker = new Tracker({gaAccount: "UA-108058306-1", baiduAccount: ""});

        app.eventBus = _.extend({}, Backbone.Events);

        var idNum=0;
        var check_code;
        var currentPage = "loading";
        var prevPage = "";

        /*
         app.user = new User.Model();
         app.user.getInfo();
         */

        app.layout.render().promise().done(function () {
            Backbone.history.start({
                pushState: false
            });

            var rid = app.router.pageHolders[0].routeId

           if (rid == "self") {
                app.sound.play('complete');
            }

        });




            app.id = wxr_openid; // OPEN_ID
            //微信分享
           // var host = window.location.host;



            var shareUrlFd = "http://campaign.archisense.cn/mengniu/" + "?_f="+ wxr_openid +"&utm_source=wechat_share&utm_medium=share_fd&utm_campaign=mn-h5";
            var shareUrlTl = "http://campaign.archisense.cn/mengniu/" + "?_f="+ wxr_openid +"&utm_source=wechat_share&utm_medium=share_fd&utm_campaign=mn-h5";


            app.shareDataFriend = {
                title: '选出你心中的世界杯大使',
                desc: '为你的世界杯大使投上宝贵的一票',
                link: shareUrlFd,
                imgUrl: "http://" + window.location.host + "/mengniu/assets/images/img/share-img.jpg",
                success: function () {
                    console.log(imgUrl);
                }
            };
            app.shareDataTimeLine = {
                title: '选出你心中的世界杯大使',
                desc: '为你的世界杯大使投上宝贵的一票',
                link: shareUrlTl,
                imgUrl: "http://" + window.location.host + "/mengniu/assets/images/img/share-img.jpg",
                success: function () {

                }
            };

        if (window.location.host.indexOf("campaign.archisense.cn") != -1) {


            require(["//res.wx.qq.com/open/js/jweixin-1.0.0.js"],
                function(wx) {

                    app.wx = wx;

                    $.ajax({
                        url: '/wechat/api/share.php',
                        data: { url: document.location.href.split("#")[0] },
                        cache: false,
                        success: function(data) {

                            app.wx.config({
                                "debug": false,
                                "appId": data.appId,
                                "timestamp": data.timestamp,
                                "nonceStr": data.nonceStr,
                                "signature": data.signature,
                                "jsApiList": ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
                            });

                            app.wx.ready(function() {

                                app.wx.onMenuShareAppMessage(app.shareDataFriend);
                                app.wx.onMenuShareTimeline(app.shareDataTimeLine);
                            });

                        },
                        error: function(XHR, textStatus, errorThrown) {

                        }
                    });


                });




        }





    });
