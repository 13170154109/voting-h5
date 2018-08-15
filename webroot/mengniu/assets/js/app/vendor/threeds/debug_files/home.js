// Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {

        var Page = {};

        Page.View = BasePage.View.extend({


            defaultOrientation : "custom",  // portrait, landscape, custom
            layoutOrientation : "portrait",  // portrait, landscape, custom
            fitOn : "height",   //width, height, custom


            paper : null,


            afterRender : function () {


                $(window).trigger("resize");


                var context = this;

                var d = new Date();
                var ts = d.getTime();
                var s = d.getSeconds()
                var ms = d.getMilliseconds();

                var color = "#c32aff";




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

                dtl1.fromTo("#draw1", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw1"));
                dtl1.set("#draw1", {display: "none"});

                dtl1.fromTo("#draw2", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw2"), "-=0.5");
                dtl1.set("#draw2", {display: "none"});

                dtl1.fromTo("#draw3", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw3"), "-=0.5");
                dtl1.set("#draw3", {display: "none"});

                dtl1.fromTo("#draw4", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw4"), "-=0.5");
                dtl1.set("#draw4", {display: "none"});

                dtl1.fromTo("#draw5", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw5"), "-=0.5");
                dtl1.set("#draw5", {display: "none"});

                dtl1.fromTo("#draw6", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw6"), "-=0.5");
                dtl1.set("#draw6", {display: "none"});

                dtl1.fromTo("#draw7", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw7"), "-=0.5");
                dtl1.set("#draw7", {display: "none"});

                dtl1.fromTo("#draw8", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw8"), "-=0.5");
                dtl1.set("#draw8", {display: "none"});

                dtl1.fromTo("#draw9", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw9"), "-=0.5");
                dtl1.set("#draw9", {display: "none"});

                dtl1.fromTo("#draw10", 2, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#draw10"), "-=0.5");
                dtl1.set("#draw10", {display: "none"});

                dtl1.repeat(-1);
                dtl1.seek(ts%(dtl1.duration()*1000)/1000);

                dtl1.play();



                var dtl2 = new TimelineMax();
                dtl2.stop();

                dtl2.fromTo("#shape1", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape1"));
                dtl2.set("#shape1", {display: "none"});

                dtl2.fromTo("#shape2", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape2"), "-=2");
                dtl2.set("#shape2", {display: "none"});

                dtl2.fromTo("#shape3", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape3"), "-=1");
                dtl2.set("#shape3", {display: "none"});

                dtl2.fromTo("#shape4", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape4"), "-=2");
                dtl2.set("#shape4", {display: "none"});

                dtl2.fromTo("#shape5", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape5"), "-=1");
                dtl2.set("#shape5", {display: "none"});

                dtl2.fromTo("#shape6", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape6"), "-=1");
                dtl2.set("#shape6", {display: "none"});

                dtl2.fromTo("#shape7", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape7"), "-=2");
                dtl2.set("#shape7", {display: "none"});

                dtl2.fromTo("#shape8", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape8"), "-=1");
                dtl2.set("#shape8", {display: "none"});

                dtl2.fromTo("#shape9", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape9"), "-=2");
                dtl2.set("#shape9", {display: "none"});

                dtl2.fromTo("#shape10", 2.5, {top:"50%", left:"50%", width: "1%", height: "1%", display: "none"}, this.getPercentages("#shape10"), "-=1");
                dtl2.set("#shape10", {display: "none"});


                dtl2.repeat(-1);
                dtl2.seek(ts%(dtl2.duration()*1000)/1000);


                dtl2.play();





                var ctl1 = new TimelineMax();

                ctl1.stop();

                // red
                ctl1.set(["#shape1, #shape5, #shape7"], {backgroundColor:"#DD0048"});

                // purple
                ctl1.to(["#shape1, #shape5, #shape7"], 1, {backgroundColor:"#c32aff", delay: 14});

                // blue
                ctl1.to(["#shape1, #shape5, #shape7"], 1, {backgroundColor:"#7DF9FF", delay: 14});

                // purple
                ctl1.to(["#shape1, #shape5, #shape7"], 1, {backgroundColor:"#39FF14", delay: 14});

                // green
                ctl1.to(["#shape1, #shape5, #shape7"], 1, {backgroundColor:"#c32aff", delay: 14});

                ctl1.repeat(-1);
                ctl1.seek(ts%(ctl1.duration()*1000)/1000);
                ctl1.play();


                var ctl2 = new TimelineMax();

                ctl2.stop();

                // blue
                ctl2.set(["#shape2, #shape6, #shape8"], {backgroundColor:"#7DF9FF"});

                // green
                ctl2.to(["#shape2, #shape6, #shape8"], 1, {backgroundColor:"#39FF14", delay: 14});

                // purple
                ctl2.to(["#shape2, #shape6, #shape8"], 1, {backgroundColor:"#c32aff", delay: 14});

                // red
                ctl2.to(["#shape2, #shape6, #shape8"], 1, {backgroundColor:"#DD0048", delay: 14});

                // blue
                ctl2.to(["#shape2, #shape6, #shape8"], 1, {backgroundColor:"#7DF9FF", delay: 14});

                ctl2.repeat(-1);
                ctl2.seek(ts%(ctl2.duration()*1000)/1000);
                ctl2.play();


                var ctl3 = new TimelineMax();

                ctl3.stop();

                // green
                ctl3.set(["#shape3, #shape4, #shape9, #shape10"], {backgroundColor:"#39FF14"});

                // blue
                ctl3.to(["#shape3, #shape4, #shape9, #shape10"], 1, {backgroundColor:"#7DF9FF", delay: 14});

                // red
                ctl3.to(["#shape3, #shape4, #shape9, #shape10"], 1, {backgroundColor:"#DD0048", delay: 14});

                // green
                ctl3.to(["#shape3, #shape4, #shape9, #shape10"], 1, {backgroundColor:"#c32aff", delay: 14});

                // red
                ctl3.to(["#shape3, #shape4, #shape9, #shape10"], 1, {backgroundColor:"#DD0048", delay: 14});

                ctl3.repeat(-1);
                ctl3.seek(ts%(ctl3.duration()*1000)/1000);
                ctl3.play();
				
				
				var tls = new TimelineMax();
				tls.to(this.$('.button_2'), 8, {rotation:-360,repeat: -1,transformOrigin: "50% 50%" });
				
				TweenMax.to(this.$('.logo'), 2, {rotationY:360,repeat: 2, transformOrigin:"50% -25"});














                // music
                var sound = new Howl({
                    src: ['/assets/audio/bg.mp3'],
                    autoplay: false,
                    loop: true,
                    volume: 0.5,
                    sprite: {
                        "complete": [0, 180000]
                    },
                    onload: function() {
                        sound.play("complete");
                        sound.seek(ts%(180*1000)/1000, "complete");
                    }
                });











                // sync

                setInterval(function() {

                    var d = new Date();
                    var ts = d.getTime();
                    var s = d.getSeconds()
                    var ms = d.getMilliseconds();

                    botl.seek(ts%(botl.duration()*1000)/1000);
                    botl.play();

                    ctl.seek(ts%(ctl.duration()*1000)/1000);
                    ctl.play();

                    dtl1.seek(ts%(dtl1.duration()*1000)/1000);
                    dtl1.play();

                    dtl2.seek(ts%(dtl2.duration()*1000)/1000);
                    dtl2.play();

                    ctl1.seek(ts%(ctl1.duration()*1000)/1000);
                    ctl1.play();

                    ctl2.seek(ts%(ctl2.duration()*1000)/1000);
                    ctl2.play();

                    ctl3.seek(ts%(ctl3.duration()*1000)/1000);
                    ctl3.play();


                    sound.seek(ts%(180*1000)/1000, "complete");

                }, 500);



                // click
                this.$(".draw-btn").click(function() {
                    app.router.goto("draw");
                });

                /*
                 this.$(".so").click(function() {
                 context.$(".so").css("border-bottom", "1px solid #ffffff");
                 context.$(".mw").css("border-bottom", "none");
                 });


                 this.$(".mw").click(function() {
                 context.$(".mw").css("border-bottom", "1px solid #ffffff");
                 context.$(".so").css("border-bottom", "none");
                 });


                 this.$(".so").trigger("click");
                 */




                this.update();


                setInterval(function() {context.update();}, 8000);






            },


            update : function() {

                var context = this;

                $.ajax({
                    type: 'GET',
                    url: '/api/draw/get',
                    data: {"page" : 1},
                    success: function (json) {

                        for (var i=0; i<json.draws.length;i++) {
                            context.$("#draw" + (i+1)).css("-webkit-mask-image", "url("+json.draws[i].url+")");
                            context.$("#draw" + (i+11)).css("-webkit-mask-image", "url("+json.draws[i].url+")");
                        }

                    },
                    error: function() {
                    }
                });

            },


            getPercentages : function(sel) {



                console.log({
                    top: this.$(sel).position().top / $(".page-home .wrapper").height() * 100 + "%",
                    left: this.$(sel).position().left / $(".page-home .wrapper").width() * 100 + "%",

                    height: this.$(sel).height() / $(".page-home .wrapper").height() * 100 + "%",
                    width: this.$(sel).width() / $(".page-home .wrapper").width() * 100 + "%",

                    display: "block"
                });




                return {
                    top: this.$(sel).position().top / $(".page-home .wrapper").height() * 100 + "%",
                    left: this.$(sel).position().left / $(".page-home .wrapper").width() * 100 + "%",

                    height: this.$(sel).height() / $(".page-home .wrapper").height() * 100 + "%",
                    width: this.$(sel).width() / $(".page-home .wrapper").width() * 100 + "%",

                    display: "block"
                };


            },



            resize: function (ww, wh, orient) {


            },

            changeOrientation: function (ww, wh, orient) {


            },




        });

        // Return the module for AMD compliance.
        return Page;

    });
