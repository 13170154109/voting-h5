<?php

// comment out the following two lines when deployed to production
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

switch ($_SERVER['SERVER_NAME']) {
    case 'local.gymboree.com' :
        define('ENVIRONMENT', 'develop-jimmy');
        break;
    case 'local.mn-voting.com' :
        define('ENVIRONMENT', 'develop');
        break;
    case 'gymboree-uat.archisense.cn' :
        define('ENVIRONMENT', 'staging');
        break;
    case 'campaign.archisense.cn':
        define('ENVIRONMENT', 'prod');
        break;
    default:
        define('ENVIRONMENT', 'develop');
        break;

}

require(__DIR__ . '/app/vendor/autoload.php');
require(__DIR__ . '/app/vendor/yiisoft/yii2/Yii.php');

$config = require(__DIR__ . '/app/config/web.php');

(new yii\web\Application($config))->run();
