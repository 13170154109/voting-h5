define([],

    function () {

        var app = require.defined("app") ? require('app') : {};

        app.viewsPath = "assets/js/app/views/";
        app.assetsPath = "assets/";

        require.config({
            baseUrl: "assets/js/app/"
        });

        app.origWidth = $(window).width();
        app.origHeight = $(window).height();

        app.layoutWidth = 750; // iPhone 6 width
        app.layoutHeight = 1216; // iPhone 6 height - Wechat bar = 1334 - 118


        app.view = "";
        app.show = "";
        app.product_data="";
        app.product_id="";
        // production server domain
        app.productionDomain = wxr_domain;
        app.isProduction = (document.domain == app.productionDomain);

        app.debug = (window["JST"]) ? false : true;


        app.bgSoundIndex = "verse";


        return app;


    });
