<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function liked() {
        return $this->belongsToMany(User::class,'liked','liking_user_id','user_id');
    }

    public function liking() {
        return $this->belongsToMany(User::class,'liked','user_id','liking_user_id');
    }
}
