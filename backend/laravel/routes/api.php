<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApisController;
use App\Http\Controllers\AuthController;
    
    Route::group(["prefix"=> "v0.1"], function() {
        
    Route::post('login', [AuthController::class, "login"]);
    
    Route::post('register', [AuthController::class, "register"]);
    

});
