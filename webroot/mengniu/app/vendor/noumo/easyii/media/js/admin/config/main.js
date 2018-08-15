require(["app", "config/layouts", "managers/resize-manager"],


    function (app, layouts, ResizeManager) {


        app.eventBus = _.extend({}, Backbone.Events);


        //layout manager
        var l = _.findWhere(layouts, {
            id: "wrapper"
        });

        app.layoutManager = new l.module({el: $("#wrapper").get(0)});


        app.resizeManager = new ResizeManager();





        /*
         app.user = new User.Model();
         app.user.getInfo();
         */



    });