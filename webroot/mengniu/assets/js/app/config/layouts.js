define([
        "controllers/layouts/main",


    ],


    function (Main

    ) {

        var layouts = [
            {
                id: 'main',
                module: function (opt) {
                    return new Main.View(opt);
                }
            }


        ];


        return layouts;

    });
