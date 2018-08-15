<?php
//引入模块
use yii\easyii\widgets\DateTimePicker;
use yii\easyii\helpers\Image;
use yii\easyii\widgets\TagsInput;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\ActiveForm;
use yii\easyii\widgets\Redactor;
//use app\modules\seo\widgets\Form;
use app\modules\photolibrary\widgets\Upload;

//定义变量
$module = $this->context->module->id;
$states = $model->states();
?>

<!--表单内容起始位置-->
<?php $form = ActiveForm::begin([
    'enableAjaxValidation' => true,
    'options' => ['enctype' => 'multipart/form-data', 'class' => 'model-form']
]); ?>

<!--添加标题模块-->

<div class="row">
    <div class="col-lg-6 col-md-6"><?= $form->field($model, 'title')->label('产品名称') ?></div>
    <div class="col-lg-6 col-md-6"><?= $form->field($model, 'slug')->label('产品标识 Slug') ?></div>
</div>


<!--添加状态模块-->
<div class="row">
    <div class="col-lg-6 col-md-6">
        <?= $form->field($model, 'status')->dropDownList($states)->label('产品状态')?>
    </div>
    <div class="col-lg-6 col-md-6">
        <?= $form->field($model, 'publish_time')->label('发布时间')->widget(DateTimePicker::className()); ?>
    </div>
</div>
<!--添加时间线模块-->
<div class="row">
    <div class="col-lg-6 col-md-6">
        <?= $form->field($model, 'updated_at')->widget(DateTimePicker::className(), ['disabled' => 'disabled']); ?>
    </div>
    <div class="col-lg-6 col-md-6">
        <?= $form->field($model, 'created_at')->widget(DateTimePicker::className(), ['disabled' => 'disabled']); ?>
    </div>
</div>

<!--添加产品模块-->

<div class="row">
    <div class="col-lg-12 col-md-12"><?= $form->field($model, 'pm')->label('产品经理') ?></div>
    <div class="col-lg-12 col-md-12"><?= $form->field($model, 'pm_info')->label('产品特色') ?></div>
</div>

<div class="row">
    <div class="col-lg-6 col-md-6"><?= $form->field($model, 'category')->label('产品类型') ?></div>
    <div class="col-lg-6 col-md-6"><?= $form->field($model, 'number') ->label('产品件号') ?></div>
</div>


<div class="row">
    <div class="col-lg-6 col-md-6"><?= $form->field($model, 'car_number') ->label('主机整车厂件号') ?></div>
    <div class="col-lg-6 col-md-6"><?= $form->field($model, 'car_category') ->label('适配整车品牌型号') ?></div>
</div>


<div class="row">
    <div class="col-lg-12 col-md-12"> <?= $form->field($model, 'standard') ->label('产品标准') ?> </div>
</div>


<div class="row">
    <div class="col-lg-3 col-md-3"><?= $form->field($model, 'price_1') ->label('产品价格 A档') ?></div>
    <div class="col-lg-3 col-md-3"><?= $form->field($model, 'price_2') ->label('产品价格 B档') ?></div>
    <div class="col-lg-3 col-md-3"><?= $form->field($model, 'price_3') ->label('产品价格 C档') ?></div>
    <div class="col-lg-3 col-md-3"><?= $form->field($model, 'price_4') ->label('产品价格 D档') ?></div>
</div>


<!--添加产品描述模块-->
<?= $form->field($model, 'describe')->label('产品描述')->widget(Redactor::className(), [
    'options' => [
        'minHeight' => 200,
        'imageUpload' => Url::to(['/admin/redactor/upload', 'dir' => 'edm'], false),
        'fileUpload' => Url::to(['/admin/redactor/upload', 'dir' => 'edm'], false),
        'plugins' => ['fullscreen']
    ]
]) ?>

<div class="row">
    <!--添加产品标准图片模块-->
    <div class="col-lg-3 col-md-3">
        <?= $form->field($model, 'image_ids')->label('产品标准图')->widget(Upload::className(), ['folderSlug' => 'product', 'previewThumb' => false, 'previewWidth' => '100%', 'width' => 100, 'height' => 100]) ?>
    </div>
    <!--添加产品轮播图上传模块-->
    <div class="col-lg-3 col-md-3">
        <?= $form->field($model, 'gallery1_ids')->label('产品轮播图1')->widget(Upload::className(), ['folderSlug' => 'product', 'previewThumb' => false, 'previewWidth' => '100%', 'width' => 375, 'height' => 175]) ?>
    </div>
    <div class="col-lg-3 col-md-3">
        <?= $form->field($model, 'gallery2_ids')->label('产品轮播图2')->widget(Upload::className(), ['folderSlug' => 'product', 'previewThumb' => false, 'previewWidth' => '100%', 'width' => 375, 'height' => 175]) ?>
    </div>
    <div class="col-lg-3 col-md-3">
        <?= $form->field($model, 'gallery3_ids')->label('产品轮播图3')->widget(Upload::className(), ['folderSlug' => 'product', 'previewThumb' => false, 'previewWidth' => '100%', 'width' => 375, 'height' => 175]) ?>
    </div>

</div>


<!--添加表单提交模块-->
<?= Html::submitButton(Yii::t('easyii', 'Save'), ['class' => 'btn btn-primary']) ?>

<!--结束表单内容-->
<?php ActiveForm::end(); ?>

<?= app\modules\photolibrary\widgets\Editor::widget([]) ?>
