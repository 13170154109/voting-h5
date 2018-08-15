// Page module
define(["app"],

    function (app) {

        var BasePage = {};

        BasePage.View = Backbone.Layout.extend({

            routeId: null,
            args: null,
            index: 0,

            defaultOrientation : "portrait",  // portrait, landscape, custom
            layoutOrientation : "portrait",  // portrait, landscape, custom
            fitOn : "height",   //width, height, custom


            initialize: function () {

                if (this.template) {
                    this.$el.addClass(this.template.replace("s/", "-"));
                }

                this.changeFitOn(this.fitOn);

                if (this.layoutOrientation == "portrait") {
                    this.$el.addClass("portrait");
                }
                else if (this.layoutOrientation == "landscape") {
                    this.$el.addClass("landscape");
                }

                this.$el.css("height", $(window).height() + "px");

            },


            changeFitOn : function(fitOn) {

                this.fitOn = fitOn;

                if (this.fitOn == "width") {
                    this.$el.addClass("fit-on-width");
                    this.$el.removeClass("fit-on-height");
                }
                else if (this.fitOn == "height") {
                    this.$el.addClass("fit-on-height");
                    this.$el.removeClass("fit-on-width");
                }
                else {
                    this.$el.removeClass("fit-on-height");
                    this.$el.removeClass("fit-on-width");
                }


            },


            beforeRender: function () {

                console.log(this.routeId + " beforeRender");

                var done = this.async();
                done();

            },


            afterRender: function () {

                console.log(this.routeId + " afterRender");

                TweenLite.from(this.$el, 0.3, {autoAlpha:0});

            },


            beforeRemove: function () {

                console.log(this.routeId + " beforeRemove");


                var dfd = $.Deferred();

                TweenLite.to(this.$el, 0.3, {autoAlpha:0, onComplete:function () {
                    dfd.resolve();
                }});


                return dfd;



                /*
                var done = this.async();

                this.$el.fadeOut(500, function () {
                    done();
                });
                */



            },

            afterRemove: function () {

                console.log(this.routeId + " afterRemove");

            },


            resize: function (ww, wh, orient) {

                //console.log(ww, wh);

            },

            changeOrientation: function (ww, wh, orient) {

                //console.log(orient, ww, wh);

            },


            cleanup: function () {

                this.afterRemove();

            },



        });

        // Return the module for AMD compliance.
        return BasePage;

    });
