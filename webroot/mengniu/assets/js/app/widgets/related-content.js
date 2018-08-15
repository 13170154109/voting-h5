// Page module
define(["app", "widgets/base/widget"],

    function (app, BaseWidget) {

        var Widget = {};

        Widget.View = BaseWidget.View.extend({


            beforeRender: function () {

                var done = this.async();
                done();

                console.log("beforeRender: " + this.$el.attr("module"));

            },


            afterRender: function () {

                console.log("afterRender: " + this.$el.attr("module"));


            },

            afterAllRender: function () {

                console.log("afterAllRender: " + this.$el.attr("module"));


            },

            resize: function (ww, wh) {

                //console.log("resize: " + this.$el.attr("module") + " " + ww + "," + wh);

            }




        });

        // Return the module for AMD compliance.
        return Widget;

    });
