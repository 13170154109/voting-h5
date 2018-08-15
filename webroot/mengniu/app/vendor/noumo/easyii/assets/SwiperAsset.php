<?php
namespace yii\easyii\assets;

class SwiperAsset extends \yii\web\AssetBundle
{
    public $sourcePath = '@easyii/media';
    public $depends = ['yii\web\JqueryAsset'];

    public function init()
    {
        if (YII_DEBUG) {
            $this->js[] = 'js/plugins/swiper/swiper.jquery.js';
            $this->css[] = 'css/plugins/swiper/swiper.css';
        } else {
            $this->js[] = 'js/plugins/swiper/swiper.jquery.min.js';
            $this->css[] = 'css/plugins/swiper/swiper.min.css';
        }
    }
}