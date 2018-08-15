<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "app_products".
 *
 * @property integer $id
 * @property string $title
 * @property string $slug
 * @property string $pm
 * @property string $pm_info
 * @property string $category
 * @property string $number
 * @property string $car_number
 * @property string $car_category
 * @property string $standard
 * @property string $describe
 * @property string $price_1
 * @property string $price_2
 * @property string $price_3
 * @property string $price_4
 * @property integer $order_num
 * @property integer $status
 * @property integer $publish_time
 * @property integer $created_at
 * @property integer $updated_at
 * @property integer $created_by
 * @property integer $updated_by
 */
class AppProducts extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'app_products';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title',
                'pm', 'pm_info', 'category', 'number', 'car_number', 'car_category', 'standard', 'describe',
                'price_1', 'price_2', 'price_3', 'price_4', 'publish_time', 'created_at', 'updated_at', 'created_by', 'updated_by'
            ], 'required'],
            [['describe'], 'string'],
            [['order_num', 'status', 'publish_time', 'created_at', 'updated_at', 'created_by', 'updated_by'], 'integer'],
            [['title', 'slug', 'pm', 'pm_info', 'category', 'number', 'car_number', 'car_category', 'standard', 'price_1', 'price_2', 'price_3', 'price_4'], 'string', 'max' => 128]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'slug' => 'Slug',
            'pm' => 'Pm',
            'pm_info' => 'Pm Info',
            'category' => 'Category',
            'number' => 'Number',
            'car_number' => 'Car Number',
            'car_category' => 'Car Category',
            'standard' => 'Standard',
            'describe' => 'Describe',
            'price_1' => 'Price 1',
            'price_2' => 'Price 2',
            'price_3' => 'Price 3',
            'price_4' => 'Price 4',
            'order_num' => 'Order Num',
            'status' => 'Status',
            'publish_time' => 'Publish Time',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'created_by' => 'Created By',
            'updated_by' => 'Updated By',
        ];
    }
}
