<?php
$this->title = Yii::t('easyii', 'Create category');
?>
<?= $this->render('_menu', ['select' => $select, 'width' => $width, 'height' => $height]) ?>
<?= $this->render('_form', ['model' => $model, 'parent' => $parent]) ?>