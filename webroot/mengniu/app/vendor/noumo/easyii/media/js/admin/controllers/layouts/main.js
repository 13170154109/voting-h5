// Layout module
define(["app", "controllers/base/layout"],

    function (app, BasePage) {

        var Page = {};

        Page.View = BasePage.View.extend({


            beforeRender: function () {

                var done = this.async();
                done();

                console.log("beforeRender: " + "layout");

            },


            afterRender: function () {

                console.log("afterRender: " + "layout");


            },

            afterAllRender: function () {

                console.log("afterAllRender: " + "layout");


            },

            resize: function (ww, wh) {

                //console.log("resize: " + this.$el.attr("module") + " " + ww + "," + wh);

            }




        });

        // Return the module for AMD compliance.
        return Page;

    });
