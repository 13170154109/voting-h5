<?php
namespace app\modules\photolibrary\behaviors;

use Yii;
use yii\db\ActiveRecord;
use yii\validators\Validator;

use app\modules\photolibrary\models\Photo;
use app\modules\photolibrary\models\PhotoAssign;



class Photos extends \yii\base\Behavior
{

    public $attributes = [];

    public $rules = [];

    protected $validators = [];

    private $_name = '';



    public function events()
    {
        return [
            ActiveRecord::EVENT_AFTER_INSERT => 'afterSave',
            ActiveRecord::EVENT_AFTER_UPDATE => 'afterSave',
            ActiveRecord::EVENT_BEFORE_DELETE => 'beforeDelete',
        ];
    }



    public function afterSave()
    {





        foreach ($this->attributes as $name) {




            $check = strrpos($name, '_ids');

            // ids
            if ($check !== false && strlen($name) - $check == 4) {


                $value = $this->owner->{$name};

                $name = substr($name, 0, $check);

                if(!$this->owner->isNewRecord) {
                    PhotoAssign::deleteAll(['class' => get_class($this->owner), 'name' => $name, 'item_id' => $this->owner->primaryKey]);
                }


                $tagAssigns = [];

                $arr = explode(",", $value);




                for ($i=0; $i<count($arr); $i++ ) {

                    if (!empty($arr[$i])) {
                        $tagAssigns[] = [get_class($this->owner), $this->owner->primaryKey, $arr[$i], $name];
                    }

                }

                Yii::trace(($tagAssigns));


                if(count($tagAssigns)) {
                    Yii::$app->db->createCommand()->batchInsert(PhotoAssign::tableName(), ['class', 'item_id', 'photo_id', 'name'], $tagAssigns)->execute();
                }


            }



        }





    }

    public function beforeDelete()
    {

        foreach ($this->attributes as $name) {
            PhotoAssign::deleteAll(['class' => get_class($this->owner), 'name' => $name, 'item_id' => $this->owner->primaryKey]);
        }

    }


    public function getPhotoAssigns()
    {
        $name = $this->_name;

        return $this->owner->hasMany(PhotoAssign::className(), ['item_id' => $this->owner->primaryKey()[0]])->where(['class' => get_class($this->owner), 'name' => $name]);
    }


    public function getValues($name)
    {

        $check = strrpos($name, '_ids');

        // ids
        if ($check !== false && strlen($name) - $check == 4) {

            $this->_name = substr($name, 0, $check);

            $photos = $this->owner->hasMany(Photo::className(), ['photo_id' => 'photo_id'])->where([ ])->orderBy(['order_num' => SORT_DESC])->via('photoAssigns')->all();

            $arr = [];

            for ($i=0; $i<count($photos); $i++ ) {
                $arr[] = $photos[$i]->photo_id;
            }

            return implode(",", $arr);

        }
        else {

            $this->_name = $name;

            $photos = $this->owner->hasMany(Photo::className(), ['photo_id' => 'photo_id'])->where([ ])->orderBy(['order_num' => SORT_DESC])->via('photoAssigns')->all();

            return $photos;

        }


    }


    /**
     * @inheritdoc
     */
    public function attach($owner)
    {
        parent::attach($owner);

        $this->rules = [[$this->attributes, 'safe']];

        $validators = $owner->validators;
        foreach ($this->rules as $rule) {
            if ($rule instanceof Validator) {
                $validators->append($rule);
                $this->validators[] = $rule; // keep a reference in behavior
            } elseif (is_array($rule) && isset($rule[0], $rule[1])) { // attributes, validator type
                $validator = Validator::createValidator($rule[1], $owner, (array) $rule[0], array_slice($rule, 2));
                $validators->append($validator);
                $this->validators[] = $validator; // keep a reference in behavior
            } else {
                throw new InvalidConfigException('Invalid validation rule: a rule must specify both attribute names and validator type.');
            }
        }
    }

    /**
     * @inheritdoc
     */
    public function detach()
    {
        $ownerValidators = $this->owner->validators;
        $cleanValidators = [];
        foreach ($ownerValidators as $validator) {
            if ( ! in_array($validator, $this->validators)) {
                $cleanValidators[] = $validator;
            }
        }
        $ownerValidators->exchangeArray($cleanValidators);
    }

    /**
     * @var array Internal
     */
    protected $_attributes = [];

    /**
     * Verifies the configured virtual attributes
     * @return mixed
     */
    public function attributesNames()
    {
        if (!empty($this->_attributes))
            return $this->_attributes;

        if (!is_array($this->attributes) || empty($this->attributes))
            return null;

        $attributes = [];

        foreach ($this->attributes as $a) {
            if (!in_array($a, $this->objAttributesNames()) && !in_array($a, $attributes)) {
                $attributes[] = $a;
            }
        }

        return !empty($attributes) ? $this->_attributes = $attributes : null;
    }

    /**
     * @var array Internal
     */
    protected $_objAttributes = [];

    /**
     * Get the object's attributes / the columns of the corresponding table
     */
    public function objAttributesNames()
    {
        if (!empty($this->_objAttributes))
            return $this->_objAttributes;

        $attributes = $this->owner->attributes();

        return !empty($attributes) ? $this->_objAttributes = $attributes : null;
    }

    /**
     * @inheritdoc
     */
    public function canGetProperty($name, $checkVars = true)
    {
        return in_array($name, $this->attributesNames()) ? true : parent::canGetProperty($name, $checkVars);
    }

    /**
     * @var array Internal
     */
    protected $_attributesValues = [];

    /**
     * @inheritdoc
     */
    public function __get($name)
    {

        if (!in_array($name, $this->attributesNames())) {
            return parent::__get($name);
        }

        if (!array_key_exists($name, $this->_attributesValues)) {
            $this->_attributesValues[$name] = $this->getValues($name);
        }

        return $this->_attributesValues[$name];

    }

    /**
     * @inheritdoc
     */
    public function canSetProperty($name, $checkVars = true)
    {
        return in_array($name, $this->attributesNames()) ? true : parent::canSetProperty($name, $checkVars);
    }

    /**
     * @inheritdoc
     */
    public function __set($name, $value)
    {
        if (in_array($name, $this->attributesNames())) {
            $this->_attributesValues[$name] = $value;
        } else {
            parent::__set($name, $value);
        }
    }



}