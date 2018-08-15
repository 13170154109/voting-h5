<?php

$this->title = $model->title;
?>

<?= $this->render('_menu') ?>
<?= $this->render('_submenu', ['model' => $model]) ?>