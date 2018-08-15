<?php

$params = require(__DIR__ . '/params.php');

$basePath =  dirname(__DIR__);
$webroot = dirname($basePath);

$config = [
    'id' => 'app',
    'basePath' => $basePath,
    'defaultRoute' => 'home',
    'bootstrap' => ['log'],
    'language' => 'en-US',
    'timeZone' => 'PRC',
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'LJnyXVTuJpe75rpn',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'errorHandler' => [
            'errorAction' => 'site/err',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
        ],
        'urlManager' => [
            'rules' => [
                // debug login
                '/debug-login' => 'site/debug-login',

                '/' => '/site/home',


                '/saveCustomer' => 'site/save',
                '/getCoupon' => 'site/coupon',
                '/getGift' => 'site/gift',

                '/checkCustomer' => 'site/check',

                '/wechat/login' => 'wechat/login',
                '/wechat/login-callback' => 'wechat/login-callback',
               '/wechat/share' => 'wechat/share',

                '/wechat/openid' => 'wechat/openid',
                '/user/upload-photo' => 'user/upload-photo',



                /*
                '<controller:\w+>/view/<slug:[\w-]+>' => '<controller>/view',
                '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
                '<controller:\w+>/cat/<slug:[\w-]+>' => '<controller>/cat',
                */
            ],
        ],
        'assetManager' => [
            // uncomment the following line if you want to auto update your assets (unix hosting only)
            //'linkAssets' => true,
            'basePath' => '@webroot/assets/yii',
            'baseUrl'=>'/assets/yii/',
            'converter'=> [
                'class'=>'singrana\assets\Converter',
            ],

            'bundles' => [

                'yii\web\JqueryAsset' => [
                    //'js' => [YII_DEBUG ? 'jquery.js' : 'jquery.min.js'],
                    'sourcePath' => '@easyii/media',
                    'js' => ['js/jquery-2.1.1.js'],
                ],
                'yii\bootstrap\BootstrapAsset' => [
                    'css' => [YII_DEBUG ? 'css/bootstrap.css' : 'css/bootstrap.min.css'],
                    //'sourcePath' => '@easyii/media',
                    //'css' => ['css/bootstrap.min.css'],
                ],
                'yii\bootstrap\BootstrapPluginAsset' => [
                    'js' => [YII_DEBUG ? 'js/bootstrap.js' : 'js/bootstrap.min.js'],
                    //'sourcePath' => '@easyii/media',
                    //'js' => ['js/bootstrap.min.js'],
                ],
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => require(__DIR__ . '/db.php'),
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = 'yii\gii\Module';
    
    $config['components']['db']['enableSchemaCache'] = false;
}

if (YII_DEBUG) {
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        'allowedIPs' => ['127.0.0.1'],
    ];

}

switch (ENVIRONMENT) {
    case "develop-jimmy":
        $config['components']['db'] = require(__DIR__ . '/db.develop-jimmy.php');
        break;
    case "develop":
        $config['components']['db'] = require(__DIR__ . '/db.develop.php');
        break;
    case "staging":
        $config['components']['db'] = require(__DIR__ . '/db.staging.php');
        break;
    case "prod":
        $config['components']['db'] = require(__DIR__ . '/db.prod.php');
        defined('YII_DEBUG') or define('YII_DEBUG', true);
        break;
    default:
        $config['components']['db'] = require(__DIR__ . '/db.php');
        break;
}

return array_merge_recursive($config, require($webroot . '/app/vendor/noumo/easyii/config/easyii.php'));
