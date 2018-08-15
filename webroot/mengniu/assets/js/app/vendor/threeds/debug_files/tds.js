// Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {

        var Page = {};

        Page.View = BasePage.View.extend({


            defaultOrientation: "custom",  // portrait, landscape, custom
            layoutOrientation: "portrait",  // portrait, landscape, custom
            fitOn: "height",   //width, height, custom

            loading: false,


            camera: null,
            scene: null,
            renderer: null,
            controls: null,

            objects: {},
            targets: {
                draw: [
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100},
                    {x: 0, y: 0, z: -100}
                ],
                shape: [
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0},
                    {x: 0, y: 400, z: 0}
                ],
                drawTo: [
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000},
                    {x: 0, y: 0, z: 1000}
                ],
                shapeTo: [
                    {x: 0*400, y: 400, z: 2000},
                    {x: 1*400, y: 400, z: 2000},
                    {x: 2*400, y: 200, z: 2000},
                    {x: 3*400, y: 200, z: -3000},
                    {x: 4*400, y: 600, z: -3000},
                    {x: 5*400, y: 600, z: -3000},
                    {x: 6*400, y: 0, z: -3000},
                    {x: 7*400, y: 0, z: -3000},
                    {x: 8*400, y: 0, z: -3000},
                    {x: 9*400, y: 0, z: -3000}
                ],
            },


            afterRender: function () {


                this.init();
                this.animate();
				
				var tls = new TimelineMax();
				tls.to(this.$('.button_2'), 8, {rotation:-360,repeat: -1,transformOrigin: "50% 50%" });
				
				TweenMax.to(this.$('.logo'),7, {rotationY:360,repeat: -1, transformOrigin:"50% -25"});


            },


            init: function () {

                var context = this;

                this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
                this.camera.position.z = 3000;

                this.scene = new THREE.Scene();


                for (var i = 0; i < 10; i++) {

                    this.$("#container").append('<div id="draw' + (i + 1) + '" class="draw"></div>');

                    this.$("#draw" + (i + 1)).width(375);
                    this.$("#draw" + (i + 1)).height(550);
                    this.$("#draw" + (i + 1)).css("background", "red");

                    var object = new THREE.CSS3DObject(this.$("#draw" + (i + 1)).get(0));
                    //object.position.x = Math.random() * 4000 - 2000;
                    //object.position.y = Math.random() * 4000 - 2000;
                    //object.position.z = Math.random() * 4000 - 2000;

                    object.position.x = this.targets.draw[i].x;
                    object.position.y = this.targets.draw[i].y;
                    object.position.z = this.targets.draw[i].z;

                    this.scene.add(object);

                    this.objects["draw" + (i + 1)] = object;

                }
				
				
				 var object = new THREE.CSS3DObject(this.$("#bg1").get(0));
                    //object.position.x = Math.random() * 4000 - 2000;
                    //object.position.y = Math.random() * 4000 - 2000;
                    //object.position.z = Math.random() * 4000 - 2000;

                    object.position.x =0 ;
                    object.position.y =0 ;
                    object.position.z =-2000;

                    this.scene.add(object);

                    this.objects["bg1"] = object;
				
				 var object = new THREE.CSS3DObject(this.$("#bg2").get(0));
                    //object.position.x = Math.random() * 4000 - 2000;
                    //object.position.y = Math.random() * 4000 - 2000;
                    //object.position.z = Math.random() * 4000 - 2000;

                    object.position.x =0 ;
                    object.position.y =0 ;
                    object.position.z =-1000;

                    this.scene.add(object);

                    this.objects["bg2"] = object;
					
				 var object = new THREE.CSS3DObject(this.$("#bg3").get(0));
                    //object.position.x = Math.random() * 4000 - 2000;
                    //object.position.y = Math.random() * 4000 - 2000;
                    //object.position.z = Math.random() * 4000 - 2000;

                    object.position.x =0 ;
                    object.position.y =0 ;
                    object.position.z =-300;

                    this.scene.add(object);

                    this.objects["bg3"] = object;
					
				 var object = new THREE.CSS3DObject(this.$(".bottom_bg").get(0));
                    //object.position.x = Math.random() * 4000 - 2000;
                    //object.position.y = Math.random() * 4000 - 2000;
                    //object.position.z = Math.random() * 4000 - 2000;

                    object.position.x =0 ;
                    object.position.y =0 ;
                    object.position.z =500;

                    this.scene.add(object);

                    this.objects["bottom_bg"] = object;


                for (var i = 0; i < 10; i++) {

                    this.$("#container").append('<div id="shape' + (i + 9) + '" class="shape"></div>');

                    this.$("#shape" + (i + 9)).width(100);
                    this.$("#shape" + (i + 9)).height(100);
                    this.$("#shape" + (i + 9)).css("background", "url(../assets/images/shape/shape2.png) no-repeat center");

                    var object = new THREE.CSS3DObject(this.$("#shape" + (i + 9)).get(0));
                    //object.position.x = Math.random() * 4000 - 2000;
                    //object.position.y = Math.random() * 4000 - 2000;
                    //object.position.z = Math.random() * 4000 - 2000;

                    object.position.x = this.targets.shape[i].x;
                    object.position.y = this.targets.shape[i].y;
                    object.position.z = this.targets.shape[i].z;

                    this.scene.add(object);

                    this.objects["shape" + (i + 9)] = object;


                }


                this.renderer = new THREE.CSS3DRenderer();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.domElement.style.position = 'absolute';
                document.getElementById('container').appendChild(this.renderer.domElement);

                //

                this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
                this.controls.rotateSpeed = 0.5;
                this.controls.minDistance = 500;
                this.controls.maxDistance = 6000;
                this.controls.addEventListener('change', $.proxy(this.render3d, this));
				
				//this.controls = new THREE.DeviceOrientationControls(this.camera);
				//this.controls.addEventListener('change', $.proxy(this.render3d, this));
				
				
				
				var d = new Date();
                var ts = d.getTime();
				
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
				
				
				var botl = new TimelineMax();
                botl.stop();
                botl.to([".draw, .logo, .bottom_bg, .shape"], 1, {opacity:0.5, ease:Power1.easeInOut});
                botl.to([".draw, .logo, .bottom_bg, .shape"], 1, {opacity:1, ease:Power1.easeInOut});
                botl.repeat(-1);
                botl.seek(ts%(botl.duration()*1000)/1000);
                botl.play();



                this.createTimeline();
				this.createTimeline2();


                window.addEventListener('resize', $.proxy(this.onWindowResize, this), false);


                this.update();


                setInterval(function() {context.update();}, 8000);


            },


            createTimeline : function() {

                console.log("createTimeline");


                var dtl1 = new TimelineMax({onUpdate: $.proxy(this.render3d, this), onComplete: $.proxy(this.createTimeline, this)});
                dtl1.stop();


                var from, to;


                from = this.targets.draw[0];
                //from.x = from.x + Math.random() * 300;
                //from.y = from.y + Math.random() * 200;
                //from.z = from.z + Math.random() * 0;


                dtl1.to("#draw1", 0, {display: "block"});
                dtl1.fromTo(this.objects["draw1"].position, 4.5, from, this.targets.drawTo[0]);
                dtl1.to("#draw1", 0, {display: "none"});

                dtl1.to("#draw2", 0, {display: "block"}, "-=4");
                dtl1.fromTo(this.objects["draw2"].position, 4.5, this.targets.draw[1], this.targets.drawTo[1], "-=4");
                dtl1.to("#draw2", 0, {display: "none"});


                dtl1.repeat(0);

                dtl1.play();

            },
			
			createTimeline2 : function() {

                console.log("createTimeline2");


                var dtl2 = new TimelineMax({onUpdate: $.proxy(this.render3d, this), onComplete: $.proxy(this.createTimeline2, this)});
                dtl2.stop();


                var from, to;


                from = this.targets.shape[0];
                //from.x = from.x + Math.random() * 200;
                //from.y = from.x + Math.random() * 200;
                //from.z = from.x + Math.random() * 200;


                dtl2.to("#shape1", 0, {display: "block"});
                dtl2.fromTo(this.objects["shape1"].position, 4.5, from, this.targets.drawTo[0]);
                dtl2.to("#shape1", 0, {display: "none"});

                dtl2.to("#shape2", 0, {display: "block"}, "-=4");
                dtl2.fromTo(this.objects["shape2"].position, 4.5, this.targets.draw[1], this.targets.drawTo[1], "-=4");
                dtl2.to("#shape2", 0, {display: "none"});


                dtl2.repeat(0);

                dtl2.play();

            },
			
			

            onWindowResize: function () {

                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();

                this.renderer.setSize(window.innerWidth, window.innerHeight);

                this.render3d();

            },

            animate: function () {

                requestAnimationFrame($.proxy(this.animate, this));

                this.controls.update();
				//this.controls.update();

            },

            render3d: function () {

                this.renderer.render(this.scene, this.camera);

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
                        }

                    },
                    error: function() {
                    }
                });

            },


        });

        // Return the module for AMD compliance.
        return Page;

    });
