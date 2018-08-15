<?php
namespace app\modules\productdetail\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\SluggableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\behaviors\BlameableBehavior;
use yii\easyii\behaviors\Taggable;
use yii\helpers\StringHelper;

use app\modules\seo\behaviors\SeoBehavior;
//use app\modules\carousel\behaviors\CarouselBehavior;
use yii\easyii\behaviors\SortableModel;

use app\modules\contentselector\behaviors\Contents;

use app\modules\photolibrary\behaviors\Photos;


class ProductDetail extends \yii\easyii\components\ActiveRecord
{
    const STATUS_PENDING = 0;
    const STATUS_PUBLISHED = 1;
    const STATUS_DELETED = 2;

    public static function tableName()
    {
        return 'app_products';
    }

    public function rules()
    {
        return [
            [['title'], 'required'],
            [['title',
                'pm', 'pm_info', 'category', 'number', 'car_number', 'car_category', 'standard', 'describe',
                'price_1', 'price_2', 'price_3', 'price_4', 'publish_time', 'created_at', 'updated_at', 'created_by', 'updated_by'
            ], 'trim'],
            [['describe'], 'string'],
            [['order_num', 'status', 'publish_time', 'created_at', 'updated_at', 'created_by', 'updated_by'], 'integer'],
            [['title', 'slug', 'pm', 'pm_info', 'category', 'number', 'car_number', 'car_category', 'standard', 'price_1', 'price_2', 'price_3', 'price_4'], 'string', 'max' => 128],

            [['order_num', 'status'], 'integer'],
            ['publish_time', 'default', 'value' => time()],
            ['slug', 'match', 'pattern' => self::$SLUG_PATTERN, 'message' => Yii::t('easyii', 'Slug can contain only 0-9, a-z and "-" characters (max: 128).')],
            ['slug', 'default', 'value' => null],
            ['slug', 'unique'],
            ['status', 'default', 'value' => self::STATUS_PENDING],
            ['preview', 'safe'],
            ['preview', 'default', 'value' => 0],
        ];
    }

    public function attributeLabels()
    {
        return [
            'title' => Yii::t('easyii', 'Title'),
            'text' => Yii::t('easyii', 'Text'),
            'slug' => Yii::t('easyii', 'Slug'),
            'publish_time' => Yii::t('easyii', 'Publish Time'),
            'thumbnail_ids' => Yii::t('easyii', 'Thumbnail'),
        ];
    }

    public function behaviors()
    {
        return [
//            'seoBehavior' => SeoBehavior::className(),
//            'carouselBehavior' => CarouselBehavior::className(),
            'sluggable' => [
                'class' => SluggableBehavior::className(),
                'attribute' => 'title',
                'ensureUnique' => true,
                'immutable' => true
            ],
            'sortable' => SortableModel::className(),
            'timestamp' => [
                'class' => TimestampBehavior::className(),
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                ]
            ],
            'blame' => [
                'class' => BlameableBehavior::className(),
                'createdByAttribute' => 'created_by',
                'updatedByAttribute' => 'updated_by',
            ],

            'photos' => [
                'class' => Photos::className(),
                'attributes' => [
                    'image','image_ids',
                    'gallery1','gallery1_ids',
                    'gallery2','gallery2_ids',
                    'gallery3','gallery3_ids',

                ]
            ],
        ];
    }

    public static function statusName($status)
    {
        $states = self::states();
        return !empty($states[$status]) ? $states[$status] : $status;
    }

    public static function states()
    {
        return [
            self::STATUS_PENDING => Yii::t('easyii', 'Pending'),
            self::STATUS_PUBLISHED => Yii::t('easyii', 'Published'),
            self::STATUS_DELETED => Yii::t('easyii', 'Deleted'),
        ];
    }

    protected $_preview = 0;

    public function getPreview() {
        return $this->_preview;
    }

    public function setPreview($value)
    {
        $this->_preview = $value;
    }

}