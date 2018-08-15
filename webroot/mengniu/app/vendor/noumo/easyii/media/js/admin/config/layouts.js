define([
        "controllers/layouts/main",


    ],


    function (Main

    ) {

        var layouts = [
            {
                id: 'wrapper',
                module: function (opt) {
                    return new Main.View(opt);
                }
            }


        ];


        return layouts;

    });
