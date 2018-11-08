<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    protected $fillable=['name','picture_url','user_id'];


    public function user(){
        return $this->belongsTo('App/User');
    }
}
