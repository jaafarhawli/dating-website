<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApisController;
use App\Http\Controllers\AuthController;
    
Route::group(["prefix"=> "v1"], function() {
    
    Route::post('login', [AuthController::class, "login"]);
    
    Route::post('logout', [AuthController::class, "logout"]);
    
    Route::post('register', [AuthController::class, "register"]);
    
    Route::group(["middleware" => "auth:api"], function() {
        
        Route::post("/show_all", [ApisController::class, "showAll"]);

        Route::post("/show_user", [ApisController::class, "showUser"]);
        
        Route::post("/account_info", [ApisController::class, "accountInfo"]);
        
        Route::post("/like", [ApisController::class, "like"]);
        
        Route::post("/block", [ApisController::class, "block"]);
        
        Route::post("/view_likes", [ApisController::class, "viewLikes"]);
        
        Route::post("/view_chat_users", [ApisController::class, "viewChatUsers"]);
        
        Route::post("/view_chat", [ApisController::class, "viewChat"]);
        
        Route::post("/send_message", [ApisController::class, "sendMessage"]);
        
        Route::post("/settings", [ApisController::class, "settings"]);
        
        Route::post("/update_profile", [ApisController::class, "updateProfile"]);
        
        Route::post("/update_password", [ApisController::class, "updatePassword"]);
    });
}); 