<?php

namespace app\controllers;
use Yii;
use yii\web\Controller;
use app\models\User;

class StoreApiController extends Controller
{

    public $enableCsrfValidation = false;

    public function actionGetUser(){

        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $date = Yii::$app->request->get('date');
        if($date){
            $start = strtotime($date.' 00:00:00');
            $end = strtotime($date.' 23:59:59');
            $user = User::find()->where("create_time BETWEEN ".$start." AND ".$end)->all();
            $result["data"] = $user;
            $result["status"] = true;
        }else{
            $result["data"] = "缺少查询日期";
            $result["status"] = false;
        }
        return $result;
    }
}
