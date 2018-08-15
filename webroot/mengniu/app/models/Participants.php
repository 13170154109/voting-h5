<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tbl_participants".
 *
 * @property integer $id
 * @property string $head_img_url
 * @property string $name
 * @property integer $vote_count
 */
class Participants extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tbl_participants';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['head_img_url', 'name', 'vote_count'], 'required'],
            [['vote_count'], 'integer'],
            [['head_img_url'], 'string', 'max' => 200],
            [['name'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'head_img_url' => 'Head Img Url',
            'name' => 'Name',
            'vote_count' => 'Vote Count',
        ];
    }
}
