<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property int $level
 * @property int $max_level
 * @property boolean $archieved
 * @property string $created_at
 * @property string $updated_at
 * @property Student[] $students
 * @property Subject[] $subjects
 */
class Clas extends Model
{
    protected $table = 'classes';
    /**
     * @var array
     */
    protected $fillable = ['name', 'level', 'max_level','schoolyear', 'archieved', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function students()
    {
        return $this->hasMany('App\Student');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function subjects()
    {
        return $this->hasMany('App\Subject','class_id')->get();
    }
}
