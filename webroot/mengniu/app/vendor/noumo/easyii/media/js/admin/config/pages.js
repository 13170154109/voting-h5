define(window.requireModulePageList,


    function (

    ) {


        var pages = [

        ];


        for (var i=0; i < arguments.length; i++) {

            var obj = arguments[i];


            pages.push(
                {
                    id: window.requireModulePages[window.requireModulePageList[i]],
                    module: obj.View,
                }
            );





        }



        return pages;

    });
