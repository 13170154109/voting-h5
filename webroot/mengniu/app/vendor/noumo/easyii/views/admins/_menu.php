<?php
use yii\helpers\Url;
use yii\easyii\models\Admin;

$action = $this->context->action->id;

$ugs = Admin::userGroups();


?>
<ul class="nav nav-pills">
    <li <?= ($action === 'index') ? 'class="active"' : '' ?>>
        <a href="<?= $this->context->getReturnUrl(['/admin/admins']) ?>">
            <?php if($action === 'edit') : ?>
                <i class="glyphicon glyphicon-chevron-left font-12"></i>
            <?php endif; ?>
            <?= Yii::t('easyii', 'All') ?>
        </a>
    </li>


    <?php $i=0; ?>
    <?php foreach ($ugs as $ug)  :   ?>

    <li <?= ($action === 'group') && ($id == $i) ? 'class="active"' : '' ?>>
        <a href="/admin/admins/group/<?= $i ?>">
            <?php if($action === 'edit') : ?>
                <i class="glyphicon glyphicon-chevron-left font-12"></i>
            <?php endif; ?>
            <?= $ug ?>
        </a>
    </li>

    <?php $i++; ?>
    <?php endforeach; ?>


    <li class="pull-right" <?= ($action==='create') ? 'class="active"' : '' ?>><a href="<?= Url::to(['/admin/admins/create']) ?>"><?= Yii::t('easyii', 'Create') ?></a></li>
</ul>
<br/>
