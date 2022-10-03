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

    public function blocking() {
        return $this->belongsToMany(User::class,'blocked','blocking_user_id','blocked_user_id');
    }

    public function blocked() {
        return $this->belongsToMany(User::class,'blocked','blocked_user_id','blocking_user_id');
    }

    public function sent() {
        return $this->belongsToMany(User::class,'chat','sender_user_id','sent_to_user_id');
    }

    public function received() {
        return $this->belongsToMany(User::class,'chat','sent_to_user_id','sender_user_id');
    }

    
}
