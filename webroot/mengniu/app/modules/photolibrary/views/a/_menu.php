<?php
use yii\helpers\Url;

$action = $this->context->action->id;
?>
<ul class="nav nav-pills">

    <?php if ($action === 'index'): ?>
        <li class="pull-right"><a href="<?= Url::to(['/admin/'.$this->context->moduleName.'/a/create', 'select'=>$select]) ?>"><i class="glyphicon glyphicon-plus font-12"></i> <?= Yii::t('easyii', 'Create Folder') ?></a></li>
    <?php endif; ?>

    <?php if ($action !== 'index'): ?>

        <li >
            <a href="<?= "/admin/photolibrary/a/index?select=" . $select . "&width=" . $width . "&height=" . $height ?>">
                <i class="glyphicon glyphicon-chevron-left font-12"></i>
                <?= Yii::t('easyii', 'Back') ?>
            </a>
        </li>

    <?php endif; ?>


</ul>


<br/>