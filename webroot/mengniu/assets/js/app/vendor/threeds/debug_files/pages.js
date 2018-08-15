define([
        "controllers/pages/home",
        "controllers/pages/draw",
		"controllers/pages/tds",
        "controllers/pages/screen",
    ],


    function (Home,
			  Draw,
              Tds,
              Screen
    ) {

        var pages = [
            {
                routeId: 'home',
                type: 'main',
                landing: true,
                page: function () {
                    return new Home.View({template: "pages/home"});
                }
            },


            {
                routeId: 'draw',
                type: 'overlay',
                landing: false,
                page: function () {
                    return new Draw.View({template: "pages/draw"});
                }
            },

            {
                routeId: 'tds',
                type: 'main',
                landing: false,
                page: function () {
                    return new Tds.View({template: "pages/tds"});
                }
            },

            {
                routeId: 'screen',
                type: 'main',
                landing: false,
                page: function () {
                    return new Screen.View({template: "pages/screen"});
                }
            }


        ];


        return pages;

    });
