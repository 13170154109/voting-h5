// Page module
define(["app", "widgets/base/widget"],

    function (app, BaseWidget) {

        var Widget = {};

        Widget.View = BaseWidget.View.extend({


            beforeRender: function () {
                var done = this.async();
                done();

            },


            afterRender: function () {

                this.$('.s').on("focus", function() {
                    if ($.trim($(this).val()) == "搜索") {
                        $(this).val('');
                    }
                });

                this.$('.s').on("blur", function() {
                    if ($.trim($(this).val()) == "") {
                        $(this).val('搜索');
                    }
                });


                /*
                this.$('form').on("submit", function(e) {

                    if ($.trim($(this).val()) == "") {
                        e.preventDefault();
                    }

                    return;


                });
                */




            },


            afterAllRender : function() {



            }




        });

        // Return the module for AMD compliance.
        return Widget;

    });
