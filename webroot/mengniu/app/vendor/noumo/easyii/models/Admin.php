<?php
namespace yii\easyii\models;

use Yii;

class Admin extends \yii\easyii\components\ActiveRecord implements \yii\web\IdentityInterface
{


    const USER_GROUP_0 = 0;
    const USER_GROUP_1 = 1;
    const USER_GROUP_2 = 2;


    const STATUS_OFF = 0;
    const STATUS_ON = 1;




    static $rootUser = [
        'admin_id' => 0,
        'username' => 'root',
        'password' => '',
        'auth_key' => '',
        'access_token' => ''
    ];

    public static function tableName()
    {
        return 'easyii_admins';
    }

    public function rules()
    {
        return [
            ['username', 'required'],
            ['username', 'unique'],
            ['password', 'required', 'on' => 'create'],
            ['password', 'safe'],
            ['access_token', 'default', 'value' => null],
            ['user_group', 'integer'],
            ['user_group', 'default', 'value' => self::USER_GROUP_0],
            ['admin_access', 'integer'],
            ['admin_access', 'default', 'value' => self::STATUS_OFF],
        ];
    }

    public function attributeLabels()
    {
        return [
            'username' => Yii::t('easyii', 'Username'),
            'password' => Yii::t('easyii', 'Password'),
        ];
    }

    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord) {
                $this->auth_key = $this->generateAuthKey();
                $this->password = $this->hashPassword($this->password);
            } else {
                $this->password = $this->password != '' ? $this->hashPassword($this->password) : $this->oldAttributes['password'];
            }
            return true;
        } else {
            return false;
        }
    }

    public static function findIdentity($id)
    {
        $result = null;
        try {
            $result = $id == self::$rootUser['admin_id']
                ? static::createRootUser()
                : static::findOne($id);
        } catch (\yii\base\InvalidConfigException $e) {
        }
        return $result;
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public static function findByUsername($username)
    {
        if ($username === self::$rootUser['username']) {
            return static::createRootUser();
        }
        return static::findOne(['username' => $username]);
    }

    public function getId()
    {
        return $this->admin_id;
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password)
    {
        return $this->password === $this->hashPassword($password);
    }

    private function hashPassword($password)
    {
        return sha1($password . $this->getAuthKey() . Setting::get('password_salt'));
    }

    private function generateAuthKey()
    {
        return Yii::$app->security->generateRandomString();
    }

    public static function createRootUser()
    {
        return new static(array_merge(self::$rootUser, [
            'password' => Setting::get('root_password'),
            'auth_key' => Setting::get('root_auth_key')
        ]));
    }

    public function isRoot()
    {
        return $this->username === self::$rootUser['username'];
    }

    public static function userGroups()
    {
        return [
            self::USER_GROUP_0 => Yii::t('easyii', 'Marketing'),
            self::USER_GROUP_1 => Yii::t('easyii', 'Vendor'),
            self::USER_GROUP_2 => Yii::t('easyii', 'Admin'),
        ];
    }

    public static function states()
    {
        return [
            self::STATUS_OFF => Yii::t('easyii', 'No'),
            self::STATUS_ON => Yii::t('easyii', 'Yes'),
        ];
    }


}
