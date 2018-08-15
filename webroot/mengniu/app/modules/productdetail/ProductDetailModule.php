<?php
namespace app\modules\productdetail;

class ProductDetailModule extends \yii\easyii\components\Module
{
    public $settings = [
        'isShowOnSideBar' => true,
        'isSecondLevel' => false,
    ];

    public static $installConfig = [
        'title' => [
            'en' => 'News',
            'ru' => 'Новости',
        ],
        'icon' => 'bullhorn',
        'order_num' => 70,
    ];
}