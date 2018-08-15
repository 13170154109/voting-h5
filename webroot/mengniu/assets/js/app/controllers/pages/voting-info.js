/**
 * Created by DELL on 2017/11/1.
 */
    // Page module
define(["app", "controllers/base/page"],

    function (app, BasePage) {
        var Page = {};

        Page.View = BasePage.View.extend({


            beforeRender: function () {

                // prevPage = currentPage;
                // currentPage = "voting-info";
                var done = this.async();

                require(["vendor/zepto/zepto.html5Loader.min"],
                    function () {
                        done();
                    });






            },

            afterRender: function () {


                console.log(124);

                // setInterval(testFunction(),3000);
                //
                // function testFunction() {
                //
                // }
                var ruleMonth = 4;    
                var ruleDay = 25;
                function judgeDate() {
                    var myDate = new Date();
                    var myMonth = myDate.getMonth();    
                    var myDay = myDate.getDate();
                    if(myMonth > ruleMonth) {
                        $("#btn-voting").hide();
                    } else {
                        if(myDay >= ruleDay) {
                            $("#btn-voting").hide();
                        }
                    }
                }  

                // 
                // 
                $.ajax({
                    type: "post",
                    url: "user/check",
                    data:{
                        "voter_openid":wxr_openid
                    },
                    success: function(data){
                        console.log('检查结果');
                        //alert(data.code);
                        // check_code=data.code;
                        // console.log(data.code);
                        if(data.code==400){
                             // alert("投过了");
                            $("#btn-voting").hide();
                        }
                        else {
                            // alert("没投过");
                            $("#btn-voting").show();
                            judgeDate(); 

                        }

                    }
                });



                //翻页
                function TurnPage(userid) {
                    $.ajax({
                        type: "post",
                        url: "user/get-participant-detail",
                        data:{
                            "participant_id":userid,
                        },
                        success: function(data){
                            // console.log(data)
                            // var useInfo='<div class="part-information"data-id="'+data.data.id+'"><img src="'+data.data.img_big+'"></div>'
                            var imgInfo='<div class="top-messege" data-id="'+data.data.id+'"> <div class="person-img-name clearfix"> <div class="img pull-left"><img src="'+data.data.head_img_url +'"></div> <div class="name pull-right"> '+data.data.name+'<div></div> <p class="age">年龄：<span>'+data.data.age+'</span></p> <p class="preff">职业：<span>'+data.data.occupation+'</span></p > <p class="city">所在城市：<span>'+data.data.city+'</span></p > </div> </div> <h2 class="big-title">  '+data.data.world+'</h2></div>'
                            $(".top-messege").remove();
                            $(".user-information").empty().before(imgInfo);
                            var useInfo1='<div class="part-information"data-id="'+data.data.id+'"> ';

                            var useInfo1a = '';

                            if(data.data.declaration != ''){
                                useInfo1a = '<div class="line"></div> <div class="xuanyan user-word"> '+data.data.declaration+'</div>';
                            }
                            var useInfo2='<div class="line"></div> <div class="info-des1 user-word clearfix"> <span class="title1">'+data.data.word1+'<span class="year"></span></span> <div class="des1 pull-right"> '+data.data.des1+'</div> </div> <div class="line"></div>'
                            var useInfo3='<div class="info-des2 user-word clearfix"> <span class="title2">'+data.data.word2+'<span class="year"></span></span> <div class="des2 pull-right"> '+data.data.des2+'</div> </div> '
                            var useInfo4 = '';
                            if(data.data.des3 != null){

                                useInfo4=' <div class="line"></div><div class="info-des3 user-word clearfix"> <span class="title3">'+data.data.word3+'<span class="year"></span></span> <div class="des3 pull-right"> '+data.data.des3+'</div> </div> </div>'
                            }



                            var useInfo=useInfo1+useInfo1a+useInfo2+useInfo3+useInfo4;

                            $(".user-information").empty().append(useInfo);
                        }
                    });
                }




                // 点击跳转事件至首页
                $("#btn-back").on("click",function () {
                    // app.router.goto(prevPage);
                    app.router.goto("voting");
                })

                $("#btn-back-detail").on("click",function () {
                    app.router.goto('voting-info');
                })


                // 点击上一页
                $("#btn-prev").on("click",function () {
                    var  nowuserid1=$(this).parents(".bg").find(".part-information").attr("data-id")//当前用户的id
                    // alert(nowuserid1-1);
                    if(nowuserid1-1<=0){
                        TurnPage(idNum);
                    }else {
                        TurnPage(nowuserid1-1);
                    }

                })

                // 点击下一页
                $("#btn-next").on("click",function () {
                    // console.log($(this).parents(".bg").find(".part-information"))
                    var  nowuserid=$(this).parents(".bg").find(".part-information").attr("data-id")//当前用户的id

                    if(parseInt(nowuserid)+1>idNum){
                        TurnPage(1);
                    }else {
                        TurnPage(parseInt(nowuserid)+1);
                    }

                });

                // 投票
                $("#btn-voting").on("click",function () {

                    $(".page-voting-tan").show()
                    $(".voting-confirm").show();
                    SureClickSuccess();
                })



                //投票确认事件
                // $hash=$post['hash'];
                // alert(wxr_hash);
                function SureClickSuccess(){
                    $(".btn-sure").on("click",function () {

                        var contestants_id=$(".part-information").attr("data-id");

                        var voters_id=wxr_openid;
                        $.ajax({
                            type: "post",
                            url: "user/save-voting-record",
                            data:{
                                "participant_id":contestants_id,
                                "voter_openid":voters_id,
                                "hash":wxr_hash,
                            },
                            success: function(data){
                                console.log(data)
                                if(data.code == 400){
                                    // alert(data.msg);
                                    $(".page-voting-tan").hide();
                                    return false;
                                }
                                else {
                                    if(data.code == 403) {
                                        $(".page-voting-tan").hide();
                                        alert("投票已結束");
                                        return false;
                                    }
                                    // alert("成功")
                                    // alert(data.msg);
                                    app.router.goto("share-vote");
                                }


                            }
                        });

                    });
                }



                //投票返回事件
                $(".btn-back").on("click",function () {
                    $(".page-voting-tan").hide();
                    $(".voting-confirm").hide();
                });

                //投票关闭
                $(".btn-close").on("click",function () {
                    $(".page-voting-tan").hide();
                });


            },

        });
        // Return the module for AMD compliance.
        return Page;
    });

