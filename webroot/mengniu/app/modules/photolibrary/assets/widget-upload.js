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


                //console.log(this.data);


                console.log("afterRender: " + this.$el.attr("module"));

                console.log(this.$el.parent().attr("class"));



                var context = this;


                this.$('.photo-widget-select').on('click', function(e){

                    e.preventDefault();

                    var ts = Date.now();

                    $(this).attr('data-timestamp', ts);

                    window.open('/admin/photolibrary?select=1&folderSlug=' + $(this).attr('data-folderSlug') + '&width=' + $(this).attr('data-width') + '&height=' + $(this).attr('data-height'),'photoWidgetSelect_' + ts,'width=1200,height=800,top=100,left=' + (screen.width-1200)/2);

                });

                this.$('.photo-widget-delete').on('click', function(e){

                    e.preventDefault();

                    $(this).parent().attr("data-image", '');
                    $(this).parent().find("input").val('');
                    $(this).parent().find(".thumb-preview").html('');

                });


                this.$('.photo-widget-upload').on('click', function(e){

                    e.preventDefault();

                    var editors = app.layoutManager.getWidgets("module-photolibrary-widget-editor");

                    if (editors.length == 0) {
                        alert("Please add the widget module-photolibrary-widget-editor");
                        return;
                    }


                    editors[0].uploadImage(context.data.width, context.data.height, context.data.folderSlug, $.proxy(context.updateData, context));



                });


            },


            updateData : function(id, image, thumb, description) {


                var formGroup = this.$(".form-group");

                formGroup.attr("data-image", image);
                formGroup.find("input").val(id);

                var previewWidth = formGroup.find(".thumb-preview").attr("data-previewWidth");
                var previewThumb = formGroup.find(".thumb-preview").attr("data-previewThumb");

                var src = (previewThumb == "true") ? thumb : image;
                var width = (previewWidth == "") ? "" : 'width="'+previewWidth+'"';

                formGroup.find(".thumb-preview").html('<a href="'+image+'" class="plugin-box" title="'+description+'" rel="easyii-photos"><img '+width+' src="'+src+'"></a>');



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
