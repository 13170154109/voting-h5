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
                // currentPage = "share-voting";

                require(["vendor/zepto/zepto.html5Loader.min"],
                    function () {
                        done();
                    });
            },

            afterRender: function () {

                // 点击跳转事件至投票
                $("#btn-share-back").on("click",function () {
                    app.router.goto("voting");
                })


                // 点击跳转事件至排行榜
                $("#btn-see-contestants").on("click",function () {
                    app.router.goto('contestants-list');
                })




            },

        });
        // Return the module for AMD compliance.
        return Page;
    });

