<?php
use yii\helpers\Html;

$asset = \yii\easyii\assets\EmptyAsset::register($this);
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
<div class="container">
    <?= $content ?>
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