define([
        "widgets/header",
        "widgets/footer"

    ],


    function (
        Header,
        Footer


    ) {

        var widgets = [
            {
                id: 'header',
                module: function (opt) {
                    return new Header.View(opt);
                }
            },
            {
                id: 'footer',
                module: function (opt) {
                    return new Footer.View(opt);
                }
            }


        ];


        return widgets;

    });