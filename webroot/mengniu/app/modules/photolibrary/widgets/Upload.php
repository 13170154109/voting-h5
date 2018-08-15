<?php
namespace app\modules\photolibrary\widgets;

use Yii;
use yii\base\Widget;
use yii\base\InvalidConfigException;
use yii\helpers\Html;
use yii\easyii\helpers\Image;

use app\modules\photolibrary\models\Photo;


class Upload extends Widget
{
    public $model;

    public $folderSlug = '';
    public $width = 0;
    public $height = 0;

    public $attribute;


    public $simplified = false;

    public $previewThumb = true;
    public $previewWidth = '';


    public function init()
    {
        parent::init();

        if (empty($this->model)) {
            throw new InvalidConfigException('Required `model` param isn\'t set.');
        }
    }

    public function run()
    {

        $photo = Photo::find()->where(['photo_id' => $this->model->{$this->attribute}])->one();

        echo $this->render('upload', [
            'model' => $this->model,
            'attribute' => $this->attribute,
            'photo' => $photo,
            'simplified' => $this->simplified,
            'previewThumb' => $this->previewThumb,
            'previewWidth' => $this->previewWidth,
            'folderSlug' => $this->folderSlug,
            'width' => $this->width,
            'height' => $this->height,
        ]);


    }

}