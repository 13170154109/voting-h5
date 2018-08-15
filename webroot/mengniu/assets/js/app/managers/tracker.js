define(["app"],

    function (app) {


        var Tracker = Backbone.Model.extend({

            testGaAccount : "UA-110822981-1",
            testBaiduAccount : "d91da0c4c2d6f4f817bf6826f16cec40",


            initialize: function (opt) {



                var gaAccount = this.testGaAccount;
                var baiduAccount = this.testBaiduAccount;



                // google analytics
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script', app.assetsPath + 'js/app/vendor/utils/ga-analytics.js','ga');

                ga('create', gaAccount, 'auto');



            },

            pv: function (name) {

                name = "/" + name;

                ga('send', 'pageview', name);

                //window._hmt.push(['_trackPageview', name]);
            },


            event: function (category, action, name) {

                //ga('send', 'event', 'button', 'click', name);
                ga('send', 'event', category, action, name);

                //window._hmt.push(['_trackEvent', category, action, name]);

            }


        });


        // Return the module for AMD compliance.
        return Tracker;

    });
