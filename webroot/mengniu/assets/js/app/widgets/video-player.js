// Page module
define(["app", "widgets/base/widget"],

    function (app, BaseWidget) {

        var Widget = {};

        Widget.View = BaseWidget.View.extend({


            player: null,
            ratio: 1,

            initialize: function (opt) {


                console.log(this.el);


                this.ratio = this.$el.width() / this.$el.outerHeight();

                console.log(this.ratio);

                this.vid = opt.vid;
                var w = this.$el.width();
                var h = w / this.ratio;
                var context = this;


                var o = opt.opt ? opt.opt : {};
                var quality = o.quality ? o.quality : 1;

                if ($.browser.mobile) {
                    o.autoplay = false;
                }

                require(["vendor/media/mediaelement/mediaelement-and-player.min"],
                    function () {

                        $.ajax({
                            url: "http://v3.polyv.net/videojson/" + context.vid + ".js",
                            jsonp: "callback",
                            dataType: "jsonp",
                            data: {},

                            success: function (response) {

                                console.log(response);

                                var opt = {
                                    enableAutosize: true,
                                    features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
                                    alwaysShowControls: false,
                                    enablePluginSmoothing: true, // smooth FLASH
                                    loop: (o.loop),
                                    /*WebKitPlaysInline:true,
                                    allowsInlineMediaPlayback:true,*/

                                    success: function (player) {

                                        if (o.autoplay) {

                                            if (player.pluginType !== 'flash') {
                                                player.addEventListener('loadstart', function (e) {
                                                    player.play();
                                                    app.tracker.event('video', 'play', context.vid + "_" + response.title);
                                                }, false);

                                                return;
                                            }

                                            if (player.attributes.preload === 'none') {
                                                $(player.pluginElement).ready(function (e) {
                                                    player.play();
                                                    app.tracker.event('video', 'play', context.vid + "_" + response.title);

                                                });
                                            }
                                            else {
                                                player.addEventListener('canplay', function (e) {
                                                    player.play();
                                                    app.tracker.event('video', 'play', context.vid + "_" + response.title);
                                                }, false);
                                            }

                                        }

                                        if (o.loop && player.pluginType == 'flash') {
                                            player.addEventListener('ended', function (e) {
                                                player.setSrc(player.src);
                                                player.play();
                                            }, false);
                                        }




                                    }
                                };

                                // In FF, force FLASH
                                if ($.browser.mozilla) {
                                    //opt.mode = 'shim';
                                }


                                context.$el.html('<video width="' + w + '" height="' + h + '" poster="'+response.first_image+'" controls="controls" preload="none"><source type="video/mp4" src="' + response.mp4[quality] + '" /></video>');
                                context.$el.css("padding-bottom", 0);

                                context.player = new MediaElementPlayer(context.$("video"), opt);

                            }
                        });

                        $(window).on("resize", $.proxy(context.resize, context));

                    });









            },


            resize: function () {

                var w = this.$el.width();
                var h = w / this.ratio;

                if (this.player) {

                    if (this.player.isFullScreen) {
                        w = $(window).width();
                        h = $(window).height();
                    }

                    if (this.player.options.videoWidth == w && this.player.options.videoHeight == h) {
                        return;
                    }

                    //console.log(this.player);

                    this.$el.height(h);

                    this.player.setPlayerSize(w, h);
                    this.player.setControlsSize();

                    this.player.options.videoWidth = w;
                    this.player.options.videoHeight = h;

                    this.$("video").width(w);
                    this.$("video").height(h);

                     if (this.player.media && this.player.media.setVideoSize) {
                        this.player.media.setVideoSize(w, h);
                     }

                }


            }


        });

        // Return the module for AMD compliance.
        return Widget;

    });
