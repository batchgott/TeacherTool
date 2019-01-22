<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $class_id
 * @property string $firstname
 * @property string $lastname
 * @property string $created_at
 * @property string $updated_at
 * @property Class $class
 * @property Performance[] $performances
 */
class Student extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['class_id', 'firstname', 'lastname', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function class()
    {
        return $this->belongsTo('App\Clas');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function performances()
    {
        return $this->hasMany('App\Performance');
    }
}
