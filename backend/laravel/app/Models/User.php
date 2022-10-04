<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function liked() {
        return $this->belongsToMany(User::class,'likes','liking_user_id','user_id');
    }

    public function liking() {
        return $this->belongsToMany(User::class,'likes','user_id','liking_user_id');
    }

    public function blocking() {
        return $this->belongsToMany(User::class,'blocks','blocking_user_id','blocked_user_id');
    }

    public function blocked() {
        return $this->belongsToMany(User::class,'blocks','blocked_user_id','blocking_user_id');
    }

    public function sent() {
        return $this->belongsToMany(User::class,'chats','sender_user_id','sent_to_user_id');
    }

    public function received() {
        return $this->belongsToMany(User::class,'chats','sent_to_user_id','sender_user_id');
    }
}
