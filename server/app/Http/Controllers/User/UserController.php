<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\SearchController;
use App\Models\Badge;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\NotificationTypes;
use App\Models\Post;
use App\Models\Status;
use App\Models\UserBadge;
use Illuminate\Http\Request;

use Illuminate\Support\Carbon;

use App\Models\User;
use App\Models\UserFollow;

class UserController extends Controller
{
    public function feed(Request $request)
    {
        $posts = Post::all();

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function profil(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid'])->load('badges')->makeHidden(['voted_posts', 'voted_comments']);

        return response()->json($user);
    }

    public function profilByUserId(Request $request, int $user_id)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $userCurrent = User::find($token['uid']);

        $user = User::find($user_id)->load('badges')->makeHidden(['voted_posts', 'voted_comments']);

        $isFollowing = UserFollow::where('follower_id', $userCurrent->id)->where('user_id', $user->id)->first();

        $user->setAttribute('following', (bool)$isFollowing);

        return response()->json($user);
    }

    public function profilPosts(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $posts = Post::where('user_id', $user->id);

        $search = new SearchController($request, $posts);

        return response()->json($search->getResults());
    }

    public function profilPostsByUserId(Request $request, int $user_id)
    {
        $user = User::findOrFail($user_id);

        $posts = Post::where('user_id', $user->id);

        $search = new SearchController($request, $posts);

        return response()->json($search->getResults());
    }

    public function profilComments(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $comments = Comment::where('user_id', $user->id);

        $search = new SearchController($request, $comments);

        return response()->json($search->getResults());
    }

    public function profilCommentsByUserId(Request $request, int $user_id)
    {
        $user = User::findOrFail($user_id);

        $comments = Comment::where('user_id', $user->id);

        $search = new SearchController($request, $comments);

        return response()->json($search->getResults());
    }

    public function list(Request $request)
    {
        $users = new SearchController($request, User::query());
        $users = $users->addWhere('username', 'LIKE', '%' . $users->getSearch() . '%');

        return true;

        // return new ResponseController::toJson($users->getResults());
    }

    public function verifyEmail(Request $request, string $token)
    {
        $token = TokenController::parseToken($token);

        $now = Carbon::parse(new \DateTimeImmutable());
        $expAt = Carbon::parse($token['exp']);
        if ($expAt->isBefore($now)) {
            return response()->json([
                'message' => 'Ce lien a expiré.'
            ], 404);
        }

        $user = User::find($token['uid']);

        $user->email_verified = true;
        $user->email_token = null;

        if ($user->save()) {
            $badgeVerify = Badge::where('name', 'Email vérifié')->first();

            UserBadge::create([
                'user_id' => $token['uid'],
                'badge_id' => $badgeVerify->id,
            ]);

            $Notify_type = NotificationTypes::where('name', 'message')->first();
            $status = Status::where('name', 'non-lu')->first();

            // Notify
            $badge_notify = new Notification();

            $badge_notify->user_id = $token['uid'];
            $badge_notify->type_id = $Notify_type->id;
            $badge_notify->text = 'Vous avez obtenu le badge ' . $badgeVerify->name . '.';
            $badge_notify->status_id = $status->id;

            $badge_notify->save();

            return response()->json([
                'message' => 'Votre adresse mail a bien été confirmée.'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function search(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $users = User::select('resource_id', 'role_id', 'status_id', 'id', 'username');

        $search = new SearchController($request, $users);
        $search->addWhere('username', "LIKE", $search->getSearch() . "%");
        $search->addWhere('id', "!=", $user->id);

        return response()->json($search->getResults());
    }
}