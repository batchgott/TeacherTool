<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $table
 * @property string $created_at
 * @property string $updated_at
 * @property Performance[] $performances
 * @property SubjectsAssessment[] $subjectsAssessments
 */
class Assessment extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['name', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function performances()
    {
        return $this->hasMany('App\Performance');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subjectsAssessments()
    {
        return $this->hasMany('App\SubjectsAssessment');
    }
}
