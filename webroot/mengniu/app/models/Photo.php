<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tbl_photo".
 *
 * @property integer $id
 * @property string $uid
 * @property string $img_div
 * @property integer $create_time
 */
class Photo extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tbl_photo';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['uid', 'img_div', 'create_time'], 'required'],
            [['img_div'], 'string'],
            [['create_time'], 'integer'],
            [['uid'], 'string', 'max' => 100]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'uid' => 'Uid',
            'img_div' => 'Img Div',
            'create_time' => 'Create Time',
        ];
    }
}
