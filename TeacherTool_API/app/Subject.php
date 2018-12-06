<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\Resource;
use PhpParser\Node\Expr\Array_;

/**
 * @property int $id
 * @property int $class_id
 * @property string $name
 * @property string $schoolyear
 * @property string $created_at
 * @property string $updated_at
 * @property Class $class
 * @property SubjectsAssessment[] $subjectsAssessments
 */
class Subject extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['class_id', 'name', 'schoolyear', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function class()
    {
        return $this->belongsTo('App\Class');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subjectsAssessments()
    {
        return $this->hasMany('App\SubjectsAssessment');
    }

}
