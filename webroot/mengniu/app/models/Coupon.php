<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "coupon".
 *
 * @property integer $id
 * @property string $code
 * @property integer $status
 * @property string $geolocation
 * @property integer $create_time
 * @property integer $receive_time
 */
class Coupon extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'coupon';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['code', 'create_time'], 'required'],
            [['status', 'create_time', 'receive_time'], 'integer'],
            [['code'], 'string', 'max' => 9],
            [['geolocation'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'code' => 'Code',
            'status' => 'Status',
            'geolocation' => 'Geolocation',
            'create_time' => 'Create Time',
            'receive_time' => 'Receive Time',
        ];
    }
}
