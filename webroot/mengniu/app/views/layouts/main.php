<?php
use yii\helpers\Html;

/* @var $this \yii\web\View */
/* @var $content string */

?>
<?php $this->beginPage() ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/html">
<html>

<head>
    <meta charset="utf-8">
    <meta name="HandheldFriendly" content="true" />
    <meta name="MobileOptimized" content="640" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <!--  双核浏览器默认用极速核(webkit)  -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--避免IE使用兼容模式-->
    <meta name="screen-orientation" content="portrait">
    <!--  UC强制竖屏  -->
    <meta name="x5-orientation" content="portrait" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="msapplication-tap-highlight" content="no" />
    <title>driscolls</title>
    <link type="text/css" rel="stylesheet" href="/public/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="/public/css/bootstrap-theme.min.css">
    <link type="text/css" rel="stylesheet" href="/public/css/swiper.min.css">
    <link type="text/css" rel="stylesheet" href="/public/css/main.css">

    <script type="text/javascript">
        function addViewPort() {
            var phoneWidth = parseInt(window.screen.width),
                phoneScale = phoneWidth / 640,
                ua = navigator.userAgent;
            if(/Android (\d+\.\d+)/.test(ua)) {
                var version = parseFloat(RegExp.$1);
                // andriod 2.3
                if(version > 2.3) {
                    document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
                    // andriod 2.3以上
                } else {
                    document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
                }
                // 其他系统
            } else {
                //document.write('<meta name="viewport" content="width=640, initial-scale=0.5, maximum-scale=0.5,user-scalable=no">');
                document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
            }
        }
        addViewPort();
    </script>
    <script type="text/javascript">
        var browser = {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                    weibo: u.indexOf('weibo') > -1, //是否微博
                    qq: u.indexOf('QQ') > -1, //是否QQ,
                    uc: u.indexOf('UCBrowser') > -1, //是否UC,
                    P8: u.indexOf('P8') > -1 //是否P8,
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
    </script>

</head>

<body>

<?php $this->beginBody() ?>

<?= $content ?>

<div id="footer">
    <div class="row">
        <div class="col-md-12">
            <div class="di_logo"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 di_footer">
            <div class="di_foot">
                <div class="input_footer_link">
                    <ul>
                        <a href="">
                            <li class="unique_fh">
                                发挥想象
                            </li>
                        </a>
                        <a href="">
                            <li class="unique_s">
                                联系方式
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_sx">
                                搜寻分部办公室
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_cw">
                                常问问题
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_ym">
                                隐秘协议
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_sw">
                                商务合作
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_jr">
                                加入我们
                            </li>
                        </a>
                    </ul>
                </div>
                <div class="m_footer_link">
                    <ul>
                        <a href="">
                            <li class="unique_s">
                                联系方式
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_sx">
                                搜寻分部办公室
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_cw">
                                常问问题
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_ym">
                                隐秘协议
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_sw">
                                商务合作
                            </li>
                        </a>
                        <a href="">
                            <li class="footer_jr">
                                加入我们
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>


<?php $this->endBody() ?>

</body>
</html>
<?php $this->endPage() ?>
