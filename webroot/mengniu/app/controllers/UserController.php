<?php

namespace app\controllers;



use app\models\VotingRecord;
use Yii;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use app\models\Participants;

class UserController extends Controller
{

    public $enableCsrfValidation = false;

//获取投票列表数据(参赛者)
    public function actionGetParticipants(){
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $participants = Participants::find()->asArray()->all();
        return $participants;
    }
//获取投票排行榜数据(参赛者)
    public function actionGetLeaderboard(){
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $participants = Participants::find()->orderBy('vote_count DESC')->asArray()->all();
        return $participants;
    }

    //保存每个投票数据demo
    /*public function actionSaveVotingRecordDemo(){
        $post = Yii::$app->request->post();

        $openid = $post['openid'];

        // logic

        // end logic

        if (isset($post['openid'])) {

            $result = array();
            $result["status"] = true;
            $result["code"] = 200;
            $result["data"] = array("votecount" => 123);
            return $result;
        }
    }*/


    //保存每个投票数据
    public function actionSaveVotingRecord(){

        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();
        $participant_id = $post['participant_id'];
        $voter_openid = $post['voter_openid'];
        $hash = $post['hash'];

        if (time() >1527177600){   //   >5-25
            $result=['status' => false, 'code'=>403,'msg'=>'投票已结束!'];
            return $result;
        }else {
            if ($hash == md5($voter_openid . $_SERVER['SERVER_NAME'])) {
                $voter = VotingRecord::find()->where(['voter_openid' => $voter_openid])->one();
                if ($voter) {//该投票者已存在 不能再投票
                    $result = array('status' => false, 'code' => 400, 'msg' => '您已经投过票,不能再投票！');
                    return $result;
                } else {//新的投票者
                    $voteRecord = new VotingRecord();
                    $voteRecord->participant_id = $participant_id;//参赛者id
                    $voteRecord->voter_openid = $voter_openid;//投票人openid
                    $voteRecord->create_time = time();
                    $voteRecord->save();

                    if ($voteRecord) { //保存记录成功时
                        $participants = Participants::find()->where(['id' => $participant_id])->one();
                        $participants->vote_count += 1;
                        $participants->save();
                        $result["status"] = true;//200投票成功
                        $result["code"] = 200;//200投票成功
                        $result["msg"] = '投票成功,票数+1!';
                        return $result;
                    } else {//没有保存记录成功时
                        $result = array('status' => false, 'code' => 401, 'msg' => '记录保存失败,投票失败！');
                        return $result;
                    }
                }
            } else {
                $result["status"] = false;
                $result["code"] = 400;
                $result["msg"] = "不是正确的openID,投票失败!";
            }
        }

       return $result;

    }
    //判断用户是否参与过投票
    public function actionCheck(){

        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();
        $openid = $post['voter_openid'];
        $myVoter = $this->myVoter($openid);
        // print_r($myVoter);
        if($myVoter == 1){
            $result=['status' => false, 'code'=>400,'msg'=>'已参与过投票!'];
            return $result;

        }else{
            $result=['status' => true, 'code'=>200,'msg'=>'没有参与过投票!'];
            return $result;
        }



    }
    // 公共函数
    public function myVoter($open_id)
    {
        $voter = VotingRecord::find()->where(['voter_openid' => $open_id])->one();
        if ($voter) {//该投票者已存在
            return 1;
        } else {
            return 0;
        }
    }


    //参赛者详情
    public function actionGetParticipantDetail(){
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $post = Yii::$app->request->post();

        if (isset($post['participant_id'])) {
            $participant_detail = Participants::find()->where(['id' => $post['participant_id']])->one();
            if($participant_detail){
                $result = array();
                $result["status"] = true;
                $result["code"] = 200;
                $result["data"] = $participant_detail;
                return $result;
            }


        }

    }

    //删除某一个投票者在数据库中的记录
    public function actionDeleteAllAnne()
    {
        $votingRecord = VotingRecord::deleteAll();
        Yii::$app->db->createCommand()->update('tbl_participants', ['vote_count' => 0])->execute();
        exit;
    }


}
