require(["app", "managers/layout-manager", "managers/router", "managers/resize-manager", "managers/tracker"],


    function (app, LayoutManager, Router, ResizeManager, Tracker) {

        // layout manager
        app.layout = (new LayoutManager()).layout();

        // router
        app.router = new Router();

        app.resizeManager = new ResizeManager();

        app.tracker = new Tracker({gaAccount : "", baiduAccount : ""});

        app.eventBus = _.extend({}, Backbone.Events);

        /*
         app.user = new User.Model();
         app.user.getInfo();
         */

        app.layout.render().promise().done(function () {
            Backbone.history.start({
                pushState: false
            });
        });


    });