// Widget module
define(["app"],

    function (app) {

        var BaseWidget = {};

        BaseWidget.View = Backbone.Layout.extend({


            initialize: function () {

                try {
                    this.data = $.parseJSON( this.$el.attr("module-data") );
                } catch (e) {
                    // error
                }

            },


            beforeRender: function () {

                var done = this.async();
                done();

            },


            afterRender: function () {


            },

            afterAllRender : function() {



            },


            resize: function (ww, wh, orient, size) {

                //console.log(ww, wh);

            },

            orientation: function (ww, wh, orient, size) {

                //console.log(orient, ww, wh);

            },

            responsive : function (ww, wh, orient, size) {

                //console.log(orient, ww, wh);

            }


        });

        // Return the module for AMD compliance.
        return BaseWidget;

    });
