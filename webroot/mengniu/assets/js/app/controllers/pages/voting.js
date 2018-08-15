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
                // currentPage = "voting";
                require(["vendor/zepto/zepto.html5Loader.min"],
                    function () {
                        done();
                    });
                // done();



            },

            afterRender: function () {

                // 判断是否投过票
                // if(check_code==200){
                //     $(".btn-voting").show();
                // }else {
                //     $(".btn-voting").hide();
                // }

//遍历列表

                var user_id;
                $.ajax({
                    type: "post",
                    url: "user/get-participants",
                    data:"",
                    success: function(data){
                        idNum= data.length;
                        // console.log(data);
                        $.each(data,function(index,value){
                            console.log(value);
                            if(value.id%2 ==0){

                                var DataList1='<div class="info-left people-info pull-right" data-id="'+value.id+'"> <div class="people-img"> <img src="'+value.head_img_url+'" > </div> <div class="information">  <p class="name">'+value.name+'</p><div class="votes"> <span class="count-vot">'+value.age+' / '+value.occupation+' / '+value.city+'</span></div></div> </div> </div>'

                                $(".voting-cont .row-people").append(DataList1);

                            }else {
                                var DataList2='<div class="info-left people-info pull-left" data-id="'+value.id+'"> <div class="people-img"> <img src="'+value.head_img_url+'" > </div> <div class="information">  <p class="name">'+value.name+'</p><div class="votes"> <span class="count-vot">'+value.age+' / '+value.occupation+' / '+value.city+'</span></div></div> </div> </div>'
                                $(".voting-cont .row-people").append(DataList2);
                            }
                            user_id=value.id;
                            // alert(user_id);

                        });

                        PeopleInfoClick();

                        // SureClickSuccess();
                    },
                    error:function () {
                        console.log("失败");
                    }
                });


                function PeopleInfoClick() {
                    $(".people-info").on("click",function () {
                        app.router.goto("voting-info");
                        app.id=$(this).attr("data-id");
                        $.ajax({
                            type: "post",
                            url: "user/get-participant-detail",
                            data:{
                                "participant_id":app.id,
                            },
                            success: function(data){


                                // var partInfo='<div class="votes-info" data-id="'+data.data.id+'"> <div class="photo-img"><img src="'+data.data.head_img_url+'" ></div> <div class="photo-name">'+data.data.name+'</div> <div class="photo-num">'+data.data.vote_count+'</div> </div>'
                                console.log(data);
                                console.log(data.data.world);

                                var imgInfo='<div class="top-messege" data-id="'+data.data.id+'"> <div class="person-img-name clearfix"> <div class="img pull-left"><img src="'+data.data.head_img_url +'"></div> <div class="name pull-right"> '+data.data.name+'<div></div> <p class="age">年龄：<span>'+data.data.age+'</span></p> <p class="preff">职业：<span>'+data.data.occupation+'</span></p > <p class="city">所在城市：<span>'+data.data.city+'</span></p > </div> </div> <h2 class="big-title">'+data.data.world+'</h2></div>'
                                $(".user-information").before(imgInfo);
                                var partInfo1='<div class="part-information"data-id="'+data.data.id+'"> ';
                                var partInfo1a = '';

                                if(data.data.declaration != ''){
                                    partInfo1a = '<div class="line"></div> <div class="xuanyan user-word"> '+data.data.declaration+'</div>';
                                }

                                var partInfo2='<div class="line"></div> <div class="info-des1 user-word clearfix"> <span class="title1">'+data.data.word1+'<span class="year"></span></span> <div class="des1 pull-right"> '+data.data.des1+'</div> </div> <div class="line"></div>'
                                var partInfo3='<div class="info-des2 user-word clearfix"> <span class="title2">'+data.data.word2+'<span class="year"></span></span> <div class="des2 pull-right"> '+data.data.des2+'</div> </div>'

                                var partInfo4 = '';
                                if(data.data.des3 != null) {
                                    partInfo4 = ' <div class="line"></div><div class="info-des3 user-word clearfix"> <span class="title3">' + data.data.word3 + '<span class="year"></span></span> <div class="des3 pull-right"> ' + data.data.des3 + '</div> </div> </div>'
                                }


                                var partInfo=partInfo1+partInfo1a+partInfo2+partInfo3+partInfo4;
                                $(".user-information").append(partInfo);

                            },
                            error:function () {
                                console.log("失败");
                            }
                        });


                    });
                }


               // 点击跳转事件至首页
                $("#btn-voting-back").on("click",function () {
                    app.router.goto("home");
                });
                // 点击跳转事件至排行榜
                // console.log($("#btn-voting-list"));
                $("#btn-voting-list").on("click",function () {
                    app.router.goto('contestants-list');
                });





            },

        });
        // Return the module for AMD compliance.
        return Page;
    });

