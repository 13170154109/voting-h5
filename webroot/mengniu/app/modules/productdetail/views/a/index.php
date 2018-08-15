<?php
use yii\helpers\Html;
use yii\helpers\Url;

use yii\widgets\ActiveForm;
use yii\easyii\widgets\Redactor;

$this->title = Yii::t('easyii', '产品列表');
$module = $this->context->module->id;
?>


<?= $this->render('_menu') ?>

<form method="GET" action="/admin/<?= $module ?>/a/index">
    <div class="row">

        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">产品类别</div>
                    <input type="text" class="form-control" name="category" placeholder="产品类别" value="<?= Yii::$app->request->get('category', "") ?>">
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">适配整车品牌型号</div>
                    <input type="text" class="form-control" name="car_category" placeholder="适配整车品牌型号" value="<?= Yii::$app->request->get('car_category', "") ?>">
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">产品名称</div>
                    <input type="text" class="form-control" name="title" placeholder="产品名称" value="<?= Yii::$app->request->get('title', "") ?>">
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">产品件号</div>
                    <input type="text" class="form-control" name="number" placeholder="产品件号"  value="<?= Yii::$app->request->get('number', "") ?>">
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">主机整车厂件号</div>
                    <input type="text" class="form-control" name="car_number" placeholder="主机整车厂件号" value="<?= Yii::$app->request->get('car_number', "") ?>">
                </div>
            </div>
        </div>
        <div class="col-md-2 pull-right">
            <button type="submit" class="btn btn-primary pull-right">检索</button>
        </div>
    </div>
    <div class="row">
    </div>
    </form>

<?php if ($data->count > 0) : ?>
    <table class="table table-hover">
        <thead>
        <tr>
            <th width="50">#</th>
            <th><?= Yii::t('easyii', 'Title') ?></th>
            <th width="180"><?= Yii::t('easyii', 'Publish Time') ?></th>
            <th width="120"></th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($data->models as $item) : ?>
            <tr data-id="<?= $item->primaryKey ?>">
                <td><?= $item->primaryKey ?></td>
                <td>
                    <a href="<?= Url::to(['/admin/' . $module . '/a/edit/', 'id' => $item->primaryKey]) ?>"><?= $item->title ?></a>
                </td>
                <td><?php echo Yii::$app->formatter->asDate($item->publish_time, 'yyyy-MM-dd hh:mm:ss'); ?></td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <a href="<?= Url::to(['/admin/' . $module . '/a/up', 'id' => $item->primaryKey, 'status' => $item->status]) ?>"
                           class="btn btn-default move-up" title="<?= Yii::t('easyii', 'Move up') ?>"><span
                                    class="glyphicon glyphicon-arrow-up"></span></a>
                        <a href="<?= Url::to(['/admin/' . $module . '/a/down', 'id' => $item->primaryKey, 'status' => $item->status]) ?>"
                           class="btn btn-default move-down" title="<?= Yii::t('easyii', 'Move down') ?>"><span
                                    class="glyphicon glyphicon-arrow-down"></span></a>
                    </div>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?= yii\widgets\LinkPager::widget([
        'pagination' => $data->pagination
    ]) ?>
<?php else : ?>
    <p><?= Yii::t('easyii', 'No records found') ?></p>
<?php endif; ?>