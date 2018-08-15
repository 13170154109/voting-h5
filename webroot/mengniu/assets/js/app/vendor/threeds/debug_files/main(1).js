// Layout module
define(["app", "controllers/base/layout"],

    function (app, BaseLayout) {

        var Layout = {};

        Layout.View = BaseLayout.View.extend({


            el: "#main",
            template: "layouts/main",


            beforeRender: function () {

                var done = this.async();
                done();

            },



            afterRender: function () {


            },


            resize: function (ww, wh, orient) {


                if (app.router.pageHolders.length > 0) {

                    if (orient == "landscape" && app.router.pageHolders[app.router.pageHolders.length - 1].defaultOrientation  == "portrait") {
                        this.$(".rotate-portrait").show();
                        this.$(".rotate-landscape").hide();
                    }
                    else if (orient == "portrait" && app.router.pageHolders[app.router.pageHolders.length - 1].defaultOrientation  == "landscape") {
                        this.$(".rotate-landscape").show();
                        this.$(".rotate-portrait").hide();
                    }
                    else {
                        this.$(".rotate-portrait").hide();
                        this.$(".rotate-landscape").hide();
                    }

                }


            }


        });

        // Return the module for AMD compliance.
        return Layout;

    });
