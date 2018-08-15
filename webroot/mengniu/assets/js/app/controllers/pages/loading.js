/**
 * Created by DELL on 2017/11/1.
 */
    // Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {
        var Page = {};
        Page.View = BasePage.View.extend({


            beforeRender: function () {

                var done = this.async();
                // prevPage = currentPage;
                // currentPage = "loading";

                require(["vendor/zepto/zepto.html5Loader.min"],
                    function () {
                        done();
                    });
            },

            afterRender: function () {
                var context = this;
                //判断是否投过票
                CheckUser(app.id);//app.id 投票者的openID
                function CheckUser(userid){
                    console.log('判断是否投过票');

                    $.ajax({
                        type: "post",
                        url: "user/check",
                        data:{
                            "voter_openid":userid
                        },
                        success: function(data){
                            console.log('检查结果');
                            // check_code=data.code;
                            // console.log(data.check_code);

                        }
                    });
                }
// alert(check_code)


                // $(".page-loading").on("click",function () {
                //     app.router.goto("home")
                // });

                var firstLoadFiles = {
                    "files": []
                };
                firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/contestants-list-bg.png", "size": 1});
                // firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/bg-share.png", "size": 1});
                firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/share.png", "size": 1});
                firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/detail.png", "size": 1});
                firstLoadFiles["files"].push({
                    "type": "IMAGE",
                    "source": "assets/images/img/info-bg.png",
                    "size": 1
                });
                firstLoadFiles["files"].push({ "type": "IMAGE", "source": "assets/images/img/row-people-bg.png", "size": 1  });
              /*  firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/bg-share.png", "size": 1});*/
                firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/share.png", "size": 1});
                firstLoadFiles["files"].push({"type": "IMAGE", "source": "assets/images/img/detail.png", "size": 1});




                $.html5Loader({
                    filesToLoad: firstLoadFiles,
                    onBeforeLoad: function () {

                    },
                    onComplete: function () {

                        //判断是否有id值
                        function GetQueryString(name) {
                            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                            var r = window.location.search.substr(1).match(reg);
                            if (r != null)return unescape(r[2]);
                            return null;
                        }

                        //app.router.goto('home');

                        //app.layoutManager.playMusic();

                        // if (window.location.host.indexOf("campaign.archisense.cn") != -1) {

                        if (GetQueryString('id') != null) {
                            console.log(GetQueryString('id'));
                            app.getId =GetQueryString('id');
                            // app.router.goto('share', [GetQueryString("id")]);
                        } else {
                            app.router.goto('home');
                        }

                    },
                    onElementLoaded: function (obj, elm) {

                    },
                    onUpdate: function (percentage) {
                        console.log(percentage);
                        // $(".num").html(percentage + '%');
                        // console.log(firstLoadFiles)
                    }
                });


            }
        });
        // Return the module for AMD compliance.
        return Page;
    });

