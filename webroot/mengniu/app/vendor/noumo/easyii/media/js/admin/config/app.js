define([],

    function () {

        var app = require.defined("app") ? require('app') : {};



        app.origWidth = $(window).width();
        app.origHeight = $(window).height();

        // production server domain
        app.prdDomains = ["xxx"];
        app.isPrd = (_.indexOf(app.prdDomains, document.domain) != -1);


        return app;


    });
