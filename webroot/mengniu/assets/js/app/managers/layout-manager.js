define(["app", "controllers/layouts/main"],

    function (app, Layout) {


        var LayoutManager = Backbone.Model.extend({

            initialize: function () {

                // Localize or create a new JavaScript Template object.
                var JST = window.JST = window.JST || {};

                // Configure LayoutManager with Backbone Boilerplate defaults.
                Backbone.Layout.configure({
                    // Allow LayoutManager to augment Backbone.View.prototype.
                    manage: true,

                    fetchTemplate: function (path) {

                        var jstPath = path;
                        path = app.viewsPath + path + ".html";

                        if (JST[jstPath]) {
                            return JST[jstPath];
                        }

                        // Put fetch into `async-mode`.
                        var done = this.async();

                        // Seek out the template asynchronously.
                        $.get(path, function (contents) {
                            done(JST[jstPath] = _.template(contents));
                        }, "text");

                    }


                });




            },


            layout : function() {

                return new Layout.View();

            }



        });




        return LayoutManager;


    });
