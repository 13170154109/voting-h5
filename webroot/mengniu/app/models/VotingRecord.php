<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tbl_voting_record".
 *
 * @property integer $id
 * @property integer $participant_id
 * @property string $participant_name
 * @property string $participant_head_img
 * @property integer $participant_vote_count
 * @property string $voter_openid
 */
class VotingRecord extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tbl_voting_record';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['participant_id', 'voter_openid'], 'required'],
            [['participant_id'], 'integer'],
            [[ 'voter_openid'], 'string', 'max' => 200]
        ];
    }

    /**
     * @inheritdoc
     * test
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'participant_id' => 'Participant ID',
            'voter_openid' => 'Voter Openid',
        ];
    }
}
