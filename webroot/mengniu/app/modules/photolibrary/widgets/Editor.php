<?php
namespace app\modules\photolibrary\widgets;

use Yii;
use yii\base\Widget;
use yii\base\InvalidConfigException;
use yii\helpers\Html;
use yii\easyii\helpers\Image;

use app\modules\photolibrary\models\Photo;


class Editor extends Widget
{


    public function init()
    {
        parent::init();


    }

    public function run()
    {

        echo $this->render('editor', []);


    }

}