<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApisController;
use App\Http\Controllers\AuthController;
    
    Route::group(["prefix"=> "v0.1"], function() {
        
    Route::post('login', [AuthController::class, "login"]);
    
    Route::post('register', [AuthController::class, "register"]);
    
    Route::group(["middleware" => "auth:api"], function() {

        Route::post("/show_nearby", [ApisController::class, "showNearby"]);

        Route::post("/show_rest", [ApisController::class, "showRest"]);

        Route::post("/show_user", [ApisController::class, "showUser"]);

        Route::post("/like", [ApisController::class, "like"]);

    });

});

