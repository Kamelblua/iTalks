<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\SearchController;
use App\Models\Category;
use App\Models\CategoryFollow;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\UserFollow;
use Illuminate\Support\Facades\DB;
use Validator;

class FollowController extends Controller
{
    public function getFollowersOf(Request $request, int $user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvé.',
            ], 404);
        }

        $follows = UserFollow::where('follower_id', $user->id)->latest();

        $followsClone = clone ($follows);
        $users = [];

        foreach ($followsClone->get() as $follow) {
            array_push($users, User::find($follow->user_id));
        }

        $search = new SearchController($request, $follows);

        $search->replaceItems($users);

        return response()->json($search->getResults());
    }

    public function getFollowingsOf(Request $request, int $user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvé.',
            ], 404);
        }

        $followings = $user->followings->append('following')->toArray();

        return response()->json([
            'followings' => $followings
        ]);
    }

    public function follow(Request $request, int $following_id)
    {
        $validator = Validator::make($request->all(), [
            'type' => ['required', 'regex:/(^user$)|(^category$)/'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        };

        $token = TokenController::parseToken($request->cookie('token'));
        $follower = User::find($token['uid']);
        $following = request('type') === "user" ? User::findOrFail($following_id) : Category::findOrFail($following_id);

        $follow = DB::table(request('type') . '_follows')->where('follower_id', $token["uid"])->where(request('type') . '_id', $following_id)->first();

        if ($follow) {
            return response()->json([
                'message' => 'Vous suivez déjà ' . ($following->username ?? 'la catégorie ' . $following->name) . '.',
            ], 400);
        }

        if (request('type') === "user") {
            $follow = $this->newUserFollow($follower, $following);
        } else {
            $follow = $this->newCategoryFollow($follower, $following);
        }

        if ($follow) {
            LogController::log("L'utilisateur' " . $following->name . " vient de suivre " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Vous suivez maintenant ' . ($following->username ?? 'la catégorie ' . $following->name) . '.',
            ], 200);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    private function newUserFollow(User $follower, User $following)
    {
        $follow = UserFollow::create([
            'follower_id' => $follower->id,
            "user_id" => $following->id,
            'has_notifications' => false
        ]);

        return $follow;
    }

    private function newCategoryFollow(User $follower, Category $following)
    {
        $follow = CategoryFollow::create([
            'follower_id' => $follower->id,
            "category_id" => $following->id,
            'has_notifications' => false
        ]);

        return $follow;
    }

    public function unfollow(Request $request, int $following_id)
    {
        $validator = Validator::make($request->all(), [
            'type' => ['required', 'regex:/(^user$)|(^category$)/'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        };

        $token = TokenController::parseToken($request->cookie('token'));
        $following = request('type') === "user" ? User::findOrFail($following_id) : Category::findOrFail($following_id);

        if (request('type') === 'user') {
            $follow = UserFollow::where('follower_id', $token["uid"])->where('user_id', $following_id)->first();
        } else {
            $follow = CategoryFollow::where('follower_id', $token["uid"])->where('category_id', $following_id)->first();
        }

        if (!$follow) {
            return response()->json([
                'message' => 'Vous ne suivez pas ' . ($following->username ?? 'la catégorie ' . $following->name) . '.',
            ], 400);
        }

        if ($follow->delete()) {
            LogController::log("L'utilisateur' " . $following->name . " suis plus " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Vous ne suivez plus ' . ($following->username ?? 'la catégorie ' . $following->name) . '.',
            ], 200);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}