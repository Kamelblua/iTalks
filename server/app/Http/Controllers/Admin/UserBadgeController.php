<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\NotificationTypes;
use App\Models\User;
use App\Models\Status;
use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserBadgeController extends Controller
{
    public function index($user_id, Request $request)
    {
        $badges = UserBadge::where('user_id', $user_id)->get();

        return response()->json([
            'badges' => $badges
        ]);
    }

    public function link($user_id, Request $request)
    {

        $validator = Validator::make($request->all(), [
            "badges" => "required|array"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'Impossible de lier un badge à cet utilisateur.'
            ], 404);
        }

        $errors = [];

        foreach (request('badges') as $badge) {

            $validator = Validator::make($badge, [
                "name" => 'required|exists:badges,name',
                'status' => 'required|exists:statuses,name'
            ], [
                "name.exists" => "Le badge " . $badge['name'] . "n'éxiste pas."
            ]);

            if ($validator->fails()) {
                $errors[] = $validator->errors();
                continue;
            }

            $badge = Badge::where('name', $badge['name'])->first();
            $status = Status::where('name', $badge->status)->first();

            $badgeAlreadyLinked = UserBadge::where('user_id', $user_id)
                ->where('badge_id', $badge->id)->first();

            if ($badgeAlreadyLinked) {
                $errors[] = 'Le badge "' + $badge->name + '" est déjà relié à l\'utilisateur';
            }

            $userBadge = new UserBadge();
            $userBadge->user_id = $user->id;
            $userBadge->badge_id = $badge->id;
            $userBadge->status_id = $status->id;
            $save = $userBadge->save();

            $userTarget = User::find($user->id);

            LogController::log("Le badge " . $badge->name . " vient d'être liés a " . $userTarget->username . " par " . TokenController::getUserCurrent($request)->username . ".");

            // notify
            $Notify_type = NotificationTypes::where('name', 'message')->first();
            $status = Status::where('name', 'non-lu')->first();

            // Notify Password reset
            $badge_notify = new Notification();

            $badge_notify->user_id = $user->id;
            $badge_notify->type_id = $Notify_type->id;
            $badge_notify->text = 'Vous avez obtenu le badge ' . $badge->name . '.';
            $badge_notify->status_id = $status->id;

            $badge_notify->save();

            if (!$save) {
                $errors[] = 'Une erreur s\'est produite, le badge "' + $badge->name + '" n\'a pas pu être lié, veuillez réessayer.';
            }

            if (!$user) {
                return response()->json([
                    'message' => 'L\'utilisateur n\'a pas été trouvé.',
                ], 404);
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Des erreurs sont survenues.',
                'errors' => $errors
            ], 400);
        }

        return response()->json([
            'message' => 'Les badges ont bien été liés à l\'utilisateur.'
        ], 201);
    }

    public function unlink($user_id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            "badges" => "required|array"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Mauvais format de données.'
            ], 400);
        }

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'Impossible de lier un badge à cet utilisateur.'
            ], 404);
        }

        $errors = [];

        foreach (request('badges') as $badge) {
            $validator = Validator::make($badge, [
                "badge" => 'required|exists:badges,name',
            ]);

            if ($validator->fails()) {
                $errors[] = $validator->errors();
                continue;
            }

            $badge = Badge::where('name', $badge['badge'])->first();
            $linkedBadge = UserBadge::where('user_id', $user_id)
                ->where('badge_id', $badge->id)->first();

            if (!$linkedBadge->delete()) {
                $errors[] = 'Une erreur s\'est produite, le badge "' + $badge->badge + '" n\'a pas pu être délié, veuillez réessayer.';
            }

            if (!$user) {
                return response()->json([
                    'message' => 'L\'utilisateur n\'a pas été trouvé.',
                ], 404);
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Des erreurs sont survenues.',
                'errors' => $errors
            ], 400);
        }

        LogController::log("Le badge " . $badge->name . " vient d'être déliés a " . $user->username . " par " . TokenController::getUserCurrent($request)->username . ".");

        return response()->json([
            'message' => 'Les badges ont bien été déliés.'
        ], 201);
    }
}
