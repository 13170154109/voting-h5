// Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {

        var Page = {};

        Page.View = BasePage.View.extend({

            defaultOrientation : "custom",  // portrait, landscape, custom
            layoutOrientation : "custom",  // portrait, landscape, custom

            fitOn : "custom",   //width, height, custom


            beforeRender: function () {

                var done = this.async();
                done();

            },


            afterRender: function () {

                $("#main").css("background", "#ffffff");


                var context = this;


                var d = new Date();
                var ts = d.getTime();
                var s = d.getSeconds()
                var ms = d.getMilliseconds();


                var botl = new TimelineMax();
                botl.stop();
                botl.to([".draw, .logo, .bottom_bg, .shape"], 1, {opacity:0.5, ease:Power1.easeInOut});
                botl.to([".draw, .logo, .bottom_bg, .shape"], 1, {opacity:1, ease:Power1.easeInOut});
                botl.repeat(-1);
                botl.seek(ts%(botl.duration()*1000)/1000);
                botl.play();


                var ctl = new TimelineMax();

                ctl.stop();

                // purple
                ctl.set([".draw, .logo, .bottom_bg"], {backgroundColor:"#c32aff"});

                // red
                ctl.to([".draw, .logo, .bottom_bg"], 1, {backgroundColor:"#DD0048", delay: 14});

                // green
                ctl.to([".draw, .logo, .bottom_bg"], 1, {backgroundColor:"#39FF14", delay: 14});

                // blue
                ctl.to([".draw, .logo, .bottom_bg"], 1, {backgroundColor:"#7DF9FF", delay: 14});

                // purple
                ctl.to([".draw, .logo, .bottom_bg"], 1, {backgroundColor:"#c32aff", delay: 14});

                ctl.repeat(-1);
                ctl.seek(ts%(ctl.duration()*1000)/1000);
                ctl.play();



                var dtl1 = new TimelineMax();
                dtl1.stop();

                dtl1.fromTo("#draw1", 5, {top:"-500px"}, {top:"800px"});


                for (var i=2; i<=40; i++) {
                    dtl1.fromTo("#draw"+i, 5, {top:"-500px"}, {top:"800px"}, "-=4");
                }




                dtl1.repeat(-1);

                dtl1.play();








                this.update();

                setInterval(function() {context.update();}, 8000);



            },


            update : function() {

                var context = this;

                $.ajax({
                    type: 'GET',
                    url: '/api/draw/get',
                    data: {"page" : 1, "per_page" : 40},
                    success: function (json) {

                        for (var i=0; i<json.draws.length;i++) {
                            context.$("#draw" + (i+1)).css("-webkit-mask-image", "url("+json.draws[i].url+")");
                            //context.$("#draw" + (i+11)).css("-webkit-mask-image", "url("+json.draws[i].url+")");
                        }

                    },
                    error: function() {
                    }
                });

            }


        });

        // Return the module for AMD compliance.
        return Page;

    });
