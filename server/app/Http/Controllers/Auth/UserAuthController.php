<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\Role;
use App\Models\User;
use App\Models\Status;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;

use App\Http\Controllers\Auth\TokenController;
use Illuminate\Support\Facades\Mail;
use App\Mail\TemplateMail;

class UserAuthController extends Controller
{
    /**
     * Registers and login the user. Returns a JWT token for authorized requests
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:3|max:25|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/|confirmed',
        ], [
            'username.required' => "Un nom d'utilisateur est requis.",
            'username.min' => "Le nom d'utilisateur doit faire minimum 3 caractères.",
            'username.max' => "Le nom d'utilisateur ne peut pas excéder 25 caractères.",
            'email.required' => "Une adresse mail est requise.",
            'email.email' => "Format incorrect.",
            'password.required' => "Un mot de passe est requis.",
            'password.confirmed' => "Les mots de passe ne correspondent pas.",
            'password.regex' => "Format incorrect."
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }


        $role = Role::where('name', 'user')->first();
        $status = Status::where('name', 'actif')->first();

        $user = new User();
        $user->username = trim(request('username'));
        $user->email = strtolower(request('email'));
        $user->role_id = $role->id;
        $user->status_id = $status->id;
        $user->password = Hash::make(request('password'));

        if ($user->save()) {
            LogController::log("L'utilisateur " . $user->username . " vient de s'inscrire sur le site.");
            $emailVerifyToken = TokenController::generateEmailVerifyToken($user);
            $user->update(['email_token' => $emailVerifyToken->toString()]);

            Mail::to($user->email)->send(
                new TemplateMail([
                    'user' => $user,
                    'token' => $emailVerifyToken->toString(),
                    'subject' => 'Confirmation de votre adresse mail.',
                    'reason' => 'user.email_verify',
                ])
            );

            return response()->json([
                'message' => 'Inscription effectuée avec succès! Un mail vous a été envoyé pour confirmer votre adresse mail.',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Login the user. Returns a JWT token for authorized requests
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validatorFirst = Validator::make($request->all(), [
            'type' => ['required', 'regex:/(^username$)|(^email$)/'],
            'identifier' => 'required',
            'password' => 'required'
        ], [
            'type.regex' => 'Le type d\'identification doit être "email" ou "username".',
            'identifier.required' => 'Un identifiant est requis.',
            'password.required' => 'Veuillez indiquer votre mot de passe.'
        ]);

        if ($validatorFirst->fails()) {
            return response()->json([
                'errors' => $validatorFirst->errors()
            ], 400);
        }

        $validatorSecond = null;

        $validatorSecond = Validator::make($request->all(), [
            'identifier' => 'exists:users,' . request('type'),
        ], [
            'identifier.exists' => "Mauvaise combinaison d'identifiants."
        ]);

        if ($validatorSecond->fails()) {
            return response()->json([
                'errors' => $validatorSecond->errors()
            ], 400);
        }

        $user = User::where(request('type'), request('identifier'))->first();

        if (!$user->email_verified) {
            return response()->json([
                'errors' => ['identifier' => "Votre tentative de connexion a été refusée, merci de confirmer votre email."]
            ], 400);
        }

        if (Hash::check(request('password'), $user->password)) {
            $token = TokenController::generateToken($user, request('remember_me'));

            return response()->json([
                'message' => 'Connexion effectuée avec succès!',
            ], 201)->cookie('token', $token->toString(), null, null, null, null, false);
        }

        return response()->json([
            'errors' => ['identifier' => "Mauvaise combinaison d'identifiants."]
        ], 400);
    }

    /**
     * Login the user. Returns a JWT token for authorized requests
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Cookie::queue(Cookie::forget('token'));
        $cookie = Cookie::make('token', '');
        return response()->json([
            'message' => "Déconnexion effectuée.",
            'no-cookie' => true,
            'status' => 201
        ], 201)->withCookie($cookie);
    }
}