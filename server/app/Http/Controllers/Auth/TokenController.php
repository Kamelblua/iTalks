<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\UnencryptedToken;
use App\Models\User;
use Illuminate\Support\Str;

use DateTimeImmutable;
use Exception;

class TokenController extends Controller
{
    /**
     * Returns a valid \Lcobucci\JWT\Configuration object
     *
     * @return \Lcobucci\JWT\Configuration
     */
    public static function getConfig()
    {
        $configuration = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::base64Encoded(config('token.jwt.secret'))
        );

        return $configuration;
    }

    /**
     * Returns a valid JWT
     *
     * @param User $user
     * @return \Lcobucci\JWT\Token\Plain
     */
    public static function generateToken(User $user, $remember_me)
    {
        $config = self::getConfig();

        $now = new DateTimeImmutable();
        $token = $config->builder()
            ->issuedBy(config('app.url') . config('app.port'))
            ->permittedFor(config('app.client_url'))
            ->identifiedBy(Str::random(16))
            ->issuedAt($now)
            ->expiresAt($now->modify('+1 hour'))
            ->withClaim('uid', $user->id)
            ->withClaim('username', $user->username)
            ->withClaim('role', $user->role)
            ->withClaim('status', $user->status)
            ->withClaim('avatar', $user->avatar->link ??     null)
            ->withClaim('remember_me', $remember_me ? true : false)
            ->getToken($config->signer(), $config->signingKey());

        return $token;
    }

    public static function generatePasswordResetToken($user)
    {
        $config = self::getConfig();

        $now = new DateTimeImmutable();
        $token = $config->builder()
            ->issuedBy(config('app.url') . config('app.port'))
            ->permittedFor(config('app.client_url'))
            ->identifiedBy(Str::random(16))
            ->issuedAt($now)
            ->expiresAt($now->modify('+1 hour'))
            ->withClaim('uid', $user->id)
            ->withClaim('username', $user->username)
            ->withClaim('role', $user->role)
            ->withClaim('status', $user->status)
            ->withClaim('reason', "password_reset")
            ->getToken($config->signer(), $config->signingKey());

        return $token;
    }

    public static function generateEmailVerifyToken($user)
    {
        $config = self::getConfig();

        $now = new DateTimeImmutable();
        $token = $config->builder()
            ->issuedBy(config('app.url') . config('app.port'))
            ->permittedFor(config('app.client_url'))
            ->identifiedBy(Str::random(16))
            ->issuedAt($now)
            ->expiresAt($now->modify('+1 hour'))
            ->withClaim('uid', $user->id)
            ->withClaim('username', $user->username)
            ->withClaim('role', $user->role)
            ->withClaim('status', $user->status)
            ->withClaim('reason', "email_verify")
            ->getToken($config->signer(), $config->signingKey());

        return $token;
    }

    /**
     * Verify a token validity
     *
     * @param string $token
     * @return boolean
     */
    public static function verifyToken(string $token)
    {
        try {
            $config = self::getConfig();
            $token = $config->parser()->parse($token);
        } catch (Exception $e) {
            return false;
        }

        return assert($token instanceof UnencryptedToken);
    }

    /**
     * Parse and returns a token content
     *
     * @param string $token
     * @return mixed
     */
    public static function parseToken(string $token)
    {
        $config = self::getConfig();

        $token = $config->parser()->parse($token);

        assert($token instanceof UnencryptedToken);

        return $token->claims()->all();
    }

    /**
     * Get user current
     *
     */
    public static function getUserCurrent(Request $request) {
        return User::find(self::parseToken($request->cookie('token'))['uid']);
    }

}
