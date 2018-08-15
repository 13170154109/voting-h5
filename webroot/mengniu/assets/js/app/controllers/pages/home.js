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
                // currentPage = "home";

                require(["vendor/zepto/zepto.html5Loader.min"],
                function () {
                    done();
                });
            },

            afterRender: function () {

                //按钮动画效果
                // var btn1Img = $("#btn-start-vote");
                // var btn2Img = $("#btn-voting-list");
                // var time1Answer = new TimelineMax({repeat:-1,delay:0,repeatDelay:0.5});
                // var time2Answer = new TimelineMax({repeat:-1,delay:0,repeatDelay:0.8});

                // time1Answer.to(btn1Img,0.1,{"transform":"rotate(-4deg)"})
                //     .to(btn1Img,0.1,{"transform":"rotate(4deg)"})
                //     .to(btn1Img,0.1,{"transform":"rotate(-4deg)"})
                //     .to(btn1Img,0.1,{"transform":"rotate(4deg)"})
                //     .to(btn1Img,0.1,{"transform":"rotate(-4deg)"})
                //     .to(btn1Img,0.1,{"transform":"rotate(4deg)"})
                //     .to(btn1Img,0.4,{"transform":"rotate(-4deg)"})
                //     .to(btn1Img,0.4,{"transform":"rotate(4deg)"});
                //
                // time2Answer.to(btn2Img,0.1,{"transform":"rotate(-4deg)"})
                //     .to(btn2Img,0.1,{"transform":"rotate(4deg)"})
                //     .to(btn2Img,0.1,{"transform":"rotate(-4deg)"})
                //     .to(btn2Img,0.1,{"transform":"rotate(4deg)"})
                //     .to(btn2Img,0.1,{"transform":"rotate(-4deg)"})
                //     .to(btn2Img,0.1,{"transform":"rotate(4deg)"})
                //     .to(btn2Img,0.4,{"transform":"rotate(-4deg)"})
                //     .to(btn2Img,0.4,{"transform":"rotate(4deg)"});

                // 点击跳转事件至投票
                $("#btn-start-vote").on("click",function () {
                    app.router.goto('voting');
                })


                // 点击跳转事件至排行榜
                console.log($("#btn-voting-list2"));
                $("#btn-voting-list2").on("click",function () {
                    app.router.goto('contestants-list');
                })

            },

        });
        // Return the module for AMD compliance.
        return Page;
    });

