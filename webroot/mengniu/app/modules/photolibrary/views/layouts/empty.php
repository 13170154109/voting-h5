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
    <?= Html::csrfMetaTags() ?>
    <title><?= Yii::t('easyii', 'Control Panel') ?> - <?= Html::encode($this->title) ?></title>
    <link rel="shortcut icon" href="<?= $asset->baseUrl ?>/favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?= $asset->baseUrl ?>/favicon.ico" type="image/x-icon">
    <?php $this->head() ?>
</head>
<body class="gray-bg">
<?php $this->beginBody() ?>
<div id="wrapper">


    <div class="row wrapper border-bottom white-bg page-heading" style="margin-top: 20px; padding-left:25px;">
        <div class="col-lg-10">
            <h2><?= $this->title ?></h2>
        </div>
    </div>


    <div class="row" style="margin-top: 20px; margin-left: 15px; margin-right: 15px;">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">

                <div class="ibox-content" style="min-height: 600px">

                    <?php foreach (Yii::$app->session->getAllFlashes() as $key => $message) : ?>
                        <div class="alert alert-<?= $key ?>"><?= $message ?></div>
                    <?php endforeach; ?>
                    <?= $content ?>
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
