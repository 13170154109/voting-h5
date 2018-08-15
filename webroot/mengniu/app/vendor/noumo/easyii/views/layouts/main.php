<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\easyii\assets\AdminAsset;

$asset = AdminAsset::register($this);
$moduleName = $this->context->module->id;
?>
<?php $this->beginPage() ?>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?= Html::csrfMetaTags() ?>
    <title><?= Yii::t('easyii', 'Control Panel') ?> - <?= Html::encode($this->title) ?></title>
    <link rel="shortcut icon" href="<?= $asset->baseUrl ?>/favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?= $asset->baseUrl ?>/favicon.ico" type="image/x-icon">
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>



<div id="wrapper">
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element"> <span>
                            <img alt="image" src="<?= $asset->baseUrl ?>/img/logo_blank.gif" />
                             </span>
                    </div>
                    <div class="logo-element">
                        LAB
                    </div>

                </li>

                <?php

                    $firstLevels = [];
                    $i = -1;


                    foreach(Yii::$app->getModule('admin')->activeModules as $module) {

                        $isShowOnSideBar = (isset($module->settings['isShowOnSideBar']) && $module->settings['isShowOnSideBar'] === true) ? true : false;
                        $isSecondLevel = (isset($module->settings['isSecondLevel']) && $module->settings['isSecondLevel'] === true) ? true : false;

                        if ($isShowOnSideBar) {
                            if ($i == -1 || !$isSecondLevel) {

                                $firstLevels[] = ['name' => $module->name, 'title' => $module->title, 'icon' => $module->icon, 'secondLevels' => [['name' => $module->name, 'title' => $module->title, 'url' => Url::to(["/admin/$module->name"])]]];
                                $i++;
                            }
                            else {
                                $firstLevels[$i]['secondLevels'][] = ['name' => $module->name, 'title' => $module->title, 'url' => Url::to(["/admin/$module->name"])];
                            }

                        }

                    }


                ?>


                <?php foreach($firstLevels as $fl) : ?>


                <?php if(count($fl['secondLevels']) == 1) : ?>
                <li class="<?= ($moduleName == $fl['secondLevels'][0]['name'] ? 'active' : '') ?>">
                    <a href="<?= $fl['secondLevels'][0]['url'] ?>"><?php if($fl['icon'] != '') : ?><i class="glyphicon glyphicon-<?= $fl['icon'] ?>"></i><?php endif; ?> <span class="nav-label"><?= $fl['title'] ?></span></a>
                </li>
                <?php endif; ?>
                <?php if(count($fl['secondLevels']) > 1) : ?>

                <?php
                $class = "";
                foreach($fl['secondLevels'] as $sl) {
                    if ($moduleName == $sl['name']) {
                        $class = "active";
                    }
                }
                ?>

                <li class="<?= $class ?>">
                    <a href="javascript:;" ><?php if($fl['icon'] != '') : ?><i class="glyphicon glyphicon-<?= $fl['icon'] ?>"></i><?php endif; ?> <span class="nav-label"><?= $fl['title'] ?></span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">

                        <?php foreach($fl['secondLevels'] as $sl) : ?>
                        <li class="<?= ($moduleName == $sl['name'] ? 'active' : '') ?>"><a href="<?= $sl['url'] ?>"><?= $sl['title'] ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </li>
                <?php endif; ?>





                <?php endforeach; ?>


                <?php if(IS_ROOT) : ?>
                <li>
                    <a href="javascript:;"><i class="glyphicon glyphicon-cog"></i> <span class="nav-label"><?= Yii::t('easyii', 'Settings') ?></span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li><a href="<?= Url::to(['/admin/settings']) ?>"><?= Yii::t('easyii', 'Settings') ?></a></li>
                        <li><a href="<?= Url::to(['/admin/modules']) ?>"><?= Yii::t('easyii', 'Modules') ?></a></li>
                        <li><a href="<?= Url::to(['/admin/admins']) ?>"><?= Yii::t('easyii', 'Admins') ?></a></li>
                        <li><a href="<?= Url::to(['/admin/system']) ?>"><?= Yii::t('easyii', 'System') ?></a></li>
                        <li><a href="<?= Url::to(['/admin/logs']) ?>"><?= Yii::t('easyii', 'Logs') ?></a></li>
                    </ul>
                </li>
                <?php endif; ?>



            </ul>

        </div>
    </nav>

    <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                </div>
                <ul class="nav navbar-top-links navbar-right">

                    <li>
                        <span class="m-r-sm text-muted welcome-message">Welcome, <?= Yii::$app->user->identity->username; ?> </span>
                    </li>

                    <!--
                    <li class="dropdown">
                        <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                            <i class="fa fa-envelope"></i>  <span class="label label-warning">16</span>
                        </a>
                        <ul class="dropdown-menu dropdown-messages">
                            <li>
                                <div class="dropdown-messages-box">
                                    <a href="profile.html" class="pull-left">
                                        <img alt="image" class="img-circle" src="<?= $asset->baseUrl ?>/img/logo.gif">
                                    </a>
                                    <div class="media-body">
                                        <small class="pull-right">46h ago</small>
                                        <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br>
                                        <small class="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                                    </div>
                                </div>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <div class="dropdown-messages-box">
                                    <a href="profile.html" class="pull-left">
                                        <img alt="image" class="img-circle" src="<?= $asset->baseUrl ?>/img/logo.gif">
                                    </a>
                                    <div class="media-body ">
                                        <small class="pull-right text-navy">5h ago</small>
                                        <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                                        <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                    </div>
                                </div>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <div class="dropdown-messages-box">
                                    <a href="profile.html" class="pull-left">
                                        <img alt="image" class="img-circle" src="<?= $asset->baseUrl ?>/img/logo.gif">
                                    </a>
                                    <div class="media-body ">
                                        <small class="pull-right">23h ago</small>
                                        <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br>
                                        <small class="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                                    </div>
                                </div>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <div class="text-center link-block">
                                    <a href="mailbox.html">
                                        <i class="fa fa-envelope"></i> <strong>Read All Messages</strong>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                            <i class="fa fa-bell"></i>  <span class="label label-primary">8</span>
                        </a>
                        <ul class="dropdown-menu dropdown-alerts">
                            <li>
                                <a href="mailbox.html">
                                    <div>
                                        <i class="fa fa-envelope fa-fw"></i> You have 16 messages
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="profile.html">
                                    <div>
                                        <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                        <span class="pull-right text-muted small">12 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="grid_options.html">
                                    <div>
                                        <i class="fa fa-upload fa-fw"></i> Server Rebooted
                                        <span class="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <div class="text-center link-block">
                                    <a href="notifications.html">
                                        <strong>See All Alerts</strong>
                                        <i class="fa fa-angle-right"></i>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    -->


                    <li>
                        <a href="<?= Url::to(['/admin/sign/out']) ?>">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>

            </nav>
        </div>


        <div class="container-fluid">
            <?php foreach(Yii::$app->session->getAllFlashes() as $key => $message) : ?>
                <div class="alert alert-<?= $key ?>"><?= $message ?></div>
            <?php endforeach; ?>
            <?php Yii::$app->session->removeAllFlashes(); ?>
        </div>



        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2><?= $this->title ?></h2>
                <!--<ol class="breadcrumb">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a>xxx</a>
                    </li>
                    <li class="active">
                        <strong>xxx</strong>
                    </li>
                </ol>-->
            </div>
            <div class="col-lg-2">

            </div>
        </div>


        <div class="row" style="margin-top: 20px; margin-left: 0px; margin-right: 0px;" >
            <div class="col-lg-12">
                <div class="ibox float-e-margins">

                    <div class="ibox-content module-<?= $moduleName ?>" style="min-height: 600px">
                        <?= $content ?>
                    </div>
                </div>
            </div>
        </div>




    </div>
</div>




<?php $this->endBody() ?>

<?php $publishedPath = $this->assetManager->publish( '@easyii/media' ); ?>
<script type="text/javascript">
    var require = {
        baseUrl: "<?= $publishedPath[1] ?>/js/admin/"
    };
</script>
<script data-main="<?= $publishedPath[1] ?>/js/admin/config/config.js" src="<?= $publishedPath[1] ?>/js/admin/vendor/base/require.js"></script>


</body>
</html>
<?php $this->endPage() ?>
