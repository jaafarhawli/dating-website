<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Like;
use App\Models\Block;
use App\Models\Chat;

class ApisController extends Controller
{   
    // Show all users that that have the prefered gender of the logged in user and aren't blocking/blocked by him and are not private
    function showAll(Request $request) {
        $prefered = $request->preferedGender;
        $id = $request->input('id');

        $users = User::where(["gender" => $prefered])
        ->whereNotIn('id', function ($blocked) use($id) {
            $blocked->select("blocked_user_id")
            ->from('blocks')
            ->where('blocking_user_id',$id);
        })
        ->whereNotIn('id', function($blockedBy) use($id) {
            $blockedBy->select("blocking_user_id")
            ->from('blocks')
            ->where('blocked_user_id',$id);
        })
        ->whereNotIn('id', function($private) {
            $private->select('id')
            ->from('users')
            ->where('private_account', '=', 'Yes');
        })
        ->whereNotIn('id', function($private) use($id) {
            $private->select('id')
            ->from('users')
            ->where('id', '=', $id);
        })
        ->get();

        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }


    // Return user info from user id to display in user modal
    function showUser(Request $id) {
        $user_id = $id->input('id');
        $data = User::where("id", $user_id)
        ->get(["id","name","location","gender","prefered_gender","bio","profile_url","longitude","latitude"]);

        return response()->json([
            "status" => "Success",
            "data" => $data
        ]);
    }

    // Return account info from email
    function accountInfo(Request $request) {
        $email = $request->input('email');

        $data = User::where("email", $email)
        ->get();

        return response()->json([
            "status" => "Success",
            "data" => $data
        ]);
    }

