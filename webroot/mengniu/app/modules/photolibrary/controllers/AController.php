<?php
namespace app\modules\photolibrary\controllers;

use Yii;
use yii\easyii\components\CategoryController;
use app\modules\photolibrary\models\Category;

use yii\easyii\behaviors\SortableModel;
use yii\widgets\ActiveForm;
use yii\web\UploadedFile;
use yii\easyii\helpers\Image;

use yii\data\ActiveDataProvider;

use app\modules\photolibrary\models\Photo;



class AController extends CategoryController
{
    public $categoryClass = 'app\modules\photolibrary\models\Category';
    public $moduleName = 'photolibrary';
    public $viewRoute = '/a/photos';

    public function actionPhotos($id)
    {
        if(!($model = Category::findOne($id))){
            return $this->redirect(['/admin/'.$this->module->id]);
        }

        $select = (Yii::$app->request->get('select', 0));
        if ($select) {
            $this->layout = "empty";
        }

        $width = Yii::$app->request->get('width', 0);
        $height = Yii::$app->request->get('height', 0);


        $where = ['class' => get_class($model), 'item_id' => $model->primaryKey];
        if ($width != 0 && $height != 0) {
            $where['width'] = $width;
            $where['height'] = $height;
        }

        $query = Photo::find()->where($where);

        $search = Yii::$app->request->get('s', "");
        if ($search != "") {
            $where['title'] = $search;

            $query->andFilterWhere(['or',
                ['like','name',$search],
                ['like','description',$search]]);

        }



        $data = new ActiveDataProvider([
            'query' => $query->sort()
        ]);


        return $this->render('photos', [
            'model' => $model,
            'select' => $select,
            'data' => $data,
            'width' => $width,
            'height' => $height
        ]);
    }


    public function actionIndex()
    {
        $select = (Yii::$app->request->get('select') == 1);
        if ($select) {
            $this->layout = "empty";
        }

        $width = Yii::$app->request->get('width', 0);
        $height = Yii::$app->request->get('height', 0);


        $folderSlug = Yii::$app->request->get('folderSlug', "");

        $cat = Category::findOne(["slug" => $folderSlug]);
        if ($cat) {
            return $this->redirect('/admin/photolibrary/a/photos/'.$cat->category_id . '?select=' . Yii::$app->request->get('select') . '&width=' .$width . '&height=' .$height  ,302);
        }


        $class = $this->categoryClass;
        return $this->render('index', [
            'cats' => $class::cats(),
            'select' => $select,
            'width' => $width,
            'height' => $height
        ]);
    }


    public function actionCreate($parent = null)
    {

        $width = Yii::$app->request->get('width', 0);
        $height = Yii::$app->request->get('height', 0);

        $class = $this->categoryClass;
        $model = new $class;

        if ($model->load(Yii::$app->request->post())) {
            if(Yii::$app->request->isAjax){
                Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                return ActiveForm::validate($model);
            }
            else{

                $model->status = $class::STATUS_ON;

                $parent = (int)Yii::$app->request->post('parent', null);
                if($parent > 0 && ($parentCategory = $class::findOne($parent))){
                    $model->order_num = $parentCategory->order_num;
                    $model->appendTo($parentCategory);
                } else {
                    $model->attachBehavior('sortable', SortableModel::className());
                    $model->makeRoot();
                }

                if(!$model->hasErrors()){
                    $this->flash('success', Yii::t('easyii', 'Category created'));
                    return $this->redirect(['/admin/'.$this->moduleName, 'id' => $model->primaryKey]);
                }
                else{
                    $this->flash('error', Yii::t('easyii', 'Create error. {0}', $model->formatErrors()));
                    return $this->refresh();
                }
            }
        }
        else {

            $select = (Yii::$app->request->get('select', 0));
            if ($select) {
                $this->layout = "empty";
            }

            return $this->render('create', [
                'model' => $model,
                'parent' => $parent,
                'select' => $select,
                'width' => $width,
                'height' => $height
            ]);
        }
    }


    public function actionEdit($id)
    {
        $class = $this->categoryClass;

        if(!($model = $class::findOne($id))){
            return $this->redirect(['/admin/' . $this->moduleName]);
        }

        if ($model->load(Yii::$app->request->post())) {
            if(Yii::$app->request->isAjax){
                Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
                return ActiveForm::validate($model);
            }
            else{

                if($model->save()){
                    $this->flash('success', Yii::t('easyii', 'Category updated'));
                }
                else{
                    $this->flash('error', Yii::t('easyii', 'Update error. {0}', $model->formatErrors()));
                }
                return $this->refresh();
            }
        }
        else {

            $select = (Yii::$app->request->get('select', 0));
            if ($select) {
                $this->layout = "empty";
            }

            return $this->render('edit', [
                'model' => $model,
                'select' => $select
            ]);
        }
    }




}