<?php
namespace yii\easyii\assets;

class LightboxAsset extends \yii\web\AssetBundle
{
    public $sourcePath = '@easyii/media';

    public $css = [
        'css/plugins/blueimp/css/blueimp-gallery.min.css',
    ];
    public $js = [
        'js/plugins/blueimp/jquery.blueimp-gallery.min.js'
    ];

    public $depends = ['yii\web\JqueryAsset'];
}