/**
 * Created by DELL on 2017/11/1.
 */
    // Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {
        var Page = {};

        Page.View = BasePage.View.extend({


            beforeRender: function () {

                var done = this.async();

                // prevPage = currentPage;
                // currentPage = "contestants-list";
                require(["vendor/zepto/zepto.html5Loader.min"],
                    function () {
                        done();
                    });
            },

            afterRender: function () {

                //遍历列表

                $.ajax({
                    type: "post",
                    url: "user/get-leaderboard",
                    data:"",
                    success: function(data){
                        console.log(data);
                        var num=1;
                        var flag = 1;
                        $.each(data,function(index,value){
                            console.log(value)

                            // var RankList='<div class="row-people row" data-id="'+value.id+'"> <div class="col-md-2 col-xs-2 people-id"><span class="row-id">'+value.id+'</span></div> <div class="col-md-7 col-xs-7 info-second"> <div class="people-img"> <img src="'+value.head_img_url+'" > </div><div class="name">'+value.name+'</div> </div> <div class="col-md-3 col-xs-3 people-count"><span class="vote-num">'+value.vote_count+'</span>票</div> </div>'
                            var RankList=RankList1+RankList2;

                            if(flag==1){

                                var RankList0=' <div class="row-people row first" data-id="'+value.id+'"> <div class="col-md-12 col-xs-12 info-second"> <div class="people-img"> <img src="'+value.head_img_url+'" > </div> <div class="name-num"> <div class="row-id id-first">'+flag+'<div class="num-logo"><img src="assets/images/img/logo-num1.png" ></div></div> <div class="name"> '+value.name+'</div><div class="people-peffer">'+value.occupation+'</div> <div class="people-count vote-num">'+value.vote_count+' 票</div> </div> </div> </div>';
                                $(".voting-list-cont .second-row").before(RankList0);
                            }
                            else {
                                if(flag%2 == 0){

                                    var RankList1=' <div class="row-people row pull-left" data-id="'+value.id+'"> <div class="col-md-12 col-xs-12 info-second"> <div class="people-img"> <img src="'+value.head_img_url+'" > </div> <div class="name-num"> <div class="row-id">'+flag+'<div class="num-logo"><img src="assets/images/img/logo-num3.png" ></div></div> <div class="name"> '+value.name+'</div><div class="people-peffer">'+value.occupation+'</div>  <div class="people-count vote-num">'+value.vote_count+' 票</div> </div> </div> </div>';
                                    $(".voting-list-cont .second-row").append(RankList1);
                                    $(".voting-list-cont .second-row .row-people .info-second .num-logo img").eq(0).attr("src","assets/images/img/logo-num2.png");

                                }else {
                                    var RankList2=' <div class="row-people row pull-right" data-id="'+value.id+'"> <div class="col-md-12 col-xs-12 info-second"> <div class="people-img"> <img src="'+value.head_img_url+'" > </div> <div class="name-num"> <div class="row-id">'+flag+'<div class="num-logo"><img src="assets/images/img/logo-num3.png" ></div></div><div class="name"> '+value.name+'</div> <div class="people-peffer">'+value.occupation+'</div> <div class="people-count vote-num">'+value.vote_count+' 票</div> </div> </div> </div>';

                                    $(".voting-list-cont .second-row").append(RankList2);
                                }
                            }

                            flag++;
                            // $(".voting-list-cont .second-row").append(RankList);
                        });
                    }
                });


                // 点击跳转事件至首页
                $("#btn-back-home").on("click",function () {
                    app.router.goto("home");
                })
                


            },

        });
        // Return the module for AMD compliance.
        return Page;
    });

