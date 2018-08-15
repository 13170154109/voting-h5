<?php
    use yii\helpers\Html;
    use yii\widgets\ActiveForm;



?>
<?php $form = ActiveForm::begin(['enableAjaxValidation' => true]); ?>
<?= $form->field($model, 'username')->textInput($this->context->action->id === 'edit' ? ['disabled' => 'disabled'] : []) ?>
<?= $form->field($model, 'password')->passwordInput(['value' => '']) ?>

<?= $form->field($model, 'user_group')->dropDownList($model->userGroups()) ?>

<?= $form->field($model, 'admin_access')->dropDownList($model->states()) ?>

<?= Html::submitButton(Yii::t('easyii', 'Save'), ['class' => 'btn btn-primary']) ?>
<?php ActiveForm::end(); ?>