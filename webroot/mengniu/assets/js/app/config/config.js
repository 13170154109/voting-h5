// Set the require.js configuration for your application.
require.config({

    deps: ["main"],

    baseUrl: "assets/js/app/",

    paths: {

        // app
        "main": "config/main",
        "app": "config/app",

        // base
        "jquery": "vendor/jquery/jquery-2.2.2",
        "backbone": "vendor/base/backbone",
        "underscore": "vendor/base/underscore",
        "layoutmanager": "vendor/base/backbone.layoutmanager",

        //sweiper
        "swiper": "vendor/jquery/swiper.jquery.min",
        "alloy_finger": "vendor/alloy_finger",
        "transform": "vendor/transform",
        // "moment":"vendor/moment",
        // utils


        // tween
        "TweenLite": "vendor/greensock/TweenMax",
        "TimelineLite": "vendor/greensock/TimelineMax",


        // media
        "howler": "vendor/media/howler.min",
        "buzz": "vendor/media/buzz",

        //exif
        "exif": "vendor/exif",

        //binaryajax
        "binaryajax": "vendor/binaryajax",

        //hammer
        "hammer":"vendor/ui/hammer.min",

        //loadimage
        "loadImage":"vendor/loadimg/load-image",
        "loadImageexif":"vendor/loadimg/load-image-exif",
        "loadImagexifmap":"vendor/loadimg/load-image-exif-map",
        "loadImagemeta":"vendor/loadimg/load-image-meta",

        //3ds
		"three":"vendor/threeds/three.min",
		"tween":"vendor/threeds/tween.min",
		"TrackballControls":"vendor/threeds/TrackballControls",
        "DeviceOrientationControls":"vendor/threeds/DeviceOrientationControls",
        "OrbitControls":"vendor/threeds/OrbitControls",
		"CSS3DRenderer":"vendor/threeds/CSS3DRenderer",
        "Detector":"vendor/threeds/Detector",


        "browser" : "vendor/jquery/jquery.browser.min",
        "parsequery" : "vendor/jquery/jquery.parsequery",

        "pinchzoom":"vendor/pinchzoom",
        //distpicker
        "distpicker":"vendor/distpicker"


    },

    shim: {

        "main": {
            deps: ["swiper","layoutmanager", "TimelineLite", "howler","buzz", "browser","parsequery","transform","alloy_finger","exif","pinchzoom","distpicker"]
            //deps : ["layoutmanager"],
        },

        "jquery": {
            exports: '$'
        },

        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },


        "browser": {
            deps: ["jquery"],

        },

        "parsequery": {
            deps: ["jquery"],

        },


        "swiper": {
            deps: ["jquery"]
        },

        "underscore": {
            exports: '_'
        },

        "layoutmanager": {
            deps: ["backbone"],
            exports: "Backbone.LayoutManager"
        },


        "buzz": {
            exports: "buzz"
        },


        "binaryajax": {
            exports: 'binaryajax'
        },
        // tween
        "TweenLite": {
            exports: "TweenLite"
        },

        "TimelineLite": {
            deps: ["TweenLite"],
            exports: "TimelineLite"
        },
        "RaphaelPlugin": {
            deps: ["TweenLite"]
        },

		"three": {
            //exports: "THREE"
        },

		"tween": {
            deps: ["three"]
        },

		"TrackballControls": {
            deps: ["three"]
        },
    "DeviceOrientationControls": {
            deps: ["three"]
        },
    "OrbitControls": {
            deps: ["three"]
        },

		"CSS3DRenderer": {
            deps: ["three"]
        },

		" ": {
            deps: ["three"]
        },
     /*   "loadImage":{
            deps: ["loadImage","loadImagexif","loadImagexifmap","loadImagemeta"]
        }*/
        "distpicker": {
            deps: ["jquery"]

        }


    }
});
