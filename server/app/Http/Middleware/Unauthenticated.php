<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use Closure;

class Unauthenticated
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
            return $next($request);
        };

        return $this->alreadySetCookie("Une session est déjà en cours.");
    }

    /**
     * Undocumented function
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function alreadySetCookie(string $message)
    {
        return response()->json([
            'message' => $message,
            'status' => 409
        ], 409);
    }
}