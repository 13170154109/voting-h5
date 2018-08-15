<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;

class WechatController extends Controller
{
    public $enableCsrfValidation = false;

    public $appid = "wx6e812cbbb9f23cc3";
    public $secret = "c4263674a065a5283539e0d56dbf1e75";

    public function actionLogin()
    {
        $appid = $this->appid;
        $callback = urlencode("http://".$_SERVER['HTTP_HOST']."/wechat/login-callback");

        $redirect = $_GET["redirect"];

        Yii::$app->session['redirect'] = $redirect;
        $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$callback.'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';

        header("Location:".$url);
        exit;
    }

    public function actionLoginCallback()
    {
        $redirect = Yii::$app->session['redirect'];
        $appid = $this->appid;
        $secret = $this->secret;
        $code = $_GET["code"];
        $get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$get_token_url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        $res = curl_exec($ch);
        curl_close($ch);
        $json_obj = json_decode($res,true);

        $check = strpos($redirect, '?');
        if($check !== false)
        {
            $new_redirect = $redirect."&openid=".urlencode($json_obj['openid']);
        }
        else
        {
            $new_redirect = $redirect."?openid=".urlencode($json_obj['openid']);
        }
        header("Location:".$new_redirect);
        exit;
    }
}
