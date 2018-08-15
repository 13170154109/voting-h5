<?php
use yii\bootstrap\BootstrapPluginAsset;
use yii\helpers\Html;
use app\modules\photolibrary\assets\Asset;
use yii\easyii\widgets\Fancybox;
use app\modules\photolibrary\models\Photo;
use yii\easyii\helpers\Image;
use yii\helpers\Url;



//BootstrapPluginAsset::register($this);
Fancybox::widget(['selector' => '.plugin-box']);
Asset::register($this);


$labelOptions = ['class' => 'control-label'];
$inputOptions = ['class' => 'form-control'];


$linkParams = [];

?>

<div class="module-photolibrary-widget-editor" module="module-photolibrary-widget-editor">


<script class="template" type="text/template">
<div class="module-photolibrary-widget-editor-overlay">

    <div class=""><a class="close pull-right">×</a></div>
    <div class="title"></div>
    <div class="" >
        <div class="col-md-9">
            <div class="image-crop" style="height: 500px">
                <img src="">
            </div>
        </div>
        <div class="col-md-3">

            <br>

            <div class="btn-group">
                <button type="button" class="btn btn-white zoom-in" data-method="zoom" data-option="0.1" title="Zoom In">
                    <span class="fa fa-search-plus"></span>
                </button>
                <button type="button" class="btn btn-white zoom-out" data-method="zoom" data-option="-0.1" title="Zoom Out">
                    <span class="fa fa-search-minus"></span>
                </button>
            </div>

            <div class="btn-group">
                <button type="button" class="btn btn-white rotate-left" data-method="rotate" data-option="-45" title="Rotate Left">
                    <span class="fa fa-rotate-left"></span>
                </button>
                <button type="button" class="btn btn-white rotate-right" data-method="rotate" data-option="45" title="Rotate Right">
                    <span class="fa fa-rotate-right"></span>
                </button>
            </div>

            <div class="btn-group">
                <button type="button" class="btn btn-white scale-x" data-method="scaleX" data-option="-1" title="Flip Horizontal">
                    <span class="fa fa-arrows-h"></span>
                </button>
                <button type="button" class="btn btn-white scale-y" data-method="scaleY" data-option="-1" title="Flip Vertical">
                    <span class="fa fa-arrows-v"></span>
                </button>
            </div>

            <br>
            <br>

            <div class="btn-group">
                <button type="button" class="btn btn-white reset" data-method="reset" title="Reset">
                    <span class="fa fa-refresh"></span>
                </button>

            </div>


            <div class="btn-group">
                <button type="button" class="btn btn-white move-left" data-method="move" data-option="-10" data-second-option="0" title="Move Left">
                    <span class="fa fa-arrow-left"></span>
                </button>
                <button type="button" class="btn btn-white move-right" data-method="move" data-option="10" data-second-option="0" title="Move Right">
                    <span class="fa fa-arrow-right"></span>
                </button>
                <button type="button" class="btn btn-white move-img-up" data-method="move" data-option="0" data-second-option="-10" title="Move Up">
                    <span class="fa fa-arrow-up"></span>
                </button>
                <button type="button" class="btn btn-white move-img-down" data-method="move" data-option="0" data-second-option="10" title="Move Down">
                    <span class="fa fa-arrow-down"></span>
                </button>

                <button type="button" class="btn btn-white fit" data-method="move" data-option="0" data-second-option="10" title="Fit in">
                    <span style="font-size: 10px">Fit</span>
                </button>
            </div>

            <br>
            <br>



            <div class="original-size">
                Original size: <span></span>
            </div>

            <br>



            <div class="size">
                Crop size:
                <span class="badge badge-primary" data-width="640" data-height="640">640x640</span>
                <span class="badge" data-width="1280" data-height="720">1280x720</span>
                <span class="badge" data-width="750" data-height="422">750x422</span>
                <span class="badge" data-width="375" data-height="175">375x175</span>
                <span class="badge" data-width="100" data-height="100">100x100</span><br><br>
                <span class="badge crop-free" data-width="375" data-height="175">Free</span> <input name="width" value="375" > x <input name="height" value="175">
            </div>


            <br>

            <div class="img-preview img-preview-sm"></div>


            <br><br>
            <div><input type="checkbox" name="transparent" />Transparent</div>

        </div>
    </div>
    <div class="">
        <div class="save-box col-md-9">
            <textarea class="form-control" placeholder="Description"></textarea>
            <a href="javascript:;" class="btn btn-primary save"><?= Yii::t('easyii', 'Save Description') ?></a>
        </div>

        <div class="save-box col-md-3">

            <a href="javascript:;" class="btn btn-primary crop-save"><span class="fa fa-crop"></span> <?= Yii::t('easyii', 'Crop & Save') ?></a>
            <a href="javascript:;" class="btn btn-primary crop-save-new"><span class="fa fa-crop"></span> <?= Yii::t('easyii', 'Crop & Save New') ?></a>

        </div>


    </div>
</div>
</script>

<?= Html::beginForm(Url::to(['/admin/photolibrary/photos/upload'] + $linkParams), 'post', ['enctype' => 'multipart/form-data']) ?>
<?= Html::fileInput('', null, [
    'class' => 'hidden photo-file',
    'multiple' => 'multiple',
])
?>
<?php Html::endForm() ?>

</div>

