define(["app"],

    function (app) {


        var Layout = {};

        Layout.View = Backbone.Layout.extend({


            el: "#main",
            template: "layouts/main",


            initialize: function () {

                if (this.template) {
                    this.$el.addClass(this.template.replace("s/", "-"));
                }

            },


            beforeRender: function () {

                var done = this.async();
                done();

            },


            afterRender : function() {


            },


            resize: function (ww, wh, orient) {

                //console.log("resize", ww, wh, orient, size);

            },

            changeOrientation: function (ww, wh, orient) {

                //console.log("orientation", ww, wh, orient, size);

            },




        });

        return Layout;


    });