    // Add user to liked list
    function like(Request $request) {
        $liker_id = $request->input('user_id');
        $liked_id = $request->input('liking_user_id');

        $data = Like::where("user_id","=",$liker_id)
        ->where("liking_user_id","=",$liked_id)
        ->get();

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

    // Add user to blocked list
    function block(Request $request) {
        $blocker_id = $request->input('blocking_user_id');
        $blocked_id = $request->input('blocked_user_id');

        $data = Block::where("blocking_user_id","=",$blocker_id)
        ->where("blocked_user_id","=",$blocked_id)
        ->get();

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

    // View all users on liked list except blocked users
    function viewLikes (Request $request) {
        $liker_id = $request->input('user_id');

        $users = User::select('users.id','users.name','users.location','users.profile_url')
        ->join('likes', 'users.id', '=', 'likes.liking_user_id')
        ->where('likes.user_id','=',$liker_id)
        ->whereNotIn('users.id', function ($blocked) use($liker_id) {
            $blocked->select("blocked_user_id")
            ->from('blocks')
            ->where('blocking_user_id',$liker_id);
        })
        ->whereNotIn('users.id', function($blockedBy) use($liker_id) {
            $blockedBy->select("blocking_user_id")
            ->from('blocks')
            ->where('blocked_user_id',$liker_id);
        })
        ->get();

        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);  
    }

    // View all users where the logged in user sent to or received messages from, except blocked users
    function viewChatUsers(Request $request) {
        $user_id = $request->input('user_id');

        $usersSent = User::select('users.id','users.name','users.profile_url')
        ->distinct()
        ->join('chats', 'users.id', '=', 'chats.sent_to_user_id')
        ->where(function($query) use($user_id) {
            $query->where('chats.sender_user_id','=',$user_id)
            ->orWhere('chats.sent_to_user_id','=',$user_id);
        })
        ->whereNotIn('users.id', [$user_id])
        ->whereNotIn('users.id', function ($blocked) use($user_id) {
            $blocked->select("blocked_user_id")
            ->from('blocks')
            ->where('blocking_user_id',$user_id);
        })
        ->whereNotIn('users.id', function($blockedBy) use($user_id) {
            $blockedBy->select("blocking_user_id")
            ->from('blocks')
            ->where('blocked_user_id',$user_id);
        })
        ->get();
        
        $usersReceived = User::select('users.id','users.name','users.profile_url')
        ->distinct()
        ->join('chats', 'users.id', '=', 'chats.sender_user_id')
        ->where(function($query) use($user_id) {
            $query->where('chats.sender_user_id','=',$user_id)
            ->orWhere('chats.sent_to_user_id','=',$user_id);
        })
        ->whereNotIn('users.id', [$user_id])
        ->whereNotIn('users.id', function ($blocked) use($user_id) {
            $blocked->select("blocked_user_id")
            ->from('blocks')
            ->where('blocking_user_id',$user_id);
        })
        ->whereNotIn('users.id', function($blockedBy) use($user_id) {
            $blockedBy->select("blocking_user_id")
            ->from('blocks')
            ->where('blocked_user_id',$user_id);
        })
        ->get();

        $usersAll = $usersSent->merge($usersReceived);

        return response()->json([
            "status" => "Success",
            "data" => $usersAll
        ]);  
    }

    // View chat messages with selected user
    function viewChaT(Request $request) {
        $user_id = $request->input('user_id');
        $chatter_id = $request->input('chatter_id');

        $messages = Chat::select('message','sender_user_id')
        ->where(function($query) use($user_id, $chatter_id) {
            $query->where('sender_user_id','=',$user_id)
            ->where('sent_to_user_id','=',$chatter_id);
        })
        ->orWhere(function($query) use($user_id, $chatter_id) {
            $query->where('sender_user_id','=',$chatter_id)
            ->where('sent_to_user_id','=',$user_id);
        })
        ->orderby('date')-> get();

        return response()->json([
            "status" => "Success",
            "data" => $messages
        ]);  
    }

    // Send a message to selected user
    function sendMessage(Request $request) {
        $date = date('Y-m-d h:i:s');
        $sender = $request->input('user_id');
        $receiver = $request->input('chatter_id');
        $message = $request->input('message');

        $row = new Chat; 
        $row->sender_user_id = $sender;
        $row->sent_to_user_id = $receiver;
        $row->message = $message;
        $row->date = $date;

        $row->save();
        if($row->save()) {
            return ["success" => $row];
        }
    }

    // Update profile info
    function settings(Request $request) {
        $id = $request->input('id');
        $newName = $request->input('name');
        $oldEmail = $request->input('oldEmail');
        $newEmail = $request->input('email');
        $newLocation = $request->input('location');
        $newBio = $request->input('bio');
        $privateAccount = $request->input('private');
        $email = User::where('email','=',$newEmail)->get();
        if($newEmail=='' || $newEmail==$oldEmail) {
            User::where('id',$id)
            ->update(['name' => $newName, 'email' => $oldEmail, 'location' => $newLocation, 'private_account' => $privateAccount, 'bio' => $newBio]);

            return ["success" => "operation succeeded"];
        }
        else if(count($email)>0) {
            return ["success" => "operation failed"];
        }
        else {
            User::where('id',$id)
            ->update(['name' => $newName, 'email' => $newEmail, 'location' => $newLocation, 'private_account' => $privateAccount, 'bio' => $newBio]);
            
            return ["success" => "operation succeeded"];
        }
    }

    function updatePassword(Request $request) {
        $id = $request->input('id');
        $password = $request->input('password');
        $hashed = bcrypt($password);

        User::where('id', $id)
        ->update(['password'=>$hashed]);

        return ["success" => "operation succeeded"];
    }

    function updateProfile(Request $request) {
        $base64Image = $request->input('profilePicture');
        $user = $request->input('id');
    
        $dir = $_SERVER['DOCUMENT_ROOT'] . "/images/" . $user;
        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }
    
        $base64String = explode(",", $base64Image)[1];
         // $imageExtention is the original extendtion of the image
        $extra1 = explode(",", $base64Image)[0];
        $extra2 = explode(";", $extra1)[0];
        $imageExtention = explode("/", $extra2)[1];
         
         // The path to save the image in
         $imageName = $dir . "/" . uniqid('') . "." . $imageExtention;
         // $data is the Data of the image after decoding
         $data = base64_decode($base64String);
         // Bind the decoded data to an image
         $success = file_put_contents($imageName, $data);
         $url = str_replace("P:/Programs/XAMPP/htdocs", "http://localhost", $imageName);
         
         User::where('id', '=', $user)->update(['profile_url' => $url]);
    
        return response()->json([
            "status" => "Success",
            "url" => $url
        ]);  
    } 
}
        
    




    
