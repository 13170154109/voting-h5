<?php
use yii\helpers\Url;

$action = $this->context->action->id;
$module = $this->context->module->id;

$model = new $this->context->model;

$pendingCount = $model::find()->where(['status' => $model::STATUS_PENDING])->count();
$publishedCount = $model::find()->where(['status' => $model::STATUS_PUBLISHED])->count();
$deletedCount = $model::find()->where(['status' => $model::STATUS_DELETED])->count();

?>
<?php if ($action !== 'create' && $action !== 'edit' && $action !== 'carousels' && $action !== 'content-blocks' && $action !== 'related-content'): ?>
    <br/>

    <div>
        <span class="badge <?= ($action === 'index') ? 'badge-primary' : '' ?>"><a href="<?= Url::to(['/admin/'.$module.'/a/index']) ?>"><?= Yii::t('easyii', 'Published') ?> (<?=$publishedCount ?>)</a></span>
        <span class="badge <?= ($action === 'pending') ? 'badge-primary' : '' ?>"><a href="<?= Url::to(['/admin/'.$module.'/a/pending']) ?>"><?= Yii::t('easyii', 'Pending') ?> (<?=$pendingCount ?>)</a></span>
        <span class="badge <?= ($action === 'deleted') ? 'badge-primary' : '' ?>"><a href="<?= Url::to(['/admin/'.$module.'/a/deleted']) ?>"><?= Yii::t('easyii', 'Deleted') ?> (<?=$deletedCount ?>)</a></span>

        <div class="pull-right">
            <a href="<?= Url::to(['/admin/'.$module.'/a/create']) ?>"><i class="glyphicon glyphicon-plus font-12"></i> <?= Yii::t('easyii', 'Create') ?></a>
        </div>
    </div>
    <br>

<?php else: ?>
    <ul class="nav nav-pills">
        <li>
            <a href="<?= $this->context->getReturnUrl(['/admin/'.$module]) ?>"><i class="glyphicon glyphicon-chevron-left font-12"></i>Back</a>
        </li>
    </ul>
<?php endif; ?>

<br/>