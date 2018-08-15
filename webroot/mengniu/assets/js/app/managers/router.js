define(["app", "config/pages"],

// Map dependencies from above array.
    function (app, pages) {

        // Defining the application router, you can attach sub routers here.
        // landing start load

        var Router = Backbone.Router.extend({

            pages: [],

            pageHolders: [],
            currentRoute: "",
            isRemoving: false,

            routes: {
                "*route": "handleRoute"
            },

            initialize: function () {

                this.pages = pages;

            },


            handleRoute: function (route) {

                var routeObj = [];
                var currentRouteObj = this.convertRouteToObj(this.currentRoute);

                if (route) {
                    routeObj = this.convertRouteToObj(route);
                }

                if (routeObj.length == 0) {
                    this.goto(null, null);
                    return;
                }

                // render page
                var context = this;
                var startDfd = $.Deferred();
                var dfd = startDfd;
                var removePh = [];


                for (var i = 0; i < this.pageHolders.length; i++) {
                    removePh.push(false);
                }


                for (var i = 0; i < routeObj.length; i++) {

                    var p = _.findWhere(this.pages, {
                        routeId: routeObj[i].routeId
                    });

                    var ph = null;

                    if (!p) {
                        this.goto(null, null);
                        return;
                    }

                    if (!this.pageHolders[i]) {

                        ph = app.layout.insertView(new p.page());

                        ph.routeId = p.routeId;
                        ph.args = routeObj[i].args;
                        ph.index = i;

                        this.pageHolders[i] = ph;

                        // track
                        app.tracker.pv(ph.routeId + ((ph.args.length == 0) ? "" : "/" + ph.args.join("/")));

                        dfd = dfd.then($.proxy(ph.render, ph)).then(
                            function () {
                                app.resizeManager.adjustAllPageSizes();
                            }
                        );

                    }
                    else {

                        if (!_.isEqual(routeObj[i], currentRouteObj[i])) {

                            var oldPh = this.pageHolders[i];
                            ph = app.layout.insertView(new p.page());

                            ph.routeId = p.routeId;
                            ph.args = routeObj[i].args;
                            ph.index = i;
                            ph.isRefresh = true;
                            this.pageHolders[i] = ph;

                            // track
                            app.tracker.pv(ph.routeId + ((ph.args.length == 0) ? "" : "/" + ph.args.join("/")));

                            dfd = dfd.then($.proxy(ph.render, ph)).then(
                                function () {

                                    app.resizeManager.adjustAllPageSizes();


                                    oldPh.$el.after(ph.$el);

                                    removePh[i] = true;
                                    context.isRemoving = true;

                                    //oldPh.beforeRemove().then($.proxy(oldPh.remove, oldPh));

                                    /*
                                    oldPh.then($.proxy(oldPh.beforeRemove, oldPh)).then($.proxy(oldPh.remove, oldPh)).then(function () {
                                        context.isRemoving = false;
                                    });
                                    */


                                    var removeDfd = $.Deferred();
                                    removeDfd.then($.proxy(oldPh.beforeRemove, oldPh)).then($.proxy(oldPh.remove, oldPh))
                                        .then(function () {
                                            context.isRemoving = false;
                                        });
                                    removeDfd.resolve();


                                }
                            );

                        }

                    }

                }

                // remove page
                for (var i = routeObj.length; i < this.pageHolders.length; i++) {

                    ph = this.pageHolders[i];
                    if (ph) {

                        removePh[i] = true;
                        context.isRemoving = true;

                        dfd = dfd.then($.proxy(ph.beforeRemove, ph)).then($.proxy(ph.remove, ph))
                            .then(function () {
                                context.isRemoving = false;
                            });

                    }

                }


                for (var i = 0; i < removePh.length; i++) {
                    if (removePh[i]) {
                        this.pageHolders.splice(i, 1);
                    }
                }


                // scroll top
                $("html, body").scrollTop(-1);


                this.currentRoute = route;

                startDfd.resolve();


            },


            goto: function (routeId, args) {

                var lp = null;
                var p = null;
                var route = null;
                var routeObj = this.convertRouteToObj(this.currentRoute);
                var arr = [];


                // landing
                lp = _.findWhere(this.pages, {
                    landing: true
                });

                p = _.findWhere(this.pages, {
                    routeId: routeId
                });

                if (p) {

                    if (p.type == "main") {

                        routeObj = [
                            {routeId: routeId, args: args}
                        ];

                    }
                    else {
                        routeObj.push({routeId: routeId, args: args});
                    }

                }
                else {

                    routeObj = [
                        {routeId: lp.routeId}
                    ];

                }


                route = this.convertObjToRoute(routeObj);

                this.navigate(route, true);



            },

            gotoPageHolder: function (routeId, args, index) { // force to refresh on certain pageIndex page

                if (index == null) {
                    index = this.pageHolders.length - 1;
                }

                var routeObj = this.convertRouteToObj(this.currentRoute);

                if (routeObj[index]) {
                    routeObj[index] = {routeId: routeId, args: args};
                }

                route = this.convertObjToRoute(routeObj);





                this.navigate(route, true);


            },

            gotoMain: function (routeId, args) { // force to refresh on main

            },

            gotoOverlay: function (routeId, args) { // force to open on new overlay

            },

            close: function (index) {

                if (this.isRemoving) {
                    return;
                }

                var routeObj = this.convertRouteToObj(this.currentRoute);

                if (!index) {
                    routeObj.pop();
                }
                else {
                    routeObj.splice(index, 1);
                }

                route = this.convertObjToRoute(routeObj);
                this.navigate(route, true);


            },


            closeSelf: function (self) {

                console.log("close self");


                var idx =  -1;

                for (var i =0; i< this.pageHolders.length; i++) {
                    if (this.pageHolders[i].cid == self.cid) {
                        idx = i;
                        break;;
                    }
                }


                if (idx != -1) {
                    this.pageHolders.splice(idx,1);

                    var route = this.currentRoute;

                    var arr = route.split("|");
                    arr.splice(idx,1);
                    route = arr.join("|");

                    this.navigate(route, true);
                }


            },



            convertRouteToObj: function (route) {

                var routeObj = [];
                var arr = route.split("|");

                for (var i = 0; i < arr.length; i++) {

                    if (!_.isEmpty(arr[i])) {

                        var args = arr[i].split("/");

                        for (var j = 0; j < args.length; j++) {
                            args[j] = decodeURIComponent(args[j]);
                        }

                        var routeId = args.shift();
                        routeObj.push({routeId: routeId, args: args});

                    }

                }

                return routeObj;

            },

            convertObjToRoute: function (routeObj) {

                var route = "";

                if (_.isArray(routeObj)) {

                    for (var i = 0; i < routeObj.length; i++) {

                        if (!_.isArray(routeObj[i]["args"])) {
                            routeObj[i]["args"] = [];
                        }

                        routeObj[i]["args"].unshift(routeObj[i]["routeId"]);

                        for (var j = 0; j < routeObj[i]["args"].length; j++) {
                            routeObj[i]["args"][j] = encodeURIComponent(routeObj[i]["args"][j]);
                        }
                        routeObj[i] = routeObj[i]["args"].join("/");

                    }

                    route = routeObj.join("|");
                }

                return route;

            },

            navigate: function (url, opt) {

                if (!app.debug) {
                     // Override pushstate and load url directly
                     Backbone.history.loadUrl(url);
                }
                else {
                    Router.__super__.navigate.apply(this, arguments);
                }

            },


        });


        return Router;

    });
