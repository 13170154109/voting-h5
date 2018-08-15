<?php
namespace yii\easyii\assets;

class AdminAsset extends \yii\web\AssetBundle
{
    public $sourcePath = '@easyii/media';
    public $css = [
        'font-awesome/css/font-awesome.css',
        'css/plugins/morris/morris-0.4.3.min.css',
        'css/animate.css',
        'css/style.css',

        'css/admin.css',
    ];
    public $js = [



        'js/plugins/metisMenu/jquery.metisMenu.js',
        'js/plugins/slimscroll/jquery.slimscroll.min.js',

        'js/plugins/flot/jquery.flot.js',
        'js/plugins/flot/jquery.flot.tooltip.min.js',
        'js/plugins/flot/jquery.flot.spline.js',
        'js/plugins/flot/jquery.flot.resize.js',
        'js/plugins/flot/jquery.flot.pie.js',

        'js/plugins/peity/jquery.peity.min.js',


        'js/inspinia.js',

        'js/plugins/pace/pace.min.js',
        'js/plugins/jquery-ui/jquery-ui.min.js',
        'js/plugins/gritter/jquery.gritter.min.js',
        'js/plugins/sparkline/jquery.sparkline.min.js',

        'js/plugins/chartJs/Chart.min.js',
        'js/plugins/toastr/toastr.min.js',

        'js/admin/admin.js',


    ];
    public $depends = [




        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
        'yii\easyii\assets\SwitcherAsset',
    ];
    public $jsOptions = array(
        'position' => \yii\web\View::POS_END
    );
}



/*
 *
 * <script data-main="/assets/js/app/config/config" src="/assets/js/app/vendor/base/require.js"></script>

 *
 */

