<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tbl_store".
 *
 * @property integer $id
 * @property string $store_province
 * @property string $store_city
 * @property string $store_name
 */
class Store extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tbl_store';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['store_province', 'store_city', 'store_name'], 'required'],
            [['store_province', 'store_city'], 'string', 'max' => 20],
            [['store_name'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'store_province' => 'Store Province',
            'store_city' => 'Store City',
            'store_name' => 'Store Name',
        ];
    }
}
