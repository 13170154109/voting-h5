// Page module
define(["app"],

    function (app) {

        var BasePage = {};

        BasePage.View = Backbone.Layout.extend({

            data : null,

            initialize: function () {

                try {
                    this.data = $.parseJSON( this.$el.attr("module-data") );
                } catch (e) {
                    // error
                }

            },



            afterRender: function () {



            },

            afterAllRender : function() {



            },


            resize: function (ww, wh) {

                console.log(ww, wh);

            },

            orientation: function (orient, ww, wh) {

                console.log(orient, ww, wh);

            }


        });

        // Return the module for AMD compliance.
        return BasePage;

    });
