<?php
namespace app\modules\photolibrary\models;

use app\modules\photolibrary\models\Photo;

class Category extends \yii\easyii\components\CategoryModel
{
    public static function tableName()
    {
        return 'app_photo_categories';
    }

    public function getPhotos()
    {
        return $this->hasMany(Photo::className(), ['item_id' => 'category_id'])->where(['class' => self::className()])->sort();
    }

    public function afterDelete()
    {
        parent::afterDelete();

        foreach($this->getPhotos()->all() as $photo){
            $photo->delete();
        }
    }
}