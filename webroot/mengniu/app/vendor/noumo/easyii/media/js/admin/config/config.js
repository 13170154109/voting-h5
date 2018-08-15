// Set the require.js configuration for your application.
require.config({

    deps: ["main"],

    //baseUrl: "/assets/js/app/",

    paths: {

        // app
        "main": "config/main",
        "app": "config/app",

        // base
        "jquery": "vendor/jquery/jquery",
        "backbone": "vendor/base/backbone",
        "underscore": "vendor/base/underscore",
        "layoutmanager": "vendor/base/backbone.layoutmanager",

        // utils
        "jquery.browser": "vendor/jquery/jquery.browser.min",

        // tween
        "TweenLite": "vendor/greensock/TweenMax",
        "TimelineLite": "vendor/greensock/TimelineMax",


        // media
        "howler": "vendor/howler"
    },

    shim: {

        "main": {
            deps: ["layoutmanager", "TimelineLite", "jquery.browser"],
        },

        "jquery": {
            exports: "$"
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

        // tween
        "TweenLite": {
            exports: "TweenLite"
        },

        "TimelineLite": {
            deps: ["TweenLite"],
            exports: "TimelineLite"
        },


    }
});
