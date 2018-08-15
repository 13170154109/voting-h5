<?php
namespace app\modules\photolibrary;

class PhotoLibraryModule extends \yii\easyii\components\Module
{
    public $settings = [
        'isShowOnSideBar' => true,
        'isSecondLevel' => false,
        'categoryThumb' => true,
        'itemsInFolder' => false,
    ];

    public static $installConfig = [
        'title' => [
            'en' => 'Photo Gallery',
            'ru' => 'Фотогалерея',
        ],
        'icon' => 'camera',
        'order_num' => 90,
    ];
}