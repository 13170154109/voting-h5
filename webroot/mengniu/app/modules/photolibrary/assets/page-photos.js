// Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {

        var Page = {};

        Page.View = BasePage.View.extend({


            carouselLinks : [],
            gallery : null,




            beforeRender: function () {

                var done = this.async();
                done();

                console.log("beforeRender: " + this.$el.attr("module"));

            },


            afterRender: function () {

                console.log("afterRender: " + this.$el.attr("module"));


                var context = this;


                context.$('.container-fluid a').each(function() {

                    context.carouselLinks.push({
                        href: $(this).attr("href"),
                        title: $(this).data("name"),
                        id: $(this).data("id"),
                        image: $(this).data("image"),
                        thumb: $(this).data("thumb"),
                        description: $(this).data("description"),
                        width: $(this).data("width"),
                        height: $(this).data("height"),
                        name: $(this).data("name"),
                        datetime: $(this).data("datetime"),
                    })


                });




                context.$('.container-fluid a').on("click", function(e) {

                    e.preventDefault();

                    context.gallery = blueimp.Gallery(
                        context.$('.container-fluid a'),
                        {
                            container: context.$('.gallery'),
                            carousel: true,
                            startSlideshow: false,
                            index: $(this).data("index"),

                            onslide: function (index, slide) {
                                var data = context.carouselLinks[index];

                                context.$('.select, .edit').data('id', data.id);
                                context.$('.select, .edit').data('image', data.image);
                                context.$('.select, .edit').data('thumb', data.thumb);
                                context.$('.select, .edit').data('description', data.description);
                                context.$('.select, .edit').data('name', data.name);
                                context.$('.select, .edit').data('width', data.width);
                                context.$('.select, .edit').data('height', data.height);

                                context.$('.gallery .size').html(data.width + "x" + data.height + "  (" + data.datetime + ")");


                            },
                        }
                    );


                });



                this.$('.select-sm, .select').on("click", function(e) {

                    e.preventDefault();


                    var arr = window.name.split("_");
                    var ts = "";

                    if (arr.length > 1) {
                        ts = arr[1];
                    }

                    var selectBtn = $(".photo-widget-select[data-timestamp=" + ts + "]", window.opener.document);

                    if (selectBtn.size() > 0) {

                        var formGroup = selectBtn.parent();

                        var id = $(this).data('id');
                        var image = $(this).data('image');
                        var thumb = $(this).data('thumb');
                        var description = $(this).data('description');

                        formGroup.attr("data-image", image);
                        formGroup.find("input").val(id);

                        var previewWidth = formGroup.find(".thumb-preview").attr("data-previewWidth");
                        var previewThumb = formGroup.find(".thumb-preview").attr("data-previewThumb");

                        var src = (previewThumb == "true") ? thumb : image;
                        var width = (previewWidth == "") ? "" : 'width="'+previewWidth+'"';

                        formGroup.find(".thumb-preview").html('<a href="'+$(this).data('image')+'" class="plugin-box" title="'+description+'" rel="easyii-photos"><img '+width+' src="'+src+'"></a>');

                    }

                    window.close();


                });



                this.$('.edit').on("click", function() {


                    if (context.gallery) {
                        context.gallery.close();
                    }


                    var editors = app.layoutManager.getWidgets("module-photolibrary-widget-editor");

                    if (editors.length == 0) {
                        alert("Please add the widget module-photolibrary-widget-editor");
                        return;
                    }

                    //editors[0].uploadImage(context.data.width, context.data.height, context.data.folderSlug, context);

                    editors[0].editImage($(this).data("id"), $(this).data("image"), $(this).data("name"), context.data.width, context.data.height, context.data.folderSlug, $(this).data("description"), $.proxy(context.callback, context));


                    /*
                     var context = this;

                    setTimeout(function() {
                        editImage($(context).data("image"), $(context).data("name"), 200, 200);
                    }, 1000);
                    */




                });


                this.$('.upload').on("click", function(e) {

                    e.preventDefault();

                    var editors = app.layoutManager.getWidgets("module-photolibrary-widget-editor");

                    if (editors.length == 0) {
                        alert("Please add the widget module-photolibrary-widget-editor");
                        return;
                    }


                    //editors[0].uploadImage(context.data.width, context.data.height, context.data.folderSlug, context);
                    editors[0].uploadImage(0, 0, context.data.folderSlug, $.proxy(context.callback, context));

                });





            },



            callback : function() {


                //window.location = window.location.href + "&page=1";
                location.href = this.replaceUrlParam(location.href, 'page', 1);

            },


            replaceUrlParam : function(url, paramName, paramValue){
            if(paramValue == null)
                paramValue = '';
            var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
            if(url.search(pattern)>=0){
                return url.replace(pattern,'$1' + paramValue + '$2');
            }

                var arr = url.split("#");


            return arr[0] + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
        },



            afterAllRender: function () {

                console.log("afterAllRender: " + this.$el.attr("module"));


            },

            resize: function (ww, wh) {

                //console.log("resize: " + this.$el.attr("module") + " " + ww + "," + wh);

            }




        });

        // Return the module for AMD compliance.
        return Page;

    });
