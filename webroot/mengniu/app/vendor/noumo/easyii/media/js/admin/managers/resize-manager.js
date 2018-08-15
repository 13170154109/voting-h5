define(["app"],

    function (app) {


        var ResizeManager = Backbone.Model.extend({

            windowHeight : 0,
            windowWidth : 0,
            orientation : 'landscape',
            responsiveSize : 'lg',

            screenSmMin : 768,


            initialize: function () {

                this.updateParameters();

                var context = this;

                $(window).on("resize", $.proxy(this.resize, this));


                $(window).on("orientationchange", function (e) {

                    context.updateParameters();

                    app.layoutManager.orientation(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                    for (var i = 0; i < app.layoutManager.pages.length; i++) {
                        app.layoutManager.pages[i].orientation(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                    }
                    for (var i = 0; i < app.layoutManager.widgets.length; i++) {
                        app.layoutManager.widgets[i].orientation(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                    }

                });


                setInterval(function() {
                    context.resize();
                }, 1000);



            },

            updateParameters: function() {

                this.windowWidth = $(window).width();
                this.windowHeight = $(window).height();


                if ( window.orientation == 0 ) {
                    this.orientation = "portrait";
                }
                else if ( window.orientation == 90 ) {
                    this.orientation = "landscape";
                }
                else if ( window.orientation == -90 ) {
                    this.orientation = "landscape";
                }
                else if ( window.orientation == 180 ) {
                    this.orientation = "portrait";
                }

                if (this.windowWidth >= this.screenSmMin) {
                    this.responsiveSize = 'lg';
                }
                else {
                    this.responsiveSize = 'xs';
                }

            },

            resize : function() {

                var context = this;


                var responsiveSize = context.responsiveSize;

                context.updateParameters();

                app.layoutManager.resize(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                for (var i = 0; i < app.layoutManager.pages.length; i++) {
                    app.layoutManager.pages[i].resize(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                }
                for (var i = 0; i < app.layoutManager.widgets.length; i++) {
                    app.layoutManager.widgets[i].resize(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                }


                if (context.responsiveSize != responsiveSize) {

                    /*
                     app.layoutManager.responsive(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                     for (var i = 0; i < app.layoutManager.pages.length; i++) {
                     app.layoutManager.pages[i].responsive(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                     }
                     for (var i = 0; i < app.layoutManager.widgets.length; i++) {
                     app.layoutManager.widgets[i].responsive(context.windowWidth, context.windowHeight, context.orientation, context.responsiveSize);
                     }
                     */

                }


            }


        });


        // Return the module for AMD compliance.
        return ResizeManager;

    });
