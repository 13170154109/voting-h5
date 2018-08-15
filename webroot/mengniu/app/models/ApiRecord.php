<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tbl_api_record".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $success
 * @property string $mid
 * @property string $mtype
 * @property string $msg
 * @property integer $create_time
 */
class ApiRecord extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tbl_api_record';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'success', 'mid', 'mtype', 'msg', 'create_time'], 'required'],
            [['user_id', 'create_time' ,'success', 'mid', 'mtype'], 'integer'],
            [['msg'], 'string', 'max' => 100]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'success' => 'Success',
            'mid' => 'Mid',
            'mtype' => 'Mtype',
            'msg' => 'Msg',
            'create_time' => 'Create Time',
        ];
    }
}
