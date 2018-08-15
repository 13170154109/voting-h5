<?php
use yii\bootstrap\BootstrapPluginAsset;
use yii\helpers\Html;
use app\modules\photolibrary\assets\Asset;
use yii\easyii\widgets\Fancybox;
use app\modules\photolibrary\models\Photo;
use yii\easyii\helpers\Image;

BootstrapPluginAsset::register($this);
Fancybox::widget(['selector' => '.plugin-box']);
Asset::register($this);


$labelOptions = ['class' => 'control-label'];
$inputOptions = ['class' => 'form-control'];
?>

<div class="module-photolibrary-widget-upload" module="module-photolibrary-widget-upload" module-data='{"width": <?= $width ?>, "height": <?= $height ?>, "folderSlug" : "<?= $folderSlug ?>"}'>

<div class="form-group">
    <?= Html::activeHiddenInput($model, $attribute, $inputOptions) ?>
    (<?= $width ?>x<?= $height ?>)
    <div class="thumb-preview" data-previewWidth="<?=$previewWidth ?>" data-previewThumb="<?= ($previewThumb) ? 'true' : 'false' ?>" ><?php if ($photo): ?><a href="<?= $photo->image ?>" class="plugin-box" title="<?= $photo->description ?>" rel="easyii-photos"><img <?= ($previewWidth == '') ? '' : 'width="'.$previewWidth.'"' ?> src="<?= ($previewThumb) ? Image::thumb($photo->image, Photo::PHOTO_THUMB_WIDTH, Photo::PHOTO_THUMB_HEIGHT) : $photo->image ?>"></a><?php endif; ?></div>
    <br>
    <button class="photo-widget-upload btn btn-sm btn-success"><span class="glyphicon glyphicon-arrow-up"></span> <?php if (!$simplified) : ?><?= Yii::t('easyii', 'Upload')?><?php endif; ?></button>
    <button class="photo-widget-select btn btn-sm btn-primary" data-width="<?= $width ?>" data-height="<?= $height ?>" data-folderSlug="<?= $folderSlug ?>"><span class="glyphicon glyphicon-picture"></span> <?php if (!$simplified) : ?><?= Yii::t('easyii', 'Library')?><?php endif; ?></button>
    <button class="photo-widget-delete btn btn-sm btn-default color-red " style="height:31px"><span class="glyphicon glyphicon-remove"></span></button>

</div>


</div>

