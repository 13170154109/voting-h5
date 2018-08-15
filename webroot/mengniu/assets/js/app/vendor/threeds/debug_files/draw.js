// Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {

        var Page = {};

        Page.View = BasePage.View.extend({


            defaultOrientation : "custom",  // portrait, landscape, custom
            layoutOrientation : "portrait",  // portrait, landscape, custom
            fitOn : "height",   //width, height, custom

            loading : false,

            currentStroke : "storke1",



            afterRender : function () {


                var context =this;


                this.$(".close-btn").click(function() {
                    app.router.close();
                });


                //$('#simple_sketch').sketch({defaultColor: "#ff0"});



                //this.initEdgeSmoothingWithShadows();
                //this.initRandomRadiusOpacity();
                //this.initShapesWithRotation();
                //this.initDotsPattern();
                //this.initLinesPattern();


                //this.initNeighborPoints();



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






                this.$(".submit-btn").click(function() {


                    if (!context.loading) {

                        context.loading = true;

                        /*
                        var canvas = document.createElement('canvas');
                        canvas.width = 200;
                        canvas.height = 293;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(document.getElementById('c'), 0, 0, 200, 200);
                        $(canvas).remove();
                        */

                        var canvas = document.getElementById('c')



                        $.ajax({
                            type: 'POST',
                            url: '/api/draw/submit',
                            data: {"image" : canvas.toDataURL("image/png")},
                            success: function (msg) {
                                app.router.close();
                                //context.loading = false;

                                app.router.pageHolders[0].update();


                            },
                            error: function() {
                                app.router.close();
                                //context.loading = false;
                            }
                        });

                    }




                });

                this.$(".clear-btn").click(function() {

                    //$('#simple_sketch').remove();

                    //context.$(".ratio-fix").prepend('<canvas id="simple_sketch" width="375" height="375"></canvas>');

                    //$('#simple_sketch').sketch({defaultColor: "#ff0"});

                    var el = document.getElementById('c');
                    var ctx = el.getContext('2d');

                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    context.$("." + context.currentStroke).trigger("click");


                });






                this.$(".storke").on("click", function() {

                    context.$(".storke").css("opacity", 0.5);

                    if ($(this).hasClass("storke1")) {

                        context.currentStroke = "storke1";
                        $(this).css("opacity", 1);
                        context.initEdgeSmoothingWithShadows();

                    }
                    if ($(this).hasClass("storke2")) {

                        context.currentStroke = "storke2";
                        $(this).css("opacity", 1);
                        context.initLinesPattern();

                    }
                    if ($(this).hasClass("storke3")) {

                        context.currentStroke = "storke3";
                        $(this).css("opacity", 1);
                        context.initDotsPattern();

                    }
                    if ($(this).hasClass("storke4")) {

                        context.currentStroke = "storke4";
                        $(this).css("opacity", 1);
                        context.initRandomRadiusOpacity();

                    }
                    if ($(this).hasClass("storke5")) {

                        context.currentStroke = "storke5";
                        $(this).css("opacity", 1);
                        context.initShapesWithRotation();

                    }
                    if ($(this).hasClass("storke6")) {

                        context.currentStroke = "storke6";
                        $(this).css("opacity", 1);
                        context.initNeighborPoints();

                    }
                });


                this.$(".storke1").trigger("click");













            },



            initEdgeSmoothingWithShadows : function() {

                var el = document.getElementById('c');
                var ctx = el.getContext('2d');
                var isDrawing;

                $(el).off("touchstart touchmove touchend touchcancel");
                ctx.strokeStyle = '#c32aff';
                ctx.shadowColor = '#c32aff';
                var context = this;

                $(el).on("touchstart", function(e) {

                    context.$(".write").hide();

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    isDrawing = true;
                    ctx.lineWidth = 2;
                    ctx.lineJoin = ctx.lineCap = 'round';
                    ctx.shadowBlur = 2;
                    ctx.moveTo(e.clientX, e.clientY);
                });

                $(el).on("touchmove", function(e) {

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    if (isDrawing) {
                        ctx.lineTo(e.clientX, e.clientY);
                        ctx.stroke();
                    }
                });

                $(el).on("touchend touchcancel", function() {
                    isDrawing = false;
                });

            },

            initRandomRadiusOpacity: function() {

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                var el = document.getElementById('c');
                var ctx = el.getContext('2d');

                $(el).off("touchstart touchmove touchend touchcancel");
                ctx.strokeStyle = '#c32aff';
                ctx.shadowColor = '#c32aff';

                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.fillStyle = '#c32aff';

                var isDrawing, points = [ ], radius = 10;

                var context = this;

                $(el).on("touchstart", function(e) {

                    context.$(".write").hide();

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();

                    isDrawing = true;
                    points.push({
                        x: e.clientX,
                        y: e.clientY,
                        radius: getRandomInt(5, 20),
                        opacity: Math.random()*0.02
                    });
                });
                $(el).on("touchmove", function(e) {

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    if (!isDrawing) return;

                    points.push({
                        x: e.clientX,
                        y: e.clientY,
                        radius: getRandomInt(3, 15),
                        opacity: Math.random()*0.02
                    });

                    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    for (var i = 0; i < points.length; i++) {
                        ctx.beginPath();
                        ctx.globalAlpha = points[i].opacity;
                        ctx.arc(
                            points[i].x, points[i].y, points[i].radius,
                            false, Math.PI * 2, false);
                        ctx.fill();
                    }
                });


                $(el).on("touchend touchcancel", function() {
                    isDrawing = false;
                    points.length = 0;
                });

            },


            initShapesWithRotation : function() {



                function drawStar(x, y, angle, opacity) {
                    var length = 15;
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.rotate(Math.PI / 180 * angle);
                    for (var i = 5; i--;) {
                        ctx.lineTo(0, length);
                        ctx.translate(0, length);
                        ctx.rotate((Math.PI * 2 / 10));
                        ctx.lineTo(0, -length);
                        ctx.translate(0, -length);
                        ctx.rotate(-(Math.PI * 6 / 10));
                    }
                    ctx.lineTo(0, length);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                var el = document.getElementById('c');
                var ctx = el.getContext('2d');

                ctx.lineJoin = ctx.lineCap = 'round';

                $(el).off("touchstart touchmove touchend touchcancel");
                ctx.strokeStyle = '#c32aff';
                ctx.shadowColor = '#c32aff';
                var context = this;

                ctx.lineWidth = 1;

                var isDrawing, points = [ ], radius = 10;

                $(el).on("touchstart", function(e) {

                    context.$(".write").hide();

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();

                    isDrawing = true;
                    points.push({ x: e.clientX, y: e.clientY, angle: getRandomInt(0, 180), opacity: Math.random()*0.05 });
                });
                $(el).on("touchmove", function(e) {

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    if (!isDrawing) return;

                    points.push({ x: e.clientX, y: e.clientY, angle: getRandomInt(0, 180), opacity: Math.random()*0.05 });

                    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    for (var i = 0; i < points.length; i++) {
                        drawStar(points[i].x, points[i].y, points[i].angle, points[i].opacity);
                    }
                });

                $(el).on("touchend touchcancel", function() {
                    isDrawing = false;
                    points.length = 0;
                });

            },

            initDotsPattern : function() {


                function midPointBtw(p1, p2) {
                    return {
                        x: p1.x + (p2.x - p1.x) / 2,
                        y: p1.y + (p2.y - p1.y) / 2
                    };
                }
                function getPattern() {
                    var patternCanvas = document.createElement('canvas'),
                        dotWidth = 20,
                        dotDistance = 5,
                        patternCtx = patternCanvas.getContext('2d');

                    patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;

                    patternCtx.fillStyle = '#c32aff';
                    patternCtx.beginPath();
                    patternCtx.arc(dotWidth / 2, dotWidth / 2, dotWidth / 2, 0, Math.PI * 2, false);
                    patternCtx.closePath();
                    patternCtx.fill();
                    return ctx.createPattern(patternCanvas, 'repeat');
                }

                var el = document.getElementById('c');
                var ctx = el.getContext('2d');

                $(el).off("touchstart touchmove touchend touchcancel");
                ctx.strokeStyle = '#c32aff';
                ctx.shadowColor = '#c32aff';
                var context = this;

                ctx.lineWidth = 20;
                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.strokeStyle = getPattern();

                var isDrawing, points = [ ];

                $(el).on("touchstart", function(e) {
                    context.$(".write").hide();

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();

                    isDrawing = true;
                    points.push({ x: e.clientX, y: e.clientY });
                });

                $(el).on("touchmove", function(e) {

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();

                    if (!isDrawing) return;

                    points.push({ x: e.clientX, y: e.clientY });

                    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    var p1 = points[0];
                    var p2 = points[1];

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);

                    for (var i = 1, len = points.length; i < len; i++) {
                        var midPoint = midPointBtw(p1, p2);
                        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                        p1 = points[i];
                        p2 = points[i+1];
                    }
                    ctx.lineTo(p1.x, p1.y);
                    ctx.stroke();
                });

                $(el).on("touchend touchcancel", function() {
                    isDrawing = false;
                    points.length = 0;
                });

            },


            initLinesPattern : function() {


                function midPointBtw(p1, p2) {
                    return {
                        x: p1.x + (p2.x - p1.x) / 2,
                        y: p1.y + (p2.y - p1.y) / 2
                    };
                }
                function getPattern() {
                    var patternCanvas = document.createElement('canvas'),
                        dotWidth = 20,
                        dotDistance = 5,
                        ctx = patternCanvas.getContext('2d');

                    patternCanvas.width = patternCanvas.height = 10;
                    ctx.strokeStyle = '#c32aff';
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.moveTo(0, 5);
                    ctx.lineTo(10, 5);
                    ctx.closePath();
                    ctx.stroke();
                    return ctx.createPattern(patternCanvas, 'repeat');
                }

                var el = document.getElementById('c');
                var ctx = el.getContext('2d');

                $(el).off("touchstart touchmove touchend touchcancel");
                ctx.strokeStyle = '#c32aff';
                ctx.shadowColor = '#c32aff';
                var context = this;

                ctx.lineWidth = 20;
                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.strokeStyle = getPattern();

                var isDrawing, points = [ ];

                $(el).on("touchstart", function(e) {
                    context.$(".write").hide();

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    isDrawing = true;
                    points.push({ x: e.clientX, y: e.clientY });
                });

                $(el).on("touchmove", function(e) {

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    if (!isDrawing) return;

                    points.push({ x: e.clientX, y: e.clientY });

                    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    var p1 = points[0];
                    var p2 = points[1];

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);

                    for (var i = 1, len = points.length; i < len; i++) {
                        var midPoint = midPointBtw(p1, p2);
                        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                        p1 = points[i];
                        p2 = points[i+1];
                    }
                    ctx.lineTo(p1.x, p1.y);
                    ctx.stroke();
                });

                $(el).on("touchend touchcancel", function() {
                    isDrawing = false;
                    points.length = 0;
                });


            },




            initNeighborPoints : function() {


                var el = document.getElementById('c');
                var ctx = el.getContext('2d');

                ctx.lineWidth = 1;
                ctx.lineJoin = ctx.lineCap = 'round';

                $(el).off("touchstart touchmove touchend touchcancel");
                //ctx.strokeStyle = '#c32aff';
                ctx.shadowColor = '#c32aff';

                var isDrawing, points = [ ];

                var context = this;


                $(el).on("touchstart", function(e) {

                    context.$(".write").hide();

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    points = [ ];
                    isDrawing = true;
                    points.push({ x: e.clientX, y: e.clientY });
                });

                $(el).on("touchmove", function(e) {

                    if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                        e.clientX = e.originalEvent.targetTouches[0].pageX;
                        e.clientY = e.originalEvent.targetTouches[0].pageY;
                    }
                    e.preventDefault();


                    if (!isDrawing) return;

                    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    points.push({ x: e.clientX, y: e.clientY });

                    ctx.beginPath();
                    ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
                    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                    ctx.stroke();

                    for (var i = 0, len = points.length; i < len; i++) {
                        dx = points[i].x - points[points.length-1].x;
                        dy = points[i].y - points[points.length-1].y;
                        d = dx * dx + dy * dy;

                        if (d < 1000) {
                            ctx.beginPath();
                            ctx.strokeStyle = 'rgba(195,42,255,0.5)';
                            ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
                            ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
                            ctx.stroke();
                        }
                    }
                });

                $(el).on("touchend touchcancel", function() {
                    isDrawing = false;
                    points.length = 0;
                });


            },


            resize: function (ww, wh, orient) {


            },

            changeOrientation: function (ww, wh, orient) {


            },




        });

        // Return the module for AMD compliance.
        return Page;

    });
