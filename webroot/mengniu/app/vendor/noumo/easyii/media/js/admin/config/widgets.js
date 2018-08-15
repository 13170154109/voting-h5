define(window.requireModuleWidgetList,


    function (

    ) {


        var widgets = [

        ];


        for (var i=0; i < arguments.length; i++) {



                var obj = arguments[i];

                widgets.push(
                    {
                        id: window.requireModuleWidgets[window.requireModuleWidgetList[i]],
                        module: obj.View,
                    }
                );










        }



        return widgets;

    });
