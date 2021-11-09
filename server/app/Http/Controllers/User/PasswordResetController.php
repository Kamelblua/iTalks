<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\TokenController;

use App\Models\Notification;
use App\Models\NotificationTypes;
use App\Models\Status;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use App\Models\PasswordReset;

use App\Mail\TemplateMail;

use Illuminate\Support\Facades\Mail;

use Carbon\Carbon;
use DateTimeImmutable;

class PasswordResetController extends Controller
{
    public function reset(Request $request, string $email_address)
    {
        $user = User::where('email', $email_address)->firstOrFail();

        $password_reset = PasswordReset::where('user_id', $user->id)->first();

        if ($password_reset) {
            return response()->json([
                'message' => 'Une requête de réinitialisation est déjà en cours.'
            ], 403);
        }

        $password_reset = new PasswordReset();

        $passwordResetToken = TokenController::generatePasswordResetToken($user);

        $password_reset->user_id = $user->id;
        $password_reset->token = $passwordResetToken->toString();

        if ($password_reset->save()) {
            Mail::to($email_address)->send(
                new TemplateMail([
                    'user' => $user,
                    'token' => $passwordResetToken->toString(),
                    'subject' => 'Réinitialisation du mot de passe',
                    'reason' => 'user.password_reset',
                ])
            );

            $Notify_type = NotificationTypes::where('name', 'message')->first();
            $status = Status::where('name', 'non-lu')->first();

            // Notify Password reset
            $password_reset_notify = new Notification();

            $password_reset_notify->user_id = $user->id;
            $password_reset_notify->type_id = $Notify_type->id;
            $password_reset_notify->text = 'Vous avez fait une demande de réinitialisation de votre mot de passe.';
            $password_reset_notify->status_id = $status->id;

            $password_reset_notify->save();

            LogController::log("L'utilisateur " . $user->username . " vient de réinstialisé son mot de passe.");

            return response()->json([
                'message' => 'Un email a été envoyé à l\'adresse indiquée.'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function confirm(Request $request, string $token)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $password_reset = PasswordReset::where('token', $token)->firstOrFail();
        $token = TokenController::parseToken($password_reset->token);

        $now = Carbon::parse(new DateTimeImmutable());
        $expAt = Carbon::parse($token['exp']);
        if ($expAt->isBefore($now)) {
            return response()->json([
                'message' => 'Ce lien a expiré.'
            ], 404);
        }

        $user = User::find($token['uid']);

        $user->password = Hash::make(request('password'));

        if ($user->save()) {
            LogController::log("L'utilisateur " . $user->username . " vient de mettre à jour son mot de passe.");
            return response()->json([
                'message' => 'Votre mot de passe a été mise à jour.'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    // Complete cancel password reset request method here
    public function cancel(Request $request, string $token)
    {
    }
}
