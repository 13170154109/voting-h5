<?php

use yii\easyii\helpers\Image;

use yii\helpers\Html;
use yii\helpers\Url;
use app\modules\photolibrary\models\Photo;

use app\modules\photolibrary\assets\Asset;

use app\modules\photolibrary\widgets\Editor;

use app\modules\photolibrary\widgets\Upload;



Asset::register($this);


$select = (Yii::$app->request->get('select') == 1);


$class = get_class($model);
$item_id = $model->primaryKey;

$linkParams = [
    'class' => $class,
    'item_id' => $item_id,
];


$this->title = Yii::$app->getModule('admin')->activeModules[$this->context->module->id]->title . ' / ' . $model->title;
?>

<?= $this->render('_menu', ['select' => $select, 'width' => $width, 'height' => $height]) ?>


<div class="module-photolibrary-page-photos" module="module-photolibrary-page-photos" data-class="<?= $class ?>" data-item_id="<?= $item_id ?>" module-data='{"width": <?= $width ?>, "height": <?= $height ?>, "folderSlug" : "<?= $model->slug ?>"}'>


    <div>

    <button class="upload btn btn-sm btn-success pull-right"><span class="glyphicon glyphicon-arrow-up"></span><?= Yii::t('easyii', 'Upload')?></button>

        <form method="GET" action="/admin/photolibrary/a/photos/<?= $item_id ?>">
    <div class="search-group input-group pull-right col-lg-3 col-sm-3">

        <input type="text" class="form-control" placeholder="Search" name="s" value="<?= Yii::$app->request->get('s', "") ?>">
        <input type="hidden" class="form-control" name="select" value="<?= $select ?>">
        <input type="hidden" class="form-control" name="width" value="<?= $width ?>">
        <input type="hidden" class="form-control" name="height" value="<?= $height ?>">
      <span class="input-group-btn">
        <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
      </span>

    </div>
        </form>


    <div class="size">
        <span class="badge <?= ($width == 0 && $height == 0) ? "badge-primary" : ""  ?>"><a href="/admin/photolibrary/a/photos/<?= $item_id ?>?select=<?= $select ?>&width=0&height=0">All</a></span>
        <span class="badge <?= ($width == 640 && $height == 640) ? "badge-primary" : ""  ?>"><a href="/admin/photolibrary/a/photos/<?= $item_id ?>?select=<?= $select ?>&width=640&height=640">640x640</a></span>
        <span class="badge <?= ($width == 1280 && $height == 720) ? "badge-primary" : ""  ?>"><a href="/admin/photolibrary/a/photos/<?= $item_id ?>?select=<?= $select ?>&width=1280&height=720">1280x720</a></span>
        <span class="badge <?= ($width == 375 && $height == 175) ? "badge-primary" : ""  ?>"><a href="/admin/photolibrary/a/photos/<?= $item_id ?>?select=<?= $select ?>&width=375&height=175">375x175</a></span>
        <span class="badge <?= ($width == 100 && $height == 100) ? "badge-primary" : ""  ?>"><a href="/admin/photolibrary/a/photos/<?= $item_id ?>?select=<?= $select ?>&width=100&height=100">100x100</a></span>
    </div>

        <div class="clearfix" />


    </div>






    <div class="container-fluid col-lg-12">
        <?php $date = ""; $idx=0; ?>
        <?php foreach($data->models as $item) : ?>
            <?php if ($date != Yii::$app->formatter->asDate($item->created_at, 'yyyy-MM-dd')): ?>
                <?php $date = Yii::$app->formatter->asDate($item->created_at, 'yyyy-MM-dd'); ?>
                <div class="date"><?php echo $date; ?></div>
            <?php endif; ?>

            <?php $datetime = Yii::$app->formatter->asDate($item->created_at, 'yyyy-MM-dd HH:mm:ss'); ?>

            <div class="thumb-container">
                <a href="<?= $item->image ?>" title="<?= $item->name ?>" data-index="<?= $idx ?>" data-datetime="<?= $datetime ?>" data-name="<?= $item->name ?>" data-width="<?= $item->width ?>" data-height="<?= $item->height ?>" data-id="<?= $item->primaryKey ?>" data-image="<?= $item->image ?>" data-thumb="<?= Image::thumb($item->image, Photo::PHOTO_THUMB_WIDTH, Photo::PHOTO_THUMB_HEIGHT) ?>" data-description="<?= $item->description ?>"><img class="photo-thumb" src="<?= Image::thumb($item->image, Photo::PHOTO_THUMB_WIDTH, Photo::PHOTO_THUMB_HEIGHT) ?>"></a>
                <?php if ($select): ?>
                    <button data-name="<?= $item->name ?>" data-width="<?= $item->width ?>" data-height="<?= $item->height ?>" data-id="<?= $item->primaryKey ?>" data-image="<?= $item->image ?>" data-thumb="<?= Image::thumb($item->image, Photo::PHOTO_THUMB_WIDTH, Photo::PHOTO_THUMB_HEIGHT) ?>" data-description="<?= $item->description ?>" title="<?= Yii::t('easyii', 'Select') ?>" class="btn select-sm btn-primary"><span class="glyphicon glyphicon-ok-circle"></span></button>
                <?php endif; ?>
                <div title="<?= $item->name ?>" class="thumb-name"><?= $item->name ?></div>
                <div class="thumb-size"><?= $item->width ?>x<?= $item->height ?></div>
            </div>
            <?php $idx++; ?>
        <?php endforeach; ?>
    </div>




    <?= yii\widgets\LinkPager::widget([
        'pagination' => $data->pagination
    ]) ?>



    <div class="gallery blueimp-gallery blueimp-gallery-controls">
        <div class="slides"></div>
        <h3 class="title"></h3>
        <span class="size"></span>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <a class="play-pause"></a>
        <ol class="indicator"></ol>

        <?php if ($select): ?>
            <a href="javascript:;" class="btn btn-sm btn-primary select"><span class="glyphicon glyphicon-ok-circle"></span> <?= Yii::t('easyii', 'Select') ?></a>
        <?php endif; ?>
        <a href="#edit-panel" class="btn btn-sm btn-success edit"><span class="fa fa-crop"></span> <?= Yii::t('easyii', 'Edit') ?></a>

    </div>



    <?= Editor::widget([]) ?>
</div>