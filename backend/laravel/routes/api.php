<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(["prefix"=> "v0.1"], function(){
   
    Route::group(["middleware" => "auth:api"], function(){
        Route::get("/stores", [LandingController::class, "fetchLanding"])->name("landing-user");
        Route::post("/store/{id?}", [LandingController::class, "addOrUpdateStore"])->name("add-user"); 
        Route::get("/categories/{id?}", [LandingController::class, "getCategories"])->name("landing-user");
   }); 

   Route::get("/not_found", [LandingController::class, "notFound"])->name("not-found");

});


