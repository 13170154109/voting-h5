<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "customer".
 *
 * @property integer $id
 * @property string $openid
 * @property string $ip
 * @property string $browser
 * @property string $name
 * @property string $phone
 * @property string $email
 * @property string $coupon_code
 * @property integer $status
 * @property integer $gift
 * @property string $create_time
 */
class Customer extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'customer';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['openid', 'name', 'phone', 'email', 'create_time'], 'required'],
            [['status', 'gift'], 'integer'],
            [['openid', 'ip', 'browser', 'name', 'phone', 'email', 'coupon_code', 'create_time'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'openid' => 'Openid',
            'ip' => 'Ip',
            'browser' => 'Browser',
            'name' => 'Name',
            'phone' => 'Phone',
            'email' => 'Email',
            'coupon_code' => 'Coupon Code',
            'status' => 'Status',
            'gift' => 'Gift',
            'create_time' => 'Create Time',
        ];
    }
}
