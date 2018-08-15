// Page module
define(["app", "widgets/base/widget"],

    function (app, BaseWidget) {

        var Widget = {};

        Widget.View = BaseWidget.View.extend({


            $image: null,

            width: 0,
            height: 0,
            folderSlug: "home",


            isLoading: false,


            uploadBtn: null,

            isUpload: false,

            photoId: 0,


            beforeRender: function () {

                var done = this.async();
                done();

                console.log("beforeRender: " + this.$el.attr("module"));

            },


            afterRender: function () {

                console.log("afterRender: " + this.$el.attr("module"));


                var context = this;


                context.$('.photo-file').on('change', function () {
                    var $this = $(this);

                    $.each($this.prop('files'), function (i, file) {


                        if (/^image\/(jpeg|png|gif)$/.test(file.type)) {

                            var tmppath = URL.createObjectURL(file);

                            context.editImage(0, tmppath, file.name, context.width, context.height, context.folderSlug, "");
                        }
                    });


                });



                if(!HTMLCanvasElement.prototype.toBlob){
                    HTMLCanvasElement.prototype.toBlob = function(callback, type, encoderOptions){
                        var dataurl = this.toDataURL(type, encoderOptions);
                        var bstr = atob(dataurl.split(',')[1]), n = bstr.length, u8arr = new Uint8Array(n);
                        while(n--){
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        var blob = new Blob([u8arr], {type: type});
                        callback.call(this, blob);
                    };
                }


            },


            uploadImage: function (width, height, folderSlug, callback) {

                this.width = width;
                this.height = height;
                this.folderSlug = folderSlug;
                this.callback = callback;


                this.isUpload = true;


                this.$('.photo-file').trigger('click');

            },


            editImage: function (id, image, name, width, height, folderSlug, description, callback) {




                var context = this;

                context.photoId = id;
                context.fileName = name;
                context.width = width;
                context.height = height;
                context.folderSlug = folderSlug;
                context.callback = callback ? callback : this.callback;
                context.description = description;


                $.fancybox.open({}, {
                    minWidth: 1100,
                    minHeight: 600,
                    fitToView: false,
                    width: '70%',
                    height: '60%',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none',
                    modal: true,

                    content: context.$('.template').html(),

                });


                var $overlay = $(".fancybox-opened");


                if (this.isUpload) {

                    $overlay.find(' .save, .crop-save-new').hide();
                    $overlay.find('.crop-save').show();

                }
                else {

                    $overlay.find(' .save,  .crop-save-new').show();
                    $overlay.find(' .crop-save').hide();

                }
                this.isUpload = false;


                $overlay.find(' textarea').val(description);


                $overlay.find(" .title").html(name);
                $overlay.find(" .image-crop > img").attr("src", image);


                var img = new Image();
                img.onload = function () {


                    var w = img.naturalWidth || img.width;
                    var h = img.naturalHeight || img.height;

                    $overlay.find(".original-size span").html(w + "x" + h);


                    if (width == 0 || height == 0) {

                        width = w;
                        height = h;

                        context.width = width;
                        context.height = height;

                        context.$image.cropper("setAspectRatio", context.width / context.height);


                        var str = width + 'x' + height;
                        var selected = false;




                        $overlay.find(".badge").each(function () {

                            if ($(this).html() == str) {


                                var context = this;

                                setTimeout(function() {
                                    $(context).trigger("click");
                                }, 500);

                                selected = true;
                            }

                        })


                        if (!selected) {

                            $overlay.find(' input[name=width]').val(width);
                            $overlay.find(' input[name=height]').val(height)

                            $overlay.find(' .crop-free').attr("data-width", $overlay.find(' input[name=width]').val());
                            $overlay.find(' .crop-free').attr("data-height", $overlay.find(' input[name=height]').val());

                            $overlay.find(' .crop-free').trigger("click");

                        }


                    }

                }
                ;


                img.src = image;


                context.$image = $overlay.find(" .image-crop > img");


                $(context.$image).cropper({
                    aspectRatio: width / height,
                    preview: $overlay.find(".img-preview"),
                    responsive: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    movable: true,
                    dragMode: 'move',
                    wheelZoomRatio: 0.05,

                    minCropBoxWidth: 795,
                    //minCropBoxHeight: height,

                    done: function (data) {
                        // Output the result data for cropping image.
                    }
                });


                if (width != 0 && height != 0) {





                    var str = width + 'x' + height;
                    var selected = false;

                    $overlay.find(".badge").each(function () {



                        if ($(this).html() == str) {

                            var context = this;

                            setTimeout(function() {
                                $(context).trigger("click");
                            }, 500);

                            selected = true;
                        }

                    });


                    if (!selected) {

                        $overlay.find(' input[name=width]').val(width);
                        $overlay.find(' input[name=height]').val(height)

                        $overlay.find(' .crop-free').attr("data-width", $overlay.find(' input[name=width]').val());
                        $overlay.find(' .crop-free').attr("data-height", $overlay.find(' input[name=height]').val());

                        $overlay.find(' .crop-free').trigger("click");

                    }
                }


// init


                $overlay.find(' .close').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("destroy");
                    $.fancybox.close();

                });


                $overlay.find(' .zoom-in').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation()

                    context.$image.cropper("zoom", 0.1);
                });

                $overlay.find(' .zoom-out').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("zoom", -0.1);
                });


                $overlay.find(' .rotate-left').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("rotate", -10);
                });

                $overlay.find(' .rotate-right').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("rotate", 10);
                });


                $overlay.find(' .scale-x').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    if (context.$image.cropper("getImageData")["scaleX"] == 1) {
                        context.$image.cropper("scaleX", -1);
                    }
                    else {
                        context.$image.cropper("scaleX", 1);
                    }

                });

                $overlay.find(' .scale-y').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    if (context.$image.cropper("getImageData")["scaleY"] == 1) {
                        context.$image.cropper("scaleY", -1);
                    }
                    else {
                        context.$image.cropper("scaleY", 1);
                    }

                });

                $overlay.find(' .reset').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("reset");
                });


                $overlay.find(' .move-left').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("move", -10, 0);
                });

                $overlay.find(' .move-right').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("move", 10, 0);
                });

                $overlay.find(' .move-img-up').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("move", 0, -10);
                });

                $overlay.find(' .move-img-down').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("move", 0, 10);
                });

                $overlay.find(' .fit').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    context.$image.cropper("reset");


                    var canvasData =  context.$image.cropper('getCanvasData');

                    //$overlay.find('cropper-crop-box')




                    var s =  $overlay.find('.cropper-crop-box').width() / canvasData.width;


                    //var h = canvasData.height * s;


                    context.$image.cropper("scaleX", s);
                    context.$image.cropper("scaleY", s);




                    //alert($overlay.find('.cropper-crop-box').width());
                    //alert($overlay.find('.cropper-crop-box').height());
                });




                $overlay.find(' .save').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();


                    if (context.isLoading) {
                        return;
                    }
                    context.isLoading = true;


                    $.ajax({
                        url: "/admin/photolibrary/photos/description/" + context.photoId,
                        //dataType: 'json',
                        cache: false,
                        data: {'description': $('#edit-panel textarea').val()},
                        type: 'post',
                        success: function (response) {
                            if (response.result === 'success') {

                                context.$image.cropper("destroy");
                                $.fancybox.close();

                                location.reload();


                            } else {
                                alert(response.error);
                            }


                            context.isLoading = false;


                        }
                    });


                });


                $overlay.find(' .crop-save,  .crop-save-new').on("click", function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    var img = "image/jpeg";
                    if ($overlay.find('input[name=transparent]').is(':checked')) {
                        img = "image/png";
                    }


                    var canvas = context.$image.cropper("getCroppedCanvas", {
                        width: context.width,
                        height: context.height,
                        /*fillColor : "#ffffff"*/
                    });




                    canvas.toBlob(function (blob) {


                        var formData = new FormData();
                        formData.append('Photo[image]', blob, context.fileName);
                        formData.append('description', $('#edit-panel textarea').val());


                        if (context.isLoading) {
                            return;
                        }
                        context.isLoading = true;

                        $.ajax({
                            url: context.$('form').attr('action') + "?folderSlug=" + context.folderSlug,
                            dataType: 'json',
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: formData,
                            type: 'post',
                            success: function (response) {
                                if (response.result === 'success') {

                                    var photo = response.photo;


                                    if (context.callback) {

                                        context.callback(photo.id, photo.image, photo.thumb, photo.description);
                                        context.callback = null;

                                    }


                                    context.$image.cropper("destroy");
                                    $.fancybox.close();


                                } else {
                                    alert(response.error);
                                }


                                context.isLoading = false;


                            }
                        });


                    }, img, 1);


                });


                $overlay.find(' .badge').on("click", function (e) {

                    $overlay.find(' .reset').trigger("click");


                    $overlay.find(' .badge').removeClass("badge-primary");
                    $(this).addClass("badge-primary");

                    context.width = $(this).attr("data-width");
                    context.height = $(this).attr("data-height");

                    context.$image.cropper("setAspectRatio", context.width / context.height);


                });


                $overlay.find(' input[name=width],  input[name=height]').on("keypress", function (e) {

                    return event.charCode >= 48 && event.charCode <= 57;

                });


                $overlay.find(' input[name=width],  input[name=height]').on("keyup", function (e) {

                    $overlay.find(' .reset').trigger("click");


                    $overlay.find(' .crop-free').attr("data-width", $overlay.find(' input[name=width]').val());
                    $overlay.find(' .crop-free').attr("data-height", $overlay.find(' input[name=height]').val());

                    context.width = $overlay.find('.crop-free').attr("data-width");
                    context.height = $overlay.find('.crop-free').attr("data-height");

                    context.$image.cropper("setAspectRatio", context.width / context.height);

                });


                $overlay.find(' input[name=width], input[name=height]').on("focus", function (e) {

                    $overlay.find(' .crop-free').trigger("click");

                });


            },


            afterAllRender: function () {

                console.log("afterAllRender: " + this.$el.attr("module"));

            }

            ,

            resize: function (ww, wh) {

                //console.log("resize: " + this.$el.attr("module") + " " + ww + "," + wh);

            }


        })
        ;

// Return the module for AMD compliance.
        return Widget;

    })
;
