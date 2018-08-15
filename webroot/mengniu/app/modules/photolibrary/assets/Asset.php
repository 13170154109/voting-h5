<?php
namespace app\modules\photolibrary\assets;

class Asset extends \yii\web\AssetBundle
{
    public $sourcePath = '@app/modules/photolibrary/assets';
    public $css = [
        'page-photos.less',
        'widget-upload.less',
        'widget-editor.less',
    ];

    public static $modulePath = '@app/modules/photolibrary/assets';

    public static $modulePages =
        [
            'module-photolibrary-page-photos' => 'page-photos.js',
        ];

    public static $moduleWidgets =
        [
            'module-photolibrary-widget-upload' => 'widget-upload.js',
            'module-photolibrary-widget-editor' => 'widget-editor.js',
        ];



    public $js = [
        //'module.js'
    ];


    public $depends = [
        'yii\easyii\assets\AdminAsset',
        'yii\easyii\assets\LightboxAsset',
        'yii\easyii\assets\FancyboxAsset',
        'yii\easyii\assets\CropperAsset',
    ];



    public static function register ( $view ) {

        parent::register( $view );

        $js = '';
        $publishedPath = $view->assetManager->publish( self::$modulePath );


        // page
        $js .= 'window.requireModulePages = !window.requireModulePages ? {} : window.requireModulePages;';
        $js .= 'window.requireModulePageList = !window.requireModulePageList ? [] : window.requireModulePageList;';

        $modules = self::$modulePages;

        foreach ($modules as $key => $val) {
            $js .= 'window.requireModulePages["' . $publishedPath[1] . '/' . $val . '"] = "' . $key . '";';
            $js .= 'window.requireModulePageList.push("' . $publishedPath[1] . '/' . $val . '");';
        }

        // widget
        $js .= 'window.requireModuleWidgets = !window.requireModuleWidgets ? {} : window.requireModuleWidgets;';
        $js .= 'window.requireModuleWidgetList = !window.requireModuleWidgetList ? [] : window.requireModuleWidgetList;';

        $modules = self::$moduleWidgets;

        foreach ($modules as $key => $val) {
            $js .= 'window.requireModuleWidgets["' . $publishedPath[1] . '/' . $val . '"] = "' . $key . '";';
            $js .= 'window.requireModuleWidgetList.push("' . $publishedPath[1] . '/' . $val . '");';
        }

        $view->registerJs($js, \yii\web\View::POS_END);

    }









}
