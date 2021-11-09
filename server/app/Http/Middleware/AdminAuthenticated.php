<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Models\User;

use Closure;
use Carbon\Carbon;
use DateTimeImmutable;

class AdminAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Cookie exists
        $token = $request->cookie('token');
        if (!$token || !TokenController::verifyToken($token)) {
            return $this->unauthorizedCookie('Session invalide.');
        };

        // Cookie is from server and is valid for client
        $claims = TokenController::parseToken($token);
        if ($claims['iss'] !== config('app.url') . config('app.port') || $claims['aud'][0] !== config('app.client_url')) {
            return $this->unauthorizedCookie('Session invalide.');
        }

        $user = User::where('username', $claims['username'])->first();

        if (!isset($user)) {
            return $this->unauthorizedCookie('Session invalide.');
        }

        if ($user->role !== "admin") {
            return response()->json([
                "message" => "Vous n'avez pas les autorisations nécessaire pour accèder à ce contenu."
            ], 403);
        }

        // Cookie hasn't expired
        $now = Carbon::parse(new DateTimeImmutable());
        $expAt = Carbon::parse($claims['exp']);
        if ($expAt->isBefore($now) && !$claims['remember_me']) {
            return $this->unauthorizedCookie('La session a expirée.');
        }

        // User account active ?
        if ($user->status === "supprimé") {
            return $this->unauthorizedCookie('Ce compte a été supprimé.');
        }

        $response = $next($request);

        if (isset($response->original["no-cookie"])) {
            return $response;
        }

        // Update token
        if (!$claims['remember_me']) {
            $token = TokenController::generateToken($user, false);
            return $response->cookie('token', $token->toString(), null, null, null, null, false);
        }
        return $response->cookie('token', $token, null, null, null, null, false);
    }

    /**
     * Undocumented function
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function unauthorizedCookie(string $message)
    {
        Cookie::queue(Cookie::forget('token'));
        $cookie = Cookie::make('token', '');
        return response()->json([
            'message' => $message,
            'status' => 401
        ], 401)->withCookie($cookie);
    }
}