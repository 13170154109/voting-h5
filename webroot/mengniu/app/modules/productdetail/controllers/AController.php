<?php
namespace app\modules\productdetail\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\easyii\behaviors\SortableController;
use yii\widgets\ActiveForm;
use yii\web\UploadedFile;

use yii\easyii\components\Controller;
use app\modules\productdetail\models\ProductDetail;
use yii\easyii\helpers\Image;
use yii\easyii\behaviors\StatusController;

use yii\helpers\Url;

class AController extends Controller
{
    public function behaviors()
    {
        return [
            [
                'class' => SortableController::className(),
                'model' => ProductDetail::className(),
            ],
            [
                'class' => StatusController::className(),
                'model' => ProductDetail::className()
            ]
        ];
    }

    public function actionIndex()
    {
        $query = ProductDetail::find()->where(['status' => ProductDetail::STATUS_PUBLISHED]);

        $title = Yii::$app->request->get('title', "");
        $number = Yii::$app->request->get('number', "");
        $category = Yii::$app->request->get('category', "");
        $car_number = Yii::$app->request->get('car_number', "");
        $car_category = Yii::$app->request->get('car_category', "");

        if ($title != "") { $query->andFilterWhere(['like', 'title', $title]); }
        if ($number != "") { $query->andFilterWhere(['like', 'number', $number]); }
        if ($category != "") { $query->andFilterWhere(['like', 'category', $category]); }
        if ($car_number != "") { $query->andFilterWhere(['like', 'car_number', $car_number]); }
        if ($car_category != "") { $query->andFilterWhere(['like', 'car_category', $car_category]); }

        $data = new ActiveDataProvider([ 'query' => $query->sort(),  ]);

        $this->setReturnUrl(Url::current());

        return $this->render('index', [  'data' => $data, ]);
    }

    public function actionPending()
    {
        $data = new ActiveDataProvider([
            'query' => ProductDetail::find()->where(['status' => ProductDetail::STATUS_PENDING])->sort(),
        ]);

        $this->setReturnUrl(Url::current());

        return $this->render('index', [
            'data' => $data
        ]);
    }

    public function actionDeleted()
    {
        $data = new ActiveDataProvider([
            'query' => ProductDetail::find()->where(['status' => ProductDetail::STATUS_DELETED])->sort(),
        ]);

        $this->setReturnUrl(Url::current());

        return $this->render('index', [
            'data' => $data
        ]);
    }

    public function actionCreate()
    {
        $model = new ProductDetail;
        $model->status = ProductDetail::STATUS_PENDING;

        if ($model->load(Yii::$app->request->post())) {
            if(Yii::$app->request->isAjax){
                Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                return ActiveForm::validate($model);
            }
            else{

                if($model->save()){
                    $this->flash('success', Yii::t('easyii', 'Created'));
                    return $this->redirect(['/admin/'.$this->module->id . '/a/edit/'. $model->id]);
                }
                else{
                    $this->flash('error', Yii::t('easyii', 'Create error. {0}', $model->formatErrors()));
                    return $this->refresh();
                }
            }
        }
        else {
            return $this->render('create', [
                'model' => $model
            ]);
        }
    }

    public function actionEdit($id)
    {
        $model = ProductDetail::findOne($id);

        if($model === null){
            $this->flash('error', Yii::t('easyii', 'Not found'));
            return $this->redirect(['/admin/'.$this->module->id]);
        }

        if ($model->load(Yii::$app->request->post())) {
            if(Yii::$app->request->isAjax){
                Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                return ActiveForm::validate($model);
            }
            else{

                if($model->save()){
                    $this->flash('success', Yii::t('easyii', 'Updated'));
                }
                else{
                    $this->flash('error', Yii::t('easyii', 'Update error. {0}', $model->formatErrors()));
                }
                return $this->refresh();
            }
        }
        else {
            return $this->render('edit', [
                'model' => $model
            ]);
        }
    }

    public function actionContentBlocks($id, $lang='en')
    {
        if(!($model = ProductDetail::findOne($id))){
            return $this->redirect(['/admin/'.$this->module->id]);
        }

        return $this->render('content_blocks', [
            'model' => $model,
            'lang' => $lang,
        ]);
    }


    public function actionDelete($id)
    {
        if(($model = ProductDetail::findOne($id))){
            $model->delete();
        } else {
            $this->error = Yii::t('easyii', 'Not found');
        }
        return $this->formatResponse(Yii::t('easyii', 'Deleted'));
    }

    public function actionClearImage($id)
    {
        $model = ProductDetail::findOne($id);

        if($model === null){
            $this->flash('error', Yii::t('easyii', 'Not found'));
        }
        else{
            $model->image = '';
            if($model->update()){
                @unlink(Yii::getAlias('@webroot').$model->image);
                $this->flash('success', Yii::t('easyii', 'Image cleared'));
            } else {
                $this->flash('error', Yii::t('easyii', 'Update error. {0}', $model->formatErrors()));
            }
        }
        return $this->back();
    }

    public function actionUp($id)
    {
        $status = Yii::$app->request->get('status');
        return $this->move($id, 'up', ['status' => $status]);
    }

    public function actionDown($id)
    {
        $status = Yii::$app->request->get('status');
        return $this->move($id, 'down', ['status' => $status]);
    }


}