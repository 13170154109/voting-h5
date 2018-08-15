define(["app", "config/pages", "config/widgets"],


    function (app, pages, widgets) {


        var Layout = {};

        Layout.View = Backbone.Layout.extend({


            data: null,
            pages : [],
            widgets : [],


            initialize: function () {


                try {
                    this.data = $.parseJSON( this.$el.attr("module-data") );
                } catch (e) {
                    // error
                }

                var context = this;


                if (pages) {

                    for (var i = 0; i < pages.length; i++) {

                        for (var j = 0; j < $("[module=" + pages[i].id + "]").size(); j++) {
                            context.pages.push(new pages[i].module({el: $("[module=" + pages[i].id + "]").get(j)}));
                        }

                    }

                }


                if (widgets) {
                    for (var i = 0; i < widgets.length; i++) {

                        for (var j = 0; j < $("[module=" + widgets[i].id + "]").size(); j++) {
                            context.widgets.push(new widgets[i].module({el: $("[module=" + widgets[i].id + "]").get(j)}));
                        }

                    }
                }


                console.log(this.pages);
                console.log(this.widgets);


                this.render().then(function(){

                    var dfds = [];

                    for (var i = 0; i < context.pages.length; i++) {
                        dfds.push(context.pages[i].render().then(function(v) { context.setView(v.$el.attr("module"), v, true); }));
                    }

                    for (var i = 0; i < context.widgets.length; i++) {
                        dfds.push(context.widgets[i].render().then(function(v) { context.setView(v.$el.attr("module"), v, true); }));

                        // set view order ...
                    }

                    $.when.apply($, dfds).done(function() {
                        context.afterAllRender();

                        for (var i = 0; i < context.pages.length; i++) {
                            context.pages[i].afterAllRender();
                        }

                        for (var i = 0; i < context.widgets.length; i++) {
                            context.widgets[i].afterAllRender();
                        }

                    });



                });



            },


            getWidgets: function (name) {


                var arr = [];

                for (var i=0; i < this.widgets.length; i++) {

                    if (this.widgets[i].$el.attr("module") == name) {
                        arr.push(this.widgets[i]);
                    }

                }

                return arr;

            },


            getPages: function (name) {


                var arr = [];

                for (var i=0; i < this.pages.length; i++) {

                    if (this.pages[i].$el.attr("module") == name) {
                        arr.push(this.pages[i]);
                    }

                }

                return arr;

            },



            addWidget: function (el) {

                var context = this;
                var widget = null;

                if (widgets) {
                    for (var i = 0; i < widgets.length; i++) {


                        if (widgets[i].id == $(el).attr("module")) {
                            widget = new widgets[i].module({el: el})
                            context.widgets.push(widget);


                            widget.render().then(function(v) { context.setView(v.$el.attr("module"), v, true); })
                                .then($.proxy(widget.afterAllRender, widget));


                            break;


                        }

                    }
                }





                return widget;

            },





            beforeRender: function () {

                var done = this.async();
                done();

            },


            afterRender : function() {


            },


            afterAllRender : function() {


            },


            resize: function (ww, wh, orient, size) {

                //console.log("resize", ww, wh, orient, size);

            },

            orientation: function (ww, wh, orient, size) {

                //console.log("orientation", ww, wh, orient, size);

            },

            responsive : function (ww, wh, orient, size) {

                //console.log("responsive", ww, wh, orient, size);

            }




        });

        return Layout;


    });
