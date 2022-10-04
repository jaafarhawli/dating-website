<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Like;
use App\Models\Block;
use App\Models\Chat;

class ApisController extends Controller
{   
    function showNearby(Request $request) {
        $loc = $request->input('location');
        $prefered = $request->input('preferedGender');
        $id = $request->input('id');

        $users = User::where(["location" => $loc,"gender" => $prefered])->whereNotIn('id', function ($blocked) use($id) {
            $blocked->select("blocked_user_id")->from('blocks')->where('blocking_user_id',$id);
        })->whereNotIn('id', function($blockedBy) use($id) {
            $blockedBy->select("blocking_user_id")->from('blocks')->where('blocked_user_id',$id);
        })->get();
        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);     
    }

    function showRest(Request $request) {
        $loc = $request->input('location');
        $prefered = $request->input('preferedGender');
        $id = $request->input('id');
        $users= User::where("location","!=",$loc)->where("gender","=",$prefered)->whereNotIn('id', function ($blocked) use($id) {
            $blocked->select("blocked_user_id")->from('blocks')->where('blocking_user_id',$id);
        })->whereNotIn('id', function($blockedBy) use($id) {
            $blockedBy->select("blocking_user_id")->from('blocks')->where('blocked_user_id',$id);
        })->get();
        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);    
    }

    function showUser(Request $id) {
        $user_id = $id->input('id');
        $data = User::select("name","location","gender","prefered_gender","bio","profile_url")->where("id", $user_id)->get();
        return response()->json([
            "status" => "Success",
            "data" => $data
        ]);
    }
}