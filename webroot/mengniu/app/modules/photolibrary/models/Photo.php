<?php
namespace app\modules\photolibrary\models;

use Yii;
use yii\db\ActiveRecord;
use yii\easyii\behaviors\SortableModel;

use yii\behaviors\TimestampBehavior;
use yii\behaviors\BlameableBehavior;



class Photo extends \yii\easyii\components\ActiveRecord
{
    const PHOTO_MAX_WIDTH = 1900;
    const PHOTO_THUMB_WIDTH = 120;
    const PHOTO_THUMB_HEIGHT = 90;

    public static function tableName()
    {
        return 'app_photos';
    }

    public function rules()
    {
        return [
            [['class', 'item_id'], 'required'],
            ['item_id', 'integer'],
            ['image', 'image'],
            ['description', 'trim']
        ];
    }

    public function behaviors()
    {
        return [
            SortableModel::className(),
            'timestamp' => [
                'class' => TimestampBehavior::className(),
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                ]
            ],
            'blame' => [
                'class' => BlameableBehavior::className(),
                'createdByAttribute' => 'created_by',
                'updatedByAttribute' => 'updated_by',
            ],
        ];
    }

    public function afterDelete()
    {
        parent::afterDelete();

        @unlink(Yii::getAlias('@webroot').$this->image);
    }


    public function getCategory()
    {
        return $this->hasOne(Category::className(), ['category_id' => 'category_id']);
    }

}