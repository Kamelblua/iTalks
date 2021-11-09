<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Status;

class NotificationController extends Controller {

    public function getNotification ()
    {
        $notify = Notification::all();

        return response()->json([
            "Notify" => $notify
        ], 200);
    }

    public function seen (int $id) {

        $notify = Notification::find($id);

        if (!$notify) {
            return response()->json([
                'message' => 'La notification n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'lu')->first();

        $notify->status_id = $status->id;

        if ($notify->save()) {
            return response()->json([
                'message' => 'La notification a était mis à jour avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function DeleteNotification (int $id) {

        $notify = Notification::find($id);

        if (!$notify) {
            return response()->json([
                'message' => 'La notification n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'supprimé')->first();

        $notify->status_id = $status->id;

        if ($notify->save()) {
            return response()->json([
                'message' => 'La notification supprimé avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

}
