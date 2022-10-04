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

    function like(Request $request) {
        $liker_id = $request->input('user_id');
        $liked_id = $request->input('liking_user_id');
        $data = Like::where("user_id","=",$liker_id)->where("liking_user_id","=",$liked_id)->get();
        if(count($data)>0) {
            return ["success" => "operation failed"];
        }
        else {
            $row = new Like;
            $row->user_id = $liker_id;
            $row->liking_user_id = $liked_id;

            $row->save();
            if($row->save()) {
                return ["success" => $row];
            }
        }
    }

    function block(Request $request) {
        $blocker_id = $request->input('blocking_user_id');
        $blocked_id = $request->input('blocked_user_id');
        $data = Block::where("blocking_user_id","=",$blocker_id)->where("blocked_user_id","=",$blocked_id)->get();
        if(count($data)>0) {
            return ["success" => "operation failed"];
        }
        else {
            $row = new Block;
            $row->blocking_user_id = $blocker_id;
            $row->blocked_user_id = $blocked_id;

            $row->save();
            if($row->save()) {
                return ["success" => $row];
            }
        }
    }
}