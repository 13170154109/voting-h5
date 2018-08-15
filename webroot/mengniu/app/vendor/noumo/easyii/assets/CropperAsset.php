<?php
namespace yii\easyii\assets;

class CropperAsset extends \yii\web\AssetBundle
{
    public $sourcePath = '@easyii/media';

    public $css = [
        'css/plugins/cropper/cropper.min.css',
    ];
    public $js = [
        'js/plugins/cropper/cropper.min.js'
    ];

    public $depends = ['yii\web\JqueryAsset'];
}