// Set the require.js configuration for your application.
require.config({

    deps: ["main"],

    baseUrl: "assets/js/app/",

    paths: {

        // app
        "main": "config/main",
        "app": "config/app",

        // base
        "jquery": "vendor/zepto/jquery-2.1.4",
        //"jquery": "vendor/zepto/zepto",
        "backbone": "vendor/base/backbone",
        "underscore": "vendor/base/underscore",
        "layoutmanager": "vendor/base/backbone.layoutmanager",

        // utils

        // tween
        "TweenLite": "vendor/greensock/TweenMax",
        "TimelineLite": "vendor/greensock/TimelineMax",
        "RaphaelPlugin": "vendor/greensock/plugins/RaphaelPlugin",


        // media
        "howler": "vendor/media/howler.min",

        // draw
        "raphael": "vendor/draw/raphael-min",
        "sketch": "vendor/zepto/sketch",

		//3ds
		"three":"vendor/threeds/three.min",
		"tween":"vendor/threeds/tween.min",
		"TrackballControls":"vendor/threeds/TrackballControls",
		"DeviceOrientationControls":"vendor/threeds/DeviceOrientationControls",
		"CSS3DRenderer":"vendor/threeds/CSS3DRenderer",


    },

    shim: {

        "main": {
            deps: ["layoutmanager", "TimelineLite", "howler","three","DeviceOrientationControls","TrackballControls","CSS3DRenderer"],
            //deps : ["layoutmanager"],
        },

        "jquery": {
            exports: '$'
        },

        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },

        "underscore": {
            exports: '_'
        },

        "layoutmanager": {
            deps: ["backbone"],
            exports: "Backbone.LayoutManager"
        },

        "sketch": {
            deps: ["jquery"],
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

		"CSS3DRenderer": {
            deps: ["three"]
        },

		"DeviceOrientationControls": {
            deps: ["three"]
        },


    }
});
