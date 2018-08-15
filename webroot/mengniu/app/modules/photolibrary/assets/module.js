$(function(){


    $(".module-photolibrary-widget-form").each(function () {


        var $widget = $(this);


        var uploadButton = $widget.find('.upload');
        var uploadingText = $widget.find('.uploading-text');
        var uploadingTextInterval;

        // upload
        uploadButton.on('click', function () {
            $widget.find('.photo-file').trigger('click');
        });

        $widget.find('.photo-file').on('change', function () {
            var $this = $(this);

            $.each($this.prop('files'), function (i, file) {


                if (/^image\/(jpeg|png|gif)$/.test(file.type)) {

                    var tmppath = URL.createObjectURL(file);

                    editImage(tmppath, file.name, 200, 200);
                }
            });



            //editImage(image, name, width, height);




            /*
            uploadButton.addClass('disabled');
            uploadingText.show();
            uploadingTextInterval = setInterval(dotsAnimation, 300);

            var uploaded = 0;
            $.each($this.prop('files'), function (i, file) {
                if (/^image\/(jpeg|png|gif)$/.test(file.type)) {
                    var formData = new FormData();
                    formData.append('Photo[image]', file);

                    $.ajax({
                        url: $this.closest('form').attr('action'),
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: formData,
                        type: 'post',
                        success: function (response) {
                            if (response.result === 'success') {


                                document.location.reload();

                            } else {
                                alert(response.error);
                            }

                            if (++uploaded >= $this.prop('files').length) {
                                uploadButton.removeClass('disabled');
                                uploadingText.hide();
                                clearInterval(uploadingTextInterval);
                            }
                        }
                    });
                } else {
                    uploaded++;
                }
            });
            */

        });


        var carouselLinks = [];
        var gallery;


        $widget.find('.container-fluid a').each(function() {

            carouselLinks.push({
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


        $widget.find('.container-fluid a').on("click", function(e) {

            e.preventDefault();



            gallery = blueimp.Gallery(
                $widget.find('.container-fluid a'),
                {
                    container: $widget.find('.gallery'),
                    carousel: true,
                    startSlideshow: false,
                    index: $(this).data("index"),

                    onslide: function (index, slide) {
                        var data = carouselLinks[index];

                        $widget.find('.select, .edit').data('id', data.id);
                        $widget.find('.select, .edit').data('image', data.image);
                        $widget.find('.select, .edit').data('thumb', data.thumb);
                        $widget.find('.select, .edit').data('description', data.description);
                        $widget.find('.select, .edit').data('name', data.name);
                        $widget.find('.select, .edit').data('width', data.width);
                        $widget.find('.select, .edit').data('height', data.height);

                        $widget.find('.gallery .size').html(data.width + "x" + data.height + "  (" + data.datetime + ")");


                    },
                }
            );


        });


        $widget.find('.select-sm, .select').on("click", function(e) {

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


        var dots = 0;

        function dotsAnimation() {
            dots = ++dots % 4;
            $("span", uploadingText).html(Array(dots + 1).join("."));
        }


        $widget.find('.edit').on("click", function() {


            var context = this;

            if (gallery) {
                gallery.close();
            }

            setTimeout(function() {
                editImage($(context).data("image"), $(context).data("name"), 200, 200);
            }, 1000);




        });




        $('#edit-panel .close').on("click", function(e) {

            $image.cropper("destroy");
            $.fancybox.close();

        });


        var $image = $("#edit-panel .image-crop > img");




        function editImage(image, name, width, height) {


            $.fancybox.open( {href : '#edit-panel'}, {
                minWidth	: 1100,
                minHeight	: 600,
                fitToView	: false,
                width		: '70%',
                height		: '60%',
                autoSize	: false,
                closeClick	: false,
                openEffect	: 'none',
                closeEffect	: 'none',
                modal : true
            } );



            $("#edit-panel .title").html(name);
            $("#edit-panel .image-crop > img").attr("src", image);


            var img = new Image();
            img.onload = function() {
                var width  = img.naturalWidth  || img.width;
                var height = img.naturalHeight || img.height;

                $("#edit-panel .original-size span").html(width + "x" + height);
            }
            img.src = image;



            $($image).cropper({
                aspectRatio: 1 / 1,
                preview: $("#edit-panel").find(".img-preview"),
                responsive : false,
                cropBoxMovable : false,
                cropBoxResizable : false,
                movable : true,
                dragMode : 'move',

                minCropBoxWidth : 500,
                minCropBoxHeight : 500,

                done: function(data) {
                    // Output the result data for cropping image.
                }
            });













        }


        $widget.find('.edit').on("click", function(e) {

            e.preventDefault();

            editImage($(this).data("image"), $(this).data("name"), $(this).data("width"), $(this).data("height"))

        });



        $('#edit-panel .zoom-in').on("click", function(e) {
            $image.cropper("zoom", 0.1);
        });

        $('#edit-panel .zoom-out').on("click", function(e) {
            $image.cropper("zoom", -0.1);
        });


        $('#edit-panel .rotate-left').on("click", function() {
            $image.cropper("rotate", -10);
        });

        $('#edit-panel .rotate-right').on("click", function() {
            $image.cropper("rotate", 10);
        });


        $('#edit-panel .scale-x').on("click", function() {

            if ($image.cropper("getImageData")["scaleX"] == 1) {
                $image.cropper("scaleX", -1);
            }
            else {
                $image.cropper("scaleX", 1);
            }

        });

        $('#edit-panel .scale-y').on("click", function() {

            if ($image.cropper("getImageData")["scaleY"] == 1) {
                $image.cropper("scaleY", -1);
            }
            else {
                $image.cropper("scaleY", 1);
            }

        });

        $('#edit-panel .reset').on("click", function() {
            $image.cropper("reset");
        });


        $('#edit-panel .move-left').on("click", function() {
            $image.cropper("move", -10, 0);
        });

        $('#edit-panel .move-right').on("click", function() {
            $image.cropper("move", 10, 0);
        });

        $('#edit-panel .move-img-up').on("click", function() {
            $image.cropper("move", 0, -10);
        });

        $('#edit-panel .move-img-down').on("click", function() {
            $image.cropper("move", 0, 10);
        });











        setTimeout(function() {

            //$("#edit-panel .image-crop > img").attr("src", "/uploads/photos/jian-hua-115a6b2b8f.jpg");

            //$widget.find('.edit').trigger("click");
        }, 1000)














        $("#zoomIn").click(function() {
            $image.cropper("zoom", 0.1);
        });

        $("#zoomOut").click(function() {
            $image.cropper("zoom", -0.1);
        });

        $("#rotateLeft").click(function() {
            $image.cropper("rotate", 10);
        });

        $("#rotateRight").click(function() {
            $image.cropper("rotate", -10);
        });

        $("#setDrag").click(function() {
            $image.cropper("setDragMode", "crop");
        });







        /*
        photosBody.on('input propertychange', '.photo-description', function () {
            var saveBtn = $(this).siblings('.save-photo-description');
            if (saveBtn.hasClass('disabled')) {
                saveBtn.removeClass('disabled').on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this).unbind('click').addClass('disabled');
                    var tr = $this.closest('tr');
                    var text = $this.siblings('.photo-description').val();
                    $.post(
                        $this.attr('href'),
                        {description: text},
                        function (response) {
                            if (response.result === 'success') {
                                notify.success(response.message);
                                tr.find('.plugin-box').attr('title', text);
                            }
                            else {
                                alert(response.error);
                            }
                        },
                        'json'
                    );
                    return false;
                });
            }
        });

        photosBody.on('click', '.change-image-button', function () {
            $(this).parent().find('.change-image-input').trigger('click');
            return false;
        });

        photosBody.on('change', '.change-image-input', function () {
            var $this = $(this);
            var tr = $this.closest('tr');
            var fileData = $this.prop('files')[0];
            var formData = new FormData();
            var changeButton = $this.siblings('.change-image-button').addClass('disabled');
            formData.append('Photo[image]', fileData);
            $.ajax({
                url: $this.siblings('.change-image-button').attr('href'),
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                type: 'post',
                success: function (response) {
                    changeButton.removeClass('disabled');
                    if (response.result === 'success') {
                        tr.find('.plugin-box').attr('href', response.photo.image).children('img').attr('src', response.photo.thumb);
                        notify.success(response.message);
                    } else {
                        alert(response.error);
                    }
                }
            });
        });

        photosBody.on('click', '.delete-photo', function () {
            var $this = $(this).addClass('disabled');
            if (confirm($this.attr('title') + '?')) {
                $.getJSON($this.attr('href'), function (response) {
                    $this.removeClass('disabled');
                    if (response.result === 'success') {
                        notify.success(response.message);
                        $this.closest('tr').fadeOut(function () {
                            $(this).remove();
                            checkEmpty();
                        });
                    } else {
                        alert(response.error);
                    }
                });
            }
            return false;
        });

        */






    });








});